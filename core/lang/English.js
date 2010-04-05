// Description: English localization
// Author: kartu
//
// Language: English
//
return {
	// Standard stuff
	Sony: {
		// USB connected
		DO_NOT_DISCONNECT: "Do not disconnect",
		USB_CONNECTED: "USB connected",
		DEVICE_LOCKED: "Device locked",

		// About, translate either all or none
		ABOUT_PRSP: "PRS+ Script: @@@script@@@\n" +
			"PRS+ Firmware: @@@firmware@@@\n" +
			"Author: Mikheil Sukhiashvili aka kartu (kartu3@gmail.com) using work of: " + 
			"igorsk, boroda, obelix, pepak, llasram and others.\n" +
			"© GNU Lesser General Public License.",
		ABOUT_1: "Copyright ©2006-2008 Sony Corporation",
		ABOUT_2: "Adobe, the Adobe logo, Reader and PDF are either registered trademarks or" + 
			" trademarks of Adobe Systems Incorporated in the United States and/or other countries.",
		ABOUT_3: "MPEG Layer-3 audio coding technology and patents licensed by Fraunhofer IIS and Thomson." + 
			" MPEG-4 AAC audio coding technology licensed by Fraunhofer IIS (www.iis.fraunhofer.de/amm/).",
		ABOUT_4: "Application software designed and implemented by Kinoma (www.kinoma.com). Portions Copyright ©2006,2007 Kinoma, Inc.",
		ABOUT_5: "Bitstream is a registered trademark, and Dutch, Font Fusion, and Swiss are trademarks, of Bitstream, Inc.",
		ABOUT_6: "Portions of this software are Copyright ©2005 The FreeType Project (www.freetype.org). All rights reserved.",
		ABOUT_7: "This software is based in part on the work of the Independent JPEG Group.",
		AUTHORIZED_SONY: "Authorized for the eBook Store.",
		NOT_AUTHORIZED_SONY: "Not authorized for the eBook Store.",
		AUTHORIZED_ADOBE: "This device is authorized for Adobe DRM protected content.",
		NOT_AUTHORIZED_ADOBE: "This device is not authorized for Adobe DRM protected content.",
		SONY_FW_VERSION: "Version",
		DEVICE_ID: "Device",
		
		// Mime & card names
		RICH_TEXT_FORMAT: "Rich Text Format",
		ADOBE_PDF: "Adobe PDF",
		EPUB_DOCUMENT: "EPUB document",
		BBEB_BOOK: "BBeB Book",
		PLAIN_TEXT: "Plain text",
		INTERNAL_MEMORY: "Internal memory",
		MEMORY_STICK: "Memory Stick",
		SD_CARD: "SD Memory",
		
		// Main.xml & kbook.so stuff
		INVALID_FORMAT: "Invalid Format!",
		FORMATTING: "Formatting...",
		LOADING: "Loading...",
		LOW_BATTERY: "Low Battery!",
		HR_WARNING: "Do you want to DELETE all content, restore all factory settings, and clear the DRM authorization state?\n\nYes - Press 5\nNo - Press MENU",
		DEVICE_SHUTDOWN: "Device Shutdown",
		PRESS_MARK_TO_SHUTDOWN: "Press MARK to shutdown",
		THIS_DEVICE: "this device.",
		PRESS_MARK_TO_DELETE: "Press MARK to",
		THIS_BOOK: "delete book.",
		FORMAT_INTERNAL_MEMORY: "Format Internal Memory",
		PRESS_MARK_TO_FORMAT: "Press MARK to format",
		MSG_INTERNAL_MEMORY: "internal memory.",
		RESTORE_DEFAULTS: "Restore Defaults",
		PRESS_MARK_TO_RESTORE: "Press MARK to restore",
		DEFAULT_SETTINGS: "default settings.",
		UPPER_PAGE: "PAGE",
		ONE_OF_ONE: "1 of 1",
		NO_BATTERY: "No battery!",
		FORMATTING_INTERNAL_MEMORY: "Formatting Internal Memory...",
		SHUTTING_DOWN: "Shutting down...",
		
		// Root menu
		CONTINUE: "Continue Reading",
		BOOKS_BY_TITLE: "Books by Title",
		BOOKS_BY_AUTHOR: "Books by Author",
		BOOKS_BY_DATE: "Books by Date",
		COLLECTIONS: "Collections",
		ALL_BOOKMARKS: "All Bookmarks",
		NOW_PLAYING: "Now Playing",
		MUSIC: "Music",
		PICTURES: "Pictures",
		SETTINGS: "Settings",

		// In Settings
		// orientation
		ORIENTATION: "Orientation",
		HORIZONTAL: "Horizontal",
		VERTICAL: "Vertical",
		// set date
		SET_DATE: "Set Date",
		YEAR: "Year",
		MONTH: "Month",
		DATE: "Date", // Day
		HOUR: "Hour",
		MINUTE: "Minute",
		// slideshow
		SLIDESHOW: "Slideshow",
		SS_ON: "On",
		SS_OFF: "Off",
		SS_TURN: "Turn",
		SS_DURATION: "Duration",
		SECONDS: "Seconds",
		// auto standby (aka sleep mode)
		AUTOSTANDBY: "Sleep Mode",
		AS_ON: "On",
		AS_OFF: "Off",
		AS_TURN: "Turn",
		// about
		ABOUT: "About",
		// reset to factory settings
		RESET_TO_FACTORY: "Reset to factory settings",
		
		// In Advanced Settings
		ADVANCED_SETTINGS: "Advanced Settings",
		// screen lock (aka device lock)
		SCREEN_LOCK: "Device Lock",
		SL_OFF: "Off",
		SL_ON: "On",
		SL_CODE: "Code",
		SL_TURN: "Turn",
		// format device
		FORMAT_DEVICE: "Format Device",
		
		// In Book menu
		BEGIN: "Begin",
		END: "End",
		BOOKMARKS: "Bookmarks",
		CONTENTS: "Contents",
		HISTORY: "History",
		INFO: "Info",
		UTILITIES: "Utilities",
		
		// In Book Utilities
		REMOVE_ALL_BOOKMARKS: "Remove All Bookmarks",
		CLEAR_HISTORY: "Clear History",
		DELETE_BOOK: "Delete Book",
		
		// In Books by Date
		TODAY: "Today",
		EARLIER_THIS_WEEK: "Earlier This Week",
		LAST_WEEK: "Last Week",
		EARLIER_THIS_MONTH: "Earlier This Month",
		LAST_MONTH: "Last Month",
		EARLIER_THIS_QUARTER: "Earlier This Quarter",
		LAST_QUARTER: "Last Quarter",
		EARLIER_THIS_YEAR: "Earlier This Year",
		LAST_YEAR: "Last Year",
		OLDER: "Older",		
		
		PAGE: "Page",
		PART: "Part",
		OF: "of",
		NO_BOOK: "No book",
		NO_SONG: "No song",

		// Info title strings, comma separated, no spaces after comma
		INFO_TITLES: "Cover,Title,Author,Publisher,Category,eBook ID,Kind,Date,Size,Location,File,Digital Rights,Expires",
		
		// Titles and criterions for "Books by Title" and "Books by Folder"
		// title is displayed, "criterion" is used for sorting.
		//
		// NOTE: if localization doesn't need custom Books by sorting, just remove CUSTOM_SORT, TITLE_*, CRITERION_* items
		CUSTOM_SORT: true, 
		TITLE_1: "0-9",
		CRITERION_1: "0123456789",
		TITLE_2: "A B C",
		CRITERION_2: "ABCabc",
		TITLE_3: "D E F",
		CRITERION_3: "DEFdef",
		TITLE_4: "G H I",
		CRITERION_4: "GHIghi",
		TITLE_5: "J K L",
		CRITERION_5: "JKLjkl",
		TITLE_6: "M N O",
		CRITERION_6: "MNOmno",
		TITLE_7: "P Q R S",
		CRITERION_7: "PQRSpqrs",
		TITLE_8: "T U V W",
		CRITERION_8: "TUVWtuvw",
		TITLE_9: "X Y Z",
		CRITERION_9: "WXYZwxyz",
		TITLE_0: "Other",
		CRITERION_0: "",

		// Utility function, no need to localize
		toDoubleDigit: function (num) {
			if (num < 10) {
				return "0" + num;
			} else {
				return num;
			}
		},
		FUNC_GET_DATE_TIME: function (date) {
			return this.FUNC_GET_DATE(date) + " " + this.FUNC_GET_TIME(date);
		},
		FUNC_GET_DATE: function (date) {
			var day, month, year;
			day = this.toDoubleDigit(date.getDate());
			month = this.toDoubleDigit(date.getMonth() + 1); 
			year = date.getFullYear();
			// Replace to the date format is corresponding language
			return month + "/" + day + "/" + year;
		},
		FUNC_GET_TIME: function (date) {
			var hour, minute;
			hour = this.toDoubleDigit(date.getHours());
			minute = this.toDoubleDigit(date.getMinutes());
			return hour + ":" + minute;
		},
		FUNC_X_PAGES: function (n) {
			return this.FUNC_X_SOMETHING(n, "pages", "1 page", "No page");
		},
		FUNC_X_ITEMS: function (n) {
			return this.FUNC_X_SOMETHING(n, "items", "1 item", "No item");
		},
		FUNC_X_SETTINGS: function (n) {
			return this.FUNC_X_SOMETHING(n, "settings", "1 setting", "No setting");
		},
		FUNC_X_PICTURES: function (n) {
			return this.FUNC_X_SOMETHING(n, "pictures", "1 picture", "No picture");
		},
		FUNC_X_SONGS: function (n) {
			return this.FUNC_X_SOMETHING(n, "songs", "1 song", "No song");
		},
		FUNC_X_BOOKMARKS: function (n) {
			return this.FUNC_X_SOMETHING(n, "bookmarks", "1 bookmark", "No bookmark");
		},
		FUNC_X_COLLECTIONS: function (n) {
			return this.FUNC_X_SOMETHING(n, "collections", "1 collection", "No collection");
		},
		FUNC_X_BOOKS: function (n) {
			return this.FUNC_X_SOMETHING(n, "books", "1 book", "No book");
		},
		FUNC_X_SOMETHING: function (n, many, one, zero) {
			if (n > 1) {
				return n + " " + many;
			} else if (n == 1) {
				return one;
			} else {
				return zero;
			}
		}
	},
	
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
