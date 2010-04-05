// Name: Core
// Description: controls PRS+ initialization 
// Author: kartu
//
// History:
//	2010-03-14 kartu - Initial version, refactored from Utils

var log;

// Localize
var str = {
	NODE_PRSP_SETTINGS: "PRS+ Settings"
};

var L = function (key) {
	if (str.hasOwnProperty(key)) {
		return str[key];
	} else {
		return "Core." + key;
	}
};

// Calls given method for all array objects, passing arg as argument
// Arguments:
//	objArray - array of objects to call
//	methodName - name of the method to call
//	arg - argument to pass to <methodName> function
//
var core_callMethodForAll = function (objArray, methodName, arg) {
	if (!objArray) {
		return;
	}
	for (var i = 0, n = objArray.length; i < n; i++) {
		var obj = objArray[i];
		var func = obj[methodName];
		if (typeof func === "function") {
			try {
				func.call(obj, arg);
			} catch (e) {
				try {
					if (typeof obj != "undefined" && obj.hasOwnProperty("name")) {
						log.error("error when calling method " + methodName + " on " + obj.name + ": " + e);
					} else {
						log.error("error when calling method " + methodName + " on object [" + i + "]: " + e);
					}
				} catch (ignore) {
				}
			}
		}
	}
};

// Adds all addons actions to the Core.actions array
var core_addActions = function(addon) {
	if(addon && addon.actions) {
		for(var i = 0, n = addon.actions.length; i < n; i++) {
			addon.actions[i].addon = addon;
			Core.actions.push(addon.actions[i]);
		}
	}
};


// Initializes addons & utils in an alphabetic order
// Utils have "_" prefix and are initialized before addons
var core_initializeAddons = function (addonPath) {
	var iterator = new FileSystem.Iterator(addonPath);
	try {
		var item;
		var addons = [];
		while (item = iterator.getNext()) {
			if (item.type == "file") {
				var path = item.path;
				if (Core.string.endsWith(path, ".js")) {
					addons.push(path);
				}
			}
		}
		addons.sort();
		
		// Load addons
		for (var i = 0, n = addons.length; i < n; i++) {
			try {
				var addon = Core.system.callScript(addonPath + addons[i]);
				if (typeof addon !== "undefined") {
					Core.addons.push(addon);
					core_addActions(addon);
				}
			} catch (e0) {
				log.error("Failed to initialize addon" + addons[i] + ": " + e0);
			}
		}
	} catch (e) {
		log.error("Error in initialize: " + e);
	} finally {
		iterator.close();
	}
};


// Initialize function, called by autorun.js
//
Core.init = function () {
	try {
		// Initialize localization engine
		Core.lang.init();
		core_initializeAddons(Core.config.addonRoot);
		
		// Root settings node, located "Settings" => "Addon Settings"
		Core.ui.nodes.addonSettingsNode = Core.ui.createContainerNode({
			parent: Core.ui.nodes.settings,
			title: L("NODE_PRSP_SETTINGS"),
			kind: Core.ui.NodeKinds.SETTINGS,
			comment: ""
		});
		Core.ui.nodes.settings.nodes.splice(0, 0, Core.ui.nodes.addonSettingsNode);


		var utils = this.utils;
		var addons = this.addons;
		var all = utils.concat(addons);
		
		// All addon's are loaded, call preInit (some addon's might change option defs)
		core_callMethodForAll(all, "onPreInit");
		
		// Load options 
		for (var i = 0, n = all.length; i < n; i++) {
			try {
				Core.settings.loadOptions(all[i]);
			} catch (e0) {
				log.warn("error loading settings for addon " + all[i].name + ": " + e0);
			}
		}

		// Addons and options are loaded, call init
		core_callMethodForAll(all, "onInit");
		
		// Create addon nodes and addon option nodes
		for (i = 0, n = all.length; i < n; i++) {
			Core.settings.createAddonNodes(all[i]);
			Core.settings.createAddonSettings(all[i]);
		}
	} catch (e) {
		log.error(e);
	}
};