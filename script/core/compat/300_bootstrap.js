// Name: 300
// Description: Sony PRS-300 bootstrap code
//	Receives PARAMS argument with the following fields:
//		bootLog, Core, loadAddons, loadCore
//	Must call loadAddons, loadCore and Core.init at appropriate times
//
// History:
//	2010-09-02 kartu - Initial version
//	2010-09-07 kartu - Added Italian translation by Samhain
//	2010-11-27 kartu - Added Georgian translation by raverfas
//	2010-11-28 kartu - First digit is ignored, if it is zero, when opening "goto" dialog
//	2010-11-29 kartu - Renamed ga => ka
//	2010-11-30 kartu - Fixed #14 " * by author/title sorting doesn't work for non latin chars"
//	2011-02-06 kartu - Fixed #64 "Wrong german translation file"
//	2011-02-27 kartu - Refactored parameters into PARAMS object
//	2011-03-02 kartu - Added #57 Spanish localization (by Carlos)
//	2011-03-21 kartu - Added Ukrainian localization by Bookoman
//	2011-04-01 kartu - Renamed language files to corresponding 2 letter ISO codes

var tmp = function() {
	var oldSetLocale, localize;
	//-----------------------------------------------------------------------------------------------------
	// Localization related code is model specific.  
	// Replacing default  "choose language" UI
	//-----------------------------------------------------------------------------------------------------
	localize = function(Core) {
		try {
			var i, n, currentLang, settingsNode, langNode, languages, langNames, enter, node, langFile;
			currentLang = kbook.model.language;
	
			settingsNode = kbook.root.nodes[6];
			languages = ["en", "es", "de", "fr", "ka", "it", "nl", "ru", "ua"];
			langNames = {
				en: "English",
				de: "Deutsch", 
				es: "Español",
				fr: "Français",
				it: "Italiano",	
				ka: "ქართული",
				nl: "Nederlands", 
				ru: "Русский",
				ua: "Українська"
			};
	
			if (currentLang === undefined) {
				currentLang = "en";
			}
	
			// Load core js		
			PARAMS.loadCore();
			
			// Load PRS+ strings
			langFile = Core.config.corePath + "lang/" + currentLang + ".js";
			Core.lang.init(langFile);
			
			// FIXME localize date strings
			for (i = 0, n = languages.length; i < n; i++) {
				if (!Date.prototype.strings[languages[i]]) {
					Date.prototype.strings[languages[i]] = xs.newInstanceOf(Date.prototype.strings.en);
					Number.prototype.strings[languages[i]] = xs.newInstanceOf(Number.prototype.strings.en);
				}
			}
	
			langNode = Core.ui.createContainerNode({
				title: "fskin:/l/strings/STR_NODE_TITLE_LANG_SETTINGS".idToString(),
				icon: "LANGUAGE",
				comment: function() {
					return langNames[kbook.model.language];
				},
				parent: settingsNode
			});
			
			// Enter function for language children, changes locale and moves to parent
			enter = function() {
				try {
					// Code from kbook.xsb
					Fskin.localize.setLocale({language: this.tag, region: "XX"});
					kbook.model.language = this.tag;
					kbook.model.clearTitleSorters();
					kbook.root.update(kbook.model);
					kbook.model.writeFilePreference();
					this.parent.gotoParent(kbook.model);
					Core.ui.showMsg(Core.lang.L("MSG_RESTART"));
				} catch (e) {
					PARAMS.bootLog("changing language", e);
				}
			};
			
			// Create language node's children
			for (i = 0, n = languages.length; i < n; i++) {
				node = Core.ui.createContainerNode({
						title: langNames[languages[i]],
						icon: "CROSSED_BOX",
						parent: langNode
				});
				node.tag = languages[i];
				node.enter = enter;
				if (currentLang === languages[i]) {
					node.selected = true;
				}
				langNode.nodes.push(node);
			}
			
			// Replace "language" node with custom node
			settingsNode.nodes[4] = langNode;
			
			// self destruct :)
			delete this.localize;
			
			// Language strings were loaded, time to init Core
			PARAMS.loadAddons();
			Core.init();
		} catch (e) {
			PARAMS.bootLog("localize", e);
		}
	};
	
	// Init language related stuff once setLocale was called and strings were loaded
	oldSetLocale = Fskin.localize.setLocale;
	Fskin.localize.setLocale = function() {
		try {
			oldSetLocale.apply(this, arguments);
			localize(PARAMS.Core);
			// restore "old" set locale
			Fskin.localize.setLocale	= oldSetLocale;
		} catch (e) {
			PARAMS.bootLog("in overriden setLocale", e);
		}
	};

	createTextThumbnail = function (path) {
		var bitmap, viewer, bounds;
		bitmap = null;
		viewer = null;
		try {
		//	bounds = this.scratchRectangle;
			bounds = new Rectangle();
			viewer = new Document.Viewer.URL('file://' + path, FileSystem.getMIMEType(path));
			bounds.set(0, 0, 584, 754);
			viewer.set(Document.Property.dimensions, bounds);
			viewer.set(Document.Property.textEngine, 'FreeType');
			viewer.set(Document.Property.font, 'Dutch801 Rm BT');
			bitmap = viewer.render();
		}
		catch (e)
		{PARAMS.bootLog("createTextThumbnail e:"+e, "error");
		}
		finally {
			if (viewer) {
				viewer.close();
			}
		}
		return bitmap;
	};	
	
	
	getRandomWallpaper = function() {
		var  path, folder, idx, list;
		try {
			if (kbook.model.container.getVariable('ORIENTATION')) {
				// horizontal layout, use another set of pictures
				folder = System.applyEnvironment("[prspPublicPath]wallpaper/landscape/");
				if (!landscapeWallpapers) {
					landscapeWallpapers = PARAMS.Core.io.listFiles(folder, ".jpg", ".jpeg", ".gif", ".png"); 
				}
				list = landscapeWallpapers;
			} else {
				folder = System.applyEnvironment("[prspPublicPath]wallpaper/");
				//folder = "/Data/";
				if (!wallpapers) {
					wallpapers = PARAMS.Core.io.listFiles(folder, ".jpg", ".jpeg", ".gif", ".png"); 
				}
				list = wallpapers;
			}

			while (list.length > 0) {
				idx = Math.floor(Math.random() * list.length);
				path = list[idx];
				if (PARAMS.Core.media.isImage(path)) {
					return folder + path;
				} else {
					list.splice(idx, 1);
				}
			}
		} catch (e) {
			PARAMS.bootLog("error in random image " + e);
		}
	};

	// Standby image
	kbook.model.container.sandbox.doSuspend = function() {
		var log, standbyImage;
	try {	
		log = Core.log.getLogger("doSuspend");
	//	log.trace("entering doSuspend", "trace");
	//	log.trace("StandbyImage "+Core.debug.dumpToString(Core.addonByName.StandbyImage,' ',3), "trace");
		
		standbyImage = kbook.model.container.findContent('STANDBY_IMAGE');

		standbyImage.draw = function() {
        		var window, path, bitmap, temp, port, x, y, bounds, ratio, width, height, ditheredBitmap, color;
        		var newpath, mime, newbitmap, mode, dither;
        		window = this.root.window;
			mode = Core.addonByName.StandbyImage.options.mode;
			dither = Core.addonByName.StandbyImage.options.dither === "true";
        		try {
      			if (mode === 'cover') {
              			// attempt to use current book cover
              			newpath = kbook.model.currentBook.media.source.path + kbook.model.currentBook.media.path;
              			mime = FileSystem.getMIMEType(newpath);
              			newbitmap = createTextThumbnail(newpath);
              			ditheredBitmap = newbitmap.dither(dither);
              			newbitmap.close();	
              			}		
        		} catch (e) {log.error("createFileThumbnail", "error"); }
        		
        		if (!newbitmap && (mode === 'random' || mode === 'cover')) {
        			// if no book cover, then use random wallpaper
        			path = getRandomWallpaper();
        			if (FileSystem.getFileInfo(path)) {
        				try {
        					bitmap = new Bitmap(path);
        					temp = new Bitmap(this.width, this.height, 12);
        					port = new Port(temp);
        					port.setPenColor(Color.white);
        					port.fillRectangle(0, 0, this.width, this.height);
        					x = 0;
        					y = 0;
        					bounds = bitmap.getBounds();
        					ratio = (bounds.height > bounds.width)?this.height / bounds.height:this.width / bounds.width;
        					width = Math.floor(bounds.width * ratio);
        					height = Math.floor(bounds.height * ratio);
        					if (height > width) {
        						x = Math.floor(this.width - width) / 2;
        					} else {
        						y = Math.floor(this.height - height) / 2;
        					}
        					bitmap.draw(port, x, y, width, height);
        					ditheredBitmap = temp.dither(dither);
        					bitmap.close();
        					port.close();
        					temp.close();		
        				} catch (e) { log.error("Exception in random image draw " + e, 'error'); }
        			}
        		}
			if (!ditheredBitmap || mode ==="blank"){
			try {			
				temp = new Bitmap(600, 800, 12);
				port = new Port(temp);
        			port.setPenColor(Color.white);
        			port.fillRectangle(0, 0, 600, 800);			
        			ditheredBitmap = temp.dither(false);
        			port.close();
        			temp.close(); 
			} catch (e) { log.error("Exception create blank " + e, 'error'); }        			
			}
		if (ditheredBitmap) {
			window.drawBitmap(ditheredBitmap, this.x, this.y, this.width, this.height);
			ditheredBitmap.close();		
			Core.ui.updateScreen();
		} 
		if (mode === 'act_page') {
			Core.addonByName.StatusBar.setBookIndex('sleeping');
			Core.ui.updateScreen();
			}
		};
	
		standbyImage.draw();

	} catch (e1){log.trace("Exception in standby image draw " + e1)};	

		this.getModel().suspend();
		this.getDevice().doneSuspend();
	}; 
	
	/*
		<function id="doDigit" params="part"><![CDATA[
			var c = this.PAGE.countPages().toString().length - 1;
			var s = "";
			for (var i = 0; i < c; i++)
				s += "_";
			s += part.key.charAt(0);
			this.setVariable("GOTO_VARIABLE", s);
			var container = this.container;
			container.beforeModal(container.GOTO_GROUP);
		]]></function>
	*/
	// First digit is ignored, if it is zero, when opening "goto" dialog (original function quoted above)
	kbook.model.container.sandbox.PAGE_GROUP.sandbox.doDigit = function(part) {
		try {
			var c, s, i, container, key;
			PARAMS.bootLog("sandbox.PAGE is " + this.sandbox.PAGE);
			c = this.sandbox.PAGE.countPages().toString().length - 1;
			s = "";
			for (i = 0; i < c; i++) {
				s += "_";
			}
			key = part.key.charAt(0);
			if (key !== "0") {
				s += key;
			} else {
				s += "_";
			}
			this.setVariable("GOTO_VARIABLE", s);
			container = kbook.model.container;
			container.sandbox.beforeModal.call(container, container.sandbox.GOTO_GROUP);
		} catch (ignore) {
			PARAMS.bootLog("error in doDigit: " + ignore);
		}
	};
	
	// Fix sorting
	var compareStrings =  PARAMS.Core.config.compat.compareStrings;
	String.prototype.localeCompare = function(a) {
		return compareStrings(this.valueOf(), a);
	};
};

try {
	tmp();
} catch (ignore) {
}
