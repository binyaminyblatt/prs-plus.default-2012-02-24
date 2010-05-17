// Language: French
// Description: Localization file
// Translator: VICTORSJG, Duglum
//
// History:
//	2010-05-04 Initial version by VICTORSJG
//	2010-05-06 kartu - Added ppm related translations for PageIndex addon
//	2010-05-06 kartu - Added Duglum's corrections
//	2010-05-10 kartu - Added VICTORSJG's corrections
//	2010-05-11 kartu- Changed file encoding to UTF-8 from UTF-8Y
//				Added VALUE_DEFAULT_DATE (CoreLang)
//	2010-05-15 kartu - Added OPTION_SKIP_BOOK_MENU (BookHistory)
//	2010-05-15 kartu - Added PAGE (BookHistory)
//	2010-05-17 kravitz - Replaced PAGE (BookHistory) with added FUNC_PAGE_X

var FUNC_X_SOMETHING = function (n, s) {
	if (n > 1) {
		return n + " " + s[0];
	}
	if (n == 1) {
		return s[1];
	}
	return s[2];
};

var FUNC_X_BOOKS = function (n) {
	return FUNC_X_SOMETHING(n, ["livres", "1 livre", "Aucun livre"]);
};

var FUNC_X_SETTINGS = function (n) {
	return FUNC_X_SOMETHING(n, ["paramètres", "1 paramètres", "Aucun paramètres"]);
};

var FUNC_X_ITEMS = function (n) {
	return FUNC_X_SOMETHING(n, ["éléments", "1 élément", "Aucun paramètres"]);
};

var FUNC_X_PAGES = function (n) {
	return FUNC_X_SOMETHING(n, ["pages", "1 page", "Pas de page"]);
};

var FUNC_X_PICTURES = function (n) {
	return FUNC_X_SOMETHING(n, ["images", "1 image", "Pas de image"]);
};

var FUNC_X_SONGS = function (n) {
	return FUNC_X_SOMETHING(n, ["chansons", "1 chanson", "Pas de chanson"]);
};

var FUNC_X_BOOKMARKS = function (n) {
	return FUNC_X_SOMETHING(n, ["tous les signets", "1 marque-page", "Aucun marque-pages"]);
};

var FUNC_X_COLLECTIONS = function (n) {
	return FUNC_X_SOMETHING(n, ["collections", "1 collections", "Pas de collections"]);
};

var FUNC_PAGE_X = function (n) {
	return "Page " + n;
};

// Utility function, no need to localize
var toDoubleDigit = function (num) {
	if (num < 10) {
		return "0" + num;
	}
	return num;
};

var FUNC_GET_DATE = function (date) {
	var day, month, year;
	day = toDoubleDigit(date.getDate());
	month = toDoubleDigit(date.getMonth() + 1);
	year = date.getFullYear();
	return month + "/" + day + "/" + year;
};

var FUNC_GET_TIME = function (date) {
	var hour, minute;
	hour = toDoubleDigit(date.getHours());
	minute = toDoubleDigit(date.getMinutes());
	return hour + ":" + minute;
};

var FUNC_GET_DATE_TIME = function (date) {
	return date.toLocaleDateString() + " " + FUNC_GET_TIME(date);
};

return {
	// Standard stuff
	Sony: {
		// USB connected
		DO_NOT_DISCONNECT: "Ne débranchez pas!",
		USB_CONNECTED: "USB connecté",
		DEVICE_LOCKED: "Dispositif de verrouillage",

		// About, translate either all or none
		ABOUT_PRSP: "PRS+ Script: @@@script@@@\n" + "PRS+ Firmware: @@@firmware@@@\n" + "Author: Mikheil Sukhiashvili aka kartu (kartu3@gmail.com) using work of: " + "igorsk, boroda, obelix, pepak, llasram and others.\n" + "© GNU Lesser General Public License.",
		ABOUT_1: "Copyright ©2006-2008 Sony Corporation",
		ABOUT_2: "Adobe, the Adobe logo, Reader and PDF are either registered trademarks or" + " trademarks of Adobe Systems Incorporated in the United States and/or other countries.",
		ABOUT_3: "MPEG Layer-3 audio coding technology and patents licensed by Fraunhofer IIS and Thomson." + " MPEG-4 AAC audio coding technology licensed by Fraunhofer IIS (www.iis.fraunhofer.de/amm/).",
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
		EPUB_DOCUMENT: "Document EPUB",
		BBEB_BOOK: "Livre BBeB",
		PLAIN_TEXT: "Texte plaine",
		INTERNAL_MEMORY: "Mémoire Interne",
		MEMORY_STICK: "Memory Stick",
		SD_CARD: "Carte SD",

		// Main.xml & kbook.so stuff
		INVALID_FORMAT: "Format non valide",
		FORMATTING: "Formatage en cours...",
		LOADING: "Chargement en cours...",
		LOW_BATTERY: "Batterie faible!",
		HR_WARNING: "Vous voulez effacer tout le contenu et restaurer les paramètres initiaux et le statut de la DRM Auteurización?\n\nOui - Presse 5\nAucun - Presse MENU",
		DEVICE_SHUTDOWN: "Éteindre l'appareil",
		PRESS_MARK_TO_SHUTDOWN: "Marque de presse pour éteindre",
		THIS_DEVICE: "dispositif.",
		PRESS_MARK_TO_DELETE: "Marque de presse pour",
		THIS_BOOK: "supprimer le livre.",
		FORMAT_INTERNAL_MEMORY: "Formater Mémoire Interne",
		PRESS_MARK_TO_FORMAT: "Marque de presse pour formater",
		MSG_INTERNAL_MEMORY: "mémoire Interne.",
		RESTORE_DEFAULTS: "Restaurer les paramètres par défaut",
		PRESS_MARK_TO_RESTORE: "Marque de presse pour restaurer",
		DEFAULT_SETTINGS: "paramètres par défaut.",
		UPPER_PAGE: "PAGE",
		ONE_OF_ONE: "1 de 1",
		NO_BATTERY: "Batterie faible!",
		FORMATTING_INTERNAL_MEMORY: "Formatage Mémoire Interne en cours...",
		SHUTTING_DOWN: "Éteindre l'appareil",

		// Root menu
		CONTINUE: "Continuer la lecture",
		BOOKS_BY_TITLE: "Livres par Titre",
		BOOKS_BY_AUTHOR: "Livres par Auteur",
		BOOKS_BY_DATE: "Livres par Date",
		COLLECTIONS: "Collections",
		ALL_BOOKMARKS: "Tous les signets",
		NOW_PLAYING: "Lecture en cours",
		MUSIC: "Audio",
		PICTURES: "Images",
		SETTINGS: "Paramètres",

		// In Settings
		// orientation
		ORIENTATION: "Orientation",
		HORIZONTAL: "Horizontal",
		VERTICAL: "Vertical",
		// set date
		SET_DATE: "Date et heure",
		YEAR: "Année",
		MONTH: "Mois",
		DATE: "Jour", // Day
		HOUR: "Heure",
		MINUTE: "Minute",
		SETDATE_OK: "OK",
		// width in pixels = ..._SIZE * 35
		SETDATE_OK_SIZE: 2,
		// slideshow
		SLIDESHOW: "Mode Diaporamas",
		SS_ON: "Oui",
		SS_OFF: "Non",
		SS_TURN: "Turn",
		SS_DURATION: "Durée de la diapositive",
		// width in pixels = ..._SIZE * 35
		SS_SIZE: 2,
		SS_OK: "OK",
		// width in pixels = ..._SIZE * 35
		SS_OK_SIZE: 2,
		SECONDS: "Seconde",
		// auto standby (aka sleep mode)
		AUTOSTANDBY: "Mode veille",
		AS_ON: "Oui",
		AS_OFF: "Non",
		AS_TURN: "Turn",
		// width in pixels = ..._SIZE * 35
		AS_SIZE: 2,
		AS_OK: "OK",
		// width in pixels = ..._SIZE * 35
		AS_OK_SIZE: 2,
		// about
		ABOUT: "À propos de Reader",
		// reset to factory settings
		RESET_TO_FACTORY: "Restaurer les paramètres par défaut",

		// In Advanced Settings
		ADVANCED_SETTINGS: "Paramètres avancés",
		// screen lock (aka device lock)
		SCREEN_LOCK: "Verrouillage de l'appareil",
		SL_OFF: "Oui",
		SL_ON: "Non",
		SL_CODE: "Entrez le code",
		SL_TURN: "Turn",
		// width in pixels = ..._SIZE * 35
		SL_SIZE: 2,
		SL_OK: "OK",
		SL_OK_SIZE: 2,
		SL_OK_UNLOCK: "OK", // unlock
		// width in pixels = ..._SIZE * 35
		SL_OK_UNLOCK_SIZE: 2,
		// format device
		FORMAT_DEVICE: "Formater Mémoire Interne",

		// In Book menu
		BEGIN: "Début",
		END: "Fin",
		BOOKMARKS: "Signets",
		CONTENTS: "Table des matières",
		HISTORY: "Historique",
		INFO: "Infos",
		UTILITIES: "Utilitaires",

		// In Book Utilities
		REMOVE_ALL_BOOKMARKS: "Quitar Tous les signets",
		CLEAR_HISTORY: "Supprimer le Historique",
		DELETE_BOOK: "Supprimer le livre",

		// In Books by Date
		TODAY: "Hoy",
		EARLIER_THIS_WEEK: "Plus têt cette semaine",
		LAST_WEEK: "La semaine dernière",
		EARLIER_THIS_MONTH: "Plus tôt ce mois-ci",
		LAST_MONTH: "Mois dernier",
		EARLIER_THIS_QUARTER: "Antérieures ce trimestre",
		LAST_QUARTER: "Dernier trimestre",
		EARLIER_THIS_YEAR: "Plus tôt cette année",
		LAST_YEAR: "Année dernière",
		OLDER: "Plus",

		PAGE: "Page",
		PART: "Parte",
		OF: "de",
		NO_BOOK: "Aucun livre",
		NO_SONG: "Pas de chanson",

		// Info title strings, comma separated, no spaces after comma
		INFO_TITLES: "Couvrir,Titre,Auteur,Éditeur,Categoria,eBook ID,Type,Date,Taille,Emplacement,Fichier,Des droits numériques,Expire",

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
		CRITERION_9: "XYZxyz",
		TITLE_0: "Autres",
		CRITERION_0: "",

		FUNC_GET_DATE_TIME: FUNC_GET_DATE_TIME,
		FUNC_GET_DATE: FUNC_GET_DATE,
		FUNC_GET_TIME: FUNC_GET_TIME,

		FUNC_X_PAGES: FUNC_X_PAGES,
		FUNC_X_ITEMS: FUNC_X_ITEMS,
		FUNC_X_SETTINGS: FUNC_X_SETTINGS,
		FUNC_X_PICTURES: FUNC_X_PICTURES,
		FUNC_X_SONGS: FUNC_X_SONGS,
		FUNC_X_BOOKMARKS: FUNC_X_BOOKMARKS,
		FUNC_X_COLLECTIONS: FUNC_X_COLLECTIONS,
		FUNC_X_BOOKS: FUNC_X_BOOKS
	},

	// PRS+ stuff
	Core: {
		FUNC_X_BOOKS: FUNC_X_BOOKS,
		FUNC_X_SETTINGS: FUNC_X_SETTINGS,
		FUNC_X_ITEMS: FUNC_X_ITEMS,
		NODE_PRSP_SETTINGS: "PRS+ paramètres",
		NODE_OTHERS: "Multimédia",
		NODE_GAMES_AND_UTILS: "Jeux - Utilitaires",
		GROUP_MENU_TITLE: "Réglages de menu",
		GROUP_VIEWER_TITLE: "Paramètres Viewer"
	},

	CoreLang: {
		TITLE: "Emplacement",
		COMMENT: "Nécessite un redémarrage",
		OPTION_LANG: "Langue",

		OPTION_DATE_FORMAT: "Format Date",
		VALUE_DEFAULT_DATE: "Par défaut",
		ddMMMYY: "31/Jan/99",
		ddMONTHYY: "31/Janvier/99",
		ddMMMYYYY: "31/Jan/1999",
		ddMONTHYYYY: "31/Janvier/1999",

		OPTION_DATE_SEPARATOR: "Séparateur de Date",
		VALUE_SPACE: "Espace",
		VALUE_NONE: "Aucun",

		MONTH_SHORT_1: "Janv",
		MONTH_SHORT_2: "Févr",
		MONTH_SHORT_3: "Mars",
		MONTH_SHORT_4: "Avr",
		MONTH_SHORT_5: "Mai",
		MONTH_SHORT_6: "Juin",
		MONTH_SHORT_7: "Juil",
		MONTH_SHORT_8: "Août",
		MONTH_SHORT_9: "Sept",
		MONTH_SHORT_10: "Oct",
		MONTH_SHORT_11: "Nov",
		MONTH_SHORT_12: "Déc",

		MONTH_1: "Janvier",
		MONTH_2: "Février",
		MONTH_3: "Mars",
		MONTH_4: "Avril",
		MONTH_5: "Mai",
		MONTH_6: "Juin",
		MONTH_7: "Juillet",
		MONTH_8: "Août",
		MONTH_9: "Septembre",
		MONTH_10: "Octobre",
		MONTH_11: "Novembre",
		MONTH_12: "Décembre"
	},

	MenuCaptions: {
		OPTION_STYLE: "Menu Légendes Style",
		VALUE_SONY_DEFAULT: "Original Sony",
		VALUE_ALWAYS_SMALL: "Toujours petits",
		VALUE_ALWAYS_BIG: "Toujours grandes"
	},

	TextEncoding: {
		OPTION_TITLE: "TXT et RTF Livres Encoding",
		MSG_RESTART: "Nécessite un redémarrage!",
		LATIN: "Latin",
		RUSSIAN: "Russe(Windows-1251)"
	},

	KeyBindings: {
		TITLE: "Clés de configuration",
		DESCRIPTION: "Permet d'actions aux touches",

		DEFAULT_VALUE: "Par défaut",

		// Contexts
		GLOBAL: "À tout moment",
		IN_MENU: "Lorsque dans le menu",
		IN_BOOK: "Lorsque la lecture de livres",

		// Button groups
		NUM_BUTTONS: "Touches numériques",
		JP_BUTTONS: "Touches Joypad",
		OTHER_BUTTONS: "Autres boutons",
		VOLUME_BUTTONS: "Touches de volume",

		// Buttons
		BN_SIZE: "Zoom",
		BN_BOOKMARK: "Signet",
		BN_BL_NEXT: "Vers le bas à gauche 'suivante'",
		BN_BL_PREVIOUS: "Vers le bas à gauche 'précédent'",
		BN_SB_NEXT: "Sidebar 'suivante'",
		BN_SB_PREVIOUS: "Sidebar 'précédent'",
		BN_MENU: "Menu",
		BN_JP_LEFT: "Joypad à  gauche",
		BN_JP_RIGHT: "Joypad droit",
		BN_JP_UP: "Joypad jusqu'à ",
		BN_JP_DOWN: "Joypad vers le bas",
		BN_JP_CENTER: "Joypad centre",
		BN_H_SIZE: "Garder zoom",
		BN_H_BOOKMARK: "Garder marque",
		BN_H_BL_NEXT: "Garder vers le bas à  ga. 'suivante'",
		BN_H_BL_PREVIOUS: "Garder vers le bas à  ga. 'précédent'",
		BN_H_MENU: "Garder menu",
		BN_H_SB_NEXT: "Garder sidebar 'suivante'",
		BN_H_SB_PREVIOUS: "Garder sidebar 'précédent''",
		BN_H_JP_CENTER: "Garder joypad centre",
		BN_H_1: "Garder 1",
		BN_H_2: "Garder 2",
		BN_H_3: "Garder 3",
		BN_H_4: "Garder 4",
		BN_H_5: "Garder 5",
		BN_H_6: "Garder 6",
		BN_H_7: "Garder 7",
		BN_H_8: "Garder 8",
		BN_H_9: "Garder 9",
		BN_H_0: "Garder 0",
		BN_VOLUME_DOWN: "Volume -",
		BN_H_VOLUME_DOWN: "Garder Volume -",
		BN_VOLUME_UP: "Volume +",
		BN_H_VOLUME_UP: "Garder Volume +",

		// Actions
		ACTION_SHUTDOWN: "Éteindre l'appareil",
		ACTION_NEXT_PAGE: "Page suivante",
		ACTION_PREVIOUS_PAGE: "Page précédent",
		ACTION_NEXT_IN_HISTORY: "Suivante en el Historique",
		ACTION_PREVIOUS_IN_HISTORY: "Précédent en el Historique",
		ACTION_PREVIOUS_SONG: "Chanson précédent ",
		ACTION_NEXT_SONG: "Chanson suivante ",
		ACTION_GOTO_LINK: "Aller au lien"
	},

	Screenshot: {
		TITLE: "Capture d'écran",
		ACTION_TITLE: "Prendre une capture d'écran",
		SAVING_TO: "Enregistrement à",
		FAILED_TO_SAVE: "Impossible d'enregistrer",
		OPT_SAVETO: "Enregistrer...",
		OPT_FEEDBACK: "Afficher Enregistrer progrès",
		MEMORY_STICK: "Memory Stick",
		FEEDBACK_ON: "On",
		FEEDBACK_OFF: "Off",
		SD_CARD: "Carte SD",
		INTERNAL_MEMORY: "Mémoire Interne"
	},

	BrowseFolders: {
		TITLE: "Parcourir les dossiers",
		OPTION_SORTING_MODE: "Tri Mode",
		VALUE_BY_TITLE: "Par Titre",
		VALUE_BY_AUTHOR_THEN_TITLE: "Par auteur, puis le titre",
		VALUE_BY_AUTHOR_SWAPPING: "Par auteur échange Nom / Prénom",
		VALUE_BY_FILENAME: "Par nom de fichier",
		OPTION_TITLE_SORTER: "Trier par type d'ordre",
		ENABLED: "Permettre",
		DISABLED: "Handicapé",
		OPTION_IM_ROOT: "Mémoire interne dossier Root",
		OPTION_CARD_SCAN: "Carte SD / MS Scan",
		OPTION_MOUNT: "Utilisez mount avec les cartes SD / MS",
		NODE_RESCAN_INTERNAL_MEMORY: "Rescan mémoire interne",
		NODE_COPY_TO_INTERNAL_MEMORY: "Copier sur la mémoire interne",
		NODE_COPY_TO_INTERNAL_MEMORY_COMMENT: "Des copies de fichiers à la racine de la mémoire interne",
		NODE_COPY_AND_RESCAN: "Copy & Rescan mémoire interne",
		NODE_COPY_AND_RESCAN_COMMENT: "Des copies de fichiers à la racine de la mémoire interne et livres rescans",
		ERROR_TARGET_EXISTS: "Fichier d'erreur cible, il existe",
		NODE_BROWSE_FOLDERS: "Parcourir les dossiers",
		NODE_BROWSE_FOLDERS_COMMENT: "Parcourir le système de fichiers",
		NODE_INTERNAL_MEMORY: "Mémoire interne",
		NODE_MEMORY_STICK: "Memory Stick",
		NODE_MEMORY_STICK_MOUNT: "Memory Stick via le mont",
		NODE_SD_CARD: "Carte SD",
		NODE_SD_CARD_MOUNT: "Carte SD via le mont"
	},

	Clock: {
		TITLE: "Horloge",
		OPTION_STYLE: "Style de l'Horloge",
		VALUE_24H: "Format 24 Heures",
		VALUE_12H: "Format 12 Heures",
		OPTION_MODE: "Utiliser l'horloge",
		VALUE_ALWAYS_SHOWN: "Affiche toujours",
		VALUE_SHOWN_ONLY_IN_MENU: "Affiché uniquement dans le menu",
		VALUE_SHOWN_WHEN_READING: "Affiché uniquement lors de la lecture",
		VALUE_OFF: "Handicapé",
		ACTION_TOGGLE_CLOCK: "Basculer le Mode",
		AM: "am",
		PM: "pm"
	},

	PageIndex: {
		TITLE: "Pagination des livres et des menus",
		INDEX_STYLE_BOOK: "Style Index en Livres",
		INDEX_MODE_BOOK: "Mode Index en Livres",
		INDEX_MODE_MENU: "Mode Index dans le menu",
		INDEX_STYLE_MENU: "Style Index dans le menu",
		OF: "de",
		ALWAYS_SHOWN: "Toujours",
		NEVER_SHOWN: "Jamais",
		NOT_SHOWN_IF_SINGLE_PAGE: "Ne figure pas sur une seule page",
		VALUE_STATS0: "5 / 100 (pages par minute)",
		VALUE_STATS1: "5 / 100 (Le temps de terminer)",
		VALUE_STATS2: "5 / 100 (ppm / Le temps de terminer)"

	},

	EpubUserStyle: {
		OPTION_EPUB_CSS_FILE: "Style EPUB utilisateur (Fichier CSS)",
		MSG_WARNING: "Affecte uniquement les livres ouverts après!",
		VALUE_DISABLED: "Handicapé"
	},

	BookHistory: {
		FUNC_X_BOOKS: FUNC_X_BOOKS,
		FUNC_PAGE_X: FUNC_PAGE_X,
		TITLE: "Livre d'histoire",
		VALUE_DISABLED: "Désactivé",
		OPTION_REPLACE: "Histoire en continuer la lecture",
		VALUE_ON: "On",
		VALUE_OFF: "Off",
		OPTION_SKIP_BOOK_MENU: "Skip Book Menu" // TRANSLATE ME
	},

//ReadMark	ReadMark: {
//		TITLE_UNREAD: "Signets - Déjà lu",
//		TITLE_READ: "Signets - Pas encore lu",
//	},

	TextScale: {
		OPTION_SCALE_DEFAULT: "Échelle par défaut",
		VALUE_SMALL: "(S)Petite taille",
		VALUE_MEDIUM: "(M)Taille moyenne",
		VALUE_LARGE: "(L)Grande taille",
		VALUE_DISABLED: "Handicapé",
		VALUE_ENABLED: "Permettreée"
	},

	MenuTuning: {
		OPTION_OUTER: "Menu niveau supérieur ne contient"
	},

	Dictionary: {
		TITLE: "Dictionnaire",
		WARN_DICT_DISABLED: "Dictionnaire est désactivé!",
		WARN_DICT_DOESNT_EXIST: "Dictionnaire fichier n'existe pas!",
		ACTION_DICTIONARY: "Lancement dictionnaire",
		OPTION_DICTIONARY: "Dictionnaire fichier",
		VALUE_DISABLED: "Handicapé"
	}
};
