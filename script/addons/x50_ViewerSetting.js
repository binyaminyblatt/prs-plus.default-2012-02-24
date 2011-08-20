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

	// overload kbookPage.draw to peek into
	var oldKbookPageDraw = kbook.kbookPage.draw;
	
	var draw = function (event) {
		var log = Core.log.getLogger('kbookPageDraw');
		try {
			log.trace('entering kbookPageDraw',t);
			log.trace('NotMarkOverlapArea1: '+this.NotMarkOverlapArea,t);
			this.NotMarkOverlapArea = Core.addonByName.x50_ViewerSettings.options.NotMarkOverlapArea === "true";
			log.trace('NotMarkOverlapArea2: '+this.NotMarkOverlapArea,t);
		//	log.trace('isZooming: '+this.isZooming,t);
		//	log.trace('isScrollView: '+this.isScrollView(),t);
		//	log.trace('monochrome.isRunning(): '+this.monochrome.isRunning(),t);
		} catch (ignore) {
		}
		
		// call original function
		oldKbookPageDraw.apply(this, arguments);	
	}

	var x50_ViewerSettings = {
		name: "x50_ViewerSettings",
		settingsGroup: "viewer", //"advSettings",
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
			/* this isn't working here !? -> patch kbook.kbookPage.draw 
			kbook.kbookPage.NotMarkOverlapArea = x50_ViewerSettings.options.NotMarkOverlapArea === "true";  */
			kbook.kbookPage.draw = draw;
			this.onSettingsChanged();
		},
		onSettingsChanged: function (propertyName, oldValue, newValue, object) {
		//	var log = Core.log.getLogger("x50_ViewerSettings");
		//	kbook.kbookPage.NotMarkOverlapArea = x50_ViewerSettings.options.NotMarkOverlapArea === "true";
			kbook.kbookPage.canDoubleTap = (x50_ViewerSettings.options.NoDictionary ==="true") ? function () {return false;} : function () {return true;};
			kbook.kbookPage.canLine = (x50_ViewerSettings.options.NoGesturePageTurn ==="true") ? function () {return false;} : function () {return !this.preventLine;};
		//	log.trace("kbook.kbookPage.canDoubleTap "+kbook.kbookPage.canDoubleTap.call() , "trace");
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
				if (x50_ViewerSettings.options.NoGesturePageTurn === "true") {
					x50_ViewerSettings.options.NoGesturePageTurn="false";
				}else {
					x50_ViewerSettings.options.NoGesturePageTurn = "true");
				}
			kbook.kbookPage.canLine = (x50_ViewerSettings.options.NoGesturePageTurn ==="true") ? function () {return false;} : function () {return !this.preventLine;};
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
