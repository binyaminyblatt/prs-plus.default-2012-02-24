// Name: PageIndex
// Description: Shows the book index in different formats
// Author: Duglum
//

var log = Utils.getLogger("Index");

var updateIndex; 
var Index = {
	name: "PageIndex",
	title: "Page Index",
	icon: "LIST",
	optionDefs: [
		{
			name: "style",
			title: "Index Style",
			icon: "LIST",
			defaultValue: "XofY",
			values: ["XofY", "XofYper", "XdivY", "XdivYper"],
			valueTitles: {
				XofY: "5 of 100",
				XofYper: "5 of 100 (5%)",
				XdivY: "5 / 100",
				XdivYper: "5 / 100 (5%)"
			}
		},
		{
			name:	"mode",
			title:	"Index Mode",
			icon:	"LIST",
			defaultValue: "always",
			values: ["always", "never"],
			valueTitles: {
				always: "Always shown", 
				never: "Never shown"
			}
		}
		
	]
};

updateIndex = function(args, oldFunc, tag) {
	try {
		switch(Index.options.mode) {
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
		var i = this.getPage() + 1;
		if (!c) c++;
		var show = "";
		
		switch(Index.options.style) {
			case "XofY":
				show = i + " of " + c;
				break;
			case "XofYper":
				// get percentage
				var per = ((i/c)*100);
				show = i + " of " + c + " (" + per.toFixed(0) + "%) ";
				break;
			case "XdivY":
				show = i + " / " + c;
				break;
			case "XdivYper":
				// get percentage
				var per = ((i/c)*100);
				show = i + " / " + c + " (" + per.toFixed(0) + "%) ";
				break;
			default:
				show = i + " of " + c;
				break;
		}
		
		this.setVariable("BOOK_INDEX_COUNT", show);
	} catch (e) {
		log.error("in updateIndex: " + e);
	}
};

Index.onInit = function() {
	Utils.hookAfter(kbook.model.container.PAGE_GROUP.PAGE, "pageChanged", updateIndex, "book");
};

return Index;