// Language: Сatalan
// Description: Localization file
// Translator: surquizu
//
// History:
//	2010-04-30 kravitz - Refactored, added new strings
//	2010-05-01 kartu - Added ACTION_GOTO_LINK
//	2010-05-01 Translation is corrected by surquizu
//	2010-05-02 kartu - Added dictionary strings
//	2010-05-02 kartu - Added translations and sizes for a number of strings, including "OK"
//	2010-05-03 kravitz - Renamed ReadingList to BookHistory, added new strings, refactored MenuTuning
//	2010-05-06 kartu - Added ppm related translations for PageIndex addon
//	2010-05-07 Translation is corrected by surquizu
//	2010-05-09 kartu - Added surquizu's corrections
//	2010-05-11 kartu - Added VALUE_DEFAULT_DATE (CoreLang)
//	2010-05-15 kartu - Added OPTION_SKIP_BOOK_MENU (BookHistory)
//	2010-05-15 kartu - Added PAGE (BookHistory)
//	2010-05-17 kravitz - Replaced PAGE (BookHistory) with added FUNC_PAGE_X
//	2010-05-18 kartu - Merged with surquizu corrections
//	2010-05-18 kravitz - Replaced PAGE (Sony) with FUNC_PAGE_X
//	2010-05-20 kartu - Removed script reference from about string
//	2010-06-29 kartu - Split KeyBindings keys into KeyBindings and StandardActions
//				Added 0-9 translations
//	2011-03-15 SomeDeepBlue - corrected function names and added newer functions which are missing as of yet.
//                            newer functions are English only for now and still need to be translated
//	2011-03-17 surquizu - Added translations for newer functions
//	2011-03-23 kartu - Refactoring: moving functions out of lang files, moving texts to a spreadsheet

return {
	X: {
		BOOKS: ["llibres", "1 llibre", "Cap llibre"],
		SETTINGS: ["opcions", "1 opció", "Cap opció"]
	},
	
	// PRS+ stuff
	Core: {
		NODE_PRSP_SETTINGS: "Configuració PRS+",
		NODE_OTHERS: "Multimèdia",
		NODE_GAMES_AND_UTILS: "Jocs - Aplicacions",
		GROUP_MENU_TITLE: "Menú Configuració",
		GROUP_VIEWER_TITLE: "Visor Configuració Llibre"
	},

	MenuCaptions: {
		OPTION_STYLE: "Estil Títols",
		VALUE_SONY_DEFAULT: "Original Sony",
		VALUE_ALWAYS_SMALL: "Títols Petits",
		VALUE_ALWAYS_BIG: "Títols Grans"
	},

	TextEncoding: {
		OPTION_TITLE: "Codificació TXT i RTF",
		MSG_RESTART: "Cal reiniciar!",
		LATIN: "Caràcters Llatins",
		RUSSIAN: "Caràcters Russos (W-1251)"
	},

	KeyBindings: {
		TITLE: "Configuració Tecles",
		DESCRIPTION: "Permet asignar accions a les tecles",

		DEFAULT_VALUE: "Per defecte",

		// Contexts
		GLOBAL: "En tot moment",
		IN_MENU: "En els menús",
		IN_BOOK: "Durant la lectura",

		// Button groups
		NUM_BUTTONS: "Tecles numèriques",
		JP_BUTTONS: "Tecles del Joypad",
		OTHER_BUTTONS: "Altres tecles",
		VOLUME_BUTTONS: "Tecles del volum",

		// Buttons
		BN_SIZE: "Zoom",
		BN_BOOKMARK: "Mark",
		BN_BL_NEXT: "Abaix esquerra 'següent'",
		BN_BL_PREVIOUS: "Abaix esquerra 'anterior'",
		BN_SB_NEXT: "Lateral 'seguent'",
		BN_SB_PREVIOUS: "Lateral 'anterior'",
		BN_MENU: "Menú",
		BN_JP_LEFT: "Joypad esquerre",
		BN_JP_RIGHT: "Joypad dreta",
		BN_JP_UP: "Joypad amunt",
		BN_JP_DOWN: "Joypad abaix",
		BN_JP_CENTER: "Joypad centre",
		BN_H_SIZE: "Mantenir zoom",
		BN_H_BOOKMARK: "Mantenir Mark",
		BN_H_BL_NEXT: "Mantenir abaix esq. 'següent'",
		BN_H_BL_PREVIOUS: "Mantenir abaix esq. 'anterior'",
		BN_H_MENU: "Mantenir menú",
		BN_H_SB_NEXT: "Mantenir lateral 'següent'",
		BN_H_SB_PREVIOUS: "Mantenir lateral 'anterior'",
		BN_H_JP_CENTER: "Mantenir joypad centre",
		BN_H_1: "Mantenir 1",
		BN_H_2: "Mantenir 2",
		BN_H_3: "Mantenir 3",
		BN_H_4: "Mantenir 4",
		BN_H_5: "Mantenir 5",
		BN_H_6: "Mantenir 6",
		BN_H_7: "Mantenir 7",
		BN_H_8: "Mantenir 8",
		BN_H_9: "Mantenir 9",
		BN_H_0: "Mantenir 0",
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
		BN_VOLUME_DOWN: "Volum -",
		BN_H_VOLUME_DOWN: "Mantenir Volum -",
		BN_VOLUME_UP: "Volum +",
		BN_H_VOLUME_UP: "Mantenir Volum +"
	},

	StandardActions: {
		// Actions
		ACTION_SHUTDOWN: "Apagar",
		ACTION_NEXT_PAGE: "Pàgina Següent",
		ACTION_PREVIOUS_PAGE: "Pàgina Anterior",
		ACTION_NEXT_IN_HISTORY: "Proper en l'Historial",
		ACTION_PREVIOUS_IN_HISTORY: "Anterior en l'Historial",
		ACTION_PREVIOUS_SONG: "Anterior Cançó",
		ACTION_NEXT_SONG: "Següent Cançó",
		ACTION_GOTO_LINK: "Anar a Enllaç"
	},

	Screenshot: {
		TITLE: "Captura de Pantalles",
		ACTION_TITLE: "Captura de Pantalla",
		SAVING_TO: "Salvant a ",
		FAILED_TO_SAVE: "Captura fallida",
		OPT_SAVETO: "Salvar a ...",
		OPT_FEEDBACK: "Mostra progrés de salvar",
		MEMORY_STICK: "Memory Stick",
		FEEDBACK_ON: "Activat",
		FEEDBACK_OFF: "Desactivat",
		SD_CARD: "Targeta SD",
		INTERNAL_MEMORY: "Memòria Interna"
	},

	BrowseFolders: {
		TITLE: "Explorador de Carpetes",
		OPTION_SORTING_MODE: "Tipus d'Ordre",
		VALUE_BY_TITLE: "Per títol",
		VALUE_BY_AUTHOR_THEN_TITLE: "Per autor i després títol",
		VALUE_BY_AUTHOR_SWAPPING: "Per autor (nom/cognom)",
		VALUE_BY_FILENAME: "Per nom d'arxiu",
		OPTION_TITLE_SORTER: "Ordenar per Tipus d'Ordre",
		ENABLED: "Activat",
		DISABLED: "Desactivat",
		OPTION_IM_ROOT: "Arrel de la Memòria Interna",
		OPTION_CARD_SCAN: "Escaneja targetes SD/MS",
		OPTION_MOUNT: "Montar targetes SD/MS",
		NODE_RESCAN_INTERNAL_MEMORY: "Escaneja Memòria Interna",
		NODE_COPY_TO_INTERNAL_MEMORY: "Copia a Memòria Interna",
		NODE_COPY_TO_INTERNAL_MEMORY_COMMENT: "Copia arxius a l'arrel de la memòria interna",
		NODE_COPY_AND_RESCAN: "Copia i Escaneja memòria interna",
		NODE_COPY_AND_RESCAN_COMMENT: "Copia arxius a l'arrel de la Memòria Interna i escaneja",
		ERROR_TARGET_EXISTS: "Error, l'arxiu destí existeix",
		NODE_BROWSE_FOLDERS: "Llibres per Carpetes",
		NODE_BROWSE_FOLDERS_COMMENT: "Explorar",
		NODE_INTERNAL_MEMORY: "Memòria Interna",
		NODE_MEMORY_STICK: "Memory Stick",
		NODE_MEMORY_STICK_MOUNT: "Memory Stick a través de muntatge",
		NODE_SD_CARD: "Targeta SD",
		NODE_SD_CARD_MOUNT: "Targeta SD a través de muntatge"
	},

	StatusBar: {
		TITLE: "Barra d'Estat"
	},

	StatusBar_Clock: {
		TITLE: "Rellotge",
		OPTION_STYLE: "Estil Rellotge",
		VALUE_24H: "Format 24 hores",
		VALUE_12H: "Format 12 hores",
		OPTION_MODE: "Ús del Rellotge",
		VALUE_ALWAYS_SHOWN: "Es mostra sempre",
		VALUE_SHOWN_ONLY_IN_MENU: "Només en els menús",
		VALUE_SHOWN_WHEN_READING: "Només en la lectura",
		VALUE_OFF: "Desactivat",
		ACTION_TOGGLE_CLOCK: "Alternar rellotge",
		AM: "am",
		PM: "pm"
	},

	StatusBar_PageIndex: {
		TITLE: "Paginació Llibres i Menús",
		INDEX_STYLE_BOOK: "Format Paginació Llibre",
		INDEX_MODE_BOOK: "Mostra Paginació Llibre",
		INDEX_MODE_MENU: "Mostra Paginació Menús",
		INDEX_STYLE_MENU: "Format Paginació Menús",
		OF: "de",
		ALWAYS_SHOWN: "Sempre",
		NEVER_SHOWN: "Mai",
		NOT_SHOWN_IF_SINGLE_PAGE: "Més d'una pàgina",
		VALUE_STATS0: "5 / 100 (pàg. per minut)",
		VALUE_STATS1: "5 / 100 (temps per fi)",
		VALUE_STATS2: "5 / 100 (ppm / temps per fi)"
	},

	EpubUserStyle: {
		OPTION_EPUB_CSS_FILE: "EPUB Estil Usuari (CSS)",
		MSG_WARNING: "Només s'aplica a llibres oberts després!",
		VALUE_DISABLED: "Desactivat"
	},

	BookHistory: {
		TITLE: "Historial Llibre",
		VALUE_DISABLED: "Desactivat",
		OPTION_REPLACE: "Historial Continuar Llegint",
		VALUE_ON: "Activat",
		VALUE_OFF: "Desactivat",
		OPTION_SKIP_BOOK_MENU: "Saltar-se Menú Llibre"
	},

	TextScale: {
		OPTION_SCALE_DEFAULT: "Mida per defecte",
		VALUE_SMALL: "(S) Petita",
		VALUE_MEDIUM: "(M) Mitjana",
		VALUE_LARGE: "(L) Gran",
		VALUE_DISABLED: "Desactivat",
		VALUE_ENABLED: "Activat"
	},

	MenuTuning: {
		OPTION_OUTER: "Opció Menú Principal"
	},

	MenuCustomizer: {
		TITLE: "Menú Personalització",
		VALUE_YES: "SI",
		VALUE_NO: "NO",
		VALUE_DEFAULT: "Per defecte",
		SLOT: "Posició",
		UNMOVABLE_SLOT: "Posició Fixa",
		MENU_ITEM: "Menú Element",
		MENU_SEPARATOR: "Separador"
	},

	Dictionary: {
		TITLE: "Diccionari",
		WARN_DICT_DISABLED: "Diccionari desactivat!",
		WARN_DICT_DOESNT_EXIST: "No hi ha arxiu de Diccionari!",
		ACTION_DICTIONARY: "Obrir Diccionari",
		OPTION_DICTIONARY: "Arxiu del Diccionari",
		VALUE_DISABLED: "Desactivat"
	},

	MediaTag: {
		TITLE: "Marcar Llibres",
		OPTION_POSITION: "Posició de la Marca",
		VALUE_OVER_ICON: "Esquerra (sobre l'icona)",
		VALUE_BOTTOM: "Part Inferior",
		VALUE_RIGHT: "Dreta",
		MARK_0: "Marca 1 (Check)",
		MARK_1: "Marca 2 (Estrella)",
		MARK_2: "Marca 3 (Cercle)",
		MARK_3: "Marca 4 (Quadrat)",
		MARK_4: "Marca 5 (Triangle)"
	},

	ScrollbarAlphabet: {
		TITLE: "Barra Desplaçament de l'Abecedari",
		OPT_ALPHABET: "Abecedari",
		VALUE_DEFAULT: "Per defecte"
	},

	Calc: {
		TITLE: "Calculadora",
		DESCRIPTION: ""
	},

	Converter: {
		CONVERTING_FB2: "Convertint fb2 a ePub...",
		NORMALLY_TAKES: "(normalment tarda 1-30s)",
		ERROR: "Error de Conversió",
		OPENING: "Obrint Llibre"
	}
};
