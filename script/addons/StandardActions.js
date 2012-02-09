// Name: Standard Actions for models 300, 505
// Description: Provides built-in actions like "shutdown", "next page" etc
// Author: kartu
//
// History:
//	2010-06-27 kartu - Adapted for 300 from former KeyBindings addon
//	2010-11-28 kartu - 600: Implemented #31 "Use Volume buttons to move through history"
//				300: Fixed "next/prev" page actions consuming "goto page" key events 
//	2011-10-27 Mark Nord - ported bubbleActions from x50
//	2011-10-28 Mark Nord - fixed issue #206
//	2011-11-26 Mark Nord - Added issue #218 TOC Action for 300/505
//	2012-02-06 Ben Chenoweth - Added No Action, Goto various nodes, Delete Current Item, Play/Pause Audio

tmp = function() {
	var L, log, NAME, StandardActions, model, book, doHistory, isBookEnabled,
		addBubbleActions, addOptionalActions, doBubble, doBubbleFunc;
	NAME = "StandardActions";
	L = Core.lang.getLocalizer(NAME);
	log = Core.log.getLogger(NAME);

	// Shortcuts
	model = kbook.model;
	book = model.container.sandbox.PAGE_GROUP.sandbox.PAGE;
	isBookEnabled = function() {
		return book.isEnabled();
	}
	
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

	// Generic "bubbling" code, bubbles using currently focused item;
	doBubble = function(cmd, param) {
		var currentNode, focus;
		currentNode = model.current;
		if (currentNode) {
			focus = kbook.model.container.getWindow().focus;
			if (focus) {
				try {
					focus.bubble(cmd, param);
				} catch (e) {
					log.error("in doBubble, command " + cmd, e);
				}
			} else {
				model.doBlink();
			}
		}
	};
	
	doBubbleFunc = function() {
		doBubble(this.bubble);
	};
	
	// Adds "bubblable" actions, if model supports them
	addBubbleActions = function (actions) {
		var bubbles, bubble, icons, i, m, n;
		bubbles = ["doMark",   "doMarkMenu", "doMenu", "doSize",     "doRoot"   ];
		icons   = ["BOOKMARK", "BOOKMARK",   "BACK",   "TEXT_SCALE", "ROOT_MENU"];
		for (i = 0, n = bubbles.length; i < n; i ++) {
			bubble = bubbles[i];
			if (model[bubble]) {
				actions.push( {
					name: "BubbleAction_" + bubble,
					title: L("ACTION_" + bubble),
					group: "Book",
					icon: icons[i],
					bubble: bubble,
					action: doBubbleFunc
				});
			}
		}
		bubbles = undefined;
	};
	
	addOptionalActions = function(actions) {
		if (Core.config.compat.hasVolumeButtons) {
			actions.push({
				name: "NextSong",
				title: L("ACTION_NEXT_SONG"),
				group: "Other",
				icon: "NEXT_SONG",
				action: function () {
					model.doGotoNextSong();
				}
			});
			actions.push({
				name: "PreviousSong",
				title: L("ACTION_PREVIOUS_SONG"),
				group: "Other",
				icon: "PREVIOUS_SONG",
				action: function () {
					model.doGotoPreviousSong();
				}
			});
			actions.push({
				name: "PausePlayAudio",
				title: L("ACTION_PAUSE_PLAY_AUDIO"),
				group: "Other",
				icon: "PAUSE",
				action: function () {
					var model, container, sandbox, SONG;
					try {
						model = kbook.model;
						container = model.container;
						sandbox = container.sandbox;
						SONG = kbook.movieData.mp;
						if (SONG.isPlaying()) {
							SONG.stop();
							sandbox.control = 0;
						} else {
							if (!SONG) {
								// if no current song paused
								return;
							}
							// current song paused
							if (SONG.getDuration() <= SONG.getTime()) {
								// current song at end, so go to next song
								model.doGotoNextSong();
								return;
							}
							// continue current song
							SONG.start();
							sandbox.control = 1;
						}
						// update interface
						sandbox.volumeVisibilityChanged();
					} catch(e) {
						log.error("Error in StandardActions trying to pause/play audio", e);
					}
				}
			});
		}
		// FIXME: implicit "is touchscreen device"
		if (Core.config.compat.hasJoypadButtons) {
			actions.push({
				name: "GotoLink",
				title: L("ACTION_GOTO_LINK"),
				group: "Book",
				icon: "NEXT_PAGE",
				action: function () {
					if (isBookEnabled()) {
						book.doCenter();
					} else {
						model.doBlink();
					}
				}
			});
		}
	};	
	
	StandardActions = {
		name: NAME,
		title: L("TITLE"),
		icon: "SETTINGS",
		actions: [
			{
				name: "Shutdown",
				title: L("ACTION_SHUTDOWN"),
				group: "Other",
				icon: "SHUTDOWN",
				action: function () {
					model.doDeviceShutdown();
				}
			},
			{
				name: "NextPage",
				title: L("ACTION_NEXT_PAGE"),
				group: "Book",
				icon: "NEXT_PAGE",
				action: function () {
					if (isBookEnabled()) {
						book.doNext();
					} else {
						model.doBlink();
					}
				}
			},
			{
				name: "PreviousPage",
				title: L("ACTION_PREVIOUS_PAGE"),
				group: "Book",
				icon: "PREVIOUS_PAGE",
				action: function () {
					if (isBookEnabled()) {
						book.doPrevious();
					} else {
						model.doBlink();
					}
				}
			},
			{
				name: "NextInHistory",
				title: L("ACTION_NEXT_IN_HISTORY"),
				group: "Book",
				icon: "NEXT",
				action: function () {
					if (isBookEnabled()) {
						doHistory(-1);
					} else {
						model.doBlink();
					}
				}
			},
			{
				name: "PreviousInHistory",
				title: L("ACTION_PREVIOUS_IN_HISTORY"),
				group: "Book",
				icon: "PREVIOUS",
				action: function () {
					if (isBookEnabled()) {
						doHistory(1);
					} else {
						model.doBlink();
					}
				}
			},
			{
				name: "OpenTOC",
				title: L("ACTION_OPEN_TOC"),
				group: "Book",
				icon: "LIST",
				action: function () {
					var parent = kbook.model.current.parent;
					if (isBookEnabled()) {
						parent.gotoNode(parent.nodes[4],kbook.model);
					} else {
						model.doBlink();
					}
				}
			}, 
			{
				name: "ContinueReading",
				title: L("ACTION_CONTINUE_READING"),
				group: "Book",
				icon: "CONTINUE",
				action: function () {
					// Show current book
					kbook.model.onEnterContinue();
				}
			},
			{
				name: "doRotate",
				title: L("ACTION_doRotate"),
				group: "Other",
				icon: 23,
				action: function () {
					ebook.rotate();
				}
			},
			{
				name: "NoAction",
				title: L("ACTION_NO_ACTION"),
				group: "Other",
				icon: "CROSSED_BOX",
				action:  function () {
					kbook.model.doBlink();
				}
			},
			{
				name: "GotoGameNode",
				title: L("ACTION_GAME_NODE"),
				group: "Other",
				icon: "GAME",
				action: function () {
					var current = Core.ui.getCurrentNode();
					if (current) {
						current.gotoNode(Core.ui.nodes["gamesAndUtils"], kbook.model);
					} else {
						Core.ui.doBlink();
					}
				}
			},
			{
				name: "GotoAudioNode",
				title: L("ACTION_MUSIC_NODE"),
				group: "Other",
				icon: "AUDIO",
				action: function () {
					var current = Core.ui.getCurrentNode();
					if (current) {
						current.gotoNode(kbook.root.getMusicNode(), kbook.model);
					} else {
						Core.ui.doBlink();
					}
				}
			},
			{
				name: "GotoPicturesNode",
				title: L("ACTION_PICTURES_NODE"),
				group: "Other",
				icon: "PICTURE_ALT",
				action: function () {
					var current = Core.ui.getCurrentNode();
					if (current) {
						current.gotoNode(kbook.root.getPicturesNode(), kbook.model);
					} else {
						Core.ui.doBlink();
					}
				}
			},
			{
				name: "DeleteCurrentItem",
				title: L("ACTION_DELETE_CURRENT_ITEM"),
				group: "Utils",
				icon: "CROSSED_BOX",
				action: function () {
					var menu, actions, titles;
					actions = [];
					titles = [L('ACTION_DELETE_CURRENT_ITEM'), L('CANCEL')];
					actions.push( function () {
						var model, node, media, source;
						try {
							model = kbook.model;
							node = model.current;
							if (model.STATE === 'PAGE') {
								model.doDeleteBook();
							} else if ((model.STATE === 'SONG') || (model.STATE === 'PICTURE')) {
								media = node.media;
								source = media.source;
								source.deleteRecord(media.id);
								FileSystem.deleteFile(media.source.path + media.path);
								kbook.root.update(kbook.model);
							} else {
								Core.ui.doBlink();
							}
						} catch(e) {
							log.error("Error in StandardActions trying to delete current item", e);
						}
					});
					actions.push( function () {
						return true; // TOCHECK: Or does this need to be "return false"?
					});
					menu = Core.popup.createSimpleMenu(titles, actions);
					Core.popup.showMenu(menu);
				}
			}
		]
	};
	// Optional actions depending on the model  
	try {
		addBubbleActions(StandardActions.actions);
		addOptionalActions(StandardActions.actions);
	} catch (e) {
		log.trace("Failed to add optional/bubble actions " + e);
	}
	Core.addAddon(StandardActions);
};
try {
	tmp();
} catch (e) {
	// Core's log
	log.error("in StandardActions.js", e);
}