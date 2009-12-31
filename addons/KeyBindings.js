// Name: Key Bindings
// Description: Allows users to bind actions to keys
// Author: kartu
//

var log = Utils.getLogger("KeyBindings");
var getSoValue = Utils.getSoValue;

var str = {
	TITLE: "Key Bindings",
	DESCRIPTION: "Allows to bind actions to keys",
	
	DEFAULT_VALUE: "default",
	
	// Contexts
	GLOBAL:  "Global",
	IN_MENU: "When in menu",
	IN_BOOK:  "When reading book",

	// Button groups
	NUM_BUTTONS: "Numeric Buttons",
	JP_BUTTONS: "Joypad Buttons",
	OTHER_BUTTONS: "Other Buttons",
	
	// Buttons
	BN_SIZE: "Size button",
	BN_BOOKMARK: "Bookmark button",
	BN_BL_NEXT: "Bottom left 'next'",
	BN_BL_PREVIOUS: "Bottom left 'previous'",
	BN_SB_NEXT: "Sidebar 'next'",
	BN_SB_PREVIOUS:  "Sidebar 'previous'",
	BN_MENU: "Menu button",
	BN_JP_LEFT: "Joypad left",
	BN_JP_RIGHT: "Joypad right",
	BN_JP_UP: "Joypad up",
	BN_JP_DOWN: "Joypad down",
	BN_JP_CENTER: "Joypad center",
	BN_H_SIZE: "Holding size button",
	BN_H_BOOKMARK: "Holding bookmark button",
	BN_H_BL_NEXT: "Holding bottom left 'next page'",
	BN_H_BL_PREVIOUS: "Holding bottom left 'previous page'",
	BN_H_MENU: "Holding menu button",
	BN_H_SB_NEXT: "Holding sidebar 'next page'",
	BN_H_SB_PREVIOUS: "Holding sidebar 'previous page'",
	BN_H_JP_CENTER: "Holding joypad center button",
	BN_H_1: "Hold 1",
	BN_H_2: "Hold 2",
	BN_H_3: "Hold 3",
	BN_H_4: "Hold 4",
	BN_H_5: "Hold 5",
	BN_H_6: "Hold 6",
	BN_H_7: "Hold 7",
	BN_H_8: "Hold 8",
	BN_H_9: "Hold 9",
	BN_H_0: "Hold 0"
};

var contexts = ["global", "menu", "book"];
var contextObjects = [kbook.model, kbook.model.container.MENU_GROUP.MENU, kbook.model.container.PAGE_GROUP.PAGE];
// Key events
var events = ["kHold1","kHold2","kHold3","kHold4","kHold5","kHold6","kHold7","kHold8","kHold9","kHold0",
		"kLeft","kRight","kUp","kDown",
		"0x27","0x27-hold","0x42","0x32","0x30","0x31","kNext","kPrevious",
		"0x21","0x42-hold","0x32-hold","0x30-hold","0x31-hold","0x21-hold","kLast","kFirst"];
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
	"kFirst": "doFirst"	
};
var defVal = "default";
var KeyBindings;

var callDefaultHandler = function(context, key) {
	// TODO
	log.trace("calling default handler: " + context + "." + key);
};

var actionName2action = {};
var hookFunction = function(args, oldFunc, tag) {
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
	title: str.TITLE,
	description: str.DESCRIPTION,
	icon: "SETTINGS",
	onSettingsChanged: function (propertyName, oldValue, newValue, target) {
		// TODO
	},
	onInit: function() {
		try {
			var options = this.options;
			
			for (var i = 0, n = contexts.length; i < n; i++) {
				var context = contexts[i];
				var contextObj = contextObjects[i];
				var target = options[context];
				for (var j = 0, m = events.length; j < m; j++) {
					var event = events[j];
					var eventMethod = eventMethods[event];
					var actionName = target[event];
					if (typeof actionName !== "undefined" && actionName !== defVal) {
						Utils.hook(contextObj, eventMethod, hookFunction, context);
					}
				}
			}
		} catch (e) {
			log.error("in onInit: " + e);
		}
	},
	onPreInit: function() {
		try {
			var contextLabels = [str.GLOBAL, str.IN_MENU, str.IN_BOOK];

			var actions = Utils.actions;	
			var values = [];
			var valueTitles = {};
			values.push(defVal);
			valueTitles[defVal] = str.DEFAULT_VALUE;
			// TODO context specific actions
			for (var i = 0, n = actions.length; i < n; i++) {
				var action = actions[i];
				if(action && action.hasOwnProperty("name")) {
					values.push(action.name);
					actionName2action[action.name] = action;
					if(action.hasOwnProperty("title")) {
						valueTitles[action.name] = action.title;
					}
				}
				
			}

			// Global
			this.optionDefs = [
				{
					groupTitle: str.GLOBAL,
					groupIcon: "FOLDER",
					optionDefs: [
						{target: "global", name: "kHold1", title: str.BN_H_1, defaultValue: defVal, values: values, valueTitles: valueTitles},
						{target: "global", name: "kHold2", title: str.BN_H_2, defaultValue: defVal, values: values, valueTitles: valueTitles},
						{target: "global", name: "kHold3", title: str.BN_H_3, defaultValue: defVal, values: values, valueTitles: valueTitles},
						{target: "global", name: "kHold4", title: str.BN_H_4, defaultValue: defVal, values: values, valueTitles: valueTitles},
						{target: "global", name: "kHold5", title: str.BN_H_5, defaultValue: defVal, values: values, valueTitles: valueTitles},
						{target: "global", name: "kHold6", title: str.BN_H_6, defaultValue: defVal, values: values, valueTitles: valueTitles},
						{target: "global", name: "kHold7", title: str.BN_H_7, defaultValue: defVal, values: values, valueTitles: valueTitles},
						{target: "global", name: "kHold8", title: str.BN_H_8, defaultValue: defVal, values: values, valueTitles: valueTitles},
						{target: "global", name: "kHold9", title: str.BN_H_9, defaultValue: defVal, values: values, valueTitles: valueTitles},
						{target: "global", name: "kHold0", title: str.BN_H_0, defaultValue: defVal, values: values, valueTitles: valueTitles}
					]
				}
			];
			
			
			// Menu & Book
			for (i = 1, n = contextLabels.length; i < n; i++) {
				var context = contextLabels[i];
				var target = contexts[i];
	
				var numberGroup = {
					groupTitle: str.NUM_BUTTONS,
					groupIcon: "FOLDER"
				};
				var joypadGroup = {
					groupTitle: str.JP_BUTTONS,
					groupIcon: "FOLDER"
				};
				var otherGroup = {
					groupTitle: str.OTHER_BUTTONS,
					groupIcon: "FOLDER"
				};
				var rootOptionGroup = {
					groupTitle: context,
					groupIcon: "FOLDER",
					optionDefs: [numberGroup, joypadGroup, otherGroup]
				};
				
				this.optionDefs.push(rootOptionGroup);
	
				// Numbers
				numberGroup.optionDefs = [
					{target: target, name: "kHold1", title: str.BN_H_1, defaultValue: defVal, values: values, valueTitles: valueTitles},
					{target: target, name: "kHold2", title: str.BN_H_2, defaultValue: defVal, values: values, valueTitles: valueTitles},
					{target: target, name: "kHold3", title: str.BN_H_3, defaultValue: defVal, values: values, valueTitles: valueTitles},
					{target: target, name: "kHold4", title: str.BN_H_4, defaultValue: defVal, values: values, valueTitles: valueTitles},
					{target: target, name: "kHold5", title: str.BN_H_5, defaultValue: defVal, values: values, valueTitles: valueTitles},
					{target: target, name: "kHold6", title: str.BN_H_6, defaultValue: defVal, values: values, valueTitles: valueTitles},
					{target: target, name: "kHold7", title: str.BN_H_7, defaultValue: defVal, values: values, valueTitles: valueTitles},
					{target: target, name: "kHold8", title: str.BN_H_8, defaultValue: defVal, values: values, valueTitles: valueTitles},
					{target: target, name: "kHold9", title: str.BN_H_9, defaultValue: defVal, values: values, valueTitles: valueTitles},
					{target: target, name: "kHold0", title: str.BN_H_0, defaultValue: defVal, values: values, valueTitles: valueTitles}
				];
				
				
				// Joypad
				joypadGroup.optionDefs = [
					{target: target, name: "kLeft", title: str.BN_JP_LEFT, defaultValue: defVal, values: values, valueTitles: valueTitles},
					{target: target, name: "kRight", title: str.BN_JP_RIGHT, defaultValue: defVal, values: values, valueTitles: valueTitles},
					{target: target, name: "kUp", title: str.BN_JP_UP, defaultValue: defVal, values: values, valueTitles: valueTitles},
					{target: target, name: "kDown", title: str.BN_JP_DOWN, defaultValue: defVal, values: values, valueTitles: valueTitles},
					{target: target, name: "0x27", title: str.BN_JP_CENTER, defaultValue: defVal, values: values, valueTitles: valueTitles},
					{target: target, name: "0x27-hold", title: str.BN_H_JP_CENTER, defaultValue: defVal, values: values, valueTitles: valueTitles}
				];
	
				// Other buttons
				otherGroup.optionDefs = [
					{target: target, name: "0x42", title: str.BN_SIZE, defaultValue: defVal, values: values, valueTitles: valueTitles},
					{target: target, name: "0x32", title: str.BN_BOOKMARK, defaultValue: defVal, values: values, valueTitles: valueTitles},
					{target: target, name: "0x30", title: str.BN_BL_NEXT, defaultValue: defVal, values: values, valueTitles: valueTitles},
					{target: target, name: "0x31", title: str.BN_BL_PREVIOUS, defaultValue: defVal, values: values, valueTitles: valueTitles},
					{target: target, name: "kNext", title:str.BN_SB_NEXT, defaultValue: defVal, values: values, valueTitles: valueTitles},
					{target: target, name: "kPrevious", title: str.BN_SB_PREVIOUS, defaultValue: defVal, values: values, valueTitles: valueTitles},
					{target: target, name: "0x21", title: str.BN_MENU, defaultValue: defVal, values: values, valueTitles: valueTitles},
					{target: target, name: "0x42-hold", title: str.BN_H_SIZE, defaultValue: defVal, values: values, valueTitles: valueTitles},
					{target: target, name: "0x32-hold", title: str.BN_H_BOOKMARK, defaultValue: defVal, values: values, valueTitles: valueTitles},
					{target: target, name: "0x30-hold", title: str.BN_H_BL_NEXT, defaultValue: defVal, values: values, valueTitles: valueTitles},
					{target: target, name: "0x31-hold", title: str.BN_H_BL_PREVIOUS, defaultValue: defVal, values: values, valueTitles: valueTitles},
					{target: target, name: "0x21-hold", title: str.BN_H_MENU, defaultValue: defVal, values: values, valueTitles: valueTitles},
					{target: target, name: "kLast", title: str.BN_H_SB_NEXT, defaultValue: defVal, values: values, valueTitles: valueTitles},
					{target: target, name: "kFirst", title: str.BN_H_SB_PREVIOUS, defaultValue: defVal, values: values, valueTitles: valueTitles}
				];
			}
		} catch (e) {
			log.error("in onPreInit: " + e);
		}
	},
	// TODO should export built-in actions like "next in history" etc
	actions: []
};

return KeyBindings;