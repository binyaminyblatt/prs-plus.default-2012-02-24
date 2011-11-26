// Name: StandbyImage
// Description: addon to set Standby/Shutdown Image
// Author: Mark Nord
//
// History:
//	2011-07-03 Mark Nord - Initial version
//	2011-07-05 Ben Chenoweth - minor corrections
//	2011-11-21 quisvir - Rewritten to merge all relevant code, add shutdown image support, icon, custom text
//	2011-11-22 quisvir - Implemented bugfixes from Mark Nord, fixed standby icon indices
//	2011-11-22 Mark Nord - some more tweaks to get it working with 300/505
//  2011-11-25 Ben Chenoweth - icon on standby and shutdown now separate options
//	2011-11-26 quisvir - separate standby/shutdown text
//
//	TODO: set/restore portrait orientation on shutdown, scaling option


tmp = function() {
	var L, log, orgOrientation, shutdown, oldStandbyImageDraw, getBookCover;
	
	// Localize
	L = Core.lang.getLocalizer("StandbyImage");
	log = Core.log.getLogger("StandbyImage");
	
	// Constants
	orgOrientation = 0;

	// Suspend: set orientation to portrait, call standbyimage if necessary
	var oldSuspend = kbook.model.suspend;
	kbook.model.suspend = function () {
		oldSuspend.apply(this);
		try {
			if (StandbyImage.options.StandbyMode !== 'act_page') {
				orgOrientation = ebook.getOrientation();
				if (orgOrientation) {
					ebook.rotate(0);
					// Model sniffing: update screen for 300/505
					if (!standbyImage.color) {
						// without this the current page is drawn over the standbyImage
						Core.ui.updateScreen();
					}
				}	
				
			}	
			// Model sniffing: call standbyimage for 300/505
			if (!standbyImage.color) {
				standbyImage.draw.call(kbook.model.container);
			}	
		} catch(ignore) {}
	};
	
	// Resume: restore orientation if necessary
	var oldResume = kbook.model.resume;
	kbook.model.resume = function () {
		if (orgOrientation) {
			ebook.rotate(orgOrientation);
			orgOrientation = 0;
		}
		oldResume.apply(this);
	};
	
	// Quit: if no exit code already set, call standbyimage, set exit code 6
	var oldDoQuit = Fskin.window.doQuit;
	Fskin.window.doQuit = function () {
		try {
			if (!FileSystem.getFileInfo('/tmp/exitcode')) {
				shutdown = true;
				standbyImage.draw.call(kbook.model.container);
				ebook.setExitCode(6);
			}
		} catch(ignore) {}
		oldDoQuit.apply(this);
	};
	
	// getBookCover for 600+ and for epub on 300/505
	var getBookCoverNew = function (path, w, h) {
		var bitmap, viewer, bounds, natural, clip, rects, rect, scaled, ratio, bitmap2, port;
		try {
			viewer = new Document.Viewer.URL('file://' + path, FileSystem.getMIMEType(path));
			viewer.set(Document.Property.textScale, 0);
			viewer.set(Document.Property.textEngine, 'FreeType');
			viewer.set(Document.Property.font, 'Dutch801 Rm BT');
			bounds = new Rectangle(0, 0, w, h);
			while (1) {
				viewer.set(Document.Property.dimensions, bounds);
				bitmap = viewer.render();
				natural = viewer.get(Document.Property.naturalBounds);
				if (natural) {
					clip = natural;
				} else {
					natural = bounds;
				}
				rects = viewer.get(Document.Property.imageRects);
				if (rects && rects.length == 1) {
					rect = rects[0];
					rect.intersect(natural);
					if (scaled || rect.width * rect.height >= natural.width * natural.height * 0.8) {
						if (!scaled && rect.height < h && rect.width < w) {
							ratio = (rect.height/rect.width > h/w) ? (h/rect.height) : (w/rect.width);
							bounds.set(0, 0, Math.round(w*ratio), Math.round(h*ratio));
							scaled = true;
							continue;
						}
						clip = new Rectangle();
						clip.set(rect.x, rect.y, rect.width, rect.height);
					}
				}
				break;
			}
			if (clip) {
				bitmap2 = new Bitmap(clip.width, clip.height);
				port = new Port(bitmap2);
				port.drawBitmap(bitmap, 0, 0, clip.width, clip.height, clip);
				bitmap.close();
				port.close();
				bitmap = bitmap2;
			}
		} catch (ignore) {}
		if (viewer) viewer.close();
		return bitmap;
	};
	
	// getBookCover for 300/505, calls getBookCoverNew for epub
	var getBookCoverOld = function (path, w, h) {
		var bitmap, page, oldpage;
		if (FileSystem.getMIMEType(path) === "application/x-sony-bbeb") { // it's a LRF BBeB-Book 
			if (orgOrientation) {
			// Fixme enable CoverPage for BBeB/LRF in landscape
				return null;
			}	
			page = kbook.model.container.sandbox.PAGE_GROUP.sandbox.PAGE;
			oldpage = page.data.get(Document.Property.page);
			page.data.set(Document.Property.page, 0);
			bitmap = page.data.render();
			page.data.set(Document.Property.page, oldpage);
			return bitmap;
		} else { // its a epub or pdf
			return getBookCoverNew(path, w, h);
		} 
	};
	
	// Get wallpaper for 300/505/600
	var getRandomWallpaper = function() {
		var  path, folder, idx, list;
		try {
			folder = System.applyEnvironment("[prspPublicPath]wallpaper/");
			list = Core.io.listFiles(folder, ".jpg", ".jpeg", ".gif", ".png");
			while (list.length) {
				idx = Math.floor(Math.random() * list.length);
				path = list[idx];
				if (Core.media.isImage(folder+path)) {
					return new Bitmap(folder+path);
				} else {
					list.splice(idx, 1);
				}
			}
		} catch (ignore) {}
		return null;
	};
	
	// Assign correct functions for each model
	switch (Core.config.model) {
		case "350":
		case "650":
		case "950":
			oldStandbyImageDraw = standbyImage.draw;
		case "600":
			getBookCover = getBookCoverNew;
			break;
		default:
			standbyImage = {};
			getBookCover = getBookCoverOld;
	}
	
	standbyImage.draw = function () {
	
		var opt, mode, win, w, h, path, bitmap, bounds, ratio, width, height, x, y, oldPencolor, oldTextStyle, oldTextSize, oldTextAlignmentX, oldTextAlignmentY,
			icon, iconX, file, content, lines, line, customText;
		opt = StandbyImage.options;
		mode = (shutdown) ? opt.ShutdownMode : opt.StandbyMode;
		win = this.getWindow();
		
		//Model sniffing: 300/505
		//win.width / win.height isn't update after ebook.rotate!? giving w:800 h:600 
		if (!standbyImage.color) {
			w = 600; 
			h = 800; 
		} else {
			w = win.width;
			h = win.height;
		}	
		
		// Save settings
		oldPencolor = win.getPenColor();
		oldTextStyle = win.getTextStyle();
		oldTextSize = win.getTextSize();
		oldTextAlignmentX = win.getTextAlignment().x;
		oldTextAlignmentY = win.getTextAlignment().y;
		
		win.beginDrawing();
		
		if (mode === 'act_page') {
			win.setTextStyle(1); // 0 = regular, 1 = bold, 2 = italic, 3 = bold italic
			win.setTextSize(20);
			win.setTextAlignment(2, 0); // (x, y): 0 = center, 1 = left, 2 = right, 3 = top, 4 = bottom
			win.setPenColor(Color.black);
			win.fillRectangle(w-155, h-30, 155, 30);
			win.setPenColor(Color.white);
			win.drawText(L('SLEEPING'), 0, h-30, w, 30);
		} else {
			win.setPenColor(Color.white);
			win.fillRectangle(win);
			
			switch (mode) {
				case 'cover':
					if (kbook.model.currentBook) {
						path = kbook.model.currentBook.media.source.path + kbook.model.currentBook.media.path;
						bitmap = getBookCover(path, w, h);						
					}
				case 'random':
				case 'standby':
					if (!bitmap) {
						if (oldStandbyImageDraw) {
							this.color = Color.white; // used by oldStandbyImageDraw, not present in shutdown context
							oldStandbyImageDraw.apply(this);
						} else {
							bitmap = getRandomWallpaper();
						}
					}
					break;
				case 'black':
					win.setPenColor(Color.black);
					win.fillRectangle(win);
					break;
				case 'calendar':
					try {
						Core.addonByName.Calendar.drawStandbyWidget(win);
					} catch (e) { log.error(e); }
					break;
			}
			
			// If getBookCover or getRandomWallpaper succeeded, draw bitmap
			if (bitmap) {
				bounds = bitmap.getBounds();
				ratio = (bounds.height/bounds.width > h/w) ? (h/bounds.height) : (w/bounds.width);
				width = Math.floor(bounds.width * ratio);
				height = Math.floor(bounds.height * ratio);
				x = (w > width) ? Math.floor((w - width) / 2) : 0;
				y = (h > height) ? Math.floor((h - height) / 2) : 0;
				if (opt.dither === 'true') bitmap = bitmap.dither(true);
				win.drawBitmap(bitmap, x, y, width, height);
				bitmap.close();
			}
			
			// Display standby/shutdown icon
			if ((shutdown && opt.DisplayShutdownIcon === 'true') || (!shutdown && opt.DisplayStandbyIcon === 'true')) {
				win.setPenColor(Color.black);
				win.fillRectangle(w-69, 9, 60, 60);
				icon = (shutdown) ? Core.config.compat.NodeKinds.SHUTDOWN : Core.config.compat.NodeKinds.STANDBY;
				iconX = (shutdown) ? w-74 : w-73;
				kbook.model.container.cutouts['kBookVIcon-a'].draw(win, icon, 0, iconX, 4, 70, 70);
			}
			
			// Display custom standby/shutdown text from customtext.cfg
			if ((shutdown && opt.DisplayShutdownText === 'true') || (!shutdown && opt.DisplayStandbyText === 'true')) {
				win.fillRectangle(0, h-30, w, 30);
				win.setPenColor(Color.white);
				win.setTextStyle(1);
				win.setTextSize(20);
				win.setTextAlignment(0, 0);
				file = Core.config.publicPath + 'customtext.cfg';
				content = Core.io.getFileContent(file, null);
				if (content !== null) {
					lines = content.split('\n');
					line = (shutdown) ? 7 : 5;
					if (lines.length > line) customText = lines[line].replace('\r','');
				}
				if (!customText || customText === '') customText = L('CUSTOM_TEXT_NOT_FOUND');
				win.drawText(customText, 0, h-30, w, 30);
			}
		}
		win.endDrawing();
		// Model sniffing: call win.update() only for 600/x50
		if (standbyImage.color) {
			win.update();
		}
		// Restore settings
		win.setPenColor(oldPencolor);
		win.setTextStyle(oldTextStyle);
		win.setTextSize(oldTextSize);
		win.setTextAlignment(oldTextAlignmentX, oldTextAlignmentY);
	};
	
	
	var StandbyImage = {
		name: "StandbyImage",
		title: L("TITLE"),
		icon: "STANDBY",
		optionDefs: [
			{
			groupTitle: L('STANDBY_IMAGE'),
			groupIcon: 'STANDBY',
			optionDefs: [
				{
					name: "StandbyMode",
					title: L("STANDBY_IMG_KIND"),
					icon: "STANDBY",
					defaultValue: "standby",
					values: ["standby", "white", "black", "cover", "act_page", "calendar"],
					valueTitles: {
						"standby": L("VALUE_ORIGINAL_STANDBY"),
						"random": L("VALUE_RANDOM"),
						"white": L("VALUE_WHITE_SCREEN"),
						"black": L("VALUE_BLACK_SCREEN"),
						"cover": L("VALUE_COVER"),
						"act_page": L("VALUE_ACT_PAGE"),
						"calendar": L("VALUE_CALENDAR")
					}
				},
				{
					name: "DisplayStandbyIcon",
					title: L("DISPLAY_STANDBY_ICON"),
					icon: "STANDBY",
					defaultValue: "false",
					values: ["true", "false"],
					valueTitles: {
						"true": L("VALUE_TRUE"),
						"false": L("VALUE_FALSE")
					}
				},
				{
					name: "DisplayStandbyText",
					title: L("DISPLAY_STANDBY_TEXT"),
					icon: "ABC",
					defaultValue: "false",
					values: ["true", "false"],
					valueTitles: {
						"true": L("VALUE_TRUE"),
						"false": L("VALUE_FALSE")
					}
				},
			]},
			{
			groupTitle: L('SHUTDOWN_IMAGE'),
			groupIcon: 'SHUTDOWN',
			optionDefs: [
				{
					name: "ShutdownMode",
					title: L("SHUTDOWN_IMG_KIND"),
					icon: "SHUTDOWN",
					defaultValue: "white",
					values: ["standby", "white", "black", "cover", "calendar"],
					valueTitles: {
						"standby": L("VALUE_ORIGINAL_STANDBY"),
						"random": L("VALUE_RANDOM"),
						"white": L("VALUE_WHITE_SCREEN"),
						"black": L("VALUE_BLACK_SCREEN"),
						"cover": L("VALUE_COVER"),
						"calendar": L("VALUE_CALENDAR")
					}
				},
				{
					name: "DisplayShutdownIcon",
					title: L("DISPLAY_SHUTDOWN_ICON"),
					icon: "SHUTDOWN",
					defaultValue: "false",
					values: ["true", "false"],
					valueTitles: {
						"true": L("VALUE_TRUE"),
						"false": L("VALUE_FALSE")
					}
				},
				{
					name: "DisplayShutdownText",
					title: L("DISPLAY_SHUTDOWN_TEXT"),
					icon: "ABC",
					defaultValue: "false",
					values: ["true", "false"],
					valueTitles: {
						"true": L("VALUE_TRUE"),
						"false": L("VALUE_FALSE")
					}
				},
			]},
			{
				name: "dither",
				title: L("DITHER_IMAGE"),
				icon: "SETTINGS",
				defaultValue: "true",
				values: ["true", "false"],
				valueTitles: {
					"true": L("VALUE_TRUE"),
					"false": L("VALUE_FALSE")
				}
			},
		],
		onPreInit: function () {
			switch (Core.config.model) {
				case "505":
				case "300":
				case "600":
					this.optionDefs[0].optionDefs[0].values = ["random", "white", "black", "cover", "act_page", "calendar"];
					this.optionDefs[0].optionDefs[0].defaultValue = "white";
					this.optionDefs[1].optionDefs[0].values = ["random", "white", "black", "cover", "calendar"];
			}
		},
	}

	Core.addAddon(StandbyImage);
};
try {
	tmp();
} catch (e) {
	// Core's log
	log.error("in StandbyImage.js", e);
}
