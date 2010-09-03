// Name: calculator
// Description: loader for calculator autorun
// Author: Mark Nord
// Based on work of: obelix, kartu
//
// History:
//	2010-06-05 Mark Nord - initial release

tmp = function() {
	var Calc = {
		name: "Calculator",
		title: "Calculator",
		description: "scientific calculator",
		icon: "CROSSED_BOX",
		activate: function () {
			kbook.autoRunRoot.path = Core.config.addonsPath + "Calc/calculator.xml";
			kbook.autoRunRoot.enterIf(kbook.model);
		},
		actions: [{
			name: "Calc",
			group: "Games",
			icon: "CROSSED_BOX",
			action: function () {
				Calc.activate();
			}
		}]
	};

	Core.addAddon(Calc);
};
try {
	tmp();
} catch (e) {
	// Core's log
	log.error("in Calc.js", e);
}
