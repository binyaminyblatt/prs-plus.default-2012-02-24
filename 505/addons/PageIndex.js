// Name: PageIndex
// Description: Shows the book index in different formats
// Author: Duglum, VICTORGSJG, kartu
//
// History:
//	2010-03-01 kartu - Fixed NaN problem in epubs
//	2010-03-01 kartu - Refactored code to use L localize function
//	2010-03-01 kartu - Added VICTORGSJG's "menu index" feature
//	2010-03-06 kartu - Renamed Not_SHOWN_IF_SINGLE_PAGE to NOT_SHOWN_IF_SINGLE_PAGE
//	2010-03-14 kartu - Refactored Utils -> Core
//	2010-03-14 kartu - Localized
//	2010-04-22 kartu - Fixed minor bug: "1 of 1" menu was visible even when menu mode was "not shown on single pages"
//	2010-04-24 kartu - Prepared for merging into single JS
//	2010-05-05 kartu - Added ppm, time to left, "pages remaning"
//	2010-05-11 kartu - Fixed NaN bug in ppm
//	2010-05-11 kartu - Fixed time left bug (time to read entire book was shown instead of remaining). Noticed by Duglum.

tmp = function() {
	var log = Core.log.getLogger("Index");
	var L = Core.lang.getLocalizer("PageIndex");
	
	var Index = {
		name: "PageIndex",
		title: L("TITLE"),
		icon: "LIST",
		optionDefs: [
			{
				name: "style",
				title: L("INDEX_STYLE_BOOK"),
				icon: "LIST",
				defaultValue: "XofY",
				values: ["XofY", "XofYper", "XdivY", "XdivYper", "XremYper", "XremYperRem", "XdivYstats0", "XdivYstats1", "XdivYstats2"],
				valueTitles: {
					XofY: "5 " + L("OF") + " 100",
					XofYper: "5 " + L("OF") + " 100 (5%)",
					XdivY: "5 / 100",
					XdivYper: "5 / 100 (5%)",
					XremYper: "5 + 95 (5%)",
					XremYperRem: "5 + 95 (95%)",
					XdivYstats0: L("VALUE_STATS0"),
					XdivYstats1: L("VALUE_STATS1"), 
					XdivYstats2: L("VALUE_STATS2") 
				}
			},
			{
				name:	"mode",
				title:	 L("INDEX_MODE_BOOK"),
				icon:	"LIST",
				defaultValue: "always",
				values: ["always", "never"],
				valueTitles: {
					always: L("ALWAYS_SHOWN"),
					never: L("NEVER_SHOWN")
				}
			},
			{
				name: "menuStyle",
				title: L("INDEX_STYLE_MENU"),
				icon: "LIST",
				defaultValue: "MenuXofY",
				values: ["MenuXofY", "MenuXdivY"],
				valueTitles: {
					MenuXofY: "5 " + L("OF") + " 100",
					MenuXdivY: "5 / 100"
				}
			},
			{
				name: "menuMode",
				title: L("INDEX_MODE_MENU"),
				icon:	"LIST",
				defaultValue: "always",
				values: ["always", "not_if_only_one_page", "never"],
				valueTitles: {
					always: L("ALWAYS_SHOWN"),
					not_if_only_one_page: L("NOT_SHOWN_IF_SINGLE_PAGE"),
					never: L("NEVER_SHOWN")
				}
			}
		]
	};
	
	var lastTime;
	var lastPage;
	var ppmHistory;
	var ppmIdx;
	var MAX_PPM_HISTORY = 5;
	// Maximum delay between pages, to consider it the same session, in milliseconds
	var MAX_DELAY = 30 * 60 * 1000; 
	var NA = "*";
	
	var resetCounter = function () {
		lastTime = undefined;
	};
	
	// Calculates ppm based on page changes history. 
	// Takes into account MAX_PPM_HISTORY pages.
	// Resets the counter if there was a delay longar than MAX_DELAY milliseconds
	//
	var getPpm = function (currentPage) {
		try {
			var i;
			if (lastTime === undefined) {
				lastTime = (new Date()).getTime();
				lastPage = currentPage;
				ppmIdx = 0;
				ppmHistory = new Array(MAX_PPM_HISTORY);
				for (i = 0; i < MAX_PPM_HISTORY; i++) {
					ppmHistory[i] = 0;
				}
				return NA;
			}
			
			// It took tooo long, resetting the counter
			var currentTime = (new Date()).getTime();
			if (currentTime - lastTime > MAX_DELAY) {
				resetCounter();
				return;
			}
			
			if (currentPage !== lastPage) {
				if (ppmIdx >= MAX_PPM_HISTORY) {
					ppmIdx = 0;
				}
				ppmHistory[ppmIdx] = Math.abs(currentPage - lastPage) * 1000 * 60 / (currentTime - lastTime);
				ppmIdx++;
				lastTime = currentTime;
				lastPage = currentPage;
			}
			
			var result = 0;
			var n = 0;
			for (i = 0; i < MAX_PPM_HISTORY; i++) {
				if (ppmHistory[i] !== 0) {
					n++;
					result = result + ppmHistory[i]; 
				}
			}
			result = Math.round(result / n * 10) / 10; 
			return (isNaN(result) || result === undefined) ? NA : result;
		} catch (e) {
			log.error("ppmIdx = " + ppmIdx + " ppmHistory =  " + ppmHistory + " in getPpm: ", e); 
		}
		return NA;
	};
	
	// Returns time left to finish the book
	//
	var getTimeLeft = function (ppm, pages) {
		if (ppm === NA) {
			return NA;
		}
		var t = pages / ppm;
		var hours = Math.floor(t / 60);
		var minutes = Math.round(t % 60);
		if (hours > 0) {
			if (minutes < 10) {
				minutes = "0" + minutes;
			}
			return hours + ":" + minutes;
		} else {
			return minutes;
		}
	};
	
	var updateIndexBook = function (args, oldFunc, tag) {
		try {
			switch (Index.options.mode) {
				case "always":
					break;
				case "never":
					this.setVariable("BOOK_INDEX_COUNT", "");
					return;
			}
	
			// get pages
			this.setVariable("BOOK_SIZE", this.getScale());
			this.setVariable("BOOK_HALF_PAGE", this.getHalfPage());
			var c = this.countPages();
			var ii = this.componentPages();
			var i = this.getPage() + 1;
			if (!c) {
				c++;
			}
			var per = Math.floor((i / c) * 100);
		
			var show = "";
			var timeLeft;
	
			switch(Index.options.style) {
				case "XofY":
					show = ii + " " + L("OF") + " " + c;
					break;
				case "XofYper":
					// get percentage
					show = ii + " " + L("OF") + " " + c + " (" + per + "%) ";
					break;
				case "XdivY":
					show = ii + " / " + c;
					break;
				case "XdivYper":
					// get percentage
					show = ii + " / " + c + " (" + per + "%) ";
					break;
				case "XremYper":
					show = ii + " + " + (c - i) + " (" + per + "%) ";
					break;
				case "XremYperRem":
					show = ii + " + " + (c - i) + " (" + (100 - per) + "%) ";
					break;
				case "XdivYstats0":
					show = ii + " / " + c +  " (" + getPpm(i) + ")";
					break;
				case "XdivYstats1":
					timeLeft = getTimeLeft(getPpm(i), c - i);
					show = ii + " / " + c +  " (" + timeLeft + ")";
					break;
				case "XdivYstats2":
					var ppm = getPpm(i);
					timeLeft = getTimeLeft(ppm, c - i);
					show = ii + " / " + c +  " (" + ppm + " / " + timeLeft + ")";
					break;
				default:
					show = ii + " " + L("OF") + " " + c;
					break;
			}
	
			this.setVariable("BOOK_INDEX_COUNT", show);
		} catch (e) {
			log.error("in updateIndexBook: " + e);
		}
	};
	
	var updateIndexMenu = function (args, oldFunc, tag) {
		try {
			// get pages
			var c = this.countPages();
			var i = this.getPage() + 1;
			if (!c) {
				c++;
			}
			var show = "";
	
			switch (Index.options.menuMode) {
				case "always":
					break;
				case "not_if_only_one_page":
					if (c > 1) {
						break;
					} else {
						this.setVariable("MENU_INDEX_COUNT", "");
						return;
					}
					break;
				case "never":
					this.setVariable("MENU_INDEX_COUNT", "");
					return;
			}
	
			switch(Index.options.menuStyle) {
				case "MenuXofY":
					show = i + " " + L("OF") + " " + c;
					break;
				case "MenuXdivY":
					show = i + " / " + c;
					break;
				default:
					show = i + " " + L("OF") + " " + c;
					break;
			}
	
			this.setVariable("MENU_INDEX_COUNT", show);
		} catch (e) {
			log.error("in updateIndexMenu: " + e);
		}
	};
	
	Index.onInit = function () {
		Core.hook.hookAfter(kbook.model.container.PAGE_GROUP.PAGE, "pageChanged", updateIndexBook, "book");
		Core.hook.hookAfter(kbook.model.container.MENU_GROUP.MENU, "pageChanged", updateIndexMenu, "menu");
		kbook.model.container.MENU_GROUP.MENU.pageChanged();
	};
	
	Core.addAddon(Index);
};
try {
	tmp();
} catch (e) {
	// Core's log
	log.error("in PageIndex.js", e);
}