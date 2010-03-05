// Name: Five Balls game
// Description: adapted version of Five Balls
// Author: Clemenseken, kartu
//
var FiveBalls = {
	name: "Five Balls",
	description: "Five Balls Game",
	icon: "GAME",
	activate: function() {
		kbook.autoRunRoot.path = Utils.config.addonRoot + "FiveBalls/fiveballs.xml";
		kbook.autoRunRoot.enterIf(kbook.model);
	},
	actions: [{
		name: "Five Balls",
		group: "Games",
		icon: "GAME",
		action: function() {
			FiveBalls.activate();
		}
	}]
};

return FiveBalls;