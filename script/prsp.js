// Description: PRS+ 300 bootstrap script
// Author: kartu
//
// History:
//	2010-06-26 kartu - Initial version, based on 505

if (!FileSystem.getFileInfo(System.applyEnvironment("[prspSafeModeFile]"))) {
	var bootLog;
	var path, code, f, endsWith, listFiles, getFileContent, getFileContentEx, userConfig, Core, loadCore, loadAddons;
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
			s.seek(s.bytesAvailable);
			s.writeLine(msg);
			s.close();
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
			try {
				iterator = new FileSystem.Iterator(path);
				try {
					items = [];
					while (item = iterator.getNext()) {
						if (item.type == "file") {
							p = item.path;
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
		getFileContent = function(path) {
			var f, result;
			try {
				f = new Stream.File(path, 2);
				result = f.toString();
				f.close();
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

		// Init function, called by bootstrap function 
		loadCore = function() {
			try {
				// Call core (there seems to be 100k limitation on javascript size, that's why it's split from addons)
				var coreCode, core;
				coreCode = getFileContentEx(config.coreFile, ".js");
				core = new Function("Core", coreCode);
				core(Core);
			} catch (e) {
				bootLog("Failed to load core");
			}
		};
		loadAddons = function() {
			var addonCode, log, addons;
			// Call addons
			try {
				addonCode = getFileContentEx(config.addonsFile, ".js");
				log = Core.log.getLogger("addons");
				addons = new Function("Core,log,tmp", addonCode);
				addons(Core, log, undefined);
			} catch (e) {
				bootLog("Failed to load addons " + e);
			}
		};
		
		// Read compatibility configuration
		try {
			path = Core.config.corePath + "compat/" +  Core.config.model + "_config.js";
			code = getFileContent(path);
			f = new Function("", code);
			Core.config.compat = f();
		} catch (e) {
			bootLog("FATAL: failed to load " + Core.config.model + " compat file" + e); 
		}
		
		// Call model specific bootstrap
		try {
			path = Core.config.corePath + "compat/" +  Core.config.model + "_bootstrap.js";
			code = getFileContent(path);
			f = new Function("bootLog,Core,loadCore,loadAddons", code);
			f(bootLog,Core, loadCore, loadAddons);
		} catch (e1) {
			bootLog("FATAL: failed to call bootstrap " + e1); 
		}
	};
	try {
		var from, to;
		from = new Date();
		tmp();
		to = new Date();
		bootLog("PRS+ started in "  + (to - from)/1000);
	} catch (e) {
		bootLog("Error initializing: " + e);
	}
}