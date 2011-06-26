/* Name: Freecell game
   Original code (c) Ben Chenoweth
   Initial version: Dec. 2010
	History:
	2011-02-28 Ben Chenoweth - Changed addon name to CamelCase
*/

tmp = function() {
	var FreeCell = {
		name: "FreeCell",
		title: "Free Cell",
		description: "Card game",
		icon: "CARDS",
		activate: function () {
			kbook.autoRunRoot.sandbox.getSoValue = Core.system.getSoValue;
			kbook.autoRunRoot.sandbox.hasNumericButtons = Core.config.compat.hasNumericButtons;
			
			kbook.autoRunRoot.path = Core.config.addonsPath + "FreeCell/freecell.xml";
			kbook.autoRunRoot.enterIf(kbook.model);
		},
		actions: [{
			name: "FreeCell",
			group: "Games",
			icon: "CARDS",
			action: function () {
				FreeCell.activate();
			}
		}]
	};
	
	Core.addAddon(FreeCell);
};
try {
	tmp();
} catch (e) {
	// Core's log
	log.error("in FreeCell.js", e);
}