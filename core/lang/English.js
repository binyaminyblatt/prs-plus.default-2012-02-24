// Description: English localization
// Author: kartu
//
// Language: English
//
return {	
	// PRS+ stuff
	MenuCaptions: {
		TITLE: "Menu Captions",
		TITLE_COMMENT: "Allows to choose menu caption style",
		OPTION_STYLE: "Menu Captions Style",
		VALUE_SONY_DEFAULT: "Sony default",
		VALUE_ALWAYS_SMALL: "Always small",
		VALUE_ALWAYS_BIG: "Always big"
	},
	
	TextEncoding: {
		TITLE: "Text Encoding",
		COMMENT: "Affects books in TXT,RTF format, requires restart",
		OPTION_TITLE: "Encoding",
		DESCRIPTION: "Allows to choose menu caption style",
		LATIN: "Latin",
		RUSSIAN:  "Russian (win1251)"
	},
	
	KeyBindings: {
		TITLE: "Key Bindings",
		DESCRIPTION: "Allows to bind actions to keys",
		
		DEFAULT_VALUE: "default",
		
		// Contexts
		GLOBAL:  "Global",
		IN_MENU: "When in menu",
		IN_BOOK:  "When reading book",
		
		// Button groups
		NUM_BUTTONS: "Numeric Buttons",
		JP_BUTTONS: "Joypad Buttons",
		OTHER_BUTTONS: "Other Buttons",
		VOLUME_BUTTONS: "Volume Buttons",
		
		// Buttons
		BN_SIZE: "Size button",
		BN_BOOKMARK: "Bookmark button",
		BN_BL_NEXT: "Bottom left 'next'",
		BN_BL_PREVIOUS: "Bottom left 'previous'",
		BN_SB_NEXT: "Sidebar 'next'",
		BN_SB_PREVIOUS:  "Sidebar 'previous'",
		BN_MENU: "Menu button",
		BN_JP_LEFT: "Joypad left",
		BN_JP_RIGHT: "Joypad right",
		BN_JP_UP: "Joypad up",
		BN_JP_DOWN: "Joypad down",
		BN_JP_CENTER: "Joypad center",
		BN_H_SIZE: "Holding size button",
		BN_H_BOOKMARK: "Holding bookmark button",
		BN_H_BL_NEXT: "Holding bottom left 'next page'",
		BN_H_BL_PREVIOUS: "Holding bottom left 'previous page'",
		BN_H_MENU: "Holding menu button",
		BN_H_SB_NEXT: "Holding sidebar 'next page'",
		BN_H_SB_PREVIOUS: "Holding sidebar 'previous page'",
		BN_H_JP_CENTER: "Holding joypad center button",
		BN_H_1: "Hold 1",
		BN_H_2: "Hold 2",
		BN_H_3: "Hold 3",
		BN_H_4: "Hold 4",
		BN_H_5: "Hold 5",
		BN_H_6: "Hold 6",
		BN_H_7: "Hold 7",
		BN_H_8: "Hold 8",
		BN_H_9: "Hold 9",
		BN_H_0: "Hold 0",
		BN_VOLUME_DOWN: "Volume-",
		BN_H_VOLUME_DOWN: "Hold Volume-",
		BN_VOLUME_UP: "Volume+",
		BN_H_VOLUME_UP: "Hold Volume+",
		
		// Actions
		ACTION_SHUTDOWN: "Shutdown",
		ACTION_NEXT_PAGE: "Next Page",
		ACTION_PREVIOUS_PAGE: "Previous Page",
		ACTION_NEXT_IN_HISTORY: "Next in History",
		ACTION_PREVIOUS_IN_HISTORY: "Previous in History",
		ACTION_PREVIOUS_SONG: "Previous Song",
		ACTION_NEXT_SONG: "Next Song"
	},
	
	Screenshot: {
		TITLE: "Screenshot",
		ACTION_TITLE: "Take a Screenshot",
		SAVING_TO: "Saving to ",
		FAILED_TO_SAVE: "Failed to save",
		OPT_SAVETO: "Save to",
		OPT_FEEDBACK: "Show save progress",
		MEMORY_STICK: "Memory Stick",
		FEEDBACK_ON: "on",
		FEEDBACK_OFF: "off",
		SD_CARD: "SD Card",
		INTERNAL_MEMORY: "Internal Memory"
	},
	
	BrowseFolders: {
		TITLE:  "Browse Folders",
		OPTION_SORTING_MODE: "Sorting mode",
		VALUE_BY_TITLE: "By title",
		VALUE_BY_AUTHOR_THEN_TITLE: "By author then title",
		VALUE_BY_AUTHOR_SWAPPING: "By author swapping name/surname",
		VALUE_BY_FILENAME: "By filename",
		OPTION_TITLE_SORTER: "Use titleSorter field, when sorting",
		ENABLED: "enabled",
		DISABLED: "disabled",
		OPTION_IM_ROOT: "Internal memory root folder",
		OPTION_CARD_SCAN: "SD/MS card scan",
		OPTION_MOUNT: "Use mount with SD/MS (experimental)",
		NODE_RESCAN_INTERNAL_MEMORY: "Rescan internal memory",
		NODE_COPY_TO_INTERNAL_MEMORY: "Copy to internal memory",
		NODE_COPY_TO_INTERNAL_MEMORY_COMMENT: "Copies file to the internal memory root",
		NODE_COPY_AND_RESCAN: "Copy & Rescan internal memory",
		NODE_COPY_AND_RESCAN_COMMENT: "Copies file to the internal memory root and rescans books",
		ERROR_TARGET_EXISTS: "Error, target file exists",
		NODE_AUDIO_AND_PICTURES: "Audio & Pictures",
		NODE_BROWSE_FOLDERS: "Browse Folders",
		NODE_BROWSE_FOLDERS_COMMENT: "Browse the file system",
		NODE_INTERNAL_MEMORY: "Internal Memory",
		NODE_MEMORY_STICK: "Memory Stick",
		NODE_MEMORY_STICK_MOUNT: "Memory Stick via mount",
		NODE_SD_CARD: "SD Card",
		NODE_SD_CARD_MOUNT: "SD Card via mount",
		NODE_GAMES_AND_UTILITIES: "Games & Utilities"
	},
	
	Clock: {
		OPTION_STYLE: "Clock Style",
		VALUE_24H: "24 hours",
		VALUE_12H: "12 hours",
		OPTION_MODE: "Clock Mode",
		VALUE_ALWAYS_SHOWN: "Always shown",
		VALUE_SHOWN_ONLY_IN_MENU: "Shown only in menu",
		VALUE_SHOWN_WHEN_READING: "Shown only when reading",
		VALUE_OFF: "OFF",
		ACTION_TOGGLE_CLOCK: "Toggle Clock",
		AM: "am",
		PM: "pm"
	},
	
	PageIndex: {
		TITLE: "Page Index",
		INDEX_STYLE_BOOK: "Index style in books",
		INDEX_MODE_BOOK: "Index mode in books",
		INDEX_MODE_MENU: "Index mode in menu",
		INDEX_STYLE_MENU: "Index style in menu",
		OF: "of",
		ALWAYS_SHOWN: "Always shown",
		NEVER_SHOWN: "Never shown",
		NOT_SHOWN_IF_SINGLE_PAGE: "Not shown on single pages"
	},
	
	EpubUserStyle: {
		TITLE: "EPUB User Style",
		COMMENT: "Experimental, affects only books opened afterwards",
		OPTION_EPUB_CSS_FILE: "User EPUB css file",
		VALUE_DISABLED: "disabled"
	}
};
