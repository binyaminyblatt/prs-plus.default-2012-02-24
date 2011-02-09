// Name: Browse Folders
// Description: Adds "Browse Folders" menu option
// Author: kartu
//
// History:
//	2010-03-06 kartu - Added mount/umount feature
//	2010-03-07 kartu - Prepared for localization
//	2010-03-14 kartu - Refactored Utils -> Core
//	2010-03-14 kartu - Localized
//	2010-04-24 kartu - Prepared for merging into single JS
//	2010-04-25 kartu - Marked FolderNode and browseFoldersNode._myconstruct as constructors
//	2010-04-27 kravitz - Exported pathToBookNode() (fixing required)
//	2010-04-27 kravitz - Code of main menu forming is moved to MenuTuning.js
//	2010-04-29 kravitz - Refactored events handling
//	2010-05-15 kartu - Fixed: book list was initialized once and never updated
//	2010-05-24 kartu - Fixed weird bug "after deleting collection reader jumps to main menu, instead of collection" (fix by kravitz) that occured only if there was no SD card
//	2010-07-06 kartu - Rewritten from scratch, added "favourite folders" and picture,music,notes support
//	2010-09-29 kartu - Fixed: only existing roots will be shown in BrowseFolders (i.e. SD card won't be shown, if it is not inserted) 
//	2010-11-30 kartu - Refactoring Core.stirng => Core.text
//	2011-01-31 kartu - Removed comment field (fix for x50)
//	2011-02-04 kartu - Added trailing / to SD/MS/other roots check path
//	2011-02-06 kartu - Implemented #55 "'Jump to Folders' action"
//	2011-02-07 kartu - Implemented # sort by filename, showing filename as comment
//	2011-02-09 kartu - Fixed # BrowseFolders view not updated when settings change
/			Removed "mount" option

tmp = function() {
	var log, L, startsWith, trim, BrowseFolders, TYPE_SORT_WEIGHTS, compare, sorter, folderConstruct, 
		createFolderNode, createMediaNode, favourites, loadFavFolders, folderRootConstruct,
		compareFields, supportedMIMEs, createLazyInitNode, constructLazyNode, ACTION_ICON,
		doOpenHere, browseFoldersNode, extractFileName;
	log = Core.log.getLogger("BrowseFolders");
	L = Core.lang.getLocalizer("BrowseFolders");
	startsWith = Core.text.startsWith;
	trim = Core.text.trim;
	supportedMIMEs = {
		"application/rtf": true,
		"application/pdf": true,
		"application/epub+zip": true,
		"application/x-sony-bbeb": true,
		"text/plain": true
	};
	ACTION_ICON = "BACK";

	//-----------------------------------------------------------------------------------------------------------------------------
	// Sorting
	//-----------------------------------------------------------------------------------------------------------------------------
	TYPE_SORT_WEIGHTS = {
		folder: -100,
		book: -50,
		picture: -25,
		audio: -10,
		note: 0,
		file: 0
	};

	// Which fields to use for comparison
	compareFields = {
		"author": ["author", "titleSorter", "title"],
		"title": ["titleSorter", "title"],
		filename: ["path"],
		filenameAsComment: ["path"]
	};
	
	compare = Core.config.compat.compareStrings;
	sorter = function (a, b) {
		var compFields, i, n, result, field;
		try {
			if (a.type !== b.type) {
				// directories first, etc
				return TYPE_SORT_WEIGHTS[a.type] - TYPE_SORT_WEIGHTS[b.type];
			}
			if (a.type === "folder") {
				return compare(a.name, b.name);
			}
			if (a.hasOwnProperty("media") && b.hasOwnProperty("media")) {
				compFields = compareFields[BrowseFolders.options.sortMode];
				// compare fields until values don't match
				for (i = 0, n = compFields.length; i < n; i++) {
					field = compFields[i];
					result = compare(a.media[field], b.media[field]);
					if (result !== 0) {
						break;
					}
				}
				return result;
			}
			return compare(a.name, b.name);
		} catch (e) {
			log.error("in sortByTitle : " + e);
		}
	}; 

	//-----------------------------------------------------------------------------------------------------------------------------
	// Node creation
	//-----------------------------------------------------------------------------------------------------------------------------
	
	createFolderNode = function (path, title, parent, icon) {
		try {
			if (icon === undefined) {
				icon = "FOLDER";
			}
			// FIXME rename to createNode
			var node = Core.ui.createContainerNode({
					title: title,
					icon: icon,
					parent: parent,
					construct: folderConstruct
			});
			node.path = path + "/";
			node.type = "folder";
			return node;
		} catch (e) {
			log.error("in createFolderNode", e);
		}
	};
	
	createLazyInitNode = function (path, title, parent) {
		var node;
		node = Core.ui.createContainerNode({
				title: title,
				icon: "BOOK",
				parent: parent,
				construct: constructLazyNode
		});
		node.path = path;
		return node;
	};
	
	
	extractFileName = function(path) {
		var idx;
		if (path === undefined) {
			return undefined;
		}
		idx = path.lastIndexOf("/");
		if (idx > -1) {
			return path.substring(idx + 1);
		} else {
			return path;
		}
	};
	
	createMediaNode = function (path, title, parent) {
		var node, mime;
		node = Core.media.createMediaNode(path, parent);
		if (node === null) {
			// Either file that is not a media, or unscanned
			mime = FileSystem.getMIMEType(path);
			if (supportedMIMEs[mime]) {
				node = createLazyInitNode(path, title, parent);
			}
		} else if (BrowseFolders.options.sortMode === "filenameAsComment") {
			node._mycomment = function() {
				try {
					return extractFileName(this.media.path);
				} catch (e) {
					return "error: " + e;
				}
			};
		}
		return node;
	};

	//-----------------------------------------------------------------------------------------------------------------------------
	// "Lazy" opening for disabled scanning case
	//-----------------------------------------------------------------------------------------------------------------------------	
	doOpenHere = function() {
		var i, n, library, path, item, parent, mediaNode, nodes;
		
		// create media
		parent = this.parent;
		path = parent.path;
		library = Core.media.findLibrary(path);
		item = library.makeItemFromFile(path);
		item.path = path.substring(library.path.length);
		library.insertRecord(item);
		
		// create node
		mediaNode = Core.media.createMediaNode(path, parent.parent);

		// replace parent with media node
		nodes = parent.parent.nodes;
		for (i = 0, n = nodes.length; i < n; i++) {
			if (nodes[i] === parent) {
				nodes[i] = mediaNode;
			}
		}
		
		this.gotoNode(mediaNode, kbook.model);
	};
	
	//-----------------------------------------------------------------------------------------------------------------------------
	// Node constructors
	//-----------------------------------------------------------------------------------------------------------------------------
	// Construct "open here", "copy to IM and open" node
	constructLazyNode = function() {
		var openHereNode;
		openHereNode = Core.ui.createContainerNode({
				title: L("OPEN_HERE"),
				parent: this,
				icon: ACTION_ICON
		});
		openHereNode.enter = doOpenHere;
		this.nodes = [openHereNode];		
	};
	
	// Constructs folder node
	folderConstruct = function() {
		var path, nodes, iterator, item, factory, node;
		path = this.path;
		nodes = [];
		try {
			if (FileSystem.getFileInfo(path)) {
				iterator = new FileSystem.Iterator(path);
				while (item = iterator.getNext()) {
					if (item.type === "directory") {
						factory = createFolderNode;
					} else {
						factory = createMediaNode;
					}
					node = factory(path + item.path, item.path, this);
					if (node !== null) {
						nodes.push(node);
					}
				}
			}
			nodes.sort(sorter);
		} catch (e) {
			log.error("in folderConstruct " + e);
		}
		this.nodes = nodes;
	};
	
	// Loads favourite folders from fav_folders.config file if file exists 
	favourites = null;
	loadFavFolders = function (roots, rootTitles, rootIcons) {
		var filePath, content, line, name, path, i, n, icon;
		if (BrowseFolders.options.favFoldersFile === "enabled") {
			// load fav file content
			if (favourites === null) {
				filePath = Core.config.publicPath + "folders.cfg";
				content = Core.io.getFileContent(filePath, null);
				if (content !== null) {
					favourites = content.split("\n");
				} else {
					favourites = [];
				}
			}
			
			// parse fav file
			for (i = 0, n = favourites.length; i < n; i++) {
				try {
					line = favourites[i].split("\t");
					if (line.length === 2 && FileSystem.getFileInfo(trim(line[1])) && !startsWith(line[0], "#")) {
						name = line[0];
						path = trim(line[1]);
						roots.push(path);
						rootTitles.push(name);
						if (startsWith(path, "/Data")) {
							icon = "INTERNAL_MEM";
						} else if (startsWith(path, "a:")) {
							icon = "MS";
						} else if (startsWith(path, "b:")) {
							icon = "SD";
						} else {
							icon = "FOLDER";
						}
						rootIcons.push(icon);
					}
				} catch (e) {
					log.error("Processing line " + i, e);
				}
			}
		}
	};
	
	// Constructs "Browse Folders" node
	folderRootConstruct = function() {
		try {
			var i,n, nodes, roots, rootTitles, rootIcons, nNodes, idx;
			nodes = [];
			roots = [];
			rootTitles = [];
			rootIcons = [];
			
			// Load favourites
			loadFavFolders(roots, rootTitles, rootIcons);
			
			if (roots.length === 0) {
				roots = ["/Data" + BrowseFolders.options.imRoot, "b:", "a:"];
				rootTitles = [
					L("NODE_INTERNAL_MEMORY"),
					L("NODE_SD_CARD"),
					L("NODE_MEMORY_STICK")
				];
				
				rootIcons = [
					"INTERNAL_MEM",
					"SD",
					"MS"
				];
			}
			
			// Number of nodes created
			nNodes = 0;
			for (i = 0, n = roots.length; i < n; i++) {
				if (FileSystem.getFileInfo(roots[i] + "/")) {
					idx = i;
					nNodes++;
				}
			}
			if (nNodes === 1) {
				// Only one node, ask folderConstruct to create nodes (effectively: jump to child)
				this.path = roots[idx] + "/";
				folderConstruct.call(this);
				return;
			} else {
				for (i = 0, n = roots.length; i < n; i++) {
					if (FileSystem.getFileInfo(roots[i] + "/")) {
						nodes.push(createFolderNode(roots[i], rootTitles[i], this, rootIcons[i]));
					}
				}
			}

			this.nodes = nodes;
		} catch (e) {
			log.error("in folderRootConstruct", e);
		}
	};
	
	
	//-----------------------------------------------------------------------------------------------------------------------------
	// Addon & Option definitions
	//-----------------------------------------------------------------------------------------------------------------------------
	BrowseFolders = {
		name: "BrowseFolders",
		title: L("TITLE"),
		icon: "FOLDER",				
		getAddonNode: function() {
			var oldUnlock;
			if (browseFoldersNode === undefined) {
				browseFoldersNode = Core.ui.createContainerNode({
						title: L("NODE_BROWSE_FOLDERS"),
						shortName: L("NODE_BROWSE_FOLDERS_SHORT"),
						icon: "FOLDER",
						comment: "",
						parent: kbook.root,
						construct: folderRootConstruct
				});
				
				// When BrowseFolders settings change, child nodes are detached and unlock is forced.
				// this could lead to lock value to become negative.
				oldUnlock = browseFoldersNode.unlock;
				browseFoldersNode.unlock = function() {
					oldUnlock.apply(this, arguments);
					if (this.locked < 0) {
						this.locked = 0;
					}
				};
			}
			return browseFoldersNode;
		},
		optionDefs: [
			{
				name: "sortMode",
				title: L("OPTION_SORTING_MODE"),
				icon: "LIST",
				defaultValue: "author",
				values: ["title", "author", "filename", "filenameAsComment"],
				valueTitles: {
					title: L("VALUE_BY_TITLE"),
					author: L("VALUE_BY_AUTHOR_THEN_TITLE"),
					filename: L("VALUE_BY_FILENAME"),
					filenameAsComment:  L("VALUE_BY_FILENAME_AS_COMMENT")
				}
			},
			{
				name: "imRoot",
				title: L("OPTION_IM_ROOT"),
				icon: "FOLDER",
				defaultValue: "",
				values: ["/database/media/books", "/database/media", "/media", "/books", ""],
				valueTitles: {
					"": "/" // yeah! :)
				}
			},
			{
				name: "favFoldersFile",
				title: L("OPTION_FAVOURITE_FOLDERS"),
				icon: "FOLDER",
				defaultValue: "disabled",
				values: ["enabled", "disabled"],
				valueTitles: {
					enabled: L("ENABLED"),
					disabled: L("DISABLED")
				}				
			}
		],
		onPreInit: function() {
			// These options make sense only if device has SD/MS card slots 
			if (Core.config.compat.hasCardSlots) {
				BrowseFolders.optionDefs.push({
					name: "cardScan",
					title: L("OPTION_CARD_SCAN"),
					icon: "DB",
					defaultValue: "enabled",
					values: ["enabled", "disabled"],
					valueTitles: {
						enabled: L("ENABLED"),
						disabled: L("DISABLED")
					}
	
				});
			}
		},
		onInit: function() {
			if (BrowseFolders.options.cardScan === "disabled") {
				Core.config.disableCardScan = true;
			}
		},
		
		actions: [{
			name: "BrowseFolders",
			title: L("TITLE"),
			group: "Utils",
			icon: "FOLDER",
			action: function () {
				var current = Core.ui.getCurrentNode();
				if (current) {
					current.gotoNode(browseFoldersNode, kbook.model);
				} else {
					log.trace("can't find current node");
				}
			}
		}],
		
		onSettingsChanged: function(propertyName, oldValue, newValue) {
			if (oldValue === newValue) {
				return;
			}
			
			// Release the node so that it's content can be updated
			if (browseFoldersNode) {
				browseFoldersNode.unlockPath();
			}
		}
		
	};
	Core.addAddon(BrowseFolders);
};

try {
	tmp();
	tmp = undefined;
} catch (e) {
	// Core's log
	log.error("in BrowseFolders.js", e);
}
