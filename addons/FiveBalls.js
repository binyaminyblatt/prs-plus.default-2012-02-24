// Name: Five Balls game
// Description: adapted version of Five Balls
// Author: Clemenseken, kartu
//
// History:
//	2010-03-14 kartu - #Refactored Utils -> Core

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

return FiveBalls;