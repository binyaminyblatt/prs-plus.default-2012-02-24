// Name: EpubUserStyle
// Description: Allows to choose switch between epub .css styles
// Author: kartu
//
// History:
//	2010-03-05 kartu - Initial version
//	2010-03-11 kartu - Fixed minot bug (iterating over non existing folder)
//	2010-03-14 kartu - Refactored Utils -> Core
//	2010-03-14 kartu - Localized
//	2010-04-24 kartu - Prepared for merging into single JS
//	2010-04-25 kartu - Marked onPreInit as constructor
//	2010-04-27 kravitz - Joined "viewer" settings group
//	2010-04-28 kravitz - Fixed user .css files path
//	2010-11-30 kartu - Refactoring Core.stirng => Core.text
//	2011-02-07 kartu - Added Core.config.userCSSFile support (instead of hardcoded style.css)

tmp = function() {
	// Localize
	var L = Core.lang.getLocalizer("EpubUserStyle");

	var endsWith = Core.text.endsWith;

	// Constants
	var USER_CSS = Core.config.userCSSFile;
	if (USER_CSS === undefined) {
		USER_CSS = "style.css";
	}
	var DISABLED = "disabled";

	var EpubUserStyle = {
		name: "EpubUserStyle",
		settingsGroup: "viewer",
		optionDefs: [
			{
				name: "epubCssFile",
				title: L("OPTION_EPUB_CSS_FILE"),
				icon: "FONT",
				defaultValue: DISABLED,
				values: [DISABLED],
				valueTitles: {
					disabled: L("VALUE_DISABLED")
				}
			}
		],
		/**
		* @constructor
		*/
		onPreInit : function () {
			this.root = Core.config.userCSSPath;

			// Init epubCssFile values
			if (!FileSystem.getFileInfo(this.root)) {
				// epub folder doesn't exist, nothing to do
				return;
			}
			var iterator = new FileSystem.Iterator(this.root);
			try {
				var item, path;
				var od = this.optionDefs[0];
				while (item = iterator.getNext()) {
					if (item.type == "file") {
						path = item.path;
						if (path !== USER_CSS && endsWith(path, ".css")) {
							od.values.push(path);
							od.valueTitles[path]  = path;
						}
					}
				}
			} finally {
				iterator.close();
			}
		},
		onSettingsChanged: function (propertyName, oldValue, newValue, object) {
			if (newValue === DISABLED) {
				FileSystem.deleteFile(EpubUserStyle.root + USER_CSS);
			} else {
				Core.io.copyFile(EpubUserStyle.root + newValue, EpubUserStyle.root + USER_CSS);
			}
			Core.ui.showMsg([L("MSG_WARNING")]);
		}
	};

	Core.addAddon(EpubUserStyle);
};
try {
	tmp();
} catch (e) {
	// Core's log
	log.error("in EpubUserStyle.js", e);
}
