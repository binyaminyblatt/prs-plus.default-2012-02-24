// Name: TouchSettings_600
// Description: Contains options related to tap actions & swipe actions
// 
// Author: quisvir
//
// History:
//	2011-12-15 quisvir - Initial version ported from x50

tmp = function() {

	var L, LX, log, opt;
	L = Core.lang.getLocalizer('TouchSettings');
	LX = Core.lang.LX;
	log = Core.log.getLogger('TouchSettings');
	
	
	/*** GENERAL ***/
	
	var touchAction, actionName2action, createTouchOptions;
	
	actionName2action = {};
	
	createTouchOptions = function () {
		var i, j, options, actions, target;
		actions = Core.addonByName.KeyBindings.getActionDefs();
		actionName2action = actions[4];
		options = ['SINGLE_TAP_TOP_LEFT', 'SINGLE_TAP_TOP_RIGHT', 'SINGLE_TAP_BOTTOM_LEFT', 'SINGLE_TAP_BOTTOM_RIGHT'];
		for (j=0;j<2;j++) {
			for (i=0;i<options.length;i++) {
				TouchSettings.optionDefs[j].optionDefs[0].optionDefs.push({
					name: options[i],
					title: L(options[i]),
					icon: 'SETTINGS',
					defaultValue: 'default',
					values: actions[0], 
					valueTitles: actions[1],
					valueIcons: actions[2],
					valueGroups: actions[3],
					useIcons: true
				});
			}
			options = ['SWIPE_LEFT', 'SWIPE_RIGHT', 'SWIPE_UP', 'SWIPE_DOWN'];
		}
	}
	
	
	/*** TAP RELATED ***/
	
	var readingTapX, readingTapY, oldSelectNoneWithoutUpdate, oldDoBlink, doNothingFunc, preventPopupOverlap;
	
	// Functions used for page tap actions
	oldSelectNoneWithoutUpdate = Fskin.kbookPage.selectNoneWithoutUpdate;
	oldDoBlink = kbook.model.doBlink;
	doNothingFunc = function () {};
	
	// On tap (doubletap if switched), get coordinates from readingTracker
	var oldReadingTrackerTap = Fskin.kbookPage.readingTracker.tap;
	Fskin.kbookPage.readingTracker.tap = function (target, x, y) {
		readingTapX = x;
		readingTapY = y;
		if (opt.SwitchPageTaps === 'false') {
			if (!target.selection.length) {
				target.selectNoneWithoutUpdate = pageTapAction;
				kbook.model.doBlink = doNothingFunc;
				oldReadingTrackerTap.apply(this, arguments);
				target.selectNoneWithoutUpdate = oldSelectNoneWithoutUpdate;
				kbook.model.doBlink = oldDoBlink;
			} else {
				oldReadingTrackerTap.apply(this, arguments);
			}
		} else {
			if (opt.PreventPopupOverlap === 'true') preventPopupOverlap();
			oldReadingTrackerDoubleTap.apply(this, arguments);
		}
	};
	
	var oldReadingTrackerDoubleTap = Fskin.kbookPage.readingTracker.doubleTap;
	Fskin.kbookPage.readingTracker.doubleTap = function (target, x, y) {
		readingTapX = x;
		readingTapY = y;
		if (opt.SwitchPageTaps === 'false') {
			if (opt.PreventPopupOverlap === 'true') preventPopupOverlap();
			oldReadingTrackerDoubleTap.apply(this, arguments);
		} else {
			if (!target.selection.length) {
				target.selectNoneWithoutUpdate = pageTapAction;
				kbook.model.doBlink = doNothingFunc;
				oldReadingTrackerTap.apply(this, arguments);
				target.selectNoneWithoutUpdate = oldSelectNoneWithoutUpdate;
				kbook.model.doBlink = oldDoBlink;
			} else {
				oldReadingTrackerTap.apply(this, arguments);
			}
		}
	}
	
	// Move Dictionary Popup to top of screen if tap in bottom (and vice versa)
	preventPopupOverlap = function () {
		var target = kbook.model.container.sandbox.SHORTCUT_OVERLAY.sandbox.VIEW_SHORTCUT;
		if (readingTapY > target.getWindow().height-130) {
			if (target.y !== 0) {
				target.terminateContents(target.root);
				target.changeLayout(0, undefined, 0, 0, 86, undefined);
				target.initializeContents(target.root);
			}
		} else if (target.y === 0) {
			target.terminateContents(target.root);
			target.changeLayout(0, undefined, 0, undefined, 86, 0);
			target.initializeContents(target.root);
		}
	}
		
	// Execute tap action based on coordinates
	var pageTapAction = function () {
		var area, actionName;
		if (readingTapX < (this.width / 2)) {
			if (readingTapY < (this.height / 2)) {
				area = 'SINGLE_TAP_TOP_LEFT';
			} else {
				area = 'SINGLE_TAP_BOTTOM_LEFT';
			}
		} else {
			if (readingTapY < (this.height / 2)) {
				area = 'SINGLE_TAP_TOP_RIGHT';
			} else {
				area = 'SINGLE_TAP_BOTTOM_RIGHT';
			}
		}
		actionName = opt[area];
		if (actionName === 'default') {
			oldDoBlink();
		} else {
			touchAction = true;
			try {
				actionName2action[actionName].action();
			} catch(ignore) {}
			touchAction = false;
		}
	};
	
	// Close reading popup menu (dict etc) and cancel selection by tapping page
	pageShortcutOverlayModel.doTap = function (x, y) {
		if (kbook.model.doSomething('checkTap', x, y)) {
			kbook.model.doSomething('doTap', x, y);
		} else if (opt.ClosePopupByPageTap === 'true') {
			kbook.model.doSomething('selectNone');
		} else {
			kbook.model.doBlink();
			return;
		}
		this.doCloseShortcut();
	};
	
	// Disable Dictionary by DoubleTap
	var oldDoSelectWord = Fskin.kbookPage.doSelectWord;
	Fskin.kbookPage.doSelectWord = function () {
		if (opt.DisableDictionary !== 'true') return oldDoSelectWord.apply(this, arguments);
	}
	
	// Disable Bookmark Tapping
	Fskin.kbookPage.hitMark = function (cache) {
		var y, x, markHeight, markWidth, state, xStart, yStart, rct, obj0;
		if (opt.DisableBookmarkTaps === 'true') return;
		if (cache.error || cache.page >= this.countPages(true)) return;
		y = cache.y + this.marginHeight;
		x = cache.x + this.marginWidth;
		markHeight = this.markHeight * 2;
		markWidth = this.markWidth * 2;
		state = this.getHalfPage();
		xStart = this.marginWidth + this.pageWidth + this.marginWidth - markWidth;
		yStart = 0;
		if (state == 2) yStart = this.marginHeight + this.pageHeight + this.marginHeight - markHeight;
		rct = Fskin.scratchRectangle;
		rct.set(xStart, yStart, markWidth, markHeight);
		obj0 = { x: x, y: y };
		if (rct.contains(obj0)) return cache;
	};
	
	// Extend tap area for links in books
	var oldHitLink, newHitLink;
	oldHitLink = Fskin.bookScroller.hitLink;
	newHitLink = function (cache) {
		var links, d, j, link, bounds, c, i, r;
		links = cache.links;
		if (links) {
			d = links.length;
			for (j=0;j<d;j++) {
				link = links[j];
				bounds = link.getBounds();
				c = bounds.length;
				for (i=0;i<c;i++) {
					r = bounds[i];
					if (cache.x > r.left-15 && cache.x < r.right+15 && cache.y > r.top-15 && cache.y < r.bottom+15) {
						link.cache = cache;
						return link;
					}
				}
			}
		}
	};
	
	
	/*** SWIPE RELATED ***/
	
	// Add detection of up & down swipes
	BookUtil.lineAction.up = function (target, x, y) {
		this.previousAverage = this.currentAverage;
		this.currentAverage = this.currentX + x;
		BookUtil.baseAction.up.call(this, target, x, y);
		if (!this.checkLine(x, y)) {
			this.fail();
			return false;
		}
		if (this.direction !== Gesture.noDirection) {
			if (Math.abs(y - this.firstDownY) > Math.abs(x - this.firstDownX)) {
				if (y - this.firstDownY > 0) {
					this.direction = Gesture.bottomDirection;
				} else {
					this.direction = Gesture.upDirection;
				}
			}
			this.tracker.execute(this, target, this.canCommand, this.doCommand, this.direction, new Point(this.firstDownX, this.firstDownY), new Point(x, y));
			return false;
		}
		this.fail();
	}
	
	// Execute swipe action based on direction
	var oldLine = Fskin.kbookPage.readingTracker.line;
	Fskin.kbookPage.readingTracker.line = function (target, dir) {
		var swipe, actionName;
		if (opt.DisableAllSwipes !== 'true') {
			switch (dir) {
				case Gesture.leftDirection:
					swipe = 'SWIPE_LEFT';
					break;
				case Gesture.rightDirection:
					swipe = 'SWIPE_RIGHT';
					break;
				case Gesture.upDirection:
					swipe = 'SWIPE_UP';
					break;
				case Gesture.bottomDirection:
					swipe = 'SWIPE_DOWN';
			}
			actionName = opt[swipe];
			if (actionName === 'default') {
				oldLine.apply(this, arguments);
			} else {
				touchAction = true;
				try {
					actionName2action[actionName].action();
				} catch(ignore) {}
				touchAction = false;
			}
		}
	};
	
	
	/*** OTHER ***/
	
	var oldGetCandidate = FskPredictive.group.getCandidate;
	FskPredictive.group.getCandidate = function (prefix, index) {
		if (opt.DisablePredictive === 'true') {
			return null;
		} else {
			return oldGetCandidate.apply(this, arguments);
		}
	}
	
	
	var TouchSettings = {
		name: 'TouchSettings',
        title: L('TITLE'),
		icon: 'STYLUS',
		optionDefs: [
			{
				groupTitle: L('TAP_OPTIONS'),
				groupIcon: 'STYLUS',
				optionDefs: [
				{
					groupTitle: L('CUSTOM_PAGE_TAP_ACTIONS'),
					groupIcon: 'STYLUS',
					optionDefs: []
				},
				{
					name: 'DisableDictionary',
					title: L('DISABLE_DICT_DOUBLETAP'),
					icon: 'NODICTIONARY',
					defaultValue: 'false',
					values: ['true', 'false'],
					valueTitles: {
						'true': L('VALUE_TRUE'),
						'false': L('VALUE_FALSE')
					}
				},
				{
					name: 'PreventPopupOverlap',
					title: L('PREVENT_POPUP_OVERLAP'),
					icon: 'NODICTIONARY',
					defaultValue: 'false',
					values: ['true', 'false'],
					valueTitles: {
						'true': L('VALUE_TRUE'),
						'false': L('VALUE_FALSE')
					}
				},
				{
					name: 'ClosePopupByPageTap',
					title: L('CLOSE_POPUP_BY_PAGE_TAP'),
					icon: 'NODICTIONARY',
					defaultValue: 'false',
					values: ['true', 'false'],
					valueTitles: {
						'true': L('VALUE_TRUE'),
						'false': L('VALUE_FALSE')
					}
				},
				{
					name: 'DisableBookmarkTaps',
					title: L('DISABLE_BOOKMARK_TAPPING'),
					icon: 'NOBOOKMARK',
					defaultValue: 'false',
					values: ['true', 'false'],
					valueTitles: {
						'true': L('VALUE_TRUE'),
						'false': L('VALUE_FALSE')
					}
				},
				{
					name: 'ExtendTapAreas',
					title: L('EXTEND_LINK_TAP_AREAS'),
					icon: 'STYLUS',
					helpText: L('EXTEND_LINK_HELPTEXT'),
					defaultValue: 'false',
					values: ['true', 'false'],
					valueTitles: {
						'true': L('VALUE_TRUE'),
						'false': L('VALUE_FALSE')
					}
				},
				{
					name: 'DoubleTapSpeed',
					title: L('DOUBLETAP_SPEED'),
					icon: 'STYLUS',
					helpText: L('DOUBLETAP_SPEED_HELPTEXT'),
					defaultValue: '500',
					values: ['50', '125', '250', '375', '500', '625', '750', '875', '1000'],
				},
				{
					name: 'SwitchPageTaps',
					title: L('SWITCH_PAGE_TAPS'),
					icon: 'STYLUS',
					defaultValue: 'false',
					values: ['true', 'false'],
					valueTitles: {
						'true': L('VALUE_TRUE'),
						'false': L('VALUE_FALSE')
					}
				}]
			},
			{
				groupTitle: L('SWIPE_OPTIONS'),
				groupIcon: 'GESTURE',
				optionDefs: [
				{
					groupTitle: L('CUSTOM_SWIPE_ACTIONS'),
					groupIcon: 'GESTURE',
					optionDefs: []
				},
				{
					name: 'DisableAllSwipes',
					title: L('DISABLE_ALL_SWIPES'),
					icon: 'CROSSED_BOX',
					defaultValue: 'false',
					values: ['true', 'false'],
					valueTitles: {
						'true': L('VALUE_TRUE'),
						'false': L('VALUE_FALSE')
					}
				}]
			},
			{
				name: 'DisablePredictive',
				title: L('DISABLE_PREDICTIVE'),
				icon: 'KEYBOARD',
				defaultValue: 'false',
				values: ['true', 'false'],
				valueTitles: {
					'true': L('VALUE_TRUE'),
					'false': L('VALUE_FALSE')
				}
			},
			
		],
		onPreInit: function () {
			createTouchOptions();
		},
		onInit: function () {
			opt = this.options;
			if (opt.ExtendTapAreas === 'true') Fskin.bookScroller.hitLink = newHitLink;
			if (opt.DoubleTapSpeed !== '500') {
				BookUtil.gesture.tracker.gesture.actions[3].time = Number(opt.DoubleTapSpeed);
				BookUtil.gesture.tracker.gesture.actions[4].time = Number(opt.DoubleTapSpeed);
			}
		},
		onSettingsChanged: function (propertyName, oldValue, newValue, object) {
			if (propertyName === 'ExtendTapAreas') {
				Fskin.bookScroller.hitLink = (newValue === 'true') ? newHitLink : oldHitLink;
			} else if (propertyName === 'DoubleTapSpeed') {
				BookUtil.gesture.tracker.gesture.actions[3].time = Number(newValue);
				BookUtil.gesture.tracker.gesture.actions[4].time = Number(newValue);
			}
		},
		actions: [{
			name: 'SwipingToggle',
			title: L('TOGGLE_SWIPING'),
			group: 'Utils',
			icon: 'GESTURE',
			action: function () {
				opt.DisableAllSwipes = (opt.DisableAllSwipes === 'true') ? 'false' : 'true';
				Core.ui.showMsg(L('DISABLE_ALL_SWIPES') + ': ' + ((opt.DisableAllSwipes === 'true')?L('VALUE_TRUE'):L('VALUE_FALSE')));
				Core.settings.saveOptions(TouchSettings);
			}
		},
		{
			name: 'TouchscreenToggle',
			title: L('TOGGLE_TOUCHSCREEN'),
			group: 'Utils',
			icon: 'STYLUS',
			action: function () {
				if (touchAction) {
					kbook.model.doBlink();
					return; // to prevent disabling touchscreen with no way of turning it back on
				}
				if (ebook.device.touchpanel.activeArea.width === 0) {
					ebook.device.touchpanel.activeArea.width = ebook.device.framebuffer.width;
					ebook.device.touchpanel.activeArea.height = ebook.device.framebuffer.height;
					Core.ui.showMsg(L('TOUCHSCREEN') + ': ' + L('VALUE_TRUE'));
				} else {
					ebook.device.touchpanel.activeArea.width = 0;
					ebook.device.touchpanel.activeArea.height = 0;
					Core.ui.showMsg(L('TOUCHSCREEN') + ': ' + L('VALUE_FALSE'));
				}
				ebook.device.touchpanel.initialize();
			}
		},
		{
			name: 'SwitchPageTaps',
			title: L('SWITCH_PAGE_TAPS'),
			group: 'Utils',
			icon: 'STYLUS',
			action: function () {
				opt.SwitchPageTaps = (opt.SwitchPageTaps === 'true') ? 'false' : 'true';
				Core.ui.showMsg(L('SWITCH_PAGE_TAPS') + ': ' + ((opt.SwitchPageTaps === 'true')?L('VALUE_TRUE'):L('VALUE_FALSE')));
				Core.settings.saveOptions(TouchSettings);
			}
		}]
	};

	Core.addAddon(TouchSettings);
};
try {
	tmp();
} catch (e) {
	// Core's log
	log.error('in TouchSettings.js', e);
}
