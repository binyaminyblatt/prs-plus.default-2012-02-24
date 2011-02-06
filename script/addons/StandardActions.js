// Name: Standard Actions
// Description: Provides built-in actions like "shutdown", "next page" etc
// Author: kartu
//
// History:
//	2010-06-27 kartu - Adapted for 300 from former KeyBindings addon
//	2010-11-28 kartu - 600: Implemented #31 "Use Volume buttons to move through history"
//				300: Fixed "next/prev" page actions consuming "goto page" key events
//	2010-02-05 kartu - Changed direct function calls with "bubbles" for x50 

tmp = function() {
	var L, log, NAME, StandardActions, model, book, doHistory, isBookEnabled;
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

	StandardActions = {
		name: NAME,
		title: L("TITLE"),
		icon: "SETTINGS",
		onPreInit: function() {
			if (Core.config.compat.hasVolumeButtons) {
				this.actions.push({
					name: "NextSong",
					title: L("ACTION_NEXT_SONG"),
					group: "Utils",
					icon: "NEXT_PAGE",
					action: function () {
						model.doGotoNextSong();
					}
				});
				this.actions.push({
					name: "PreviousSong",
					title: L("ACTION_PREVIOUS_SONG"),
					group: "Utils",
					icon: "PREVIOUS_PAGE",
					action: function () {
						model.doGotoPreviousSong();
					}
				});
				
			}
			// FIXME: implicit "is touchscreen device"
			if (Core.config.compat.hasJoypadButtons) {
				this.actions.push({
					name: "GotoLink",
					title: L("ACTION_GOTO_LINK"),
					group: "Utils",
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
		},
		
		actions: [
			{
				name: "Shutdown",
				title: L("ACTION_SHUTDOWN"),
				group: "Utils",
				icon: "SHUTDOWN",
				action: function () {
					model.doDeviceShutdown();
				}
			},
			{
				name: "NextPage",
				title: L("ACTION_NEXT_PAGE"),
				group: "Utils",
				icon: "NEXT_PAGE",
				action: function () {
					if (isBookEnabled()) {
						book.bubble("doNext");
					} else {
						return true;
					}
				}
			},
			{
				name: "PreviousPage",
				title: L("ACTION_PREVIOUS_PAGE"),
				group: "Utils",
				icon: "PREVIOUS_PAGE",
				action: function () {
					if (isBookEnabled()) {
						book.bubble("doPrevious");
					} else {
						return true;
					}
				}
			},
			{
				name: "NextInHistory",
				title: L("ACTION_NEXT_IN_HISTORY"),
				group: "Utils",
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
				group: "Utils",
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
				group: "Utils",
				icon: "CONTINUE",
				action: function () {
					// Show current book
					kbook.model.onEnterContinue();
				}
			}
		]
	};

	Core.addAddon(StandardActions);
};
try {
	tmp();
} catch (e) {
	// Core's log
	log.error("in StandardActions.js", e);
}