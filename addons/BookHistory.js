// Name: Book History
// Description: History of book reading (opening)
// Author: kravitz
//
// History:
//	2010-04-27 kravitz - Initial version
//	2010-04-29 kravitz - Refactored events handling
//	2010-05-01 kravitz - Fixed onSettingsChanged()
//	2010-05-01 kravitz - Added Continue Reading action, fixed minor bugs
//	2010-05-03 kravitz - Renamed from ReadingList, refactored options
//	2010-05-04 kravitz - Fixed doDeleteBook()
//	2010-05-12 kartu - Renamed Continue Reading action to Book History
//	2010-05-14 kravitz - Fixed Book History loading
//	2010-05-14 kravitz - Added Continue Reading action
//	2010-05-14 kravitz - Added option to open the text immediately
//	2010-05-15 kartu - Renamed "through" to "skipBookMenu"
//				Replaced numeric option values with string equivalents (as core-settings supports only strings), implicit type conversion with explicit
//				Put history into it's own settings group.
//	2010-05-15 kartu - Reverted back to "PAGE" translation
//	2010-05-17 kravitz - Replaced "PAGE" with "FUNC_PAGE_X"
//	2010-05-19 kravitz - Fixed Book History menu title
//				Added return from menu to previous state
//	2010-05-19 kravitz - Forbidden enter into Book History not from MENU state
//	2010-05-20 kravitz - Allowed enter into Book History from PAGE state
//	2010-05-21 kravitz - Allowed enter into Book History from AUTORUN state
//	2010-05-24 kravitz - Changed logic of return, fixed minor bugs
//				Removed doDeleteBook() event handler, added audit() instead
//	2010-07-22 kartu - Adapted for 300
//				removed "BH into continue", as menu is now configurable using other means
//				changed skipBookMenu options to: never, always, when entering book, when exiting book
//			

tmp = function() {
	var L = Core.lang.getLocalizer("BookHistory");
	var log = Core.log.getLogger("BookHistory");
	var trim = Core.string.trim;
	var model = kbook.model;
	
	var BH_TITLE = L("TITLE");
	var BH_FILE = Core.config.settingsPath + "book.history";
	
	// Addon variable
	var BookHistory;
	// List of history books
	var bookList = [];
	// Flag showing whether book list has to be persisted
	var mustSave = false;

	var bookHistoryNode = null;
	// Set /unset in gotoNode hook of the book history node
	var fromParentFlag = false;
	
	// Takes care of "skip book menu" option
	var enterBook = function() {
		try {
			model[this.onEnter](this);
			var skipOption = BookHistory.options.skipBookMenu;
			
			if (fromParentFlag && (skipOption === "opening" || skipOption === "always")) {
				// skip menu (jump to "continue")
				this.gotoChild(0, model);
			} else if (!fromParentFlag && (skipOption === "exiting" || skipOption === "always")) {
				// skip menu (jump to parent)
				this.gotoParent(model);
			}
		} catch (e) {
			log.error("enterBook", e);
		}
	};
	
	// Creates book nodes (once)
	var constructNodes = function () {
		if (this.nodes) {
			return;
		}
		this.nodes = [];
		
		for (var i = bookList.length-1; i >= 0; i--) {
			var node = Core.media.createMediaNode(bookList[i], this);
			if (node !== null) {
				node.enter = enterBook;
				this.nodes.unshift(node);
			} else {
				bookList.splice(i, 1);
				mustSave = true;
			}
		}
	};
	
	var destructNodes = function () {
		// do nothing
	};
	
	// Loads saved Book History from addon's private file
	var loadFromFile = function () {
		try {
			if (FileSystem.getFileInfo(BH_FILE)) {
				var stream = new Stream.File(BH_FILE);
				try {
					while (stream.bytesAvailable) {
						var s = trim(stream.readLine());
						bookList.push(s);
					}
				} finally {
					stream.close();
				}
			}
		} catch (e) {
			log.error("loadFromFile", e);
		}
	};	
	
	// Saves book history
	var saveToFile = function () {
		try {
			FileSystem.ensureDirectory(Core.config.settingsPath);

			var current = "";
			for (var i = 0, len = bookList.length; i < len; i++) {
				current += bookList[i] + "\r\n";
			}
			if (current.length === 0) {
				// history is empty - delete the file
				FileSystem.deleteFile(BH_FILE);
				return;
			}
			// save
			Core.io.setFileContent(BH_FILE, current);
		} catch (e) {
			log.error("saveToFile(): " + e);
		}
	};
	
	
	var save = function () {
		if (mustSave) {
			saveToFile();
			mustSave = false;
		}
	};
	
	var bookChanged = function (bookNode) {
		try {
			var media = bookNode.media;
			var path = media.source.path + media.path;
			
			// Check, if path is already in the list
			for (var i = 0, n = bookList.length; i < n; i++) {
				if (path === bookList[i]) {
					if (i !== 0) {
						// move book to the top of the list
						bookList.unshift(bookList.splice(i, 1)[0]);
						
						// if nodes are initialized, also move book nodes
						if (bookHistoryNode && bookHistoryNode.nodes) {
							bookHistoryNode.nodes.unshift(bookHistoryNode.nodes.splice(i, 1)[0]);
						}
						
						mustSave = true;
					}
					return;
				}
			}
			
			// new book, adding it to the top of the list 
			bookList.unshift(path);
			if (Number(BookHistory.options.size) < bookList.length) {
				// remove the last item, since history list is full
				bookList.pop();
				
				// if nodes are initialized, also pop book node
				if (bookHistoryNode && bookHistoryNode.nodes) {
					bookHistoryNode.nodes.pop();
				}
			}
			mustSave = true;
		} catch (e) {
			log.error("bookChanged,", e);
		}
	};
	
	// Called when book is deleted. Removes book from history node and from book list
	var bookDeleted = function () {
		try {
			var media = kbook.model.currentBook.media;
			var path = media.source.path + media.path;
			for (var i = 0, n = bookList.length; i < n; i++) {
				if (path === bookList[i]) {
					bookList.splice(i, 1);
					// if nodes are initialized, also pop book node
					if (bookHistoryNode && bookHistoryNode.nodes) {
						bookHistoryNode.nodes.splice(i, 1);
					}
					mustSave = true;
					break;
				}
			}
		} catch (e) {
			log.error("bookDeleted", e);
		}
	};
	
	BookHistory = {
		name: "BookHistory",
		title: BH_TITLE,
		icon: "LIST",
		onInit: function() {
			loadFromFile();
			Core.events.subscribe(Core.events.EVENTS.BOOK_CHANGED, bookChanged);
			Core.events.subscribe(Core.events.EVENTS.BOOK_DELETED, bookDeleted);
			Core.events.subscribe(Core.events.EVENTS.TERMINATE, save);
			Core.events.subscribe(Core.events.EVENTS.SLEEP, save);
		},
		getAddonNode: function() {
			if (bookHistoryNode === null) {
				bookHistoryNode = Core.ui.createContainerNode({
					title: BH_TITLE,
					icon: "LIST",
					comment: function () {return L("FUNC_X_BOOKS", bookList.length); },
					construct: constructNodes,
					destruct: destructNodes
				});
				// null value of the nodes is used by the contructor to detect uninitialized state
				bookHistoryNode.nodes = null;
				
				// need to do this, to understand where user is coming from
				// examining value of "locked" doesn't work
				var oldGotoNode = bookHistoryNode.gotoNode;
				bookHistoryNode.gotoNode = function() {
					fromParentFlag = true;
					try {
						oldGotoNode.apply(this, arguments);
					} catch (e) {
						log.warn("bookHistoryNode.gotoNode", e);
					}
					fromParentFlag = false;
				};
			}
			return bookHistoryNode;
		},
		onSettingsChanged: function(propertyName, oldValue, newValue) {
			if (oldValue === newValue || propertyName !== "size") {
				return;
			}
			var size = Number(newValue);
			for (var i = 0, n = bookList.length - size; i < n; i++) {
				bookList.pop();
				// if nodes are initialized, also move book nodes
				if (bookHistoryNode && bookHistoryNode.nodes) {
					bookHistoryNode.nodes.pop();
				}
			}
		},
		optionDefs: [{
			name: "size",
			title: BH_TITLE,
			icon: "CONTINUE",
			defaultValue: "10",
			values:	["0", "3", "5", "10", "20", "30", "40", "50"],
			valueTitles: {
				"0": L("VALUE_DISABLED"),
				"3": L("FUNC_X_BOOKS", 3),
				"5": L("FUNC_X_BOOKS", 5),
				"10": L("FUNC_X_BOOKS", 10),
				"20": L("FUNC_X_BOOKS", 20),
				"30": L("FUNC_X_BOOKS", 30),
				"40": L("FUNC_X_BOOKS", 40),
				"50": L("FUNC_X_BOOKS", 50)
			}
		},
		{
			name: "skipBookMenu",
			title: L("OPTION_SKIP_BOOK_MENU"),
			icon: "CONTINUE",
			defaultValue: "opening",
			values:	["opening", "exiting", "always", "never"],
			valueTitles: {
				"opening": L("VALUE_WHEN_OPENING_BOOK"),
				"exiting": L("VALUE_WHEN_EXITING_BOOK"),
				"always": L("VALUE_ALWAYS"),
				"never": L("VALUE_NEVER")
			}
		}],

		actions: [{
			name: "BookHistory",
			title: BH_TITLE,
			group: "Utils",
			icon: "CONTINUE",
			action: function () {
				model.current.gotoNode(bookHistoryNode, model);
			}
		}]
		
	};
	
	Core.addAddon(BookHistory);
};

try {
	tmp();
	tmp = undefined;
} catch (e) {
	// Core's log
	log.error("in BookHistory.js", e);
}