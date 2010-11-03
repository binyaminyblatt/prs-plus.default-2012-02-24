// Name: Standard Actions
// Description: Provides built-in actions like "shutdown", "next page" etc
// Author: kartu
//
// History:
//	2010-06-27 kartu - Adapted for 300 from former KeyBindings addon

tmp = function() {
	var L = Core.lang.getLocalizer("StandardActions");

	// Saving original functions
	var model = kbook.model;
	var book = model.container.sandbox.PAGE_GROUP.sandbox.PAGE;
	var bookDoNext = book.doNext;
	var bookDoPrevious = book.doPrevious;
	var bookDoLeft = book.doLeft;
	var bookDoRight = book.doRight;
	var bookDoCenter = book.doCenter;

	var StandardActions = {
		name: "StandardActions",
		title: L("TITLE"),
		icon: "SETTINGS",
		onPreInit: function() {
			if (Core.config.compat.hasVolumeButtons) {
				this.addons.push({
					name: "NextSong",
					title: L("ACTION_NEXT_SONG"),
					group: "Utils",
					icon: "NEXT_PAGE",
					action: function () {
						model.doGotoNextSong();
					}
				});
				this.addons.push({
					name: "PreviousSong",
					title: L("ACTION_PREVIOUS_SONG"),
					group: "Utils",
					icon: "PREVIOUS_PAGE",
					action: function () {
						model.doGotoPreviousSong();
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
					bookDoNext.call(book);
				}
			},
			{
				name: "PreviousPage",
				title: L("ACTION_PREVIOUS_PAGE"),
				group: "Utils",
				icon: "PREVIOUS_PAGE",
				action: function () {
					bookDoPrevious.call(book);
				}
			},
			{
				name: "NextInHistory",
				title: L("ACTION_NEXT_IN_HISTORY"),
				group: "Utils",
				icon: "NEXT_PAGE",
				action: function () {
					bookDoRight.call(book);
				}
			},
			{
				name: "PreviousInHistory",
				title: L("ACTION_PREVIOUS_IN_HISTORY"),
				group: "Utils",
				icon: "PREVIOUS_PAGE",
				action: function () {
					bookDoLeft.call(book);
				}
			},
			{
				name: "GotoLink",
				title: L("ACTION_GOTO_LINK"),
				group: "Utils",
				icon: "NEXT_PAGE",
				action: function () {
					bookDoCenter.call(book);
				}
			},
			{
				name: "ContinueReading",
				title: L("CONTINUE_READING"),
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