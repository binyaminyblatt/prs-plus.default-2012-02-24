// Name: Key Bindings
// Description: Module that allows to reassign keys to actions
// Author: kartu
//
// History:
//	2010-06-29 kartu - Initial version
//	2010-09-24 kartu - Added hasJoypadButtons / hasOtherButtons
//				Added support for 600 (new event system, handleEvent is called for UP and DOWN and HOLD events)

tmp = function() {
	var KeyBindings;
	var STATE_GLOBAL = "ALL";
	var contexts = [STATE_GLOBAL, "MENU", "PAGE"];
	var contextsLen = contexts.length;
	var defVal = "default";
	var contextLabels; // "when in menu" etc, initialized in pre init, 
	var values = []; // list of action names, initialized in pre init
	var valueTitles = {}; // localized list of action names, initialized in pre init
	var actionName2action = {}; // action name to actual function map, initialized in pre init
	var L; // localize function, initialized in pre init
	var compat; // compatibility configuration variable, initialized in pre init
	var keyCodes; // initialized in pre init
	var oldHandleEvent = Fskin.device.handleEvent; // saving original event handler
	var options; // addon's options, initialized in onInit
	
	// Returns action bound to the key, or undefined, if not bound
	var getBoundAction = function (key, state) {
		// Direct match
		var actionName = options[state + key];
		if (actionName !== undefined &&  actionName !== defVal) {
			return actionName2action[actionName];
		}
		
		// Global
		actionName = options[STATE_GLOBAL + key];
		if (actionName !== undefined &&  actionName !== defVal) {
			return actionName2action[actionName];
		}
	};
	
	// Handles key events, calling corresponding handler, if set (300/505)
	var handleEvent = function (target, event) {
		try {
			var key = event.getKey();
			var state = kbook.model.STATE;
			
			var action = getBoundAction(key, state);
			
			if (action !== undefined) {
				action.action();
				return;
			}
		} catch (e) {
			try {
				log.error("in handleEvent: " + e);
			} catch (ignore) {
			}
		}
		oldHandleEvent.apply(this, arguments);
	};	

	// Handles key events, calling corresponding handler, if set (version that supports 600 and, hopefully, the newer versions)
	var handleEvent2 = function (target, event, a, b) {
		try {
			// Only next / previous keys of 600 (and probably later versions) respond to this, not worth the hussle
			// -1 press, 2 hold, 1 release
			//var type = Fskin.customHoldTimePart.getEventValue(event);
			
			var key = this.getEventKey(event);
			var state = kbook.model.STATE;
			if (state == "MENU_HOME") {
				state = "MENU";
			}
			var action = getBoundAction(key, state);
			
			if (action !== undefined) {
				action.action();
				return;
			} else if (getBoundAction(key + "State", state)) {
				// Ignore "state" messages since there is a bound key
				return;
			}
		} catch (e) {
			try {
				log.error("in handleEvent: " + e);
			} catch (ignore) {
			}
		}
		oldHandleEvent.apply(this, arguments);
	};	
	
	// Creates option def subgroup that looks like:
	//	groupTitle
	//		contexts[1] + key
	//		contexts[2] + key
	//		...
	//		contexts[n] + key
	var createOptionDef = function(groupTitle, key) {
		var group = {
			groupTitle: groupTitle,
			groupIcon: "FOLDER"
		};
		group.optionDefs = [];
		for (var i = 0; i < contextsLen; i++) {
			group.optionDefs.push({
				name: contexts[i] + key,
				title: contextLabels[i],
				defaultValue: defVal,
				values: values, 
				valueTitles: valueTitles
			});
		}	
		return group;
	};
	
	// Fills values & valueTitles arrays with actions
	var createValueList = function() {
		// Fill value list with actions
		values.push(defVal);
		valueTitles[defVal] = L("DEFAULT_VALUE");
		var actions = Core.actions;
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
	};
	
	var createButtonOptions = function(keys, opDefs) {
		for (var i = 0, n = keys.length; i < n; i++) {
			// simple key press	
			var key = keys[i];
			var keyCode = keyCodes[key]; 
			if (keyCode !== undefined) {
				opDefs.push(createOptionDef(L("BN_" + key.toUpperCase()), keyCode));
			}
			
			// "hold" key press
			keyCode = keyCodes[key + "_h"];
			if (keyCode !== undefined) {
				opDefs.push(createOptionDef(L("BN_H_" + key.toUpperCase()), keyCode));
			}                                                      
		}
	};
	
	var createNumericButtonOptions = function() {
		// Numeric buttons
		if (compat.hasNumericButtons) {
			var numberGroup = {
				groupTitle: L("NUM_BUTTONS"),
				groupIcon: "FOLDER",
				optionDefs: []
			};
			KeyBindings.optionDefs.push(numberGroup);
			createButtonOptions(["1","2","3","4","5","6","7","8","9","0"], numberGroup.optionDefs);
		}
	};
	
	var createJoypadButtonOptions = function() {
		if (compat.hasJoypadButtons) {
			// Joypad buttons
			var joypadGroup = {
				groupTitle: L("JP_BUTTONS"),
				groupIcon: "FOLDER",
				optionDefs: []
			};
			KeyBindings.optionDefs.push(joypadGroup);
			createButtonOptions(["jp_left", "jp_right", "jp_up", "jp_down", "jp_center"], joypadGroup.optionDefs);
		}
	};
	
	var createVolumeButtonOptions = function() {
		// Volume buttons
		if (compat.hasVolumeButtons) {
			var volumeGroup = {
				groupTitle: L("VOLUME_BUTTONS"),
				groupIcon: "FOLDER",
				optionDefs: []
			};
			KeyBindings.optionDefs.push(volumeGroup);
			createButtonOptions(["volume_down", "volume_up"], volumeGroup.optionDefs);
		}	
	};
	
	var createOtherButtonOptions = function() {
		if (compat.hasOtherButtons) {
			var otherGroup = {
				groupTitle: L("OTHER_BUTTONS"),
				groupIcon: "FOLDER",
				optionDefs: []
			};
			KeyBindings.optionDefs.push(otherGroup);
			createButtonOptions(["home", "menu", "bookmark", "size"],otherGroup.optionDefs);
			if (compat.hasPagingButtons) {
				createButtonOptions(["bl_next", "bl_previous", "sb_next", "sb_previous"],otherGroup.optionDefs);
			}
		}
	};
	
	KeyBindings = {
		name: "KeyBindings",
		icon: "SETTINGS",
		onPreInit: function() {
			// Initialize options structure
			L = Core.lang.getLocalizer("KeyBindings");
			this.title = L("TITLE");
			this.optionDefs = [];
			
			compat = Core.config.compat;
			keyCodes = compat.keyCodes;
			contextLabels = [L("GLOBAL"), L("IN_MENU"), L("IN_BOOK")];

			createValueList();
			createNumericButtonOptions();
			createJoypadButtonOptions();
			createVolumeButtonOptions();
			createOtherButtonOptions();
		},
		
		onInit: function() {
			options = this.options;
			if (Fskin.deviceBooleanPart) {
				// 600+
				Fskin.device.handleEvent = handleEvent2;
			} else {
				// 300/500
				Fskin.device.handleEvent = handleEvent;
			}
		}
	};
	Core.addAddon(KeyBindings);
};

try {
	tmp();
	tmp = undefined;
} catch (e) {
	log.error("in core-key-bindings: " + e);
}
