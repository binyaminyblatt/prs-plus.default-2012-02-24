// Name: bootstrap 350
// Description: Sony PRS-350 bootstrap code
//	Receives variables: bootLog, Core, loadAddons, loadCore
//		must call loadAddons, loadCore and Core.init at appropriate times
//
// History:
//	2011-01-12 kartu - Initial version, based on 600
//	2011-02-06 kartu - Fixed #64 "Wrong german translation file"
//	2011-02-07 kartu - Implemented #? possibility to download files using web browser
//	2011-02-08 kartu - Deleted irrelevant "fixTimeZones" code
//	2011-02-09 kartu - Fixed # Text Memo open => press root leads to reboot

//-----------------------------------------------------------------------------------------------------
// Localization related code is model specific.  
// Replacing default  "choose language" menu & "choose keyboard" menu
//-----------------------------------------------------------------------------------------------------

var tmp = function() {
	var updateSiblings, localize, localizeKeyboard, oldSetLocale, oldChangeKeyboardType, oldReadPreference, oldCallback;

	// Updaes node siblings (used for setting selected / unselected icon)
	updateSiblings = function(fieldName) {
		// find currently selected node
		var nodes, i, n, idx, tmpKind;

		try {		
			nodes = this.parent.nodes;
			for (i = 0, n = nodes.length; i < n; i++) {
				if (kbook.model[fieldName] === nodes[i].tag) {
					idx = i;
					break;
				}
			}
			
			kbook.model[fieldName] = this.tag;
			kbook.model.writeFilePreference();
			
			// swap node kinds of this node and previously selected node
			if (idx !== undefined) {
				tmpKind = this.kind;
				this.kind = nodes[idx].kind;
				nodes[idx].kind = tmpKind;
			}
			
		} catch (e) {
			bootLog("In updateSiblings " + e);
		}
	};

	localize = function(Core) {
		try {
			var i, n, currentLang, settingsNode, langNode, languages, langNames, enter, 
				node, prspLanguages, langFile, icon;
			currentLang = kbook.model.language;
			settingsNode = kbook.root.getSettingsRootNode();
			// Fix settings node 
			settingsNode.multiPage = true;
			
			languages = ["de", "en", "es", "fr", "it", "nl", "pt", "ru"];
			prspLanguages = {
				de: "German.js",
				en: "English.js",
				es: "Spanish.js",
				fr: "French.js",
				it: "Italian.js",
				nl: "English.js", // missing Dutch PRS+ translation
				pt: "English.js", // missing Portuguese PRS+ translation
				ru: "Russian.js"
			};
			langNames = {
				de: "Deutsch", 
				en: "English",
				es: "Español",
				fr: "Français", 
				it: "Italiano",
				nl: "Nederlands",
				pt: "Português",
				ru: "Русский"
			};
			
			// Load core js		
			loadCore();
			
			// Load PRS+ strings
			langFile = Core.config.corePath + "lang/" + prspLanguages[currentLang];
			Core.lang.init(langFile);

			// FIXME localize date strings
			for (i = 0, n = languages.length; i < n; i++) {
				if (!Date.prototype.strings[languages[i]]) {
					Date.prototype.strings[languages[i]] = xs.newInstanceOf(Date.prototype.strings.en);
					Number.prototype.strings[languages[i]] = xs.newInstanceOf(Number.prototype.strings.en);
				}
			}
	
			// Custom language node
			langNode = Core.ui.createContainerNode({
				title: "fskin:/l/strings/STR_NODE_TITLE_LANG_SETTINGS".idToString(),
				icon: "LANGUAGE",
				comment: function() {
					return langNames[kbook.model.language];
				},
				parent: settingsNode
			});
			try {
				// Hook comment field
				kbook.commentField.format = function (item, name) {
					if (item && '_mycomment' in item) {
						if ((typeof item._mycomment) === "function") {
							try {
								return item._mycomment();
							} catch (e) {
								return "<error calling _mycomment>";
							}
						} else {
							return item._mycomment;
						}
					} else if (item && 'comment' in item) {
						return item.comment;
					}
				};
			} catch (e) {
				bootLog("error hooking commendField.format function");
			}
			
			// Enter function for language children, changes locale and moves to parent
			enter = function() {
				try {
					// TODO use update
					
					// find currently selected node
					var nodes, i, n, idx, tmpKind;
					nodes = this.parent.nodes;
					for (i = 0, n = nodes.length; i < n; i++) {
						if (kbook.model.language === nodes[i].tag) {
							idx = i;
							break;
						}
					}
					
					// Code from kbook.xsb
					Fskin.localize.setLocale({language: this.tag, region: "XX"});
					kbook.model.language = this.tag;
					kbook.model.clearTitleSorters();
					kbook.root.update(kbook.model);
					kbook.model.writeFilePreference();
					this.parent.gotoParent(kbook.model);
					
					// swap node kinds of this node and previously selected node
					if (idx !== undefined) {
						tmpKind = this.kind;
						this.kind = nodes[idx].kind;
						nodes[idx].kind = tmpKind;
					}
					
					// TODO localize
					Core.ui.showMsg("Requires restart");					
				} catch (e) {
					bootLog("changing language", e);
				}
			};
			
			// Create language node's children
			for (i = 0, n = languages.length; i < n; i++) {
				if (kbook.model.language ===  languages[i]) {
					icon = "CHECKED";
				} else {
					icon = "UNCHECKED";
				}
				node = Core.ui.createContainerNode({
						title: langNames[languages[i]],
						icon: icon,
						parent: langNode,
						comment: ""
				});
				node.tag = languages[i];
				node.enter = enter;
				if (currentLang === languages[i]) {
					node.selected = true;
				}
				langNode.nodes.push(node);
			}
			
			// Replace "language" node with custom node
			settingsNode.nodes[0].nodes[3] = langNode;
			
			try {
				localizeKeyboard(Core);
			} catch (e0) {
				bootLog("Error localizing keyboard  " + e0);
			}
			
			// self destruct :)
			localize = null;
		} catch (e2) {
			bootLog("error in localize " + e2);
		}
	};
	
	// Init language related stuff once setLocale was called and strings were loaded
	oldSetLocale = Fskin.localize.setLocale;
	Fskin.localize.setLocale = function() {
		try {
			oldSetLocale.apply(this, arguments);
			// restore "old" set locale
			Fskin.localize.setLocale = oldSetLocale;
			
			localize(Core);
		} catch (e) {
			bootLog("in overriden setLocale " + e);
		}
	};
	
	// Keyboard related stuff
	localizeKeyboard = function (Core) {
		var i, n, node, advancedSettingsNode, keyboardNode, keyboardTypes, keyboardNames, enter, icon;
		keyboardTypes = [
				"English-US", 
				"English-UK", 
				"French-France", 
				"French-Canada",
				"German-Germany", 
				"Dutch-Netherlands",
				"Spanish-Spain", 
				"Italian-Italy",
				"Portuguese-Portugal",				
				"Georgian", 
				"Russian"
		];
		keyboardNames = {
			"German-Germany": "Deutsch",
			"Spanish-Spain": "Español", 
			"French-France": "Français",
			"French-Canada": "Français canadien",
			"Italian-Italy": "Italiano",
			"Georgian": "ქართული",
			"Dutch-Netherlands": "Nederlands",
			"Portuguese-Portugal": "Português",				
			"Russian": "Русская",
			"English-UK": "United Kingdom",
			"English-US": "United States"
		};
		advancedSettingsNode = (kbook.root.getSettingsRootNode()).nodes[0];
	
		
		// Enter function for keyboard children, changes keyboard and moves to parent
		enter = function() {
			updateSiblings.call(this, "keyboard");
			this.parent.gotoParent(kbook.model);			
		};	
		
		// Custom keyboard node
		keyboardNode = Core.ui.createContainerNode({
			title: "fskin:/l/strings/STR_UI_NODE_TITLE_KEYBOARD".idToString(),
			icon: "KEYBOARD",
			comment: function() {
				return keyboardNames[kbook.model.keyboard];
			},
			parent: advancedSettingsNode
		});
		
		// Create language node's children
		for (i = 0, n = keyboardTypes.length; i < n; i++) {
			if (kbook.model.keyboard ===  keyboardTypes[i]) {
				icon = "CHECKED";
			} else {
				icon = "UNCHECKED";
			}
			node = Core.ui.createContainerNode({
					title: keyboardNames[keyboardTypes[i]],
					icon: icon,
					parent: keyboardNode
			});
			node.tag = keyboardTypes[i];
			node.enter = enter;
			keyboardNode.nodes.push(node);
		}	
		
		advancedSettingsNode.nodes[4] = keyboardNode;
	
		// self destruct :)	
		localizeKeyboard = null;
	};
	
	oldChangeKeyboardType = Fskin.kbookKeyboard.keyboardLayout.changeKeyboardType;
	Fskin.kbookKeyboard.keyboardLayout.changeKeyboardType = function (langType) {
		var url, path, keyboardPaths;
		try {
			keyboardPaths = {
				"English-US": "KeyboardLayout103P.xml",
				"English-UK": "KeyboardLayout166.xml",
				"French-France": "KeyboardLayout189.xml",
				"French-Canada": "KeyboardLayout445.xml",
				"German-Germany": "KeyboardLayout129.xml",
				"Dutch-Netherlands": "KeyboardLayout143.xml",
				"Spanish-Spain": "KeyboardLayout173.xml", 
				"Italian-Italy": "KeyboardLayout142.xml",
				"Portuguese-Portugal": "KeyboardLayout275.xml",
				"Russian": "languages/KeyboardLayoutRussian.xml",
				"Georgian": "languages/KeyboardLayoutGeorgian.xml"
			};
			path = System.applyEnvironment('[keyboardLayoutPath]') ;
			url = 'file://' + path + keyboardPaths[langType] ;
			this.layoutData = null;
			this.setURI(url);
		} catch (e) {
			// call the default version
			oldChangeKeyboardType.apply(this, arguments);
		}
	};
	
	// Init core here
	oldReadPreference = kbook.model.readPreference;
	kbook.model.readPreference = function() {
		try {
			oldReadPreference.apply(this, arguments);
			// restore "old" readPreference
			kbook.model.readPreference = oldReadPreference;
			
			loadAddons();
			Core.init();
		} catch (e) {
			bootLog("in overriden readPreference " + e);
		}
	};
	
	// FIXME test
	oldCallback = FskCache._diskSource.synchronizeCallback;
	FskCache._diskSource.synchronizeCallback = function() {
		try {
			if (Core && Core.config && Core.config.disableCardScan) {
				this.target.synchronizedSource();
				this.target.synchronizeDone();
				this.stack.pop();
			} else {
				oldCallback.apply(this, arguments);
			}
		} catch (e) {
			bootLog("Error in callback: " + e);
			oldCallback.apply(this, arguments);
		}
	};

	// Add "dynamic" comment ability
	var getComment = function(node, idx) {
		if (typeof node.nodes[idx].shortComment === "function") {
			return node.nodes[idx].shortComment();
		}
		return kbook.commentField.format(node.nodes[idx]);
	};
	kbook.model.getPeriodicalComment = function (node) {
		return getComment(node, 2);
	};
	kbook.model.getCollectionComment = function (node) {
		return getComment(node, 3);
	};
	kbook.model.getNotesComment = function (node) {
		return getComment(node, 4);
	};

	// Add "dynamic" "kind" ability
	var oldPeriodicalKind = kbook.model.getPeriodicalKind;
	kbook.model.getPeriodicalKind = function (node) {
		if (node.nodes[2].homelargekind) {
			return node.nodes[2].homelargekind;
		}
		return oldPeriodicalKind.apply(this, arguments);
	};	
	kbook.model.getCollectionKind = function (node) {
		if (node.nodes[3].homelargekind) {
			return node.nodes[3].homelargekind;
		}
		return 2;
	};
	kbook.model.getNotesKind = function (node) {
		if (node.nodes[4].homelargekind) {
			return node.nodes[4].homelargekind;
		}
		return 3;
	};

	// Fix sorting (unicode order)
	var compareStrings =  Core.config.compat.compareStrings;
	String.prototype.localeCompare = function(a) {
		return compareStrings(this.valueOf(), a);
	};

	// Workaround for # Text Memo open => press root leads to reboot
	kbook.kbookNotepad.exit = function(param) {
		var note = this.note;
		this.note = null;
		if (note && note.type === "text" && note.newbie) {
			return;
		}
		this.bubble('doMenuClose');
	};
};

tmp();
