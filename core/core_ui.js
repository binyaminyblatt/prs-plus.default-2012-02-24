// Name: UI
// Description: User interface related methods and constants
// Author: kartu
//
// History:
//	2010-03-14 kartu - Initial version, refactored from Utils
//	2010-04-05 kartu - Removed stale code, added logging to getValue

Core.ui = {};

// Node icons
Core.ui.NodeKinds = {
	BOOK: 2,
	FILE: 2,
	AUDIO: 3,
	PICTURE: 4,
	SETTINGS: 5,
	AUTHOR: 6,
	PREVIOUS_PAGE: 8,
	NEXT_PAGE: 9,
	BOOKMARK: 10,
	LIST: 11,
	CLOCK: 12,
	PAUSE: 13,
	PLAY: 14,
	INFO: 15,
	LOCK: 16,
	BOOKS: 17,
	PICTURES: 18,
	CROSSED_BOX: 19,
	DATE: 22,
	ABOUT: 25,
	BACK: 26,
	ABC: 27,
	DATETIME: 28,
	DB: 29,
	SHUTDOWN: 31,
	FOLDER: 37,
	MS: 34,
	SD: 35,
	INTERNAL_MEM: 36,
	GAME: 38,
	DEFAULT: 37,
	getIcon: function (strKind) {
		var kind = this[strKind];
		if (typeof kind === "undefined") {
			kind = Core.ui.NodeKinds.DEFAULT;
		}
		return kind;
	}
};
// Small icons on the right side of books
Core.ui.NodeSourceKinds = {
	NONE: 0,
	MS: 2, // memory stick
	SD: 3 // SD card
};
// Book MIME types
Core.ui.BookMIMEs = {
	"application/x-sony-bbeb": "BBeB Book",
	"text/plain": "Plain Text",
	"application/rtf": "Rich Text Format",
	"application/pdf": "Adobe PDF",
	"application/epub+zip": "EPUB Document"
};

// Container node, displays subnodes, takes care of paging etc
Core.ui.ContainerNode = function (arg) {	
	var oldEnter = this.enter;
	var oldExit = this.exit;

	this.enter = function () {
		try {
			// Call construct
			if (typeof (this._myconstruct) == "function") {
				var endHere = this._myconstruct.apply(this, arguments);
				if (endHere === true) {
					return;
				}
			}
			
			// Restore item selection
			if (this.hasOwnProperty("selectionIndex") && this.hasOwnProperty("nodes")) {
				var nodeToSelect = this.nodes[this.selectionIndex];
				if (nodeToSelect) {
					nodeToSelect.selected = true;
				}
			}
		} catch (e) {
			log.error("error in ContainerNode.enter: " + e);
		}
		oldEnter.apply(this, arguments);
	};

	this.exit = function () {
		try {
			// Save parent's selection
			var nodes = this.nodes;
			this.selectionIndex = undefined;
			if (nodes) {
				for (var i = 0, n = nodes.length; i < n; i++) {
					if (nodes[i].selected) {
						this.selectionIndex = i;
						break;
					}
				}
			}
			
			if (this.hasOwnProperty("_myconstruct")) {
				delete this.nodes;
				this.nodes = [];
			}
		} catch (ignore) {
		}
		oldExit.apply(this, arguments);
	};	
};
Core.ui.ContainerNode.prototype = Core.system.cloneObj(kbook.root.children.settings); // settings node

// Creates "container" node, that displayes nodes in this.nodes[] array
// Arguments:
//	arg, can have the following fields:
//		parent - parent node
//		title - title of this node (shown on top of the screen, when inside the node)
//		name - name of this node (shown in lists, if none supplied, title is used instead)
//		comment - comment text (shown on the right bottom in list mode)
//		kind - one of the NodeKinds, determines which icon to show
//		sourceKind - one of the NodeSourceKinds, determines which small icon will be shown 
//					on the right side of the list (eg small "sd" letters)
//		separator - if equals to 1, node's bottom line will be shown in bold
Core.ui.createContainerNode = function (arg) {
	var obj = Core.system.cloneObj(kbook.root.children.settings);
	Core.ui.ContainerNode.call(obj);
	if (typeof arg !== "undefined") {
		if (arg.hasOwnProperty("parent")) {obj.parent = arg.parent;}
		if (arg.hasOwnProperty("title")) {obj.title = arg.title;}
		if (arg.hasOwnProperty("name")) {
			obj.name = arg.name;
		} else {
			obj.name = arg.title;
		}
		if (arg.hasOwnProperty("comment") && (typeof arg.comment !== "undefined")) {
			obj._mycomment = arg.comment;
		} else {
			obj._mycomment = "";
		}
		if (arg.hasOwnProperty("kind")) {obj.kind = arg.kind;}
		if (arg.hasOwnProperty("sourceKind")) {obj._mysourceKind = arg.sourceKind;}
		if (arg.hasOwnProperty("separator")) {obj._myseparator = arg.separator;}
	}
	obj.nodes = [];
	
	return obj;
};                                    

// Reference to nodes
var core_ui_nodes = kbook.root.nodes;
Core.ui.nodes = {
	root: kbook.root,
	"continue": core_ui_nodes[0],
	booksByTitle: core_ui_nodes[1],
	booksByAuthor: core_ui_nodes[2],
	booksByDate: core_ui_nodes[3],
	collections: core_ui_nodes[4],
	bookmarks: core_ui_nodes[5],
	nowPlaying: core_ui_nodes[6],
	music: core_ui_nodes[7],
	pictures: core_ui_nodes[8],
	settings: core_ui_nodes[9],
	advancedSettings: core_ui_nodes[9].nodes[4]
};

// Little hack to allow easy changing of node title, comment, kind etc


kbook.tableData.oldGetValue = kbook.tableData.getValue;
kbook.tableData.getValue = function (node, field) {
	try {
		var myVal = node["_my" + field];
		if (typeof myVal != "undefined") {
			if (typeof myVal == "function") {
				return myVal.call(node, arguments);
			}
			return myVal;
		}
	} catch (e) {
		log.error("in _my getValue: " + e);
	}
	try {
		return this.oldGetValue.apply(this, arguments);
	} catch (e2) {
		log.error("in getValue: " + e2);
		return "error: " + e2;
	}
};

kbook.tableData.oldGetKind = kbook.tableData.getKind;
kbook.tableData.getKind = function () {
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

