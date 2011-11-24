// Name: SaveNotepadData
// Models: 600 and x50 series
//
// Description: Allows user to save data from notes
//
// Author: Ben Chenoweth
//
// History:
//	2011-11-23 Ben Chenoweth - Initial version
//  2011-11-24 Ben Chenoweth - Added saving Handwriting as SVG and JPG

tmp = function() {
	var L, log, oldNotepadDataSave, oldNotepadFreehandDataSave;
	L = Core.lang.getLocalizer("Screenshot");
	log = Core.log.getLogger("SaveNotepadData");

	oldNotepadDataSave = kbook.notepadData.save;
	kbook.notepadData.save = function () {
		var folder, media, name, path, ret, width, height, stream, chr34, tab, svg, count, x, points, maker, bitmap, stream;
		folder = SaveNotepadData.options.saveTo + "Notepads/";
		FileSystem.ensureDirectory(folder);		
		try {
			media = this.media;
			if (media) {				
				if ((media.type === 'text') && (SaveNotepadData.options.saveTextMemo === 'on')) {
					try {
						name = media.path.substring(media.path.lastIndexOf('/') + 1);
						path = folder + name + ".txt";
						Core.io.setFileContent(path, media.note.text);
					} catch (e) { log.error("Save as TXT failed!"); }
				}
				if ((media.type === 'drawing') && (SaveNotepadData.options.saveHandwritingSVG === 'on')) {
					try {
						name = media.path.substring(media.path.lastIndexOf('/') + 1);
						path = folder + name + ".svg";
						if (FileSystem.getFileInfo(path)) FileSystem.deleteFile(path);
						width = parseInt(media.note.drawing.width);
						height = parseInt(media.note.drawing.height);
						stream = new Stream.File(path, 1);
						chr34 = String.fromCharCode(34); // "
						tab = String.fromCharCode(9); // TAB
						stream.writeLine("<?xml version="+chr34+"1.0"+chr34+" encoding="+chr34+"utf-8"+chr34+" ?>");
						stream.writeLine("<svg width="+chr34+width+chr34+" base="+chr34+"undefined"+chr34+" shape-rendering="+chr34+"optimizeQuality"+chr34+" height="+chr34+height+chr34+" transform="+chr34+chr34+">");
						svg = media.note.drawing.pages[0].svg.contents;
						count = svg.length;
						for (x=0; x<count; x++) {
							points = svg[x].points.toString();
							points=points.replace("x: ","");
							points=points.replace("y: ","");
							points=points.replace(", ",",");
							points=points.replace("},{"," ");
							points=points.replace("{","");
							points=points.replace("}"," ");
							stream.writeLine(tab+"<polyline points="+chr34+points+chr34+" fill="+chr34+"none"+chr34+" shape-rendering="+chr34+"geometricPrecision"+chr34+" stroke="+chr34+"black"+chr34+" fill-rule="+chr34+"nonzero"+chr34+" stroke-linejoin="+chr34+"miter"+chr34+" stroke-linecap="+chr34+"butt"+chr34+" stroke-width="+chr34+"2.5"+chr34+"/>");
						}
						stream.writeLine("</svg>");
						stream.close();
					} catch (e) { log.error("Save as SVG failed!"); }
				}
				if ((media.type === 'drawing') && (SaveNotepadData.options.saveHandwritingJPG === 'on')) {
					try {
						name = media.path.substring(media.path.lastIndexOf('/') + 1);
						path = folder + name + ".jpg";
						if (FileSystem.getFileInfo(path)) FileSystem.deleteFile(path);
						svg = media.note.drawing.pages[0].svg;
						width = parseInt(media.note.drawing.width);
						height = parseInt(media.note.drawing.height);
						maker = BookUtil.thumbnail.notepadThumbnailMaker;					
						bitmap = maker.makeThumbnail(new Bitmap(width, height), svg, width, height, true);
						stream = new Stream.File(path, 1);
						bitmap.writeJPEG(stream);
						stream.close();
						// Add image to the library
						try {
							Core.media.loadMedia(path);
							// Update nodes so that new image is visible
							kbook.root.update();
						} catch (ignore) { }
					} catch (e) { log.error("Save as JPG failed!"); }
				}

			}
		} catch (e) { log.error("Save failed!"); }
		ret = oldNotepadDataSave.apply(this);
		return ret;
	}
	
	var saveToValueTitles = {
		"a:/": L("MEMORY_STICK"),
		"b:/": L("SD_CARD"),
		"/Data/": L("INTERNAL_MEMORY")
	};
	
	var SaveNotepadData = {
		name: "SaveNotepadData",
		title: L("SAVE_NOTEPAD_TITLE"),
		icon: "TEXT_MEMO",
		optionDefs: [
			{
				name: "saveTextMemo",
				title: L("SAVE_TEXT_MEMO"),
				icon: "TEXT_MEMO",
				defaultValue: "off",
				values: ["on", "off"],
				valueTitles: {
					"on": L("FEEDBACK_ON"),
					"off": L("FEEDBACK_OFF")
				}
			},
			{
				name: "saveHandwritingSVG",
				title: L("SAVE_HANDWRITING"),
				icon: "HANDWRITING_ALT",
				defaultValue: "off",
				values: ["on", "off"],
				valueTitles: {
					"on": L("FEEDBACK_ON"),
					"off": L("FEEDBACK_OFF")
				}
			},
			{
				name: "saveHandwritingJPG",
				title: L("SAVE_HANDWRITING_JPG"),
				icon: "HANDWRITING_ALT",
				defaultValue: "off",
				values: ["on", "off"],
				valueTitles: {
					"on": L("FEEDBACK_ON"),
					"off": L("FEEDBACK_OFF")
				}
			}
		],
		onPreInit: function() {
			if (Core.config.compat.hasCardSlots) {
				SaveNotepadData.optionDefs.push({
					name: "saveTo",
					title: L("OPT_SAVETO"),
					icon: "DB",
					defaultValue: "/Data/",
					values: ["a:/", "b:/", "/Data/"],
					valueTitles: saveToValueTitles
				});
			}
		},
		onInit: function() {
			if (!Core.config.compat.hasCardSlots) {
				SaveNotepadData.options.saveTo = "/Data/";
			}
		}
	};

	Core.addAddon(SaveNotepadData);	
};
try {
	tmp();
} catch (e) {
	// Core's log
	log.error('in SaveNotepadData.js', e);
}