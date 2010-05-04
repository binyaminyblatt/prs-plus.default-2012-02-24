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

tmp = function() {
	// Shortcuts
	var log = Core.log.getLogger("BookHistory");
	var getSoValue = Core.system.getSoValue;
	var getFastBookMedia = Core.system.getFastBookMedia;

	// Localize
	var L = Core.lang.getLocalizer("BookHistory");

	// Default Book History length
	var BH_DEFAULT = 1;

	var CR_TITLE = Core.ui.nodes["continue"].title;
	var BH_TITLE = L("TITLE");
	var BH_FILE = "book.history";

	// This addon
	var BookHistory = {
		name: "BookHistory",
		title: BH_TITLE,
		settingsGroup: "menu",
		optionDefs: [{
			name: "size",
			title: BH_TITLE,
			icon: "CONTINUE",
			defaultValue: String(BH_DEFAULT),
			values:	["1", "3", "5", "10", "20", "30", "40", "50"],
			valueTitles: {
				"1": L("VALUE_DISABLED"),
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
			name: "replace",
			title: L("OPTION_REPLACE"),
			icon: "LIST",
			defaultValue: 1,
			values:	[0, 1],
			valueTitles: {
				0: L("VALUE_OFF"),
				1: L("VALUE_ON")
			}
		}],

		actions: [{
			name: "ContinueReading",
			title: CR_TITLE,
			group: "Utils",
			icon: "CONTINUE",
			action: function () {
				try {
					BookHistory.show();
				} catch (e) {
					log.error("show(): " + e);
				}
			}
		}]
	};

	BookHistory.onChangeBook = function (owner) {
		if (this.options.size == BH_DEFAULT) {
			// Book History is disabled
			return;
		}
		var book = owner.currentBook;
		if (book == null) {
			// No book
			return;
		}
		var media = getFastBookMedia(book);
		var source = media.source;
		var bookPath = source.path + media.path;
		var list = Core.ui.nodes.bookHistory;

		// Search current book in history
		for (var i = 0, n = list.nodes.length; i < n; i++) {
			if (list.nodes[i]._bookPath == bookPath) { // ... found
				if (i) {
					list.nodes.unshift(list.nodes.splice(i, 1)[0]); // Move book on top
				}
				return;
			}
		}
		// ... not found - add to history
		book._bookPath = bookPath;
		list.nodes.unshift(book);
		if (list.nodes.length > this.options.size) {
			list.nodes.pop(); // Remove last node from history
		}
	};

	BookHistory.doDeleteBook = function (owner) {
		if (this.options.size == BH_DEFAULT) {
			// Book History is disabled
			return;
		}
		var book = owner.currentBook;
		if (book == null) {
			// No book
			return;
		}
		var media = getFastBookMedia(book);
		var source = media.source;
		var bookPath = source.path + media.path;
		var list = Core.ui.nodes.bookHistory;

		// Search current book in history
		for (var i = 0, n = list.nodes.length; i < n; i++) {
			if (list.nodes[i]._bookPath == bookPath) { // ... found
				list.nodes.splice(i, 1); // Remove node from history
				break;
			}
		}
	};

	// Shows Book History
	BookHistory.show = function () {
		if (this.options.size == BH_DEFAULT) {
			// Show book
			kbook.model.onEnterContinue();
		} else {
			// Show Book History
			kbook.model.onEnterDefault(Core.ui.nodes.bookHistory);
		}
	};

	// Locates Book History into Continue Reading or into Games & Utilities
	BookHistory.locate = function () {
		var list = Core.ui.nodes.bookHistory;
		if (this.options.replace == 0) {
			list._myname = BH_TITLE;
			Core.settings.insertAddonNode(list);
			kbook.root.nodes[0] = Core.ui.nodes["continue"];
		} else {
			list._myname = CR_TITLE;
			Core.settings.removeAddonNode(list);
			kbook.root.nodes[0] = list;
		}
	};

	// Remove Book History
	BookHistory.dislocate = function () {
		Core.settings.removeAddonNode(Core.ui.nodes.bookHistory);
		kbook.root.nodes[0] = Core.ui.nodes["continue"];
	};

	BookHistory.onSettingsChanged = function (propertyName, oldValue, newValue) {
		if (oldValue === newValue) {
			return;
		}

		if (propertyName === "size") {
			if (oldValue == BH_DEFAULT) {
				// Add current book history
				this.onChangeBook(kbook.model);
				// Locate histoty
				this.locate();
			} else {
				var list = Core.ui.nodes.bookHistory;
				if (this.options.size == BH_DEFAULT) {
					// Change currentBook parent
					var node = kbook.model.currentBook;
					if (node && node.parent == list) {
						node.parent = kbook.root;
					}
					// Clean history
					list.nodes = [];
					// Remove histoty
					this.dislocate();
				} else {
					// Adjust history length
					for (var i = 0, n = list.nodes.length - this.options.size; i < n; i++) {
						list.nodes.pop();
					}
				}
			}
		}

		if (propertyName === "replace") {
			if (this.options.size != BH_DEFAULT) {
				// Locate histoty
				this.locate();
			}
		}
	};

	BookHistory.saveToFile = function () {
		try {
			FileSystem.ensureDirectory(Core.config.settingsPath);
			var list = Core.ui.nodes.bookHistory;
			var listFile = Core.config.settingsPath + BH_FILE;
			var len = list.nodes.length;

			var current = "";
			for (var i = 0; i < len; i++) {
				current += list.nodes[i]._bookPath + "\r\n";
			}
			if (current.length == 0) {
				// History is empty - delete
				FileSystem.deleteFile(listFile);
				return;
			}
			// Load saved history
			saved = Core.io.getFileContent(listFile, "");
			if (saved == current) {
				// Lists are equal
				return;
			}
			// ...aren't equal - save
			Core.io.setFileContent(listFile, current);
		} catch (e) {
			log.error("saveToFile(): " + e);
		}
	};

	BookHistory.loadFromFile = function () {
		try {
			var list = Core.ui.nodes.bookHistory;
			var listFile = Core.config.settingsPath + BH_FILE;
			if (FileSystem.getFileInfo(listFile)) {
				var stream = new Stream.File(listFile); //FIXME use getFileContent()
				try {
					while (stream.bytesAvailable) {
						var path = stream.readLine();
						if (FileSystem.getFileInfo(path)) {
							// Create book node
							var node = _BF_pathToBookNode(path, list);
							if (node) {
								// Add to history
								node._bookPath = path;
								list.nodes.push(node);
							}
						}
					}
				} finally {
					stream.close();
				}
			}
		} catch (e) {
			log.error("loadFromFile(): " + e);
		}
	};

	BookHistory.onTerminate = function () {
		this.saveToFile();
	};

	BookHistory.onInit = function () {
		// Book History node
		var bookHistoryNode = Core.ui.createContainerNode({
			parent: kbook.root,
			title: CR_TITLE,
			kind: Core.ui.NodeKinds.CONTINUE
		});

		bookHistoryNode.update = function(model) {
			for (var i = 0, n = this.nodes.length; i < n; i++) {
				if (this.nodes[i].update) {
					this.nodes[i].update.call(this.nodes[i], model);
				}
			}
		};

		bookHistoryNode._mycomment = function () {
			return L("FUNC_X_BOOKS", this.length);
		};

		Core.ui.nodes.bookHistory = bookHistoryNode;

		if (this.options.size != BH_DEFAULT) {
			this.loadFromFile(); // Load history
			this.locate(); // Locate histoty
		}
	};

	Core.addAddon(BookHistory);
};

try {
	tmp();
} catch (e) {
	// Core's log
	log.error("in BookHistory.js", e);
}
