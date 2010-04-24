// Name: Five Balls game
// Description: adapted version of Five Balls
// Author: Clemenseken
//
// History:
//	2010-03-14 kartu - #Refactored Utils -> Core
//	2010-04-10 kartu - Prepared for merge into single JS
//	2010-04-10 kartu - Prepared for merge into single JS once more... :)

var tmp = function() {
	var FiveBalls = {
		name: "Five Balls",
		description: "Five Balls Game",
		icon: "GAME",
		activate: function () {
			kbook.autoRunRoot.path = Core.config.addonRoot + "FiveBalls/fiveballs.xml";
			kbook.autoRunRoot.enterIf(kbook.model);
		},
		actions: [{
			name: "Five Balls",
			group: "Games",
			icon: "GAME",
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