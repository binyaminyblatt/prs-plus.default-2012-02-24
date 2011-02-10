// Name: Standard Actions
// Description: Provides built-in actions like "shutdown", "next page" etc
// Author: kartu
//
// History:
//	2010-06-27 kartu - Adapted for 300 from former KeyBindings addon
//	2010-11-28 kartu - 600: Implemented #31 "Use Volume buttons to move through history"
//				300: Fixed "next/prev" page actions consuming "goto page" key events
//	2010-02-05 kartu - Changed direct function calls with "bubbles" for x50
//	2011-02-10 kartu - Implemented # goto TOC, doOption, doSearch, doRotate, doMenu, doSize, doRoot actions

tmp = function() {
	var L, log, NAME, StandardActions, model, book, doHistory, isBookEnabled, 
		addBubbleActions, addOptionalActions, doBubble, doBubbleFunc;
	NAME = "StandardActions";
	L = Core.lang.getLocalizer(NAME);
	log = Core.log.getLogger(NAME);

	// Shortcuts
	model = kbook.model;
	
	// Fixme implicit model sniffing
	if (model.container.sandbox.PAGE_GROUP.sandbox.PAGE_SUBGROUP) {
		book = model.container.sandbox.PAGE_GROUP.sandbox.PAGE_SUBGROUP.sandbox.PAGE;
	} else {
		book = model.container.sandbox.PAGE_GROUP.sandbox.PAGE;
	}
	
	isBookEnabled = function() {
		return book.isEnabled();
	};
	
	// Generic "bubbling" code, bubbles using currently focused item;
	doBubble = function(cmd) {
		var currentNode, focus;
		currentNode = model.currentNode;
		if (currentNode) {
			focus = kbook.model.container.getWindow().focus;
			if (focus) {
				try {
					focus.bubble(cmd);
				} catch (e) {
					log.error("in doBubble, command " + cmd, e);
				}
			} else {
				model.doBlink();
			}
		}
	};
	
	// Do bubble function to be called 
	doBubbleFunc = function() {
		doBubble(this.bubble);
	};
	
	// Adds "bubblable" actions, if model supports them
	addBubbleActions = function (actions) {
		var bubbles, bubble, i, n;
		bubbles = ["doOption", "doSearch", "doRotate", "doMenu", "doSize", "doRoot"];
		for (i = 0, n = bubbles.length; i < n; i ++) {
			bubble = bubbles[i];
			if (model[bubble]) {
				actions.push( {
					name: "BubbleAction_" + bubble,
					title: L("ACTION_" + bubble),
					bubble: bubble,
					action: doBubbleFunc
				});
			}
		}
	};
	
	// Cross-model do history
	//	whereTo - integer, positive moves back
	doHistory = function (whereTo) {
		try {
			if (model.currentBook && model.currentBook.media) {
				if (model.currentBook.media.rememberBy(kbook.bookData, whereTo)) {
					return;
				}
			}		
		} catch (e) {
			log.error("doHistory", e);
		}
		model.doBlink();
	};
	
	addOptionalActions = function(actions) {
		var gotoTOCFunc;
		if (Core.config.compat.hasVolumeButtons) {
			actions.push({
				name: "NextSong",
				title: L("ACTION_NEXT_SONG"),
				icon: "NEXT_PAGE",
				action: function () {
					model.doGotoNextSong();
				}
			});
			actions.push({
				name: "PreviousSong",
				title: L("ACTION_PREVIOUS_SONG"),
				icon: "PREVIOUS_PAGE",
				action: function () {
					model.doGotoPreviousSong();
				}
			});
			
		}
		
		// FIXME: implicit "is touchscreen device"
		if (Core.config.compat.hasJoypadButtons) {
			actions.push({
				name: "GotoLink",
				title: L("ACTION_GOTO_LINK"),
				icon: "NEXT_PAGE",
				action: function () {
					if (isBookEnabled()) {
						book.bubble("doCenter");
					} else {
						return true;
					}
				}
			});
		}

		// Goto TOC function		
		if (kbook.bookOptionRoot) {
			// models with touch screen
			gotoTOCFunc = function() {
				var toc;
				toc = kbook.bookOptionRoot.contents;
				if  (toc) {
					kbook.model.gotoBookOptionList (toc);
				} else {
					model.doBlick();
				}
			};
		} else {
			// older models
			gotoTOCFunc = function() {
				// FIXME implement
				model.doBlick();
			};
		}
		actions.push({
			name: "OpenTOC",
			title: L("ACTION_OPEN_TOC"),
			icon: "NEXT_PAGE",
			action: gotoTOCFunc
		});
	};

	StandardActions = {
		name: NAME,
		title: L("TITLE"),
		icon: "SETTINGS",
		// FIXME: check if more actions could be "bublized" 
		actions: [
			{
				name: "Shutdown",
				title: L("ACTION_SHUTDOWN"),
				icon: "SHUTDOWN",
				action: function () {
					model.doDeviceShutdown();
				}
			},
			{
				name: "NextPage",
				title: L("ACTION_NEXT_PAGE"),
				icon: "NEXT_PAGE",
				bubble: "doNext",
				action: doBubbleFunc				
			},
			{
				name: "PreviousPage",
				title: L("ACTION_PREVIOUS_PAGE"),
				icon: "PREVIOUS_PAGE",
				bubble: "doPrevious",
				action: doBubbleFunc
			},
			{
				name: "NextInHistory",
				title: L("ACTION_NEXT_IN_HISTORY"),
				icon: "NEXT_PAGE",
				action: function () {
					if (isBookEnabled()) {
						doHistory(-1);
					} else {
						return true;
					}
				}
			},
			{
				name: "PreviousInHistory",
				title: L("ACTION_PREVIOUS_IN_HISTORY"),
				icon: "PREVIOUS_PAGE",
				action: function () {
					if (isBookEnabled()) {
						doHistory(1);
					} else {
						return true;
					}
				}
			},
			{
				name: "ContinueReading",
				title: L("ACTION_CONTINUE_READING"),
				icon: "CONTINUE",
				action: function () {
					// Show current book
					kbook.model.onEnterContinue();
				}
			}
		]
	};

	// Optional actions depending on the model
	try {
		addBubbleActions(StandardActions.actions);
		addOptionalActions(StandardActions.actions);
	} catch (e) {
		log.trace("Failed ot add optional/bubble actions " + e);
	}
	
	Core.addAddon(StandardActions);
};
try {
	tmp();
} catch (e) {
	// Core's log
	log.error("in StandardActions.js", e);
}