// Name: Statusbar 
// Description: Provides access to statusbar controls, dispatches relevant events
// Author: kartu
//
// History:
//	2010-07-21 kartu - Initial version
//	2010-09-28 kartu - Adapted for 600 (MENU_GROUP => MENU_DETAILS_GROUP)
//	2010-11-27 kartu - Fixed #17 "clock is not updated when going from standby"
// Available to sub-addons
var StatusBar;

tmp = function() {
	var L = Core.lang.getLocalizer("StatusBar");
	var log = Core.log.getLogger("StatusBar");
	
	// not to type this gazillion times
	var sandbox = kbook.model.container.sandbox;
	var TIME = sandbox.STATUS_GROUP.sandbox.prspTime;
	var BOOK = sandbox.PAGE_GROUP.sandbox.PAGE;
	var MENU;
	if (sandbox.MENU_GROUP) {
		MENU = sandbox.MENU_GROUP.sandbox.MENU;
	} else if (sandbox.MENU_DETAILS_GROUP) {
		// FIXME move such code to compat
		MENU = sandbox.MENU_DETAILS_GROUP.sandbox.MENU;
	}

	// Statusbar widgets
	var widgets = [];
	
	var updateMenu = function() {
		Core.utils.callAll(widgets, MENU, undefined, "onMenuPageChanged");
	};
	
	var updateBook = function() {
		Core.utils.callAll(widgets, BOOK, undefined, "onBookPageChanged");
	};
	
	StatusBar = {
		name: "StatusBar",
		title: L("TITLE"),
		icon: "ABOUT",
		optionDefs: [],
		actions: [],
		onPreInit: function() {
			Core.utils.callAll(widgets, this, undefined, "onPreInit");

			// Add widgets' option definitions
			for (var i = 0, n = widgets.length; i < n; i++) {
				var od = widgets[i].optionDefs;
				if (od !== undefined) {
					for (var j = 0, m = od.length; j < m; j++) {
						this.optionDefs.push (od[j]); // concat is also possible, yes
					}
				}
			}
		},
		onInit: function() {
			Core.utils.callAll(widgets, this, undefined, "onInit");
		},
		setTime: function (value) {
			if (value === undefined) {
				value = "";
			}
			if (value !== TIME.getValue()) {
				// not to cause extra screen refresh (usual way would be to call setValue)
				TIME.text = value;
			}
		},
		setMenuIndex: function (value) {
			kbook.model.setVariable("MENU_INDEX_COUNT", value);
		},
		setBookIndex: function (value) {
			kbook.model.setVariable("BOOK_INDEX_COUNT", value);
		},
		addWidget: function (widget) {
			widgets.push(widget);
		},
		onSettingsChanged: function () {
			Core.utils.callAll(widgets, this, undefined, "onSettingsChanged");
			updateMenu();
			updateBook();
		}
	};
	
	StatusBar.onInit = function () {
		// Subscribe to "page changed" events in both menu and book
		Core.events.subscribe(Core.events.EVENTS.BOOK_PAGE_CHANGED, updateBook);
		Core.events.subscribe(Core.events.EVENTS.MENU_PAGE_CHANGED, updateMenu);
		// Update when going back from standby
		Core.events.subscribe(Core.events.EVENTS.RESUME, updateMenu);
	};
	
	Core.addAddon(StatusBar);
};

try {
	tmp();
	tmp = undefined;
} catch (e) {
	// Core's log
	log.error("in Statusbar.js", e);
}