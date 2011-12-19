// Name: Dictionary Options
// Description: Contains dictionary-related options
// 
// Author: quisvir
//
// History:
//	2011-12-17 quisvir - Initial version
//	2011-12-18 quisvir - Added next/previous buttons to popup; added custom functions for reinitializing coordinates

tmp = function() {

	var L, log, opt, initialized;
	L = Core.lang.getLocalizer('DictionaryOptions');
	log = Core.log.getLogger('DictionaryOptions');
	
	
	// General function to recursively terminate coordinates of container content
	var doTerminateCoordinates = function (target, first) {
		var i, c;
		c = target.contents;
		if (c) {
			for (i = c.length - 1; i >= 0; i--) {
				doTerminateCoordinates(c[i], false);
			}
		}
		if (!first) {
			target.invalidate();
			target.terminateCoordinates(target.root, target.container);
		}
	}
	
	// General function to recursively initialize coordinates of container content
	var doInitializeCoordinates = function (target, first) {
		var i, c;
		c = target.contents;
		if (!first) {
			target.initializeCoordinates(target.root, target.container);
			target.invalidate();
		}
		if (c) {
			for (i = c.length - 1; i >= 0; i--) {
				doInitializeCoordinates(c[i], false);
			}
		}
	}
	
	// Button in popup: Previous entry in dictionary
	kbook.model.container.sandbox.SHORTCUT_OVERLAY.sandbox.VIEW_SHORTCUT.sandbox.doPreviousDicEntry = function () {
		NextPrevDicEntry.call(this, true);
	}
	
	// Button in popup: Next entry in dictionary
	kbook.model.container.sandbox.SHORTCUT_OVERLAY.sandbox.VIEW_SHORTCUT.sandbox.doNextDicEntry = function () {
		NextPrevDicEntry.call(this, false);
	}
	
	// Find and set next/previous dictionary entry
	var NextPrevDicEntry = function (back) {
		var data, index, key, dicIndex, item;
		data = kbook.dictionaryData;
		index = data.getSimpleResultDicIndex().index;
		index = (back) ? index - 1 : index + 1;
		key = new Chunk('AAA=');
		dicIndex = new kbook.model.DicIndex(index, key);
		item = data.dictionary.getItemFromDicIndex(dicIndex);
		data.record_0 = item;
		data.simpleRecord = new kbook.DictionaryRecord(item);
		data.simpleRecord.setMode('simple');
		data.simple_records = [data.simpleRecord];
		this.setVariable('VAR_UPDATE', false);
		this.setVariable('VAR_UPDATE', true);
	}
	
	// Show/hide next/previous buttons in popup depending on dictionary results
	var oldOpenShortcut2 = pageShortcutOverlayModel.openShortcut2;
	pageShortcutOverlayModel.openShortcut2 = function (str) {
		var show;
		oldOpenShortcut2.apply(this, arguments);
		show = kbook.dictionaryData.countSimpleRecords() ? true : false;
		this.container.sandbox.VIEW_SHORTCUT.sandbox.VIEW_SHORTCUT2.sandbox.BTN_PREVDICENTRY.show(show);
		this.container.sandbox.VIEW_SHORTCUT.sandbox.VIEW_SHORTCUT2.sandbox.BTN_NEXTDICENTRY.show(show);
	}
	
	// Disable dictionary by DoubleTap
	var oldDoSelectWord = kbook.kbookPage.doSelectWord;
	kbook.kbookPage.doSelectWord = function () {
		if (opt.disableDictDoubleTap !== 'true') {
			return oldDoSelectWord.apply(this, arguments);
		}
	}
	
	// Move dictionary popup to top of screen if tap in bottom (and vice versa)
	var preventPopupOverlap = function (y) {
		var height, target;
		height = opt.popupLines * 23 + 114;
		target = kbook.model.container.sandbox.SHORTCUT_OVERLAY.sandbox.VIEW_SHORTCUT;
		if (y < kbook.model.container.height - height - 40) {
			if (target.y === 0) {
				doTerminateCoordinates(target, true);
				target.changeLayout(0, undefined, 0, undefined, height, 0);
				doInitializeCoordinates(target, true);
			}
		} else if (target.y !== 0) {
			doTerminateCoordinates(target, true);
			target.changeLayout(0, undefined, 0, 0, height, undefined);
			doInitializeCoordinates(target, true);
		}
	}
	
	// Close dictionary popup and cancel selection by tapping page
	pageShortcutOverlayModel.doTap = function (x, y) {
		var model = kbook.model;
		if (model.doSomething('checkTap', x, y)) {
			model.doSomething('doTap', x, y);
		} else if (opt.closePopupByPageTap === 'true') {
			model.doSomething('selectNone');
		} else {
			model.doBlink();
			return;
		}
		this.doCloseShortcut();
	};
	
	// Set Dictionary Popup lines
	var oldSetRenderParameter = kbook.dictionaryRecord.setRenderParameter;
	kbook.dictionaryRecord.setRenderParameter = function (bounds, mode, bgColor, textSize, lineSpacing, columnSpacing, columnWidth, maxLines, fitHeightFlag) {
		if (maxLines === 3 && opt.popupLines !== 3) {
			arguments[7] = opt.popupLines;
		}
		return oldSetRenderParameter.apply(this, arguments);
	}
	
	// Set dictionary popup size on first book load (onInit is too soon)
	var initPopupSize = function () {
		var target;
		if (opt.popupLines !== 3) {
			target = this.container.sandbox.SHORTCUT_OVERLAY.sandbox.VIEW_SHORTCUT;
			doTerminateCoordinates(target, true);
			target.changeLayout(0, undefined, 0, undefined, opt.popupLines * 23 + 114, 0);
			doInitializeCoordinates(target, true);
			target.sandbox.DIC_BTN.changeLayout(14, undefined, 14, undefined, opt.popupLines * 23 + 10, 0);
		}
		Core.events.unsubscribe(Core.events.EVENTS.BOOK_CHANGED, initPopupSize);
	}
	
	var DictionaryOptions = {
		name: 'DictionaryOptions',
        title: L('TITLE'),
		icon: 'DICTIONARY',
		optionDefs: [
			{
				name: 'disableDictDoubleTap',
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
				name: 'preventPopupOverlap',
				title: L('PREVENT_POPUP_OVERLAP'),
				icon: 'ABOUT',
				defaultValue: 'false',
				values: ['true', 'false'],
				valueTitles: {
					'true': L('VALUE_TRUE'),
					'false': L('VALUE_FALSE')
				}
			},
			{
				name: 'closePopupByPageTap',
				title: L('CLOSE_POPUP_BY_PAGE_TAP'),
				icon: 'STYLUS',
				defaultValue: 'false',
				values: ['true', 'false'],
				valueTitles: {
					'true': L('VALUE_TRUE'),
					'false': L('VALUE_FALSE')
				}
			},
			{
				name: 'popupLines',
				title: L('DICT_POPUP_LINES'),
				icon: 'ABOUT',
				defaultValue: '3',
				values: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
				valueTitles: {
					'3': '3 (' + L('VALUE_DEFAULT') + ')',
				}
			}
		],
		onInit: function () {
			opt = this.options;
			opt.popupLines = parseInt(opt.popupLines);
			Core.events.subscribe(Core.events.EVENTS.BOOK_CHANGED, initPopupSize);
		},
		onSettingsChanged: function (propertyName, oldValue, newValue, object) {
			var target;
			if (propertyName === 'popupLines') {
				opt.popupLines = parseInt(newValue);
				target = kbook.model.container.sandbox.SHORTCUT_OVERLAY.sandbox.VIEW_SHORTCUT;
				doTerminateCoordinates(target, true);
				target.changeLayout(0, undefined, 0, undefined, opt.popupLines * 23 + 114, 0);
				doInitializeCoordinates(target, true);
				target.sandbox.DIC_BTN.changeLayout(14, undefined, 14, undefined, opt.popupLines * 23 + 10, 0);
			}
		},
		pageDoubleTap: function (x, y) {
			if (opt.preventPopupOverlap === 'true') {
				preventPopupOverlap(y);
			}
		}
	};

	Core.addAddon(DictionaryOptions);
};
try {
	tmp();
} catch (e) {
	// Core's log
	log.error('in DictionaryOptions.js', e);
}
