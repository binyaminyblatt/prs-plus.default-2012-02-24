// Name: Menu Customizer
// Description: Allows to customize root menu
// Author: kartu
//
// History:

var MenuCustomizer;
tmp = function() {
	var defVal = "default";
	// Name => node or getNode function map
	var nodeMap = {};
	// Used by default UI localizer
	Core.ui.nodes = nodeMap;
	var STANDARD_NODES = ["continue", "booksByTitle", "booksByAuthor", "booksByDate", "collections", "bookmarks", 
		"nowPlaying", "music","pictures", "settings", "advancedSettings"];
	
	//-------------------------------------------------------------------------------------------------------------
	// Returns node that has no title / action associated with it, just a placeholder (might be usefull to users who want specific menu layout)
	var emptyNode;
	var getEmptyNode = function() {
		if (emptyNode === undefined) {
			emptyNode = Core.ui.createContainerNode({
				title: "",
				icon: "EMPTY",
				comment: ""
			});
			emptyNode.enter = function() {
				kbook.model.doBlink();
			};
		}
		return emptyNode;
	};

	var createActivateNode = function (addon) {
		var node = Core.ui.createContainerNode({
				title: addon.title,
				icon: addon.icon,
				comment: addon.comment ? addon.comment : ""
		});
		node.enter = function() {
			addon.activate();
		};
		return node;
	};
	
	//-------------------------------------------------------------------------------------------------------------
	// Initializes node map
	var createListOfStandardNodes = function(nodeMap, values, valueTitles) {
		var standardMenuLayout = Core.config.compat.standardMenuLayout;
		// Root node
		nodeMap.root = kbook.root;
		
		// Empty node
		nodeMap.empty = getEmptyNode();
		values.push("empty");
		valueTitles.empty = nodeMap.empty.title;
		
		// Standard nodes
		var key, path, node;
		for (var i = 0, n = STANDARD_NODES.length; i < n; i++) {
			try {
				key = STANDARD_NODES[i];
				path = standardMenuLayout[key];
				if (path !== undefined) {
					node = kbook.root;
					for (var j = 0, m = path.length; j < m; j++) {
						node = node.nodes[path[j]];
					}
					nodeMap[key] = node;
					values.push(key);
					valueTitles[key] = node.title;
				}
			} catch (e) {
				log.error("Failed to find node: " + key + " " + e);
			}
		}
	};
	
	/** Creates addon nodes,addon can either provide "activate" function, 
	 * or getAddonNode function, returning node to show
	 */
	var createListOfAddonNodes = function(addons, addonNodes, values, valueTitles) {
		var addon, node;
		for (var i = 0, n = addons.length; i < n; i++) {
			addon = addons[i];
			if (typeof addon.activate == "function") {
				node = createActivateNode(addon);
			} else if (typeof addon.getAddonNode == "function") {
				node = addon.getAddonNode();
			} else {
				continue;
			}
			addonNodes[addon.name] = node;
			values.push(addon.name);
			valueTitles[addon.name] = node.title;
		}
	};
	
	MenuCustomizer = {
		name: "Menu Customizer",
		onPreInit: function() {
			var L, movableNodes, optionValues, optionValueTitles, menuOptionValues, menuOptionValueTitles, values;
			L = Core.lang.getLocalizer("MenuCustomizer");
			this.title = L("TITLE");
			this.optionDefs = [];
			movableNodes = Core.config.compat.prspMenu.movableNodes;
			
			// which node
			optionValues = [defVal];
			optionValueTitles = {};
			optionValueTitles[defVal] = L(defVal);
			// whether to show separator
			menuOptionValues = [defVal, "yes", "no"];
			menuOptionValueTitles = {
				"yes": L("VALUE_YES"),
				"no": L("VALUE_NO")
			};
			menuOptionValueTitles[defVal] = L("VALUE_DEFAULT");
			
			// Create list of standard nodes
			createListOfStandardNodes(nodeMap, optionValues, optionValueTitles);
			// Create list of addon nodes
			createListOfAddonNodes(Core.addons, nodeMap, optionValues, optionValueTitles);
			
			this.optionDefs = [];
			for (var i = 0; i < 10; i++) {
				// Don't show impossible values on unmovable nodes
				values = movableNodes[i] === 0 ?  [defVal] : optionValues;
				
				this.optionDefs.push({
						groupTitle: L("SLOT_" + (i + 1)),
						groupIcon: "FOLDER",
						optionDefs: [
							{
								name: "slot_" + i,
								title: L("MENU_ITEM"),
								defaultValue: defVal,
								values: values,
								valueTitles: optionValueTitles
							},
							{
								name: "slot_sep_" + i,
								title: L("MENU_SEPARATOR"),
								defaultValue: defVal,
								values: menuOptionValues,
								valueTitles: menuOptionValueTitles
							}
						]
				});
			}
		},
		
		onInit: function() {
			try {
				var i, n, options, root, prspMenu, customContainers, customNodes, movableNodes, defaultLayout, placedNodes,
					nodeName, node, container, isSeparator, customNode, parentNode, stillEmpty;
				
				options = this.options;
				root = nodeMap.root;
				prspMenu = Core.config.compat.prspMenu;
				// Custom node containers to create
				customContainers = prspMenu.customContainers;
				// Nodes assigned to certain nodes
				customNodes = prspMenu.customNodes;
				// Which nodes could be moved and which not
				movableNodes = prspMenu.movableNodes;
				// Default prsp menu layout
				defaultLayout = prspMenu.defaultLayout;
				
				// Create prs+ containers ("Multimedia", "Games & Utils" etc)
				for (i = 0, n = customContainers.length; i < n; i++) {
					container = customContainers[i];
					nodeMap[container.name] = Core.ui.createContainerNode({
						title: coreL(container.title),
						kind: container.kind,
						icon: container.icon
					});					
				}
				
				// Set of already placed nodes
				placedNodes = {};
				
				// Set root menu nodes, remembering which were placed and which were not
				// was a non empty node inserted
				stillEmpty = true; 
				for (i  = 9; i >= 0; i--) {
					nodeName = options["slot_" + i];
					isSeparator = options["slot_sep_" + i] === "true";
					// If slot set to default or node is unmovable
					if (nodeName === defVal || movableNodes[i] === 0) {
						if (defaultLayout[i] === undefined) {
							break;
						}
						nodeName = defaultLayout[i].name;
						if (options["slot_sep_" + i] === defVal) {
							isSeparator = defaultLayout[i].separator === true;
						}
					}
					node = nodeMap[nodeName];
					// node might be an actuall node or a function, that creates it
					if (typeof node == "function") { 
						node = node();
					}
					// if node is empty (or not found), have to insert empty node, if it is not the last node
					if (node === undefined || node === getEmptyNode()) {
						if (stillEmpty) {
							continue;
						} else {
							node = getEmptyNode();
						}
					}
					// set separator state
					node.separator = isSeparator ? 1 : 0;
					// attach to root
					root.nodes[i] = node;
					node.parent = root;
					placedNodes[nodeName] = true;
					stillEmpty = false;
				}
				
				// Insert curstom nodes
				for (i = 0, n = customNodes.length; i < n; i++) {
					customNode = customNodes[i];
					nodeName = customNode.name;
					if (placedNodes[nodeName] === true) {
						// Node was already placed in the root menu, nothing to do
						continue;
					}
					node = nodeMap[nodeName];
					if (node === undefined) {
						log.warn("Cannot find custom node " + nodeName);
						continue;
					}
					parentNode = nodeMap[customNode.parent];
					if (parentNode === undefined) {
						log.warn("Cannot find custom node parent: " + customNode.parent);
						continue;
					}
					node.parent = parentNode;
					if (customNode.position !== undefined) {
						if (customNode.replace) {
							parentNode.nodes[customNode.position] = node;
						} else {
							parentNode.nodes.splice(customNode.position, 0, node);
						}
						
					} else {
						parentNode.nodes.push(node);
					}
				}

			} catch (e) {
				log.error("in menu onInit: ", e);
			}
		},
		
		onSettingsChanged: function (propertyName, oldValue, newValue) {
			if (oldValue === newValue) {
				return;
			}
			// FIXME: remove coreL reference
			Core.ui.showMsg([coreL("MSG_RESTART")]);
		}
		
	};	

	Core.addAddon(MenuCustomizer);
};

try {
	tmp();
	tmp = undefined;
} catch (e) {
	log.error("Error in core-ui-menu: " + e); 
}
