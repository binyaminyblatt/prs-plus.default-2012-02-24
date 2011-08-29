// Name: BookManagement
// Description: Allows to mark books as read 
//	and to hide default collections
// 
// Author: quisvir
//
// History:
//	2011-08-29 quisvir - Initial version

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

	// Don't allow automatic marking of books as opened, keep value as is
	var oldonChangeBook = kbook.model.onChangeBook;
	kbook.model.onChangeBook = function (node) {
	var bookread = node.opened;
	oldonChangeBook.apply(this, arguments);
	if (Core.addonByName.BookManagement.options.ManualAsReadMarking == "true") { node.opened = pageOptionOverlayModel.VAR_BookRead = bookread; }
	}
	
	// Book menu option to switch read status, called from main.xml
	kbook.model.container.sandbox.OPTION_OVERLAY_PAGE.sandbox.MarkAsReadToggle = function () {
	this.doOption();
	var book = kbook.model.currentBook;
	book.opened = (book.opened) ? false : true;
	pageOptionOverlayModel.VAR_BookRead = book.opened;
	}
	
	// Only show book menu option if preference is set
	kbook.optMenu.isDisable = function (part) {
	if ((Core.addonByName.BookManagement.options.ManualAsReadMarking != "true") && (this.hasString(part, 'markasread'))) { return true }
	else { return Fskin.overlayTool.isDisable(part); }
	}
	
	// Hide default collections
	var oldkbookPlaylistNode = kbook.root.kbookPlaylistNode.construct;
	kbook.root.kbookPlaylistNode.construct = function () {
		oldkbookPlaylistNode.apply(this, arguments);
		if (Core.addonByName.BookManagement.options.HideDefaultCollections == "true") {
		this.nodes.splice(this.purchasedNodeIndex - 2,4);
		this.constNodesCount = 0;
		this.presetItemsCount = 0;
		}
	}

	var BookManagement = {
		name: "BookManagement",
		settingsGroup: "bookmanagement",
		optionDefs: [
			{
				name: "ManualAsReadMarking",
				title: L("OPTION_MARKASREAD"),
				icon: "SETTINGS",
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
				icon: "SETTINGS",
				defaultValue: "false",
				values: ["true", "false"],
				valueTitles: {
					"true": L("VALUE_TRUE"),
					"false": L("VALUE_FALSE")
				}	
			}		
		],
		/**
		* @constructor
		*/
		onPreInit: function () {
		},
		onInit: function () {
		},
		onSettingsChanged: function (propertyName, oldValue, newValue, object) {
		}
	};

	Core.addAddon(BookManagement);
};
try {
	tmp();
} catch (e) {
	// Core's log
	log.error("in BookManagement.js", e);
}
