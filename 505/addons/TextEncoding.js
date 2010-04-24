// Name: Non-Unicode text encoding
// Description: Allows to choose between Latin / win1251 (Russian) encodings
// Author: kartu
//
// History:
//	2010-03-04 kartu - Initial version
//	2010-03-14 kartu - #Refactored Utils -> Core
//	2010-04-17 kartu - Moved global vars into local functions context
//	2010-04-24 kartu - Prepared for merging into single JS

// dummy function, to avoid introducing global vars
var tmp = function () {
	var L = Core.lang.getLocalizer("TextEncoding");
	
	Core.addAddon({
		name: "TextEncoding",
		icon: "BOOK",
		onPreInit: function() {
			this.title = L("TITLE");
			this.description = L("DESCRIPTION");
			this.comment = L("COMMENT");
			this.optionDefs = [
				{
					name: "encoding",
					title: L("OPTION_TITLE"),
					icon: "BOOK",
					defaultValue: "___latin___",
					values:	["___latin___", "___win1251___"],
					valueTitles: {
						___latin___: L("LATIN"), 
						___win1251___: L("RUSSIAN") 
					}
				}
			];
		}
	});
};
try {
	tmp();
} catch (e) {
	// Core's log
	log.error("in TextEncoding.js", e);
}
