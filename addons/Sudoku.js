// Name: sudoku game
// Description: adapted version of Sudoku by obelix
//
return {
	name: "Sudoku",
	description: "Sudoku Game",
	icon: "GAME",
	activate: function() {
		kbook.autoRunRoot.path = Utils.config.addonRoot + "Sudoku/sudoku.xml";
		kbook.autoRunRoot.enterIf(kbook.model);
	},
	actions: [{
		name: "Sudoku",
		group: "Games",
		icon: "GAME",
		action: this.activate
	}]
}