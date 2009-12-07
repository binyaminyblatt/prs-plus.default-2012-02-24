return {
	name: "Sudoku",
	description: "Sudoku Game",
	icon: "GAME",
	activate: function() {
		kbook.autoRunRoot.path = addonRoot + "Sudoku/sudoku.xml";
		kbook.autoRunRoot.enterIf(kbook.model);
	},
	actions: {
		"Sudoku": this.activate
	}
}