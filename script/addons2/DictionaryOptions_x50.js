// Name: Dictionary Options
// Description: Contains dictionary-related options
// 
// Author: quisvir
//
// History:
//	2011-12-17 quisvir - Initial version

tmp = function() {

	var L, log, opt, initialized;
	L = Core.lang.getLocalizer('DictionaryOptions');
	log = Core.log.getLogger('DictionaryOptions');
	
	
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
				target.terminateContents(target.root);
				target.changeLayout(0, undefined, 0, undefined, height, 0);
				target.initializeContents(target.root);
			}
		} else if (target.y !== 0) {
			target.terminateContents(target.root);
			target.changeLayout(0, undefined, 0, 0, height, undefined);
			target.initializeContents(target.root);
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
		if (oldSetRenderParameter.apply(this, arguments)) {
			if (maxLines === 3 && opt.popupLines !== 3) {
				this.viewer.set(dictionary.viewer.Property.maxLines, opt.popupLines);
				this.maxLines = opt.popupLines;
			}
			return true;
		} else {
			return false;
		}
	}
	
	// Set dictionary popup size on first book load (onInit is too soon)
	var initPopupSize = function () {
		var target;
		if (opt.popupLines !== 3) {
			target = this.container.sandbox.SHORTCUT_OVERLAY.sandbox.VIEW_SHORTCUT;
			target.sandbox.DIC_BTN.changeLayout(14, undefined, 14, undefined, opt.popupLines * 23 + 10, 0);
			target.terminateContents(target.root);
			target.changeLayout(0, undefined, 0, undefined, opt.popupLines * 23 + 114, 0);
			target.initializeContents(target.root);
		}
		Core.events.unsubscribe(Core.events.EVENTS.BOOK_CHANGED, initPopupSize);
	}
	
	var DictionaryOptions = {
		name: 'DictionaryOptions',
        title: L('TITLE'),
		icon: 'NODICTIONARY',
		optionDefs: [
			{
				name: 'disableDictDoubleTap',
				title: L('DISABLE_DICT_DOUBLETAP'),
				icon: 'SETTINGS',
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
				icon: 'SETTINGS',
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
				icon: 'SETTINGS',
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
				icon: 'SETTINGS',
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
				target.sandbox.DIC_BTN.changeLayout(14, undefined, 14, undefined, opt.popupLines * 23 + 10, 0);
				target.terminateContents(target.root);
				target.changeLayout(0, undefined, 0, undefined, opt.popupLines * 23 + 114, 0);
				target.initializeContents(target.root);
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
