// Language: German
// Description: Localization file
// Translator: Duglum, klawong, Mark Nord
//
// History:
//      2010-04-30 kravitz - Refactored, added new strings
//      2010-05-01 kartu - Added ACTION_GOTO_LINK
//      2010-05-01 Duglum, klawong, Mark Nord - translation is corrected
//      2010-05-02 kartu - Added dictionary strings
//      2010-05-02 kartu - Added translations and sizes for a number of strings, including "OK"
//      2010-05-03 kravitz - Renamed ReadingList to BookHistory, added new strings, refactored MenuTuning
//      2010-05-06 kartu - Added ppm related translations for PageIndex addon
//      2010-05-10 kartu - Added German corrections by Duglum/Mark Nord/klawong
//      2010-05-11 kartu - Added VALUE_DEFAULT_DATE (CoreLang)
//      2010-05-15 kartu - Added OPTION_SKIP_BOOK_MENU (BookHistory)
//      2010-05-15 kartu - Added PAGE (BookHistory)
//      2010-05-17 kravitz - Replaced PAGE (BookHistory) with added FUNC_PAGE_X
//      2010-05-18 kravitz - Replaced PAGE (Sony) with FUNC_PAGE_X
//      2010-05-18 kravitz - Added Duglum's translation of OPTION_SKIP_BOOK_MENU
//      2010-05-20 kartu - Removed script reference from about string
//      2010-06-29 kartu - Split KeyBindings keys into KeyBindings and StandardActions
//                              Added 0-9 translations
//	2011-03-14SomeDeepBlue - Translation added for sections: Statusbar, Converter, Calc, Scrollbar Alphabet, MediaTag and MenuCustomizer
//                                Function names Clock and PageIndex corrected (StatusBar_*)
//	2011-03-18 MiK77 - Translation reviewed 
//	2011-03-23 kartu - Refactoring: moving functions out of lang files, moving texts to a spreadsheet

return {
	X: {
		BOOKS: ["Bücher", "1 Buch", "Kein Buch"],
		SETTINGS: ["Einstellungen", "1 Einstellung", "Keine Einstellung"]
	},
	
	// PRS+ stuff
	Core: {
		NODE_PRSP_SETTINGS: "PRS+ Einstellungen",
		NODE_PRSP_SETTINGS_SHORT: "PRS+ Einst.",
		NODE_OTHERS: "Multimedia",
		NODE_GAMES_AND_UTILS: "Spiele & Werkzeuge",
		GROUP_MENU_TITLE: "Menü-Einstellungen",
		GROUP_VIEWER_TITLE: "Darstellungsoptionen",
		MSG_RESTART: "Neustarten um Änderungen anzuwenden",
		NODE_MORE: "Mehr"
	},

	MenuCaptions: {
		OPTION_STYLE: "Überschriften-Stil",
		VALUE_SONY_DEFAULT: "Sony Standard",
		VALUE_ALWAYS_SMALL: "Immer klein",
		VALUE_ALWAYS_BIG: "Immer groß"
	},

	TextEncoding: {
		OPTION_TITLE: "TXT- und RTF-Bücher Codierung",
		MSG_RESTART: "Benötigt Neustart!",
		LATIN: "Latin",
		RUSSIAN: "Russisch (Windows-1251)"
	},

	KeyBindings: {
		TITLE: "Tasteneinstellungen",
		DESCRIPTION: "Bindet Aktionen an Tasten",

		DEFAULT_VALUE: "Standardwert",

		// Contexts
		GLOBAL: "Global",
		IN_MENU: "Im Menü",
		IN_BOOK: "Im Buch",

		// Button groups
		NUM_BUTTONS: "Numerische Tasten",
		JP_BUTTONS: "Joypad-Tasten",
		OTHER_BUTTONS: "Andere Tasten",
		VOLUME_BUTTONS: "Lautstärke-Tasten",

		// Buttons
		BN_SIZE: "Zoom-Taste",
		BN_BOOKMARK: "Lesezeichen-Taste",
		BN_BL_NEXT: "Unten links 'weiter'",
		BN_BL_PREVIOUS: "Unten links 'zurück'",
		BN_SB_NEXT: "Seite 'weiter'",
		BN_SB_PREVIOUS: "Seite 'zurück'",
		BN_MENU: "Menü-Taste",
		BN_JP_LEFT: "Joypad links",
		BN_JP_RIGHT: "Joypad rechts",
		BN_JP_UP: "Joypad hoch",
		BN_JP_DOWN: "Joypad runter",
		BN_JP_CENTER: "Joypad Mitte",
		BN_H_SIZE: "Zoom-Taste halten",
		BN_H_BOOKMARK: "Lesezeichen-Taste halten",
		BN_H_BL_NEXT: "Unten links 'weiter' halten",
		BN_H_BL_PREVIOUS: "Unten links 'zurück' halten",
		BN_H_MENU: "Menü-Taste halten",
		BN_H_SB_NEXT: "Seite 'weiter' halten",
		BN_H_SB_PREVIOUS: "Seite 'zurück' halten",
		BN_H_JP_LEFT: "Joypad links halten",
		BN_H_JP_RIGHT: "Joypad rechts halten",
		BN_H_JP_UP: "Joypad hoch halten",
		BN_H_JP_DOWN: "Joypad runter halten",
		BN_H_JP_CENTER: "Joypad Mitte halten",
		BN_H_1: "1 halten",
		BN_H_2: "2 halten",
		BN_H_3: "3 halten",
		BN_H_4: "4 halten",
		BN_H_5: "5 halten",
		BN_H_6: "6 halten",
		BN_H_7: "7 halten",
		BN_H_8: "8 halten",
		BN_H_9: "9 halten",
		BN_H_0: "0 halten",
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
		BN_VOLUME_DOWN: "Lautstärke -",
		BN_H_VOLUME_DOWN: "Lautstärke - halten",
		BN_VOLUME_UP: "Lautstärke +",
		BN_H_VOLUME_UP: "Lautstärke + halten",
		BN_HOME: "Home-Taste",
		BN_H_HOME: "Home-Taste halten"
	},

	StandardActions: {
		TITLE: "Standardaktionen",
		// Actions
		ACTION_SHUTDOWN: "Gerät ausschalten",
		ACTION_NEXT_PAGE: "Nächste Seite",
		ACTION_PREVIOUS_PAGE: "Vorherige Seite",
		ACTION_NEXT_IN_HISTORY: "Nächstes im Verlauf",
		ACTION_PREVIOUS_IN_HISTORY: "Vorheriges im Verlauf",
		ACTION_PREVIOUS_SONG: "Vorheriges Lied",
		ACTION_NEXT_SONG: "Nächstes Lied",
		ACTION_GOTO_LINK: "Verknüpfung folgen",
		ACTION_CONTINUE_READING: "Lesen fortsetzen",
		ACTION_OPEN_TOC: "Inhaltsverzeichnis öffnen",
		// "Bubble" actions		
		ACTION_doOption: "Optionen öffnen",
		ACTION_doSearch: "Suchen",
		ACTION_doRotate: "Rotieren",
		ACTION_doRotate0: "Rotiere 0°",
		ACTION_doRotate90: "Rotiere 90°",
		ACTION_doRotate180: "Rotiere 180°",
		ACTION_doRotate270: "Rotiere 270°",
		ACTION_doRotateCWise: "Rotiere im Uhrzeigersinn",
		ACTION_doRotateCCWise: "Rotiere gegen Uhrzeigersinn",
		ACTION_doMenu: "Vorheriges Menü (zurück / hoch)",
		ACTION_doSize: "Größe",
		ACTION_doRoot: "Zur Startseite"
	},

	Screenshot: {
		TITLE: "Screenshot",
		ACTION_TITLE: "Screenshot erstellen",
		SAVING_TO: "Speichere nach ",
		FAILED_TO_SAVE: "Fehler beim Speichern",
		OPT_SAVETO: "Speichern",
		OPT_FEEDBACK: "Fortschrittsanzeige",
		MEMORY_STICK: "auf Memory Stick",
		FEEDBACK_ON: "Ja",
		FEEDBACK_OFF: "Nein",
		SD_CARD: "auf SD-Karte",
		INTERNAL_MEMORY: "im Internen Speicher"
	},

	BrowseFolders: {
		TITLE: "Ordner durchsuchen",
		OPTION_SORTING_MODE: "Sortier-Modus",
		VALUE_BY_TITLE: "Nach Titel",
		VALUE_BY_AUTHOR_THEN_TITLE: "Nach Autor, dann Titel",
		VALUE_BY_AUTHOR_SWAPPING: "Nach Autor, Namen vertauscht",
		VALUE_BY_FILENAME: "Nach Dateiname",
		VALUE_BY_FILENAME_AS_COMMENT: "Nach Dateiname, im Kommentar",
		OPTION_TITLE_SORTER: "Beim Sortieren 'titleSorter' benutzen",
		OPTION_FAVOURITE_FOLDERS: "Nur bevorzugte Ordner",
		ENABLED: "Aktiviert",
		DISABLED: "Deaktiviert",
		OPTION_IM_ROOT: "Stammverzeichnis interner Speicher",
		OPTION_CARD_SCAN: "SD/Memory Stick scannen",
		OPTION_MOUNT: "SD/Memory Stick mounten (experimentell)",
		NODE_RESCAN_INTERNAL_MEMORY: "Internen Speicher erneut scannen",
		NODE_COPY_TO_INTERNAL_MEMORY: "In den internen Speicher kopieren",
		NODE_COPY_TO_INTERNAL_MEMORY_COMMENT: "Kopiert Datei in das Stammverzeichnis des internen Speichers",
		NODE_COPY_AND_RESCAN: "Kopieren & internen Speicher erneut scannen",
		NODE_COPY_AND_RESCAN_COMMENT: "Kopiert Datei in das Stammverzeichnis des internen Speichers und scannt erneut",
		ERROR_TARGET_EXISTS: "Fehler, Zieldatei existiert bereits",
		NODE_BROWSE_FOLDERS: "Ordner durchsuchen",
		NODE_BROWSE_FOLDERS_SHORT: "Ordner",
		NODE_BROWSE_FOLDERS_COMMENT: "Dateisystem durchsuchen",
		NODE_INTERNAL_MEMORY: "Interner Speicher",
		NODE_MEMORY_STICK: "Memory Stick",
		NODE_MEMORY_STICK_MOUNT: "Memory Stick via mount",
		NODE_SD_CARD: "SD-Karte",
		NODE_SD_CARD_MOUNT: "SD-Karte via mount"
	},

	StatusBar: {
		TITLE: "Statusbalken"
	},

	StatusBar_Clock: {
		TITLE: "Uhr",
		OPTION_STYLE: "Zeitanzeige",
		VALUE_24H: "24 Stunden",
		VALUE_12H: "12 Stunden",
		OPTION_MODE: "Zeitansicht",
		VALUE_ALWAYS_SHOWN: "Immer anzeigen",
		VALUE_SHOWN_ONLY_IN_MENU: "Nur im Menü anzeigen",
		VALUE_SHOWN_WHEN_READING: "Nur beim Lesen anzeigen",
		VALUE_OFF: "AUS",
		ACTION_TOGGLE_CLOCK: "Uhr ein-/ausschalten",
		AM: "am",
		PM: "pm"
	},

	StatusBar_PageIndex: {
		TITLE: "Seiten-Index",
		INDEX_STYLE_BOOK: "Index-Stil in Büchern",
		INDEX_MODE_BOOK: "Index-Modus in Büchern",
		INDEX_MODE_MENU: "Index-Modus im Menü",
		INDEX_STYLE_MENU: "Index-Stil im Menü",
		OF: "von",
		ALWAYS_SHOWN: "Immer anzeigen",
		NEVER_SHOWN: "Nie anzeigen",
		NOT_SHOWN_IF_SINGLE_PAGE: "Nicht bei einzelner Seite anzeigen",
		VALUE_STATS0: "5 / 100 (Seiten pro Minute)",
		VALUE_STATS1: "5 / 100 (Zeit bis Buch-Ende)",
		VALUE_STATS2: "5 / 100 (SpM / Zeit bis Buch-Ende)"
	},

	EpubUserStyle: {
		OPTION_EPUB_CSS_FILE: "EPUB benutzerdefinierter Stil (CSS-Datei)",
		MSG_WARNING: "Bücher nach Ändern neu öffnen!",
		VALUE_DISABLED: "Deaktiviert"
	},

	BookHistory: {
		TITLE: "Buch-Verlauf",
		SHORT_TITLE: "Verlauf",
		VALUE_WHEN_ENTERING_BOOK: "Beim Buch Öffnen",
		VALUE_WHEN_EXITING_BOOK: "Beim Buch Schließen",
		VALUE_ALWAYS: "Immer",
		VALUE_NEVER: "Nie",
		VALUE_DISABLED: "Deaktiviert",
		OPTION_REPLACE: "Weiterlesen durch Verlauf ersetzen",
		VALUE_ON: "Aktiviert",
		VALUE_OFF: "Deaktiviert",
		OPTION_SKIP_BOOK_MENU: "Buch-Menü überspringen"
	},

	TextScale: {
		OPTION_SCALE_DEFAULT: "Standardgröße",
		VALUE_SMALL: "Kleine Schrift (S)",
		VALUE_MEDIUM: "Mittlere Schrift (M)",
		VALUE_LARGE: "Große Schrift (L)",
		VALUE_DISABLED: "Deaktiviert",
		VALUE_ENABLED: "Aktiviert"
	},

	MenuTuning: {
		OPTION_OUTER: "Oberste Menü-Ebene besteht aus"
	},

	MenuCustomizer: {
		TITLE: "Menü anpassen",
		VALUE_YES: "Ja",
		VALUE_NO: "Nein",
		VALUE_DEFAULT: "Default",
		SLOT: "Slot",
		UNMOVABLE_SLOT: "Fester slot",
		MENU_ITEM: "Menüpunkt",
		MENU_SEPARATOR: "Separator"
	},

	Dictionary: {
		TITLE: "Wörterbuch",
		WARN_DICT_DISABLED: "Wörterbuch ist deaktiviert!",
		WARN_DICT_DOESNT_EXIST: "Wörterbuch-Datei existiert nicht!",
		ACTION_DICTIONARY: "Wörterbuch öffnen",
		OPTION_DICTIONARY: "Wörterbuch-Datei",
		VALUE_DISABLED: "Deaktiviert",
		VALUE_DEFAULT: "Default"
	},

	MediaTag: {
		TITLE: "Bücher markieren",
		OPTION_POSITION: "Position markieren",
		VALUE_OVER_ICON: "Links (über dem Icon)",
		VALUE_BOTTOM: "Unten",
		VALUE_RIGHT: "Rechts",
		MARK_0: "Symbol 1 (Haken)",
		MARK_1: "Symbol 2 (Stern)",
		MARK_2: "Symbol 3 (Kreis)",
		MARK_3: "Symbol 4 (Rechteck)",
		MARK_4: "Symbol 5 (Dreieck)"
	},

	ScrollbarAlphabet: {
		TITLE: "Scrollbar Alphabet",
		OPT_ALPHABET: "Alphabet",
		VALUE_DEFAULT: "default"
	},

	Calc: {
		TITLE: "Taschenrechner",
		DESCRIPTION: ""
	},

	Converter: {
		CONVERTING_FB2: "Konvertiere fb2 zu epub...",
		NORMALLY_TAKES: "(normale Dauer 1-30 Sek.)",
		ERROR: "Fehler bei der Konvertierung",
		OPENING: "Öffne Buch"
	}
};