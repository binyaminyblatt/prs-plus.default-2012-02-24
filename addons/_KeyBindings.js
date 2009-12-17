// Name: Key Bindings
// Description: Allows users to bind actions to keys
//

var log = Utils.getLogger("KeyBindings");
var getSoValue = Utils.getSoValue;


var doInit = function() {
	
}

return {
	name: "Key Bindings",
	description: "Allows to bind actions to keys",
	icon: "SETTINGS",
	activate: function() {a
		// TODO
	},
	init: function() {
		doInit();
	},
	// TODO should export built-in actions like "next in history" etc
	actions: [{}]
}


return;











var hookFunc = function(args, oldFunc, tag) {
	var event = args[0];
	var value = tag + " - key is " + Utils.getSoValue(event, "key");
	log.trace(value);
};



/*
var myBubble = function (id, param0, param1, param2, param3) {
	var data;
	if (id in this.sandbox) {
	       return this.sandbox[id].call(this, param0, param1, param2, param3);
	}
	data = this.getData();
	if (data) {
	       if (data.propertyIsScriptable(id)) {
		       return data[id].call(data, param0, param1, param2, param3);
	       }
	       if (id in data.sandbox) {
		       return data.sandbox[id].call(data, param0, param1, param2, param3);
	       }
	}
	if (this.chainable()) {
	       return this.container.bubble(id, param0, param1, param2, param3);
	}
	return this.window.bubble(id, param0, param1, param2, param3);
};*/
var rootThis = this;

function getBubbleFunc(key) {
	return function(event) {
		var value = "Bubbling: " + key + " - key is " + getSoValue(event, "key");
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
			log.error("error calling kbookMenu's " + key + ": " + e);
		}
	}
}

function getPageBubbleFunc(key) {
	return function(event) {
		var value = "Bubbling: " + key + " - key is " + getSoValue(event, "key");
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
			log.error("error calling kbookPage's " + key + ": " + e);
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


/*
---- hangs the device
var objNames = [
"Fskin.container.keyDown",
"Fskin.container.keyUp",
"Fskin.window.events.onKeyUp",
"Fskin.window.events.onKeyDown"
"Fskin.device.keys",
"Fskin.container.keys",
"Fskin.device.handleEvent"
];
for(var i = 0; n = objNames.length; i < n; i++) {
	var key = objNames[i];
	log.trace(key + " so is " + Utils.getSoValue(this, key));
}
*/

// TODO 
return;

var getKey = function(context, name, key, defHandler, defHandlerDescription) {
	return {		
		"context": context,
		"name": name,
		"key": key,
		"defHandler": defaultHandler,
		"defHandlerDescription": defaultHandlerDescription
	};
};
var doInit = function() {
	var joypadKeys = [
		getKey("menu", "Joypad Up", "doUp"),
		getKey("menu", "Joypad Down", "doDown"),
		getKey("menu", "Joypad Left", "doLeft"),
		getKey("menu", "Joypad Right", "doRight"),
		getKey("menu", "Joypad Center", "doCenter")
	];
};

return {
	name: "Key Bindings",
	init: function() {
		doInit();
	}
};

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