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

tmp = function() {
	var _strings; // whatever is loaded from lang/<language>.js file
	var langL;
	var getDateFunc = function(format, separator) {
		var toDoubleDigit = function (num) {
					if (num < 10) {
						return "0" + num;
					} else {
						return num;
					}
		};
		// "ddMMYY", "MMddYY", "YYMMdd", "ddMMMYY", "ddMONTHYY", "ddMMYYYY", "MMddYYYY", "YYYYMMdd", "ddMMMYYYY", "ddMONTHYYYY"
		return function() {
			try {
				var date = this;
				var day, month, nMonth, year, shortYear;
				day = toDoubleDigit(date.getDate());
				nMonth = date.getMonth() + 1;
				month = toDoubleDigit(nMonth);
				year = date.getFullYear();
				shortYear = toDoubleDigit(year - Math.floor(year/100) * 100);
				switch (format) {
					case "ddMMYY":
						return day + separator + month + separator + shortYear;
					case "MMddYY":
						return month + separator + day + separator + shortYear;
					case "YYMMdd":
						return shortYear + separator + month + separator + day;
					case "ddMMMYY":
						return day + separator + langL("MONTH_SHORT_" + nMonth) + separator + shortYear;
					case "ddMONTHYY":
						return day + separator + langL("MONTH_" + nMonth) + separator + shortYear;
					case "ddMMYYYY":
						return day + separator + month + separator + year;
					case "MMddYYYY":
						return month + separator + day + separator + year;
					case "YYYYMMdd":
						return year + separator + month + separator + day;
					case "ddMMMYYYY":
						return day + separator + langL("MONTH_SHORT_" + nMonth) + separator + year;
					case "ddMONTHYYYY":
						return day + separator + langL("MONTH_" + nMonth) + separator + year;
					default:
						return day + separator + month + separator + shortYear;
				}
			} catch (e) {
				return e;
			}
		};
	};
	Core.lang = {
		// "fake" options, used only for loading stuff saved by other addon
		name: "Localization",
		optionDefs: [
			{
				name: "lang",
				defaultValue: "English.js"
			},
			{
				name: "dateFormat",
				defaultValue: "default"
			},
			{
				name: "dateSeparator",
				defaultValue: "/"
			}
		],

		init: function () {
			try {
				Core.settings.loadOptions(this);

				try {
					_strings = Core.system.callScript(Core.config.corePath + "lang/" + this.options.lang, log);
				} catch (e0) {
					log.error("Failed to load strings: ", e0);
				}

				// If locale is English, there is nothing to localize
				if ("English.js" !== this.options.lang) {
					try {
						// localize default ui
						var code = Core.io.getFileContent(Core.config.corePath + "lang/defaultUILocalizer.js");
						var localizeDefaultUI = new Function("_strings,Core", code);
						localizeDefaultUI(_strings, Core);
						delete localizeDefaultUI;
					} catch (e1) {
						log.error("Failed to localize default UI", e1);
					}
				}

				// Date
				if ("default" !== this.options.dateFormat) {
					var separator = "/";
					switch (this.options.dateSeparator) {
						case "minus":
							separator = "-";
							break;
						case "dot":
							separator = ".";
							break;
						case "space":
							separator = " ";
							break;
						case "none":
							separator = "";
							break;
					}
					Date.prototype.toLocaleDateString = getDateFunc(this.options.dateFormat, separator);
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


	// Initialize lang
	Core.lang.init();

	// Language options
	var LangAddon = {
		name: "Localization",
		title:  langL("TITLE"),
		comment: langL("COMMENT"),
		optionDefs: [
			{
				name: "lang",
				title: langL("OPTION_LANG"),
				icon: "LIST",
				defaultValue: "English.js",
				values: ["Catalan.js", "Czech.js", "German.js", "English.js", "Spanish.js", "French.js", "Georgian.js", "Russian.js", "SimplifiedChinese.js"],
				valueTitles: {
					"Catalan.js": "Català",
					"Czech.js": "Český",
					"German.js": "Deutsch",
					"English.js": "English",
					"Spanish.js": "Español",
					"French.js": "Français",
					"Georgian.js": "ქართული",
					"Russian.js": "Русский",
					"SimplifiedChinese.js": "中文"
				}
			},
			{
				name: "dateFormat",
				title: langL("OPTION_DATE_FORMAT"),
				defaultValue: "default",
				values: ["default", "ddMMYY", "MMddYY", "YYMMdd", "ddMMMYY", "ddMONTHYY", "ddMMYYYY", "MMddYYYY", "YYYYMMdd", "ddMMMYYYY", "ddMONTHYYYY"],
				valueTitles: {
					ddMMYY: "31/01/99",
					MMddYY: "01/31/99",
					YYMMdd: "99/01/31",
					ddMMMYY: langL("ddMMMYY"),
					ddMONTHYY: langL("ddMONTHYY"),
					ddMMYYYY: "31/01/1999",
					MMddYYYY: "01/31/1999",
					YYYYMMdd: "1999/01/31",
					ddMMMYYYY: langL("ddMMMYYYY"),
					ddMONTHYYYY: langL("ddMONTHYYYY")
				}
			},
			{
				name: "dateSeparator",
				title: langL("OPTION_DATE_SEPARATOR"),
				defaultValue: "backslash",
				values: ["default", "minus", "dot", "space", "none"],
				valueTitles: {
					"default": "/",
					"minus": "-",
					"dot": ".",
					"space": langL("VALUE_SPACE"),
					"none": langL("VALUE_NONE")
				}
			}
		]
	};

	Core.addAddon(LangAddon);
};

try {
	tmp();
} catch (e) {
	log.error("initializing core-lang", e);
}
