// Language: Spanish
// Description: Localization file
// Translator: surquizu, VICTORSJG
//
// History:
//	2010-04-30 kravitz - Refactored, added new strings
//	2010-05-01 kartu - Added ACTION_GOTO_LINK
//	2010-05-01 Translation is corrected by VICTORSJG
//	2010-05-02 kartu - Added dictionary strings
//	2010-05-02 kartu - Added translations and sizes for a number of strings, including "OK"
//	2010-05-03 kravitz - Renamed ReadingList to BookHistory, added new strings, refactored MenuTuning
//	2010-05-06 kartu - Added ppm related translations for PageIndex addon
//	2010-05-06 kartu - Added ppm related translations by VICTORSJG
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
//	2011-03-17 VICTORSJG - Added translations for newer functions
//	2011-03-23 kartu - Refactoring: moving functions out of lang files, moving texts to a spreadsheet

return {
	X: {
		BOOKS: ["libros", "1 libro", "Ningún libro"],
		SETTINGS: ["ajustes", "1 ajuste", "Ningún ajuste"]
	},
	
	// PRS+ stuff
	Core: {
		NODE_PRSP_SETTINGS: "Ajustes PRS+",
		NODE_OTHERS: "Multimedia",
		NODE_GAMES_AND_UTILS: "Juegos - Utilidades",
		GROUP_MENU_TITLE: "Menú Ajustes",
		GROUP_VIEWER_TITLE: "Ajustes Visor de Libros"
	},

	MenuCaptions: {
		OPTION_STYLE: "Estilo Títulos",
		VALUE_SONY_DEFAULT: "Original de Sony",
		VALUE_ALWAYS_SMALL: "Siempre pequeños",
		VALUE_ALWAYS_BIG: "Siempre grandes"
	},

	TextEncoding: {
		OPTION_TITLE: "Codificación de TXT y RTF",
		MSG_RESTART: "¡Requiere reinicio!",
		LATIN: "Carácteres latinos",
		RUSSIAN: "Carácteres rusos (W-1251)"
	},

	KeyBindings: {
		TITLE: "Configuración Teclas",
		DESCRIPTION: "Permite asignar acciones a las teclas",

		DEFAULT_VALUE: "Por defecto",

		// Contexts
		GLOBAL: "En todo momento",
		IN_MENU: "En los menús",
		IN_BOOK: "Durante la lectura",

		// Button groups
		NUM_BUTTONS: "Teclas numéricas",
		JP_BUTTONS: "Teclas del Joypad",
		OTHER_BUTTONS: "Otras teclas",
		VOLUME_BUTTONS: "Teclas de volumen",

		// Buttons
		BN_SIZE: "Zoom",
		BN_BOOKMARK: "Mark",
		BN_BL_NEXT: "Abajo izquierda 'siguiente'",
		BN_BL_PREVIOUS: "Abajo izquierda 'anterior'",
		BN_SB_NEXT: "Lateral 'siguiente'",
		BN_SB_PREVIOUS: "Lateral 'anterior'",
		BN_MENU: "Menú",
		BN_JP_LEFT: "Joypad izquierda",
		BN_JP_RIGHT: "Joypad derecha",
		BN_JP_UP: "Joypad arriba",
		BN_JP_DOWN: "Joypad abajo",
		BN_JP_CENTER: "Joypad centro",
		BN_H_SIZE: "Mantener zoom",
		BN_H_BOOKMARK: "Mantener mark",
		BN_H_BL_NEXT: "Mantener abajo izq. 'siguiente'",
		BN_H_BL_PREVIOUS: "Mantener abajo izq. 'anterior'",
		BN_H_MENU: "Mantener menú ",
		BN_H_SB_NEXT: "Mantener lateral 'siguiente'",
		BN_H_SB_PREVIOUS: "Mantener lateral 'anterior'",
		BN_H_JP_CENTER: "Mantener joypad centro",
		BN_H_1: "Mantener 1",
		BN_H_2: "Mantener 2",
		BN_H_3: "Mantener 3",
		BN_H_4: "Mantener 4",
		BN_H_5: "Mantener 5",
		BN_H_6: "Mantener 6",
		BN_H_7: "Mantener 7",
		BN_H_8: "Mantener 8",
		BN_H_9: "Mantener 9",
		BN_H_0: "Mantener 0",
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
		BN_VOLUME_DOWN: "Volumen -",
		BN_H_VOLUME_DOWN: "Mantener Volumen -",
		BN_VOLUME_UP: "Volumen +",
		BN_H_VOLUME_UP: "Mantener Volumen +"
	},

	StandardActions: {
		// Actions
		ACTION_SHUTDOWN: "Apagar",
		ACTION_NEXT_PAGE: "Siguiente página",
		ACTION_PREVIOUS_PAGE: "Página anterior",
		ACTION_NEXT_IN_HISTORY: "Siguiente en el Historial",
		ACTION_PREVIOUS_IN_HISTORY: "Anterior en el Historial",
		ACTION_PREVIOUS_SONG: "Anterior canción",
		ACTION_NEXT_SONG: "Siguiente canción",
		ACTION_GOTO_LINK: "Ir al enlace"
	},

	Screenshot: {
		TITLE: "Capturador de Pantallas",
		ACTION_TITLE: "Capturar pantalla",
		SAVING_TO: "Salvando en ",
		FAILED_TO_SAVE: "Fallo en captura",
		OPT_SAVETO: "Salvar en...",
		OPT_FEEDBACK: "Mostrar progreso de salvar",
		MEMORY_STICK: "Memory Stick",
		FEEDBACK_ON: "Activado",
		FEEDBACK_OFF: "Desactivado",
		SD_CARD: "Tarjeta SD",
		INTERNAL_MEMORY: "Memoria Interna"
	},

	BrowseFolders: {
		TITLE: "Explorador de Carpetas",
		OPTION_SORTING_MODE: "Tipo de Orden",
		VALUE_BY_TITLE: "Por título",
		VALUE_BY_AUTHOR_THEN_TITLE: "Por autor y luego título",
		VALUE_BY_AUTHOR_SWAPPING: "Por autor (nombre/apellido)",
		VALUE_BY_FILENAME: "Por archivo",
		OPTION_TITLE_SORTER: "Ordenar por tipo de orden",
		ENABLED: "Activado",
		DISABLED: "Desactivado",
		OPTION_IM_ROOT: "Raíz de la Memoria Interna",
		OPTION_CARD_SCAN: "Escaneo de tarjetas SD/MS",
		OPTION_MOUNT: "Montar SD/MS",
		NODE_RESCAN_INTERNAL_MEMORY: "Escaneo Memoria Interna",
		NODE_COPY_TO_INTERNAL_MEMORY: "Copiar a Memoria Interna",
		NODE_COPY_TO_INTERNAL_MEMORY_COMMENT: "Copiar a la raíz de la Memoria Interna",
		NODE_COPY_AND_RESCAN: "Copiar y escanear la Memoria Interna",
		NODE_COPY_AND_RESCAN_COMMENT: "Copiar a la raíz de la Memoria Interna y escanear",
		ERROR_TARGET_EXISTS: "Error, el archivo destino existe",
		NODE_BROWSE_FOLDERS: "Libros por Carpetas",
		NODE_BROWSE_FOLDERS_COMMENT: "Explorar",
		NODE_INTERNAL_MEMORY: "Memoria Interna",
		NODE_MEMORY_STICK: "Memory Stick",
		NODE_MEMORY_STICK_MOUNT: "Memory Stick a través de montaje",
		NODE_SD_CARD: "Tarjeta SD",
		NODE_SD_CARD_MOUNT: "Tarjeta SD a través de montaje"
	},

	StatusBar: {
		TITLE: "Barra de estado"
	},


	StatusBar_Clock: {
		TITLE: "Reloj",
		OPTION_STYLE: "Estilo del Reloj",
		VALUE_24H: "Formato 24 horas",
		VALUE_12H: "Formato 12 horas",
		OPTION_MODE: "Uso del Reloj",
		VALUE_ALWAYS_SHOWN: "Se muestra siempre",
		VALUE_SHOWN_ONLY_IN_MENU: "Sólo en los menús",
		VALUE_SHOWN_WHEN_READING: "Sólo en la lectura",
		VALUE_OFF: "Desactivado",
		ACTION_TOGGLE_CLOCK: "Alternar Reloj",
		AM: "am",
		PM: "pm"
	},

	StatusBar_PageIndex: {
		TITLE: "Paginación Libros y Menús",
		INDEX_STYLE_BOOK: "Formato Paginación Libro",
		INDEX_MODE_BOOK: "Muestra Paginación Libro",
		INDEX_MODE_MENU: "Muestra Paginación Menús",
		INDEX_STYLE_MENU: "Formato Paginación Menús",
		OF: "de",
		ALWAYS_SHOWN: "Siempre",
		NEVER_SHOWN: "Nunca",
		NOT_SHOWN_IF_SINGLE_PAGE: "Sólo si hay más de una página",
		VALUE_STATS0: "5 / 100 (páginas/minuto)",
		VALUE_STATS1: "5 / 100 (tiempo a final)",
		VALUE_STATS2: "5 / 100 (ppm / tiempo fin)"
	},

	EpubUserStyle: {
		OPTION_EPUB_CSS_FILE: "EPUB Archivo usario (css)",
		MSG_WARNING: "¡Sólo se aplica a libros abiertos después!",
		VALUE_DISABLED: "Desactivado"
	},

	BookHistory: {
		TITLE: "Historial del libro",
		VALUE_DISABLED: "Desactivado",
		OPTION_REPLACE: "Historial continuar leyendo",
		VALUE_ON: "Activado",
		VALUE_OFF: "Desactivado",
		OPTION_SKIP_BOOK_MENU: "Saltarse Menú Libro"
	},

	//ReadMark	ReadMark: {
	//		TITLE_UNREAD: "Marcadores - Ya leídos",
	//		TITLE_READ: "Marcadores - No leídos todavía",
	//	},

	TextScale: {
		OPTION_SCALE_DEFAULT: "Tamaño por defecto",
		VALUE_SMALL: "(S)Tamaño pequeño",
		VALUE_MEDIUM: "(M)Tamaño mediano",
		VALUE_LARGE: "(L)Tamaño grande",
		VALUE_DISABLED: "Desactivado",
		VALUE_ENABLED: "Activado"
	},

	MenuTuning: {
		OPTION_OUTER: "Opciones menú principal"
	},

	MenuCustomizer: {
		TITLE: "Menú personalización",
		VALUE_YES: "sí",
		VALUE_NO: "no",
		VALUE_DEFAULT: "por defecto",
		SLOT: "Posición",
		UNMOVABLE_SLOT: "Posición fija",
		MENU_ITEM: "Menú elemento",
		MENU_SEPARATOR: "Separador"
	},

	Dictionary: {
		TITLE: "Diccionario",
		WARN_DICT_DISABLED: "¡Diccionario desactivado!",
		WARN_DICT_DOESNT_EXIST: "¡No existe el archivo del diccionario!",
		ACTION_DICTIONARY: "Ejecutar diccionario",
		OPTION_DICTIONARY: "Archivo diccionario",
		VALUE_DISABLED: "Desactivado"
	},

	MediaTag: {
		TITLE: "Marcas de libros",
		OPTION_POSITION: "Posición de las marcas",
		VALUE_OVER_ICON: "Izquierda (sobre el icono)",
		VALUE_BOTTOM: "Debajo",
		VALUE_RIGHT: "Derecha",
		MARK_0: "Marca 1 (check)",
		MARK_1: "Marca 2 (estrella)",
		MARK_2: "Marca 3 (círculo)",
		MARK_3: "Marca 4 (cuadrado)",
		MARK_4: "Marca 5 (triángulo)"
	},

	ScrollbarAlphabet: {
		TITLE: "Abecedario de la barra de desplazamiento",
		OPT_ALPHABET: "Abecedario",
		VALUE_DEFAULT: "Por defecto"
	},

	Calc: {
		TITLE: "Calculadora",
		DESCRIPTION: ""
	},

	Converter: {
		CONVERTING_FB2: "Convirtiendo fb2 a epub...",
		NORMALLY_TAKES: "(normalmente tarda 1-30s)",
		ERROR: "Error de conversión",
		OPENING: "Abriendo libro"
	}
};
