// Name: BookManagement
// Description: Allows to set 'new' flag manually 
//	and to hide default collections
// 
// Author: quisvir
//
// History:
//	2011-08-29 quisvir - Initial version
//	2011-08-31 quisvir - Avoid assets.xml and change terminology
//	2011-09-04 Mark Nord - preserve Add-Collection, added icons

tmp = function() {

	switch (Core.config.model) {
	case "505":
	case "300":
	case "600":
		return;	
		break;
	default:       
	}

	var L = Core.lang.getLocalizer("BookManagement");

	// Keep new flag as is on opening book
	var oldonChangeBook = kbook.model.onChangeBook;
	kbook.model.onChangeBook = function (node) {
		var newflag = node.opened;
		oldonChangeBook.apply(this, arguments);
		if (Core.addonByName.BookManagement.options.ManualNewFlag == "true") {
			 node.opened = newflag; 
		}
	}
	
	// Book menu option to switch new flag, called from main.xml
	kbook.model.container.sandbox.OPTION_OVERLAY_PAGE.sandbox.NewFlagToggle = function () {
	this.doOption();
	var book = kbook.model.currentBook;
	book.opened = (book.opened) ? false : true;
	}
	
	// Show book menu option if preference is set
	kbook.optMenu.isDisable = function (part) {
		if (this.hasString(part, 'manualnewflag')) {
			if (Core.addonByName.BookManagement.options.ManualNewFlag == "true") {
				part.text = (kbook.model.currentBook.opened) ? L("SETNEWFLAG") : L("REMOVENEWFLAG");
				return Fskin.overlayTool.isDisable(part);
			}
			else { return true }
		}
		else { return Fskin.overlayTool.isDisable(part) }
	}

	// Hide default collections
	var oldkbookPlaylistNode = kbook.root.kbookPlaylistNode.construct;
	kbook.root.kbookPlaylistNode.construct = function () {
		oldkbookPlaylistNode.apply(this, arguments);
		if (Core.addonByName.BookManagement.options.HideDefaultCollections == "true") {
			this.nodes.splice(this.purchasedNodeIndex - 2,3);
			this.constNodesCount = 1;
			this.presetItemsCount = 1;
		}
	}

	var BookManagement = {
		name: "BookManagement",
	//	title: L("TITLE"),
	//	settingsGroup: "bookmanagement",
		icon: "BOOKS",
		optionDefs: [
			{
				name: "ManualNewFlag",
				title: L("OPTION_MANUALNEWFLAG"),
				icon: "NEW",
				defaultValue: "false",
				values: ["true", "false"],
				valueTitles: {
					"true": L("VALUE_TRUE"),
					"false": L("VALUE_FALSE")
				}	
			},
			{
				name: "HideDefaultCollections",
				title: L("OPTION_HIDEDEFCOLL"),
				icon: "BOOKS",
				defaultValue: "false",
				values: ["true", "false"],
				valueTitles: {
					"true": L("VALUE_TRUE"),
					"false": L("VALUE_FALSE")
				}	
			}		
		]
	};

	Core.addAddon(BookManagement);
};
try {
	tmp();
} catch (e) {
	// Core's log
	log.error("in BookManagement.js", e);
}
