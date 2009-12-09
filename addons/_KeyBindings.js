// Name: Key Bindings
// Description: Allows users to assign actions to keys
//

return;
var log = Utils.getLogger("KeyBindings");

kbook.model.container.MENU_GROUP.MENU.doCenter = function(event) {
	try {
		this.setVariable("MENU_INDEX_COUNT", "key is " + Utils.getSoValue(event, "key"));
	} catch (e) {
		this.setVariable("MENU_INDEX_COUNT", "error: " + e);
	}
};

kbook.model.container.MENU_GROUP.MENU.doDigit = function(event) {
        try {
		this.setVariable("MENU_INDEX_COUNT", "key is " + Utils.getSoValue(event, "key"));	
	} catch (e) {
		this.setVariable("MENU_INDEX_COUNT", "error: " + e);
	}
};

kbook.model.container.MENU_GROUP.MENU.doLeft = function(event) {
	try {
		this.setVariable("MENU_INDEX_COUNT", "key is " + Utils.getSoValue(event, "key"));	
	} catch (e) {
		this.setVariable("MENU_INDEX_COUNT", "error: " + e);
	}
};



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