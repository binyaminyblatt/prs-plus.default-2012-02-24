// Name: Five Balls game
// Description: adapted version of Five Balls by Clemenseken
//
return {
	name: "Five Balls",
	description: "Five Balls Game",
	icon: "GAME",
	activate: function() {
		kbook.autoRunRoot.path = addonRoot + "FiveBalls/fiveballs.xml";
		kbook.autoRunRoot.enterIf(kbook.model);
	},
	actions: [{
		name: "Five Balls",
		group: "Games",
		icon: "GAME",
		action: this.activate
	}]
}