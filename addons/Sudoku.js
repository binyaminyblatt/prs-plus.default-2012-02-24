// Name: sudoku game
// Description: adapted version of Sudoku
// Author: obelix
//
// History:
//	2010-03-14 kartu - #Refactored Utils -> Core
//	2010-04-10 kartu - Prepared for merging into single js

var Sudoku = {
	name: "Sudoku",
	title: "Sudoku",
	description: "Sudoku Game",
	icon: "GAME",
	activate: function () {
		kbook.autoRunRoot.path = Core.config.addonRoot + "Sudoku/sudoku.xml";
		kbook.autoRunRoot.enterIf(kbook.model);
	},
	actions: [{
		name: "Sudoku",
		group: "Games",
		icon: "GAME",
		action: function () {
			Sudoku.activate();
		}
	}]
};

Core.addAddon(Sudoku);