// Language: French
// Description: Localization file
// Translator: VICTORSJG, Duglum, ronnn
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
//	2010-05-18 kravitz - Replaced PAGE (Sony) with FUNC_PAGE_X
//				Added VICTORSJG's corrections
//	2010-05-20 kartu - Removed script reference from about string
//	2010-06-14 ronnn - Minor translation correction
//	2010-06-29 kartu - Changed encoding to UTF-8 from win1250

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
        return FUNC_X_SOMETHING(n, ["param�tres", "1 param�tres", "Aucun param�tres"]);
};

var FUNC_X_ITEMS = function (n) {
        return FUNC_X_SOMETHING(n, ["�l�ments", "1 �l�ment", "Aucun param�tres"]);
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
                DO_NOT_DISCONNECT: "Ne d�branchez pas!",
                USB_CONNECTED: "USB connect�",
                DEVICE_LOCKED: "Dispositif de verrouillage",

                // About, translate either all or none
                ABOUT_PRSP: "PRS+ @@@firmware@@@\n" + "Author: Mikheil Sukhiashvili aka kartu (kartu3@gmail.com) using work of: " + "igorsk, boroda, obelix, pepak, kravitz and others.\n" + "� GNU Lesser General Public License.",
                ABOUT_1: "Copyright �2006-2008 Sony Corporation",
                ABOUT_2: "Adobe, the Adobe logo, Reader and PDF are either registered trademarks or" + " trademarks of Adobe Systems Incorporated in the United States and/or other countries.",
                ABOUT_3: "MPEG Layer-3 audio coding technology and patents licensed by Fraunhofer IIS and Thomson." + " MPEG-4 AAC audio coding technology licensed by Fraunhofer IIS (www.iis.fraunhofer.de/amm/).",
                ABOUT_4: "Application software designed and implemented by Kinoma (www.kinoma.com). Portions Copyright �2006,2007 Kinoma, Inc.",
                ABOUT_5: "Bitstream is a registered trademark, and Dutch, Font Fusion, and Swiss are trademarks, of Bitstream, Inc.",
                ABOUT_6: "Portions of this software are Copyright �2005 The FreeType Project (www.freetype.org). All rights reserved.",
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
                PLAIN_TEXT: "Texte",
                INTERNAL_MEMORY: "M�moire Interne",
                MEMORY_STICK: "Memory Stick",
                SD_CARD: "Carte SD",

                // Main.xml & kbook.so stuff
                INVALID_FORMAT: "Format non valide",
                FORMATTING: "Formatage en cours...",
                LOADING: "Chargement en cours...",
                LOW_BATTERY: "Batterie faible!",
                HR_WARNING: "Vous voulez effacer tout le contenu et restaurer les param�tres initiaux et le param�trage des verroux numeriques?\n\nOui - Touche 5\nAucun - Touch MENU",
                DEVICE_SHUTDOWN: "�teindre l'appareil",
                PRESS_MARK_TO_SHUTDOWN: "Appuyer sur SIGNET pour �teindre",
                THIS_DEVICE: "l'appareil.",
                PRESS_MARK_TO_DELETE: "Appuyer sur SIGNET pour",
                THIS_BOOK: "supprimer le livre.",
                FORMAT_INTERNAL_MEMORY: "Formater M�moire Interne",
                PRESS_MARK_TO_FORMAT: "Appuyer sur SIGNET pour formater",
                MSG_INTERNAL_MEMORY: "la m�moire Interne.",
                RESTORE_DEFAULTS: "Restaurer les param�tres par d�faut",
                PRESS_MARK_TO_RESTORE: "Appuyer sur SIGNET pour restaurer",
                DEFAULT_SETTINGS: "les param�tres par d�faut.",
                UPPER_PAGE: "PAGE",
                ONE_OF_ONE: "1 de 1",
                NO_BATTERY: "Batterie vide!",
                FORMATTING_INTERNAL_MEMORY: "Formatage M�moire Interne en cours...",
                SHUTTING_DOWN: "�teindre l'appareil",

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
                SETTINGS: "Param�tres",

                // In Settings
                // orientation
                ORIENTATION: "Orientation",
                HORIZONTAL: "Horizontal",
                VERTICAL: "Vertical",
                // set date
                SET_DATE: "Date et heure",
                YEAR: "Ann�e",
                MONTH: "Mois",
                DATE: "Jour", // Day
                HOUR: "Heure",
                MINUTE: "Minute",
                SETDATE_OK: "OK",
                // width in pixels = ..._SIZE * 35
                SETDATE_OK_SIZE: 2,
                // slideshow
                SLIDESHOW: "Mode Diaporama",
                SS_ON: "Oui",
                SS_OFF: "Non",
                SS_TURN: "Turn",
                SS_DURATION: "Dur�e de la diapositive",
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
                ABOUT: "� propos de Reader",
                // reset to factory settings
                RESET_TO_FACTORY: "Restaurer les param�tres par d�faut",


                // In Advanced Settings
                ADVANCED_SETTINGS: "Param�tres avanc�s",
                // screen lock (aka device lock)
                SCREEN_LOCK: "Verrouillage de l'appareil",
                SL_OFF: "Oui",
                SL_ON: "Non",
                SL_CODE: "Entrez le code",
                SL_TURN: "Activation",
                // width in pixels = ..._SIZE * 35
                SL_SIZE: 2,
                SL_OK: "OK",
                SL_OK_SIZE: 2,
                SL_OK_UNLOCK: "OK", // unlock
                // width in pixels = ..._SIZE * 35
                SL_OK_UNLOCK_SIZE: 2,
                // format device
                FORMAT_DEVICE: "Formatage M�moire Interne",

                // In Book menu
                BEGIN: "D�but",
                END: "Fin",
                BOOKMARKS: "Signets",
                CONTENTS: "Table des mati�res",
                HISTORY: "Historique",
                INFO: "Infos",
                UTILITIES: "Utilitaires",

                // In Book Utilities
                REMOVE_ALL_BOOKMARKS: "Supprimer tous les signets",
                CLEAR_HISTORY: "Supprimer l'historique",
                DELETE_BOOK: "Supprimer le livre",

                // In Books by Date
                TODAY: "Aujourd'hui",
                EARLIER_THIS_WEEK: "Plus t�t cette semaine",
                LAST_WEEK: "La semaine derni�re",
                EARLIER_THIS_MONTH: "Plus t�t ce mois-ci",
                LAST_MONTH: "Mois dernier",
                EARLIER_THIS_QUARTER: "Ant�rieures ce trimestre",
                LAST_QUARTER: "Dernier trimestre",
                EARLIER_THIS_YEAR: "Plus t�t cette ann�e",
                LAST_YEAR: "Ann�e derni�re",
                OLDER: "Plus",

                FUNC_PAGE_X: FUNC_PAGE_X,
                PART: "Parte",
                OF: "de",
                NO_BOOK: "Aucun livre",
                NO_SONG: "Pas de chanson",

                // Info title strings, comma separated, no spaces after comma
                INFO_TITLES: "Couvrir,Titre,Auteur,�diteur,Categoria,eBook ID,Type,Date,Taille,Emplacement,Fichier,Des droits num�riques,Expire",

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
                NODE_PRSP_SETTINGS: "PRS+ param�tres",
                NODE_OTHERS: "Multim�dia",
                NODE_GAMES_AND_UTILS: "Jeux - Utilitaires",
                GROUP_MENU_TITLE: "R�glages de menu",
                GROUP_VIEWER_TITLE: "Param�tres Viewer"
        },

        CoreLang: {
                TITLE: "Emplacement",
                COMMENT: "N�cessite un red�marrage",
                OPTION_LANG: "Langue",

                OPTION_DATE_FORMAT: "Format Date",
                VALUE_DEFAULT_DATE: "Par d�faut",
                ddMMMYY: "31/Jan/99",
                ddMONTHYY: "31/Janvier/99",
                ddMMMYYYY: "31/Jan/1999",
                ddMONTHYYYY: "31/Janvier/1999",

                OPTION_DATE_SEPARATOR: "S�parateur de Date",
                VALUE_SPACE: "Espace",
                VALUE_NONE: "Aucun",

                MONTH_SHORT_1: "Janv",
                MONTH_SHORT_2: "F�vr",
                MONTH_SHORT_3: "Mars",
                MONTH_SHORT_4: "Avr",
                MONTH_SHORT_5: "Mai",
                MONTH_SHORT_6: "Juin",
                MONTH_SHORT_7: "Juil",
                MONTH_SHORT_8: "Ao�t",
                MONTH_SHORT_9: "Sept",
                MONTH_SHORT_10: "Oct",
                MONTH_SHORT_11: "Nov",
                MONTH_SHORT_12: "D�c",

                MONTH_1: "Janvier",
                MONTH_2: "F�vrier",
                MONTH_3: "Mars",
                MONTH_4: "Avril",
                MONTH_5: "Mai",
                MONTH_6: "Juin",
                MONTH_7: "Juillet",
                MONTH_8: "Ao�t",
                MONTH_9: "Septembre",
                MONTH_10: "Octobre",
                MONTH_11: "Novembre",
                MONTH_12: "D�cembre"
        },

        MenuCaptions: {
                OPTION_STYLE: "Menu L�gendes Style",
                VALUE_SONY_DEFAULT: "Original Sony",
                VALUE_ALWAYS_SMALL: "Toujours petits",
                VALUE_ALWAYS_BIG: "Toujours grandes"
        },

        TextEncoding: {
                OPTION_TITLE: "TXT et RTF Livres Encoding",
                MSG_RESTART: "N�cessite un red�marrage!",
                LATIN: "Latin",
                RUSSIAN: "Russe(Windows-1251)"
        },

        KeyBindings: {
                TITLE: "Configuration des touches",
                DESCRIPTION: "Affectation d'actions aux touches",

                DEFAULT_VALUE: "Par d�faut",

                // Contexts
                GLOBAL: "� tout moment",
                IN_MENU: "Dans les menus",
                IN_BOOK: "Lors de la lecture de livres",

                // Button groups
                NUM_BUTTONS: "Touches num�riques",
                JP_BUTTONS: "Touches Joypad",
                OTHER_BUTTONS: "Autres boutons",
                VOLUME_BUTTONS: "Touches de volume",

                // Buttons
                BN_SIZE: "Zoom",
                BN_BOOKMARK: "Signet",
                BN_BL_NEXT: "'Page suivante' � gauche",
                BN_BL_PREVIOUS: "'Page pr�c�dente' � gauche",
                BN_SB_NEXT: "'Page suivante' sidebar droite",
                BN_SB_PREVIOUS: "'Page pr�c�dente' sidebar droite",
                BN_MENU: "Menu",
                BN_JP_LEFT: "Joypad gauche",
                BN_JP_RIGHT: "Joypad droit",
                BN_JP_UP: "Joypad haut ",
                BN_JP_DOWN: "Joypad bas",
                BN_JP_CENTER: "Joypad centre",
                BN_H_SIZE: "Maintenir Zoom",
                BN_H_BOOKMARK: "Maintenir Signet",
                BN_H_BL_NEXT:     "Maintenir 'Page suivante' � gauche",
                BN_H_BL_PREVIOUS: "Maintenir 'Page pr�c�dente' � gauche",
                BN_H_MENU: "Maintenir Menu",
                BN_H_SB_NEXT: "Maintenir 'Page suivante' sidebar",
                BN_H_SB_PREVIOUS: "Maintenir 'Page pr�c�dente' sidebar",
                BN_H_JP_CENTER: "Maintenir joypad centre",
                BN_H_1: "Maintenir 1",
                BN_H_2: "Maintenir 2",
                BN_H_3: "Maintenir 3",
                BN_H_4: "Maintenir 4",
                BN_H_5: "Maintenir 5",
                BN_H_6: "Maintenir 6",
                BN_H_7: "Maintenir 7",
                BN_H_8: "Maintenir 8",
                BN_H_9: "Maintenir 9",
                BN_H_0: "Maintenir 0",
                BN_VOLUME_DOWN: "Volume -",
                BN_H_VOLUME_DOWN: "Maintenir Volume -",
                BN_VOLUME_UP: "Volume +",
                BN_H_VOLUME_UP: "Maintenir Volume +",


                // Actions
                ACTION_SHUTDOWN: "�teindre l'appareil",
                ACTION_NEXT_PAGE: "Page suivante",
                ACTION_PREVIOUS_PAGE: "Page pr�c�dent",
                ACTION_NEXT_IN_HISTORY: "Suivant dans l'historique",
                ACTION_PREVIOUS_IN_HISTORY: "Pr�c�dent dans l'historique",
                ACTION_PREVIOUS_SONG: "Chanson pr�c�dente",
                ACTION_NEXT_SONG: "Chanson suivante",
                ACTION_GOTO_LINK: "Aller au lien"
        },

        Screenshot: {
                TITLE: "Capture d'�cran",
                ACTION_TITLE: "Prendre une capture d'�cran",
                SAVING_TO: "Enregistrement dans",
                FAILED_TO_SAVE: "Impossible d'enregistrer",
                OPT_SAVETO: "Enregistrer...",
                OPT_FEEDBACK: "Afficher la progresson de l'enregistrement",
                MEMORY_STICK: "Memory Stick",
                FEEDBACK_ON: "On",
                FEEDBACK_OFF: "Off",
                SD_CARD: "Carte SD",
                INTERNAL_MEMORY: "M�moire Interne"
        },

        BrowseFolders: {
                TITLE: "Parcourir les dossiers",
                OPTION_SORTING_MODE: "Mode de tri",
                VALUE_BY_TITLE: "Par Titre",
                VALUE_BY_AUTHOR_THEN_TITLE: "Par auteur, puis le titre",
                VALUE_BY_AUTHOR_SWAPPING: "Par auteur �change Nom / Pr�nom",
                VALUE_BY_FILENAME: "Par nom de fichier",
                OPTION_TITLE_SORTER: "Trier par type d'ordre",
                ENABLED: "Activ�",
                DISABLED: "D�sactiv�",
                OPTION_IM_ROOT: "Dossier racine de la m�moire interne",
                OPTION_CARD_SCAN: "Scan de la Carte SD/MS",
                OPTION_MOUNT: "Utilisez mount avec les cartes SD/MS",
                NODE_RESCAN_INTERNAL_MEMORY: "Rescan m�moire interne",
                NODE_COPY_TO_INTERNAL_MEMORY: "Copier dans la m�moire interne",
                NODE_COPY_TO_INTERNAL_MEMORY_COMMENT: "Copie de fichiers � la racine de la m�moire interne",
                NODE_COPY_AND_RESCAN: "Copie & Rescan m�moire interne",
                NODE_COPY_AND_RESCAN_COMMENT: "Copie de fichiers � la racine de la m�moire interne et rescan",
                ERROR_TARGET_EXISTS: "Erreur, le fichier existe",
                NODE_BROWSE_FOLDERS: "Parcourir les dossiers",
                NODE_BROWSE_FOLDERS_COMMENT: "Parcourir le syst�me de fichiers",
                NODE_INTERNAL_MEMORY: "M�moire interne",
                NODE_MEMORY_STICK: "Memory Stick",
                NODE_MEMORY_STICK_MOUNT: "Memory Stick via Mount",
                NODE_SD_CARD: "Carte SD",
                NODE_SD_CARD_MOUNT: "Carte SD via Mount"
        },

        Clock: {
                TITLE: "Horloge",
                OPTION_STYLE: "Style de l'Horloge",
                VALUE_24H: "Format 24 Heures",
                VALUE_12H: "Format 12 Heures",
                OPTION_MODE: "Utiliser l'horloge",
                VALUE_ALWAYS_SHOWN: "Toujours affich�e",
                VALUE_SHOWN_ONLY_IN_MENU: "Affich�e uniquement dans le menu",
                VALUE_SHOWN_WHEN_READING: "Affich�e uniquement lors de la lecture",
                VALUE_OFF: "D�sactiv�",
                ACTION_TOGGLE_CLOCK: "Basculer le Mode",
                AM: "am",
                PM: "pm"
        },

        PageIndex: {
                TITLE: "Pagination des livres et des menus",
                INDEX_STYLE_BOOK: "Style de l'index en lecture",
                INDEX_MODE_BOOK: "Mode de l'Index en lecture",
                INDEX_MODE_MENU: "Mode de l'Index dans les menu",
                INDEX_STYLE_MENU: "Style de l'Index dans les menu",
                OF: "de",
                ALWAYS_SHOWN: "Toujours visible",
                NEVER_SHOWN: "Masqu�",
                NOT_SHOWN_IF_SINGLE_PAGE: "Ne figure pas pour les pages uniques",
                VALUE_STATS0: "5 / 100 (pages par minute)",
                VALUE_STATS1: "5 / 100 (Le temps de terminer)",
                VALUE_STATS2: "5 / 100 (ppm / Le temps de terminer)"

        },

        EpubUserStyle: {
                OPTION_EPUB_CSS_FILE: "Style EPUB utilisateur (Fichier CSS)",
                MSG_WARNING: "Affecte uniquement les livres ouverts posterieurement!",
                VALUE_DISABLED: "D�sactiv�"
        },

        BookHistory: {
                FUNC_X_BOOKS: FUNC_X_BOOKS,
                FUNC_PAGE_X: FUNC_PAGE_X,
                TITLE: "Historique des livres",
                VALUE_DISABLED: "D�sactiv�",
                OPTION_REPLACE: "Historique sous Continuer la lecture",
                VALUE_ON: "On",
                VALUE_OFF: "Off",
                OPTION_SKIP_BOOK_MENU: "Passer le menu Livre"
        },

//ReadMark      ReadMark: {
//              TITLE_UNREAD: "Signets - D�j� lu",
//              TITLE_READ: "Signets - Pas encore lu",
//      },

        TextScale: {
                OPTION_SCALE_DEFAULT: "�chelle par d�faut",
                VALUE_SMALL: "(S)Petite taille",
                VALUE_MEDIUM: "(M)Taille moyenne",
                VALUE_LARGE: "(L)Grande taille",
                VALUE_DISABLED: "D�sactiv�e",
                VALUE_ENABLED: "Activ�e"
        },

        MenuTuning: {
                OPTION_OUTER: "Le menu de niveau sup�rieur contient"
        },

        Dictionary: {
                TITLE: "Dictionnaire",
                WARN_DICT_DISABLED: "Dictionnaire est d�sactiv�!",
                WARN_DICT_DOESNT_EXIST: "Fichier Dictionnaire inexistant!",
                ACTION_DICTIONARY: "Lancement dictionnaire",
                OPTION_DICTIONARY: "Fichier Dictionnaire",
                VALUE_DISABLED: "D�sactiv�"
        }
};
