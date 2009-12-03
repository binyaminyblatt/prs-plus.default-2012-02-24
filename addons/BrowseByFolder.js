// Name: Browse by Folder
// Description: Adds "Browse by Folder" menu option, groups music&picture related menus, adds "Games" menu
//

var cloneObj = utils.cloneObj;
var getSoValue = utils.getSoValue;
var trace = utils.trace;

var NodeKinds = {
	BOOK: 2,
	AUDIO: 3,
	FILE: 2,
	BACK: 26,
	FOLDER: 37,
	MS: 34,
	SD: 35,
	INTERNAL_MEM: 36
};
var SourceKinds = {
	NONE: 0,
	MS: 2, // memory stick
	SD: 3 // SD card
};

// Book MIME types
var BookMIMEs = {
	"application/x-sony-bbeb": "BBeB Book",
	"text/plain": "Plain Text",
	"application/rtf": "Rich Text Format",
	"application/pdf": "Adobe PDF",
	"application/epub+zip": "EPUB Document"
};

// Skipping card scanning, if ".noscan" file is present in the root folder
var originalHandler = FskCache.diskSupport.canHandleVolume;
FskCache.diskSupport.canHandleVolume = function(volume) {
	try {
		if(FileSystem.getFileInfo(volume.path + ".noscan")) {
			return false;
		}
	} catch (ee) {
		trace("error " + ee);
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
				trace("Failed to delete my node: " + e);
			}
			
			this.currentBook.gotoParent(kbook.model);
		} else {
			oldDeleteBook.apply(this, arguments);
		}
	} catch (ee) {
		trace("Error in doDeleteBook: " + ee);
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

// Container node, displays subnodes, takes care of paging etc
function ContainerNode() {
	var oldEnter = this.enter;
	var oldExit = this.exit;

	this.enter = function() {
		try {
			// Call custom enter
			if(typeof (this._myconstruct) == "function") {
				var endHere = this._myconstruct.apply(this, arguments);
				if(endHere === true) {
					return;
				}
			}
			
			// Restore item selection
			if(this.hasOwnProperty("selectionIndex") && this.hasOwnProperty("nodes")) {
				var nodeToSelect = this.nodes[this.selectionIndex];
				if(nodeToSelect) {
					nodeToSelect.selected = true;
				}
			}
		} catch (e) {
			trace("error in ContainerNode.enter: " + e);
		}
		oldEnter.apply(this, arguments);
	};

	this.exit = function() {
		try {
			// Save parent's selection
			var nodes = this.nodes;
			this.selectionIndex = undefined;
			if(nodes) {
				for(var i = 0, n = nodes.length; i < n; i++) {
					if(nodes[i].selected) {
						this.selectionIndex = i;
						break;
					}
				}
			}
			
			if(this.hasOwnProperty("_myconstruct")) {
				delete this.nodes;
				this.nodes = [];
			}
		} catch (ignore) {
		}
		oldExit.apply(this, arguments);
	};	
}
ContainerNode.prototype = cloneObj(kbook.root.children.settings); // settings node

// Book path to index map. Allows to find existing book node corresponding to a given path.
var pathToBook = null;
function indexBooks() {
	if(!pathToBook) {
		pathToBook = {};
		var records = kbook.model.cache.textMasters;

		for (var i = 0, n = records.count(); i < n; i++) {
			var book = records.getRecord(i);
			var bookPath = book.source.path + book.path;
			pathToBook[bookPath] = book;
		}
	}	
}

//
// Returns:
//	returns new BookNode given a path, or null, if media cannot be found
function pathToBookNode(path, parent) {
	indexBooks();
	var book = pathToBook[path];
	if(book) {
		// Construct book node
		var node = cloneObj(kbook.root.children.books.prototype);
		node.media = book;
		node.cache = kbook.model.cache;
		node.parent = parent;
		node.depth = kbook.root.depth + 1;
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
		
		return node;
	}
	return null;
}


// Node that shows folder content
function FolderNode(root, path,  type,  name, kind) {
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
}
FolderNode.prototype = new ContainerNode();
FolderNode.prototype.update = function() {
	// Recreate nodes
	this._myconstruct();
};
FolderNode.prototype.sortNodes = function() {
	this.nodes.sort(
	// Well, sort by name, any dir > any file
	function (a, b) {
		if(a.type !== b.type) {
			// directories first
			var result = (a.type == "directory" ? -1 : 1);
			return result;
		}
		if(a.name === b.name) {
			return 0;
		}
		return a.name > b.name ? 1 : -1;
	}
	);
};
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
			this.sortNodes();
		} finally {
			iterator.close();
		}
	} else {
		// If not internal memory
		var isExternalMem = (fullPath.length > 5 && fullPath.substring(0, 5) === "/Data");
		if(isExternalMem) {
			this.nodes = [this.createOrphantBookNode(this, "Rescan internal memory", "", true, true)];
		} else {
			var copy = this.createOrphantBookNode(this, "Copy to internal memory", "Copies file to the internal memory root");
			var copyAndReload = this.createOrphantBookNode(this, "Copy & Rescan internal memory", 
							"Copies file to the internal memory root and rescans books", true);
			this.nodes = [copy, copyAndReload];			
		}
	}
};
// Book that was not scanned 
FolderNode.prototype.createOrphantBookNode = function(parent, title, comment, doSynchronize, dontCopy) {
	var node = new ContainerNode();
	node.parent = parent;
	node.title = parent.path;
	node.name = title;
	node.kind = NodeKinds.BACK;
	node._mycomment = comment;
	node._mysourceKind = 1;
	var rootFolder = "/Data/database/media/books/";
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
					trace("error synchronizing: " + e);
				}
				// Show root
				kbook.model.doRoot();
			} else {
				// go to parent's parent
				this.parent.parent.enter(kbook.model);
			}
		} catch (ee) {
				trace("error in copy file from .enter" + ee);
		}				
	};
	return node;
};


// Audio & Pictures nodes, shows "Now Playing", "Audio", "Pictures" nodes
var nodes = kbook.root.nodes;
var audioAndPicturesNode = new ContainerNode();
audioAndPicturesNode.parent = kbook.root;
audioAndPicturesNode.kind = NodeKinds.AUDIO;
audioAndPicturesNode.name = "Audio & Pictures";
audioAndPicturesNode.title = "Audio & Pictures";
audioAndPicturesNode.nodes = [nodes[6],nodes[7],nodes[8]];
audioAndPicturesNode.children = {};
// TODO stop using prototypes, update ContainerNode
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

// Books by Folder node
var browseBooksNode = new ContainerNode();
browseBooksNode.parent = kbook.root;
browseBooksNode.title = "Books by Folder";
browseBooksNode.name = "Books by Folder";
browseBooksNode.kind = NodeKinds.FOLDER;
browseBooksNode._mycomment = "Browse the file system";
browseBooksNode._mysourceKind = 1;
browseBooksNode._myseparator = 1;
browseBooksNode.update = function() {
	this._myconstruct(kbook.model, true);
};
browseBooksNode._myconstruct = function(model, fromChild) {	
	try {
		if(this.nodes !== null) {
			delete this.nodes;
		}
		this.nodes = [];
		var nodes = this.nodes;
		var node = new FolderNode("/Data/database/media/books", "", "directory", "Internal Memory", NodeKinds.INTERNAL_MEM);
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
		trace("error in browseBooksNode._myconstruct : " + e);
	}
};

var gamesNode = new ContainerNode();
gamesNode.parent = kbook.root;
gamesNode.title = "NOT IMPLEMENTED";
gamesNode.name = "Games";
gamesNode._myseparator = 0;
gamesNode.kind = NodeKinds.FOLDER;
gamesNode._mycomment = "coming soon...";
gamesNode._mysourceKind = 1;
gamesNode._myseparator = 1;

// Add separator to collections and remove separator from bookmarks.
nodes[4]._myseparator = 1;
nodes[5]._myseparator = 0;
nodes[5].separator = 0;


// Rearranging root node, hiding Audio&Pictures related nodes, adding Books by Folder, swapping bookmarks and collections node
kbook.root.nodes = [nodes[0], nodes[1], nodes[2], nodes[3], browseBooksNode, nodes[5], nodes[4], audioAndPicturesNode,  gamesNode, nodes[9]];


// Adding Rescan internal memory node"
var settingsNode = nodes[9];
var advancedSettingsNode = settingsNode.nodes[4];
advancedSettingsNode.nodes.push(FolderNode.prototype.createOrphantBookNode(advancedSettingsNode, "Rescan internal memory", "", true, true));
