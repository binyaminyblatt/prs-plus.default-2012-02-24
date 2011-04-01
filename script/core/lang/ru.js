// Language: Russian
// Description: Localization file
// Translator: SLL
//
// History:
//      2010-04-24 kartu - Fixed epub styles translation
//      2010-04-25 kartu - Fixed "turn on/off" translation
//      2010-04-30 kravitz - Refactored, added new strings
//      2010-04-30 kravitz - Fixed and optimized FUNC_X_SOMETHING()
//      2010-04-30 kravitz - Fixed SL_OFF and SL_ON translation
//      2010-05-01 kartu - Added ACTION_GOTO_LINK
//      2010-05-01 kravitz - Changed TextScale translation
//      2010-05-02 kartu - Added dictionary strings
//      2010-05-02 kartu - Added translations and sizes for a number of strings, including "OK"
//      2010-05-03 kravitz - Renamed ReadingList to BookHistory, added new strings, refactored MenuTuning
//      2010-05-06 kartu - Added ppm related translations for PageIndex addon
//      2010-05-11 kartu - Added VALUE_DEFAULT_DATE (CoreLang)
//      2010-05-12 kartu - Uploaded SLL's corrections
//      2010-05-15 kartu - Added OPTION_SKIP_BOOK_MENU (BookHistory)
//      2010-05-15 kartu - Added SLL's fixes
//      2010-05-15 kartu - Added PAGE (BookHistory)
//      2010-05-17 kravitz - Fixed VALUE_ON, VALUE_OFF (BookHistory)
//      2010-05-17 kravitz - Replaced PAGE (BookHistory) with added FUNC_PAGE_X
//      2010-05-18 kravitz - Replaced PAGE (Sony) with FUNC_PAGE_X
//      2010-05-20 kartu - Removed script reference from about string
//      2010-07-02 kartu - Added SLL's fixes
//      2010-07-02 kartu - Split KeyBindings keys into KeyBindings and StandardActions
//                              Added 0-9 translations
//	2010-12-01 kartu - Added happyhgy's fixes
//	2011-02-10 kartu - Added StandarActions translations
//	2011-02-27 kartu - Added StandarActions translations (rotate)
//	2011-03-23 kartu - Refactoring: moving functions out of lang files, moving texts to a spreadsheet

return {
	X: {
		BOOKS: ["книга", "книги", "книг", "Пусто"],
		SETTINGS: ["настройка", "настройки", "настроек", "Пусто"]
	},
	
	// PRS+ stuff
	Core: {
		NODE_PRSP_SETTINGS: "Настройки PRS+",
		NODE_PRSP_SETTINGS_SHORT: " Настр. PRS+",
		NODE_OTHERS: "Мультимедиа",
		NODE_GAMES_AND_UTILS: "Игры и приложения",
		GROUP_MENU_TITLE: "Стиль и функции меню",
		GROUP_VIEWER_TITLE: "Шрифты и кодировки",
		NODE_MORE: "Прочее"
	},

	MenuCaptions: {
		OPTION_STYLE: "Стиль строк меню",
		VALUE_SONY_DEFAULT: "Оригинальный стиль Sony",
		VALUE_ALWAYS_SMALL: "Только мелкий шрифт",
		VALUE_ALWAYS_BIG: "Только крупный шрифт"
	},

	TextEncoding: {
		OPTION_TITLE: "Кодировка книг TXT/RTF",
		MSG_RESTART: "Требуется перезагрузка",

		LATIN: "Latin",
		RUSSIAN: "Русская (Windows-1251)"
	},

	KeyBindings: {
		TITLE: "Действия кнопок",
		DESCRIPTION: "Позволяет задавать действия кнопкам ридера",

		DEFAULT_VALUE: "По умолчанию",

		// Contexts
		GLOBAL: "Глобально",
		IN_MENU: "В меню",
		IN_BOOK: "При чтении",

		// Button groups
		NUM_BUTTONS: "Цифровые кнопки",
		JP_BUTTONS: "Кнопки джойстика",
		OTHER_BUTTONS: "Другие кнопки",
		VOLUME_BUTTONS: "Клавиша громкости",

		// Buttons
		BN_HOME: "«Главное меню»",
		//---
		BN_SIZE: "«Масштаб»",
		BN_BOOKMARK: "«Закладка»",
		BN_BL_NEXT: "Нижняя «Вперёд»",
		BN_BL_PREVIOUS: "Нижняя «Назад»",
		BN_SB_NEXT: "Боковая «Вперёд»",
		BN_SB_PREVIOUS: "Боковая «Назад»",
		BN_MENU: "«Меню/Возврат»",
		BN_JP_LEFT: "«Влево»",
		BN_JP_RIGHT: "«Вправо»",
		BN_JP_UP: "«Вверх»",
		BN_JP_DOWN: "«Вниз»",
		BN_JP_CENTER: "«Центр»",

		BN_H_HOME: "«Главное меню», удерживая",
		//---
		BN_H_SIZE: "«Масштаб», удерживая",
		BN_H_BOOKMARK: "«Закладка», удерживая",
		BN_H_BL_NEXT: "Нижняя «Вперёд», удерживая",
		BN_H_BL_PREVIOUS: "Нижняя «Назад», удерживая",
		BN_H_SB_NEXT: "Боковая «Вперёд», удерживая",
		BN_H_SB_PREVIOUS: "Боковая «Назад», удерживая",
		BN_H_MENU: "«Меню/Возврат», удерживая",
		BN_H_JP_LEFT: "«Влево», удерживая",
		//---
		BN_H_JP_RIGHT: "«Вправо», удерживая",
		//---
		BN_H_JP_UP: "«Вверх», удерживая",
		//---
		BN_H_JP_DOWN: "«Вниз», удерживая",
		//---
		BN_H_JP_CENTER: "«Центр», удерживая",
		//---
		BN_H_1: "«1», удерживая",
		BN_H_2: "«2», удерживая",
		BN_H_3: "«3», удерживая",
		BN_H_4: "«4», удерживая",
		BN_H_5: "«5», удерживая",
		BN_H_6: "«6», удерживая",
		BN_H_7: "«7», удерживая",
		BN_H_8: "«8», удерживая",
		BN_H_9: "«9», удерживая",
		BN_H_0: "«0», удерживая",
		BN_1: "«1»",
		BN_2: "«2»",
		BN_3: "«3»",
		BN_4: "«4»",
		BN_5: "«5»",
		BN_6: "«6»",
		BN_7: "«7»",
		BN_8: "«8»",
		BN_9: "«9»",
		BN_0: "«0»",

		BN_VOLUME_DOWN: "Громкость «-»",
		BN_H_VOLUME_DOWN: "Громкость «-», удерживая",
		BN_VOLUME_UP: "Громкость «+»",
		BN_H_VOLUME_UP: "Громкость «+», удерживая"
	},

	StandardActions: {
		TITLE: "Стандартные действия",
		// Actions
		ACTION_CONTINUE_READING: "Продолжить чтение",
		ACTION_SHUTDOWN: "Отключить",
		ACTION_NEXT_PAGE: "Следующая страница",
		ACTION_PREVIOUS_PAGE: "Предыдущая страница",
		ACTION_NEXT_IN_HISTORY: "Следующая в журнале",
		ACTION_PREVIOUS_IN_HISTORY: "Предыдущая в журнале",
		ACTION_PREVIOUS_SONG: "Предыдущая песня",
		ACTION_NEXT_SONG: "Следующая песня",
		ACTION_GOTO_LINK: "Перейти по ссылке",
		CONTINUE_READING: "Продолжить чтение",
		ACTION_OPEN_TOC: "Open TOC",
		// "Bubble" actions		
		ACTION_doOption: "Открыть опции",
		ACTION_doSearch: "Поиск",
		ACTION_doRotate: "Поворот экрана",
		ACTION_doRotate0: "Поворот на 0°",
		ACTION_doRotate90: "Поворот на  90°",
		ACTION_doRotate180: "Поворот на 180°",
		ACTION_doRotate270: "Поворот на 270°",
		ACTION_doRotateCWise: "Поворот по часовой",
		ACTION_doRotateCCWise: "Поворот против часовой",
		ACTION_doMenu: "Меню (назад / вверх)",
		ACTION_doSize: "Масштаб",
		ACTION_doRoot: "Вернутся в главное меню"
	},

	Screenshot: {
		TITLE: "Снимок экрана",
		ACTION_TITLE: "Сделать снимок экрана",
		SAVING_TO: "Сохранить в",
		FAILED_TO_SAVE: "Ошибка сохранения",
		OPT_SAVETO: "Сохранить в",
		OPT_FEEDBACK: "Прогресс сохранения",
		MEMORY_STICK: "Memory stick",
		FEEDBACK_ON: "Включён",
		FEEDBACK_OFF: "Отключён",
		SD_CARD: "SD card",
		INTERNAL_MEMORY: "Внутренняя память"
	},

	BrowseFolders: {
		TITLE: "Просмотр папок",
		OPTION_SORTING_MODE: "Способ сортировки",
		VALUE_BY_TITLE: "По названию",
		VALUE_BY_AUTHOR_THEN_TITLE: "По автору и по названию",
		VALUE_BY_AUTHOR_SWAPPING: "По автору с заменой имя<>фамилия",
		VALUE_BY_FILENAME: "По имени файла",
		VALUE_BY_FILENAME_AS_COMMENT: "Название файла в комментарии",
		OPTION_TITLE_SORTER: "Использовать поле «titleSorter»",
		OPTION_FAVOURITE_FOLDERS: "Избранные папки",
		ENABLED: "Включено",
		DISABLED: "Отключено",
		OPTION_IM_ROOT: "Начинать просмотр папок с...",
		OPTION_CARD_SCAN: "Сканировать карты SD/MS",
		OPTION_MOUNT: "Монтировать SD/MS (экспериментально)",
		NODE_RESCAN_INTERNAL_MEMORY: "Просканировать внутреннюю память",
		NODE_COPY_TO_INTERNAL_MEMORY: "Скопировать во внутреннюю память",
		NODE_COPY_TO_INTERNAL_MEMORY_COMMENT: "Скопировать на верхний уровень внутренней памяти",
		NODE_COPY_AND_RESCAN: "Скопировать + сканировать память",
		NODE_COPY_AND_RESCAN_COMMENT: "Скопировать файл и просканировать всю память",
		ERROR_TARGET_EXISTS: "Ошибка, файл уже существует",
		NODE_BROWSE_FOLDERS: "Просмотр папок",
		NODE_BROWSE_FOLDERS_SHORT: "Папки",
		NODE_BROWSE_FOLDERS_COMMENT: "Просмотр файловой системы",
		NODE_INTERNAL_MEMORY: "Внутренняя память",
		NODE_MEMORY_STICK: "Memory Stick",
		NODE_MEMORY_STICK_MOUNT: "Memory Stick через монтирование",
		NODE_SD_CARD: "SD Card",
		NODE_SD_CARD_MOUNT: "SD Card через монтирование",
		FAVOURITE_FOLDERS_FILE: "Список избранных папок"

	},

	Clock: {
		TITLE: "Часы",
		OPTION_STYLE: "Стиль часов",
		VALUE_24H: "24 часа",
		VALUE_12H: "12 часов",
		OPTION_MODE: "Режим часов",
		VALUE_ALWAYS_SHOWN: "Всегда показывать",
		VALUE_SHOWN_ONLY_IN_MENU: "Показывать только в меню",
		VALUE_SHOWN_WHEN_READING: "Показывать только при чтении",
		VALUE_OFF: "Отключены",
		ACTION_TOGGLE_CLOCK: "Переключить часы",
		AM: "am",
		PM: "pm"
	},

	PageIndex: {
		TITLE: "Индексная строка",
		INDEX_STYLE_BOOK: "Стиль в книге",
		INDEX_MODE_BOOK: "Режим в книге",
		INDEX_MODE_MENU: "Режим в меню",
		INDEX_STYLE_MENU: "Стиль в меню",
		OF: "из",
		ALWAYS_SHOWN: "Всегда показывать",
		NEVER_SHOWN: "Никогда не показывать",
		NOT_SHOWN_IF_SINGLE_PAGE: "Скрывать, если 1 страница",
		VALUE_STATS0: "5 / 100 (страниц в минуту)",
		VALUE_STATS1: "5 / 100 (оставшееся время)",
		VALUE_STATS2: "5 / 100 (см / оставшееся время)"
	},

	EpubUserStyle: {
		OPTION_EPUB_CSS_FILE: "Свой стиль EPUB (CSS файл)",
		MSG_WARNING: "Влияет только на книги, созданные позднее!",
		VALUE_DISABLED: "Отключён"
	},

	BookHistory: {
		TITLE: "История книг",
		SHORT_TITLE: "История",
		VALUE_DISABLED: "Отключена",
		OPTION_REPLACE: "История в «Продолжить чтение»",
		VALUE_ON: "Включено",
		VALUE_OFF: "Отключено",
		OPTION_SKIP_BOOK_MENU: "Пропускать меню книги",
		VALUE_WHEN_OPENING_BOOK: "При открытии книги",
		VALUE_WHEN_EXITING_BOOK: "При выходе из книги",
		VALUE_ALWAYS: "Всегда",
		VALUE_NEVER: "Отключено"

	},

	TextScale: {
		OPTION_SCALE_DEFAULT: "Шрифт по умолчанию",
		VALUE_SMALL: "(S) Мелкий шрифт",
		VALUE_MEDIUM: "(M) Средний шрифт",
		VALUE_LARGE: "(L) Крупный шрифт",
		VALUE_DISABLED: "Отключён",
		VALUE_ENABLED: "Включён"
	},

	MenuTuning: {
		OPTION_OUTER: "В главном меню"
	},

	Dictionary: {
		TITLE: "Словарь",
		WARN_DICT_DISABLED: "Словарь отключён!",
		WARN_DICT_DOESNT_EXIST: "Файл словаря не существует!",
		ACTION_DICTIONARY: "Запустить словарь",
		OPTION_DICTIONARY: "Файл словаря",
		VALUE_DISABLED: "Отключён"
	},

	MediaTag: {
		MARK_0: "Поставить метку «галочка»",
		MARK_1: "Поставить метку «звезда»",
		MARK_2: "Поставить метку «круг»",
		MARK_3: "Поставить метку «квадрат»",
		MARK_4: "Поставить метку «треугольник»",
		VALUE_OVER_ICON: "Поверх значка книги",
		VALUE_BOTTOM: "В нижней строке слева",
		VALUE_RIGHT: "В верхней строке справа",
		OPTION_POSITION: "Размещение метки"
	},
	MenuCustomizer: {
		TITLE: "Главное меню",
		MENU_ITEM: "Действие меню",
		MENU_SEPARATOR: "Разделитель меню",
		DEFAULT: "Действие по умолчанию",
		VALUE_DEFAULT: "По умолчанию",
		VALUE_YES: "Включен",
		VALUE_NO: "Выключен",
		UNMOVABLE_SLOT: "Неизменяемый слот",
		SLOT: "Слот"
	},
	StatusBar: {
		TITLE: "Строка состояния"
	},
	StatusBar_Clock: {
		TITLE: "Часы",
		OPTION_STYLE: "Стиль часов",
		VALUE_24H: "24 часа",
		VALUE_12H: "12 часов",
		OPTION_MODE: "Режим часов",
		VALUE_ALWAYS_SHOWN: "Всегда показывать",
		VALUE_SHOWN_ONLY_IN_MENU: "Показывать Только в меню",
		VALUE_SHOWN_WHEN_READING: "Показыать только при чтении",
		VALUE_OFF: "Отключены",
		ACTION_TOGGLE_CLOCK: "Переключить часы",
		AM: "am",
		PM: "pm"
	},
	StatusBar_PageIndex: {
		TITLE: "Указатель страниц",
		INDEX_STYLE_BOOK: "Стиль в книге",
		INDEX_MODE_BOOK: "Режим в книге",
		INDEX_MODE_MENU: "Режим в меню",
		INDEX_STYLE_MENU: "Стиль в меню",
		OF: "из",
		ALWAYS_SHOWN: "Всегда показывать",
		NEVER_SHOWN: "Никогда не показывать",
		NOT_SHOWN_IF_SINGLE_PAGE: "Скрывать, если 1 страница",
		VALUE_STATS0: "5 / 100 (страниц в минуту)",
		VALUE_STATS1: "5 / 100 (оставшееся время)",
		VALUE_STATS2: "5 / 100 (см / оставшееся время)"
	},
	ScrollbarAlphabet: {
		TITLE: "Алфавит полосы прокрутки",
		OPT_ALPHABET: "Алфавит",
		VALUE_DEFAULT: "По умолчанию"
	},

	Calc: {
		TITLE: "Калькулятор",
		DESCRIPTION: ""
	},

	Converter: {
		CONVERTING_FB2: "Конвертирую fb2 в epub...",
		NORMALLY_TAKES: "(обычно занимает 1-30сек)",
		ERROR: "Ошибка конвертации",
		OPENING: "Открываю книгу"
	}
};