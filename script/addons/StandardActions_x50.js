// Name: Standard Actions for models 350, 600, 650, 950
// Description: Provides built-in actions like "shutdown", "next page" etc
// Author: kartu
//
// History:
//	2010-06-27 kartu - Adapted for 300 from former KeyBindings addon
//	2010-11-28 kartu - 600: Implemented #31 "Use Volume buttons to move through history"
//				300: Fixed "next/prev" page actions consuming "goto page" key events
//	2010-02-05 kartu - Changed direct function calls with "bubbles" for x50
//	2011-02-10 kartu - Implemented # goto TOC, doOption, doSearch, doRotate, doMenu, doSize, doRoot actions
//	2011-02-27 kartu - x50: Added rotate by 0 / 90 / 180 / 270 / clock wise / counter clock wize actions
//	2011-02-27 kartu - 600: Added rotate by 90 action
//	2011-10-27 Mark Nord - Added doPowerSwitch = Sleepmode
//  2011-10-30 Ben Chenoweth - Added goZoomPage
//	2012-02-06 Ben Chenoweth - Added No Action, Goto various nodes, Delete Current Item, Play/Pause Audio

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
	doBubble = function(cmd, param) {
		var currentNode, focus;
		currentNode = model.currentNode;
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
		bubbles = ["doOption", "doSearch", "doRotate", "doMenu", "doSize"    , "doRoot"   ];
		icons   = ["EMPTY"   , "SEARCH"  , "EMPTY"   , "BACK" ,  "TEXT_SCALE", "ROOT_MENU"];
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
		
		// doRotate for x50
		if (kbook.model.onEnterOrientation) {
			var rotateFuncX50 = function() {
				var orientation = kbook.model.container.getVariable("ORIENTATION");
				if (this.closeCurrentOverlay) {
					this.closeCurrentOverlay();
				}
				switch (this.bubble) {
					case 0:
					case 1:
					case 2:
					case 3:
						if (orientation === this.bubble) {
							orientation = 0;
						} else {
							orientation = this.bubble;
						}
						break;
					case -1:
						// clock wise
						orientation -= 1;
						if (orientation < 0) {
							orientation = 3;
						}
						break;
					case -2:
						// counter clock wise
						orientation += 1;
						if (orientation > 3) {
							orientation = 0;
						}
						break;
				}
				doBubble("doRotate", orientation);
			};
			
			// FIXME model sniffing, there must be a better way
			// On 600 only rotate by 90 is possible
			if (Core.config.model === "600") {
				m = 1;
				n = 2;
			} else {
				m = -2;
				n = 4;
			}
			
			for (i = m; i < n; i++) {
				if (i >= 0) {
					bubble = "doRotate" + 90 * i;
				} else if (i === -2) {
					bubble = "doRotateCCWise";
				} else {
					bubble = "doRotateCWise";
				}
				actions.push( {
					name: "BubbleAction_" + bubble,
					title: L("ACTION_" + bubble),
					group: "Other",
					bubble: i, 
					action: rotateFuncX50
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
		var gotoTOCFunc, gotoMyNotes;
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
			});
			actions.push({
				name: "PausePlayAudio",
				title: L("PAUSE_PLAY_AUDIO"),
				group: "Other",
				icon: "PAUSE",
				action: function () {
					// code adapted from x50's songGroup.xml (function "doControl")
					var model, container, sandbox, SONG;
					try {
						model = kbook.model;
						container = model.container;
						sandbox = container.sandbox;
						SONG = kbook.movieData.mp;
						if (SONG.isPlaying()) {
								SONG.stop();
								if (container.getVariable('STANDBY_STATE')) {
									sandbox.control = 0;
								}
						} else {
							if (!container.getVariable('STANDBY_STATE')) {
								// if no current song paused
								model.setVariable('CONTROL', 0);
								return;
							}
							// current song paused
							if (SONG.getDuration() <= SONG.getTime()) {
								// current song at end, so try to go to next song
								if (!model.doGotoNextSong(kbook.movieData, true)) {
									// return to first song and stop
									model.doGotoFirstSong();
									SONG.stop();
									sandbox.control = 0;
									model.setVariable('CONTROL', 0);
									return;
								}
							}
							if (!container.getVariable('FIRST_SONG_STOP_FLAG')) {
								// continue current song
								SONG.start();
								sandbox.control = 1;
							} else {
								// no idea!
								container.setVariable('FIRST_SONG_STOP_FLAG', false);
								sandbox.control = 0;
							}
						}
						// update Audio overlay
						sandbox.volumeVisibilityChanged();
					} catch(e) {
						log.error("Error in StandardActions_x50 trying to pause/play audio", e);
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
					model.doBlink();
				}
			};
		} else {
			// older models
			gotoTOCFunc = function() {
				// FIXME implement
				model.doBlink();
			};
		}
		actions.push({
			name: "OpenTOC",
			title: L("ACTION_OPEN_TOC"),
			group: "Book",
			icon: "LIST",
			action: gotoTOCFunc
		});
		
		if (kbook.bookOptionRoot) {
			gotoMyNotes = function() {
				var notes;
				notes = kbook.bookOptionRoot.notes;
				if (notes) {
					kbook.model.gotoBookOptionList(notes);
				} else {
					model.doBlink();
				}
			};
		} else {
			gotoMyNotes = function() {
				model.doBlink();
			};
		}
		actions.push({
			name: "OpenNotes",
			title: L("ACTION_OPEN_NOTES_LIST"),
			group: "Book",
			icon: "NOTES",
			action: gotoMyNotes
		});
		
		// Zoom page function
		goZoomPage = function() {
			if (kbook.model.doSize) {
			   pageSizeOverlayModel.openCurrentOverlay();
			   pageSizeOverlayModel.goZoomMode();
			} else {
				model.doBlink;
			}
		};
		actions.push({
			name: "ZoomPage",
			title: L("ACTION_ZOOM_PAGE"),
			group: "Book",
			icon: "SEARCH_ALT",
			action: goZoomPage
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
				bubble: "doNext",
				action: doBubbleFunc				
			},
			{
				name: "PreviousPage",
				title: L("ACTION_PREVIOUS_PAGE"),
				group: "Book",
				icon: "PREVIOUS_PAGE",
				bubble: "doPrevious",
				action: doBubbleFunc
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
						return true;
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
						return true;
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
				name: "Standby",
				title: L("ACTION_STANDBY"),
				group: "Other",
				icon: "STANDBY",
				bubble: "doPowerSwitch",
				action: doBubbleFunc
			},
			{
				name: "NoAction",
				title: L("ACTION_NO_ACTION"),
				group: "Other",
				icon: "EMPTY",
				action:  function () {
					kbook.model.doBlink();
				}
			},
			{
				name: "GotoMoreNode",
				title: L("ACTION_MORE_NODE"),
				group: "Other",
				icon: "ROOT_MENU",
				action: function () {
					var current = Core.ui.getCurrentNode();
					if (current) {
						current.gotoNode(Core.ui.nodes["more"], kbook.model);
					} else {
						Core.ui.doBlink();
					}
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
						current.gotoNode(Core.ui.nodes["games"], kbook.model);
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
				name: "GotoPeriodicalsNode",
				title: L("ACTION_PERIODICALS_NODE"),
				group: "Other",
				icon: "PERIODICALS",
				action: function () {
					var current = Core.ui.getCurrentNode();
					if (current) {
						current.gotoNode(kbook.root.getPeriodicalListNode(), kbook.model);
					} else {
						Core.ui.doBlink();
					}
				}
			},
			{
				name: "GotoCollectionsNode",
				title: L("ACTION_COLLECTIONS_NODE"),
				group: "Other",
				icon: "COLLECTION",
				action: function () {
					var current = Core.ui.getCurrentNode();
					if (current) {
						current.gotoNode(kbook.root.getCollectionsNode(), kbook.model);
					} else {
						Core.ui.doBlink();
					}
				}
			},
			{
				name: "GotoNotesNode",
				title: L("ACTION_NOTES_NODE"),
				group: "Other",
				icon: "TEXT_MEMO",
				action: function () {
					var current = Core.ui.getCurrentNode();
					if (current) {
						current.gotoNode(kbook.root.getNotepadsTextNode(), kbook.model);
					} else {
						Core.ui.doBlink();
					}
				}
			},
			{
				name: "GotoFreehandNode",
				title: L("ACTION_FREEHAND_NODE"),
				group: "Other",
				icon: "HANDWRITING_ALT",
				action: function () {
					var current = Core.ui.getCurrentNode();
					if (current) {
						current.gotoNode(kbook.root.getNotepadsFreehandNode(), kbook.model);
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
					var model, node, dialog, message, current;
					try {
						model = kbook.model;
						node = model.currentNode;
						current = false;
						if (node) {
							dialog = model.getConfirmationDialog();
							dialog.target = model;
							if (model.closeContentsList) {
								message = 'fskin:/l/strings/STR_UI_MESSAGE_DELETE_MANUALLY_NORMAL'.idToString();
							} else {
								// 600
								message = 'fskin:/l/strings/DIALOGMSG_CONFIRM_OPT_DELETE_ALLMYNOTES2'.idToString();
							}
							dialog.onNo = function () { };
							if (model.STATE === 'PAGE') {
								current = true;
								if (!model.closeContentsList) {
									// 600
									message = 'fskin:/l/strings/STR_UI_MESSAGE_DELETEBOOK'.idToString();
								}
								dialog.onOk = function () {
									var model, node;
									model = kbook.model;
									if (model.closeContentsList) {
										node = model.currentNode;
										model.doDeleteBook(true, node);
										kbook.root.update(model);
										model.closeContentsList(true);
									} else {
										// 600
										model.doDeleteBook();
									}
								}
							} else if (model.STATE === 'SONG') {
								current = true;
								dialog.onOk = function () {
									var model, node;
									model = kbook.model;
									node = model.currentNode;
									if (model.removeSong) {
										model.removeSong(node);
										kbook.root.update(model);
										if (node.equal(model.currentNode)) {
											model.closeContentsList(true);
										} else {
											model.currentNode.gotoNode(albumList, model);
										}
									} else {
										// 600
										model.onRemove(node);
									}
								}
							} else if (model.STATE === 'PICTURE') {
								current = true;
								if (kbook.standbyPicture.isExist(node)) {
									message = 'fskin:/l/strings/STR_UI_MESSAGE_DELETE_MANUALLY_SELECTED_AS_STANDBY'.idToString();
								}
								dialog.onOk = function () {
									var model, node, media, source;
									model = kbook.model;
									node = model.currentNode;
									if (model.removePicture) {
										model.removePicture(node);
										kbook.root.update(model);
										model.closeContentsList(true);
									} else {
										// 600
										media = node.media;
										source = media.source;
										source.deleteRecord(media.id);
										kbook.root.update(kbook.model);
									}
								}
							}
							if (current) {
								dialog.openDialog(message, 0);
							} else {
								Core.ui.doBlink();
							}
						}
					} catch(e) {
						log.error("Error in StandardActions_x50 trying to delete current item", e);
					}
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