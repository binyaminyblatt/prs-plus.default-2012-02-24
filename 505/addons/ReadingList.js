// Name: Reading List
// Description: Replacement of original "Continue Reading" menu item by a folder with several books
// Author: kravitz
//
// History:
//	2010-04-27 kravitz - Initial version
//	2010-04-29 kravitz - Refactored events handling
//	2010-05-01 kravitz - Fixed onSettingsChanged()
//	2010-05-01 kravitz - Added Continue Reading action, added hidden Reading list, fixed minor bugs

tmp = function() {
	// Shortcuts
	var log = Core.log.getLogger("ReadingList");
	var getSoValue = Core.system.getSoValue;
	var getFastBookMedia = Core.system.getFastBookMedia;

	// Default Reading list length
	var RL_DEFAULT = 1;

	var RL_TITLE = Core.ui.nodes["continue"].title;
	var RL_FILE = "Reading.list";

	// Localize
	var L = Core.lang.getLocalizer("ReadingList");

	// This addon
	var ReadingList = {
		name: "ReadingList",
		title: RL_TITLE,
		settingsGroup: "menu",
		optionDefs: [{
			name: "maxLength",
			title: RL_TITLE,
			icon: "CONTINUE",
			defaultValue: RL_DEFAULT,
			values:	["1", "3" , "10", "-3", "-10"],
			valueTitles: {
				"1": L("VALUE_DISABLED"),
				"3": L("VALUE_3"),
				"10": L("VALUE_10"),
				"-3": L("VALUE_3") + ", " + L("VALUE_HIDDEN"),
				"-10": L("VALUE_10") + ", " + L("VALUE_HIDDEN")
			}
		}],

		actions: [{
			name: "ReadingList",
			title: RL_TITLE,
			group: "Utils",
			icon: "CONTINUE",
			action: function () {
				try {
					ReadingList.showList();
				} catch (e) {
					log.error("showList(): " + e);
				}
			}
		}]
	};

	ReadingList.onChangeBook = function (owner) {
		if (this.options.maxLength == RL_DEFAULT) {
			// Reading list is disabled
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
		var list = Core.ui.nodes.readingList;

		// Search current book in Reading list
		for (var i = 0, n = list.nodes.length; i < n; i++) {
			if (list.nodes[i]._bookPath == bookPath) { // Found...
				if (i) {
					list.nodes.unshift(list.nodes.splice(i, 1)[0]); // Move book on top
				}
				return;
			}
		}
		// Not found... add to ReadingList
		book._bookPath = bookPath;
		list.nodes.unshift(book);
		if (list.nodes.length > Math.abs(this.options.maxLength)) {
			list.nodes.pop(); // Remove last node from list
		}
	};

	ReadingList.doDeleteBook = function (owner) {
		if (this.options.maxLength == RL_DEFAULT) {
			// Reading list is disabled
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
		var list = Core.ui.nodes.readingList;

		// Search current book in Reading list
		for (var i = 0, n = list.nodes.length; i < n; i++) {
			if (list.nodes[i]._bookPath == bookPath) { // Found...
				list.nodes.splice(i, 1); // Remove node from list
			}
			break;
		}
	};

	// Shows Reading list
	ReadingList.showList = function () {
		if (this.options.maxLength == RL_DEFAULT) {
			// Show book
			kbook.model.onEnterContinue();
		} else {
			// Show Reading list
			var list = Core.ui.nodes.readingList;
			kbook.model.current = list;
			kbook.model.STATE = 'MENU';
			kbook.tableData.setNode(list);
			kbook.imageData.setData(null);
			kbook.settingData.setNode(null);
		}
	};

	// Sets original or expanded Continue Reading style
	ReadingList.setStyle = function (l) {
		kbook.root.nodes[0] = (l > RL_DEFAULT) ? Core.ui.nodes.readingList : Core.ui.nodes["continue"];
	};

	// Truncates list to desired length
	ReadingList.truncTo = function (l) {
		var list = Core.ui.nodes.readingList;
		if (l) {
			var n = list.nodes.length - l;
			for (var i = 0; i < n; i++) {
				list.nodes.pop(); // Remove last node from list
			}
		} else {
			var node = kbook.model.currentBook;
			if (node && node.parent == list) {
				node.parent = kbook.root; // Change currentBook parent, if Reading list is disabled
			}
			list.nodes = [];
		}
	};

	ReadingList.onSettingsChanged = function (propertyName, oldValue, newValue) {
		if (oldValue === newValue) {
			return;
		}
		if (propertyName === "maxLength") {
			if (this.options.maxLength == 0) {
				this.options.maxLength = String(RL_DEFAULT);
			}
			this.setStyle(this.options.maxLength);

			if (oldValue == RL_DEFAULT) {
				// Add current book to Reading list
				this.onChangeBook(kbook.model);
			} else if (oldValue != 0) {
				// Adjust Reading list length to new max
				this.truncTo((this.options.maxLength == RL_DEFAULT) ? 0 : Math.abs(this.options.maxLength));
			}
		}
	};

	ReadingList.saveToFile = function () {
		try {
			FileSystem.ensureDirectory(Core.config.settingsPath);
			var list = Core.ui.nodes.readingList;
			var listFile = Core.config.settingsPath + RL_FILE;
			var len = list.nodes.length;

			var current = "";
			for (var i = 0; i < len; i++) {
				current += list.nodes[i]._bookPath + "\r\n";
			}
			if (current.length == 0) {
				// List is empty - delete
				FileSystem.deleteFile(listFile);
				return;
			}
			// Load saved Reading list
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

	ReadingList.loadFromFile = function () {
		try {
			var list = Core.ui.nodes.readingList;
			var listFile = Core.config.settingsPath + RL_FILE;
			if (FileSystem.getFileInfo(listFile)) {
				var stream = new Stream.File(listFile); //FIXME use getFileContent()
				try {
					while (stream.bytesAvailable) {
						var path = stream.readLine();
						if (FileSystem.getFileInfo(path)) {
							// Create book node
							var node = _BF_pathToBookNode(path, list);
							if (node) {
								// Add to ReadingList
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

	ReadingList.onTerminate = function () {
		this.saveToFile();
	};

	ReadingList.onInit = function () {
		// Reading list node
		var readingListNode = Core.ui.createContainerNode({
			parent: kbook.root,
			title: RL_TITLE,
			kind: Core.ui.NodeKinds.CONTINUE,
		});

		// Update from ContainerNode doesn't work for whatever reason, probably it is accessing the wrong "nodes"
		readingListNode.update = function(model) {
			for (var i = 0, n = this.nodes.length; i < n; i++) {
				if (this.nodes[i].update) {
					this.nodes[i].update.call(this.nodes[i], model);
				}
			}
		};

		readingListNode._mycomment = function () {
			return L("FUNC_X_BOOKS", this.length);
		};

		Core.ui.nodes.readingList = readingListNode;

		this.onSettingsChanged("maxLength", "0", this.options.maxLength);

		if (this.options.maxLength != RL_DEFAULT) {
			// Load saved Reading list
			this.loadFromFile();
		}
	};

	Core.addAddon(ReadingList);
};

try {
	tmp();
} catch (e) {
	// Core's log
	log.error("in ReadingList.js", e);
}
