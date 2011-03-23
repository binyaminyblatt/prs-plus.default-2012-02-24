// Language: Georgian
// Description: Localization file
// Translator: kartu
//
// History:
//	2010-04-24 kartu - Added TITLE for "clock" addon
//	2010-04-24 kartu - Fixed spelling of CONTINUE
//	2010-04-24 kartu - Fixed spelling
//	2010-04-25 kartu - Translated more stuff
//	2010-04-28 kartu - Finalized Georgian translation
//	2010-04-30 kravitz - Refactored, added new strings
//	2010-05-01 kartu - Translated new strings, fixed minor glitches
//				Added ACTION_GOTO_LINK
//	2010-05-02 kartu - Added dictionary translations
//				Fixed spelling (shutdown message)
//	2010-05-02 kartu - Added translations and sizes for a number of strings, including "OK"
//	2010-05-03 kravitz - Renamed ReadingList to BookHistory, added new strings, refactored MenuTuning
//	2010-05-06 kartu - Added ppm related translations for PageIndex addon
//	2010-05-11 kartu - Added VALUE_DEFAULT_DATE (CoreLang)
//	2010-05-15 kartu - Added OPTION_SKIP_BOOK_MENU (BookHistory)
//	2010-05-15 kartu - Added PAGE (BookHistory)
//	2010-05-17 kravitz - Replaced PAGE (BookHistory) with added FUNC_PAGE_X
//	2010-05-18 kravitz - Replaced PAGE (Sony) with FUNC_PAGE_X
//	2010-05-20 kartu - Removed script reference from about string
//	2010-06-29 kartu - Split KeyBindings keys into KeyBindings and StandardActions
//				Added 0-9 translations
//	2010-11-27 kartu - Amended translations with changes up to 2.0.3preview
//	2011-03-15 SomeDeepBlue - added newer functions which are missing as of yet.
//                            newer functions are English only for now and still need to be translated
//	2011-03-23 kartu - Refactoring: moving functions out of lang files, moving texts to a spreadsheet

return {
	X: {
		BOOKS: ["წიგნი", "ცარიელი"],
		SETTINGS: ["ოფცია", "ცარიელი"]
	},

	// PRS+ stuff
	Core: {
		NODE_PRSP_SETTINGS: "PRS+ პარამეტრები",
		NODE_PRSP_SETTINGS_SHORT: "PRS+ პარამ.",
		NODE_OTHERS: "მულტიმედია",
		NODE_GAMES_AND_UTILS: "თამაშები და უტილიტები",
		GROUP_MENU_TITLE: "მენიუს პარამეტრები",
		GROUP_VIEWER_TITLE: "წიგნის მნახველის პარამეტრები",
		MSG_RESTART: "საჭიროებს გადატვირთვას"
	},

	MenuCaptions: {
		OPTION_STYLE: "წარწერების სტილი",
		VALUE_SONY_DEFAULT: "Sony (ხან დიდი ხან პატარა)",
		VALUE_ALWAYS_SMALL: "ყოველთვის პატარა",
		VALUE_ALWAYS_BIG: "ყოველთვის დიდი"
	},

	TextEncoding: {
		OPTION_TITLE: "ტექსტის კოდირება",
		MSG_RESTART: "საჭიროებს გადატვირთვას",
		LATIN: "Latin",
		RUSSIAN: "Russian (Windows-1251)"
	},

	KeyBindings: {
		TITLE: "ღილაკები",
		DESCRIPTION: "ღილაკების კონფიგურირება",

		DEFAULT_VALUE: "ნაგულისხმევი",

		// Contexts
		GLOBAL: "ყველგან",
		IN_MENU: "მენიუში",
		IN_BOOK: "წიგნში",

		// Button groups
		NUM_BUTTONS: "ციფრული ღილაკები",
		JP_BUTTONS: "ჯოისტიკის ღილაკები",
		OTHER_BUTTONS: "სხვა ღილაკები",
		VOLUME_BUTTONS: "ხმის ღილაკები",

		// Buttons
		BN_SIZE: "გადიდების ღილაკი",
		BN_BOOKMARK: "სანიშნეს ღილაკი",
		BN_BL_NEXT: "ქვედა მარცხენა 'შემდეგი' ღილ.",
		BN_BL_PREVIOUS: "ქვედა მარცხენა 'წინა' ღილ.",
		BN_SB_NEXT: "გვერდითი 'შემდეგი' ღილ.",
		BN_SB_PREVIOUS: "გვერდითი 'წინა' ღილ.",
		BN_MENU: "მენიუს ღილაკი",
		BN_JP_LEFT: "ჯოისტიკის მარცხენა ღილ.",
		BN_JP_RIGHT: "ჯოისტიკის მარჯვენა ღილ.",
		BN_JP_UP: "ჯოისტიკის ზედა ღილ.",
		BN_JP_DOWN: "ჯოისტიკის ქვედა ღილ.",
		BN_JP_CENTER: "ჯოისტიკის შუა ღილ.",
		BN_H_SIZE: "დაჭერილი გადიდების ღილ.",
		BN_H_BOOKMARK: "დაჭერილი სანიშნეს ღილაკი",
		BN_H_BL_NEXT: "დაჭერილი ქვ. მარც. 'შემდეგი'",
		BN_H_BL_PREVIOUS: "დაჭერილი ქვ. მარც. 'წინა'",
		BN_H_MENU: "დაჭერილი მენუს ღილაკი",
		BN_H_SB_NEXT: "დაჭერილი გვერდითი 'შემდეგი'",
		BN_H_SB_PREVIOUS: "დაჭერილი გვერდითი 'წინა'",
		BN_H_JP_LEFT: "დაჭერილი ჯოისტ. მარცხენა ღილ.",
		BN_H_JP_RIGHT: "დაჭერილი ჯოისტ. მარჯვენა ღილ.",
		BN_H_JP_UP: "დაჭერილი ჯოისტ. ზედა ღილ.",
		BN_H_JP_DOWN: "დაჭერილი ჯოისტ. ქვედა ღილ.",
		BN_H_JP_CENTER: "დაჭერილი ჯოისტ. შუა ღილ.",
		BN_H_1: "დაჭერილი 1",
		BN_H_2: "დაჭერილი 2",
		BN_H_3: "დაჭერილი 3",
		BN_H_4: "დაჭერილი 4",
		BN_H_5: "დაჭერილი 5",
		BN_H_6: "დაჭერილი 6",
		BN_H_7: "დაჭერილი 7",
		BN_H_8: "დაჭერილი 8",
		BN_H_9: "დაჭერილი 9",
		BN_H_0: "დაჭერილი 0",
		BN_1: "1",
		BN_2: "2",
		BN_3: "3",
		BN_4: "4",
		BN_5: "5",
		BN_6: "6",
		BN_7: "7",
		BN_8: "8",
		BN_9: "9",
		BN_0: "0",
		BN_VOLUME_DOWN: "ხმა -",
		BN_H_VOLUME_DOWN: "დაჭერილი ხმა -",
		BN_VOLUME_UP: "ხმა +",
		BN_H_VOLUME_UP: "დაჭერილი ხმა +",
		BN_HOME: "ღილაკი \"სახლი\"",
		BN_H_HOME: "დაჭერილი ღილაკი \"სახლი\""
	},

	StandardActions: {
		TITLE: "სტანდარტული მოქმედება",
		// Actions
		ACTION_SHUTDOWN: "გათიშვა",
		ACTION_NEXT_PAGE: "შემდეგი გვერდი",
		ACTION_PREVIOUS_PAGE: "წინა გვერდი",
		ACTION_NEXT_IN_HISTORY: "წინა ისტორიაში",
		ACTION_PREVIOUS_IN_HISTORY: "შემდეგი ისტორიაში",
		ACTION_PREVIOUS_SONG: "წინა სიმღერა",
		ACTION_NEXT_SONG: "შემდეგი სიმღერა",
		ACTION_GOTO_LINK: "ბმულის გახსნა",
		ACTION_CONTINUE_READING: "კითხვის გაგრძელება"
	},

	Screenshot: {
		TITLE: "ეკრანის სურათი",
		ACTION_TITLE: "ეკრანის სურათის გადაღება",
		SAVING_TO: "ვინახავ ",
		FAILED_TO_SAVE: "შენახვა ჩაიშალა",
		OPT_SAVETO: "ვინახავ",
		OPT_FEEDBACK: "შენახვის შეტყობინება",
		MEMORY_STICK: "Memory Stick",
		FEEDBACK_ON: "ჩარ",
		FEEDBACK_OFF: "გამ",
		SD_CARD: "SD კარტა",
		INTERNAL_MEMORY: "შიდა მეხსიერება"
	},

	BrowseFolders: {
		TITLE: "ფოლდერების დათვალიერება",
		OPTION_SORTING_MODE: "სორტირების რეჟიმი",
		VALUE_BY_TITLE: "სათაურის მიხედვით",
		VALUE_BY_AUTHOR_THEN_TITLE: "ავტორის, შემდეგ სათაურის მიხ.",
		VALUE_BY_AUTHOR_SWAPPING: "ავტორის სახელის, შემდეგ გვარის მიხ.",
		VALUE_BY_FILENAME: "ფაილის სახელის მიხ.",
		OPTION_TITLE_SORTER: "'titleSorter' ველის მიხ.",
		OPTION_FAVOURITE_FOLDERS: "რჩეული ფოლდერები",
		ENABLED: "ჩარ",
		DISABLED: "გამ",
		OPTION_IM_ROOT: "შიდა მეხს. საწყისი ფოლდერი",
		OPTION_CARD_SCAN: "SD/MS კარტების სკანირება",
		OPTION_MOUNT: "Use mount with SD/MS (experimental)",
		NODE_RESCAN_INTERNAL_MEMORY: "შიდა მეხსიერების დასკანირება",
		NODE_COPY_TO_INTERNAL_MEMORY: "შიდა მეხსიერებაში კოპირება",
		NODE_COPY_TO_INTERNAL_MEMORY_COMMENT: "აკოპირებს ფაილს შიდა მეხსიერებაში",
		NODE_COPY_AND_RESCAN: "შიდა მეხსიერებაში კოპირება+დასკანირება",
		NODE_COPY_AND_RESCAN_COMMENT: "აკოპირებს ფაილს შ.მ.-ში და იწყებს სკანირებას",
		ERROR_TARGET_EXISTS: "შეცდომა: ფაილი ასეთი სახელით არსებობს",
		NODE_BROWSE_FOLDERS: "ფოლდერები",
		NODE_BROWSE_FOLDERS_SHORT: "ფოლდერები",
		NODE_BROWSE_FOLDERS_COMMENT: "",
		NODE_INTERNAL_MEMORY: "შიდა მეხსიერება",
		NODE_MEMORY_STICK: "Memory Stick",
		NODE_MEMORY_STICK_MOUNT: "Memory Stick via Mount",
		NODE_SD_CARD: "SD კარტა",
		NODE_SD_CARD_MOUNT: "SD კარტა mount-ის გამოყებნებით"
	},

	StatusBar: {
		TITLE: "სტატუსის ზოლი"
	},

	StatusBar_Clock: {
		TITLE: "საათი",
		OPTION_STYLE: "საათის სტილი",
		VALUE_24H: "24 საათი",
		VALUE_12H: "12 საათი",
		OPTION_MODE: "საათის რეჟიმი",
		VALUE_ALWAYS_SHOWN: "ყოვეთვის ჩართულია",
		VALUE_SHOWN_ONLY_IN_MENU: "მხოლოდ მენიუში",
		VALUE_SHOWN_WHEN_READING: "მხოლოდ წიგნის კითხვისას",
		VALUE_OFF: "გამ",
		ACTION_TOGGLE_CLOCK: "საათის ჩართ./გამორთ.",
		AM: "am",
		PM: "pm"
	},

	StatusBar_PageIndex: {
		TITLE: "გვერდის სტატუსი (1 - 1)",
		INDEX_STYLE_BOOK: "ინდექსის სტილი წიგნებში",
		INDEX_MODE_BOOK: "ინდექსის რეჟიმი წიგნებში",
		INDEX_MODE_MENU: "ინდექსის რეჟიმი მენიუში",
		INDEX_STYLE_MENU: "ინდექსის სტილი მენიუში",
		OF: "-",
		ALWAYS_SHOWN: "ყოვეთვის ჩართული",
		NEVER_SHOWN: "ყოვეთვის გათიშული",
		NOT_SHOWN_IF_SINGLE_PAGE: "გატიშული ერთმაგ გვერდებზე (1 - 1)",
		VALUE_STATS0: "5 / 100 (გვერდი წუთში)",
		VALUE_STATS1: "5 / 100 (დარჩენილი დრო)",
		VALUE_STATS2: "5 / 100 (გწ / დარჩენილი დრო)"
	},

	EpubUserStyle: {
		OPTION_EPUB_CSS_FILE: "EPUB მომხმარებლის სტილი (CSS ფაილი)",
		MSG_WARNING: "ექსპ. მოქმედებს მხოლოდ შემდგომ გახსნილ წიგნებზე",
		VALUE_DISABLED: "გათიშული"
	},

	BookHistory: {
		TITLE: "წიგნების ისტორია",
		SHORT_TITLE: "ისტორია",
		VALUE_WHEN_ENTERING_BOOK: "წიგნის გაშლისას",
		VALUE_WHEN_EXITING_BOOK: "წიგნის დახურვისას",
		VALUE_ALWAYS: "ყოველთვის",
		VALUE_NEVER: "არასდროს",
		VALUE_DISABLED: "გამორთულია",
		VALUE_ON: "ჩართულია",
		VALUE_OFF: "გამორთულია",
		OPTION_SKIP_BOOK_MENU: "წიგნის მენიუს გამოტოვება"
	},

	TextScale: {
		OPTION_SCALE_DEFAULT: "ნაგულისხმები მასშტაბი",
		VALUE_SMALL: "(S) პატარა",
		VALUE_MEDIUM: "(M) საშუალო",
		VALUE_LARGE: "(L) დიდი",
		VALUE_DISABLED: "გამორთულია",
		VALUE_ENABLED: "ჩართულია"
	},

	MenuCustomizer: {
		TITLE: "მთავარი მენიუს მორგება",
		VALUE_YES: "კი",
		VALUE_NO: "არა",
		VALUE_DEFAULT: "ნაგულისხმევი",
		SLOT: "ჭრილი #",
		MENU_ITEM: "მენიუს ელემენტი",
		MENU_SEPARATOR: "მენიუს გამყოფი"
	},

	Dictionary: {
		TITLE: "ლექსიკონი",
		WARN_DICT_DISABLED: "ლექსიკონი გამორთულია!!",
		WARN_DICT_DOESNT_EXIST: "ლექსიკონის ფაილი არ არსებობს!",
		ACTION_DICTIONARY: "ლექსიკონის გაშვება",
		OPTION_DICTIONARY: "ლექსიკონის ფაილი",
		VALUE_DISABLED: "გამორთულია",
		VALUE_DEFAULT: "ნაგულისხმევი"
	},

	MediaTag: {
		TITLE: "წიგნების მარკირება",
		OPTION_POSITION: "ნიშნის პოზიცია",
		VALUE_OVER_ICON: "მარხენა ხატულაზე",
		VALUE_BOTTOM: "ქვემოთ",
		VALUE_RIGHT: "მარჯვნივ",
		MARK_0: "ნიშანი 1 (თოლია)",
		MARK_1: "ნიშანი 2 (ვარსკვლავი)",
		MARK_2: "ნიშანი 3 (წრეწირი)",
		MARK_3: "ნიშანი 4 (კვადრატი)",
		MARK_4: "ნიშანი 5 (სამკუთხედი)"
	},

	ScrollbarAlphabet: {
		TITLE: "Scrollbar Alphabet",
		OPT_ALPHABET: "Alphabet",
		VALUE_DEFAULT: "default"
	},

	Calc: {
		TITLE: "Calculator",
		DESCRIPTION: ""
	},

	Converter: {
		CONVERTING_FB2: "Converting fb2 to epub...",
		NORMALLY_TAKES: "(normally takes 1-30s)",
		ERROR: "Error converting",
		OPENING: "Opening book"
	}
};
