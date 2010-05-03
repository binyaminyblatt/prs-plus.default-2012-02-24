// Language: Russian
// Description: Localization file
// Translator: SLL
//
// History:
//	2010-04-24 kartu - Fixed epub styles translation
//	2010-04-25 kartu - Fixed "turn on/off" translation
//	2010-04-30 kravitz - Refactored, added new strings
//	2010-04-30 kravitz - Fixed and optimized FUNC_X_SOMETHING()
//	2010-04-30 kravitz - Fixed SL_OFF and SL_ON translation
//	2010-05-01 kartu - Added ACTION_GOTO_LINK
//	2010-05-01 kravitz - Changed TextScale translation
//	2010-05-02 kartu - Added dictionary strings
//	2010-05-02 kartu - Added translations and sizes for a number of strings, including "OK"
//	2010-05-03 kravitz - Renamed ReadingList to BookHistory, added new strings, refactored MenuTuning

var _x_cache = [];
var _x_cases = [2, 0, 1, 1, 1, 2];
var FUNC_X_SOMETHING = function (n, s) {
	if (!n) {
		return s[3];
	}
	if (!_x_cache[n]) {
		_x_cache[n] = (n % 100 > 4 && n % 100 < 20) ? 2 : _x_cases[Math.min(n % 10, 5)];
	}
	return n + " " + s[_x_cache[n]];
};

var FUNC_X_BOOKS = function (n) {
	return FUNC_X_SOMETHING(n, ["книга", "книги", "книг", "Пусто"]);
};

var FUNC_X_SETTINGS = function (n) {
	return FUNC_X_SOMETHING(n, ["настройка", "настройки", "настроек", "Пусто"]);
};

var FUNC_X_ITEMS = function (n) {
	return FUNC_X_SOMETHING(n, ["пункт", "пункта", "пунктов", "Пусто"]);
};

var FUNC_X_PAGES = function (n) {
	return FUNC_X_SOMETHING(n, ["страница", "страницы", "страниц", "Пусто"]);
};

var FUNC_X_PICTURES = function (n) {
	return FUNC_X_SOMETHING(n, ["изображение", "изображения", "изображений", "Пусто"]);
};

var FUNC_X_SONGS = function (n) {
	return FUNC_X_SOMETHING(n, ["песня", "песни", "песен", "Пусто"]);
};

var FUNC_X_BOOKMARKS = function (n) {
	return FUNC_X_SOMETHING(n, ["закладка", "закладки", "закладок", "Пусто"]);
};

var FUNC_X_COLLECTIONS = function (n) {
	return FUNC_X_SOMETHING(n, ["коллекция", "коллекции", "коллекций", "Пусто"]);
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
		DO_NOT_DISCONNECT: "Не отсоединяйте устройство",
		USB_CONNECTED: "USB подключен",
		DEVICE_LOCKED: "Устройство заблокировано",

		// About, translate either all or none
		ABOUT_PRSP: "PRS+ Script: @@@script@@@\n" + "PRS+ Firmware: @@@firmware@@@\n" + "Автор: Михаил Сухиашвили или kartu (kartu3@gmail.com) с использованием работ: " + "igorsk, boroda, obelix, pepak, llasram и других.\n" + "© GNU Lesser General Public License.",
		ABOUT_1: "Copyright ©2006-2008 Sony Corporation",
		ABOUT_2: "Adobe, the Adobe logo, Reader and PDF are either registered trademarks or" + " trademarks of Adobe Systems Incorporated in the United States and/or other countries.",
		ABOUT_3: "MPEG Layer-3 audio coding technology and patents licensed by Fraunhofer IIS and Thomson." + " MPEG-4 AAC audio coding technology licensed by Fraunhofer IIS (www.iis.fraunhofer.de/amm/).",
		ABOUT_4: "Application software designed and implemented by Kinoma (www.kinoma.com). Portions Copyright ©2006,2007 Kinoma, Inc.",
		ABOUT_5: "Bitstream is a registered trademark, and Dutch, Font Fusion, and Swiss are trademarks, of Bitstream, Inc.",
		ABOUT_6: "Portions of this software are Copyright ©2005 The FreeType Project (www.freetype.org). All rights reserved.",
		ABOUT_7: "This software is based in part on the work of the Independent JPEG Group.",
		AUTHORIZED_SONY: "Авторизован для eBook Store.",
		NOT_AUTHORIZED_SONY: "Не авторизован для eBook Store.",
		AUTHORIZED_ADOBE: "Авторизован для защищенных материалов Adobe DRM.",
		NOT_AUTHORIZED_ADOBE: "Не авторизован для защищенных материалов Adobe DRM.",
		SONY_FW_VERSION: "Версия",
		DEVICE_ID: "Устройство",

		// Mime & card names
		RICH_TEXT_FORMAT: "Rich Text Format",
		ADOBE_PDF: "Adobe PDF",
		EPUB_DOCUMENT: "Документ EPUB",
		BBEB_BOOK: "Книга BBeB",
		PLAIN_TEXT: "Обычный текст",
		INTERNAL_MEMORY: "Внутренняя память",
		MEMORY_STICK: "Memory Stick",
		SD_CARD: "SD Memory",

		// Main.xml & kbook.so stuff
		INVALID_FORMAT: "Неверный формат!",
		FORMATTING: "Форматирую...",
		LOADING: "Загружаю...",
		LOW_BATTERY: "Батарея разряжена!",
		HR_WARNING: "Вы готовы УДАЛИТЬ всё содержимое ридера, восстановить заводские настройки, и очистить состояние защищенного содержимого?\n\nДа - нажмите 5\nНет - нажмите MENU",
		DEVICE_SHUTDOWN: "Отключение устройства",
		PRESS_MARK_TO_SHUTDOWN: "Нажмите MARK для отключения",
		THIS_DEVICE: "этого устройства.",
		PRESS_MARK_TO_DELETE: "Нажмите MARK чтобы",
		THIS_BOOK: "удалить книгу.",
		FORMAT_INTERNAL_MEMORY: "Форматировать внутреннюю память",
		PRESS_MARK_TO_FORMAT: "Нажмите MARK для форматирования",
		MSG_INTERNAL_MEMORY: "внутренней памяти.",
		RESTORE_DEFAULTS: "Восстановить заводские настройки",
		PRESS_MARK_TO_RESTORE: "Нажмите MARK чтобы восстановить",
		DEFAULT_SETTINGS: "заводские настройки.",
		UPPER_PAGE: "СТР.",
		ONE_OF_ONE: "1 из 1",
		NO_BATTERY: "Батарея разряжена!",
		FORMATTING_INTERNAL_MEMORY: "Форматирую внутреннюю память...",
		SHUTTING_DOWN: "Отключаюсь...",

		// Root menu
		CONTINUE: "Продолжить чтение",
		BOOKS_BY_TITLE: "Книги по названию",
		BOOKS_BY_AUTHOR: "Книги по автору",
		BOOKS_BY_DATE: "Книги по дате загрузки",
		COLLECTIONS: "Коллекции",
		ALL_BOOKMARKS: "Все закладки",
		NOW_PLAYING: "В эфире",
		MUSIC: "Аудио",
		PICTURES: "Изображения",
		SETTINGS: "Настройки",

		// In Settings
		// orientation
		ORIENTATION: "Ориентация",
		HORIZONTAL: "Альбомная",
		VERTICAL: "Книжная",
		// set date
		SET_DATE: "Дата и время",
		YEAR: "Год",
		MONTH: "Месяц",
		DATE: "День", // Day
		HOUR: "Часы",
		MINUTE: "Минуты",
		SETDATE_OK: "Сохранить",
		// width in pixels = ..._SIZE * 35
		SETDATE_OK_SIZE: 5,
		// slideshow
		SLIDESHOW: "Показ слайдов",
		SS_ON: "Вкл",
		SS_OFF: "Откл",
		SS_TURN: "Активировать",
		SS_DURATION: "Продолжительность",
		// width in pixels = ..._SIZE * 35
		SS_SIZE: 3,
		SS_OK: "Сохранить",
		// width in pixels = ..._SIZE * 35
		SS_OK_SIZE: 5,
		SECONDS: "Секунд",
		// auto standby (aka sleep mode)
		AUTOSTANDBY: "Спящий режим",
		AS_ON: "Вкл",
		AS_OFF: "Откл",
		AS_TURN: "Активировать",
		// width in pixels = ..._SIZE * 35
		AS_SIZE: 3,
		AS_OK: "Сохранить",
		// width in pixels = ..._SIZE * 35
		AS_OK_SIZE: 5,
		// about
		ABOUT: "О Ридере",
		// reset to factory settings
		RESET_TO_FACTORY: "Сброс на заводские настройки",

		// In Advanced Settings
		ADVANCED_SETTINGS: "Дополнительные настройки",
		// screen lock (aka device lock)
		SCREEN_LOCK: "Защитить паролем",
		SL_OFF: "Откл",
		SL_ON: "Вкл",
		SL_CODE: "Пароль",
		SL_TURN: "Активировать",
		// width in pixels = ..._SIZE * 35
		SL_SIZE: 3,
		SL_OK: "Сохранить",
		SL_OK_SIZE: 5,
		SL_OK_UNLOCK: "Открыть", // unlock
		// width in pixels = ..._SIZE * 35
		SL_OK_UNLOCK_SIZE: 5,
		// format device
		FORMAT_DEVICE: "Форматировать внутреннюю память",

		// In Book menu
		BEGIN: "В начало",
		END: "В конец",
		BOOKMARKS: "Закладки",
		CONTENTS: "Оглавление",
		HISTORY: "Журнал",
		INFO: "Информация",
		UTILITIES: "Инструменты",

		// In Book Utilities
		REMOVE_ALL_BOOKMARKS: "Удалить все закладки",
		CLEAR_HISTORY: "Очистить журнал",
		DELETE_BOOK: "Удалить книгу",

		// In Books by Date
		TODAY: "Сегодня",
		EARLIER_THIS_WEEK: "С начала недели",
		LAST_WEEK: "За прошлую неделю",
		EARLIER_THIS_MONTH: "С начала месяца",
		LAST_MONTH: "За прошлый месяц",
		EARLIER_THIS_QUARTER: "С начала квартала",
		LAST_QUARTER: "За прошлый квартал",
		EARLIER_THIS_YEAR: "С начала года",
		LAST_YEAR: "За прошлый год",
		OLDER: "Ещё ранее",

		PAGE: "Страница",
		PART: "Часть",
		OF: "из",
		NO_BOOK: "Пусто",
		NO_SONG: "Нет аудио",

		// Info title strings, comma separated, no spaces after comma
		INFO_TITLES: "Обожка,Название,Автор,Издатель,Категория,eBook ID,Тип,Дата,Размер,Источник,Файл,Права,Истекает",

		// Titles and criterions for "Books by Title" and "Books by Folder"
		// title is displayed, "criterion" is used for sorting.
		//
		// NOTE: if localization doesn't need custom Books by sorting, just remove CUSTOM_SORT, TITLE_*, CRITERION_* items
		CUSTOM_SORT: true,
		TITLE_1: "0-9",
		CRITERION_1: "0123456789",
		TITLE_2: "А Б В Г",
		CRITERION_2: "АБВГабвг",
		TITLE_3: "Д Е Ж З",
		CRITERION_3: "ДЕЖЗдежз",
		TITLE_4: "И Й К Л",
		CRITERION_4: "ИЙКЛийкл",
		TITLE_5: "М Н О П",
		CRITERION_5: "МНОПмноп",
		TITLE_6: "Р С Т У",
		CRITERION_6: "РСТУрсту",
		TITLE_7: "Ф Х Ц Ч",
		CRITERION_7: "ФХЦЧфхцч",
		TITLE_8: "Ш Щ Ы",
		CRITERION_8: "ШЩЫшщы",
		TITLE_9: "Э Ю Я",
		CRITERION_9: "ЭЮЯэюя",
		TITLE_0: "Прочие",
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
		NODE_PRSP_SETTINGS: "Настройки PRS+",
		NODE_OTHERS: "Мультимедиа",
		NODE_GAMES_AND_UTILS: "Игры и инструменты",
		GROUP_MENU_TITLE: "Настройки меню",
		GROUP_VIEWER_TITLE: "Настройки чтения"
	},

	CoreLang: {
		TITLE: "Локализация",
		COMMENT: "Требует перезагрузку",
		OPTION_LANG: "Язык",

		OPTION_DATE_FORMAT: "Формат даты",
		ddMMMYY: "31/янв/99",
		ddMONTHYY: "31/января/99",
		ddMMMYYYY: "31/янв/1999",
		ddMONTHYYYY: "31/января/1999",

		OPTION_DATE_SEPARATOR: "Разделитель даты",
		VALUE_SPACE: "Пробел",
		VALUE_NONE: "Нет",

		MONTH_SHORT_1: "янв",
		MONTH_SHORT_2: "фев",
		MONTH_SHORT_3: "мар",
		MONTH_SHORT_4: "апр",
		MONTH_SHORT_5: "май",
		MONTH_SHORT_6: "июн",
		MONTH_SHORT_7: "июл",
		MONTH_SHORT_8: "авг",
		MONTH_SHORT_9: "сен",
		MONTH_SHORT_10: "окт",
		MONTH_SHORT_11: "ноя",
		MONTH_SHORT_12: "дек",

		MONTH_1: "январь",
		MONTH_2: "февраль",
		MONTH_3: "март",
		MONTH_4: "апрель",
		MONTH_5: "май",
		MONTH_6: "июнь",
		MONTH_7: "июль",
		MONTH_8: "август",
		MONTH_9: "сентябрь",
		MONTH_10: "октябрь",
		MONTH_11: "ноябрь",
		MONTH_12: "декабрь"
	},

	MenuCaptions: {
		OPTION_STYLE: "Стиль строк меню",
		VALUE_SONY_DEFAULT: "Оригинальный Sony",
		VALUE_ALWAYS_SMALL: "Всегда маленькие",
		VALUE_ALWAYS_BIG: "Всегда большие"
	},

	TextEncoding: {
		OPTION_TITLE: "Кодировка книг в формате TXT и RTF",
		MSG_RESTART: "Требуется перезагрузка!",

		LATIN: "Latin",
		RUSSIAN: "Русская (Windows-1251)"
	},

	KeyBindings: {
		TITLE: "Привязка кнопок",
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
		BN_SIZE: "Кнопка масштаба",
		BN_BOOKMARK: "Кнопка закладки",
		BN_BL_NEXT: "Нижняя левая 'вперёд'",
		BN_BL_PREVIOUS: "Нижняя левая 'назад'",
		BN_SB_NEXT: "Боковая 'вперёд'",
		BN_SB_PREVIOUS: "Боковая 'назад'",
		BN_MENU: "Кнопка меню",
		BN_JP_LEFT: "Джойстик влево",
		BN_JP_RIGHT: "Джойстик вправо",
		BN_JP_UP: "Джойстик вверх",
		BN_JP_DOWN: "Джойстик вниз",
		BN_JP_CENTER: "Джойстик центр",
		BN_H_SIZE: "Удерживать кнопку масштаба",
		BN_H_BOOKMARK: "Удерживать кнопку закладки",
		BN_H_BL_NEXT: "Удерживать нижнюю левую 'вперёд'",
		BN_H_BL_PREVIOUS: "Удерживать нижнюю левую 'назад'",
		BN_H_MENU: "Удерживать кнопку меню",
		BN_H_SB_NEXT: "Удерживать боковую 'вперёд'",
		BN_H_SB_PREVIOUS: "Удерживать боковую 'назад'",
		BN_H_JP_CENTER: "Удерживать джойстик центр",
		BN_H_1: "Удерживать 1",
		BN_H_2: "Удерживать 2",
		BN_H_3: "Удерживать 3",
		BN_H_4: "Удерживать 4",
		BN_H_5: "Удерживать 5",
		BN_H_6: "Удерживать 6",
		BN_H_7: "Удерживать 7",
		BN_H_8: "Удерживать 8",
		BN_H_9: "Удерживать 9",
		BN_H_0: "Удерживать 0",
		BN_VOLUME_DOWN: "Громкость -",
		BN_H_VOLUME_DOWN: "Удерживать громкость -",
		BN_VOLUME_UP: "Громкость +",
		BN_H_VOLUME_UP: "Удерживать громкость +",

		// Actions
		ACTION_SHUTDOWN: "Отключить",
		ACTION_NEXT_PAGE: "Следующая страница",
		ACTION_PREVIOUS_PAGE: "Предыдущая страница",
		ACTION_NEXT_IN_HISTORY: "Следующая в журнале",
		ACTION_PREVIOUS_IN_HISTORY: "Предыдущая в журнале",
		ACTION_PREVIOUS_SONG: "Предыдущая песня",
		ACTION_NEXT_SONG: "Следующая песня",
		ACTION_GOTO_LINK: "Перейти по ссылке"
	},

	Screenshot: {
		TITLE: "Снимок экрана",
		ACTION_TITLE: "Сделать снимок экрана",
		SAVING_TO: "Сохранить в",
		FAILED_TO_SAVE: "Ошибка сохранения",
		OPT_SAVETO: "Сохранить в",
		OPT_FEEDBACK: "Показывать прогресс сохранения",
		MEMORY_STICK: "Memory stick",
		FEEDBACK_ON: "Вкл",
		FEEDBACK_OFF: "Откл",
		SD_CARD: "SD card",
		INTERNAL_MEMORY: "Внутренняя память"
	},

	BrowseFolders: {
		TITLE: "Просмотр папок",
		OPTION_SORTING_MODE: "Тип сортировки",
		VALUE_BY_TITLE: "По названию",
		VALUE_BY_AUTHOR_THEN_TITLE: "По автору и по названию",
		VALUE_BY_AUTHOR_SWAPPING: "По автору с заменой имени/фамилии",
		VALUE_BY_FILENAME: "По имени файла",
		OPTION_TITLE_SORTER: "Использовать поле 'titleSorter' для сортировки",
		ENABLED: "Включено",
		DISABLED: "Отключено",
		OPTION_IM_ROOT: "Верхний уровень внутренней памяти",
		OPTION_CARD_SCAN: "Сканировать карты SD/MS",
		OPTION_MOUNT: "Использовать монтирование SD/MS (экспериментально)",
		NODE_RESCAN_INTERNAL_MEMORY: "Просканировать внутреннюю память",
		NODE_COPY_TO_INTERNAL_MEMORY: "Копировать во внутреннюю память",
		NODE_COPY_TO_INTERNAL_MEMORY_COMMENT: "Копирует файл на верхний уровень внутренней памяти",
		NODE_COPY_AND_RESCAN: "Копировать и просканировать внутреннюю память",
		NODE_COPY_AND_RESCAN_COMMENT: "Копирует файл на верхний уровень внутренней памяти и сканирует книги в памяти",
		ERROR_TARGET_EXISTS: "Ошибка, файл уже существует",
		NODE_BROWSE_FOLDERS: "Просмотр папок",
		NODE_BROWSE_FOLDERS_COMMENT: "Просмотр файловой системы",
		NODE_INTERNAL_MEMORY: "Внутренняя память",
		NODE_MEMORY_STICK: "Memory Stick",
		NODE_MEMORY_STICK_MOUNT: "Memory Stick через монтирование",
		NODE_SD_CARD: "SD Card",
		NODE_SD_CARD_MOUNT: "SD Card через монтирование"
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
		VALUE_OFF: "Откл",
		ACTION_TOGGLE_CLOCK: "Переключить часы",
		AM: "am",
		PM: "pm"
	},

	PageIndex: {
		TITLE: "Индексная строка",
		INDEX_STYLE_BOOK: "Стиль индексной строки в книге",
		INDEX_MODE_BOOK: "Режим индексной строки в книге",
		INDEX_MODE_MENU: "Режим индексной строки в меню",
		INDEX_STYLE_MENU: "Стиль индексной строки в меню",
		OF: "из",
		ALWAYS_SHOWN: "Всегда показывать",
		NEVER_SHOWN: "Никогда не показывать",
		NOT_SHOWN_IF_SINGLE_PAGE: "Не показывать на единственной странице"
	},

	EpubUserStyle: {
		OPTION_EPUB_CSS_FILE: "Пользовательский стиль EPUB (CSS файл)",
		MSG_WARNING: "Влияет только на книги, созданные позднее!",
		VALUE_DISABLED: "Отключён"
	},

	BookHistory: {
		FUNC_X_BOOKS: FUNC_X_BOOKS,
		TITLE: "История книг",
		VALUE_DISABLED: "Отключена",
		OPTION_REPLACE: "История в Продолжить чтение",
		VALUE_ON: "Включена",
		VALUE_OFF: "Отключена"
	},

//ReadMark	ReadMark: {
//		TITLE_UNREAD: "Пометить книгу - Уже прочитана",
//		TITLE_READ: "Пометить книгу - Еще не прочитана",
//	},

	TextScale: {
		OPTION_SCALE_DEFAULT: "Размер шрифта по умолчанию",
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
	}
};