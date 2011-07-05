// Name: StandbyImage
// Description: dummy to have settings for standbyImage
// Author: Mark Nord
//
// History:
//	2011-07-03 Mark Nord - Initial version
//  2011-07-05 Ben Chenoweth - minor corrections


tmp = function() {
	// Localize
	var L = Core.lang.getLocalizer("StandbyImage");

	// Constants
	var BLANK = "blank";

	switch (Core.config.model) {
	case "505":
	case "300":
	case "600":
        	var StandbyImage = {
        		name: "StandbyImage",
        		title: L("TITLE"),
        		icon: "STANDBY",
        		optionDefs: [
        			{
        				name: "mode",
        				title: L("STANDBY_IMG_KIND"),
        				icon: "PICTURES",
        				defaultValue: BLANK,
        				values: [BLANK, "random", "cover", "act_page"],
        				valueTitles: {
        					"blank": L("VALUE_BLANK"),
        					"random": L("VALUE_RANDOM"),
        					"cover": L("VALUE_COVER"),
        					"act_page": L("VALUE_ACT_PAGE")
        				}
        			},
        			{
        				name: "dither",
        				title: L("DITHER_STANDBY_IMG"),
        				icon: "SETTINGS",
        				defaultValue: "true",
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
        		onPreInit : function () {
        		return true;
        		}
        	}	
		break;
	default:        	
		var StandbyImage = {
        	name: "StandbyImage",
			title: L("TITLE"),
			icon: "STANDBY",
			optionDefs: [
				{
					name: "mode",
					title: L("STANDBY_IMG_KIND"),
					icon: "STANDBY",
					defaultValue: "system",
					values: ["system", "cover", "act_page"],
					valueTitles: {
						"system": L("VALUE_SYSTEM"),
						"cover": L("VALUE_COVER"),
						"act_page": L("VALUE_ACT_PAGE")
					}
				},
				{
					name: "dither",
					title: L("DITHER_STANDBY_IMG"),
					icon: "SETTINGS",
					defaultValue: "true",
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
        		onPreInit : function () {
        		return true;
        		}
        	}
		
	}

	Core.addAddon(StandbyImage);
};
try {
	tmp();
} catch (e) {
	// Core's log
	log.error("in StandbyImage.js", e);
}
