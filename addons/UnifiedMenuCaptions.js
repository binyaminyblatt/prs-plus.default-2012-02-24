// Name: Unified Menu Captions
// Description: Allows to choose caption style in menus
//
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
