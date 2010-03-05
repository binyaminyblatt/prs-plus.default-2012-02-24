// Name: PageIndex
// Description: Shows the book index in different formats
// Author: Duglum, VICTORGSJG, kartu
//
// History:
//	2010-03-01 kartu - Fixed NaN problem in epubs
//	2010-03-01 kartu - #Refactored code to use L localize function
//	2010-03-01 kartu - Added VICTORGSJG's "menu index" feature

var log = Utils.getLogger("Index");

var str = {
	TITLE: "Page Index",
	INDEX_STYLE_BOOK: "Index style in books",
	INDEX_MODE_BOOK: "Index mode in books",
	INDEX_MODE_MENU: "Index mode in menu",
	INDEX_STYLE_MENU: "Index style in menu",
	OF: "of",
	ALWAYS_SHOWN: "Always shown",
	NEVER_SHOWN: "Never shown",
	Not_SHOWN_IF_SINGLE_PAGE: "Not shown on single pages"
};

// Localize
var L = function (key) {
	if (str.hasOwnProperty(key)) {
		return str[key];
	} else {
		return "PageIndex." + key;
	}
};

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
			values: ["XofY", "XofYper", "XdivY", "XdivYper"],
			valueTitles: {
				XofY: "5 " + L("OF") + " 100",
				XofYper: "5 " + L("OF") + " 100 (5%)",
				XdivY: "5 / 100",
				XdivYper: "5 / 100 (5%)"
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
			name:	"menuMode",
			title: L("INDEX_MODE_MENU"),
			icon:	"LIST",
			defaultValue: "always",
			values: ["always", "not_if_only_one_page", "never"],
			valueTitles: {
				always: L("ALWAYS_SHOWN"),
				not_if_only_one_page: L("Not_SHOWN_IF_SINGLE_PAGE"),
				never: L("NEVER_SHOWN")
			}
		}
	]
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

		var show = "";
		var per;

		switch(Index.options.style) {
			case "XofY":
				show = ii + " " + L("OF") + " " + c;
				break;
			case "XofYper":
				// get percentage
				per = ((i / c) * 100);
				show = ii + " " + L("OF") + " " + c + " (" + per.toFixed(0) + "%) ";
				break;
			case "XdivY":
				show = ii + " / " + c;
				break;
			case "XdivYper":
				// get percentage
				per = ((i / c) * 100);
				show = ii + " / " + c + " (" + per.toFixed(0) + "%) ";
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
	Utils.hookAfter(kbook.model.container.PAGE_GROUP.PAGE, "pageChanged", updateIndexBook, "book");
	Utils.hookAfter(kbook.model.container.MENU_GROUP.MENU, "pageChanged", updateIndexMenu, "menu");
};

return Index;