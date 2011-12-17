// Name: BookManagement_x50
// Description: Allows to set 'new' flag manually, to hide default collections,
//				to show reading progress in home menu and thumbnail views
//				and to customize home menu booklist
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
//	2011-09-14 quisvir - Fixed Booklist bug on searching history (thanks MiK77)
//	2011-09-14 quisvir - Fixed bug in Reading Progress if there is no current book
//	2011-09-15 quisvir - Fixed bug where booklist wasn't correct after startup (via workaround)
//	2011-09-16 quisvir - More bugfixes, booklist partly rewritten
//	2011-09-18 quisvir - Rename to BookManagement_x50, booklist speed improvements, add random booklist option
//	2011-09-20 quisvir - Use PRS+ book history instead of cache for 'last opened books' booklist
//	2011-09-22 quisvir - Display current booklist option in home menu
//	2011-09-27 quisvir - Add ability to cycle through collections for 'next in collection' booklist
//	2011-09-28 quisvir - Display current collection in home menu, add option to ignore memory cards
//	2011-10-04 quisvir - Add option to treat periodicals as books
//	2011-11-20 quisvir - Added sub-collection support (max 1 sub-level, using | as separator)
//	2011-11-25 quisvir - Added booklist option 'Select Collection' & action
//	2011-12-04 quisvir - Split cycle booklist action into cycle forward & backward actions
//  2011-12-04 Ben Chenoweth - Added "Next/Previous Books In History" actions
//  2011-12-05 Ben Chenoweth - Reset "Last Opened Books" when new book selected
//	2011-12-07 quisvir - Cosmetic changes
//	2011-12-11 quisvir - Extended 'Next/Previous Books' to all booklist options
//	2011-12-12 quisvir - Changed booklist construct to check numCurrentBook right away; various changes
//	2011-12-15 quisvir - Added Notepads filter to home menu booklist; code cleaning

tmp = function() {

	var L, LX, log, opt, bookChanged, trigger1, trigger2, trigger3, trigger4, doSelectCollection, selectCollectionConstruct,
		selectCollectionDestruct, tempNode, numCur, updateBookList, filterBooklist;
	
	L = Core.lang.getLocalizer('BookManagement');
	LX = Core.lang.LX;
	log = Core.log.getLogger('BookManagement');
	
	numCur = 0;
	
	// Treat Periodicals as Books
	var oldBooksFilter = kbook.root.children.deviceRoot.children.books.filter;
	kbook.root.children.deviceRoot.children.books.filter = function (result) {
		if (opt.PeriodicalsAsBooks === 'true') {
			return result;
		} else {
			return oldBooksFilter.apply(this, arguments);
		}
	}
	
	var oldIsPeriodical = FskCache.text.isPeriodical;
	FskCache.text.isPeriodical = function () {
		if (opt.PeriodicalsAsBooks === 'true') {
			return false;
		} else {
			return oldIsPeriodical.apply(this, arguments);
		}
	}
	
	var oldIsNewspaper = FskCache.text.isNewspaper;
	FskCache.text.isNewspaper = function () {
		if (opt.PeriodicalsAsBooks === 'true') {
			return false;
		} else {
			return oldIsNewspaper.apply(this, arguments);
		}
	}
	
	var oldOnEnterShortCutBook = kbook.model.onEnterShortCutBook;
	kbook.model.onEnterShortCutBook = function (node) {
		if (opt.PeriodicalsAsBooks === 'true' && node.periodicalName) {
			this.currentNode.gotoNode(node, this);
		} else {
			oldOnEnterShortCutBook.apply(this, arguments);
		}
	};
	
	// Keep new flag as is on opening book
	var oldOnChangeBook = kbook.model.onChangeBook;
	kbook.model.onChangeBook = function (node) {
		var newflag = node.opened;
		if (this.currentBook) {
			opt.CurrentCollection = '';
		}
		oldOnChangeBook.apply(this, arguments);
		if (opt.ManualNewFlag === 'true') {
			node.opened = newflag;
		}
		if (kbook.model.STATE !== 'MENU_HOME') {
			bookChanged = true; // exception for current book on startup
		}
		numCur = 0;
	}
	
	// Book menu option to switch new flag, called from main.xml
	kbook.model.container.sandbox.OPTION_OVERLAY_PAGE.sandbox.NewFlagToggle = function () {
		var book = kbook.model.currentBook;
		this.doOption();
		book.opened = (book.opened) ? false : true;
	}
	
	// Show book menu option if preference is set
	kbook.optMenu.isDisable = function (part) {
		if (this.hasString(part, 'manualnewflag')) {
			if (opt.ManualNewFlag === 'false') {
				return true;
			}
			part.text = (kbook.model.currentBook.opened) ? L('SETNEWFLAG') : L('REMOVENEWFLAG');
		}
		return Fskin.overlayTool.isDisable(part);
	}

	// Hide default collections
	var oldKbookPlaylistNode = kbook.root.kbookPlaylistNode.construct;
	kbook.root.kbookPlaylistNode.construct = function () {
		oldKbookPlaylistNode.apply(this, arguments);
		if (opt.HideAddNewCollection === 'true') {
			this.nodes.splice(this.purchasedNodeIndex + 1, 1);
			this.constNodesCount--;
		}
		if (opt.HidePurchasedBooks === 'true') {
			this.nodes.splice(this.purchasedNodeIndex, 1);
			this.constNodesCount--;
			this.presetItemsCount--;
		}
		if (opt.HideUnreadPeriodicals === 'true') {
			this.nodes.splice(this.purchasedNodeIndex - 1, 1);
			this.constNodesCount--;
			this.presetItemsCount--;
		}
		if (opt.HideUnreadBooks === 'true') {
			this.nodes.splice(this.purchasedNodeIndex - 2, 1);
			this.constNodesCount--;
			this.presetItemsCount--;
		}
		createSubCollections(this.nodes, this, this.constNodesCount);
	}

	createSubCollections = function (nodes, parent, next) {
		var i, node, last, idx, coll, title;
		i = next;
		c = nodes.length;
		while (i < c) {
			title = nodes[i].title;
			idx = title.indexOf('|');
			if (idx !== -1) {
				nodes[i].name = nodes[i].title = title.slice(idx + 1);
				coll = title.slice(0, idx);
				if (last === coll) {
					nodes[i].parent = nodes[next-1];
					nodes[next-1].nodes.push(nodes.splice(i,1)[0]);
					i--; c--;
				} else {
					node = Core.ui.createContainerNode({
						title: coll,
						comment: function () {
							return Core.lang.LX('COLLECTIONS', this.nodes.length);
						},
						parent: parent,
						icon: 'BOOKS'
					});
					nodes[i].parent = node;
					node.sublistMark = true;
					node.nodes.push(nodes.splice(i,1)[0]);
					nodes.splice(next, 0, node);
					last = coll;
					next++;
				}
			}
			i++;
		}
		if (last) nodes[next-1].separator = 1;
	}
	
	// Draw reading progress instead of 'last read' date/time
	kbook.model.getContinueDate = function (node) {
		var current, page, pages;
		current = this.currentBook;
		if (current && opt.ShowReadingProgressCurrent === 'true') {
			page = current.media.ext.currentPosition.page + 1;
			if (page < Number(opt.OnlyShowFromPage)) {
				return node.nodes[0].lastReadDate;
			}
			pages = current.media.ext.history[0].pages;
			return readingProgressComment(page, pages, opt.ProgressFormatCurrent);
		} else {
			return node.nodes[0].lastReadDate;
		}
	}
	
	// Draw reading progress below thumbnails
	var oldDrawRecord = Fskin.kbookViewStyleThumbnail.drawRecord;
	Fskin.kbookViewStyleThumbnail.drawRecord = function (offset, x, y, width, height, tabIndex, parts) {
		var win, home, record, page, pages, msg, nodes, comX, comY, comWidth, comHeight;
		win = this.getWindow();
		comHeight = this.textCommentHeight;
		
		oldDrawRecord.apply(this, arguments);
		
		if (xs.isInstanceOf(kbook.model.currentNode, kbook.root.children.deviceRoot)) {
			// Display current booklist option text
			home = true;
			if (offset === 2) {
				if (opt.BookList === 5) {
					msg = opt.SelectedCollection;
				} else if (opt.BookList === 3 && opt.CurrentCollection) {
					msg = L('NEXT_IN') + ' ' + opt.CurrentCollection;
				} else {
					msg = BookManagement_x50.optionDefs[0].optionDefs[0].valueTitles[opt.BookList];
				}
				// Replace | with : for sub-collections
				msg = msg.replace('|',': ');
				// Add position in current booklist
				nodes = kbook.root.getBookThumbnailsNode().nodes;
				if (nodes.length > 1) {
					msg += ' (' + (numCur + 1) + '-' + (numCur + nodes.length) + ')';
				} else if (nodes.length === 1) {
					msg += ' (' + (numCur + 1) + ')';
				}
				this.skin.styles[6].draw(win, msg, 0, y-25, this.width, comHeight);
			}
		}
		
		switch (opt.ShowReadingProgressThumbs) {
			case 'false':
				return;
			case 'home':
				if (!home) return;
			case 'all':
				record = this.menu.getRecord(offset);
				if (!record || record.kind !== 2 || !record.media.ext || !record.media.ext.history.length) { // check if book with history
					return;
				} else if (this.statusVisible && (record.media.sourceid > 1 || this.menu.getFixSelectPosition() || record.expiration)) { // check for something else showing
					return;
				}
				page = record.media.ext.currentPosition.page + 1;
				if (page < Number(opt.OnlyShowFromPage)) {
					return;
				}
				pages = record.media.ext.history[0].pages;
				msg = readingProgressComment(page, pages, opt.ProgressFormatThumbs);
				comX = x + this.marginWidth;
				comY = this.getNy(this.getTy(y), Math.min(this.getTh(height), this.thumbnailHeight)) + this.textNameHeight + this.marginNameAndComment + 23;
				comWidth = this.getCw(width, Fskin.scratchRectangle.width);
				parts.commentStyle.draw(win, msg, comX, comY, comWidth, comHeight);
		}
	};
	
	// Format reading progress comment
	readingProgressComment = function (page, pages, format) {
		switch (format) {
			case '1':
				return L('PAGE') + ' ' + page + ' ' + L('OF') + ' ' + pages;
			case '2':
				return L('PAGE') + ' ' + page + ' ' + L('OF') + ' ' + pages + ' (' + Math.floor((page/pages)*100) + '%)';
			case '3':
				return page + ' ' + L('OF') + ' ' + pages;
			case '4':
				return page + ' ' + L('OF') + ' ' + pages + ' (' + Math.floor((page/pages)*100) + '%)';
			case '5':
				return Math.floor((page/pages)*100) + '%';
			case '6':
				return page + ' / ' + pages;
			case '7':
				return page + ' / ' + pages + ' (' + Math.floor((page/pages)*100) + '%)';
			case '8':
				return L('PAGE') + ' ' + page + ' / ' + pages + ' (' + Math.floor((page/pages)*100) + '%)';
		}
	}

	// Update deviceroot on enter
	var oldOnEnterDeviceRoot = kbook.model.onEnterDeviceRoot;
	kbook.model.onEnterDeviceRoot = function () {
		oldOnEnterDeviceRoot.apply(this, arguments);
		if (bookChanged) {
			// Don't update if opt = 0 and no trigger has been used
			if (opt.BookList || trigger1 || trigger2 || trigger3 || trigger4) {
				kbook.root.getBookThumbnailsNode().update(kbook.model);
			}
			bookChanged = false;
		}
	}
	
	// Update booklist after collection edit
	var oldFinishCollectionEdit = kbook.model.finishCollectionEdit;
	kbook.model.finishCollectionEdit = function () {
		var i, change, current;
		if (this.colManTgtNode && (opt.BookList === 3 || opt.BookList === 5)) {
			if (opt.CurrentCollection) {
				current = opt.CurrentCollection;
			} else {
				current = opt.SelectedCollection;
			}
			if (this.colManTgtNode.kind === 42 && this.colManTgtNode.title === current) {
				change = true;
			} else if (this.colManTgtNode.kind === 17) {
				for (i = 0; i < this.colManItems.length && this.colManItems[i].title !== current; i++);
				if (i !== this.colManItems.length) {
					change = true;
				}
			}
			if (change) {
				bookChanged = true;
				opt.CurrentCollection = '';
				numCur = 0;
			}
		}
		oldFinishCollectionEdit.apply(this, arguments);
	}
	
	updateBookList = function () {
		if (xs.isInstanceOf(kbook.model.currentNode, kbook.root.children.deviceRoot)) {
			kbook.root.getBookThumbnailsNode().update(kbook.model);
			kbook.menuHomeThumbnailBookData.setNode(kbook.root.getBookThumbnailsNode());
		} else {
			bookChanged = true;
		}
	}
	
	// Filter notepads & periodicals for home menu booklist
	filterBooklist = function (result) {
		var c, i, book;
		c = result.count();
		if (opt.PeriodicalsAsBooks === 'true') {
			for (i = 0; i < c; i++) {
				book = result.getRecord(i);
				if (book.path.slice(0,9) === 'Notepads/') {
					result.removeID(book.id);
					c--;
					i--;
				}
			}
		} else {
			for (i = 0; i < c; i++) {
				book = result.getRecord(i);
				if (book.periodicalName || book.path.slice(0,9) === 'Notepads/') {
					result.removeID(book.id);
					c--;
					i--;
				}
			}
		}
		return result;
	}
	
	// Customize book list in home menu
	kbook.root.children.deviceRoot.children.bookThumbnails.construct = function () {
		var model, proto, nodes, cache, db, db2, current, c, node,
			i, j, hist, book, books, id, author, list, coll, colls;
		FskCache.tree.xdbNode.construct.call(this);
		cache = this.cache;
		if (!cache) {
			return;
		}
		model = kbook.model;
		proto = this.prototype;
		nodes = this.nodes = [];
		if (opt.IgnoreCards === 'true') {
			db = cache.getSourceByName('mediaPath').textMasters;
		} else {
			db = cache.textMasters;
		}
		db = filterBooklist(db);
		c = db.count();
		if (!c) {
			return;
		}
		if (model.currentBook) {
			current = model.currentBook.media;
		} else if (model.currentPath) {
			db2 = db.db.search('indexPath',model.currentPath);
			if (db2.count()) {
				current = db2.getRecord(0);
			}
		}
		while (1) {
			switch (opt.BookList) {
				case 0: // Last added books
					db.sort_c({
						by: 'indexDate',
						order: xdb.descending
					});
					if (numCur && numCur >= c) {
						numCur -= 3;
					}
					for (i = numCur; nodes.length < 3 && i < c; i++) {
						node = nodes[nodes.length] = xs.newInstanceOf(proto);
						node.cache = cache;
						node.media = db.getRecord(i);
					}
					break;
				case 1: // Last opened books
					hist = Core.addonByName.BookHistory.getBookList();
					j = (current) ? 1 : 0;
					if (numCur && numCur + j >= hist.length) {
						numCur -= 3;
					}
					for (i = numCur + j; nodes.length < 3 && i < hist.length; i++) {
						book = Core.media.findMedia(hist[i]);
						if (book) {
							if (book.periodicalName && opt.PeriodicalsAsBooks === 'false') {
								continue; // FIXME numCur -=3 goes wrong here
							}
							node = nodes[nodes.length] = xs.newInstanceOf(proto);
							node.cache = cache;
							node.media = book;
						}
					}
					break;
				case 2: // Books by same author
					if (!current) {
						break;
					}
					id = current.id;
					author = current.author;
					if (!author) {
						break;
					}
					list = [];
					// Find other books by same author, excluding current book
					for (i = 0; i < c; i++) {
						book = db.getRecord(i);
						if (book.author === author && book.id !== id) list.push(i);
					}
					if (numCur && numCur >= list.length) numCur -= 3;
					for (i = numCur; nodes.length < 3 && i < list.length; i++) {
						node = nodes[nodes.length] = xs.newInstanceOf(proto);
						node.cache = cache;
						node.media = db.getRecord(list[i]);
					}
					break;
				case 3: // Next books in collection
						// FIXME cycle backwards doesn't work
					if (!current) {
						break;
					}
					id = current.id;
					i = 0;
					// Switch to collections cache
					db2 = cache.playlistMasters;
					db2.sort('indexPlaylist');
					colls = db2.count();
					if (opt.CurrentCollection) {
						for (i = 0; i < colls && db2.getRecord(i).title !== opt.CurrentCollection; i++);
						if (i === colls) {
							// CC not found, so start from beginning
							i=0;
						} else if (trigger1) {
							// CC found, but trigger used, so start from next
							i++;
						}
					}
					while (i < colls) {
						coll = db2.getRecord(i);
						books = coll.count();
						j = coll.getItemIndex(id) + 1;
						if (j && j < books) {
							// Current book found in collection where it's not the last book
							if (numCur && numCur + j >= books) {
								numCur -= 3;
							}
							for (j += numCur; nodes.length < 3 && j < books; j++) {
								node = nodes[nodes.length] = xs.newInstanceOf(proto);
								node.cache = cache;
								node.media = cache.getRecord(coll.items[j].id);
							}
							break;
						}
						i++;
					}
					opt.CurrentCollection = (nodes.length) ? coll.title : '';
					break;
				case 4: // Random books
					books = '/';
					if (current) {
						books += current.id + '/';
					}
					while (nodes.length < 3 && books.length < c) {
						i = Math.floor(Math.random() * c);
						book = db.getRecord(i);
						if (books.indexOf('/' + book.id + '/') === -1) {
							// Random book is not current book and not already placed, so add to list
							node = nodes[nodes.length] = xs.newInstanceOf(proto);
							node.cache = cache;
							node.media = book;
							books += book.id + '/';
						}
					}
					break;
				case 5: // Select collection
					if (!opt.SelectedCollection) {
						break;
					}
					books = [];
					if (current) {
						id = current.id;
					}
					db2 = cache.playlistMasters;
					db2.sort('indexPlaylist');
					colls = db2.count();
					for (i = 0; i < colls && db2.getRecord(i).title !== opt.SelectedCollection; i++);
					if (i === colls) {
						break;
					}
					// Selected Collection found
					coll = db2.getRecord(i);
					for (i = 0; i < coll.items.length; i++) {
						if (coll.items[i].id !== id) {
							books.push(coll.items[i].id);
						}
					}
					if (numCur && numCur >= books.length) {
						numCur -= 3;
					}
					for (i = numCur; nodes.length < 3 && i < books.length; i++) {
						node = nodes[nodes.length] = xs.newInstanceOf(proto);
						node.cache = cache;
						node.media = cache.getRecord(books[i]);
					}
					break;
			}
			if (!nodes.length) {
				if (trigger1) {
					if (opt.BookList === 5) {
						opt.BookList = 0;
					} else {
						opt.BookList++;
					}
					continue;
				} else if (trigger2) {
					if (opt.BookList === 0) {
						opt.BookList = 5;
					} else {
						opt.BookList--;
					}
					continue;
				}
			}
			trigger1 = trigger2 = trigger3 = trigger4 = false;
			break;
		}
	};
	
	// Functions for booklist option 'Select Collection'
	doSelectCollection = function () {
		oldNode = kbook.model.currentNode;
		oldNode.redirect = true;
		tempNode = Core.ui.createContainerNode({
			title: L('SELECT_COLLECTION'),
			parent: oldNode,
			construct: selectCollectionConstruct,
			destruct: selectCollectionDestruct
		});
		oldNode.gotoNode(tempNode, kbook.model);
	}
	
	selectCollectionConstruct = function () {
		var i, nodes, db, c;
		nodes = this.nodes = [];
		db = kbook.model.cache.playlistMasters;
		db.sort('indexPlaylist');
		c = db.count();
		for (i = 0; i < c; i++) {
			nodes[i] = Core.ui.createContainerNode({
				title: db.getRecord(i).title,
				comment: LX('BOOKS', db.getRecord(i).count()),
				icon: 'BOOKS'
			});
			nodes[i].onEnter = 'collectionSelected';
			nodes[i].collName = db.getRecord(i).title;
		}
		if (nodes.length) {
			createSubCollections(nodes, this, 0);
		}
	}
	
	selectCollectionDestruct = function () {
		tempNode = null;
		oldNode.redirect = null;
	}
	
	kbook.model.collectionSelected = function (node) {
		opt.BookList = 5;
		opt.SelectedCollection = node.collName;
		Core.settings.saveOptions(BookManagement_x50);
		updateBookList();
		if (oldNode.title === L('BOOK_SELECTION')) {
			this.currentNode.gotoNode(oldNode.parent, this);
		} else {
			this.currentNode.gotoNode(oldNode, this);
		}
	}
		
	var BookManagement_x50 = {
		name: 'BookManagement_x50',
		title: L('TITLE'),
		icon: 'BOOKS',
		onInit: function () {
			opt = this.options;
			// Workaround for numerical settings being saved as strings
			opt.BookList = parseInt(opt.BookList);
		},
		actions: [{
			name: 'BookListCycleForward',
			title: L('BOOKLIST_CYCLE_FORWARD'),
			group: 'Other',
			icon: 'BOOKS',
			action: function () {
				trigger1 = true;
				numCur = 0;
				if (opt.BookList === 5) {
					opt.BookList = 0;
				} else if (opt.BookList !== 3) {
					opt.BookList++;
					opt.CurrentCollection = '';
				}
				updateBookList();
				Core.settings.saveOptions(BookManagement_x50);
			}
		},
		{
			name: 'BookListCycleBackward',
			title: L('BOOKLIST_CYCLE_BACKWARD'),
			group: 'Other',
			icon: 'BOOKS',
			action: function () {
				trigger2 = true;
				numCur = 0;
				if (opt.BookList === 0) {
					opt.BookList = 5;
				} else {
					opt.BookList--;
				}
				opt.CurrentCollection = '';
				updateBookList();
				Core.settings.saveOptions(BookManagement_x50);
			}
		},
		{
			name: 'BookListNextBooks',
			title: L('BOOKLIST_NEXT_BOOKS'),
			group: 'Other',
			icon: 'NEXT',
			action: function () {
				if (bookChanged) {
					kbook.model.doBlink();
				} else {
					numCur += 3;
					trigger3 = true;
					updateBookList();
				}
			}
		},
		{
			name: 'BookListPreviousBooks',
			title: L('BOOKLIST_PREVIOUS_BOOKS'),
			group: 'Other',
			icon: 'NEXT',
			action: function () {
				if (numCur < 3 || bookChanged) {
					kbook.model.doBlink();
				} else {
					numCur -= 3;
					trigger4 = true;
					updateBookList();
				}
			}
		},
		{
			name: 'BookListSelectCollection',
			title: L('BOOKLIST_SELECT_COLLECTION'),
			group: 'Other',
			icon: 'BOOKS',
			action: function () {
				doSelectCollection();
			}
		}],
		optionDefs: [
			{
			groupTitle: L('CUSTOMIZE_HOME_MENU_BOOKLIST'),
			groupIcon: 'BOOKS',
			optionDefs: [
			{
				name: 'BookList',
				title: L('BOOK_SELECTION'),
				icon: 'BOOKS',
				defaultValue: '0',
				values: ['0', '1', '2', '3', '4', '5'],
				valueTitles: {
					'0': L('LAST_ADDED_BOOKS'),
					'1': L('LAST_OPENED_BOOKS'),
					'2': L('BOOKS_BY_SAME_AUTHOR'),
					'3': L('NEXT_BOOKS_IN_COLLECTION'),
					'4': L('RANDOM_BOOKS'),
					'5': L('SELECT_COLLECTION') + '...'
				}
			},
			{
				name: 'IgnoreCards',
				title: L('IGNORE_MEMORY_CARDS'),
				icon: 'DB',
				defaultValue: 'false',
				values: ['true','false'],
				valueTitles: {
					'true': L('VALUE_TRUE'),
					'false': L('VALUE_FALSE')
				}
			},
			]},
			{
			groupTitle: L('SHOW_READING_PROGRESS'),
			groupIcon: 'BOOKMARK',
			optionDefs: [
				{
				name: 'ShowReadingProgressCurrent',
				title: L('SHOW_READING_PROGRESS_CURRENT'),
				icon: 'BOOKMARK',
				defaultValue: 'false',
				values: ['true','false'],
				valueTitles: {
					'true': L('VALUE_TRUE'),
					'false': L('VALUE_FALSE')
				}
				},
				{
				name: 'ProgressFormatCurrent',
				title: L('PROGRESS_FORMAT_CURRENT'),
				icon: 'SETTINGS',
				defaultValue: '2',
				values: ['1', '2', '3', '4', '5', '6', '7', '8'],
				valueTitles: {
					'1': L('PAGE') + ' 5 ' + L('OF') + ' 100',
					'2': L('PAGE') + ' 5 ' + L('OF') + ' 100 (5%)',
					'3': '5 ' + L('OF') + ' 100',
					'4': '5 ' + L('OF') + ' 100 (5%)',
					'5': '5%',
					'6': '5 / 100',
					'7': '5 / 100 (5%)',
					'8': L('PAGE') + ' 5 / 100 (5%)'
				}
				},
				{
				name: 'ShowReadingProgressThumbs',
				title: L('SHOW_READING_PROGRESS_THUMBS'),
				icon: 'BOOKMARK',
				defaultValue: 'false',
				values: ['all', 'home', 'false'],
				valueTitles: {
					'all': L('ALL_THUMBNAIL_VIEWS'),
					'home': L('HOME_MENU_ONLY'),
					'false': L('VALUE_FALSE')
				}
				},
				{
				name: 'ProgressFormatThumbs',
				title: L('PROGRESS_FORMAT_THUMBS'),
				icon: 'SETTINGS',
				defaultValue: '3',
				values: ['1', '2', '3', '4', '5', '6', '7', '8'],
				valueTitles: {
					'1': L('PAGE') + ' 5 ' + L('OF') + ' 100',
					'2': L('PAGE') + ' 5 ' + L('OF') + ' 100 (5%)',
					'3': '5 ' + L('OF') + ' 100',
					'4': '5 ' + L('OF') + ' 100 (5%)',
					'5': '5%',
					'6': '5 / 100',
					'7': '5 / 100 (5%)',
					'8': L('PAGE') + ' 5 / 100 (5%)'
				}
				},
				{
				name: 'OnlyShowFromPage',
				title: L('ONLY_SHOW_FROM_PAGE'),
				icon: 'SETTINGS',
				defaultValue: '2',
				values: ['1', '2', '3', '4', '5', '10', '15', '20', '25', '50'],
				},
			]},
			{
			groupTitle: L('HIDE_DEFAULT_COLLECTIONS'),
			groupIcon: 'BOOKS',
			optionDefs: [
				{
					name: 'HideUnreadBooks',
					title: L('HIDE_UNREAD_BOOKS'),
					icon: 'BOOKS',
					defaultValue: 'false',
					values: ['true','false'],
					valueTitles: {
						'true': L('VALUE_TRUE'),
						'false': L('VALUE_FALSE')
					}
				},
				{
					name: 'HideUnreadPeriodicals',
					title: L('HIDE_UNREAD_PERIODICALS'),
					icon: 'BOOKS',
					defaultValue: 'false',
					values: ['true','false'],
					valueTitles: {
						'true': L('VALUE_TRUE'),
						'false': L('VALUE_FALSE')
					}
				},
				{
					name: 'HidePurchasedBooks',
					title: L('HIDE_PURCHASED_BOOKS'),
					icon: 'BOOKS',
					defaultValue: 'false',
					values: ['true','false'],
					valueTitles: {
						'true': L('VALUE_TRUE'),
						'false': L('VALUE_FALSE')
					}
				},
				{
					name: 'HideAddNewCollection',
					title: L('HIDE_ADD_NEW_COLLECTION'),
					icon: 'BOOKS',
					defaultValue: 'false',
					values: ['true','false'],
					valueTitles: {
						'true': L('VALUE_TRUE'),
						'false': L('VALUE_FALSE')
					}
				},
			]},
			{
				name: 'PeriodicalsAsBooks',
				title: L('TREAT_PERIODICALS_AS_BOOKS'),
				icon: 'PERIODICALS',
				defaultValue: 'false',
				values: ['true', 'false'],
				valueTitles: {
					'true': L('VALUE_TRUE'),
					'false': L('VALUE_FALSE')
				}	
			},
			{
				name: 'ManualNewFlag',
				title: L('SET_NEW_FLAG_MANUALLY'),
				icon: 'NEW',
				defaultValue: 'false',
				values: ['true', 'false'],
				valueTitles: {
					'true': L('VALUE_TRUE'),
					'false': L('VALUE_FALSE')
				}	
			},
			{
				name: 'CurrentCollection',
				defaultValue: '',
				hidden: 'true',
			},
			{
				name: 'SelectedCollection',
				defaultValue: '',
				hidden: 'true',
			},
		],
		onSettingsChanged: function (propertyName, oldValue, newValue, object) {
			numCur = 0;
			switch (propertyName) {
				case 'BookList':
					opt.BookList = parseInt(newValue);
					if (newValue === 5) doSelectCollection();
				case 'IgnoreCards':
					opt.CurrentCollection = '';
				case 'PeriodicalsAsBooks':
					updateBookList();
			}
		}
	};

	Core.addAddon(BookManagement_x50);
};
try {
	tmp();
} catch (e) {
	// Core's log
	log.error('in BookManagement.js', e);
}
