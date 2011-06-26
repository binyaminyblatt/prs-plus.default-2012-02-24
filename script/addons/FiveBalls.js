/* Name: Fiveballs game
   Original code (c) 2008 Clemenseken
   
	History:
	date? kartu - further adaptation
	2010-12-11 Ben Chenoweth - conversion for Touch
	2010-12-12 Ben Chenoweth - applied Mark Nord's temporary workaround for PRS+1.1.3 on PRS-505
	2011-02-06 Ben Chenoweth - HOME button now quits game
	2011-02-10 Ben Chenoweth - Replaced small menu with buttons (touch version).
	2011-02-28 Ben Chenoweth - Changed addon name to CamelCase
*/

tmp = function() {
	var FiveBalls = {
		name: "FiveBalls",
		title: "Five Balls",
		description: "Game",
		icon: "FIVEBALLS",
		activate: function () {
			kbook.autoRunRoot.sandbox.getSoValue = Core.system.getSoValue;
			kbook.autoRunRoot.sandbox.hasNumericButtons = Core.config.compat.hasNumericButtons;
		
			kbook.autoRunRoot.path = Core.config.addonsPath + "FiveBalls/fiveballs.xml";
			kbook.autoRunRoot.enterIf(kbook.model);
		},
		actions: [{
			name: "FiveBalls",
			group: "Games",
			icon: "FIVEBALLS",
			action: function () {
				FiveBalls.activate();
			}
		}]
	};
	
	Core.addAddon(FiveBalls);
};
try {
	tmp();
} catch (e) {
	// Core's log
	log.error("in FiveBalls.js", e);
}