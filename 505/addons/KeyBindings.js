// Name: Key Bindings
// Description: Allows users to bind actions to keys
// Author: kartu
//
// History:
//	2010-03-01 kartu - Fixed missing string problem for next/previous song actions.
//	2010-03-01 kartu - Refactored localization code to use L function
//	2010-03-14 kartu - Refactored Utils -> Core
//	2010-03-14 kartu - Localized
//	2010-04-24 kartu - Prepared for merging into single JS
//	2010-04-25 kartu - Marked onPreInit as constructor

tmp = function() {
	var getSoValue = Core.system.getSoValue;
	var log = Core.log.getLogger("KeyBindings");
	var L = Core.lang.getLocalizer("KeyBindings");
	
	// --------------------------------------
	// Saving original functions
	var model = kbook.model;
	var modelDoMute = model.doMute;
	
	var menu = model.container.MENU_GROUP.MENU;
	var menuDoNext = menu.doNext;
	var menuDoPrevious = menu.doPrevious;
	var menuDoCenter = menu.doCenter;
	var menuDoFirst = menu.doFirst;
	var menuDoLast = menu.doLast;
	
	var book = model.container.PAGE_GROUP.PAGE;
	var bookDoNext = book.doNext;
	var bookDoPrevious = book.doPrevious;
	var bookDoLeft = book.doLeft;
	var bookDoRight = book.doRight;
	var bookDoCenter = book.doCenter;
	var bookDoFirst = book.doFirst;
	var bookDoLast = book.doLast;
	//--------------------------------------	
	
	var contexts = ["global", "menu", "book"];
	var contextObjects = {
			"global": model, 
			"menu": model.container.MENU_GROUP.MENU, 
			"book": model.container.PAGE_GROUP.PAGE
		};
	
	// Key events
	var events = ["kHold1", "kHold2", "kHold3", "kHold4", "kHold5", "kHold6", "kHold7", "kHold8", "kHold9", "kHold0",
			"kLeft", "kRight", "kUp", "kDown",
			"0x27", "0x27-hold", "0x42", "0x32", "0x30", "0x31", "kNext", "kPrevious",
			"0x21", "0x42-hold", "0x32-hold", "0x30-hold", "0x31-hold", "0x21-hold", "kLast", "kFirst",
			"0x41", "0x41-hold", "0x40", "0x40-hold"];
			
	// Key to method mappings
	var eventMethods = {
		"kHold1": "doHold1",
		"kHold2": "doHold2",
		"kHold3": "doHold3",
		"kHold4": "doHold4",
		"kHold5": "doHold5",
		"kHold6": "doHold6",
		"kHold7": "doHold7",
		"kHold8": "doHold8",
		"kHold9": "doHold9",
		"kHold0": "doHold0",
		"kLeft": "doLeft",
		"kRight": "doRight",
		"kUp": "doUp",
		"kDown": "doDown",
		"0x27": "doCenter",
		"0x27-hold": "doCenter",
		"0x42": "doSize",
		"0x32": "doMark",
		"0x30": "doNext",
		"0x31": "doPrevious",
		"kNext": "doNext",
		"kPrevious": "doPrevious",
		"0x21": "doMenu",
		"0x42-hold": "doRotate",
		"0x32-hold": "doMarkMenu",
		"0x30-hold": "doLast",
		"0x31-hold": "doFirst",
		"0x21-hold": "doRoot",
		"kLast": "doLast",
		"kFirst": "doFirst",
		"0x41": "doQuiet",
		"0x41-hold": "doMute",
		"0x40": "doLoud",
		"0x40-hold": "doMute"
	};
	var defVal = "default";
	var KeyBindings;
	var actionName2action = {};
	var savedHooks = {};
	var hookFunction;
	
	var doHook = function (contextObj, eventMethod, context) {
		var oldFunc = contextObj[eventMethod];
		if (oldFunc === hookFunction) {
			log.warn("Attempt to doublehook " + context + "." + eventMethod);
			return;
		}
		// save old hook
		savedHooks[context + eventMethod] = oldFunc;
		// hook
		Core.hook.hook(contextObj, eventMethod, hookFunction, context);	
	};
	
	// Calls default handlers. 
	// This function Is needed because some functions are called for more than one key
	//
	var callDefaultHandler = function (context, key) {
		switch (key) {
			case "0x27": // fallthrough
			case "0x27-hold":
				if (context == "book") {
					bookDoCenter.call(book);
				} else {
					menuDoCenter.call(menu);
				}
				break;
			case "0x31-hold": // falltrhough
			case "kFirst": 
				if (context == "book") {
					bookDoFirst.call(book);
				} else {
					menuDoFirst.call(menu);
				}
				break;
			case "0x30-hold": // falltrhough
			case "kLast":
				if (context == "book") {
					bookDoLast.call(book);
				} else {
					menuDoLast.call(menu);
				}
				break;
			case "0x41-hold": // falltrhough
			case "0x40-hold":
				modelDoMute.call(model);
				break;
			case "0x30": // fallthrough
			case "kNext":
				if (context == "book") {
					bookDoNext.call(book);
				} else {
					menuDoNext.call(menu);
				}
				break;
			case "0x31": // falltrhough
			case "kPrevious":
				if (context == "book") {
					bookDoPrevious.call(book);
				} else {
					menuDoPrevious.call(menu);
				}
				break;
			default:
				model.doBlink();
		}
	};
	
	hookFunction = function (args, oldFunc, tag) {
		try {
			var event = args[0];
			var key = getSoValue(event, "key");
			
			var options = KeyBindings.options;
			if (options.hasOwnProperty(tag) && options[tag].hasOwnProperty(key) && options[tag][key] !== defVal) {
				var actionName = options[tag][key];
				if (typeof actionName !== "undefined") {
					var action = actionName2action[actionName];
					if (typeof action !== "unfefined") {
						var actionFunc = action.action;
						var addon = action.addon;
						if (typeof actionFunc === "function") {
							actionFunc.call(addon, actionName, tag, this);
						} else {
							log.warn(actionName + ".action is not a function");
						}
					} else {
						log.warn("Cannot find addon corresponding to action: " + actionName);
					}
				} else {
					log.warn("undefined action name, event: " + event + " key: " + key);
				}
			} else {
				callDefaultHandler(tag, key);
			}
		} catch (e) {
			log.error("in hookFunction: " + e);
		}
	};
	
	KeyBindings = {
		name: "KeyBindings",
		title: L("TITLE"),
		description: L("DESCRIPTION"),
		icon: "SETTINGS",
		onInit: function () {
			try {
				var options = this.options;
				
				for (var i = 0, n = contexts.length; i < n; i++) {
					var context = contexts[i];
					var contextObj = contextObjects[context];
					var target = options[context];
					for (var j = 0, m = events.length; j < m; j++) {
						var event = events[j];
						var eventMethod = eventMethods[event];
						var actionName = target[event];
						if (typeof actionName !== "undefined" && actionName !== defVal) {
							doHook(contextObj, eventMethod, context);
						}
					}
				}
			} catch (e) {
				log.error("in onInit: " + e);
			}
		},
		/**
		* @constructor
		*/	
		onPreInit: function () {
			try {
				var contextLabels = [L("GLOBAL"), L("IN_MENU"), L("IN_BOOK")];
	
				var actions = Core.actions;	
				var values = [];
				var valueTitles = {};
				values.push(defVal);
				valueTitles[defVal] = L("DEFAULT_VALUE");
	
				for (var i = 0, n = actions.length; i < n; i++) {
					var action = actions[i];
					if (action && action.hasOwnProperty("name")) {
						values.push(action.name);
						actionName2action[action.name] = action;
						if (action.hasOwnProperty("title")) {
							valueTitles[action.name] = action.title;
						}
					}				
				}
	
				// Global
				this.optionDefs = [];
				
				// Menu & Book
				for (i = 0, n = contextLabels.length; i < n; i++) {
					var context = contextLabels[i];
					var target = contexts[i];
					var rootGroup = {
						groupTitle: context,
						groupIcon: "FOLDER",
						optionDefs: []
					};
					this.optionDefs.push(rootGroup);
		
					// Numbers
					var numberGroup = {
						groupTitle: L("NUM_BUTTONS"),
						groupIcon: "FOLDER"
					};
					rootGroup.optionDefs.push(numberGroup);
					numberGroup.optionDefs = [
						{target: target, name: "kHold1", title: L("BN_H_1"), defaultValue: defVal, values: values, valueTitles: valueTitles},
						{target: target, name: "kHold2", title: L("BN_H_2"), defaultValue: defVal, values: values, valueTitles: valueTitles},
						{target: target, name: "kHold3", title: L("BN_H_3"), defaultValue: defVal, values: values, valueTitles: valueTitles},
						{target: target, name: "kHold4", title: L("BN_H_4"), defaultValue: defVal, values: values, valueTitles: valueTitles},
						{target: target, name: "kHold5", title: L("BN_H_5"), defaultValue: defVal, values: values, valueTitles: valueTitles},
						{target: target, name: "kHold6", title: L("BN_H_6"), defaultValue: defVal, values: values, valueTitles: valueTitles},
						{target: target, name: "kHold7", title: L("BN_H_7"), defaultValue: defVal, values: values, valueTitles: valueTitles},
						{target: target, name: "kHold8", title: L("BN_H_8"), defaultValue: defVal, values: values, valueTitles: valueTitles},
						{target: target, name: "kHold9", title: L("BN_H_9"), defaultValue: defVal, values: values, valueTitles: valueTitles},
						{target: target, name: "kHold0", title: L("BN_H_0"), defaultValue: defVal, values: values, valueTitles: valueTitles}
					];
								
					// Volume buttons
					var volumeGroup = {
						groupTitle: L("VOLUME_BUTTONS"),
						groupIcon: "FOLDER"
					};
					rootGroup.optionDefs.push(volumeGroup);
					volumeGroup.optionDefs = [
						{target: target, name: "0x41", title: L("BN_VOLUME_DOWN"), defaultValue: defVal, values: values, valueTitles: valueTitles},
						{target: target, name: "0x41-hold", title: L("BN_H_VOLUME_DOWN"), defaultValue: defVal, values: values, valueTitles: valueTitles},
						{target: target, name: "0x40", title: L("BN_VOLUME_UP"), defaultValue: defVal, values: values, valueTitles: valueTitles},
						{target: target, name: "0x40-hold", title: L("BN_H_VOLUME_UP"), defaultValue: defVal, values: values, valueTitles: valueTitles}
					];
					
					// Joypad & Other buttons are for menu/book contexts only
					if (i > 0) {
						// Joypad
						var joypadGroup = {
							groupTitle: L("JP_BUTTONS"),
							groupIcon: "FOLDER"
						};
						rootGroup.optionDefs.push(joypadGroup);
						joypadGroup.optionDefs = [
							{target: target, name: "kLeft", title: L("BN_JP_LEFT"), defaultValue: defVal, values: values, valueTitles: valueTitles},
							{target: target, name: "kRight", title: L("BN_JP_RIGHT"), defaultValue: defVal, values: values, valueTitles: valueTitles},
							{target: target, name: "kUp", title: L("BN_JP_UP"), defaultValue: defVal, values: values, valueTitles: valueTitles},
							{target: target, name: "kDown", title: L("BN_JP_DOWN"), defaultValue: defVal, values: values, valueTitles: valueTitles},
							{target: target, name: "0x27", title: L("BN_JP_CENTER"), defaultValue: defVal, values: values, valueTitles: valueTitles},
							{target: target, name: "0x27-hold", title: L("BN_H_JP_CENTER"), defaultValue: defVal, values: values, valueTitles: valueTitles}
						];
							
						// Other buttons
						var otherGroup = {
							groupTitle: L("OTHER_BUTTONS"),
							groupIcon: "FOLDER"
						};
						rootGroup.optionDefs.push(otherGroup);
						otherGroup.optionDefs = [
							{target: target, name: "0x42", title: L("BN_SIZE"), defaultValue: defVal, values: values, valueTitles: valueTitles},
							{target: target, name: "0x32", title: L("BN_BOOKMARK"), defaultValue: defVal, values: values, valueTitles: valueTitles},
							{target: target, name: "0x30", title: L("BN_BL_NEXT"), defaultValue: defVal, values: values, valueTitles: valueTitles},
							{target: target, name: "0x31", title: L("BN_BL_PREVIOUS"), defaultValue: defVal, values: values, valueTitles: valueTitles},
							{target: target, name: "kNext", title: L("BN_SB_NEXT"), defaultValue: defVal, values: values, valueTitles: valueTitles},
							{target: target, name: "kPrevious", title: L("BN_SB_PREVIOUS"), defaultValue: defVal, values: values, valueTitles: valueTitles},
							{target: target, name: "0x21", title: L("BN_MENU"), defaultValue: defVal, values: values, valueTitles: valueTitles},
							{target: target, name: "0x42-hold", title: L("BN_H_SIZE"), defaultValue: defVal, values: values, valueTitles: valueTitles},
							{target: target, name: "0x32-hold", title: L("BN_H_BOOKMARK"), defaultValue: defVal, values: values, valueTitles: valueTitles},
							{target: target, name: "0x30-hold", title: L("BN_H_BL_NEXT"), defaultValue: defVal, values: values, valueTitles: valueTitles},
							{target: target, name: "0x31-hold", title: L("BN_H_BL_PREVIOUS"), defaultValue: defVal, values: values, valueTitles: valueTitles},
							{target: target, name: "0x21-hold", title: L("BN_H_MENU"), defaultValue: defVal, values: values, valueTitles: valueTitles},
							{target: target, name: "kLast", title: L("BN_H_SB_NEXT"), defaultValue: defVal, values: values, valueTitles: valueTitles},
							{target: target, name: "kFirst", title: L("BN_H_SB_PREVIOUS"), defaultValue: defVal, values: values, valueTitles: valueTitles}
						];
					}
				}
			} catch (e) {
				log.error("in onPreInit: " + e);
			}
		},
		onSettingsChanged: function (propertyName, oldValue, newValue, object) {
			if (oldValue === newValue) {
				// nothing has changed
				return;
			}
			var eventMethod = eventMethods[propertyName];
			if (typeof eventMethod === "undefined") {
				// nothing to do, since property is not a key
				return;
			}
		
			// Determine target object
			var context, contextObj;
			if (object === this.options.global) {
				context = "global";
			} else if (object === this.options.menu) {
				context = "menu";
			} else if (object === this.options.book) {
				context = "book";
			}
			contextObj = contextObjects[context];		
			
			if (oldValue === defVal) {
				// Hook if not already hooked
				doHook(contextObj, eventMethod, context);	
			} else if (newValue === defVal) {
				// Unhook
				var oldFunc = savedHooks[context + eventMethod];
				// not checking for "undefined" on purpose
				contextObj[eventMethod] = oldFunc;
			}
		},
		actions: [
			{
				name: "Shutdown",
				title: L("ACTION_SHUTDOWN"),
				group: "Utils",
				icon: "SHUTDOWN",
				action: function () {
					model.doDeviceShutdown();
				}
			},
			{
				name: "NextPage",
				title: L("ACTION_NEXT_PAGE"),
				group: "Utils",
				icon: "NEXT_PAGE",
				action: function () {
					bookDoNext.call(book);
				}
			},
			{
				name: "PreviousPage",
				title: L("ACTION_PREVIOUS_PAGE"),
				group: "Utils",
				icon: "PREVIOUS_PAGE",
				action: function () {
					bookDoPrevious.call(book);
				}
			},
			{
				name: "NextInHistory",
				title: L("ACTION_NEXT_IN_HISTORY"),
				group: "Utils",
				icon: "NEXT_PAGE",
				action: function () {
					bookDoRight.call(book);
				}
			},
			{
				name: "PreviousInHistory",
				title: L("ACTION_PREVIOUS_IN_HISTORY"),
				group: "Utils",
				icon: "PREVIOUS_PAGE",
				action: function () {
					bookDoLeft.call(book);
				}
			},
			{
				name: "NextSong",
				title: L("ACTION_NEXT_SONG"),
				group: "Utils",
				icon: "NEXT_PAGE",
				action: function () {
					model.doGotoNextSong();
				}
			},
			{
				name: "PreviousSong",
				title: L("ACTION_PREVIOUS_SONG"),
				group: "Utils",
				icon: "PREVIOUS_PAGE",
				action: function () {
					model.doGotoPreviousSong();
				}
			}		
		]
	};
	
	Core.addAddon(KeyBindings);
};
try {
	tmp();
} catch (e) {
	// Core's log
	log.error("in KeBindings.js", e);
}