// Name: 505
// Description: Sony PRS-505 bootstrap code
//	Receives PARAMS argument with the following fields:
//		bootLog, Core, loadAddons, loadCore
//	Must call loadAddons, loadCore and Core.init at appropriate times
//
// History:
//	2011-03-04 kartu - Initial version
//	2011-04-01 kartu - Renamed language files to corresponding 2 letter ISO codes
//	2011-04-21 kartu - Added option to disable scanning without loading cache
//	2011-07-04 Mark Nord - Added #38 "Standby image"
//	2011-07-04 Mark Nord - Added #24 "Displaying first page of the book on standby" based on code found by Ben Chenoweth
//  2011-07-06 Ben Chenoweth - Minor fix to StandbyImage (mime not needed)
//

var tmp = function() {
	var oldReadPreference, oldCallback, bootLog;
	bootLog = PARAMS.bootLog;
	
	// Init core here
	oldReadPreference = kbook.model.readPreference;
	kbook.model.readPreference = function() {
		// Path to 505 specific language files
		var langPath505 = "/opt/sony/ebook/application/resources/prsp_lang/";
		try {
			oldReadPreference.apply(this, arguments);
			// restore "old" readPreference
			kbook.model.readPreference = oldReadPreference;
			
			PARAMS.loadCore();

			// Init 505 specific lang files
			try {
				var code = PARAMS.Core.io.getFileContent(langPath505 + "lang.js", null);
				if (code !== null) {
					var lang505 = new Function("Core,loadAddons,langPath505", code);
					lang505(PARAMS.Core, PARAMS.loadAddons, langPath505);	
				} else {
					bootLog("Error loading lang.js");
				}
			} catch (e0) {
				bootLog("error calling initLang505: " + e0);
			}
		} catch (e) {
			bootLog("in overriden readPreference " + e);
		}
	};
	
	// Disable card scan
	var originalCanHandleVolume = FskCache.diskSupport.canHandleVolume;
	FskCache.diskSupport.canHandleVolume = function (volume) {
		try {
			if (PARAMS.Core && PARAMS.Core.config && PARAMS.Core.config.cardScanMode === "disabled") {
				return false;
			}
		} catch (ee) {
			bootLog("canHandleVolume" + ee);
		}
		return originalCanHandleVolume.apply(this, arguments);
	};
	
	// Disabling scanning, but loading cache
	oldCallback = FskCache._diskSource.synchronizeCallback;
	FskCache._diskSource.synchronizeCallback = function() {
		try {
			if (PARAMS.Core && PARAMS.Core.config 
				&& PARAMS.Core.config.cardScanMode === "disabledLoadCache") {
				this.target.synchronizedSource();
				this.target.synchronizeDone();
				this.stack.pop();
			} else {
				oldCallback.apply(this, arguments);
			}
		} catch (e) {
			bootLog("Error in callback: " + e);
			oldCallback.apply(this, arguments);
		}
	};

	// renders actial books first page, copy 'n past from 600's BookUtil	
	createTextThumbnail = function (path) {
		var bitmap, viewer, bounds;
		bitmap = null;
		viewer = null;
		try {
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
		
		standbyImage = kbook.model.container.findContent('STANDBY_IMAGE');

		standbyImage.draw = function() {
			var window, path, bitmap, temp, port, x, y, bounds, ratio, width, height, ditheredBitmap, color;
			var newpath, newbitmap, mode, dither;
			window = this.root.window;
			mode = Core.addonByName.StandbyImage.options.mode;
			dither = Core.addonByName.StandbyImage.options.dither === "true";
			try {
			if (mode === 'cover') {
				// attempt to use current book cover
				newpath = kbook.model.currentBook.media.source.path + kbook.model.currentBook.media.path;
				newbitmap = createTextThumbnail(newpath);
				ditheredBitmap = newbitmap.dither(dither);
				newbitmap.close();	
				}		
			} catch (e) {
				log.error("createFileThumbnail", "error"); 
				}
        			
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
					} catch (e) { 
						log.error("Exception in random image draw " + e, 'error'); 
						}
				}
			}
			if (!ditheredBitmap && mode !=='act_page'){
			// generate blank bitmap
			try {			
				temp = new Bitmap(600, 800, 12);
				port = new Port(temp);
        			port.setPenColor(Color.white);
        			port.fillRectangle(0, 0, 600, 800);			
        			ditheredBitmap = temp.dither(false);
        			port.close();
        			temp.close(); 
			} catch (e) { 
				log.error("Exception create blank " + e, 'error'); 
				}        			
			}
			if (ditheredBitmap) {
			// if there is any standbyImage display it
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

	} catch (e1){
		log.trace("Exception in standby image draw " + e1)
		}	

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
			bootLog("error in doDigit: " + ignore);
		}
	};
	
	// Fix sorting
	var compareStrings =  PARAMS.Core.config.compat.compareStrings;
	String.prototype.localeCompare = function(a) {
		return compareStrings(this.valueOf(), a);
	};

	/* 
	// This hook is needed, since the parent node doesn't have a "shuffleList", so default onEnterSong fails
	//
	var oldOnEnterSong = kbook.model.onEnterSong;
	kbook.model.onEnterSong = function(node) {
		try {
			if (xs.isInstanceOf(node, musicPrototype)) {
				this.currentNode = node;
				this.STATE = 'SONG';
				kbook.menuData.setNode(null);
				if (this.currentSong != node) {
					this.playSong(node);
				} else {
					kbook.movieData.resetDisplayTimer();
				}			
			} else {
				oldOnEnterSong.apply(this, arguments);
			}
		} catch (e) {
			log.trace("Error in onEnterSong: " + e);
		}
	}; */

};

try {
	tmp();
} catch (ignore) {
}
