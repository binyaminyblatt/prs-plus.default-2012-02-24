// Language: Italian
// Description: Localization file
// Translator: Samhain
//
// History:
//	2010-09-07 kartu - Initial version by Samhain
//	2011-03-15 SomeDeepBlue - corrected function names and added newer functions which are missing as of yet.
//                            newer functions are English only for now and still need to be translated
//	2011-03-23 kartu - Refactoring: moving functions out of lang files, moving texts to a spreadsheet

return {
	X: {
		BOOKS: ["libri", "1 libro", "Nessun libro"],
		SETTINGS: ["impostazioni", "1 impostazione", "Nessuna impostazione"]
	},

	// PRS+ stuff
	Core: {
		NODE_PRSP_SETTINGS: "Impostazioni PRS+",
		NODE_OTHERS: "Multimedia",
		NODE_GAMES_AND_UTILS: "Giochi e Utilità",
		GROUP_MENU_TITLE: "Impostazioni Menu",
		GROUP_VIEWER_TITLE: "Impostazioni Visualizzazione"
	},

	MenuCaptions: {
		OPTION_STYLE: "Stile Didascalie Menu",
		VALUE_SONY_DEFAULT: "Default Sony",
		VALUE_ALWAYS_SMALL: "Sempre piccole",
		VALUE_ALWAYS_BIG: "Sempre grande"
	},

	TextEncoding: {
		OPTION_TITLE: "Codifica Libri TXT e RTF",
		MSG_RESTART: "Richiede riavvio!",
		LATIN: "Latino",
		RUSSIAN: "Russo (Windows-1251)"
	},

	KeyBindings: {
		TITLE: "Associazione Tasti",
		DESCRIPTION: "Permette di associare delle azioni ai tasti",

		DEFAULT_VALUE: "Default",

		// Contexts
		GLOBAL: "Globale",
		IN_MENU: "Nel Menu",
		IN_BOOK: "Durante la Lettura",

		// Button groups
		NUM_BUTTONS: "Tasti Numerici",
		JP_BUTTONS: "Tasti del Joypad",
		OTHER_BUTTONS: "Altri Tasti",
		VOLUME_BUTTONS: "Tasti Volume",

		// Buttons
		BN_SIZE: "Tasto Dimensione",
		BN_BOOKMARK: "Tasto Segnalibro",
		BN_BL_NEXT: "'Prossima' in basso a sinistra",
		BN_BL_PREVIOUS: "'Precedente' in basso a sinistra",
		BN_SB_NEXT: "'Prossima' Laterale",
		BN_SB_PREVIOUS: "'Precedente' Laterale",
		BN_MENU: "Tasto Menu",
		BN_JP_LEFT: "Joypad Sinistra",
		BN_JP_RIGHT: "Joypad Destra",
		BN_JP_UP: "Joypad Su",
		BN_JP_DOWN: "Joypad Giu",
		BN_JP_CENTER: "Joypad Centro",
		BN_H_SIZE: "Lunga Pressione Tasto Dimensione",
		BN_H_BOOKMARK: "Lunga Pressione Tasto Segnalibro",
		BN_H_BL_NEXT: "Lunga Pressione 'Prossima' in basso a sinistra",
		BN_H_BL_PREVIOUS: "Lunga Pressione 'Precedente' in basso a sinistra",
		BN_H_MENU: "Lunga Pressione Tasto Menu",
		BN_H_SB_NEXT: "Lunga Pressione 'Prossima' laterale",
		BN_H_SB_PREVIOUS: "Lunga Pressione 'Precedente' laterale",
		BN_H_JP_CENTER: "Lunga Pressione Joypad Centro",
		BN_H_1: "Lunga Pressione 1",
		BN_H_2: "Lunga Pressione 2",
		BN_H_3: "Lunga Pressione 3",
		BN_H_4: "Lunga Pressione 4",
		BN_H_5: "Lunga Pressione 5",
		BN_H_6: "Lunga Pressione 6",
		BN_H_7: "Lunga Pressione 7",
		BN_H_8: "Lunga Pressione 8",
		BN_H_9: "Lunga Pressione 9",
		BN_H_0: "Lunga Pressione 0",
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
		BN_VOLUME_DOWN: "Volume -",
		BN_H_VOLUME_DOWN: "Lunga Pressione Volume -",
		BN_VOLUME_UP: "Volume +",
		BN_H_VOLUME_UP: "Lunga Pressione Volume +"
	},

	StandardActions: {
		// Actions
		ACTION_SHUTDOWN: "Spegni",
		ACTION_NEXT_PAGE: "Prossima Pagina",
		ACTION_PREVIOUS_PAGE: "Pagina Precedente",
		ACTION_NEXT_IN_HISTORY: "Prossimo nella Cronologia",
		ACTION_PREVIOUS_IN_HISTORY: "Precedente nella Cronologia",
		ACTION_PREVIOUS_SONG: "Canzone Precedente",
		ACTION_NEXT_SONG: "Prossima Canzone",
		ACTION_GOTO_LINK: "Segui Link"
	},

	Screenshot: {
		TITLE: "Screenshot",
		ACTION_TITLE: "Prendi uno Screenshot",
		SAVING_TO: "Salva in ",
		FAILED_TO_SAVE: "Salvataggio fallito",
		OPT_SAVETO: "Salva in",
		OPT_FEEDBACK: "Mostra progresso salvataggio",
		MEMORY_STICK: "Memory stick",
		FEEDBACK_ON: "On",
		FEEDBACK_OFF: "Off",
		SD_CARD: " Scheda SD",
		INTERNAL_MEMORY: "Memoria Interna"
	},

	BrowseFolders: {
		TITLE: "Sfoglia Cartelle",
		OPTION_SORTING_MODE: "Ordina",
		VALUE_BY_TITLE: "Per titolo",
		VALUE_BY_AUTHOR_THEN_TITLE: "Per autore e poi titolo",
		VALUE_BY_AUTHOR_SWAPPING: "Per autore scambiando Nome/Cognome",
		VALUE_BY_FILENAME: "Per nome del file",
		OPTION_TITLE_SORTER: "Usa il campo 'titleSorter'",
		ENABLED: "Abilitato",
		DISABLED: "Disabilitato",
		OPTION_IM_ROOT: "Root della Memoria Interna",
		OPTION_CARD_SCAN: "Leggi Scheda SD/MS",
		OPTION_MOUNT: "Usa Mount con SD/MS (sperimentale)",
		NODE_RESCAN_INTERNAL_MEMORY: "Rileggi la Memoria Interna",
		NODE_COPY_TO_INTERNAL_MEMORY: "Copia nella Memoria Interna",
		NODE_COPY_TO_INTERNAL_MEMORY_COMMENT: "Copia file nella root della Memoria Interna",
		NODE_COPY_AND_RESCAN: "Copia & Rileggi la Memoria Interna",
		NODE_COPY_AND_RESCAN_COMMENT: "Copia file nella root della Memoria Interna e scansiona libri",
		ERROR_TARGET_EXISTS: "Errore, il file di destinazione esiste",
		NODE_BROWSE_FOLDERS: "Sfoglia Cartelle",
		NODE_BROWSE_FOLDERS_COMMENT: "Sfoglia il file system",
		NODE_INTERNAL_MEMORY: "Memoria Interna",
		NODE_MEMORY_STICK: "Memory Stick",
		NODE_MEMORY_STICK_MOUNT: "Memory Stick con Mount",
		NODE_SD_CARD: "Scheda SD",
		NODE_SD_CARD_MOUNT: "Scheda SD con Mount"
	},

	StatusBar: {
		TITLE: "Status Bar"
	},


	StatusBar_Clock: {
		TITLE: "Orologio",
		OPTION_STYLE: "Stile Orologio",
		VALUE_24H: "24 ore",
		VALUE_12H: "12 ore",
		OPTION_MODE: "Modalità Orologio",
		VALUE_ALWAYS_SHOWN: "Mostra sempre",
		VALUE_SHOWN_ONLY_IN_MENU: "Mostra solo nel menu",
		VALUE_SHOWN_WHEN_READING: "Mostra solo durante lettura",
		VALUE_OFF: "Spento",
		ACTION_TOGGLE_CLOCK: "Cambia Clock",
		AM: "am",
		PM: "pm"
	},

	StatusBar_PageIndex: {
		TITLE: "Indice Pagine",
		INDEX_STYLE_BOOK: "Stile Indice in Libri",
		INDEX_MODE_BOOK: "Modalità Indice in Libri",
		INDEX_MODE_MENU: "Modalità Indice in Menu",
		INDEX_STYLE_MENU: "Stile Indice in Menu",
		OF: "di",
		ALWAYS_SHOWN: "Mostra sempre",
		NEVER_SHOWN: "Non mostrare",
		NOT_SHOWN_IF_SINGLE_PAGE: "Non mostrare nelle pagine singole",
		VALUE_STATS0: "5 / 100 (pagine per minuto)",
		VALUE_STATS1: "5 / 100 (tempo alla fine)",
		VALUE_STATS2: "5 / 100 (ppm / tempo alla fine)"
	},

	EpubUserStyle: {
		OPTION_EPUB_CSS_FILE: "Stile EPUB Utente (CSS File)",
		MSG_WARNING: "Agisce sui prossimi libri aperti!",
		VALUE_DISABLED: "Disabilitato"
	},

	BookHistory: {
		TITLE: "Cronologia Libro",
		VALUE_DISABLED: "Disabilitato",
		OPTION_REPLACE: "Cronologia in Continua Lettura",
		VALUE_ON: "On",
		VALUE_OFF: "Off",
		OPTION_SKIP_BOOK_MENU: "Salta il Menu Libro"
	},

	TextScale: {
		OPTION_SCALE_DEFAULT: "Dimensione di default",
		VALUE_SMALL: "(S)mall",
		VALUE_MEDIUM: "(M)edium",
		VALUE_LARGE: "(L)arge",
		VALUE_DISABLED: "Disabilitato",
		VALUE_ENABLED: "Abilitato"
	},

	MenuTuning: {
		OPTION_OUTER: "Menu in alto contiene"
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
		TITLE: "Dizionario",
		WARN_DICT_DISABLED: "Dizionario disabilitato!",
		WARN_DICT_DOESNT_EXIST: "Il file del dizionario non esiste!",
		ACTION_DICTIONARY: "Lancia Dizionario",
		OPTION_DICTIONARY: "File Dizionario",
		VALUE_DISABLED: "Disabilitato"
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
