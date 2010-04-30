// Name: Events
// Description: events handling
// Author: kartu, kravitz
//
// History:
//	2010-04-29 kravitz - Initial version
//
// TODO:
//	- onSleep, onResume

try {
	// dummy function, to avoid introducing global vars
	tmp = function() {

		var addonsByNames = function (names) {
			var addons = [];
			for (var i = 0, n = names.length; i < n; i++) {
				var addon = Core.addonByName[names[i]];
				if (addon) {
					addons.push(addon);
				}
			}
			return addons;
		};

		var createHandler = function (parent, handler, before, instead, after) {
			try {
				var beforeAddons = addonsByNames(before);
				var insteadHandler;
				if (instead) {
					var addon = Core.addonByName[instead];
					if (addon && (typeof addon[handler] === "function")) {
						insteadHandler = addon[handler];
					}
				}
				var afterAddons = addonsByNames(after);

				var origHandler = parent[handler];
				parent[handler] = function () {
					var args = [this, origHandler, arguments];
					// Call handlers before native
					Core.callMethodForAll(beforeAddons, handler, args);
					if (insteadHandler) {
						// Call handler instead native
						try {
							insteadHandler.apply(instead, args);
						} catch (ee) {
							log.error(instead.name + "." + handler + "(): " + ee);
						}
					} else {
						// Call native handler
						origHandler.apply(this, arguments);
					}
					// Call handlers after native
					Core.callMethodForAll(afterAddons, handler, args);
				};

			} catch (e) {
				log.error("createHandler(" + handler + "): " + e);
			}
		};

		Core.events = {
			init: function () {
				// Event handlers

				// onChangeBook
				createHandler(kbook.model, "onChangeBook", [], undefined, ["ReadingList"]); //ReadMark , "ReadMark"]);

				// doDeleteBook
				createHandler(kbook.model, "doDeleteBook", ["ReadingList"], "BrowseFolders", []);

				// onTerminate
				var USBDispatcher = Core.system.getSoValue("USBDispatcher");
				USBDispatcher.prspOnTerminate = function () {
					try {
						Core.callMethodForAll(Core.addons, "onTerminate");
					} catch (e) {
						log.error("prspOnTerminate(): " + e);
					}
				};
			}
		};
	};
	tmp();
} catch (e) {
	log.error("initializing core-events", e);
}
