// Name: BookManagement
// Description: Allows to set 'new' flag manually, to hide default collections
//				and to show reading progress in home menu and thumbnail views
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
//	2011-09-09 quisvir - Added exception for reading progress in thumbnail checkbox view
//	2011-09-10 quisvir - Reading Progress: Fixed menu lockups in views other than books
//	2011-09-12 quisvir - Added Home Menu Booklist customization

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
		if (Core.addonByName.BookManagement.options.ManualNewFlag == "true") node.opened = newflag;
		UpdateBooklist(); // For Home Menu Booklist customization
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
			else return true;
		}
		else return Fskin.overlayTool.isDisable(part);
	}

	// Hide default collections
	var oldkbookPlaylistNode = kbook.root.kbookPlaylistNode.construct;
	kbook.root.kbookPlaylistNode.construct = function () {
		oldkbookPlaylistNode.apply(this, arguments);
		if (Core.addonByName.BookManagement.options.HideAddNewCollection == "true") {
			this.nodes.splice(this.purchasedNodeIndex + 1,1);
			this.constNodesCount--;
		}
		if (Core.addonByName.BookManagement.options.HidePurchasedBooks == "true") {
			this.nodes.splice(this.purchasedNodeIndex,1);
			this.constNodesCount--;
			this.presetItemsCount--;
		}
		if (Core.addonByName.BookManagement.options.HideUnreadPeriodicals == "true") {
			this.nodes.splice(this.purchasedNodeIndex - 1,1);
			this.constNodesCount--;
			this.presetItemsCount--;
		}
		if (Core.addonByName.BookManagement.options.HideUnreadBooks == "true") {
			this.nodes.splice(this.purchasedNodeIndex - 2,1);
			this.constNodesCount--;
			this.presetItemsCount--;
		}
	}

	// Draw reading progress instead of 'last read' date/time
	kbook.model.getContinueDate = function (node) {
		if (Core.addonByName.BookManagement.options.ShowReadingProgressCurrent == "true" && this.currentBook.media.ext.history[0]) {
			var page = this.currentBook.media.ext.history[0].page + 1;
			if (page < Core.addonByName.BookManagement.options.OnlyShowFromPage) return node.nodes[0].lastReadDate;
			var pages = this.currentBook.media.ext.history[0].pages;
			return ReadingProgressComment(page, pages, Core.addonByName.BookManagement.options.ProgressFormatCurrent);
		}
		else return node.nodes[0].lastReadDate;
	}
	
	// Draw reading progress below thumbnails (both home screen and book lists)
	// FIXME thumbnail checkbox view crashes on accessing record.media.ext - temporarily solved with exception !this.menu.getFixSelectPosition()
	var oldthumbnaildrawRecord = Fskin.kbookViewStyleThumbnail.drawRecord;
	Fskin.kbookViewStyleThumbnail.drawRecord = function (offset, x, y, width, height, tabIndex, parts) {
		oldthumbnaildrawRecord.apply(this, arguments);
		if (Core.addonByName.BookManagement.options.ShowReadingProgressThumbs == "true") {
			var record = this.menu.getRecord(offset);
			if (record && record.kind == 2 && !this.menu.getFixSelectPosition() && !record.expiration && record.media.ext.history[0]) {
				var page = record.media.ext.history[0].page + 1;
				if (page < Core.addonByName.BookManagement.options.OnlyShowFromPage) return;
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
			case "2": return L("PAGE") + ' ' + page + ' ' + L("OF") + ' ' + pages + ' (' + Math.floor((page/pages)*100) + '%)';
			case "3": return page + ' ' + L("OF") + ' ' + pages;
			case "4": return page + ' ' + L("OF") + ' ' + pages + ' (' + Math.floor((page/pages)*100) + '%)';
			case "5": return Math.floor((page/pages)*100) + '%';
			case "6": return page + ' / ' + pages;
			case "7": return page + ' / ' + pages + ' (' + Math.floor((page/pages)*100) + '%)';
			case "8": return L("PAGE") + ' ' + page + ' / ' + pages + ' (' + Math.floor((page/pages)*100) + '%)';
		}
	}

	// Code to randomize array from jsfromhell.com
	shuffle = function (v) {
		for (var j, x, i = v.length; i; j = parseInt(Math.random() * i), x = v[--i], v[i] = v[j], v[j] = x);
		return v;
	};

	// Customize book list in home menu
	// Maybe move (option) to Menu Customizer?
	var oldbookThumbnails = kbook.root.children.deviceRoot.children.bookThumbnails.construct;
	kbook.root.children.deviceRoot.children.bookThumbnails.construct = function () {
		var nodes, prototype, result, node;
		FskCache.tree.xdbNode.construct.call(this);
		nodes = this.nodes = [];
		prototype = this.prototype;
		if (this.cache) {
			result = this.cache[this.master];
			result = this.filter(result);
			
			switch (Core.addonByName.BookManagement.options.HomeMenuBooklist) {
									
			case 1: // Booklist option: last opened books
				var i=0, j=0, opened=[], records, record, number;
				records = result.count();
				// Now find all opened books
				// Use history[0] as proxy for currentPosition, since direct testing crashes
				while (i < records) {
					record = result.getRecord(i);
					if (record.ext.history[0]) opened.push({number:i, date:Date.parse(record.ext.currentPosition.date)});
					i++;
				}
				// Sort opened books by date, then add 1-3 to nodes, or 0-2 if no currentbook
				opened.sort(function(a, b){ return b.date-a.date })
				if (kbook.model.currentBook || kbook.model.currentPath) j=1;
				for (i=0;i<3&&i+j<opened.length;i++) {
					node = nodes[i] = xs.newInstanceOf(prototype);
					node.cache = this.cache;
					node.parent = this.parent.nodes[1];
					node.sorter = this;
					node.depth = this.depth + 1;
					node.media = result.getRecord(opened[i+j].number);
				}
				break;
			
			case 2: // Booklist option: books by same author
				var i=0, currentpath, id, author, booklist=[];
				// First find id and author of current book
				if (kbook.model.currentBook) {
					id = kbook.model.currentBook.media.id;
					author = kbook.model.currentBook.media.author;
				}
				// If currentBook is null, use indirect route via currentPath
				if (kbook.model.currentPath) {
					currentpath = kbook.model.currentPath;
					records = result.count();
					for (i=0;i<records;i++) {
						if (result.getRecord(i).ext.path == currentpath) {
							id = result.getRecord(i).id;
							author = result.getRecord(i).author;
							break;
						}
					}
				}
				if (author) {
					records = result.count();
					// Find other books by same author, excluding currentbook
					for (i=0;i<records;i++) {
						if (result.getRecord(i).author == author && result.getRecord(i).id != id) booklist.push(i);
					}
					// Shuffle book list and add first 3 items to nodes
					booklist = shuffle(booklist);
					for (i=0;i<3&&i<booklist.length;i++) {
						node = nodes[i] = xs.newInstanceOf(prototype);
						node.cache = this.cache;
						node.parent = this.parent.nodes[1];
						node.sorter = this;
						node.depth = this.depth + 1;
						node.media = result.getRecord(booklist[i]);
					}
				}
				break;
			
			case 3: // Booklist option: next books in collection
				var i=0, j=0, k=0, collections, currentpath, id, records, record, books, result2;
				// First find id of current book
				// currentBook is often null at this stage, hence indirect route via currentPath
				if (kbook.model.currentBook) id = kbook.model.currentBook.media.id;
				if (kbook.model.currentPath) {
					currentpath = kbook.model.currentPath;
					records = result.count();
					for (i=0;i<records;i++) {
						if (result.getRecord(i).ext.path == currentpath) {
							id = result.getRecord(i).id;
							break;
						}
					}
				}
				if (id) {
					// Switch to collections cache
					result2 = this.cache['playlistMasters'];
					collections = result2.count();
					for (i=0;i<collections;i++) {
						record = result2.getRecord(i);
						books = record.items.length;
						for (j=0;j<books;j++) {
							if (record.items[j].id == id) {
							// Current book has been found in collection
							// Now add next 3 collection items, if present, to nodes
								j++;
								while (j<books&&k<3) {
									node = nodes[k] = xs.newInstanceOf(prototype);
									node.cache = this.cache;
									node.parent = this.parent.nodes[1];
									node.sorter = this;
									node.depth = this.depth + 1;
									node.media = result.getRecord(record.items[j].id-2); // -2 does the trick, but seems arbitrary
									j++; k++;
								}
								i = collections;
								j = books;
							}
						}
					}
				}
				break;
			}
			
			// If no results or pref set to default, display last added books
			if (nodes.length == 0) oldbookThumbnails.apply(this, arguments);
		}
	};

	// Commit cache and update root menu
	UpdateBooklist = function () {
		kbook.model.commitCache();
		kbook.root.update(kbook.model);
		kbook.model.updateData();
	}

	var BookManagement = {
		name: "BookManagement",
		title: L("TITLE"),
		// icon: "BOOKS",
		actions: [{
			name: "CycleHomeMenuBooklist",
			title: L("CYCLE_HOME_MENU_BOOKLIST"),
			group: "Other",
			action: function () {
				if (Core.addonByName.BookManagement.options.HomeMenuBooklist == 3) Core.addonByName.BookManagement.options.HomeMenuBooklist = 0;
				else Core.addonByName.BookManagement.options.HomeMenuBooklist++;
				Core.settings.saveOptions(BookManagement); // FIXME radio button in PRS+ settings isn't updated
				UpdateBooklist();
			}
		}],
		optionDefs: [
			{
				name: "HomeMenuBooklist",
				title: L("CUSTOMIZE_HOME_MENU_BOOKLIST"),
				defaultValue: 0,
				values: [0, 1, 2, 3],
				valueTitles: {
					0: L("VALUE_DEFAULT"),
					1: L("LAST_OPENED_BOOKS"),
					2: L("BOOKS_BY_SAME_AUTHOR"),
					3: L("NEXT_BOOKS_IN_COLLECTION")
				}
			},
			{
			groupTitle: L("SHOW_READING_PROGRESS"),
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
			]},
			{
			groupTitle: L("HIDE_DEFAULT_COLLECTIONS"),
			// groupIcon: "BOOKS",
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
			]},
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
		],
		onSettingsChanged: function (propertyName, oldValue, newValue, object) {
		if (propertyName == 'HomeMenuBooklist') UpdateBooklist();
		},
	};

	Core.addAddon(BookManagement);
};
try {
	tmp();
} catch (e) {
	// Core's log
	log.error("in BookManagement.js", e);
}
