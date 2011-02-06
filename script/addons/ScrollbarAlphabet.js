// Name: ScrollbarAlphabet
// Description: Allows to select alphabet used in Books view of the 600 and later models.
// Author: kartu
//
// History:
//	2011-02-06 kartu - Initial version

tmp = function() {
	var log, L, defVal, ScrollbarAlphabet, initAlphaBins, getBinName, oldInitAlphaBins, oldGetBinName, BINS, rangeBasedGetBinName; 
	L = Core.lang.getLocalizer("ScrollbarAlphabet");
	log = Core.log.getLogger("ScrollbarAlphabet");
	defVal = "default";
	
	// Base func for range based alphabets
	rangeBasedGetBinName = function (bins, from, to, item) {
		var ch, i, n, code;
		ch = item.charAt(0).toUpperCase();
		code = ch.charCodeAt(0);
		if (code < from) {
			return "#";
		} else if (code > to) {
			return "*";
		}				
		for (i = 0, n = bins.length; i < n; i ++) {
			if (bins[i] === ch) {
				return ch;
			}
		}
		return "*";
	};
		
	BINS = {
		"lat": {
			bins: [ "#", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "*"],
			getBinName: function (item) {
				try {
					return rangeBasedGetBinName(this.bins, 65, 122, item);
				} catch (e) {
					log.error("in geo.getBinName, item is " + item, e);
					return "*";
				}				
			}
		}, 
		"rus": {
			bins: [ "#", "А", "Б", "В", "Г", "Д", "Е", "Ё", "Ж", "З", "И", "Й", "К", "Л", "М", "Н", "О", "П", "Р", "С", "Т", "У", "Ф", "Х", "Ц", "Ч", "Ш", "Щ", "Ъ", "Ы", "Ь", "Э", "Ю", "Я", "*"],
			getBinName: function (item) {
				var ch, code;
				try {
					ch = item.charAt(0);
					code = item.charCodeAt(0);
					// Ё
					if (code === 1025 || code === 1105) {
						return "Ё";
					}
					if (code < 1040 ) {
						return "#";
					} else if (code > 1103) {
						return "*";
					}
					// toUppercase
					if (code > 1072) {
						ch = String.fromCharCode(code - 32);
					}
					return rangeBasedGetBinName(this.bins, 1040, 1071, ch);
				} catch (e) {
					log.error("in rus.getBinName, item is " + item, e);
					return "*";
				}
			}
		}, 
		"geo": {
			bins: [ "#", "ა", "ბ", "გ", "დ", "ე", "ვ", "ზ", "თ", "ი", "კ", "ლ", "მ", "ნ", "ო", "პ", "ჟ", "რ", "ს", "ტ", "უ", "ფ", "ქ", "ღ", "ყ", "შ", "ჩ", "ც", "ძ", "წ", "ჭ", "ხ", "ჯ", "ჰ", "*"],
			getBinName: function (item) {
				try {
					return rangeBasedGetBinName(this.bins, 4304, 4336, item);
				} catch (e) {
					log.error("in geo.getBinName, item is " + item, e);
					return "*";
				}
			}
		} 
	};
	
	getBinName = function(item) {
		var alphabet = ScrollbarAlphabet.options.alphabet;
		if (alphabet === defVal || BINS[alphabet] === undefined) {
			return oldGetBinName.apply(this, arguments);
		}
		return BINS[ScrollbarAlphabet.options.alphabet].getBinName(item);
	};
	
	initAlphaBins = function() {
		var i, n, alphabet, bins, result;
		try {
			alphabet = ScrollbarAlphabet.options.alphabet;
			if (alphabet === defVal || BINS[alphabet] === undefined) {
				return oldInitAlphaBins.apply(this, arguments);
			}
			
			result = new Fskin.kbookNavbar.BinSet(Fskin.kbookNavbar.binTypes.text);
			bins = BINS[alphabet].bins;
			for (i = 0, n = bins.length; i < n; i++) {
				result.add(bins[i]);
			}
			return result;
		} catch (e) {
			log.error("initAlphaBins", e);
		}
	};
	
	ScrollbarAlphabet = {
		name: "ScrollbarAlphabet",
		title: L("TITLE"),
		icon: "ABC",
		onPreInit: function() {
			this.optionDefs = [{
				name: "alphabet",
				title: L("OPT_ALPHABET"),
				icon: "ABC",
				defaultValue: defVal,
				values: [defVal, "lat", "rus", "geo"],
				valueTitles: {
					"lat": "Latin",
					"rus": "Русский",
					"geo": "ქართული"
				}			
			}];
			this.optionDefs[0].valueTitles[defVal] = L("VALUE_DEFAULT");
		},
		onInit: function() {
			oldInitAlphaBins = kbook.menuData.initAlphaBins;
			oldGetBinName = kbook.menuData.getBinName;
			kbook.menuData.initAlphaBins = initAlphaBins;
			kbook.menuData.getBinName = getBinName;
		}
	};
	
	Core.addAddon(ScrollbarAlphabet);
};

try {
	// Run only if model supports bins
	if (kbook.menuData.getBinName) {
		tmp();
		tmp = undefined;
	}
} catch (e) {
	// Core's log
	log.error("in ScrollbarAlphabet.js", e);
}