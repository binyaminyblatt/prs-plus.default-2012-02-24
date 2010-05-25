// Name: Browse Folders
// Description: Adds "Browse Folders" menu option
// Author: kartu
//
// History:
//	2010-03-06 kartu - Added mount/umount feature
//	2010-03-07 kartu - Prepared for localization
//	2010-03-14 kartu - Refactored Utils -> Core
//	2010-03-14 kartu - Localized
//	2010-04-24 kartu - Prepared for merging into single JS
//	2010-04-25 kartu - Marked FolderNode and browseFoldersNode._myconstruct as constructors
//	2010-04-27 kravitz - Exported pathToBookNode() (fixing required)
//	2010-04-27 kravitz - Code of main menu forming is moved to MenuTuning.js
//	2010-04-29 kravitz - Refactored events handling
//	2010-05-15 kartu - Fixed: book list was initialized once and never updated
//	2010-05-24 kartu - Fixed weird bug "after deleting collection reader jumps to main menu, instead of collection" (fix by kravitz) that occured only if there was no SD card

tmp = function() {
	// Shortcuts
	var log = Core.log.getLogger("BrowseFolders");
	var cloneObj = Core.system.cloneObj;
	var getSoValue = Core.system.getSoValue;
	var startsWith = Core.string.startsWith;
	var NodeKinds = Core.ui.NodeKinds;
	var BookMIMEs = Core.ui.BookMIMEs;

	var doInit;

	// Localize
	var L = Core.lang.getLocalizer("BrowseFolders");

	// This addon
	var BrowseFolders = {
		name: "BrowseFolders",
		title: L("TITLE"),
		icon: "FOLDER",
		optionDefs: [
			{
				name: "sortMode",
				title: L("OPTION_SORTING_MODE"),
				icon: "LIST",
				defaultValue: "author",
				values: ["title", "author", "authorSwapName", "filename"],
				valueTitles: {
					title: L("VALUE_BY_TITLE"),
					author: L("VALUE_BY_AUTHOR_THEN_TITLE"),
					authorSwapName: L("VALUE_BY_AUTHOR_SWAPPING"),
					filename: L("VALUE_BY_FILENAME")
				}
			},
			{
				name: "useTitleSorter",
				title: L("OPTION_TITLE_SORTER"),
				icon: "LIST",
				defaultValue: "enabled",
				values: ["enabled", "disabled"],
				valueTitles: {
					enabled: L("ENABLED"),
					disabled: L("DISABLED")
				}
			},
			{
				name: "imRoot",
				title: L("OPTION_IM_ROOT"),
				icon: "FOLDER",
				defaultValue: "",
				values: ["/database/media/books", "/database/media", "/media", "/books", ""],
				valueTitles: {
					"": "/" // yeah! :)
				}
			},
			{
				name: "cardScan",
				title: L("OPTION_CARD_SCAN"),
				icon: "DB",
				defaultValue: "enabled",
				values: ["enabled", "disabled"],
				valueTitles: {
					enabled: L("ENABLED"),
					disabled: L("DISABLED")
				}

			},
			{
				name: "useMount",
				title: L("OPTION_MOUNT"),
				icon: "DB",
				defaultValue: "disabled",
				values: ["enabled", "disabled"],
				valueTitles: {
					enabled: L("ENABLED"),
					disabled: L("DISABLED")
				}
			}
		],
		onInit: function () {
			doInit();
		}
	};

	// Skipping card scanning, if ".noscan" file is present in the root folder
	var originalHandler = FskCache.diskSupport.canHandleVolume;
	FskCache.diskSupport.canHandleVolume = function (volume) {
		try {
			if (BrowseFolders.options.cardScan === "disabled" || FileSystem.getFileInfo(volume.path + ".noscan")) {
				return false;
			}
		} catch (ee) {
			log.error("error " + ee);
		}
		var result = originalHandler(volume)
		if (result) {
			// New stuff was scanned, reset pathToBook
			pathToBook = null;
		}
		return result;
	};

	// Resolves "delete book" problem in custom booknodes. Functions body is mostly copy paste from the original doDeleteBook.
	BrowseFolders.doDeleteBook = function (owner, oldDeleteBook, args) {
		try {
			var book = owner.currentBook;
			if (book && book._myclass) {
				try {
					var bookPath = book.media.source.path + book.media.path;
					var media = book.media;
					var source = media.source;
					source.deleteRecord(media.id);
					owner.addPathToDCL(media.source, media.path);
					var closeFunc = getSoValue(book, "media.close");
					closeFunc.call(media, kbook.bookData);
					kbook.bookData.setData(null);
					book.unlockPath();
					FileSystem.deleteFile(bookPath);
					kbook.root.update(kbook.model);
				} catch (e) {
					log.error("Failed to delete my node: " + e);
				}
			} else {
				oldDeleteBook.apply(owner, args);
			}
			book.gotoParent(kbook.model);
		} catch (ee) {
			log.error("doDeleteBook(): " + ee);
		}
	};

	// Book path to index map. Allows to find existing book node corresponding to a given path.
	var pathToBook = null;
	var indexBooks = function () {
		if (!pathToBook) {
			pathToBook = {};
			var records = kbook.model.cache.textMasters;

			for (var i = 0, n = records.count(); i < n; i++) {
				var book = records.getRecord(i);
				var bookPath = book.source.path + book.path;
				pathToBook[bookPath] = book;
			}
		}
	};

	var createBookNode;

	//
	// Returns:
	//	returns new BookNode given a path, or null, if media cannot be found
	var pathToBookNode = function (path, parent) {
		indexBooks();
		var book = pathToBook[path];
		if (book) {
			// Construct book node
			var node = createBookNode(book, parent);
			return node;
		}
		return null;
	};

	// Constructs a book node
	// Arguments:
	//	book - book media
	//	parent - parent node
	createBookNode = function (book, parent) {
		var node = cloneObj(kbook.root.children.books.prototype);
		node.media = book;
		node.cache = kbook.model.cache;
		node.parent = parent;
		node.children = kbook.children;
		FskCache.tree.xdbNode.construct.call(node);

		// set misc props
		node.onEnter = "onEnterBook";
		node.onSelect = "onSelectDefault";
		node.kind = 2;
		node._mykind = 2; //ReadMark function() {
//			return this.media._read ? NodeKinds.READ_BOOK : NodeKinds.BOOK;
//		};
		node._mytitle = book.title;
		node._myname = book.title;
		node._mycomment = book.author;
		node._myclass = "BookNode";

		node.type = "book";

		return node;
	};


	// Node that shows folder content
	/**
	* @constructor
	*/
	var FolderNode = function (root, path,  type,  name, kind) {
		this.root = root;
		this.path = path;
		this.type = type;
		this.name = name ? name : path;
		this.title = this.name;
		this._mycomment = " ";
		this.locked = 0;

		if (typeof kind != "undefined") {
			this.kind = kind;
			this.isFolder = true;
		} else if (type == "directory") {
			this.kind = NodeKinds.FOLDER;
			this.isFolder = true;
		} else {
			this.kind = NodeKinds.FILE;
			this.isFolder = false;
		}
	};
	FolderNode.prototype = new Core.ui.ContainerNode(undefined);
	FolderNode.prototype.update = function () {
		// Recreate nodes
		this._myconstruct();
	};


	//------------------------------------------------------------------------------
	// Sorting
	//------------------------------------------------------------------------------
	var compareStrings = Core.string.compareStrings;

	var compareTitles = function (a, b) {
	    var atitle;
	    var btitle;

	    if (BrowseFolders.options.useTitleSorter === "disabled") {
		    // ignore title sorter field
		    atitle = a.media.title;
		    btitle = b.media.title;
	    } else {
		    atitle = a.media.titleSorter ? a.media.titleSorter : a.media.title;
		    btitle = b.media.titleSorter ? b.media.titleSorter : b.media.title;
	    }

	    return compareStrings(atitle, btitle);
	};

	var TYPE_SORT_WEIGHTS = {
		directory: -100,
		book: -50,
		picture: -25,
		audio: -10,
		file: 0
	};

	var swapNameAndSurname = function (str) {
		var idx = str.lastIndexOf(" ");
		if (idx < 0) {
			return str;
		}
		var name = str.substring(0, idx);
		var surname = str.substring(idx + 1);
		return surname + " " + name;
	};

	var sortByTitle = function (a, b) {
		try {
			if (a.type !== b.type) {
				// directories first, etc
				return TYPE_SORT_WEIGHTS[a.type] - TYPE_SORT_WEIGHTS[b.type];
			}
			return compareTitles(a, b);
		} catch (e) {
			log.error("in sortByTitle : " + e);
		}
	};

	var sortByAuthor = function (a, b, swap) {
		try {
			if (a.type !== b.type) {
				// directories first, etc
				return TYPE_SORT_WEIGHTS[a.type] - TYPE_SORT_WEIGHTS[b.type];
			}
			if (a.type !== "book") {
				return compareStrings(a.name, b.name);
			}
			// comparing books
			var aAuthor = a.media.author;
			var bAuthor = b.media.author;
			if (aAuthor === bAuthor) {
				return compareTitles(a, b);
			} else {
				if (swap) {
					aAuthor = swapNameAndSurname(aAuthor);
					bAuthor = swapNameAndSurname(bAuthor);
				}
				return compareStrings(aAuthor, bAuthor);
			}
		} catch (e) {
			log.error("in sortByAuthor : " + e);
		}
	};

	var sortByAuthorSwappingName = function (a, b) {
		return sortByAuthor(a, b, true);
	};

	var sortByFilename = function (a, b) {
		try {
			if (a.type !== b.type) {
				// directories first, etc
				return TYPE_SORT_WEIGHTS[a.type] - TYPE_SORT_WEIGHTS[b.type];
			}
			if (a.type !== "book") {
				return compareStrings(a.name, b.name);
			}

			var aPath = a.media.path;
			var bPath = b.media.path;
			return compareStrings(aPath, bPath);
		} catch (e) {
			log.error("In sortByFilename: " + e);
		}
	};

	FolderNode.prototype.sortNodes = function () {
		switch (BrowseFolders.options.sortMode) {
			case "author":
				this.nodes.sort(sortByAuthor);
				break;
			case "authorSwapName":
				this.nodes.sort(sortByAuthorSwappingName);
				break;
			case "filename":
				this.nodes.sort(sortByFilename);
				break;
			default:
				this.nodes.sort(sortByTitle);
		}
	};
	//------------------------------------------------------------------------------

	// Mounts SD/MS card if mounting is enabled and path starts with MOUNT_PATH
	//
	var needMount = function (path) {
		var mountHandle = null;
		if (BrowseFolders.options.useMount) {
			if (startsWith(path, Core.shell.SD_MOUNT_PATH)) {
				mountHandle = Core.shell.SD;
			} else if (startsWith(path, Core.shell.MS_MOUNT_PATH)) {
				mountHandle = Core.shell.MS;
			}
			if (mountHandle !== null) {
				try {
					Core.shell.mount(mountHandle);
				} catch (mountError) {
					log.error("Failed to mount " + mountHandle + ": " + mountError);
				}
			}
		}
		return mountHandle;
	};

	// Umounts card previously mounted by needMount
	//
	var releaseMount = function (mountHandle) {
		if (mountHandle !== null) {
			try {
				Core.shell.umount(mountHandle);
			} catch (umountError) {
				log.warn("Failed to umount " + mountHandle + ": " + umountError);
			}
		}
	};

	FolderNode.prototype._myconstruct = function() {
		indexBooks();
		var fullPath = this.root + this.path + "/";
		var mountHandle;
		if (this.isFolder) {
			// if mount/remount is enabled, and we are accessing SD/MS cards, mount
			mountHandle = needMount(fullPath);

			var iterator = new FileSystem.Iterator(fullPath);
			try {
				var item;
				if (this.nodes !== null && this.nodes.length > 0) {
					delete this.nodes;
				}
				this.nodes = [];
				try {
					while (item = iterator.getNext()) {
						var node;
						if (item.type == "directory") {
							node = new FolderNode(fullPath, item.path, item.type, undefined, undefined);
						} else if (item.type == "file") {
							var mime = FileSystem.getMIMEType(item.path);
							if (!mime || !BookMIMEs[mime]) {
								// not a book
								continue;
							}

							// Find existing node
							node = pathToBookNode(fullPath + item.path, this);
							if (!node) {
								node = new FolderNode(fullPath, item.path, item.type, undefined, undefined);
							}
						} else {
							continue; // wtf, neither folder nor file?
						}
						node.parent = this;
						this.nodes.push(node);
					}
				} catch (e) {
					log.error("Error iterating over " + fullPath + ": " + e);
					if (item) {
						log.error("Last item was: " + item.path);
					}
				}
				this.sortNodes();
			} finally {
				// if Umount whatever was mounted above
				releaseMount(mountHandle);
				// release file iterator
				iterator.close();
			}
		} else {
			// If not internal memory
			var isExternalMem = (fullPath.length > 5 && fullPath.substring(0, 5) === "/Data");
			if (isExternalMem) {
				this.nodes = [this.createUnscannedBookNode(this, L("NODE_RESCAN_INTERNAL_MEMORY"), "", true, true)];
			} else {
				var copy = this.createUnscannedBookNode(this, L("NODE_COPY_TO_INTERNAL_MEMORY"), L("NODE_COPY_TO_INTERNAL_MEMORY_COMMENT"));
				var copyAndReload = this.createUnscannedBookNode(this, L("NODE_COPY_AND_RESCAN"),
								L("NODE_COPY_AND_RESCAN_COMMENT"), true);
				this.nodes = [copy, copyAndReload];
			}
		}
	};
	// Book that was not scanned
	FolderNode.prototype.createUnscannedBookNode = function (parent, title, comment, doSynchronize, dontCopy) {
		var node = Core.ui.createContainerNode({
			"parent": parent,
			"title": parent.path,
			"name": title,
			"kind": NodeKinds.BACK,
			"comment": comment
		});

		var rootFolder = "/Data" + BrowseFolders.options.imRoot + "/";
		var from = parent.root + parent.path;
		var to = rootFolder + parent.path;
		node.enter = function () {
			try {
				if (!dontCopy) {
					// Mount if needed
					var mountHandle = needMount(from);

					FileSystem.ensureDirectory(rootFolder);

					// check if the file target exists
					if (FileSystem.getFileInfo(to)) {
						this.parent.enter(kbook.model);
						// warn and exit
						kbook.model.container.MENU_GROUP.MENU.setVariable("MENU_INDEX_COUNT", L("ERROR_TARGET_EXISTS"));
						parent._mycomment = L("ERROR_TARGET_EXISTS");
						return;
					}

					// copy the file
					FileSystem.copyFile(from, to);

					// Umount if needed
					releaseMount(mountHandle);
				}

				if (doSynchronize) {
					// get source by ID would be more appropriate
					var target = kbook.model.cache.sources[1];
					try {
						target.synchronize();

						// Delete pathToBook so that it gets reinitialized on the next call
						var tmp = pathToBook;
						pathToBook = false;
						delete tmp;
					} catch (e) {
						log.error("error synchronizing: " + e);
					}
					// Show root
					kbook.model.doRoot();
				} else {
					// go to parent's parent
					this.parent.parent.enter(kbook.model);
				}
			} catch (ee) {
				log.error("error in copy file from .enter from " + from + " to " + to + ee);
			}
		};
		return node;
	};

	doInit = function () {
		// Create "Browse Folders" node
		var browseFoldersNode = Core.ui.createContainerNode({
			parent: kbook.root,
			title: L("NODE_BROWSE_FOLDERS"),
			kind: NodeKinds.FOLDER,
			comment: L("NODE_BROWSE_FOLDERS_COMMENT"),
			separator: 1
		});
		browseFoldersNode.update = function () {
			this._myconstruct(kbook.model, true);
		};
		/**
		* @constructor
		*/
		browseFoldersNode._myconstruct = function (model, fromChild) {
			try {
				if (this.nodes !== null) {
					delete this.nodes;
				}
				this.nodes = [];
				var nodes = this.nodes;
				var node = new FolderNode("/Data" + BrowseFolders.options.imRoot, "", "directory", L("NODE_INTERNAL_MEMORY"), NodeKinds.INTERNAL_MEM);
				node.parent = this;
				this.nodes.push(node);
				if (FileSystem.getFileInfo("a:/")) {
					node = new FolderNode("a:", "", "directory", L("NODE_MEMORY_STICK"), NodeKinds.MS);
					node.parent = this;
					nodes.push(node);

					if (BrowseFolders.options.useMount && BrowseFolders.options.cardScan === "disabled") {
						node = new FolderNode(Core.shell.MS_MOUNT_PATH, "", "directory", L("NODE_MEMORY_STICK_MOUNT"), NodeKinds.MS);
						node.parent = this;
						nodes.push(node);
					}
				}
				if (FileSystem.getFileInfo("b:/")) {
					node = new FolderNode("b:", "", "directory", L("NODE_SD_CARD"), NodeKinds.SD);
					node.parent = this;
					nodes.push(node);

					if (BrowseFolders.options.useMount  && BrowseFolders.options.cardScan  === "disabled") {
						node = new FolderNode(Core.shell.SD_MOUNT_PATH, "", "directory", L("NODE_SD_CARD_MOUNT"), NodeKinds.SD);
						node.parent = this;
						nodes.push(node);
					}
				}

				// Since there is no direct way to determine in "enter" whether we are going from child to parent or not
				// this little hack is needed, forceEnter is true if
				var myGotoParent = function () {
					this.exit(kbook.model);
					this.parent.enter(kbook.model, true);
				};
				for (var i = 0, n = nodes.length; i < n; i++) {
					nodes[i].gotoParent = myGotoParent;
				}


				if (nodes.length == 1) {
					// If there is only one subnode, don't show it
					if (fromChild) {
						// going from child to parent
						this.gotoParent(kbook.model);
					} else {
						// going from parent to child
						node = nodes[0];

						this.gotoNode(node, kbook.model);
					}
					return true;
				}

			} catch (e) {
				log.error("browseFoldersNode._myconstruct(): " + e);
			}
		};
		Core.ui.nodes.browseFolders = browseFoldersNode;
		// Add "Browse Folders" to Main menu
		kbook.root.nodes[4] = Core.ui.nodes.browseFolders;

		// Add "Rescan Internal Memory" node to "Advanced Settings"
		var advancedSettingsNode = Core.ui.nodes.advancedSettings;
		var rescanInternalMemoryNode = FolderNode.prototype.createUnscannedBookNode(advancedSettingsNode, L("NODE_RESCAN_INTERNAL_MEMORY"), "", true, true);
		Core.ui.nodes.rescanInternalMemory = rescanInternalMemoryNode;
		advancedSettingsNode.nodes.push(rescanInternalMemoryNode);
	};

	Core.addAddon(BrowseFolders);

	//FIXME export... O_o

	_BF_pathToBookNode = function(path, parent) {
		return pathToBookNode(path, parent);
	};

//ReadMark	_BF_indexBooks = function() {
//		indexBooks();
//	};

//ReadMark	_BF_pathToBook = function(path) {
//		return pathToBook[path];
//	};
};

try {
	tmp();
} catch (e) {
	// Core's log
	log.error("in BrowseFolders.js", e);
}