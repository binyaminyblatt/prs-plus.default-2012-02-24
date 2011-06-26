/* Name: Mahjong game
   Original code (c) '08 Clemenseken
   Touch version: Dec. 2010
	History:
	2010-12-03 Ben Chenoweth - Touch adaptation and startup Code for PRS+
	2010-12-14 Ben Chenoweth - Removed some unnecessary graphics from the top of the screen.
	2010-12-15 Ben Chenoweth - Fixed the menu bug in the non-Touch, and added two buttons to the Touch version: "New layout" and "Easy/Normal"
	2011-02-10 Ben Chenoweth - Digit "0" quits (non-Touch); added Quit button (Touch).
*/

tmp = function() {
	var Mahjong = {
		name: "Mahjong",
		title: "Mahjong",
		description: "Game",
		icon: "MAHJONG",
		activate: function () {
		   try {
			kbook.autoRunRoot.sandbox.getSoValue = Core.system.getSoValue;
			kbook.autoRunRoot.sandbox.hasNumericButtons = Core.config.compat.hasNumericButtons;
			} catch (ignore) {}
			
			kbook.autoRunRoot.path = Core.config.addonsPath + "Mahjong/mahjong.xml";
			kbook.autoRunRoot.enterIf(kbook.model);
		},
		actions: [{
			name: "Mahjong",
			group: "Games",
			icon: "MAHJONG",
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