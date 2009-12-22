// Name: Key Bindings
// Description: Allows users to bind actions to keys
// Author: kartu
//

var log = Utils.getLogger("KeyBindings");
var getSoValue = Utils.getSoValue;

// TODO localize
var str = {
	NAME: "Key Bindings",
	DESCRIPTION: "Allows to bind actions to keys",
	
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

var KeyBindings = {
	name: str.NAME,
	description: str.DESCRIPTION,
	icon: "SETTINGS",
	onInit: function() {
		// TODO
	},
	onPreInit: function() {
		var contexts = [str.GLOBAL, str.IN_MENU, str.IN_BOOK];
		var contextTargets = ["global", "menu", "book"];
		// TODO actions
		var values = ["hey", "hoho"];
		
		this.optionDefs = [];
		
		// TODO define option defs
		for (var i = 0, n = contexts.length; i < n; i++) {
			var context = contexts[i];
			var target = contextTargets[i];

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
				{target: target, name: "kHold1", title: str.BN_H_1, defaultValue: false, values: values},
				{target: target, name: "kHold2", title: str.BN_H_2, defaultValue: false, values: values},
				{target: target, name: "kHold3", title: str.BN_H_3, defaultValue: false, values: values},
				{target: target, name: "kHold4", title: str.BN_H_4, defaultValue: false, values: values},
				{target: target, name: "kHold5", title: str.BN_H_5, defaultValue: false, values: values},
				{target: target, name: "kHold6", title: str.BN_H_6, defaultValue: false, values: values},
				{target: target, name: "kHold7", title: str.BN_H_7, defaultValue: false, values: values},
				{target: target, name: "kHold8", title: str.BN_H_8, defaultValue: false, values: values},
				{target: target, name: "kHold9", title: str.BN_H_9, defaultValue: false, values: values},
				{target: target, name: "kHold0", title: str.BN_H_0, defaultValue: false, values: values}
			];
			
			
			// Joypad
			joypadGroup.optionDefs = [
				{target: target, name: "kLeft", title: str.BN_JP_LEFT, defaultValue: false, values: values},
				{target: target, name: "kRight", title: str.BN_JP_RIGHT, defaultValue: false, values: values},
				{target: target, name: "kUp", title: str.BN_JP_UP, defaultValue: false, values: values},
				{target: target, name: "kDown", title: str.BN_JP_DOWN, defaultValue: false, values: values},
				{target: target, name: "0x27", title: str.BN_JP_CENTER, defaultValue: false, values: values},
				{target: target, name: "0x27-hold", title: str.BN_H_JP_CENTER, defaultValue: false, values: values}
			];

			// Other buttons
			otherGroup.optionDefs = [
				{target: target, name: "0x42", title: str.BN_SIZE, defaultValue: false, values: values},
				{target: target, name: "0x32", title: str.BN_BOOKMARK, defaultValue: false, values: values},
				{target: target, name: "0x30", title: str.BN_BL_NEXT, defaultValue: false, values: values},
				{target: target, name: "0x31", title: str.BN_BL_PREVIOUS, defaultValue: false, values: values},
				{target: target, name: "kNext", title:str.BN_SB_NEXT, defaultValue: false, values: values},
				{target: target, name: "kPrevious", title: str.BN_SB_PREVIOUS, defaultValue: false, values: values},
				{target: target, name: "0x21", title: str.BN_MENU, defaultValue: false, values: values},
				{target: target, name: "0x42-hold", title: str.BN_H_SIZE, defaultValue: false, values: values},
				{target: target, name: "0x32-hold", title: str.BN_H_BOOKMARK, defaultValue: false, values: values},
				{target: target, name: "0x30-hold", title: str.BN_H_BL_NEXT, defaultValue: false, values: values},
				{target: target, name: "0x31-hold", title: str.BN_H_BL_PREVIOUS, defaultValue: false, values: values},
				{target: target, name: "0x21-hold", title: str.BN_H_MENU, defaultValue: false, values: values},
				{target: target, name: "kLast", title: str.BN_H_SB_NEXT, defaultValue: false, values: values},
				{target: target, name: "kFirst", title: str.BN_H_SB_PREVIOUS, defaultValue: false, values: values}
			];
		}
		
	},
	// TODO should export built-in actions like "next in history" etc
	actions: [{}]
};

return KeyBindings;


/*
var hookFunc = function(args, oldFunc, tag) {
	var event = args[0];
	var value = tag + " - key is " + Utils.getSoValue(event, "key");
	log.trace(value);
};


var rootThis = this;

function getBubbleFunc(key) {
	return function(event) {
		var value = "Bubbling:  " + key + " - key is " + getSoValue(event, "key");
		log.trace(value);
		try {
			// TODO doRotate must go to ebook.doRotate
			
			var kbookMenu = getSoValue(rootThis, "Fskin.kbookMenu");
			var func = getSoValue(kbookMenu, key);
			if(typeof func === "function") {
				log.trace("calling kbookMenu." + key);
				func.apply(this, arguments);
				return;
			}
			
			func = kbook.model[key];
			if(typeof func === "function") {
				log.trace("calling model." + key);
				func.apply(kbook.model, arguments);
				return;
			}
		} catch (e) {
			log.error("error calling kbookMenu's " + key + ":  " + e);
		}
	}
}

function getPageBubbleFunc(key) {
	return function(event) {
		var value = "Bubbling:  " + key + " - key is " + getSoValue(event, "key");
		log.trace(value);
		try {
			// TODO doRotate must go to ebook.doRotate
			
			var kbookPage = getSoValue(rootThis, "Fskin.kbookPage");
			var func = getSoValue(kbookMenu, key);
			if(typeof func === "function") {
				log.trace("calling kbookPage." + key);
				func.apply(this, arguments);
				return;
			}
			
			func = kbook.model[key];
			if(typeof func === "function") {
				log.trace("calling model." + key);
				func.apply(kbook.model, arguments);
				return;
			}
		} catch (e) {
			log.error("error calling kbookPage's " + key + ":  " + e);
		}
	}
}

var events = ["doMenu","doRoot","doCenter","doLeft","doRight","doUp","doDown",	
		"doPrevious","doFirst","doNext","doLast","doSize","doRotate","doMark","doMarkMenu",
		"doDigit",
		"doHold1","doHold2","doHold3","doHold4","doHold5","doHold6","doHold7","doHold8","doHold9","doHold0",			
		"doQuiet","doMute","doLoud","doMute"];
		
var menu = kbook.model.container.MENU_GROUP.MENU;
for(var i = 0, n = events.length; i < n; i++) {
	var key = events[i];
	if(typeof menu[key] === "funciton") {
		Utils.hookBefore(menu, key, hookFunc, key);		
	} else {
		menu[key] = getBubbleFunc(key);
	}
}

return;
*/

/*
Key bindings: 

			<boolean key="kResume" do="doResume"/>
			<boolean key="kSleep" do="doSleep"/>
			<boolean key="kSuspend" do="doSuspend"/>
			<boolean key="kTestMode" do="doTestMode"/>
			<boolean key="kWakeup" do="doWakeup"/>
	
			<boolean key="0x00" do="doQuit"/>
	
			<boolean key="0x21" do="doMenu"/>
			<boolean key="0x21-hold" do="doRoot"/>
			
			<boolean key="0x27" do="doCenter"/>
			<boolean key="0x27-hold" do="doCenter"/>
			<boolean key="kLeft" do="doLeft"/>
			<boolean key="kRight" do="doRight"/>
			<boolean key="kUp" do="doUp"/>
			<boolean key="kDown" do="doDown"/>
	
			<boolean key="0x31" do="doPrevious"/>
			<boolean key="0x31-hold" do="doFirst"/>
			<boolean key="0x30" do="doNext"/>
			<boolean key="0x30-hold" do="doLast"/>
			
			<boolean key="kPrevious" do="doPrevious"/>
			<boolean key="kFirst" do="doFirst"/>
			<boolean key="kNext" do="doNext"/>
			<boolean key="kLast" do="doLast"/>
			
			<boolean key="0x42" do="doSize"/>
			<boolean key="0x42-hold" do="doRotate"/>
			
			<boolean key="0x32" do="doMark"/>
			<boolean key="0x32-hold" do="doMarkMenu"/>
	
			<string key="1" do="doDigit" />
			<string key="2" do="doDigit" />
			<string key="3" do="doDigit" />
			<string key="4" do="doDigit" />
			<string key="5" do="doDigit" />
			<string key="6" do="doDigit" />
			<string key="7" do="doDigit" />
			<string key="8" do="doDigit" />
			<string key="9" do="doDigit" />
			<string key="0" do="doDigit" />

			<string key="kHold1" do="doHold1"/>
			<string key="kHold2" do="doHold2"/>
			<string key="kHold3" do="doHold3"/>
			<string key="kHold4" do="doHold4"/>
			<string key="kHold5" do="doHold5"/>
			<string key="kHold6" do="doHold6"/>
			<string key="kHold7" do="doHold7"/>
			<string key="kHold8" do="doHold8"/>
			<string key="kHold9" do="doHold9"/>
			<string key="kHold0" do="doHold0"/>
			
			<boolean key="0x41" do="doQuiet"/>
			<boolean key="0x41-hold" do="doMute"/>
			<boolean key="0x40" do="doLoud"/>
			<boolean key="0x40-hold" do="doMute"/>
*/