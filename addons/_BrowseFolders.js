// Name: Browse Folders
// Description: Adds "Browse Folders" menu option, groups music&picture related menus, adds "Games & Utilities" menu
// Author: kartu
//

var cloneObj = Utils.cloneObj;
var getSoValue = Utils.getSoValue;
var log = Utils.getLogger("BrowseFolders");

var NodeKinds = Utils.NodeKinds;
var BookMIMEs = Utils.BookMIMEs;

var doInit;

// This addon
var BrowseFolders = {
	name: "BrowseFolders",
	title: "Browse Folders",
	icon: "FOLDER",
	optionDefs: [
		{
			name: "sortMode",
			title: "Sorting mode",
			icon: "LIST",
			defaultValue: "author",
			values: ["title", "author", "authorSwapName", "filename"],
			valueTitles: {
				title: "By title",
				author: "By author then title",
				authorSwapName: "By author swapping name/surname",
				filename: "By filename"
			}
		},
		{
			name:	"imRoot",
			title:	"Internal memory root folder",
			icon:	"FOLDER",
			defaultValue: "",
			values: ["/database/media/books", "/database/media", "/media", "/books", ""],
			valueTitles: {
				"": "/" // yeah! :)
			}
		}
	],
	onInit: function() {
		doInit();
	}
};

// Skipping card scanning, if ".noscan" file is present in the root folder
var originalHandler = FskCache.diskSupport.canHandleVolume;
FskCache.diskSupport.canHandleVolume = function(volume) {
	try {
		if(FileSystem.getFileInfo(volume.path + ".noscan")) {
			return false;
		}
	} catch (ee) {
		log.error("error " + ee);
	}
	return originalHandler(volume);
};

// Resolves "delete book" problem in custom booknodes. Functions body is mostly copy paste from the original doDeleteBook.
var oldDeleteBook = kbook.model.doDeleteBook;
kbook.model.doDeleteBook = function () {
	try {
		if (this.currentBook && this.currentBook._myclass) {
			try {
				var bookPath = this.currentBook.media.source.path + this.currentBook.media.path;
				var bookNode = this.currentBook;
				var media = this.currentBook.media;
				var source = media.source;
				source.deleteRecord(media.id);
				this.addPathToDCL(media.source, media.path);
				var closeFunc = getSoValue(bookNode, "media.close");
				closeFunc.call(media, kbook.bookData);
				kbook.bookData.setData(null);
				bookNode.unlockPath();
				FileSystem.deleteFile(bookPath);
				kbook.root.update(kbook.model);
			} catch (e) {
				log.error("Failed to delete my node: " + e);
			}
			
			this.currentBook.gotoParent(kbook.model);
		} else {
			oldDeleteBook.apply(this, arguments);
		}
	} catch (ee) {
		log.error("Error in doDeleteBook: " + ee);
	}
};


// Little hack to allow easy changing of node title, comment, kind etc
kbook.tableData.oldGetValue = kbook.tableData.getValue;
kbook.tableData.getValue = function(node, field) {
	try {
		var myVal = node["_my"+field];
		if (typeof myVal != "undefined") {
			if (typeof myVal == "function") {
				return myVal.call(node, arguments);
			}
			return myVal;
		}
	} catch (e) {
	}
	return this.oldGetValue.apply(this, arguments);
};

kbook.tableData.oldGetKind = kbook.tableData.getKind;
kbook.tableData.getKind = function() {
	try {
		var myVal = this.node._mykind;
		if (typeof myVal != "undefined") {
			if (typeof myVal == "function") {
				return myVal.call(this, arguments);
			}
			return myVal;
		}
	} catch (e) {
	}
	return this.oldGetKind();
};

// Book path to index map. Allows to find existing book node corresponding to a given path.
var pathToBook = null;
var indexBooks = function() {
	if(!pathToBook) {
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
var pathToBookNode = function(path, parent) {
	indexBooks();
	var book = pathToBook[path];
	if(book) {
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
createBookNode = function(book, parent) {
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
	node._mykind = 2;
	node._mytitle = book.title;
	node._myname = book.title;
	node._mycomment = book.author;
	node._myclass = "BookNode";
	
	node.type = "book";
	
	return node;
};


// Node that shows folder content
var FolderNode = function(root, path,  type,  name, kind) {
	this.root = root;
	this.path = path;
	this.type = type;
	this.name = name ? name : path;
	this.title = this.name;
	this._mycomment = " ";
	this.locked = 0;

	if(typeof kind != "undefined") {
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
FolderNode.prototype = new Utils.ContainerNode();
FolderNode.prototype.update = function() {
	// Recreate nodes
	this._myconstruct();
};


//------------------------------------------------------------------------------
// Sorting
//------------------------------------------------------------------------------
var compareStrings = Utils.compareStrings;

var TYPE_SORT_WEIGHTS = {
	directory: -100,
	book: -50,
	picture: -25,
	audio: -10,
	file: 0
};

var swapNameAndSurname = function(str) {
	var idx = str.lastIndexOf(" ");
	if(idx < 0) {
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
		return compareStrings(a.name, b.name);
	} catch (e) {
		log.error("in sortByTitle : " + e);
	}		
};

var sortByAuthor = function (a, b, swap) {
	try {
		if(a.type !== b.type) {
			// directories first, etc
			return TYPE_SORT_WEIGHTS[a.type] - TYPE_SORT_WEIGHTS[b.type];
		}
		if(a.type !== "book") {
			return compareStrings(a.name, b.name);
		}
		// comparing books
		var aAuthor = a.media.author;
		var bAuthor = b.media.author;
		if(aAuthor === bAuthor) {
			return compareStrings(a.media.title, b.media.title);
		} else {
			if(swap) {
				aAuthor = swapNameAndSurname(aAuthor);
				bAuthor = swapNameAndSurname(bAuthor);
			}
			return compareStrings(aAuthor, bAuthor);
		}
	} catch (e) {
		log.error("in sortByAuthor : " + e);
	}
};

var sortByAuthorSwappingName = function(a, b) {
	return sortByAuthor(a, b, true);
};

var sortByFilename = function(a, b) {
	try {
		if(a.type !== b.type) {
			// directories first, etc
			return TYPE_SORT_WEIGHTS[a.type] - TYPE_SORT_WEIGHTS[b.type];
		}
		if(a.type !== "book") {
			return compareStrings(a.name, b.name);
		}
		
		var aPath = a.media.path;
		var bPath = b.media.path;
		return compareStrings(aPath, bPath);
	} catch (e) {
		log.error("In sortByFilename: " + e);
	}
};

FolderNode.prototype.sortNodes = function() {
	switch(BrowseFolders.options.sortMode) {
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

FolderNode.prototype._myconstruct = function() {
	indexBooks();
	var fullPath = this.root + this.path + "/";
	if (this.isFolder) {
		var iterator = new FileSystem.Iterator(fullPath);
		try {
			var item;
			if(this.nodes !== null && this.nodes.length > 0) {
				delete this.nodes;
			}
			this.nodes = [];
			try {
				while (item = iterator.getNext()) {
					var node;
					if (item.type == "directory") {
						node = new FolderNode(fullPath, item.path, item.type);
					} else if (item.type == "file") {
						var mime = FileSystem.getMIMEType(item.path);
						if(!mime || !BookMIMEs[mime]) {
							// not a book
							continue;
						}
						
						// Find existing node
						node = pathToBookNode(fullPath + item.path, this);
						if(!node) {
							node = new FolderNode(fullPath, item.path, item.type);
						}
					} else {
						continue; // wtf, neither folder nor file?
					}
					node.parent = this;
					this.nodes.push(node);
				}
			} catch (e) {
				log.error("Error iterating over " + fullPath + ": " + e);
				if(item) {
					log.error("Last item was: " + item.path);
				}
			}
			this.sortNodes();
		} finally {
			iterator.close();
		}
	} else {
		// If not internal memory
		var isExternalMem = (fullPath.length > 5 && fullPath.substring(0, 5) === "/Data");
		if(isExternalMem) {
			this.nodes = [this.createUnscannedBookNode(this, "Rescan internal memory", "", true, true)];
		} else {
			var copy = this.createUnscannedBookNode(this, "Copy to internal memory", "Copies file to the internal memory root");
			var copyAndReload = this.createUnscannedBookNode(this, "Copy & Rescan internal memory", 
							"Copies file to the internal memory root and rescans books", true);
			this.nodes = [copy, copyAndReload];			
		}
	}
};
// Book that was not scanned 
FolderNode.prototype.createUnscannedBookNode = function(parent, title, comment, doSynchronize, dontCopy) {
	var node = Utils.createContainerNode({
		"parent": parent,
		"title": parent.path,
		"name": title,
		"kind": NodeKinds.BACK,
		"comment": comment
	});
	
	var rootFolder = "/Data" + BrowseFolders.options.imRoot + "/";
	var from = parent.root + parent.path;
	var to = rootFolder + parent.path;
	node.enter = function() {
		try {
			if(!dontCopy) {
				FileSystem.ensureDirectory(rootFolder);
			
				// check if the file target exists
				if(FileSystem.getFileInfo(to)) {
					this.parent.enter(kbook.model);
					// warn and exit
					kbook.model.container.MENU_GROUP.MENU.setVariable("MENU_INDEX_COUNT", "Error, target file exists");
					parent._mycomment = "Error, target file exists";
					return;			
				}

				// copy the file			
				FileSystem.copyFile(from, to);	
			}

			if(doSynchronize) {
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

doInit = function() {
	var nodes = kbook.root.nodes;
	
	// Audio & Pictures nodes, shows "Now Playing", "Audio", "Pictures" nodes
	var audioAndPicturesNode = Utils.createContainerNode({
		parent: kbook.root,
		title: "Audio & Pictures",
		kind: NodeKinds.AUDIO
	});
	audioAndPicturesNode.nodes = [nodes[6],nodes[7],nodes[8]];
	
	// update from ContainerNode doesn't work for whatever reason, probably it is accessing the wrong "nodes"
	audioAndPicturesNode.update = function(model) {
		for (var i = 0, n = this.nodes.length; i < n; i++) {
			if(this.nodes[i].update) {
				this.nodes[i].update.call(this.nodes[i], model);
			}
		}
	};
	nodes[6].parent = audioAndPicturesNode;
	nodes[7].parent = audioAndPicturesNode;
	nodes[8].parent = audioAndPicturesNode;
	
	// Global
	Utils.nodes.audioAndPictures = audioAndPicturesNode;
	
	
	// Browse Folders node
	var booksByFolderNode = Utils.createContainerNode({
		parent: kbook.root,
		title: "Browse Folders",
		kind: NodeKinds.FOLDER,
		comment: "Browse the file system",
		separator: 1
	});
	booksByFolderNode.update = function() {
		this._myconstruct(kbook.model, true);
	};
	booksByFolderNode._myconstruct = function(model, fromChild) {	
		try {
			if(this.nodes !== null) {
				delete this.nodes;
			}
			this.nodes = [];
			var nodes = this.nodes;
			var node = new FolderNode("/Data" + BrowseFolders.options.imRoot, "", "directory", "Internal Memory", NodeKinds.INTERNAL_MEM);
			node.parent = this;
			this.nodes.push(node);
			if(FileSystem.getFileInfo("a:/")) {
				node = new FolderNode("a:", "", "directory", "Memory Stick", NodeKinds.MS);
				node.parent = this;
				nodes.push(node);
			}
			if(FileSystem.getFileInfo("b:/")) {
				node = new FolderNode("b:", "", "directory", "SD Card", NodeKinds.SD);
				node.parent = this;
				nodes.push(node);
			}
	
			// Since there is no direct way to determine in "enter" whether we are going from child to parent or not
			// this little hack is needed, forceEnter is true if 
			var myGotoParent = function() {
				this.exit(kbook.model);
				this.parent.enter(kbook.model, true);
			};
			for(var i = 0, n = nodes.length; i < n; i++) {
				nodes[i].gotoParent = myGotoParent;
			}
			
			
			if(nodes.length == 1) {
				// If there is only one subnode, don't show it
				if(fromChild) {
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
			log.error("error in booksByFolderNode._myconstruct : " + e);
		}
	};
	
	// Global
	Utils.nodes.booksByFolder = booksByFolderNode;
	
	var gamesNode = Utils.createContainerNode({
		parent: kbook.root,
		title: "Games & Utilities",
		comment: "",
		kind: NodeKinds.GAME,
		separator: 1
	});
	
	// Global
	Utils.nodes.gamesAndUtils = gamesNode;
	
	// Add separator to collections and remove separator from bookmarks.
	nodes[4]._myseparator = 1;
	nodes[5]._myseparator = 0;
	nodes[5].separator = 0;
	
	// Rearranging root node, hiding Audio&Pictures related nodes, adding Browse Folders, swapping bookmarks and collections node
	kbook.root.nodes = [nodes[0], nodes[1], nodes[2], nodes[3], booksByFolderNode, nodes[5], nodes[4], audioAndPicturesNode,  gamesNode, nodes[9]];
	
	// Adding Rescan internal memory node"
	var advancedSettingsNode = Utils.nodes.advancedSettings;
	var rescanInternalMemoryNode = FolderNode.prototype.createUnscannedBookNode(advancedSettingsNode, "Rescan internal memory", "", true, true);
	advancedSettingsNode.nodes.push(rescanInternalMemoryNode);
	
	// Global
	Utils.nodes.rescanInternalMemory = rescanInternalMemoryNode;
};

return BrowseFolders;