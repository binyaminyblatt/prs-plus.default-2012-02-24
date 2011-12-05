// Name: TouchSettings_x50
// Description: Contains options related to tap actions, swipe actions & zoom
// 
// Author: quisvir
//
// History:
//	2011-11-28 quisvir - Initial version
//	2011-11-29 quisvir - Fixed bug that broke page taps if 'extend' option was disabled
//	2011-12-01 quisvir - Adjusted extended tap areas
//	2011-12-05 quisvir - Added DoubleTap Speed option

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
	
	var readingTapX, readingTapY, oldSelectNoneWithoutUpdate, oldDoBlink, doNothingFunc;
	
	// Functions used for page tap actions
	oldSelectNoneWithoutUpdate = kbook.kbookPage.selectNoneWithoutUpdate;
	oldDoBlink = kbook.model.doBlink;
	doNothingFunc = function () {};
	
	// On tap, get coordinates from readingTracker
	var oldReadingTrackerTap = kbook.kbookPage.readingTracker.tap;
	kbook.kbookPage.readingTracker.tap = function (target, x, y) {
		readingTapX = x;
		readingTapY = y;
		oldReadingTrackerTap.apply(this, arguments);
	};
	
	// Call pageTapAction, but only if tap is not a link, highlight etc.
	var oldOnPageTapped = kbook.kbookPage.onPageTapped;
	kbook.kbookPage.onPageTapped = function (cache, bookmark, highlight, markupIcon, link) {
		if (!this.selection.length) {
			this.selectNoneWithoutUpdate = pageTapAction;
			kbook.model.doBlink = doNothingFunc;
			oldOnPageTapped.apply(this, arguments);
			this.selectNoneWithoutUpdate = oldSelectNoneWithoutUpdate;
			kbook.model.doBlink = oldDoBlink;
		} else {
			oldOnPageTapped.apply(this, arguments);
		}
	};
	
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
		} else if (opt.ClosePopupByPageTap == 'true') {
			kbook.model.doSomething('selectNone');
		} else {
			kbook.model.doBlink();
			return;
		}
		this.doCloseShortcut();
	};
	
	// Disable Dictionary by double tap
	var oldDoSelectWord = kbook.kbookPage.doSelectWord;
	kbook.kbookPage.doSelectWord = function () {
		if (opt.DisableDictionary === 'false') return oldDoSelectWord.apply(this, arguments);
	}
	
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
		if (this.direction != Gesture.noDirection) {
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
	var oldLine = kbook.kbookPage.readingTracker.line;
	kbook.kbookPage.readingTracker.line = function (target, dir) {
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
				target.clearTargetLink(true);
				touchAction = true;
				try {
					actionName2action[actionName].action();
				} catch(ignore) {}
				touchAction = false;
			}
		}
	};
	
	
	/*** ZOOM RELATED ***/
	
	var zoomLockOld = false;
	
	// In Zoom Lock, execute action on single tap
	var oldZoomOverlayDoTap = Fskin.kbookZoomOverlay.doTap;
	Fskin.kbookZoomOverlay.doTap = function (x, y) {
		if (this.isZoomLock) {
			switch (opt.ZoomLockSingleTap) {
				case 'none':
					return;
				case 'zoomin':
					this.zoomPosition(x, y, 50);
					return;
				case 'zoomout':
					this.zoomPosition(x, y, -50);
					return;
			}
		} else {
			oldZoomOverlayDoTap.apply(this, arguments);
		}
	};
	
	// In Zoom Lock, execute action on double tap
	var oldZoomOverlayDoDoubleTap = Fskin.kbookZoomOverlay.doDoubleTap;
	Fskin.kbookZoomOverlay.doDoubleTap = function (x, y) {
		if (this.isZoomLock) {
			switch (opt.ZoomLockDoubleTap) {
				case 'none':
					return;
				case 'zoomin':
					this.zoomPosition(x, y, 50);
					return;
				case 'zoomout':
					this.zoomPosition(x, y, -50);
					return;
			}
		} else {
			oldZoomOverlayDoDoubleTap.apply(this, arguments);
		}
	};
	
	// In Zoom Lock, move to top on next page
	Fskin.kbookZoomOverlay.doNext = function () {
		this.getModel().doNext();
		if (this.isZoomLock && opt.ZoomLockMoveToTop) kbook.model.doSomething('scrollTo', 0, 0);
	}
	
	// In Zoom Lock, enable panning
	var oldZoomOverlayDoDrag = Fskin.kbookZoomOverlay.doDrag;
	Fskin.kbookZoomOverlay.doDrag = function (x, y, type, tapCount) {
		if (opt.ZoomLockPanning == 'true' && this.isZoomLock) {
			zoomLockOld = this.isZoomLock;
			this.isZoomLock = false;
			oldZoomOverlayDoDrag.apply(this, arguments);
			this.isZoomLock = zoomLockOld;
			zoomLockOld = false;
		} else oldZoomOverlayDoDrag.apply(this, arguments);
	};
	
	var oldZoomOverlaydone = Fskin.kbookZoomOverlay.done;
	Fskin.kbookZoomOverlay.done = function () {
		if (zoomLockOld) this.isZoomLock = true;
		oldZoomOverlaydone.apply(this);
		this.isZoomlock = zoomLockOld;
	};

	Fskin.kbookZoomOverlay.canLine = Fskin.kbookZoomOverlay.canLineAndHold = function () {
		if (this.getVariable('STATE') == 'PAGE' && this.isZoomLock && opt.ZoomLockPanning == 'false') {
			return true;
		} else {
			return false;
		}
	};
	
	
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
					name: 'ClosePopupByPageTap',
					title: L('CLOSE_POPUP_BY_PAGE_TAP'),
					icon: 'CROSSED_BOX',
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
				groupTitle: L('ZOOM_OPTIONS'),
				groupIcon: 'TEXT_SCALE',
				optionDefs: [
				{
					name: 'ZoomLockPanning',
					title: L('ZOOMLOCK_PANNING'),
					icon: 'GESTURE',
					helpText: L('ZOOMLOCK_PANNING_HELPTEXT'),
					defaultValue: 'false',
					values: ['true', 'false'],
					valueTitles: {
						'true': L('VALUE_TRUE'),
						'false': L('VALUE_FALSE')
					}
				},
				{
					name: 'ZoomLockSingleTap',
					title: L('ZOOMLOCK_SINGLE_TAP'),
					icon: 'SETTINGS',
					defaultValue: 'none',
					values: ['none', 'zoomin', 'zoomout'],
					valueTitles: {
						'none': L('VALUE_NONE'),
						'zoomin': L('ZOOM_IN'),
						'zoomout': L('ZOOM_OUT')
					}
				},
				{
					name: 'ZoomLockDoubleTap',
					title: L('ZOOMLOCK_DOUBLE_TAP'),
					icon: 'SETTINGS',
					defaultValue: 'none',
					values: ['none', 'zoomin', 'zoomout'],
					valueTitles: {
						'none': L('VALUE_NONE'),
						'zoomin': L('ZOOM_IN'),
						'zoomout': L('ZOOM_OUT')
					}
				},
				{
					name: 'ZoomLockMoveToTop',
					title: L('MOVE_TO_TOP_ON_NEXT_PAGE'),
					icon: 'NEXT_PAGE',
					helpText: L('MOVE_TO_TOP_HELPTEXT'),
					defaultValue: 'false',
					values: ['true', 'false'],
					valueTitles: {
						'true': L('VALUE_TRUE'),
						'false': L('VALUE_FALSE')
					}
				}]
			}
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
				Core.ui.showMsg(L('DISABLE_ALL_SWIPES') + ': ' + ((opt.DisableAllSwipes == 'true')?L('VALUE_TRUE'):L('VALUE_FALSE')));
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
			name: 'ZoomLockActivate',
			title: L('ACTIVATE_ZOOMLOCK'),
			group: 'Book',
			icon: 'TEXT_SCALE',
			action: function () {
				if (kbook.model.STATE === 'PAGE') {
					pageSizeOverlayModel.openCurrentOverlay();
					pageSizeOverlayModel.goZoomMode();
					kbook.model.container.sandbox.ZOOM_OVERLAY.doZoomLock();
				} else {
					kbook.model.doBlink();
				}
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
