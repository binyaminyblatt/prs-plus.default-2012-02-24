// Name: Core
// Description: controls PRS+ initialization 
// Author: kartu
//
// History:
//	2010-03-14 kartu - Initial version, refactored from Utils
//	2010-04-17 kartu - Moved module specific global vars into local functions context
//	2010-04-21 kartu - Localized, removed call to lang.init
var log;

// initialized in lang
var coreL;

// dummy function, to avoid introducing global vars
var tmp = function() {
	Core.addons = [];
	Core.actions = [];
	
	// Calls given method for all array objects, passing arg as argument
	// Arguments:
	//	objArray - array of objects to call
	//	methodName - name of the method to call
	//	arg - argument to pass to <methodName> function
	//
	var callMethodForAll = function (objArray, methodName) {
		if (!objArray) {
			return;
		}
		for (var i = 0, n = objArray.length; i < n; i++) {
			var obj = objArray[i];
			var func = obj[methodName];
			if (typeof func === "function") {
				try {
					func.call(obj);
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
	var addActions = function(addon) {
		if(addon && addon.actions) {
			for(var i = 0, n = addon.actions.length; i < n; i++) {
				addon.actions[i].addon = addon;
				Core.actions.push(addon.actions[i]);
			}
		}
	};
	
	// Adds addon nodes, calls onPreInit & onInit
	//
	Core.addAddon = function(addon) {
		this.addons.push(addon);
		addActions(addon);
	};
	
	// Creates addon related nodes
	// 
	Core.init = function () {
		try {
			// Root settings node, located "Settings" => "Addon Settings"
			Core.ui.nodes.addonSettingsNode = Core.ui.createContainerNode({
				parent: Core.ui.nodes.settings,
				title: coreL("NODE_PRSP_SETTINGS"),
				kind: Core.ui.NodeKinds.SETTINGS,
				comment: ""
			});
			Core.ui.nodes.settings.nodes.splice(0, 0, Core.ui.nodes.addonSettingsNode);
	
			var addons = this.addons;
			
			// All addon's are loaded, call preInit (some addon's might change option defs)
			callMethodForAll(addons, "onPreInit");
			
			// Load options 
			for (var i = 0, n = addons.length; i < n; i++) {
				try {
					Core.settings.loadOptions(addons[i]);
				} catch (e0) {
					log.warn("error loading settings for addon " + addons[i].name + ": " + e0);
				}
			}
			
			// Addons and options are loaded, call init
			callMethodForAll(addons, "onInit");
			
			// Create addon nodes and addon option nodes
			// FIXME: shouldn't it be done by "settings.init()"???
			for (i = 0, n = addons.length; i < n; i++) {
				Core.settings.createAddonNodes(addons[i]);
				Core.settings.createAddonSettings(addons[i]);
			}
		} catch (e) {
			log.error("in core init", e);
		}
	};
};

// TODO onTerminate, onSleep, onResume
try {
	tmp();
} catch (ignore) {
	// logging system is not yet initialized
}