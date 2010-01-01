// Name: sudoku game
// Description: adapted version of Sudoku
// Author: Clemenseken, kartu
//
var Mahjong = {
	name: "Mahjong",
	title: "Mahjong",
	description: "Mahjong Game",
	icon: "GAME",
	activate: function() {
		kbook.autoRunRoot.path = Utils.config.addonRoot + "Mahjong/mahjong.xml";
		kbook.autoRunRoot.enterIf(kbook.model);
	},
	actions: [{
		name: "Mahjong",
		group: "Games",
		icon: "GAME",
		action: function() {
			Mahjong.activate();
		}
	}]
};

return Mahjong;