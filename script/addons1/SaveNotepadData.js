// Name: SaveNotepadData
// Models: 600 and x50 series
//
// Description: Allows user to save data from notes
//
// Author: Ben Chenoweth
//
// History:
//	2011-11-23 Ben Chenoweth - Initial version

tmp = function() {
	var L, log, oldNotepadDataSave, oldNotepadFreehandDataSave;
	L = Core.lang.getLocalizer("Screenshot");
	log = Core.log.getLogger("SaveNotepadData");
		
	// save Text Memo as TXT file
	oldNotepadDataSave = kbook.notepadData.save;
	kbook.notepadData.save = function () {
		var folder, media, name, path, ret;
		folder = SaveNotepadData.options.saveTo + "Notepads/";
		FileSystem.ensureDirectory(folder);		
		try {
			media = this.media;
			if (media) {				
				if ((media.type == 'text') && (SaveNotepadData.options.saveTextMemo == 'on')) {
					name = media.path.substring(media.path.lastIndexOf('/') + 1);
					path = folder + name + ".txt";
					Core.io.setFileContent(path, media.note.text);
				}
			}
		} catch (e) { log.trace("Save failed!"); }
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
		icon: "PICTURE_ALT",
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