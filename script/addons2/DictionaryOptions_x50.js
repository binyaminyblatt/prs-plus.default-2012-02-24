// Name: Dictionary Options
// Description: Contains dictionary-related options
// 
// Author: quisvir
//
// History:
//	2011-12-17 quisvir - Initial version
//	2011-12-18 quisvir - Added next/previous buttons to popup; added custom functions for reinitializing coordinates
//	2011-12-20 quisvir - Moved code to change dictionary popup layout into single function
//	2011-12-21 quisvir - Merged functions for next/previous buttons in popup
//	2012-01-22 quisvir - Changed 'Prevent overlap' option to general 'Popup Position'
//	2012-01-24 quisvir - Added 'Maximum Word Log Items' option

tmp = function() {

	var L, log, opt;
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
	
	// Function to modify Dictionary Popup size & position
	var modifyDictPopup = function (toTop, button) {
		var h, target;
		h = opt.popupLines * 23;
		target = kbook.model.container.sandbox.SHORTCUT_OVERLAY.sandbox.VIEW_SHORTCUT;
		doTerminateCoordinates(target, true);
		if (toTop) {
			target.changeLayout(0, undefined, 0, 0, h + 116, undefined);
		} else {
			target.changeLayout(0, undefined, 0, undefined, h + 116, 0);
		}
		doInitializeCoordinates(target, true);
		if (button) {
			target.sandbox.DIC_BTN.changeLayout(14, undefined, 14, undefined, h + 10, 2);
		}
	}
	
	// Function for next/previous dictionary entry buttons in popup
	kbook.model.container.sandbox.SHORTCUT_OVERLAY.sandbox.VIEW_SHORTCUT.sandbox.doNextPrevDicEntry = function (button) {
		var data, index, key, dicIndex, item;
		data = kbook.dictionaryData;
		index = data.getSimpleResultDicIndex().index;
		index = (button.id === 'BTN_PREVDICENTRY') ? index - 1 : index + 1;
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
		var target = kbook.model.container.sandbox.SHORTCUT_OVERLAY.sandbox.VIEW_SHORTCUT;
		if (y < kbook.model.container.height - target.height - 50) {
			if (target.y === 0) {
				modifyDictPopup(false, false);
			}
		} else if (target.y !== 0) {
				modifyDictPopup(true, false);
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
		if (maxLines === 3) {
			arguments[7] = opt.popupLines;
		}
		return oldSetRenderParameter.apply(this, arguments);
	}
	
	// Set dictionary popup size on first book load (onInit is too soon)
	var initPopupSize = function () {
		if (opt.popupPosition === 'top') {
			modifyDictPopup(true, true);
		} else if (opt.popupLines !== 3) {
			modifyDictPopup(false, true);
		}
		Core.events.unsubscribe(Core.events.EVENTS.BOOK_CHANGED, initPopupSize);
	}
	
	var trimDicHistories = function (max) {
		var cb, hist, db, c, i, r, dict;
		// Current book
		cb = kbook.model.currentBook;
		if (cb) {
			hist = cb.media.preferences.dicHistories;
			if (hist.length > max) {
				kbook.model.deleteDicHistories(hist);
				hist.splice(max, hist.length - max);
			}
		}
		// Book cache
		db = kbook.model.cache.textMasters;
		c = db.count();
		for (i = 0; i < c; i++) {
			r = db.getRecord(i);
			if (r.preferences) {
				hist = r.preferences.dicHistories;
				if (hist.length > max) {
					hist.splice(max, hist.length - max);
					r.mapToCacheExt();
				}
			}
		}
		// Dictionaries
		dict = kbook.model.dicHistoriesForDevice;
		c = dict.length;
		for (i = 0; i < c; i++) {
			hist = dict[i];
			if (hist.length > max) {
				kbook.model.deleteDicHistories(hist);
				hist.splice(max, hist.length - max);
			}
		}
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
				name: 'popupPosition',
				title: L('POPUP_POSITION'),
				icon: 'ABOUT',
				defaultValue: 'bottom',
				values: ['bottom', 'top', 'avoid'],
				valueTitles: {
					'bottom': L('BOTTOM'),
					'top': L('TOP'),
					'avoid': L('AVOID_SELECTION_OVERLAP')
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
					'3': '3 (' + L('VALUE_DEFAULT') + ')'
				}
			},
			{
				name: 'dicHistMax',
				title: L('WORD_LOG_MAX'),
				icon: 'DICTIONARY',
				defaultValue: '100',
				values: ['0', '10', '25', '50', '100', '150', '200', '250', '500', '1000'],
				valueTitles: {
					'100': '100 (' + L('VALUE_DEFAULT') + ')'
				}
			}
		],
		onInit: function () {
			opt = this.options;
			opt.popupLines = parseInt(opt.popupLines);
			Core.events.subscribe(Core.events.EVENTS.BOOK_CHANGED, initPopupSize);
			kbook.model.dicHistoriesMax = parseInt(opt.dicHistMax);
		},
		onSettingsChanged: function (propertyName, oldValue, newValue, object) {
			var toTop, dialog, max;
			switch (propertyName) {
				case 'popupLines':
					opt.popupLines = parseInt(newValue);
					modifyDictPopup(false, true);
					break;
				case 'popupPosition':
					toTop = (newValue === 'top') ? true : false;
					modifyDictPopup(toTop, false);
					break;
				case 'dicHistMax':
					kbook.model.dicHistoriesMax = parseInt(newValue);
					dialog = kbook.model.getConfirmationDialog();
					if (dialog) {
						dialog.onOk = function () {
							trimDicHistories(parseInt(newValue));
						};
						dialog.openDialog(L('TRIM_EXISTING_WORD_LOGS'), 0);
					}
			}
		},
		pageDoubleTap: function (x, y) {
			if (opt.popupPosition === 'avoid') {
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
	log.error('in DictionaryOptions_x50.js', e);
}
