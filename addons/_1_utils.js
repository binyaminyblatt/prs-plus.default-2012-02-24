var log = Utils.getLogger("utils");

//--------------------------------------------------------------------------------------------------------------------
// SYSTEM
//--------------------------------------------------------------------------------------------------------------------
// A bit weird way to clone an object. There might be a better function or FSK specific operator to do the same
// Arguments:
//      obj - object to clone
// Returns:
//      "copy" of an object (linked objects as well as functions aren't cloned)
Utils.cloneObj = function (obj) {
	var temp = FskCache.playlistResult;
	var dummy = {};
	try {
		FskCache.playlistResult = obj;
		var result = FskCache.playlist.browse(dummy);
		delete result.db;
		delete result.playlist;
		return result;
	} catch (e) {
		log.error("error cloning: " + e);
		return undefined;
	} finally {
		FskCache.playlistResult = temp;
	}
};

// Getting values of properties of objects created by .so bytecode isn't always possible for custom functions.
// However they are visible to .xb code
// Arguments:
//      obj - object to get value from
//      propName - property name, could also look like "prop1.prop2.prop3"
// Returns:
//      property value or undefined, if property is not defined
Utils.getSoValue = function (obj, propName) {
	return FskCache.mediaMaster.getInstance.call(obj, propName);
};

//--------------------------------------------------------------------------------------------------------------------
// GUI
//--------------------------------------------------------------------------------------------------------------------
// Node icons
Utils.NodeKinds = {
	BOOK: 2,
	AUDIO: 3,
	FILE: 2,
	BACK: 26,
	FOLDER: 37,
	MS: 34,
	SD: 35,
	INTERNAL_MEM: 36,
	GAME: 38,
	DEFAULT: 37
};
// Small icons on the right side of books
Utils.NodeSourceKinds = {
	NONE: 0,
	MS: 2, // memory stick
	SD: 3 // SD card
};
// Book MIME types
Utils.BookMIMEs = {
	"application/x-sony-bbeb": "BBeB Book",
	"text/plain": "Plain Text",
	"application/rtf": "Rich Text Format",
	"application/pdf": "Adobe PDF",
	"application/epub+zip": "EPUB Document"
};

// Reference to nodes
var nodes = kbook.root.nodes;
Utils.nodes = {
	"continue": nodes[0],
	booksByTitle: nodes[1],
	booksByAuthor: nodes[2],
	booksByDate: nodes[3],
	collections: nodes[4],
	bookmarks: nodes[5],
	nowPlaying: nodes[6],
	music: nodes[7],
	pictures: nodes[8],
	settings: nodes[9]
}


// Container node, displays subnodes, takes care of paging etc
Utils.ContainerNode = function(arg) {	
	var oldEnter = this.enter;
	var oldExit = this.exit;

	this.enter = function() {
		try {
			// Call construct
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
			log.error("error in ContainerNode.enter: " + e);
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
};
Utils.ContainerNode.prototype = Utils.cloneObj(kbook.root.children.settings); // settings node

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
Utils.createContainerNode = function (arg) {
	var obj = Utils.cloneObj(kbook.root.children.settings);
	Utils.ContainerNode.call(obj);
	if(typeof arg !== "undefined") {
		if(arg.hasOwnProperty("parent")) obj.parent = arg.parent;
		if(arg.hasOwnProperty("title")) obj.title = arg.title;
		if(arg.hasOwnProperty("name")) {
			obj.name = arg.name;
		} else {
			obj.name = arg.title;
		}
		if(arg.hasOwnProperty("comment") && (typeof arg.comment !== "undefined")) {
			obj._mycomment = arg.comment;
		} else {
			obj._mycomment = "";
		}
		if(arg.hasOwnProperty("kind")) obj.kind = arg.kind;
		if(arg.hasOwnProperty("sourceKind")) obj._mysourceKind = arg.sourceKind;
		if(arg.hasOwnProperty("separator")) obj._myseparator = arg.separator;
	}
	
	return obj;
}

// Creates entry under "Games & Utilities" corresponding to the addon.
// Arguments:
//	addon - addon variable
Utils.createAddonNode = function(addon) {
	if(addon && addon.activate) {
		var kind = Utils.NodeKinds[addon.icon];
		if(typeof kind === "undefined") {
			kind = Utils.NodeKinds.DEFAULT;
		}
		var node = Utils.createContainerNode({
				parent: Utils.nodes.gamesAndUtils,
				title: addon.name,
				kind: kind,
				comment: addon.comment ? addon.comment : ""
		});
		node.enter = addon.activate;
		if(!Utils.nodes.gamesAndUtils.hasOwnProperty("nodes")) {
			Utils.nodes.gamesAndUtils.nodes = [];
		}
		Utils.nodes.gamesAndUtils.nodes.push(node);
	}
}
