// Name: 600 config
// Description: Sony PRS-600 model specific configuration
//
// History:
//	2010-09-11 kartu - Initial version
//	2010-12-01 kartu - Added link to Calculator
//	2010-12-04 kartu - BrowseFolders will apear in "more", if not shown on the main page.
//	2011-02-27 kartu - Periodicals node no longer "unmovable", replaced with "Browse Folders" by default
//	2011-02-28 kartu -  ALL: Added 
//		Calculator by Mark Nord
//		Chess by Ben Chenoweth / Stefano Gioffre
//		Five in a Row by Ben Chenoweth
//		Five Balls by Clemenseken
//		Free Cell by Ben Chenoweth
//		Mahjong by Clemenseken
//		Sudoku by Obelix
//  2011-06-29 Ben Chenoweth - ALL: Updated existing games/calculator to use AppAssets and added
//      Draughts by Ben Chenoweth
//      MineSweeper by Mark Nord / D. Shep Poor
//      XO-Cubed by Ben Chenoweth
//	2011-07-03 Mark Nord - Added NodeKinds.STANDBY
//  2011-08-03 Ben Chenoweth - ALL: Added
//      Calendar by Ben Chenoweth
//      Solitaire by Ben Chenoweth
//  2011-08-28 Ben Chenoweth - Moved games into Games node

return {
	// Menu icon indices 
	NodeKinds: {
		EMPTY: 1000,
		ALL_BOOKS: 1,
		BOOK: 2,
		FILE: 2,
		AUDIO: 3,
		PICTURE: 4,
		SETTINGS: 5,
		AUTHOR: 6,
		CONTINUE: 7,
		PREVIOUS_PAGE: 8,
		NEXT_PAGE: 9,
		BOOKMARK: 10,
		NOTES: 10,
		LIST: 11,
		BOOK_HISTORY: 11,
		CLOCK: 12,
		PAUSE: 13,
		PLAY: 14,
		INFO: 15,
		LOCK: 16,
		BOOKS: 17,
		PICTURES: 18,
		CROSSED_BOX: 19,
		DATE: 22,
		ABOUT: 25,
		BACK: 26,
		ABC: 27,
		DATETIME: 28,
		DB: 29,
		SHUTDOWN: 31,
		TEXT_SCALE: 74, // 39
		SEARCH: 39,
		KEYBOARD: 51,
		ROOT_MENU: 53,
		INTERNAL_MEM: 54,
		MS: 55,
		SD: 56,
		LANGUAGE: 57,
		HOME: 26, // missing
		
		STANDBY: 83,
		GESTURE: 38,
		NODICTIONARY: 40,
		ZOOMSCROLL: 41,
		
		UNCHECKED: 60,
		CHECKED: 61,
		
		FOLDER: 62,
		GAME: 63,
		CALC: 64,
		CHESS: 67,
		CARDS: 68,
		SUDOKU: 69,
		MAHJONG: 70,
		FIVEROW: 71,
		FIVEBALLS: 72,
		DRAUGHTS: 73,
		BOMB: 75,
		
		FONT: 76,
		APPLICATIONS: 77,
		EXECUTABLE: 78,
		PREVIOUS_SONG: 79,
		NEXT_SONG: 80,
		PREVIOUS: 81,
		NEXT: 82,
		
		DEFAULT: 62,
		
		// smaller icons shown in home menu bottom
		HOME_SETTINGS: 2,
		HOME_NOTES: 7, 
		HOME_BOOK_HISTORY: 8,
		HOME_COLLECTIONS: 8,
		HOME_FOLDER: 9,
		
		// big icons shonw in home menu
		LARGE_BOOK_HISTORY: 3,
		LARGE_FOLDER: 4,
		
		// At least 600 and 900 have more than one type of icons
		getIcon: function (strKind, type) {
			var kind;
			if (type === "home") {
				kind = this["HOME_" + strKind];
				if (typeof kind === "undefined") {
					kind = this.HOME_FOLDER;
				}
			} else if (type === "homeLarge") {
				// if it is undefined, leave it as is
				kind = this["LARGE_" + strKind];
			} else {
				kind = this[strKind];
				if (typeof kind === "undefined") {
					kind = this.FOLDER;
				}
			}
			
			return kind;
		}
	},
	
	// PRS+ abstract key code to actual key code, model specific
	keyCodes: {
		volume_down: "kVolumeMinus", 
		volume_up: "kVolumePlus"
	},
	// does device have numeric keys
	hasNumericButtons: false,
	// are there volume keys
	hasVolumeButtons: true,
	// are there paging buttons
	hasPagingButtons: false,
	// are there joypad buttons
	hasJoypadButtons: false,
	// are there "other" buttons
	hasOtherButtons: false,
	// Are there SD/MS card slots
	hasCardSlots: true,
	
	// Where to find which node, relative to kbook.root
	standardMenuLayout: {
		"continue": [0],
		books: [1],
		collections: [2],
		notes: [3],
		textMemo: [4],
		handwriting: [5],
		more: [6],
		audio: [6, 0],
		pictures: [6, 1],
		settings: [6, 2]
	},
	
	// Menu configuration
	prspMenu: {
		// Container nodes
		customContainers: [
			{ name: "gamesAndUtils", title: "NODE_GAMES_AND_UTILS", shortName: "Games", icon: "GAME"}
		],
		// Nodes assigned to certain nodes
		customNodes: [
			{ name: "BookHistory", parent: "more"},
			{ name: "BrowseFolders", parent: "more"},
			{ name: "gamesAndUtils", parent: "more" },
			{ name: "collections", parent: "more" },
			{ name: "notes", parent: "more"},
			{ name: "PRSPSettings", parent: "more" },
			{ name: "Calculator", parent: "more" },
			{ name: "Calendar", parent: "more" },
			{ name: "Chess", parent: "gamesAndUtils" },
			{ name: "Draughts", parent: "gamesAndUtils" },
			{ name: "FiveBalls", parent: "gamesAndUtils" },	
			{ name: "FiveRow", parent: "gamesAndUtils" },	
			{ name: "FreeCell", parent: "gamesAndUtils" },
			{ name: "Mahjong", parent: "gamesAndUtils" },
			{ name: "MineSweeper", parent: "gamesAndUtils" },
			{ name: "Solitaire", parent: "gamesAndUtils" },
			{ name: "Sudoku", parent: "gamesAndUtils" },
			{ name: "XOCubed", parent: "gamesAndUtils" }
		],
		movableNodes: [0, 0, 1, 1, 1, 1],
		defaultLayout: [
			{name: "continue"},
			{name: "books"},
			{name: "BookHistory"},
			{name: "BrowseFolders"},
			{name: "textMemo", shortName: true},
			{name: "handwriting", shortName: true}
		]
	},
	
	media: {
		// types to be used to determine media type using "xs.isInstanceOf"
		types: [FskCache.text, FskCache.image, FskCache.notepad],
		// what kind it is, supported are: "book", "picture", "note", "audio"
		kinds: ["book", "picture", "note"],
		// node prototypes to use when creating media nodes
		prototypes: [FskCache.tree.bookNode, kbook.pictures.prototype, FskCache.tree.notepadFreehandNode]
	}, 
	
	compareStrings: function(a, b) {
		if (a === b) {
			return 0;
		}
		return a > b ? 1 : -1;
	}
};