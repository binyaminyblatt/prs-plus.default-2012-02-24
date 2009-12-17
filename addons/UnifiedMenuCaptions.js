// Name: Unified Menu Captions
// Description: Allows to choose caption style in menus
//
var log = Utils.getLogger("Unified Menu Captions");
return {
	name: "Menu Captions",
	description: "Allows to choose menu caption style",
	icon: "LIST",
	onInit: function() {
		var styles = Utils.getSoValue(kbook.tableData, "table.skin.styles");
		this.big = styles[2];
		this.small = styles[3];
		this.onSettingsChanged();
	},
	onSettingsChanged: function() {
		log.trace("entering on settings changed");
		log.trace("this.options.style is " + this.options.style);
		var styles = Utils.getSoValue(kbook.tableData, "table.skin.styles");
		switch(this.options.style) {
			case "def":
				styles[2] = this.big;
				styles[3] = this.small;
				break;
			case "big":
				styles[2] = this.big;
				styles[3] = this.big;
				break;
			case "small": // breakthrough
			default:
				styles[2] = this.small;
				styles[3] = this.small;
				break;
		}
		log.trace("exiting on settings changed");
	},
	optionDefs: [
		{
			name: "style",
			title: "Menu Captions Style",
			icon: "LIST",
			defaultValue: "small",
			values:      ["def", "small" , "big"],
			valueTitles: {
					def:"Sony default", 
					small: "Always small", 
					big: "Always big"
			}
		}
	]
};
