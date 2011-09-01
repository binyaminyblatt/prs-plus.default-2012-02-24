// Name: BookManagement
// Description: Allows to set 'new' flag manually 
//	and to hide default collections
// 
// Author: quisvir
//
// History:
//	2011-08-29 quisvir - Initial version
//  2011-08-31 quisvir - Avoid assets.xml and change terminology

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
	
	SetCustomToneCurve = function () {
		kbook.model.toneCurveTable[5] = "100,-100";
	};

	kbook.model.container.sandbox.OPTION_OVERLAY_PAGE_TONECURVEEDITOR.sandbox.initToneCurveEditor = function () {
		var contrast, brightness;
		contrast = parseInt(this.targetModel.doSomething('getContrast'));
		brightness = parseInt(this.targetModel.doSomething('getBrightness'));
		log.error("1", contrast);
		contrast = "-50";
		log.error("2", contrast);
		this.org_slider_1 = contrast;
		this.org_slider_2 = brightness;
		this.ToneUpdate(contrast, brightness);
	};

	// Keep new flag as is on opening book
	var oldonChangeBook = kbook.model.onChangeBook;
	kbook.model.onChangeBook = function (node) {
	var newflag = node.opened;
	oldonChangeBook.apply(this, arguments);
	if (Core.addonByName.BookManagement.options.ManualNewFlag == "true") { node.opened = newflag; }
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
				name: "ManualNewFlag",
				title: L("OPTION_MANUALNEWFLAG"),
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
		//SetCustomToneCurve();
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
