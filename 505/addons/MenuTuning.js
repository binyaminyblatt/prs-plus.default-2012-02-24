// Name: Menu Tuning
// Description: Forms main menu and allows to choose menu item on top level
// Authors: kartu, kravitz
//
// History:
//	2010-04-27 kravitz - Code of main menu forming is moved here from BrowseFolders.js
//	2010-04-27 kravitz - Menu item on top level setting

tmp = function() {
	// Shortcuts
	var log = Core.log.getLogger("MenuTuning");
	var NodeKinds = Core.ui.NodeKinds;
	var MainMenu = kbook.root;

	// Localize
	var L = Core.lang.getLocalizer("MenuTuning");

	var MenuTuning = {
		name: "MenuTuning",
		settingsGroup: "menu",
		optionDefs: [{
			name: "outer",
			title: L("OPTION_OUTER"),
			icon: "LIST",
			defaultValue: "gamesAndUtils",
			values: ["nowPlaying", "music", "pictures", "gamesAndUtils"],
			valueTitles: {
				nowPlaying: Core.ui.nodes.nowPlaying.title,
				music: Core.ui.nodes.music.title,
				pictures: Core.ui.nodes.pictures.title,
				gamesAndUtils: L("NODE_GAMES_AND_UTILS")
			}
		}]
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
		// "Others" node show "Now Playing", "Audio", "Pictures" and "Games & Utilities" nodes
		var othersNode = Core.ui.createContainerNode({
			parent: kbook.root,
			title: L("NODE_OTHERS"),
			kind: NodeKinds.AUDIO,
			comment: function () {
				return L("FUNC_X_ITEMS", this.nodes.length);
			}
		});
		// Update from ContainerNode doesn't work for whatever reason, probably it is accessing the wrong "nodes"
		othersNode.update = function (model) {
			for (var i = 0, n = this.nodes.length; i < n; i++) {
				if (this.nodes[i].update) {
					this.nodes[i].update.call(this.nodes[i], model);
				}
			}
		};
		Core.ui.nodes.others = othersNode;
		// "Games & Utilities" node
		var addonsNode = Core.ui.createContainerNode({
			parent: kbook.root,
			title: L("NODE_GAMES_AND_UTILS"),
			kind: NodeKinds.GAME,
			comment: function () {
				return L("FUNC_X_ITEMS", this.nodes.length);
			}
		});
		Core.ui.nodes.gamesAndUtils = addonsNode;
		// Adjust Main menu
		Core.ui.nodes.bookmarks._myseparator = 0;
		MainMenu.nodes[6] = Core.ui.nodes.collections;
		Core.ui.nodes.collections._myseparator = 1;
		MainMenu.nodes[7] = Core.ui.nodes.others;
		// Form "Others" menu
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