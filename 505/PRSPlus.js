// Description: PRS+ bootstrap script
// Author: kartu
//
// History:
//	2010-05-10 kartu - Added userDictionaryPath to config
//				Moved prspCoreFile and prspAddonsFile to allow modifications via userconfig
//				If prspCoreFile/prspAddonsFile is a folder, .js files inside it will be combined into one and called 
//	2010-05-23 kartu - Removed unused debugMode variable
//	2010-05-13 kartu - Fixed: coreFile/addonsFile wouldn't work if pointed to a folder

// If not in safe mode  (USB was connected during startup) not initializing PRS+
if (!FileSystem.getFileInfo(System.applyEnvironment("[prspSafeModeFile]"))) {
	var bootLog;
	var tmp = function() {
		var config = {
			defaultLogLevel: "none",
			logFile: "b:/prsp.log",
			corePath: System.applyEnvironment("[prspCorePath]"),
			addonsPath: System.applyEnvironment("[prspAddonsPath]"),
			settingsPath: System.applyEnvironment("[prspSettingsPath]"),
			userCSSPath: System.applyEnvironment("[prspUserCSSPath]"),
			userDictionaryPath: System.applyEnvironment("[userDictionaryPath]"),
			coreFile: System.applyEnvironment("[prspCoreFile]"),
			addonsFile: System.applyEnvironment("[prspAddonsFile]")
		};
		
		// Bootstrap logger
		//
		bootLog = function(msg) {
			if (config.defaultLogLevel === "none") {
				return;
			}
			var s = new Stream.File(config.logFile, 3, 0);
			s.seek(s.bytesAvailable);
			s.writeLine(msg);
			s.close();
		};

		// Checks if string ends with given postfix
		//		
		var endsWith = function(str, postfix) {
			return str.lastIndexOf(postfix) === str.length - postfix.length;
		};
		
		// Returns array of files with given extension sorted by name
		//
		var listFiles = function(path, ext) {
			try {
				var iterator = new FileSystem.Iterator(path);
				try {
					var items = [];
					var item;
					while (item = iterator.getNext()) {
						if (item.type == "file") {
							var p = item.path;
							if (ext === undefined || endsWith(p, ext)) {
								items.push(p);
							}
						}
					}
					items.sort();
					return items;
				} finally {
					iterator.close();
				}
			} catch (e) {
				bootLog("Error in list files, listing folder " + path + ": " + e);
			}
			return [];
		};
		
		// Loads file contents
		//
		var getFileContent = function(path) {
			try {
				var f = new Stream.File(path, 2);
				var result = f.toString();
				f.close();
				return result;
			} catch (e) {
				bootLog("Error reading file " + path + ": " + e);
			}
			return "";
		};
		
		// Loads file, or, if path points to a folder, combined content of the files in folder, with extention <ext>
		//
		var getFileContentEx = function(path, ext) {
			var info = FileSystem.getFileInfo(path);
			if (info && info.type == "directory") {
				var files = listFiles(path, ext);
				var result = "";
				for (var i = 0, n = files.length; i < n; i++) {
					result = result + getFileContent(path + files[i]);
				}
				return result;
			} 
			return getFileContent(path);
		}

		// Load user config
		var userConfig = System.applyEnvironment("[prspUserConfig]");
		if (FileSystem.getFileInfo(userConfig)) {
			var f = new Function("config", getFileContent(userConfig));
			f(config);
			delete f;
		}

		var Core = {config: config};
		
		// Call core (there seems to be 100k limitation on javascript size, that's why it's split from addons)
		var coreCode = getFileContentEx(config.coreFile, ".js");
		var core = new Function("Core", coreCode);
		core(Core);
		delete core;
		delete coreCode;

		// Call addons
		var addonCode = getFileContentEx(config.addonsFile, ".js");
		var log = Core.log.getLogger("addons");
		var addons = new Function("Core,log,tmp", addonCode);
		addons(Core, log, undefined);
		delete addonCode;
		delete addons;

		Core.init();
	};
	try {
		tmp();
	} catch (e) {
		bootLog("Error initializing: " + e);
	}
}
