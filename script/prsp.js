// Description: PRS+ bootstrap script
// Author: kartu
//
// History:
//	2010-06-26 kartu - Initial version, based on 505
//	2011-02-26 kartu - Added compatPath & getFileContent params to bootstrap call
//	2011-02-27 kartu - Refactored parameters into PARAMS object
//	2011-08-27 kartu - Added "addons1" folder, to fix "script too big" problem
//	2011-08-27 Mark Nord - Fixed "addonpath1" in case of folder (as addonsPath ends with "/" simply adding +"1" will fail)
//	2011-11-26 Ben Chenoweth - Added "addons2" folder
//	2011-01-19 Ben Chenoweth - Added "addons3" folder

if (!FileSystem.getFileInfo(System.applyEnvironment("[prspSafeModeFile]"))) {
	var bootLog;
	var path, code, f, endsWith, listFiles, getFileContent, getFileContentEx, userConfig, Core, loadCore, loadAddons, compatPath;
	var tmp = function() {
		var config = {
			model: System.applyEnvironment("[prspModel]"),
			defaultLogLevel: "none",
			logFile: System.applyEnvironment("[prspLogFile]"),
			corePath: System.applyEnvironment("[prspCorePath]"),
			addonsPath: System.applyEnvironment("[prspAddonsPath]"),
			settingsPath: System.applyEnvironment("[prspSettingsPath]"),
			publicPath: System.applyEnvironment("[prspPublicPath]"), 
			userCSSPath: System.applyEnvironment("[prspUserCSSPath]"),
			userDictionaryPath: System.applyEnvironment("[userDictionaryPath]"),
			userGamesSavePath: System.applyEnvironment("[prspPublicPath]")+"GamesSave/",  
			userScreenShotPath: "ScreenShots/", 
			coreFile: System.applyEnvironment("[prspCoreFile]"),
			addonsFile: System.applyEnvironment("[prspAddonsFile]")
		};
		
		// Bootstrap logger
		//
		bootLog = function(msg) {
			if (config.defaultLogLevel === "none") {
				return;
			}
			var s = new Stream.File(config.logFile, 3);
			try {
				s.seek(s.bytesAvailable);
				s.writeLine(msg);
			} finally {
				s.close();
			}
		};

		// Checks if string ends with given postfix
		//		
		endsWith = function(str, postfix) {
			return str.lastIndexOf(postfix) === str.length - postfix.length;
		};
		
		// Returns array of files with given extension sorted by name
		//
		listFiles = function(path, ext) {
			var iterator, items, item, p;
			items = [];
			try {
				iterator = new FileSystem.Iterator(path);
				try {
					while (item = iterator.getNext()) {
						if (item.type == "file") {
							p = item.path;
							if (ext === undefined || endsWith(p, ext)) {
								items.push(p);
							}
						}
					}
					items.sort();
				} finally {
					iterator.close();
				}
			} catch (e) {
				bootLog("Error in list files, listing folder " + path + ": " + e);
			}
			return items;
		};
		
		// Loads file contents
		//
		getFileContent = function(path) {
			var f, result;
			try {
				f = new Stream.File(path, 2);
				try {
					result = f.toString();
				} finally {
					f.close();
				}
				return result;
			} catch (e) {
				bootLog("Error reading file " + path + ": " + e);
			}
			return "";
		};
		
		// Loads file, or, if path points to a folder, combined content of the files in folder, with extention <ext>
		//
		getFileContentEx = function(path, ext) {
			var info, files, result, i, n;
			info = FileSystem.getFileInfo(path);
			if (info && info.type == "directory") {
				files = listFiles(path, ext);
				result = "";
				for (i = 0, n = files.length; i < n; i++) {
					result = result + getFileContent(path + files[i]);
				}
				return result;
			} 
			return getFileContent(path);
		};

		// Load user config
		userConfig = System.applyEnvironment("[prspBetaUserConfig]");
		if (FileSystem.getFileInfo(userConfig)) {
			f = new Function("config", getFileContent(userConfig));
			f(config);
		}

		Core = {config: config};

		// Init function, called by model specific bootstrap 
		loadCore = function() {
			try {
				// Call core (there seems to be 100k limitation on javascript size, that's why it's split from addons)
				var coreCode, core;
				coreCode = getFileContentEx(config.coreFile, ".js");
				core = new Function("Core", coreCode);
				core(Core);
			} catch (e) {
				bootLog("Failed to load core "  + e);
				bootLog("core file was " + config.coreFile);
			}
		};
		
		// Load addons, called by model specific bootstrap
		loadAddons = function() {
			var addonCode, log, addons, addonsPath, addonsPath1, addonsPath2, addonsPath3, jsPostfix;
			jsPostfix = ".js";
			addonsPath = config.addonsFile;
			// Call addons
			try {
				addonCode = getFileContentEx(addonsPath, jsPostfix);
				log = Core.log.getLogger("addons");
				addons = new Function("Core,log,tmp", addonCode);
				addons(Core, log, undefined);
			} catch (e) {
				bootLog("Failed to load addons " + e);
			}
			// Call addons1
			try {
				var lenDiff = addonsPath.length - jsPostfix.length;
				if (addonsPath.indexOf(jsPostfix) === lenDiff) {
					addonsPath1 = addonsPath.substring(0, lenDiff) + "1" + jsPostfix;
				} else {
					addonsPath1 = addonsPath.substring(0, addonsPath.lastIndexOf("/")) + "1/";
				}
				addonCode = getFileContentEx(addonsPath1, ".js");
				addons = new Function("Core,log,tmp", addonCode);
				addons(Core, log, undefined);
			} catch (e) {
				bootLog("Failed to load addons1 " + e);
			}
			// Call addons2
			try {
				var lenDiff = addonsPath.length - jsPostfix.length;
				if (addonsPath.indexOf(jsPostfix) === lenDiff) {
					addonsPath2 = addonsPath.substring(0, lenDiff) + "2" + jsPostfix;
				} else {
					addonsPath2 = addonsPath.substring(0, addonsPath.lastIndexOf("/")) + "2/";
				}
				addonCode = getFileContentEx(addonsPath2, ".js");
				addons = new Function("Core,log,tmp", addonCode);
				addons(Core, log, undefined);
			} catch (e) {
				bootLog("Failed to load addons2 " + e);
			}
			// Call addons3
			try {
				var lenDiff = addonsPath.length - jsPostfix.length;
				if (addonsPath.indexOf(jsPostfix) === lenDiff) {
					addonsPath3 = addonsPath.substring(0, lenDiff) + "3" + jsPostfix;
				} else {
					addonsPath3 = addonsPath.substring(0, addonsPath.lastIndexOf("/")) + "3/";
				}
				addonCode = getFileContentEx(addonsPath3, ".js");
				addons = new Function("Core,log,tmp", addonCode);
				addons(Core, log, undefined);
			} catch (e) {
				bootLog("Failed to load addons3 " + e);
			}
		};

		compatPath = Core.config.corePath + "compat/";
		
		// Read compatibility configuration
		try {
			path = compatPath + Core.config.model + "_config.js";
			code = getFileContent(path);
			f = new Function("", code);
			Core.config.compat = f();
		} catch (e) {
			bootLog("FATAL: failed to load " + Core.config.model + " compat file" + e); 
		}
		
		// Call model specific bootstrap
		try {
			path = compatPath +  Core.config.model + "_bootstrap.js";
			code = getFileContent(path);
			f = new Function("PARAMS", code);
			f({
				bootLog: bootLog,
				Core: Core,
				loadCore: loadCore, 
				loadAddons: loadAddons, 
				getFileContent: getFileContent, 
				compatPath: compatPath
			});
		} catch (e1) {
			bootLog("FATAL: failed to call bootstrap " + e1); 
		}
	};
	try {
		tmp();
	} catch (e) {
		bootLog("Error initializing: " + e);
	}
}