// Language: SimplifiedChinese
// Description: Localization file
// Translator: thawk
//
// History:
//	2010-05-06 kartu - Initial version by thawk
//	2010-05-11 kartu - Added VALUE_DEFAULT_DATE (CoreLang)
//	2010-05-15 kartu - Added OPTION_SKIP_BOOK_MENU (BookHistory)
//	2010-05-17 kravitz - Replaced PAGE (BookHistory) with added FUNC_PAGE_X
//	2010-05-17 kravitz - Corrected by thawk
//	2010-05-18 kravitz - Replaced PAGE (Sony) with FUNC_PAGE_X
//	2010-05-19 kravitz - Corrected by thawk
//	2010-05-20 kartu - Removed script reference from about string
//	2010-06-29 kartu - Split KeyBindings keys into KeyBindings and StandardActions
//				Added 0-9 translations
//	2011-03-15 SomeDeepBlue - corrected function names and added newer functions which are missing as of yet.
//                            newer functions are English only for now and still need to be translated
//	2011-03-23 kartu - Refactoring: moving functions out of lang files, moving texts to a spreadsheet

return {
	X: {
		BOOKS: ["本", "1 本", "无"],
		SETTINGS: ["项", "1 项", "无"]
	},

	// PRS+ stuff
	Core: {
		NODE_PRSP_SETTINGS: "PRS+ 选项",
		NODE_OTHERS: "多媒体",
		NODE_GAMES_AND_UTILS: "游戏及工具",
		GROUP_MENU_TITLE: "菜单选项",
		GROUP_VIEWER_TITLE: "阅读器选项"
	},

	MenuCaptions: {
		OPTION_STYLE: "菜单项字体大小",
		VALUE_SONY_DEFAULT: "Sony缺省",
		VALUE_ALWAYS_SMALL: "小字体",
		VALUE_ALWAYS_BIG: "大字体"
	},

	TextEncoding: {
		OPTION_TITLE: "TXT及RTF格式电子书的编码",
		MSG_RESTART: "重启生效！",
		LATIN: "Latin",
		RUSSIAN: "Russian (Windows-1251)"
	},

	KeyBindings: {
		TITLE: "按键设置",
		DESCRIPTION: "可以在按键上绑定动作",

		DEFAULT_VALUE: "缺省",

		// Contexts
		GLOBAL: "全局按键设置",
		IN_MENU: "菜单按键设置",
		IN_BOOK: "阅读按键设置",

		// Button groups
		NUM_BUTTONS: "数字键",
		JP_BUTTONS: "五向键",
		OTHER_BUTTONS: "其它键",
		VOLUME_BUTTONS: "音量键",

		// Buttons
		BN_SIZE: "放大镜按钮",
		BN_BOOKMARK: "书签按钮",
		BN_BL_NEXT: "左下角的'>'",
		BN_BL_PREVIOUS: "左下角的'<'",
		BN_SB_NEXT: "右边的'>'",
		BN_SB_PREVIOUS: "右边的'<'",
		BN_MENU: "菜单键",
		BN_JP_LEFT: "向左",
		BN_JP_RIGHT: "向右",
		BN_JP_UP: "向上",
		BN_JP_DOWN: "向下",
		BN_JP_CENTER: "中间按钮",
		BN_H_SIZE: "长按放大镜按钮",
		BN_H_BOOKMARK: "长按书签按钮",
		BN_H_BL_NEXT: "长按左下角的'>'",
		BN_H_BL_PREVIOUS: "长按左下角的'<'",
		BN_H_MENU: "长按菜单键",
		BN_H_SB_NEXT: "长按右边的'>'",
		BN_H_SB_PREVIOUS: "长按右边的'<'",
		BN_H_JP_CENTER: "长按中间按钮",
		BN_H_1: "长按1",
		BN_H_2: "长按2",
		BN_H_3: "长按3",
		BN_H_4: "长按4",
		BN_H_5: "长按5",
		BN_H_6: "长按6",
		BN_H_7: "长按7",
		BN_H_8: "长按8",
		BN_H_9: "长按9",
		BN_H_0: "长按0",
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
		BN_VOLUME_DOWN: "音量-",
		BN_H_VOLUME_DOWN: "长按音量-",
		BN_VOLUME_UP: "音量+",
		BN_H_VOLUME_UP: "长按音量+"
	},

	StandardActions: {
		// Actions
		ACTION_SHUTDOWN: "关闭设备",
		ACTION_NEXT_PAGE: "下一页",
		ACTION_PREVIOUS_PAGE: "上一页",
		ACTION_NEXT_IN_HISTORY: "前进（阅读历史）",
		ACTION_PREVIOUS_IN_HISTORY: "后退（阅读历史）",
		ACTION_PREVIOUS_SONG: "上一首歌",
		ACTION_NEXT_SONG: "下一首歌",
		ACTION_GOTO_LINK: "跳到链接"
	},

	Screenshot: {
		TITLE: "截屏",
		ACTION_TITLE: "截屏",
		SAVING_TO: "正在保存 ",
		FAILED_TO_SAVE: "保存失败",
		OPT_SAVETO: "保存到",
		OPT_FEEDBACK: "显示保存进度",
		MEMORY_STICK: "Sony记忆棒",
		FEEDBACK_ON: "开",
		FEEDBACK_OFF: "关",
		SD_CARD: "SD卡",
		INTERNAL_MEMORY: "内部存储"
	},

	BrowseFolders: {
		TITLE: "浏览文件夹",
		OPTION_SORTING_MODE: "排序方式",
		VALUE_BY_TITLE: "按标题排序",
		VALUE_BY_AUTHOR_THEN_TITLE: "先按作者再按标题排序",
		VALUE_BY_AUTHOR_SWAPPING: "按作者排序，但调换的姓和名的顺序",
		VALUE_BY_FILENAME: "按文件名排序",
		OPTION_TITLE_SORTER: "排序时参考'titleSorter'字段",
		ENABLED: "启用",
		DISABLED: "禁用",
		OPTION_IM_ROOT: "内部存储的根目录",
		OPTION_CARD_SCAN: "扫描SD/MS卡上的新书",
		OPTION_MOUNT: "通过Mount访问SD/MS卡（实验功能）",
		NODE_RESCAN_INTERNAL_MEMORY: "重新扫描内部存储",
		NODE_COPY_TO_INTERNAL_MEMORY: "拷贝到内部存储",
		NODE_COPY_TO_INTERNAL_MEMORY_COMMENT: "把文件拷贝到内部存储的根目录",
		NODE_COPY_AND_RESCAN: "拷贝到内部存储并更新书本目录",
		NODE_COPY_AND_RESCAN_COMMENT: "把文件拷贝到内部存储的根目录并更新书本目录",
		ERROR_TARGET_EXISTS: "错误，目标文件已存在",
		NODE_BROWSE_FOLDERS: "浏览文件夹",
		NODE_BROWSE_FOLDERS_COMMENT: "查看文件",
		NODE_INTERNAL_MEMORY: "内部存储",
		NODE_MEMORY_STICK: "Sony记忆棒",
		NODE_MEMORY_STICK_MOUNT: "通过Mount访问Sony记忆棒",
		NODE_SD_CARD: "SD卡",
		NODE_SD_CARD_MOUNT: "通过Mount访问SD卡"
	},

	StatusBar: {
		TITLE: "Status Bar"
	},


	StatusBar_Clock: {
		TITLE: "时钟",
		OPTION_STYLE: "时钟样式",
		VALUE_24H: "24小时制",
		VALUE_12H: "12小时制",
		OPTION_MODE: "时钟显示",
		VALUE_ALWAYS_SHOWN: "始终显示",
		VALUE_SHOWN_ONLY_IN_MENU: "只在菜单状态下显示",
		VALUE_SHOWN_WHEN_READING: "只在阅读状态下显示",
		VALUE_OFF: "不显示",
		ACTION_TOGGLE_CLOCK: "切换时钟",
		AM: "am",
		PM: "pm"
	},

	StatusBar_PageIndex: {
		TITLE: "页码",
		INDEX_STYLE_BOOK: "阅读状态下的页码样式",
		INDEX_MODE_BOOK: "阅读状态下的页码显示",
		INDEX_MODE_MENU: "菜单状态下的页码显示",
		INDEX_STYLE_MENU: "菜单状态下的页码样式",
		OF: "of",
		ALWAYS_SHOWN: "始终显示",
		NEVER_SHOWN: "不显示",
		NOT_SHOWN_IF_SINGLE_PAGE: "多于一页时才显示",
		VALUE_STATS0: "5 / 100 (每分钟页数)",
		VALUE_STATS1: "5 / 100 (预计到看完的时间)",
		VALUE_STATS2: "5 / 100 (每分钟页数/预计看完需时)"
	},

	EpubUserStyle: {
		OPTION_EPUB_CSS_FILE: "EPUB用户样式表（CSS文件）",
		MSG_WARNING: "仅对修改选项后重新打开的文件生效",
		VALUE_DISABLED: "禁用"
	},

	BookHistory: {
		TITLE: "阅读历史",
		VALUE_DISABLED: "禁用",
		OPTION_REPLACE: "在继续阅读中列出最近看过的书",
		VALUE_ON: "打开",
		VALUE_OFF: "关闭",
		OPTION_SKIP_BOOK_MENU: "跳过书本菜单，直接到上次阅读位置"
	},

	TextScale: {
		OPTION_SCALE_DEFAULT: "缺省字体大小",
		VALUE_SMALL: "(S)小字体",
		VALUE_MEDIUM: "(M)中字体",
		VALUE_LARGE: "(L)大字体",
		VALUE_DISABLED: "禁用",
		VALUE_ENABLED: "启用"
	},

	MenuTuning: {
		OPTION_OUTER: "根菜单包含"
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
		TITLE: "字典",
		WARN_DICT_DISABLED: "字典功能已被禁用",
		WARN_DICT_DOESNT_EXIST: "字典文件不存在！",
		ACTION_DICTIONARY: "启动字典",
		OPTION_DICTIONARY: "字典文件",
		VALUE_DISABLED: "禁用"
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
