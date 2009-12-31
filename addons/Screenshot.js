// Name: Screenshot
// Description: Allows to save screenshots as jpeg files
// Author: Kartu
//

var log = Utils.getLogger("Screenshot");

var str = {
	TITLE: "Screenshot",
	ACTION_TITLE: "Take a Screenshot",
	SAVING_TO: "Saving to ",
	OPT_SAVETO: "Save to",
	OPT_FEEDBACK: "Show save progress",
	MEMORY_STICK: "Memory Stick",
	FEEDBACK_ON: "on",
	FEEDBACK_OFF: "off",
	SD_CARD: "SD Card",
	INTERNAL_MEMORY: "Internal Memory"
};

var extension = ".jpg";
var getSavePath = function(root) {
	if(!FileSystem.getFileInfo(root)) {
		return false;
	}

	var d = new Date();
	var name = d.getFullYear() + "-" + (d.getMonth()+1) + "-" + d.getDate();
					
	if(!FileSystem.getFileInfo(root + name + extension)) {
		return name + extension;
	}
	
	var n = 0;
	while(FileSystem.getFileInfo(root + name + "_" + n + extension)) {
		n++;
	}
	
	return name + "_" + n + extension;
};

var Screenshot = {
	name: "PageIndex",
	title: str.TITLE,
	icon: "PICTURE",
	optionDefs: [
		{
			name: "saveTo",
			title: str.OPT_SAVETO,
			icon: "DB",
			defaultValue: "b:\\",
			values: ["a:\\", "b:\\", "/Data/"],
			valueTitles: {
				"a:\\": str.MEMORY_STICK,
				"b:\\": str.SD_CARD,
				"/Data/": str.INTERNAL_MEMORY
			}
		},
		{
			name: "showSaveProgress",
			title: str.OPT_FEEDBACK,
			icon: "PICTURE",
			defaultValue: true,
			values: [true, false],
			valueTitles: {
				"true": str.FEEDBACK_ON,
				"false": str.FEEDBACK_OFF
			}
		}
	],
	actions: [{
		name: "takeScreenshoot",
		title: str.ACTION_TITLE,
		group: "Utils",
		icon: "PICTURE",
		action: function() {
			try {
				log.trace("hey ya, screen	shot");
												
				var root = Screenshot.options.saveTo;
				var saveFilename = getSavePath(root);
				var savePath = root + saveFilename;
				
				// TODO check if saving is possible
				
				log.trace("saving to: " + savePath);
		
				var win = kbook.model.container.getWindow();
				var bitmap = win.getBitmap();
				var x,y,w,h;
				
				var stream = new Stream.File(savePath, 1);
				bitmap.writeJPEG(stream);
				stream.close();
				
				var showSaveProgress = Screenshot.options.showSaveProgress;
				if (showSaveProgress) {
					var bounds = win.getBounds();
					var width = bounds.width;
					var height = bounds.height;

					// TODO ugly
					var msg1 = str.SAVING_TO + Screenshot.optionDefs[0].valueTitles[root];
					var msg2 = saveFilename;

					win.setTextStyle("bold");
					win.setTextSize(24);
					
					var bounds1 = win.getTextBounds(msg1);
					var bounds2 = win.getTextBounds(msg2);
					
					var gap = 20;
					w = Math.max(bounds1.width, bounds2.width) + gap*2; 
					h = bounds1.height + bounds2.height + gap*3;

					x = Math.max(0, (width - w)/2);
					y = Math.max(0, (height - h)/2);
					
					win.beginDrawing();
					win.setPenColor(Color.white);
					win.fillRectangle(x, y, w, h);										
					win.setPenColor(Color.black);
					win.frameRectangle(x, y, w, h);
					win.frameRectangle(x+1, y+1, w-2, h-2);
					win.drawText(msg1, x + gap, y + gap, bounds1.width, bounds1.height);
					win.drawText(msg2, x + gap, y + gap*2 + bounds1.height, bounds2.width, bounds2.height);
					win.endDrawing();
					
					var timer = new Timer();
					timer.onCallback = function() {
						win.invalidate(x, y, w, h);
						timer.close();
						timer = null;
					}
					timer.schedule(2000);
				}
				
			} catch (e) {
				log.error("in takeScreenshot action: " + e);
			}
		}
	}]
};

return Screenshot;
