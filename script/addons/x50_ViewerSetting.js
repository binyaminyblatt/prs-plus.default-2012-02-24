// Name: x50_ViewerSettings
// Description: Allows to 
//	choose if Overlap in 2page mode is masked, 
//	disables doubleTapAction and so dictionary
//	toggle border color grey/white
//	disable pageturen gesture
// Author: Mark Nord
//
// History:
//	2011-08-21 Mark Nord - Initial version
//	2011-08-23 Mark Nord - changed strategy to prevent dictionary (thanks quisvir)

tmp = function() {

	switch (Core.config.model) {
	case "505":
	case "300":
	case "600":
		return;	
		break;
	default:       
	}

	// Localize	 	
	var L = Core.lang.getLocalizer("x50_ViewerSettings");

	// Constants

	// overload kbook.kbookPage.doSelectWord called by kbook.kbookPage.readingTracker.doubleTap to disable Dictionary
	var oldDoSelectWord = kbook.kbookPage.doSelectWord;
	var doSelectWord = function (){
		if (Core.addonByName.x50_ViewerSettings.options.NoDictionary === "false") {
			return oldDoSelectWord.apply(this, arguments);
			
		}
	}
	// overload kbookPage.draw to peek into
	var oldKbookPageDraw = kbook.kbookPage.draw;
	var draw = function (event) {
		try {
			this.NotMarkOverlapArea = Core.addonByName.x50_ViewerSettings.options.NotMarkOverlapArea === "true";
		} catch (ignore) {
		}
		
		// call original function
		oldKbookPageDraw.apply(this, arguments);	
	}

	var x50_ViewerSettings = {
		name: "x50_ViewerSettings",
		settingsGroup: "advanced", //"viewer",
		optionDefs: [
			{
				name: "NotMarkOverlapArea",
				title: L("OPTION_NOTMARKOVERLAP"),
				icon: "SETTINGS",
				defaultValue: "true",
				values: ["true", "false"],
				valueTitles: {
					"true": L("VALUE_TRUE"),
					"false": L("VALUE_FALSE")
				}
			},	
			{
				name: "NoDictionary",
				title: L("OPTION_NODICT"),
				icon: "SETTINGS",
				defaultValue: "false",
				values: ["true", "false"],
				valueTitles: {
					"true": L("VALUE_TRUE"),
					"false": L("VALUE_FALSE")
				}
			},	
			{
				name: "BorderColor",
				title: L("OPTION_BORDERCOLOR"),
				icon: "SETTINGS",
				defaultValue: "grey",
				values: ["grey", "white"],
				valueTitles: {
					"grey": L("VALUE_GREY"),
					"white": L("VALUE_WHITE")
				}									
			},
			{
				name: "NoGesturePageTurn",
				title: L("OPTION_NOGESTURE"),
				icon: "SETTINGS",
				defaultValue: "false",
				values: ["true", "false"],
				valueTitles: {
					"true": L("VALUE_TRUE"),
					"false": L("VALUE_FALSE")
				}	
			}			
		],
		/**
		* @constructor
		*/
		onPreInit: function () {
		},
		onInit: function () {
			kbook.kbookPage.draw = draw;
			kbook.kbookPage.doSelectWord = doSelectWord;
			this.onSettingsChanged();
		},
		onSettingsChanged: function (propertyName, oldValue, newValue, object) {
			kbook.kbookPage.canLine = (x50_ViewerSettings.options.NoGesturePageTurn ==="true") ? function () {return false;} : function () {return !this.preventLine;};
			if (x50_ViewerSettings.options.BorderColor ==='grey') 
				{kbook.kbookPage.borderColor=Color.rgb.parse('#6D6D6D')
			} else { kbook.kbookPage.borderColor=Color.rgb.parse('white')
			}		
		}/*,
		actions: [{
			name: "toggleGestureOnOff",
			title: L("ACTION_toggleGestureOnOff"),
			group: "Utils",
			icon: "SETTINGS",
			action: function () {
				if (Core.addonByName.x50_ViewerSettings.options.options.NoGesturePageTurn === "true") {
					Core.addonByName.x50_ViewerSettings.options.NoGesturePageTurn="false";
				}else {
					Core.addonByName.x50_ViewerSettings.options.NoGesturePageTurn = "true");
				}
			kbook.kbookPage.canLine = (Core.addonByName.x50_ViewerSettings.options.NoGesturePageTurn ==="true") ? function () {return false;} : function () {return !this.preventLine;};
			}
		}] 	*/	
	};

	Core.addAddon(x50_ViewerSettings);
};
try {
	tmp();
} catch (e) {
	// Core's log
	log.error("in x50_ViewerSettings.js", e);
}
