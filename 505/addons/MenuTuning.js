// Name: Menu Tuning
// Description: Forms main menu and allows to choose menu item on top level
// Authors: kartu, kravitz
//
// History:
//	2010-04-27 kravitz - Code of main menu forming is moved here from BrowseFolders.js
//	2010-04-27 kravitz - Menu item on top level setting
//	2010-05-03 kravitz - Code of nodes creating is moved to core.js

tmp = function() {
	// Shortcuts
	var log = Core.log.getLogger("MenuTuning");
	var MainMenu = kbook.root;

	// Localize
	var L = Core.lang.getLocalizer("MenuTuning");

	var MenuTuning = {
		name: "MenuTuning",
		settingsGroup: "menu",
		/**
		 * @constructor
		 */
		onPreInit: function() {
			this.optionDefs = [{
				name: "outer",
				title: L("OPTION_OUTER"),
				icon: "LIST",
				defaultValue: "gamesAndUtils",
				values: ["nowPlaying", "music", "pictures", "gamesAndUtils"],
				valueTitles: {
					nowPlaying: Core.ui.nodes.nowPlaying.title,
					music: Core.ui.nodes.music.title,
					pictures: Core.ui.nodes.pictures.title,
					gamesAndUtils: Core.ui.nodes.gamesAndUtils.title
				}
			}];
		}
	};

	MenuTuning.formOthers = function (outer) {
		var node = Core.ui.nodes[outer];
		var others = Core.ui.nodes.others;
		node.parent = MainMenu;
		node._myseparator = 1;
		MainMenu.nodes[8] = node;

		var values = this.optionDefs[0].values;
		others.nodes = [];
		for (var i = 0, n = values.length; i < n; i++) {
			if (values[i] !== outer) {
				node = Core.ui.nodes[values[i]];
				node.parent = others;
				node._myseparator = 0;
				others.nodes.push(node);
			}
		}
	};

	MenuTuning.onSettingsChanged = function (propertyName, oldValue, newValue) {
		if (oldValue === newValue) {
			return;
		}
		if (propertyName === "outer") {
			this.formOthers(newValue);
		}
	};

	MenuTuning.onInit = function () {
		// Adjust Main menu
		Core.ui.nodes.bookmarks._myseparator = 0;
		MainMenu.nodes[6] = Core.ui.nodes.collections;
		Core.ui.nodes.collections._myseparator = 1;
		MainMenu.nodes[7] = Core.ui.nodes.others;
		// Form Others menu
		this.formOthers(this.options.outer);
	};

	Core.addAddon(MenuTuning);
};

try {
	tmp();
} catch (e) {
	// Core's log
	log.error("in MenuTuning.js", e);
}