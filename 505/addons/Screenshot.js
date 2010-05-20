// Name: Screenshot
// Description: Allows to save screenshots as jpeg files
// Author: kartu
//
// History:
//	2010-03-07 kartu - #Prepared for localization (refactored to use L function)
//	2010-03-14 kartu - #Refactored Utils -> Core
//	2010-03-14 kartu - Localized
//	2010-04-17 kartu - Moved global vars into local functions context
//	2010-04-23 kartu - Fixed: tmp() function wasn't called
//	2010-04-24 kartu - Prepared for merging into single JS
//	2010-04-25 kartu - Made timer a local variable
//	2010-05-20 kartu - Fixed addon name (affects settings)

// dummy function, to avoid introducing global vars
tmp = function() {
	var L = Core.lang.getLocalizer("Screenshot");
	var log = Core.log.getLogger("Screenshot");
	var timer;
	
	var extension = ".jpg";
	var getSavePath = function (root) {
		if (!FileSystem.getFileInfo(root)) {
			return false;
		}
	
		var d = new Date();
		var name = d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate();
						
		if (!FileSystem.getFileInfo(root + name + extension)) {
			return name + extension;
		}
		
		var n = 0;
		while (FileSystem.getFileInfo(root + name + "_" + n + extension)) {
			n++;
		}
		
		return name + "_" + n + extension;
	};
	
	var Screenshot = {
		name: "Screenshot",
		title: L("TITLE"),
		icon: "PICTURE",
		optionDefs: [
			{
				name: "saveTo",
				title: L("OPT_SAVETO"),
				icon: "DB",
				defaultValue: "b:\\",
				values: ["a:\\", "b:\\", "/Data/"],
				valueTitles: {
					"a:\\": L("MEMORY_STICK"),
					"b:\\": L("SD_CARD"),
					"/Data/": L("INTERNAL_MEMORY")
				}
			},
			{
				name: "showSaveProgress",
				title: L("OPT_FEEDBACK"),
				icon: "PICTURE",
				defaultValue: "on",
				values: ["on", "off"],
				valueTitles: {
					"on": L("FEEDBACK_ON"),
					"off": L("FEEDBACK_OFF")
				}
			}
		],
		getTimer: function () {
			if (typeof timer == "undefined") {
				timer = new Timer();
				timer.target = this;
			}
			return timer;
		},
		actions: [{
			name: "takeScreenshoot",
			title: L("ACTION_TITLE"),
			group: "Utils",
			icon: "PICTURE",
			action: function () {
				try {
					var root = Screenshot.options.saveTo;
					var saveFilename = getSavePath(root);
					var savePath = root + saveFilename;
					
					var win = kbook.model.container.getWindow();
					var bitmap = win.getBitmap();
					var x, y, w, h;
									
					var stream;
					var msg1, msg2;
					try {
						stream = new Stream.File(savePath, 1);
						bitmap.writeJPEG(stream);
						stream.close();
					} catch (ee) {
						msg1 = L("SAVING_TO") + Screenshot.optionDefs[0].valueTitles[root];					
						msg2 = L("FAILED_TO_SAVE");
					}
					
					var showSaveProgress = Screenshot.options.showSaveProgress;
					if (showSaveProgress === "on") {
						var bounds = win.getBounds();
						var width = bounds.width;
						var height = bounds.height;
	
						if (typeof msg1 === "undefined") {
							// FIXME ugly
							msg1 = L("SAVING_TO") + Screenshot.optionDefs[0].valueTitles[root];
							msg2 = saveFilename;
						}
	
						win.setTextStyle("bold");
						win.setTextSize(24);
						
						var bounds1 = win.getTextBounds(msg1);
						var bounds2 = win.getTextBounds(msg2);
						
						var gap = 20;
						w = Math.max(bounds1.width, bounds2.width) + gap * 2; 
						h = bounds1.height + bounds2.height + gap * 3;
	
						x = Math.max(0, (width - w) / 2);
						y = Math.max(0, (height - h) / 2);
						
						win.beginDrawing();
						win.setPenColor(Color.white);
						win.fillRectangle(x, y, w, h);
						win.setPenColor(Color.black);
						win.frameRectangle(x, y, w, h);
						win.frameRectangle(x + 1, y + 1, w - 2, h - 2);
						win.drawText(msg1, x + gap, y + gap, bounds1.width, bounds1.height);
						win.drawText(msg2, x + gap, y + gap * 2 + bounds1.height, bounds2.width, bounds2.height);
						win.endDrawing();
	
						var timer = Screenshot.getTimer();
						timer.onCallback = function (delta) {
							win.invalidate(x, y, w, h);
						};
						timer.schedule(1000);
					}
					
				} catch (e) {
					log.error("in takeScreenshot action: " + e);
				}
			}
		}]
	};

	Core.addAddon(Screenshot);
};
try {
	tmp();
} catch (e) {
	// Core's log
	log.error("in Screenshot.js", e);
}