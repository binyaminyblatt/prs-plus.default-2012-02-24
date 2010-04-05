// Name: Unified Menu Captions
// Description: Allows to choose caption style in menus
// Author: kartu
//
// History:
//	2010-03-07 kartu - #Prepared for localization
//	2010-03-14 kartu - #Refactored Utils -> Core
//	2010-03-14 kartu - Localized

var str = Core.lang.getStrings("MenuCaptions");

var L = function (key) {
	if (str.hasOwnProperty(key)) {
		return str[key];
	} else {
		return "MenuCaption." + key;
	}
};

return {
	name: "MenuCaptions",
	title: L("TITLE"),
	description: L("TITLE_COMMENT"),
	icon: "LIST",
	onInit: function () {
		var styles = Core.system.getSoValue(kbook.tableData, "table.skin.styles");
		this.big = styles[2];
		this.small = styles[3];
		this.onSettingsChanged();
	},
	onSettingsChanged: function () {
		var styles = Core.system.getSoValue(kbook.tableData, "table.skin.styles");
		switch (this.options.style) {
			case "def":
				styles[2] = this.big;
				styles[3] = this.small;
				break;
			case "big":
				styles[2] = this.big;
				styles[3] = this.big;
				break;
			case "small": // fallthrough
			default:
				styles[2] = this.small;
				styles[3] = this.small;
				break;
		}
	},
	optionDefs: [
		{
			name: "style",
			title: L("OPTION_STYLE"),
			icon: "LIST",
			defaultValue: "small",
			values:	["def", "small" , "big"],
			valueTitles: {
				def: L("VALUE_SONY_DEFAULT"), 
				small: L("VALUE_ALWAYS_SMALL"), 
				big: L("VALUE_ALWAYS_BIG")
			}
		}
	]
};
