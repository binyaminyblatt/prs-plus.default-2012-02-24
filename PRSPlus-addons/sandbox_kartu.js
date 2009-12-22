var getSoValue = Utils.getSoValue;
var log = Utils.getLogger("sandbox");

return;

//--------------------------------------------------------------------------------------------------------------------
// BEGIN fonts
//--------------------------------------------------------------------------------------------------------------------

log.trace("hey ho");
log.trace("config is " + config);
log.trace("config.priv.ui.load so is " + getSoValue(this, "config.priv.ui.load"));

// Works with text viewer
Utils.hookAfter(kbook.bookData, "setData", function(args) {
	var data = args[0];
	FskUI.Fonts.add("/Data/impact3.ttf");
	FskUI.Fonts.add("/Data/impact.ttf");
	log.trace("set data, data is " + data);
	log.trace("data.set is " + data.set);
	log.trace("data get returns " + data.get(14));
	var fontName = "Impact";
	data.set(14, fontName);
	log.trace("data get returns " + data.get(14));
	log.trace("successvfully set font to " + fontName);
	log.trace("this.book.id so is " + getSoValue(this, "book.id"));
	log.trace("this.book.skin.id so is " + getSoValue(this, "book.skin.id"));
	log.trace("this.book.skin.styles[0].font so is " + getSoValue(this, "book.skin.styles.0.font"));	
	log.trace("this.book.skin.styles[0].font.family so is " + getSoValue(this, "book.skin.styles.0.font.family"));
	log.trace("typeof this.book.skin.styles[0].font so is " + (typeof getSoValue(this, "book.skin.styles.0.font")));
	
});

var bla = {hey: "ho"};
log.trace("JSON is " + JSON);
return;

var rootThis = this;
kbook.model.container.PAGE_GROUP.PAGE.doLeft = function() {
	var get = getSoValue(kbook.bookData, "get");
	var set = getSoValue(kbook.bookData, "set");

	log.trace("kbook.model.currentBook.media is " + (typeof kbook.model.currentBook.media));
	
	var pages = get.call(kbook.bookData, 2);
	var page = get.call(kbook.bookData, 3);
	var textScale = get.call(kbook.bookData, 4);
	var font = get.call(kbook.bookData, 14);
	var textEngine = get.call(kbook.bookData, 16);	
	var pageMap = get.call(kbook.bookData, 20);
	var pageOffset = get.call(kbook.bookData, 21);
	log.trace("pages is " + pages);
	log.trace("page is " + page);
	log.trace("textScale is " + textScale);
	log.trace("font is " + font);
	log.trace("textEngine is " + textEngine);
	log.trace("pageMap is " + pageMap);
	log.trace("pageOffset is " + pageOffset);
	log.trace("setting font to 'Impact'");
	var font = (FskUI.Fonts.getList())[2];
	set.call(kbook.bookData, 14, font);
	log.trace("setting font - success");
	/*
	NOTE:
	1) textScale cannot be set higher, than the viewer wants it.
	2) resizing using bookdata.set does not use pagination cache 
	
	set.call(kbook.bookData, 4, 1);
	log.trace("textScale after setting it to 3 is " + get.call(kbook.bookData, 4));
	var kbookPage = getSoValue(rootThis, "Fskin.kbookPage")
	log.trace("kbookPage is " + (typeof kbookPage));
	var dataChanged = getSoValue(kbookPage, "dataChanged");
	trace("calling dataChanged, kbookPage is " + (typeof kbookPage) + " and dataChanged is " + (typeof dataChanged)); 
	dataChanged.call(kbookPage);*/
	log.trace("finished call to doLeft");
};

try {
	log.trace("FskUI is " + FskUI);
	log.trace("FskUI.Fonts is " + FskUI.Fonts);
	log.trace("FskUI.Fonts.getList is " + FskUI.Fonts.getList);
	log.trace("FskUI.Fonts.getList() is " + FskUI.Fonts.getList());
	log.trace("typeof FskUI.Fonts.getList() is " + (typeof FskUI.Fonts.getList()));
	
	var font = FskUI.Fonts.add("/Data/impact3.ttf");
	log.trace("FskUI.Fonts.getList() is " + FskUI.Fonts.getList());
	log.trace("font is " + font);
	Utils.debug.dump(font, log);
	
	var fonts = FskUI.Fonts.getList();
	Utils.debug.dump(fonts[0], log);
	
	log.trace("finished");
} catch (e) {
	log.error(e);
}
return;
//--------------------------------------------------------------------------------------------------------------------
// BEGIN setting UI values
//--------------------------------------------------------------------------------------------------------------------
try {
	/*
	log.trace("kbook.model.container is " + kbook.model.container);
	log.trace("kbook.model.container.contents so is " + getSoValue(kbook.model.container, "contents"));
	log.trace("kbook.model.container.root so is " + getSoValue(kbook.model.container, "root"));
	var contents = getSoValue(kbook.model.container, "contents");
	log.trace("contents[0].id so is " + getSoValue(contents, "0.id"));
	log.trace("kbook.model.container.keys.length so is" + getSoValue(kbook.model.container, "keys.length"));
	log.trace("kbook.model.container.menu so is" + (typeof getSoValue(kbook.model.container, "menu")));
	log.trace("kbook.model.container.ABOUT_GROUP.contents so is " + getSoValue(kbook.model.container.ABOUT_GROUP, "contents"));
	log.trace("kbook.model.container.ABOUT_GROUP.contents[0].id so is " + getSoValue(kbook.model.container.ABOUT_GROUP, "contents.0.id"));
	log.trace("kbook.model.container.ABOUT_GROUP.contents[0].id so is " + getSoValue(kbook.model.container.ABOUT_GROUP, "contents.1.id"));
	log.trace("kbook.model.container.ABOUT_GROUP.contents[0].id so is " + getSoValue(kbook.model.container.ABOUT_GROUP, "contents.2.id"));
	log.trace("kbook.model.container.ABOUT_GROUP.contents[0].id so is " + getSoValue(kbook.model.container.ABOUT_GROUP, "contents.3.id"));
	log.trace("kbook.model.container.ABOUT_GROUP.ABOUT.data so is " + getSoValue(kbook.model.container.ABOUT_GROUP.ABOUT, "data"));
	log.trace("kbook.model.container.ABOUT_GROUP.ABOUT.data.records so is " + getSoValue(kbook.model.container.ABOUT_GROUP.ABOUT, "data.records"));
	log.trace("kbook.model.container.ABOUT_GROUP.ABOUT.data.records[0].text so is " + getSoValue(kbook.model.container.ABOUT_GROUP.ABOUT, "data.records.0.text"));
	log.trace("kbook.model.container.ABOUT_GROUP.ABOUT.data.records[1].sandbox.text so is " + getSoValue(kbook.model.container.ABOUT_GROUP.ABOUT, "data.records.1.sandbox.text"));
	log.trace("kbook.model.container.ABOUT_GROUP.ABOUT.data.records[2].text so is " + getSoValue(kbook.model.container.ABOUT_GROUP.ABOUT, "data.records.2.text"));
	log.trace("kbook.model.container.ABOUT_GROUP.ABOUT.data.records[3].text so is " + getSoValue(kbook.model.container.ABOUT_GROUP.ABOUT, "data.records.3.text"));
	log.trace("kbook.model.container.ABOUT_GROUP.ABOUT.data.records[0].kind so is " + getSoValue(kbook.model.container.ABOUT_GROUP.ABOUT, "data.records.0.kind"));
	log.trace("kbook.model.container.ABOUT_GROUP.ABOUT.data.records[1].sandbox.kind so is " + getSoValue(kbook.model.container.ABOUT_GROUP.ABOUT, "data.records.1.sandbox.kind"));
	log.trace("kbook.model.container.ABOUT_GROUP.ABOUT.data.records[2].kind so is " + getSoValue(kbook.model.container.ABOUT_GROUP.ABOUT, "data.records.2.kind"));
	log.trace("kbook.model.container.ABOUT_GROUP.ABOUT.data.records[3].kind so is " + getSoValue(kbook.model.container.ABOUT_GROUP.ABOUT, "data.records.3.kind"));
	log.trace("kbook.model.container.ABOUT_GROUP.ABOUT.getRecord so is " + getSoValue(kbook.model.container.ABOUT_GROUP.ABOUT, "getRecord"));
	*/
	
	//log.trace("kbook.model.setVariable is " + kbook.model.setVariable);
	//log.trace("kbook.model.hasVariable is " + kbook.model.hasVariable);
	
	return;

	/** var sandbox = getSoValue(record1, "sandbox");
	try {
		//log.trace("calling has variable " + kbook.model.hasVariable.call(sandbox, "text"));
		log.trace("calling set variable on sandbox");
		kbook.model.setVariable.call(sandbox, "text", "hey hahahaha");
	} catch (e) {
		log.trace("ignorable exception: " + e);
	}
	log.trace("record1.sandbox.text is " + getSoValue(record1, "sandbox.text"));*/

	/** Does not work 
	var bla = {
		sandbox: {
			text: "bugamuga"
		}
	};
	var kbookAbout = getSoValue(this, "Fskin.kbookAbout");
	kbook.model.setVariable.call(kbookAbout, "text3", "hihihi");
	log.trace("bla.sandbox.text is " + bla.sandbox.text);
	log.trace("bla.sandbox.text so is " + getSoValue(bla.sandbox, "text"));
	log.trace("sandbox.text is " + sandbox.text);
	log.trace("sandbox.text so is " + getSoValue(sandbox, "text"));
	log.trace("kbookAbout.text3 so is " + getSoValue(kbookAbout, "text3"));
	log.trace("kbookAbout.text3 is " + kbookAbout.text3);
	log.trace("kbookAbout.text so is " + getSoValue(kbookAbout, "text"));
	log.trace("kbookAbout.draw so is " + getSoValue(kbookAbout, "draw"));
	*/
} catch (e) {
	log.error(e);
}

return;


//--------------------------------------------------------------------------------------------------------------------
// BEGIN messing with key bindings
//--------------------------------------------------------------------------------------------------------------------

/* No effect 
var win = kbook.model.container.getWindow();
var events = win.events;
Utils.hookBefore(events, "onUpdate", function() {log.trace("onUpdate");});
Utils.hookBefore(events, "onKeyDown", function() {log.trace("onKeyDown");});
Utils.hookBefore(events, "onKeyUp", function() {log.trace("onKeyUp");});
Utils.hookBefore(events, "onButton", function() {log.trace("onButton");});
Utils.hookBefore(events, "onResume", function() {log.trace("onResume");});
Utils.hookBefore(events, "onSleep", function() {log.trace("onSleep");});
Utils.hookBefore(events, "onSuspend", function() {log.trace("onSuspend");});
Utils.hookBefore(events, "onWakeup", function() {log.trace("onWakeup");});
Utils.hookBefore(events, "onQuit", function() {log.trace("onQuit");});
return;
*/


var model1 = kbook.model.container.MENU_GROUP.MENU;
var model2 = kbook.model;
var events = ["doResume","doSleep","doSuspend","doTestMode","doWakeup","doQuit",
		"doMenu","doRoot","doCenter","doLeft","doRight","doUp","doDown",	
		"doPrevious","doFirst","doNext","doLast","doSize","doRotate","doMark","doMarkMenu",
		"doDigit",
		"doHold1","doHold2","doHold3","doHold4","doHold5","doHold6","doHold7","doHold8","doHold9","doHold0",			
		"doQuiet","doMute","doLoud","doMute"];
for(var i = 0, n = events.length; i < n; i++) {
	log.trace("hooking " + events[i]);
	myHook(model1, events[i]);
	myHook(model2, events[i]);
}
function myHook(m, str) {
	Utils.hookBefore(m, str, function() {log.trace(str);});
}

var bla = {
	test: function() { log.trace("this is bla.test");}
};

Utils.hookBefore(bla, "test", function() {log.trace("before");});
Utils.hookAfter(bla, "test", function() {log.trace("after");});
bla.test();


log.trace("win.events is " + win.events);
log.trace("win.events.onUpdate is " + win.events.onUpdate);
log.trace("win.events.onKeyDown is " + win.events.onKeyDown);
log.trace("win.events.onKeyUp is " + win.events.onKeyUp);
log.trace("win.events.onButton is " + win.events.onButton);
log.trace("win.events.onMenuCommand is " + win.events.onMenuCommand);
return;

//--------------------------------------------------------------------------------------------------------------------
// END messing with key bindings
//--------------------------------------------------------------------------------------------------------------------

//--------------------------------------------------------------------------------------------------------------------
// BEGIN messing with dictionary
//--------------------------------------------------------------------------------------------------------------------
this.trigger = false;
kbook.model.container.MENU_GROUP.MENU.doLeft = function(bla, bla2, bla3) {
	log.trace("bla is " + bla);
	log.trace("bla2 is " + bla2);
	log.trace("bla3 is " + bla3);
	log.trace("bla.part so is " + getSoValue(bla, "part"));
	log.trace("bla.key so is " + getSoValue(bla, "key"));
	log.trace("bla.event so is " + getSoValue(bla, "event"));
	for(var p in bla) {
		try {
			log.trace(p + " => " + bla[p]);
		} catch (e) {
			log.error("failed to dump property: " + p);
		}
	}

	trigger = !trigger;
	if(trigger) {
		kbook.model.container.getWindow().invalidate(0, 0, 300, 400);
		return;
	}
	try {
		var win = kbook.model.container.getWindow();
		var mark = getSoValue(kbook.bookData, "mark");
	        var get = getSoValue(kbook.bookData, "get");
	        
	        win.beginDrawing();
	        try {
		        // Read pages
		        var page = get.call(kbook.bookData, 3);

		        // Get text on the entire page
			var m0 = mark.call(kbook.bookData, page, 0, 0, 0);
			// TODO orientation, the height and with should be available elsewhere
			var m1 = mark.call(kbook.bookData, page, 0, 600, 800);
			var span = new Document.Viewer.Span(m0, m1);
			var bounds = span.getBounds();
			bounds.reverse();

			var dx = 5;
			var dy = 3;
			// draw black underline
			for(var i = 0, n = bounds.length; i < n; i++) {
				var b = bounds[i];
				var x = b.x + dx;
				var y = b.y + b.height + dy;
				var w = b.width - dx;
				var h = 2;

				//win.fillRectangle(b.x + dx, b.y + b.height + dy, b.width - dx, 2);
				win.setPenColor(Color.black);
				win.fillRectangle(x, y, w, h);


				win.setTextStyle("bold");
				win.setTextSize(20)

				var tBounds = win.getTextBounds("" + i);
				w = tBounds.width + 4;
				h = tBounds.height;
				// TODO must be the middle of the screen instead of 300 (orientation!)
				x = 300 - Math.round(w/2);
				y = y - h;
				
				win.fillRectangle(x, y, w, h);
				win.setPenColor(Color.white);

				win.drawText("" + i, x+2, y, w, h);				
			}

			
			// draw white underline
			/*
			win.setPenColor(Color.white);
			for(i = 0, n = bounds.length; i < n; i+=2) {
				var b = bounds[i];
				win.fillRectangle(b.x + dx, b.y + b.height + dy, b.width -dx, 3);
				i++;
			}*/
			delete m0;
			delete m1;
			delete span;
			delete bounds;
		} catch (ee) {
			log.error("error: " + ee);
		}
		
		win.endDrawing();
		
		kbook.model.container.MENU_GROUP.MENU.setVariable("BOOK_INDEX_COUNT", "Finished");	
	} catch (e) {
		log.error("failed: " + e);
	}

}
kbook.model.container.PAGE_GROUP.PAGE.doLeft=kbook.model.container.MENU_GROUP.MENU.doLeft;
//--------------------------------------------------------------------------------------------------------------------
// END messing with dictionary
//--------------------------------------------------------------------------------------------------------------------

return;


//--------------------------------------------------------------------------------------------------------------------
// BEGIN built in parse & serialize
//--------------------------------------------------------------------------------------------------------------------
var path = "/Data/database/cache/media.xml";
info = FileSystem.getFileInfo(path);
if (info) {
	stream = new Stream.File(path);
	try {
		log.trace("stream.parse is " + stream.parse);
		result = stream.parse(info.size, getSoValue(this, "xs.PARSE_NO_ERROR") | getSoValue(this, "xs.PARSE_NO_WARNING"));
		
		var serialize = getSoValue(this, "xs.serialize");	
		log.trace("serialize is " + serialize);
		var serializedStr = serialize(result);		
		log.trace("serializedstr is " + serializedStr);
		var bla = {a: "value of a", b: "value of b"};
		// fails
		serializedStr = serialize(bla);
		log.trace("serializedstr is " + serializedStr);

		log.trace("successfully read cache")
	} catch (e) {
		log.error("error parsing stream: " + e);
	}

}
return;
//--------------------------------------------------------------------------------------------------------------------
// END built in parse & serialize
//--------------------------------------------------------------------------------------------------------------------


//--------------------------------------------------------------------------------------------------------------------
// BEGIN styles, skins etc
//--------------------------------------------------------------------------------------------------------------------


//kbookBigTitle 48 index 0
//kbookVSmallName 24 index 3

/*
log.trace("config is " + getSoValue(this, "config"));
log.trace("config.platform is " + getSoValue(this, "config.platform"));
log.trace("config.extension.load is " + getSoValue(this, "config.extension.load"));
log.trace("System.loadExtension is " + getSoValue(this, "System.loadExtension"));
log.trace("config.vm.root is " + getSoValue(this, "config.vm.root"));
log.trace("config.root is " + getSoValue(this, "config.root"));
log.trace("config.root.cutouts is " + getSoValue(this, "config.root.cutouts"));
log.trace("config.root.styles is " + getSoValue(this, "config.root.styles"));
log.trace("kbook.model.container.root is " + getSoValue(kbook, "model.container.root"));
log.trace("kbook.model.container.root.cutouts is " + getSoValue(kbook, "model.container.root.cutouts"));
log.trace("kbook.model.container.root.styles is " + getSoValue(kbook, "model.container.root.styles"));
log.trace("kbook.model.container.root.skin is " + getSoValue(kbook, "model.container.root.skin"));
log.trace("kbook.model.container.window is " + getSoValue(kbook, "model.container.window"));
log.trace("kbook.model.container.window.root is " + getSoValue(kbook, "model.container.window.root"));
//log.trace("sandbox is " + getSoValue(this, "sandbox"));
*/

log.trace("kbook.model.cache.bitmapCache[1] is " + getSoValue(kbook.model, "cache.bitmapCache.1"));

var cutouts = getSoValue(kbook, "model.container.root.cutouts");
var styles = getSoValue(kbook, "model.container.root.styles");

//var bitmap = Bitmap.call(this, "/Data/bookbyfolderpreview.jpg", "image/jpeg");
var media = {
	id: bla,
	thumbnail: {jpeg: "/Data/bookbyfolderpreview.jpg"}
}
//Crashes the device at some point
//var bitmap = kbook.model.cache.getBitmap.call(kbook.model.cache, media);
//log.trace("bitmap is " + bitmap);
//log.trace("Bitmap is " + Bitmap);

/*

kbook.model.container.MENU_GROUP.MENU.doRight = function() {	
	log.trace("kbook.autoRunRoot.path is " + getSoValue(kbook, "autoRunRoot.path"));
} */


dump(cutouts);
dump(styles);
function dump(obj) {
	try {
		log.trace("dumping: " + obj.length);
		for (var i = 0, n = obj.length; i < n; i++) {
			log.trace(i + " => " + getSoValue(obj[i], "id"));
			/*log.trace(i + getSoValue(obj[i], "texture.href"));
			log.trace(i + getSoValue(obj[i], "texture.id"));
			log.trace(i + getSoValue(obj[i], "texture.width"));
			log.trace(i + getSoValue(obj[i], "texture.height"));*/

			/*log.trace(i);
			var props = ["id", "x", "y", "height", "width", "texture"];
			for (var j = 0, m = props.length; j < m; j++) {
				log.trace(i + "\t" + props[j] + " => " + getSoValue(obj[i], props[j]));
			}*/
		}
		log.trace("finished dumping");
	} catch (e) {
		log.trace("error when dumping: " + e);
	}
}


return;

var setValue = getSoValue(this, "Fskin.treeData.setValue");

var styles = getSoValue(kbook.tableData, "table.skin.styles");
styles[0] = styles[3];
function setSoValue(obj, propName, value) {
	var dummy = {sandbox: obj, changed: function() {}};
	try {
		setValue.call(dummy, propName, value);
	} catch (e) {
		Utils.log.trace("failed to call set value: " + e);
	}
}



log.trace("setValue is " + setValue);
log.trace("kbook.tableData.table.skin.styles[3].id is " + getSoValue(kbook.tableData, "table.skin.styles.3.id"));
log.trace("kbook.tableData.table.skin.styles[3].size is " + getSoValue(kbook.tableData, "table.skin.styles.3.size"));
log.trace("kbook.tableData.table.skin.styles[0].id is " + getSoValue(kbook.tableData, "table.skin.styles.3.id"));
log.trace("kbook.tableData.table.skin.styles[0].size is " + getSoValue(kbook.tableData, "table.skin.styles.3.size"));
var style = getSoValue(kbook.tableData, "table.skin.styles.3");
log.trace("size is " + style.size);
//style.size=12;
//log.trace("2: size is " + style.size);
setSoValue(style, "size", 13);
log.trace("3: sosize is " + getSoValue(style, "size"));
return;

var oldDoRight = kbook.model.container.MENU_GROUP.MENU.doRight;
kbook.model.container.MENU_GROUP.MENU.doRight = function() {	
	log.trace("kbook.autoRunRoot.path is " + getSoValue(kbook, "autoRunRoot.path"));
}





try {

/*
log.trace("Fskin.tableData is " + getSoValue(this, "Fskin.tableData"));
log.trace("kbook.tableData.table is " + getSoValue(kbook.tableData, "table"));
log.trace("kbook.tableData.table.skin is " + getSoValue(kbook.tableData, "table.skin"));
log.trace("kbook.tableData.table.skin.styles is " + getSoValue(kbook.tableData, "table.skin.styles"));
log.trace("kbook.tableData.table.skin.skins is " + getSoValue(kbook.tableData, "table.skin.skins"));
log.trace("kbook.tableData.table.skin.cutouts is " + getSoValue(kbook.tableData, "table.skin.cutouts"));
log.trace("kbook.tableData.table.skin.cutouts[1] is " + getSoValue(kbook.tableData, "table.skin.cutouts.1"));
log.trace("kbook.tableData.table.skin.cutouts[1].id is " + getSoValue(kbook.tableData, "table.skin.cutouts.1.id"));
log.trace("kbook.tableData.table.skin.cutouts[1].width is " + getSoValue(kbook.tableData, "table.skin.cutouts.1.width"));
log.trace("kbook.tableData.table.skin.cutouts[1].height is " + getSoValue(kbook.tableData, "table.skin.cutouts.1.height"));
log.trace("kbook.tableData.table.skin.cutouts[1].x is " + getSoValue(kbook.tableData, "table.skin.cutouts.1.x"));
log.trace("kbook.tableData.table.skin.cutouts[1].y is " + getSoValue(kbook.tableData, "table.skin.cutouts.1.y"));
log.trace("kbook.tableData.table.skin.cutouts[1].texture is " + getSoValue(kbook.tableData, "table.skin.cutouts.1.texture"));
*/
log.trace("kbook.tableData.table.skin.cutouts[1].texture.getURI is " + getSoValue(kbook.tableData, "table.skin.cutouts.1.texture.getURI"));
log.trace("kbook.tableData.table.skin.cutouts[1].texture.href is " + getSoValue(kbook.tableData, "table.skin.cutouts.1.texture.href"));
log.trace("kbook.root.cutouts is " + getSoValue(kbook.root, "cutouts"));

var texture = getSoValue(kbook.tableData, "table.skin.cutouts.1.texture")
texture.href=null;
log.trace("set texture.href to null" + getSoValue(texture, "href"));
 
var skins = getSoValue(kbook.tableData, "table.skin.skins");
var cutouts = getSoValue(kbook.tableData, "table.skin.cutouts");
//log.trace("skins length is " + skins.length);
log.trace("cutouts length is " + cutouts.length);
dump(cutouts);
//cutouts.reverse();
//log.trace("after reverse");
dump(cutouts);

for(var p in skins) {
	log.trace(p + " => " + skins[p]);
}

function dump(obj) {
	try {
		log.trace("dumping: " + obj.length);
		for (var i = 0, n = obj.length; i < n; i++) {
			log.trace(i + getSoValue(obj[i], "id"));
			/*log.trace(i + getSoValue(obj[i], "texture.href"));
			log.trace(i + getSoValue(obj[i], "texture.id"));
			log.trace(i + getSoValue(obj[i], "texture.width"));
			log.trace(i + getSoValue(obj[i], "texture.height"));*/

			/*log.trace(i);
			var props = ["id", "x", "y", "height", "width", "texture"];
			for (var j = 0, m = props.length; j < m; j++) {
				log.trace(i + "\t" + props[j] + " => " + getSoValue(obj[i], props[j]));
			}*/
		}
		log.trace("finished dumping");
	} catch (e) {
		log.error("error when dumping: " + e);
	}
}





} catch (eee) {
	log.error("error in dictionary: " + eee);
}

return;
//--------------------------------------------------------------------------------------------------------------------
// END styles, skins etc
//--------------------------------------------------------------------------------------------------------------------
