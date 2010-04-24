var bootLog;
var tmp = function() {
	var config = {
		debugMode: false,
		defaultLogLevel: "none",
		logFile: "b:/prsp.log",
		corePath: System.applyEnvironment("[prspCorePath]"),
		addonsPath: System.applyEnvironment("[prspAddonsPath]"),
		settingsPath: System.applyEnvironment("[prspSettingsPath]")
	};
	bootLog = function(msg) {
		if (config.defaultLogLevel === "none") {
			return;
		}
		var s = new Stream.File(config.logFile, 3, 0);
		s.seek(s.bytesAvailable);
		s.writeLine(msg);
		s.close();	
	};
	var Core = {config: config};
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
	
	// Load user config
	var userConfig = System.applyEnvironment("[prspUserConfig]");
	var debugMode = false;
	if (FileSystem.getFileInfo(userConfig)) {
		debugMode = true;
		var f = new Function("config", getFileContent(userConfig));
		f(config);
		delete f;
	}

	// In debug mode, need to combine files manually, in normal mode, do nothing
	if (debugMode) {
	
		var endsWith = function(str, postfix) {
			return str.lastIndexOf(postfix) === str.length - postfix.length;
		};
	
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
		
		// Combine & call core files (there seems to be 100k limitation on javascript size, that's why it's split from addons)
		var corePath = config.corePath;
		var coreFiles = listFiles(corePath, ".js");
		var coreCode = "";
		for (var i = 0, n = coreFiles.length; i < n; i++) {
			coreCode = coreCode + getFileContent(corePath + coreFiles[i]);
		}
		var core = new Function("Core", coreCode);
		core(Core);
		delete core;
		delete coreCode;
		
		// Combine & call addon files
		var addonsPath = config.addonsPath;
		var addonFiles = listFiles(addonsPath, ".js");
		var addonCode = "";
		for (i = 0, n = addonFiles.length; i < n; i++) {
			addonCode = addonCode + getFileContent(addonsPath + addonFiles[i]);
		}
		var log = Core.log.getLogger("addons");
		var addons = new Function("Core,log", addonCode);
		addons(Core, log);
		delete addonCode;
		delete addons;
	}
};
try {
	tmp();
} catch (e) {
	bootLog("Error initializing: " + e);
}
