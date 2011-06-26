/* Name: Chess game
   Original code (c) Ben Chenoweth
   Initial version: Jan. 2011
*/

tmp = function() {
	var Chess = {
		name: "Chess",
		title: "Chess",
		description: "Board game",
		icon: "CHESS",
		activate: function () {
			kbook.autoRunRoot.sandbox.getSoValue = Core.system.getSoValue;
			kbook.autoRunRoot.sandbox.hasNumericButtons = Core.config.compat.hasNumericButtons;
			
			kbook.autoRunRoot.path = Core.config.addonsPath + "Chess/chess.xml";
			kbook.autoRunRoot.enterIf(kbook.model);
		},
		actions: [{
			name: "Chess",
			group: "Games",
			icon: "CHESS",
			action: function () {
				Chess.activate();
			}
		}]
	};
	
	Core.addAddon(Chess);
};
try {
	tmp();
} catch (e) {
	// Core's log
	log.error("in Chess.js", e);
}