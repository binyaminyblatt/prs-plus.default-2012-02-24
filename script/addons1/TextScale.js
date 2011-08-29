// Name: Text Scale
// Description: Options to set default text scale and to disable scale steps
// Author: kravitz
//
// History:
//	2010-04-27 kravitz - Initial version
//	2010-05-11 kartu - Fixed EPUB zoom. Still has side effects: utils -> clear history resets zoom
//	2010-05-11 kartu - Changed it, so that addon doesn't hook unless needed. 
//				Fixed === 0 bugs introduced in previous commit.
//
// Note(s):
//	- Reassigns original kbook.model.onChangeBookCallback()
//	- Reassigns original Fskin.kbookPage.doSize()
//
// TODO:
//	- Add TEXT_SCALE icon (ex. magnifier)

tmp = function() {
	// Shortcuts
	var log = Core.log.getLogger("TextScale");
	var getSoValue = Core.system.getSoValue;
	var setSoValue = Core.system.setSoValue;
	var getFastBookMedia = Core.system.getFastBookMedia;

	// Localize
	var L = Core.lang.getLocalizer("TextScale");

	// Scale values
	var SCALE_SMALL = 0;
	var SCALE_MEDIUM = 1;
	var SCALE_LARGE = 2;

	// Strings
	var ENABLED = L("VALUE_ENABLED");
	var DISABLED = L("VALUE_DISABLED");
	var SMALL = L("VALUE_SMALL");
	var MEDIUM = L("VALUE_MEDIUM");
	var LARGE = L("VALUE_LARGE");

	// This addon
	var TextScale = {
		name: "TextScale",
		settingsGroup: "viewer",
		optionDefs: [
		{
			name: "scaleDefault",
			title: L("OPTION_SCALE_DEFAULT"),
			icon: "TEXT_SCALE",
			defaultValue: SCALE_SMALL,
			values:	[SCALE_SMALL, SCALE_MEDIUM, SCALE_LARGE],
			valueTitles: {
				0: SMALL,
				1: MEDIUM,
				2: LARGE
			}
		},
		{
			name: "0",
			title: SMALL,
			icon: "TEXT_SCALE",
			defaultValue: 1,
			values:	[1, 0],
			valueTitles: {
				1: ENABLED,
				0: DISABLED
			}
		},
		{
			name: "1",
			title: MEDIUM,
			icon: "TEXT_SCALE",
			defaultValue: 1,
			values:	[1, 0],
			valueTitles: {
				1: ENABLED,
				0: DISABLED
			}
		},
		{
			name: "2",
			title: LARGE,
			icon: "TEXT_SCALE",
			defaultValue: 1,
			values:	[1, 0],
			valueTitles: {
				1: ENABLED,
				0: DISABLED
			}
		}]
	};

	var oldOnChangeBookCallback = kbook.model.onChangeBookCallback;
	var onChangeBookCallback = function () {
		try {
			if (this.currentBook) {
				var media = getFastBookMedia(this.currentBook);
				// EPUBs don't have layouts, so we have to check history
				// as a side effect, utils -> clear history will also reset zoom 
				if (getSoValue(media, "layouts").length === 0 && getSoValue(media, "history").length === 0) {
					// Book is opened for the first time - set default scale
					setSoValue(media, "scale", TextScale.options.scaleDefault);
				}
			}
		} catch (e) {
			log.error("onChangeBookCallback(): " + e);
		}
		oldOnChangeBookCallback.apply(this, arguments);
	};
	
	var doSize = function () {
		try {
			var media = getFastBookMedia(kbook.model.currentBook);
			//NOTE Original handler used kbook.bookData.textScale but it looks like the same
			var current = getSoValue(media, "scale");
			// Find next enabled scale...
			var next = (current == 2) ? 0 : current + 1; // get next
			if (TextScale.options[next] == 0) { // next is disabled
				next = (next == 2) ? 0 : next + 1; // get next
				if (TextScale.options[next] == 0) { // next is disabled
					// No more enabled scales
					return;
				}
			}
			// Set new scale
			var browseTo = getSoValue(media, "browseTo");
			browseTo.call(media, kbook.bookData, undefined, undefined, undefined, next);
		} catch (e) {
			log.error("doSize(): " + e);
		}
	};
	
	// Hooks doSize and onChangeBookCallback
	// Is safe to call more than once
	var doHook = function() {
		var kbookPage = getSoValue("Fskin.kbookPage");
		kbookPage.doSize = doSize;
		kbook.model.onChangeBookCallback = onChangeBookCallback;
	};
	
	var areSettingsDefault = function() {
		var options = TextScale.options;
		return options !== undefined && options.scaleDefault == SCALE_SMALL && 
			options[0] == 1 && options[1] == 1 && options[2] == 1;
	};

	TextScale.onInit = function() {
		if (!areSettingsDefault()) {
			doHook();
		}
	};
	
	TextScale.onSettingsChanged = function (propertyName, oldValue, newValue) {
		if (oldValue === newValue) {
			return;
		}
		if (propertyName === "scaleDefault") {
			this.options[newValue] = 1;
		} else {
			// "0" | "1" | "2"
			var next;
			if (!newValue) { // current is disabled
				// Check up at least one scale is enabled and default scale is enabled...
				var current = Number(propertyName);
				if (this.options[0] == 0 && this.options[1] == 0 && this.options[2] == 0) {
					// all are disabled
					next = (current == 2) ? 0 : current + 1; // get next
					this.options[next] = 1; // enable next
					this.options.scaleDefault = next; // default next
				} else {
					if (this.options.scaleDefault == current) { // current is default
						next = (current == 2) ? 0 : current + 1;  // get next
						if (this.options[next] == 0) { // next is disabled
							next = (next == 2) ? 0 : next + 1; // get next
						}
						this.options.scaleDefault = next; // default it
					}
				}
			}
		}
		
		if (!areSettingsDefault()) {
			doHook();
		}
	};

	Core.addAddon(TextScale);
};

try {
	tmp();
} catch (e) {
	// Core's log
	log.error("in TextScale.js", e);
}