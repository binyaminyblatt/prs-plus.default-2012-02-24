// Name: Utils
// Description: Provides all kinds of utility methods (getLogger, hook, cloneObj etc), initializes addons (store/load settings etc)
//

var log = Utils.getLogger("utils");

//--------------------------------------------------------------------------------------------------------------------
// SYSTEM
//--------------------------------------------------------------------------------------------------------------------

// A bit weird way to clone an object. There might be a better function or FSK specific operator to do the same
// Arguments:
//      obj - object to clone
// Returns:
//      "copy" of an object (linked objects as well as functions aren't cloned)
//
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
//
Utils.getSoValue = function (obj, propName) {
	return FskCache.mediaMaster.getInstance.call(obj, propName);
};

// Calls given method for all array objects, passing arg as argument
// Arguments:
//	objArray - array of objects to call
//	methodName - name of the method to call
//	arg - argument to pass to <methodName> function
//
Utils.callMethodForAll = function(objArray, methodName, arg) {
	if(!objArray) {
		return;
	}
	for (var i = 0, n = objArray.length; i < n; i++) {
		var obj = objArray[i];
		var func = obj[methodName];
		if(typeof func === "function") {
			try {
				func.call(obj, arg);
			} catch (ignore) {
			}
		}
	}
};


Utils.debug = {};
// Dumps properties of an object
//
Utils.debug.dump = function(obj, log) {
	for(var p in obj) {
		log.trace(p + " => " + obj);
	}
}; 
//--------------------------------------------------------------------------------------------------------------------
// SYSTEM - Hooks
//--------------------------------------------------------------------------------------------------------------------

var doHook = function (where, what, oldFunc, newFunc, hookType, tag) {
	if(!where.hasOwnProperty(what)  ||  (typeof where[what] !== "function")) {
		log.error("cannot hook non-existing function: " + what);
		return;
	}
	switch(hookType) {
	case "before":
		where[what] = function() {
			try {
				newFunc.call(this, arguments, oldFunc, tag);
			} catch(ignore) {
			}
			oldFunc.apply(this, arguments);
		};
		break;
	case "after":
		where[what] = function() {
			oldFunc.apply(this, arguments);
			try {
				newFunc.call(this, arguments, oldFunc, tag);
			} catch (ignore) {
			}
		};
		break;
	case "instead":
		where[what] = function() {
			newFunc.call(this, arguments, oldFunc, tag);
		};
		break;
	default:
		log.error("unknown hook type: " + hookType);
	}
	
};
Utils.hook = function(where, what, newFunction, tag) {
	doHook(where, what, where[what], newFunction, "instead", tag);
};
Utils.hookBefore = function(where, what, newFunction, tag) {
	doHook(where, what, where[what], newFunction, "before", tag);
};
Utils.hookAfter = function(where, what, newFunction, tag) {
	doHook(where, what, where[what], newFunction, "after", tag);
};

//--------------------------------------------------------------------------------------------------------------------
// GUI
//--------------------------------------------------------------------------------------------------------------------
// Node icons
Utils.NodeKinds = {
	BOOK: 2,
	FILE: 2,
	AUDIO: 3,
	PICTURE: 4,
	SETTINGS: 5,
	AUTHOR: 6,
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
	FOLDER: 37,
	MS: 34,
	SD: 35,
	INTERNAL_MEM: 36,
	GAME: 38,
	DEFAULT: 37,
	getIcon: function(strKind) {
		var kind = this[strKind];
		if(typeof kind === "undefined") {
			kind = Utils.NodeKinds.DEFAULT;
		}
		return kind;
	}
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
	root: kbook.root,
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
};

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
		if(arg.hasOwnProperty("parent")) {obj.parent = arg.parent;}
		if(arg.hasOwnProperty("title")) {obj.title = arg.title;}
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
		if(arg.hasOwnProperty("kind")) {obj.kind = arg.kind;}
		if(arg.hasOwnProperty("sourceKind")) {obj._mysourceKind = arg.sourceKind;}
		if(arg.hasOwnProperty("separator")) {obj._myseparator = arg.separator;}
	}
	obj.nodes = [];
	
	return obj;
};


// TODO descriptio
// Creates "value" node (used in settings).
// Arguments:
// 	arg, in addition to fields from createContainerNode, can have the following fields
//		optionDef - option definition
//		value - option value
//		object - target object, to set option to
//		addon - addon object
//
Utils.createValueNode = function(arg) {
	var node = Utils.createContainerNode(arg);
	node.enter = function() {
		var propertyName = arg.optionDef.name;
		arg.object[propertyName] = arg.value;
		var valueTitles = arg.optionDef.valueTitles;
		// TODO do this in enter() instead
		if(valueTitles) {
			arg.parent._mycomment = valueTitles[arg.value];
		} else {
			arg.parent._mycomment = arg.value;
		}
		// TODO utils.save? 
		if(arg.addon && arg.addon.onSettingsChanged) {
			arg.addon.onSettingsChanged(propertyName);
		}
		this.parent.parent.enter(kbook.model);
	};
	return node;
};

//--------------------------------------------------------------------------------------------------------------------
// About
//--------------------------------------------------------------------------------------------------------------------
// About
var getSoValue = Utils.getSoValue;
var about = kbook.model.container.ABOUT_GROUP.ABOUT;
var data = getSoValue(about, "data");
var records = getSoValue(data, "records");
var duplicate = getSoValue(this, "Fskin.tableData.duplicate");
var record = duplicate.call(this, records[1]);
var store = getSoValue(this, "Fskin.tableField.store");
store.call(this, record, "text", "PRS-Plus by Mikheil Sukhiashvili aka kartu (kartu3@gmail.com) using work of: " + 
	"igorsk, boroda, obelix, llasram and others.\n" +
	"© GNU Lesser General Public License.");
store.call(this, record, "kind", 4);
records.splice(0, 0, record);
about.dataChanged();

//--------------------------------------------------------------------------------------------------------------------
// SYSTEM - Initialization
//--------------------------------------------------------------------------------------------------------------------
// Creates entry under "Games & Utilities" corresponding to the addon.
// Arguments:
//	addon - addon variable
var createAddonNodes = function(addon) {
	if(addon && addon.activate) {
		var kind = Utils.NodeKinds.getIcon(addon.icon);
		var node = Utils.createContainerNode({
				parent: Utils.nodes.gamesAndUtils,
				title: addon.name,
				kind: kind,
				comment: addon.comment ? addon.comment : ""
		});
		node.enter = function() {
			addon.activate();
		};
		if(!Utils.nodes.gamesAndUtils.hasOwnProperty("nodes")) {
			Utils.nodes.gamesAndUtils.nodes = [];
		}
		Utils.nodes.gamesAndUtils.nodes.push(node);
	}
};

Utils.nodes.addonSettingsNode = Utils.createContainerNode({
	parent: Utils.nodes.settings,
	title: "Addon Settings",
	kind: Utils.NodeKinds.SETTINGS,
	comment: ""
});
Utils.nodes.settings.nodes.splice(0, 0, Utils.nodes.addonSettingsNode);

// Returns option title for given addon/option definition
//
var getOptionTitle = function(optionDef, value) {
	log.trace("getOpooinTitle with value " + value);
	if(optionDef.hasOwnProperty("valueTitles")) {
		value = optionDef.valueTitles[value];
		log.trace("returning converted value " + value);
		return value;
	}
	log.trace("returning value " + value);
	return value;
};

// Creates value nodes (used in addon settings) for given option definition and addon.
//  
var createValueNodes = function(parent, optionDef, addon) {
	var values = optionDef.values;
	for (var i = 0, n = values.length; i < n; i++) {
		var v = values[i];
		var node = Utils.createValueNode({
			parent: parent,
			title: getOptionTitle(optionDef, v),
			optionDef: optionDef,
			value: v,
			object: addon.options,
			addon: addon,
			kind: Utils.NodeKinds.CROSSED_BOX,
			comment: ""
		});
		// TODO selected node
		if(v === optionDef.defaultValue) {
			node.selected = true;
		}
		parent.nodes.push(node);
	}
};

// Creates entry under "Settings => Addon Settings" corresponding to the addon.
// Arguments:
//	addon - addon variable
var createAddonSettings = function(addon) {
	// TODO show current value as comment
	log.trace("creating addon settings: " + addon.name);
	try {
		// Addon
		if(addon && addon.optionDefs && addon.optionDefs.length > 0) {
			var optionDefs = addon.optionDefs;
			var settingsNode = Utils.nodes.addonSettingsNode;
	
			// Settings node for this addon
			var thisSettingsNode = Utils.createContainerNode({
					parent: settingsNode,
					title: addon.name,
					kind: Utils.NodeKinds.getIcon(addon.icon),
					comment: addon.comment ? addon.comment : ""
			});
			settingsNode.nodes.push(thisSettingsNode);
	
			// TODO
			for (var i = 0, n = optionDefs.length; i < n; i++) {
				var optionDef = optionDefs[i];
				var value = addon.options[optionDef.name];
				
				// If there is only one option, show values, else, first select the option
				if(n == 1) {
					thisSettingsNode._mycomment = getOptionTitle(optionDef, value);
					createValueNodes(thisSettingsNode, optionDef, addon);
				} else {
					var node = Utils.createContainerNode({
							parent: thisSettingsNode,
							title: optionDef.title,
							kind: Utils.NodeKinds.getIcon(optionDef.icon),
							comment: getOptionTitle(optionDef, value)
					});
					thisSettingsNode.nodes.push(node);
					createValueNodes(node, optionDef, addon);
				}
			}
		}
	} catch (e) {
		log.error("failed to create addon settings: " + addon.name + " " + e);
	}
};

// TODO
Utils.saveOptions = function(addon) {
}

// Loads addon's options, using default option values, if settings file or value is not present.
//
Utils.loadOptions = function(addon) {
	if(addon.optionDefs) {
		// TODO load settings from file
		var options = {};
		
		var optionDefs = addon.optionDefs;
		for (var i = 0, n = optionDefs.length; i < n; i++) {
			var optionDef = optionDefs[i];
			if(!options.hasOwnProperty(optionDef.name)) {
				options[optionDef.name] = optionDef.defaultValue;
			}
		}
		
		addon.options = options;
	}
};

// TODO
Utils.saveOptions = function(addon) {
};

// Initialize function, called by autorun.js
//
Utils.initialize = function(settingsPath) {
	try {
		log.trace("Entered initialize");
		var utils = this.utils;
		var addons = this.addons;
		var all = utils.concat(addons);
		
		// All addon's are loaded, call preInit (some addon's might change option defs)
		this.callMethodForAll(all, "onPreInit");
		
		// Load options 
		var loadOptions = this.loadOptions;
		for (var i = 0, n = all.length; i < n; i++) {
			loadOptions(all[i], settingsPath);
		}
		
		// Addons and options are loaded, call init
		this.callMethodForAll(all, "onInit");
		
		// Create addon nodes and addon option nodes
		for (i = 0, n = all.length; i < n; i++) {
			createAddonNodes(all[i]);
			createAddonSettings(all[i]);
		}
		
		// TODO sort addon & settings nodes ?
		log.info("Finished initialize");
	} catch (e) {
		log.error(e);
	}
};
