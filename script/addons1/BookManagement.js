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
//	2011-09-05 quisvir - Extend Hide Collection options to 1 option per collection entry
//	2011-09-05 quisvir - Add reading progress in home menu and thumbnail views
//	2011-09-08 quisvir - Format options now correspond to statusbar options, and fewer strings needed

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
		if (Core.addonByName.BookManagement.options.HideAddNewCollection == "true") {
			this.nodes.splice(this.purchasedNodeIndex + 1,1);
			this.constNodesCount = this.constNodesCount - 1;
		}
		if (Core.addonByName.BookManagement.options.HidePurchasedBooks == "true") {
			this.nodes.splice(this.purchasedNodeIndex,1);
			this.constNodesCount = this.constNodesCount - 1;
			this.presetItemsCount = this.presetItemsCount - 1;
		}
		if (Core.addonByName.BookManagement.options.HideUnreadPeriodicals == "true") {
			this.nodes.splice(this.purchasedNodeIndex - 1,1);
			this.constNodesCount = this.constNodesCount - 1;
			this.presetItemsCount = this.presetItemsCount - 1;
		}
		if (Core.addonByName.BookManagement.options.HideUnreadBooks == "true") {
			this.nodes.splice(this.purchasedNodeIndex - 2,1);
			this.constNodesCount = this.constNodesCount - 1;
			this.presetItemsCount = this.presetItemsCount - 1;
		}
	}

	// Draw reading progress instead of 'last read' date/time
	kbook.model.getContinueDate = function (node) {
		if (Core.addonByName.BookManagement.options.ShowReadingProgressCurrent == "true" && this.currentBook.media.ext.history[0]) {
			var page = this.currentBook.media.ext.history[0].page + 1;
			if (page < Core.addonByName.BookManagement.options.OnlyShowFromPage) { return node.nodes[0].lastReadDate; }
			var pages = this.currentBook.media.ext.history[0].pages;
			return ReadingProgressComment(page, pages, Core.addonByName.BookManagement.options.ProgressFormatCurrent);
		}
		else { return node.nodes[0].lastReadDate; }
	}
	
	// Draw reading progress below thumbnails (both home screen and book lists)
	var oldthumbnaildrawRecord = Fskin.kbookViewStyleThumbnail.drawRecord;
	Fskin.kbookViewStyleThumbnail.drawRecord = function (offset, x, y, width, height, tabIndex, parts) {
		oldthumbnaildrawRecord.apply(this, arguments);
		if (Core.addonByName.BookManagement.options.ShowReadingProgressThumbs == "true" && offset < this.menu.countRecords() && !this.getField('multipleCheckbox', offset)) {
			var record = this.menu.getRecord(offset);
			if (record.media.ext.history[0]) {
				var page = record.media.ext.history[0].page + 1;
				if (page < Core.addonByName.BookManagement.options.OnlyShowFromPage) { return; }
				var pages = record.media.ext.history[0].pages;
				var message = ReadingProgressComment(page, pages, Core.addonByName.BookManagement.options.ProgressFormatThumbs);
				parts.commentStyle.draw(this.getWindow(), message, x+this.marginWidth, y+this.marginHeight+this.designSpacingHeight+Math.min(this.getTh(height),this.thumbnailHeight)+this.textSeparation+this.textNameHeight+this.marginNameAndComment + 20, this.getCw(width, Fskin.scratchRectangle.width), this.textCommentHeight);
			}
		}
	};
	
	// Format reading progress comment
	ReadingProgressComment = function (page, pages, format) {
		switch (format) {
			case "1": return L("PAGE") + ' ' + page + ' ' + L("OF") + ' ' + pages;
			case "2": return L("PAGE") + ' ' + page + ' ' + L("OF") + ' ' + pages + ' (' + Math.round((page/pages)*100) + '%)';
			case "3": return page + ' ' + L("OF") + ' ' + pages;
			case "4": return page + ' ' + L("OF") + ' ' + pages + ' (' + Math.round((page/pages)*100) + '%)';
			case "5": return Math.round((page/pages)*100) + '%';
			case "6": return page + ' / ' + pages;
			case "7": return page + ' / ' + pages + ' (' + Math.round((page/pages)*100) + '%)';
			case "8": return L("PAGE") + ' ' + page + ' / ' + pages + ' (' + Math.round((page/pages)*100) + '%)';
		}
	}

	var BookManagement = {
		name: "BookManagement",
		title: L("TITLE"),
	//	settingsGroup: "bookmanagement",
		icon: "BOOKS",
		optionDefs: [
			{
				name: "ManualNewFlag",
				title: L("SET_NEW_FLAG_MANUALLY"),
				icon: "NEW",
				defaultValue: "false",
				values: ["true", "false"],
				valueTitles: {
					"true": L("VALUE_TRUE"),
					"false": L("VALUE_FALSE")
				}	
			},
			{
			groupTitle: L("HIDE_DEFAULT_COLLECTIONS"),
			groupIcon: "BOOKS",
			optionDefs: [
				{
					name: "HideUnreadBooks",
					title: L("HIDE_UNREAD_BOOKS"),
					defaultValue: "false",
					values: ["true","false"],
					valueTitles: {
						"true": L("VALUE_TRUE"),
						"false": L("VALUE_FALSE")
					}
				},
				{
					name: "HideUnreadPeriodicals",
					title: L("HIDE_UNREAD_PERIODICALS"),
					defaultValue: "false",
					values: ["true","false"],
					valueTitles: {
						"true": L("VALUE_TRUE"),
						"false": L("VALUE_FALSE")
					}
				},
				{
					name: "HidePurchasedBooks",
					title: L("HIDE_PURCHASED_BOOKS"),
					defaultValue: "false",
					values: ["true","false"],
					valueTitles: {
						"true": L("VALUE_TRUE"),
						"false": L("VALUE_FALSE")
					}
				},
				{
					name: "HideAddNewCollection",
					title: L("HIDE_ADD_NEW_COLLECTION"),
					defaultValue: "false",
					values: ["true","false"],
					valueTitles: {
						"true": L("VALUE_TRUE"),
						"false": L("VALUE_FALSE")
					}
				},
			],
			},
			{
			groupTitle: L("READING_PROGRESS"),
			groupIcon: "FOLDER",
			optionDefs: [
				{
				name: "ShowReadingProgressCurrent",
				title: L("SHOW_READING_PROGRESS_CURRENT"),
				defaultValue: "false",
				values: ["true","false"],
				valueTitles: {
					"true": L("VALUE_TRUE"),
					"false": L("VALUE_FALSE")
				}
				},
				{
				name: "ProgressFormatCurrent",
				title: L("PROGRESS_FORMAT_CURRENT"),
				defaultValue: "2",
				values: ["1", "2", "3", "4", "5", "6", "7", "8"],
				valueTitles: {
					"1": L("PAGE") + " 5 " + L("OF") + " 100",
					"2": L("PAGE") + " 5 " + L("OF") + " 100 (5%)",
					"3": "5 " + L("OF") + " 100",
					"4": "5 " + L("OF") + " 100 (5%)",
					"5": "5%",
					"6": "5 / 100",
					"7": "5 / 100 (5%)",
					"8": L("PAGE") + " 5 / 100 (5%)"
				}
				},
				{
				name: "ShowReadingProgressThumbs",
				title: L("SHOW_READING_PROGRESS_THUMBS"),
				defaultValue: "false",
				values: ["true","false"],
				valueTitles: {
					"true": L("VALUE_TRUE"),
					"false": L("VALUE_FALSE")
				}
				},
				{
				name: "ProgressFormatThumbs",
				title: L("PROGRESS_FORMAT_THUMBS"),
				defaultValue: "3",
				values: ["1", "2", "3", "4", "5", "6", "7", "8"],
				valueTitles: {
					"1": L("PAGE") + " 5 " + L("OF") + " 100",
					"2": L("PAGE") + " 5 " + L("OF") + " 100 (5%)",
					"3": "5 " + L("OF") + " 100",
					"4": "5 " + L("OF") + " 100 (5%)",
					"5": "5%",
					"6": "5 / 100",
					"7": "5 / 100 (5%)",
					"8": L("PAGE") + " 5 / 100 (5%)"
				}
				},
				{
				name: "OnlyShowFromPage",
				title: L("ONLY_SHOW_FROM_PAGE"),
				defaultValue: 2,
				values: [1, 2, 3, 4, 5, 10, 25, 50],
				},
			],
			},
		],
	};

	Core.addAddon(BookManagement);
};
try {
	tmp();
} catch (e) {
	// Core's log
	log.error("in BookManagement.js", e);
}
