// Name: Clock
// Description: Shows digital clock in the lower right corner in menu and page (reading book) views
//


var trace = utils.trace;

var oldMenuPageChanged = kbook.model.container.MENU_GROUP.MENU.pageChanged;
var oldPagePageChanged = kbook.model.container.PAGE_GROUP.PAGE.pageChanged;
kbook.model.container.MENU_GROUP.MENU.pageChanged = function() {
	updateDate.call(this);
	oldMenuPageChanged.call(this);
}
kbook.model.container.PAGE_GROUP.PAGE.pageChanged = function() {
	updateDate.call(this);
	oldPagePageChanged.call(this);
}

function updateDate() {
	try {
		var time = new Date();
		var show = "";
		var clockMode = "on"
		switch(clockMode) {
			case "off":
				show = "";
				break;
			case "am/pm":
				var hours = time.getHours();
				var minutes = time.getMinutes();
				var m = "am";
				if (hours == 0) hours = 12;
				if (hours > 11) {
					m = "pm";
					if (hours > 12) hours -= 12;
				}
				if (hours < 10) hours = "0" + hours;
				if (minutes < 10) minutes = "0" + minutes;
				show = hours + ":" + minutes + m;
				break;
		
			case "on":
			default:
				var timeLocale = time.toLocaleTimeString();
				show = timeLocale.substring(0, timeLocale.lastIndexOf(':'));
				break;
		}
		
		this.setVariable("SHD_TIME", show);
	} catch (e) {
		trace("error in clock addon: " + e);
	}
}

// Initial value
updateDate.call(kbook.model.container.MENU_GROUP.MENU);