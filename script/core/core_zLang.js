// Description: Localizaiton related code
// Author: kartu
//
// History:
//	2010-03-17 kartu - Initial version
//	2010-04-05 kartu - Finished localization
//	2010-04-10 kartu - Fixed collections localization (reported by kravitz)
//	2010-04-21 kartu - Localized. Fixed invisible "continue" comment bug.
//	2010-04-22 kartu - Added date customization
//	2010-04-24 kartu - Added Catalan, Georgian, German, Russian and Spanish locales
//	2010-04-24 kartu - Fixed SS_ON related bug (was set to min instead of max field)
//	2010-04-24 kartu - Changed language order
//	2010-04-25 kartu - Marked kbook.model.getDateAndClock as constructor
//	2010-04-25 kartu - Moved default UI localizer into separate file
//	2010-04-27 kravitz - Localizers are adapted for work with functions
//	2010-05-04 kravitz - Added French locale
//	2010-05-06 kartu - Added Czech locale
//	2010-05-10 kartu - Added Simplified Chineze locale
//	2010-05-11 kartu - Renamed Chinese to "Simplified Chinese"
//				Added "VALUE_DEFAULT_DATE" translation (CoreLang)
//	2010-05-15 kartu - Fixed date bug (when switching from any to English translation)
//				Fixed English locales date bug (wasn't possible to save date since kbook.model.getDateAndClock wasn't overriden
//	2010-05-18 kartu - Fixed dateSeparator's default value (spotted by VICTORSJG)
//	2010-06-27 kartu - Fixed error log message (was refering to core-hook2, instead of lang)
//	2010-09-02 kartu - Removed date related code
//			removed lang.init call (should be called from model specific compat module)

tmp = function() {
	var _strings; // whatever is loaded from lang/<language>.js file
	var langL;
	
	Core.lang = {
		/**
		* Should be called prior to getLocalizer calls
		* 
		* @param langFile - full path to the actual language js file (e.g. English.js)
		*/
		init: function (langFile) {
			try {
				try {
					_strings = Core.system.callScript(langFile, log);
				} catch (e0) {
					log.error("Failed to load strings: ", e0);
				}
				
				coreL = this.getLocalizer("Core"); // defined in core
				langL = this.getLocalizer("CoreLang");
			} catch (e) {
				log.error("in Core.lang.init: " + e);
			}
		},

		getStrings: function (category) {
			try {
				if (_strings !== undefined && _strings[category] !== undefined) {
					return _strings[category];
				} else {
					log.warn("Cannot find strings for category: " + category);
					return {};
				}
			} catch (e) {
				log.error("in getStrings: " + e);
			}
		},

		getLocalizer: function (category) {
			var createLocalizer = function(str, prefix) {
				var f = function(key, param) {
					if (str.hasOwnProperty(key)) {
						try {
							if (typeof str[key] == "function") {
								return str[key](param);
							}
							return str[key];
						} catch (e) {
						}
					}
					return prefix + key;
				};
				return f;
			};
			return createLocalizer(this.getStrings(category), category + ".");
		}
	};
};

try {
	tmp();
} catch (e) {
	log.error("initializing core-lang", e);
}
