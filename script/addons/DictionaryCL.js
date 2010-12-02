// Name: Dictionary by Clemenseken & Lisak, adapted for PRS+
// Description: Temporary solution, until PRS+ version is developed
// Author: Clemenseken, Lisak
//
// History:
//	2010-05-01 kartu - Adapted for PRS+ from http://www.mobileread.com/forums/attachment.php?attachmentid=13182&d=1212445222
//	2010-11-30 kartu - Refactoring Core.stirng => Core.text
//	2010-12-01	kartu - Fixed bug caused by moving PRS+ out of sandbox
//

tmp = function() {
	var L = Core.lang.getLocalizer("Dictionary");
	var endsWith = Core.text.endsWith;
	var DISABLED = "disabled";
	
	var DictionaryCL = {
		name: "DictionaryCL",
		title: L("TITLE"),
		icon: "ABC",
		activate: function () {
			var dictOption = DictionaryCL.options.dictionary;
			if (dictOption === DISABLED) {
				Core.ui.showMsg([L("WARN_DICT_DISABLED")]);
			} else {
				var dictPath = Core.config.userDictionaryPath + dictOption;
				
				if (FileSystem.getFileInfo(dictPath)) {
					var rootPath = Core.config.addonsPath + "DictionaryCL/";

					kbook.autoRunRoot.sandbox.dictionaryParams = params;
					kbook.autoRunRoot.sandbox.exec = Core.shell.exec;
					kbook.autoRunRoot.sandbox.getFileContent = Core.io.getFileContent;
					kbook.autoRunRoot.sandbox.dictPath = dictPath;
					
					kbook.autoRunRoot.path = rootPath + "dictionary.xml";
					kbook.autoRunRoot.enterIf(kbook.model);
				} else {
					Core.ui.showMsg([L("WARN_DICT_DOESNT_EXIST")]);
				}
			}
		},
		actions: [{
			name: "launchDictionary",
			title: L("ACTION_DICTIONARY"),
			group: "Utils",
			icon: "ABC",
			action: function () {
				DictionaryCL.activate();
			}
		}],
		optionDefs: [
			{
				name: "dictionary",
				title: L("OPTION_DICTIONARY"),
				icon: "ABC",
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
			this.root = Core.config.userDictionaryPath;

			// Init epubCssFile values
			if (!FileSystem.getFileInfo(this.root)) {
				// dictionary folder doesn't exist, nothing to do
				return;
			}
			var iterator = new FileSystem.Iterator(this.root);
			try {
				var item, path;
				var od = this.optionDefs[0];
				while (item = iterator.getNext()) {
					if (item.type == "file") {
						path = item.path;
						if (endsWith(path, ".dic")) {
							od.values.push(path);
							od.valueTitles[path]  = path;
						}
					}
				}
			} finally {
				iterator.close();
			}
		}
	};
	Core.addAddon(DictionaryCL);
};
try {
	tmp();
} catch (e) {
	// log from Core
	log.error("in Dictionary by Clementseken & Lisak", e);
}