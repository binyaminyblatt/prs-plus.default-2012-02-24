// Name: bootstrap 350
// Description: Sony PRS-350 bootstrap code
//
//	Receives the following parameters: 
//		Core, bootLog, loadCore, loadAddons, getFileContent, compatPath
//		must call loadAddons, loadCore and Core.init at appropriate times
//
// History:
//	2011-01-12 kartu - Initial version, based on 600
//	2011-02-06 kartu - Fixed #64 "Wrong german translation file"
//	2011-02-07 kartu - Implemented #? possibility to download files using web browser
//	2011-02-08 kartu - Deleted irrelevant "fixTimeZones" code
//	2011-02-09 kartu - Fixed # Text Memo open => press root leads to reboot
//	2011-02-10 kartu - Implemented # Russian phonetic keyboard (keyboard xml by boroda)
//	2011-02-26 kartu - Refactored, moved code common to x50 models into common_x50.js
//	2011-02-27 kartu - Refactored parameters into PARAMS object
//	2011-07-04 Mark Nord - Added #24 "Displaying first page of the book on standby" based on code found by Ben Chenoweth
//	2011-07-06 Ben Chenoweth - Minor fix to StandbyImage (mime not needed)
//	2011-08-18 Mark Nord - fixed current page as StandbyImage + display of localised "sleeping.." instead of the clock
//	2011-10-04 quisvir - Always show book covers in portrait mode and keep aspect ratio
//
//-----------------------------------------------------------------------------------------------------
// Localization related code is model specific.  
// Replacing default  "choose language" menu & "choose keyboard" menu
//-----------------------------------------------------------------------------------------------------


var tmp = function() {

	// Standby image
	var orgOrientation = 0;
	
	var oldStandbyImageDraw = standbyImage.draw;
	standbyImage.draw = function() {
		var window, ditheredBitmap, temp, port, x, y, bounds, ratio, width, height;
		var newpath, newbitmap, mode, dither, oldTextStyle, oldTextSize, oldPenColor, L;
		window = this.root.window;
		mode = Core.addonByName.StandbyImage.options.mode;
		dither = Core.addonByName.StandbyImage.options.dither === "true";		
		if (mode === 'cover') {
				try {
					// attempt to use current book cover
					newpath = kbook.model.currentBook.media.source.path + kbook.model.currentBook.media.path;
					newbitmap = BookUtil.thumbnail.createFileThumbnail(newpath, this.width, this.height);
					temp = new Bitmap(this.width, this.height, 12);
					port = new Port(temp);
					port.setPenColor(Color.black);
					port.fillRectangle(0, 0, this.width, this.height);
					x = 0;
					y = 0;
					bounds = newbitmap.getBounds();
					ratio = (bounds.height > bounds.width)?(this.height / bounds.height):(this.width / bounds.width);
					width = Math.floor(bounds.width * ratio);
					height = Math.floor(bounds.height * ratio);
					if (height > width) x = Math.floor((this.width - width) / 2);
					else y = Math.floor((this.height - height) / 2);
					newbitmap.draw(port, x, y, width, height);
					newbitmap.close();
					ditheredBitmap = temp.dither(true);
					port.close();
					temp.close();
					if (ditheredBitmap) {
						window.drawBitmap(ditheredBitmap, this.x, this.y, this.width, this.height);
						ditheredBitmap.close();
					}
        		} catch (ignore) {}
		}
		if (!newbitmap && mode !== 'act_page') oldStandbyImageDraw.apply(this);
		else if (mode === 'act_page') {
				L = Core.lang.getLocalizer("StandbyImage");
				// Save old styles
				oldTextStyle = window.getTextStyle();
				oldTextSize = window.getTextSize();
				oldPenColor = window.getPenColor();
				// Settings
				window.setTextStyle("bold");
				window.setTextSize(22);
				// Drawing
				window.beginDrawing();
				window.setPenColor(Color.black);
				window.fillRectangle(445, 770, 155, 30);
				window.setPenColor(Color.white);
				window.drawText(L("VALUE_SLEEPING"), 455, 770, 135, 30);				
				window.endDrawing();
				// Restore pen color, text size & style
				window.setTextStyle(oldTextStyle);
				window.setTextSize(oldTextSize);
				window.setPenColor(oldPenColor);
		}
	};

	// Set orientation to portrait before showing book cover
	oldSuspend = kbook.model.suspend;
	kbook.model.suspend = function () {
		oldSuspend.apply(this, arguments);
		if (Core.addonByName.StandbyImage.options.mode == 'cover') orgOrientation = ebook.device.framebuffer.orientation.getCurrent();
		if (orgOrientation !== 0) ebook.device.framebuffer.orientation.setCurrent(0);
	}
	
	// Restore orientation if necessary
	oldResume = kbook.model.resume;
	kbook.model.resume = function () {
		if (orgOrientation !== 0) ebook.device.framebuffer.orientation.setCurrent(orgOrientation);
		orgOrientation = 0;
		oldResume.apply(this, arguments);
	}
	
	// Workaround for # Text Memo open => press root leads to reboot
	kbook.kbookNotepad.exit = function(param) {
		var note = this.note;
		this.note = null;
		if (note && note.type === "text" && note.newbie) {
			return;
		}
		this.bubble('doMenuClose');
	};
	
	// Call code common to x50 models	
	try {
		var f = new Function("PARAMS", PARAMS.getFileContent(PARAMS.compatPath + "common_350_650_950.js"));
		PARAMS.langNodeIndex = 3;
		PARAMS.keyboardNodeIndex = 4;
		f(PARAMS);
	} catch (ee) {
		PARAMS.bootLog("error calling common x50 " + ee);
	}
};

try {
	tmp();
} catch (ignore) {
}
