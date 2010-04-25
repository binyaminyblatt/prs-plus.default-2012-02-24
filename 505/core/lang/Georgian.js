// Language: Georgian
//
// History:
//	2010-04-24 kartu - Added TITLE for "clock" addon
//	2010-04-24 kartu - Fixed spelling of CONTINUE
//	2010-04-24 kartu - Fixed spelling
//	2010-04-25 kartu - Translated more stuff
return {
	// Standard stuff
	Sony: {
		// USB connected
		DO_NOT_DISCONNECT: "არ გამორთოთ",
		USB_CONNECTED: "USB მიერთებულია",
		DEVICE_LOCKED: "წიგნი დალუქულია",

		// About, translate either all or none
		ABOUT_PRSP: "PRS+ Script: @@@script@@@\n" +
			"PRS+ Firmware: @@@firmware@@@\n" +
			"ავტორი: მიხეილ სუხიაშვილი aka kartu (kartu3@gmail.com) using work of: " + 
			"igorsk, boroda, obelix, pepak, llasram და სხვები.\n" +
			"© GNU Lesser General Public License.",
		ABOUT_1: "Copyright ©2006-2008 Sony Corporation",
		ABOUT_2: "Adobe, the Adobe logo, Reader and PDF are either registered trademarks or" + 
			" trademarks of Adobe Systems Incorporated in the United States and/or other countries.",
		ABOUT_3: "MPEG Layer-3 audio coding technology and patents licensed by Fraunhofer IIS and Thomson." + 
			" MPEG-4 AAC audio coding technology licensed by Fraunhofer IIS (www.iis.fraunhofer.de/amm/).",
		ABOUT_4: "Application software designed and implemented by Kinoma (www.kinoma.com). Portions Copyright Â©2006,2007 Kinoma, Inc.",
		ABOUT_5: "Bitstream is a registered trademark, and Dutch, Font Fusion, and Swiss are trademarks, of Bitstream, Inc.",
		ABOUT_6: "Portions of this software are Copyright Â©2005 The FreeType Project (www.freetype.org). All rights reserved.",
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
		PLAIN_TEXT: "უბრალო ტექსტი",
		INTERNAL_MEMORY: "შიდა მეხსიერება",
		MEMORY_STICK: "Memory Stick",
		SD_CARD: "SD კარტა",
		
		// Main.xml & kbook.so stuff
		INVALID_FORMAT: "არასწორი ფორმატი!",
		FORMATTING: "ფორმატირება...",
		LOADING: "ჩატვირთვა...",
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
		UPPER_PAGE: "გვერდი",
		ONE_OF_ONE: "1 - 1",
		NO_BATTERY: "აკუმულატორი დამჯდარია!",
		FORMATTING_INTERNAL_MEMORY: "შიდა მეხსიერების ფორმატირება...",
		SHUTTING_DOWN: "გამორთვა...",
		
		// Root menu
		CONTINUE: "კითხვის გაგრძელება",
		BOOKS_BY_TITLE: "წიგნები სათაურის მიხედვით",
		BOOKS_BY_AUTHOR: "წიგნები ავტორის მიხედვით",
		BOOKS_BY_DATE: "წიგნები თარიღის მიხედვით",
		COLLECTIONS: "კოლექციები",
		ALL_BOOKMARKS: "ყველა ჩანიშვნა",
		NOW_PLAYING: "Now Playing",
		MUSIC: "მუსიკა",
		PICTURES: "სურათები",
		SETTINGS: "ოფციები",

		// In Settings
		// orientation
		ORIENTATION: "ორიენტაცია",
		HORIZONTAL: "ჰორიზონტალური",
		VERTICAL: "ვერტიკალური",
		// set date
		SET_DATE: "თარიღი",
		YEAR: "წელი",
		MONTH: "თვე",
		DATE: "დღე", // Day
		HOUR: "საათი",
		MINUTE: "წუთი",
		// slideshow
		SLIDESHOW: "Slideshow",
		SS_ON: "ჩარ",
		SS_OFF: "გამ",
		SS_TURN: "აქტივირება",
		SS_DURATION: "ხანძლიობა",
		SECONDS: "წამი",
		// auto standby (aka sleep mode)
		AUTOSTANDBY: "Sleep Mode",
		AS_ON: "ჩარ",
		AS_OFF: "გამ",
		AS_TURN: "აქტივირება",
		// about
		ABOUT: "წიგნის შესახებ",
		// reset to factory settings
		RESET_TO_FACTORY: "Reset to factory settings",
		
		// In Advanced Settings
		ADVANCED_SETTINGS: "დამატებითი ოფციები",
		// screen lock (aka device lock)
		SCREEN_LOCK: "წიგნის დალუქვა",
		SL_OFF: "გამ",
		SL_ON: "ჩარ",
		SL_CODE: "კოდი",
		SL_TURN: "აქტივირება",
		// format device
		FORMAT_DEVICE: "წიგნის ფორმატირება",
		
		// In Book menu
		BEGIN: "დასაწყისი",
		END: "დასასრული",
		BOOKMARKS: "ჩანიშვნები",
		CONTENTS: "შინაარსი",
		HISTORY: "ისტორია",
		INFO: "დეტალები",
		UTILITIES: "უტილიტები",
		
		// In Book Utilities
		REMOVE_ALL_BOOKMARKS: "ჩანიშნულების წაშლა",
		CLEAR_HISTORY: "ისტორიის წაშლა",
		DELETE_BOOK: "წიგნის წაშლა",
		
		// In Books by Date
		TODAY: "დღეს",
		EARLIER_THIS_WEEK: "ამ კვირას",
		LAST_WEEK: "წინა კვირას",
		EARLIER_THIS_MONTH: "ამ თვეში",
		LAST_MONTH: "წინა თვეში",
		EARLIER_THIS_QUARTER: "ამ კვარტალში",
		LAST_QUARTER: "წინა კვარტალში",
		EARLIER_THIS_YEAR: "წელს",
		LAST_YEAR: "შარშან",
		OLDER: "უფრო ძველი",		
		
		PAGE: "გვერდი",
		PART: "ნაწილი",
		OF: "/",
		NO_BOOK: "ცარიელი",
		NO_SONG: "ცარიელი",

		// Info title strings, comma separated, no spaces after comma
		INFO_TITLES: "გარეკანი,სათაური,ავტორი,გამომცემელი,კატეგორია,eBook ID,ტიპი,თარიღი,სიდიდე,წყარო,ფაილი,Digital Rights,გათავდება",
		
		// Titles and criterions for "Books by Title" and "Books by Folder"
		// title is displayed, "criterion" is used for sorting.
		//
		// NOTE: if localization doesn't need custom Books by sorting, just remove CUSTOM_SORT, TITLE_*, CRITERION_* items
		CUSTOM_SORT: true, 
		TITLE_1: "0-9",
		CRITERION_1: "0123456789",
		TITLE_2: "A B C D E F",
		CRITERION_2: "ABCabcDEFdef",
		TITLE_3: "G H I J K L",
		CRITERION_3: "GHIghiJKLjkl",
		TITLE_4: "M N O P Q R S",
		CRITERION_4: "MNOmnoPQRSpqrs",
		TITLE_5: "T U V W X Y Z",
		CRITERION_5: "TUVWtuvwWXYZwxyz",
		TITLE_6: "ა ბ გ დ ე ვ ზ თ ი",
		CRITERION_6: "აბგდევზთი",
		TITLE_7: "კ ლ მ ნ ო პ ჟ რ",
		CRITERION_7: "კლმნოპჟრ",
		TITLE_8: "ს ტ უ ფ ქ ღ ყ შ",
		CRITERION_8: "სტუფქღყშ",
		TITLE_9: "ჩ ც ძ წ ჭ ხ ჯ ჰ",
		CRITERION_9: "ჩცძწჭხჯჰ",
		TITLE_0: "სხვა",
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
			return date.toLocaleDateString() + " " + this.FUNC_GET_TIME(date);
		},
		FUNC_GET_DATE: function (date) {
			var day, month, year;
			day = this.toDoubleDigit(date.getDate());
			month = this.toDoubleDigit(date.getMonth() + 1); 
			year = date.getFullYear();
			return month + "/" + day + "/" + year;
		},
		FUNC_GET_TIME: function (date) {
			var hour, minute;
			hour = this.toDoubleDigit(date.getHours());
			minute = this.toDoubleDigit(date.getMinutes());
			return hour + ":" + minute;
		},
		FUNC_X_PAGES: function (n) {
			return this.FUNC_X_SOMETHING(n, "გვერდი", "ცარიელი");
		},
		FUNC_X_ITEMS: function (n) {
			return this.FUNC_X_SOMETHING(n, "საგანი", "ცარიელი");
		},
		FUNC_X_SETTINGS: function (n) {
			return this.FUNC_X_SOMETHING(n, "ოფცია", "ცარიელი");
		},
		FUNC_X_PICTURES: function (n) {
			return this.FUNC_X_SOMETHING(n, "სურათი", "ცარიელი");
		},
		FUNC_X_SONGS: function (n) {
			return this.FUNC_X_SOMETHING(n, "სიმღერა", "ცარიელი");
		},
		FUNC_X_BOOKMARKS: function (n) {
			return this.FUNC_X_SOMETHING(n, "ჩანიშნული", "ცარიელი");
		},
		FUNC_X_COLLECTIONS: function (n) {
			return this.FUNC_X_SOMETHING(n, "კოლეკცია", "ცარიელი");
		},
		FUNC_X_BOOKS: function (n) {
			return this.FUNC_X_SOMETHING(n, "წიგნი", "ცარიელი");
		},
		FUNC_X_SOMETHING: function (n, many, zero) {
			if (n > 0) {
				return n + " " + many;
			} else {
				return zero;
			}
		}
	},
	
	// PRS+ stuff
	Core: {
		NODE_PRSP_SETTINGS:  "PRS+ ოფციები"
	},
	
	CoreLang: {
		TITLE: "ლოკალიზაცია",
		COMMENT: "საჭიროებს გადატვირთვას",
		OPTION_LANG: "ენა",
	
		OPTION_DATE_FORMAT: "თარიღის ფორმატი",
		ddMMMYY: "31/იან/99",
		ddMONTHYY: "31/იანვარი/99",
		ddMMMYYYY: "31/იან/1999",
		ddMONTHYYYY: "31/იანვარი/1999",
		
		OPTION_DATE_SEPARATOR: "თარიღის სიმბოლო",
		VALUE_SPACE: "space",
		VALUE_NONE: "არაფერი",
		
		MONTH_SHORT_1: "იან",
		MONTH_SHORT_2: "თებ",
		MONTH_SHORT_3: "მარ",
		MONTH_SHORT_4: "აპრ",
		MONTH_SHORT_5: "მაი",
		MONTH_SHORT_6: "ივნ",
		MONTH_SHORT_7: "ივლ",
		MONTH_SHORT_8: "აგვ",
		MONTH_SHORT_9: "სექ",
		MONTH_SHORT_10: "ოქტ",
		MONTH_SHORT_11: "ნოე",
		MONTH_SHORT_12: "დეკ",		

		MONTH_1: "იანვარი",
		MONTH_2: "თებერვალი",
		MONTH_3: "მარტი",
		MONTH_4: "აპრილი",
		MONTH_5: "მაისი",
		MONTH_6: "ივნისი",
		MONTH_7: "ივლისი",
		MONTH_8: "აგვისტო",
		MONTH_9: "სექტემბერი",
		MONTH_10: "ოქტომბერი",
		MONTH_11: "ნოემბერი",
		MONTH_12: "დეკემბერი"	
	},

	MenuCaptions: {
		TITLE: "მენიუს სათაური",
		TITLE_COMMENT: "",
		OPTION_STYLE: "მენიუს სათაურის სტილი",
		VALUE_SONY_DEFAULT: "Sony (ხან დიდი ხან პატარა)",
		VALUE_ALWAYS_SMALL: "ყოველთვის პატარა",
		VALUE_ALWAYS_BIG: "ყოველთვის დიდი"
	},
	
	TextEncoding: {
		TITLE: "ტექსტის კოდირება",
		COMMENT: "ეხება მხოლოდ TXT,RTF წიგნებს, საჭიროებს გადატვირთვას",
		OPTION_TITLE: "კოდირება",
		DESCRIPTION: "",
		LATIN: "Latin",
		RUSSIAN:  "Russian (win1251)"
	},
	
	KeyBindings: {
		TITLE: "Key Bindings",
		DESCRIPTION: "Allows to bind actions to keys",
		
		DEFAULT_VALUE: "default",
		
		// Contexts
		GLOBAL:  "ყველგან",
		IN_MENU: "მენიუში",
		IN_BOOK:  "წიგნში",
		
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
		ACTION_SHUTDOWN: "გათიშვა",
		ACTION_NEXT_PAGE: "შემდეგი გვერდი",
		ACTION_PREVIOUS_PAGE: "წინა გვერდი",
		ACTION_NEXT_IN_HISTORY: "წინა ისტორიაში",
		ACTION_PREVIOUS_IN_HISTORY: "შემდეგი ისტორიაში",
		ACTION_PREVIOUS_SONG: "წინა სიმღერა",
		ACTION_NEXT_SONG: "შემდეგი სიმღერა"
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
		INTERNAL_MEMORY: "შიდა მეხსიერება"
	},
	
	BrowseFolders: {
		TITLE:  "ფოლდერების დათვალიერება",
		OPTION_SORTING_MODE: "სორტირების რეჟიმი",
		VALUE_BY_TITLE: "სათაურის მიხედვით",
		VALUE_BY_AUTHOR_THEN_TITLE: "ავტორის, შემდეგ სათაურის მიხ.",
		VALUE_BY_AUTHOR_SWAPPING: "ავტორის სახელის, შემდეგ გვარის მიხ.",
		VALUE_BY_FILENAME: "ფაილის სახელის მიხ.",
		OPTION_TITLE_SORTER: "titleSorter ველის მიხ.",
		ENABLED: "ჩარ",
		DISABLED: "გამ",
		OPTION_IM_ROOT: "შიდა მეხს. საწყისი ფოლდერი",
		OPTION_CARD_SCAN: "SD/MS კარტების სკანირება",
		OPTION_MOUNT: "Use mount with SD/MS (experimental)",
		NODE_RESCAN_INTERNAL_MEMORY: "შიდა მეხსიერების დასკანირება",
		NODE_COPY_TO_INTERNAL_MEMORY: "შიდა მეხსიერებაში კოპირება",
		NODE_COPY_TO_INTERNAL_MEMORY_COMMENT: "აკოპირებს ფაილს შიდა მეხსიერებაში",
		NODE_COPY_AND_RESCAN: "აკოპირებს ფაილს შ.მ.-ში და იწყებს სკანირებას",
		NODE_COPY_AND_RESCAN_COMMENT: "",
		ERROR_TARGET_EXISTS: "შეცდომა: ფაილი ასეთი სახელით არსებობს",
		NODE_AUDIO_AND_PICTURES: "სიმღერები და სურათები",
		NODE_BROWSE_FOLDERS: "ფოლდერების დათვალიერება",
		NODE_BROWSE_FOLDERS_COMMENT: "",
		NODE_INTERNAL_MEMORY: "შიდა მეხსიერება",
		NODE_MEMORY_STICK: "Memory Stick",
		NODE_MEMORY_STICK_MOUNT: "Memory Stick via mount",
		NODE_SD_CARD: "SD Card",
		NODE_SD_CARD_MOUNT: "SD Card via mount",
		NODE_GAMES_AND_UTILITIES: "თამაშები და უტილიტები"
	},
	
	Clock: {
		TITLE: "საათი",
		OPTION_STYLE: "საათის სტილი",
		VALUE_24H: "24 საათი",
		VALUE_12H: "12 საათი",
		OPTION_MODE: "საათის რეჟიმი",
		VALUE_ALWAYS_SHOWN: "ყოვეთვის ჩართულია",
		VALUE_SHOWN_ONLY_IN_MENU: "მხოლოდ მენიუში",
		VALUE_SHOWN_WHEN_READING: "მხოლოდ წიგნის კითხვისას",
		VALUE_OFF: "გამ.",
		ACTION_TOGGLE_CLOCK: "საათის ჩართ./გამორთ.",
		AM: "am",
		PM: "pm"
	},
	
	PageIndex: {
		TITLE: "გვერდის სტატუსი (1 - 1)",
		INDEX_STYLE_BOOK: "ინდექსის სტილი წიგნებში",
		INDEX_MODE_BOOK: "ინდექსის რეჟიმი წიგნებში",
		INDEX_MODE_MENU: "ინდექსის რეჟიმი მენიუში",
		INDEX_STYLE_MENU: "ინდექსის სტილი მენიუში",
		OF: "-",
		ALWAYS_SHOWN: "ყოვეთვის ჩართულია",
		NEVER_SHOWN: "გათიშულია",
		NOT_SHOWN_IF_SINGLE_PAGE: "გატიშულია ცალკე გვერდებზე (1 - 1)"
	},
	
	EpubUserStyle: {
		TITLE: "EPUB მომხმარებლის სტილი",
		COMMENT: "ექსპ. მოქმედებს მხოლოდ შემდგომ გახსნილ წიგნებზე",
		OPTION_EPUB_CSS_FILE: "მომხმარებლის EPUB css ფაილიe",
		VALUE_DISABLED: "გატიშულია"
	}
};
