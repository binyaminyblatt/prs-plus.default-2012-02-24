// Language: Czech
// Description: Localization file
// Translator: Hobogen
//
// History:
//	2010-05-06 kartu - Initial version by Hobogen @ mobileread
//	2010-05-11 kartu - Added VALUE_DEFAULT_DATE (CoreLang)
//	2010-05-15 kartu - Added OPTION_SKIP_BOOK_MENU (BookHistory)
//	2010-05-15 kartu - Added PAGE (BookHistory)
//	2010-05-17 kravitz - Replaced PAGE (BookHistory) with added FUNC_PAGE_X
//	2010-05-18 kartu - Merged with Hobogen's fixes
//	2010-05-18 kravitz - Replaced PAGE (Sony) with FUNC_PAGE_X
//	2010-05-20 kartu - Removed script reference from about string
//	2010-06-29 kartu - Split KeyBindings keys into KeyBindings and StandardActions
//				Added 0-9 translations
//	2011-03-15 SomeDeepBlue - corrected function names and added newer functions which are missing as of yet.
//                            newer functions are English only for now and still need to be translated
//	2011-03-23 kartu - Refactoring: moving functions out of lang files, moving texts to a spreadsheet

return {
	X: {
		BOOKS: ["knih", "knihy", "1 kniha", "Žádná kniha"],
		SETTINGS: ["nastavení", "nastavení", "1 nastavení", "Žádné nastavení"]
	},

	// PRS+ stuff
	Core: {
		NODE_PRSP_SETTINGS: "PRS+ nastavení",
		NODE_OTHERS: "Multimédia",
		NODE_GAMES_AND_UTILS: "Hry a pomůcky",
		GROUP_MENU_TITLE: "Nastavení menu",
		GROUP_VIEWER_TITLE: "Nastavení čtečky"
	},

	MenuCaptions: {
		OPTION_STYLE: "Vzhled nadpisů menu",
		VALUE_SONY_DEFAULT: "Standardní Sony",
		VALUE_ALWAYS_SMALL: "Vždy malé",
		VALUE_ALWAYS_BIG: "Vždy velké"
	},

	TextEncoding: {
		OPTION_TITLE: "Kódování TXT a RTF knih",
		MSG_RESTART: "Vyžaduje restart!",
		LATIN: "Latinka",
		RUSSIAN: "Azbuka (Windows-1251)"
	},

	KeyBindings: {
		TITLE: "Klávesové zkratky",
		DESCRIPTION: "Povolí nastavení akcí tlačítek",

		DEFAULT_VALUE: "Základní",

		// Contexts
		GLOBAL: "Globální",
		IN_MENU: "V menu",
		IN_BOOK: "Při čtení knihy",

		// Button groups
		NUM_BUTTONS: "Číselná tlačítka",
		JP_BUTTONS: "Směrová tlačítka",
		OTHER_BUTTONS: "Ostatní tlačítka",
		VOLUME_BUTTONS: "Zvuková tlačítka",

		// Buttons
		BN_SIZE: "Tlačítko 'Velikost'",
		BN_BOOKMARK: "Tlačítko 'Záložka'",
		BN_BL_NEXT: "Levé spodní 'Další strana'",
		BN_BL_PREVIOUS: "Levé spodní 'Předchozí strana'",
		BN_SB_NEXT: "Boční 'Další strana'",
		BN_SB_PREVIOUS: "Boční 'Předchozí strana'",
		BN_MENU: "Tlačítko 'Menu'",
		BN_JP_LEFT: "Vlevo",
		BN_JP_RIGHT: "Vpravo",
		BN_JP_UP: "Nahoru",
		BN_JP_DOWN: "Dolů",
		BN_JP_CENTER: "Potvrdit",
		BN_H_SIZE: "Podržení tlačítka 'Velikost'",
		BN_H_BOOKMARK: "Podržení tlačítka 'Záložka'",
		BN_H_BL_NEXT: "Podržení levého spodního 'Další strana'",
		BN_H_BL_PREVIOUS: "Podržení levého spodního 'Předchozí strana'",
		BN_H_MENU: "Podržení tlačítka 'Menu'",
		BN_H_SB_NEXT: "Podržení bočního 'Další strana'",
		BN_H_SB_PREVIOUS: "Podržení bočního 'Předchozí strana'",
		BN_H_JP_CENTER: "Podržení tlačítka 'Potvrdit'",
		BN_H_1: "Podržení 1",
		BN_H_2: "Podržení 2",
		BN_H_3: "Podržení 3",
		BN_H_4: "Podržení 4",
		BN_H_5: "Podržení 5",
		BN_H_6: "Podržení 6",
		BN_H_7: "Podržení 7",
		BN_H_8: "Podržení 8",
		BN_H_9: "Podržení 9",
		BN_H_0: "Podržení 0",
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
		BN_VOLUME_DOWN: "Zvuk -",
		BN_H_VOLUME_DOWN: "Podržení zvuk -",
		BN_VOLUME_UP: "Zvuk +",
		BN_H_VOLUME_UP: "Podržení zvuk +"
	},

	StandardActions: {
		// Actions
		ACTION_SHUTDOWN: "Vypnout",
		ACTION_NEXT_PAGE: "Další strana",
		ACTION_PREVIOUS_PAGE: "Předchozí strana",
		ACTION_NEXT_IN_HISTORY: "Další v historii",
		ACTION_PREVIOUS_IN_HISTORY: "Předchozí v historii",
		ACTION_PREVIOUS_SONG: "Předchozí nahrávka",
		ACTION_NEXT_SONG: "Další nahrávka",
		ACTION_GOTO_LINK: "Běž na odkaz"
	},

	Screenshot: {
		TITLE: "Snímek obrazovky",
		ACTION_TITLE: "Uložit snímek obrazovky",
		SAVING_TO: "Ukládám na ",
		FAILED_TO_SAVE: "Uložení se nezdařilo",
		OPT_SAVETO: "Uložit na",
		OPT_FEEDBACK: "Ukázat postup ukládání",
		MEMORY_STICK: "Memory stick",
		FEEDBACK_ON: "Zap",
		FEEDBACK_OFF: "Vyp",
		SD_CARD: "SD kartu",
		INTERNAL_MEMORY: "Vnitřní paměť"
	},

	BrowseFolders: {
		TITLE: "Procházet složky",
		OPTION_SORTING_MODE: "Seřadit",
		VALUE_BY_TITLE: "Podle názvu",
		VALUE_BY_AUTHOR_THEN_TITLE: "Podle autora pak názvu",
		VALUE_BY_AUTHOR_SWAPPING: "Podle jména/příjmení autora",
		VALUE_BY_FILENAME: "Podle jména souboru",
		OPTION_TITLE_SORTER: "Použít 'titleSorter' pole při řazení",
		ENABLED: "Povoleno",
		DISABLED: "Zakázáno",
		OPTION_IM_ROOT: "Kořenový adresář vnitřní paměti",
		OPTION_CARD_SCAN: "Načíst SD/MS kartu",
		OPTION_MOUNT: "Namountovat SD/MS (experimentální)",
		NODE_RESCAN_INTERNAL_MEMORY: "Znovu načíst vnitřní paměť",
		NODE_COPY_TO_INTERNAL_MEMORY: "Zkopírovat do vnitřní paměti",
		NODE_COPY_TO_INTERNAL_MEMORY_COMMENT: "Kopíruje data do vnitřní paměti",
		NODE_COPY_AND_RESCAN: "Zkopírovat a znovunačíst vnitřní paměť",
		NODE_COPY_AND_RESCAN_COMMENT: "Kopíruje data do vnitřní paměti and znovunačítá knihy",
		ERROR_TARGET_EXISTS: "Chyba, cílový soubor existuje",
		NODE_BROWSE_FOLDERS: "Procházet složky",
		NODE_BROWSE_FOLDERS_COMMENT: "Procházet paměť",
		NODE_INTERNAL_MEMORY: "Vnitřní paměť",
		NODE_MEMORY_STICK: "Memory Stick",
		NODE_MEMORY_STICK_MOUNT: "Memory Stick přes Mount",
		NODE_SD_CARD: "SD karta",
		NODE_SD_CARD_MOUNT: "SD karta přes Mount"
	},

	StatusBar: {
		TITLE: "Status Bar"
	},


	StatusBar_Clock: {
		TITLE: "Hodiny",
		OPTION_STYLE: "Nastavení hodin",
		VALUE_24H: "24 hodin",
		VALUE_12H: "12 hodin",
		OPTION_MODE: "Zobrazení hodin",
		VALUE_ALWAYS_SHOWN: "Vždy zobrazit",
		VALUE_SHOWN_ONLY_IN_MENU: "Zobrazit jen v menu",
		VALUE_SHOWN_WHEN_READING: "Zobrazit jen při čtení",
		VALUE_OFF: "Vyp",
		ACTION_TOGGLE_CLOCK: "Přepnout hodiny",
		AM: "am",
		PM: "pm"
	},

	StatusBar_PageIndex: {
		TITLE: "Číslování stran",
		INDEX_STYLE_BOOK: "Vzhled číslování v knihách",
		INDEX_MODE_BOOK: "Zobrazení číslování v knihách",
		INDEX_MODE_MENU: "Vzhled číslování v menu",
		INDEX_STYLE_MENU: "Zobrazení číslování v menu",
		OF: "z",
		ALWAYS_SHOWN: "Vždy zobrazovat",
		NEVER_SHOWN: "Nikdy nazobrazovat",
		NOT_SHOWN_IF_SINGLE_PAGE: "Nezobrazovat na samostatných stranách",
		VALUE_STATS0: "5 / 100 (stran za minutu)",
		VALUE_STATS1: "5 / 100 (čas do konce knihy)",
		VALUE_STATS2: "5 / 100 (str. min. / čas do konce)"
	},

	EpubUserStyle: {
		OPTION_EPUB_CSS_FILE: "Vlastní styl pro EPUB (CSS soubor)",
		MSG_WARNING: "Funguje jenom pro nově otevřené knihy!",
		VALUE_DISABLED: "Zakázáno"
	},

	BookHistory: {
		TITLE: "Historie",
		VALUE_DISABLED: "Zakázána",
		OPTION_REPLACE: "Historie místo Pokračuj ve čtení",
		VALUE_ON: "Zap",
		VALUE_OFF: "Vyp",
		OPTION_SKIP_BOOK_MENU: "Přeskočit menu knihy"
	},

	TextScale: {
		OPTION_SCALE_DEFAULT: "Základní velikost",
		VALUE_SMALL: "(S) Malá velikost",
		VALUE_MEDIUM: "(M) Střední velikost",
		VALUE_LARGE: "(L) Velká velikost",
		VALUE_DISABLED: "Zakázána",
		VALUE_ENABLED: "Povolena"
	},

	MenuTuning: {
		OPTION_OUTER: "Základní menu obsahuje"
	},

	MenuCustomizer: {
		TITLE: "Menu Customizer",
		VALUE_YES: "yes",
		VALUE_NO: "no",
		VALUE_DEFAULT: "default",
		SLOT: "Slot",
		UNMOVABLE_SLOT: "Fixed slot",
		MENU_ITEM: "Menu Item",
		MENU_SEPARATOR: "Separator"
	},


	Dictionary: {
		TITLE: "Slovník",
		WARN_DICT_DISABLED: "Slovník je vypnut!",
		WARN_DICT_DOESNT_EXIST: "Soubor slovníku neexistuje!",
		ACTION_DICTIONARY: "Spustit slovník",
		OPTION_DICTIONARY: "Soubor slovníku",
		VALUE_DISABLED: "Zakázán"
	},

	MediaTag: {
		TITLE: "Mark Books",
		OPTION_POSITION: "Mark Position",
		VALUE_OVER_ICON: "Left (over icon)",
		VALUE_BOTTOM: "Bottom",
		VALUE_RIGHT: "Right",
		MARK_0: "Mark 1 (check)",
		MARK_1: "Mark 2 (star)",
		MARK_2: "Mark 3 (circle)",
		MARK_3: "Mark 4 (square)",
		MARK_4: "Mark 5 (triangle)"
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
