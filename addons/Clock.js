// Name: Clock
// Description: Shows digital clock in the lower right corner in menu and page (reading book) views
// Author: kartu
//
// History:
//	2010-03-07 kartu - #Prepared for localization
//	2010-03-14 kartu - #Refactored Utils -> Core
//	2010-03-14 kartu - Localized

var str = Core.lang.getStrings("Clock");
var log = Core.log.getLogger("Clock");

// Localize
var L = function (key) {
	if (str.hasOwnProperty(key)) {
		return str[key];
	} else {
		return "Clock." + key;
	}
};


// not to type this gazillion times
var MENU = kbook.model.container.MENU_GROUP.MENU;
var PAGE = kbook.model.container.PAGE_GROUP.PAGE;

var updateDate; 
var Clock = {
	name: "Clock",
	icon: "CLOCK",
	optionDefs: [
		{
			name: "style",
			title: L("OPTION_STYLE"),
			icon: "CLOCK",
			defaultValue: "h24",
			values: ["h24", "h12"],
			valueTitles: {
				h24: L("VALUE_24H"),
				h12: L("VALUE_12H")
			}
		},
		{
			name:	"mode",
			title:	L("OPTION_MODE"),
			icon:	"CLOCK",
			defaultValue: "all",
			values: ["all", "menu", "book", "off"],
			valueTitles: {
				all: L("VALUE_ALWAYS_SHOWN"), 
				menu: L("VALUE_SHOWN_ONLY_IN_MENU"),
				book: L("VALUE_SHOWN_WHEN_READING"),
				off: L("VALUE_OFF")
			}
		}
		
	],
	actions: [{
		name: "toggleClock",
		title: L("ACTION_TOGGLE_CLOCK"),
		group: "Utils",
		icon: "CLOCK",
		action: function (ignore, context, ignore2) {
			// Quick & dirty...
			if (this.options.mode === "all") {
				this.options.mode = "off";
			} else {
				this.options.mode = "all";
			}
			var target;
			if (context === "book") {
				target = PAGE;
			} else {
				target = MENU;
			}
			Core.settings.saveOptions(this);
			updateDate.call(target);
		}
	}]
};

updateDate = function (args, oldFunc, tag) {
	try {
		var mode = Clock.options.mode; 
		switch (mode) {
			case "all":
				break;
			case "menu": // fallthrough
			case "book":
				if (tag !== mode) {
					this.setVariable("SHD_TIME", "");
					return;
				}
				break;
			case "off":
				this.setVariable("SHD_TIME", "");
				return;
		}
		
		var time = new Date();
		var show = "";
		switch (Clock.options.style) {
			case "h12":
				var hours = time.getHours();
				var minutes = time.getMinutes();
				var m = L("AM");
				if (hours === 0) {hours = 12;}
				if (hours > 11) {
					m = L("PM");
					if (hours > 12) {hours -= 12;}
				}
				if (hours < 10) {hours = "0" + hours;}
				if (minutes < 10) {minutes = "0" + minutes;}
				show = hours + ":" + minutes + m;
				break;
		
			case "h24": // fallthrough
			default:
				var timeLocale = time.toLocaleTimeString();
				show = timeLocale.substring(0, timeLocale.lastIndexOf(':'));
				break;
		}
		
		this.setVariable("SHD_TIME", show);
	} catch (e) {
		log.error("in updateDate: " + e);
	}
};

Clock.onInit = function () {
	Core.hook.hookAfter(MENU, "pageChanged", updateDate, "menu");
	Core.hook.hookAfter(PAGE, "pageChanged", updateDate, "book");
	// Initial value
	updateDate.call(MENU);
};

return Clock;