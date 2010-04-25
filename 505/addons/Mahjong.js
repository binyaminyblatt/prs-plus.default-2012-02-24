// Name: sudoku game
// Description: adapted version of Sudoku
// Author: Clemenseken
//
// History:
//	2010-03-14 kartu - #Refactored Utils -> Core
//	2010-04-10 kartu - Prepared for merging into single JS
//	2010-04-10 kartu - Prepared for merging into single JS once more... :)

tmp = function() {
	var Mahjong = {
		name: "Mahjong",
		title: "Mahjong",
		description: "Mahjong Game",
		icon: "GAME",
		activate: function () {
			kbook.autoRunRoot.path = Core.config.addonsPath + "Mahjong/mahjong.xml";
			kbook.autoRunRoot.enterIf(kbook.model);
		},
		actions: [{
			name: "Mahjong",
			group: "Games",
			icon: "GAME",
			action: function () {
				Mahjong.activate();
			}
		}]
	};
	
	Core.addAddon(Mahjong);
};
try {
	tmp();
} catch (e) {
	// Core's log
	log.error("in Mahjong.js", e);
}