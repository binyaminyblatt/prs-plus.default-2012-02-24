// Name: Clock
// Description: Shows digital clock in the lower right corner in menu and page (reading book) views
// Author: kartu
//

var log = Utils.getLogger("Clock");

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
			title: "Clock Style",
			icon: "CLOCK",
			defaultValue: "h24",
			values: ["h24", "h12"],
			valueTitles: {
				h24: "24 hours",
				h12: "12 hours"
			}
		},
		{
			name:	"mode",
			title:	"Clock Mode",
			icon:	"CLOCK",
			defaultValue: "all",
			values: ["all", "menu", "book", "off"],
			valueTitles: {
				all: "Always shown", 
				menu: "Shown only in menu",
				book: "Shown only when reading",
				off: "OFF"
			}
		}
		
	],
	actions: [{
		name: "toggleClock",
		title: "Toggle Clock",
		group: "Utils",
		icon: "CLOCK",
		action: function(ignore, context, ignore) {
			// Quick & dirty...
			if(this.options.mode === "all") {
				this.options.mode = "off";
			} else {
				this.options.mode = "all";
			}
			var target;
			if(context === "book") {
				target = PAGE;
			} else {
				target = MENU;
			}
			Utils.saveOptions(this);
			updateDate.call(target);
		}
	}]
};

updateDate = function(args, oldFunc, tag) {
	try {
		var mode = Clock.options.mode; 
		switch(mode) {
			case "all":
				break;
			case "menu": // fallthrough
			case "book":
				if(tag !== mode) {
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
		switch(Clock.options.style) {
			case "h12":
				var hours = time.getHours();
				var minutes = time.getMinutes();
				var m = "am";
				if (hours === 0) {hours = 12;}
				if (hours > 11) {
					m = "pm";
					if (hours > 12) {hours -= 12;}
				}
				if (hours < 10) {hours = "0" + hours;}
				if (minutes < 10) {minutes = "0" + minutes;}
				show = hours + ":" + minutes + m;
				break;
		
			case "h24":
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

Clock.onInit = function() {
	Utils.hookAfter(MENU, "pageChanged", updateDate, "menu");
	Utils.hookAfter(PAGE, "pageChanged", updateDate, "book");
	// Initial value
	updateDate.call(MENU);
};

return Clock;