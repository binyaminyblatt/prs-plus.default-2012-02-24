// Name: PRSPlus
// Description: PRS+ startup file 
// Author: kartu
//
// History:
//	2010-03-14 kartu - Refactored to use Core instead of Utils

// Started at, in milliseconds
var startedAt = (new Date()).getTime();
var root = "/Data/database/system/PRSPlus/";
var config = {
	root: root,
	addonRoot: root + "addons/",
	coreRoot: root + "core/",
	coreFile: this.coreRoot + "core_all.js",
	defaultLogLevel: "none",
	logFile: this.addonRoot + "PRSPlus.log",
	settingsRoot: root + "settings/"
};
// Typically would be used to override path to addons and logging settings.
var userScript = root + "user.config";
var Core = {
	config: config,
	utils: [],
	actions: [],
	addons: []
};

var log = function (msg) {
	// todo
	if (config.defaultLogLevel !== "none") {
		try {
			var stream = new Stream.File(config.logFile, 1, 0);
		        try {
				stream.seek(stream.bytesAvailable);
				var d = new Date();
				var dateStr = d.getFullYear() + "-" + (d.getMonth()+1) + "-" + d.getDate() + " " +  d.getHours() +
					":" + d.getMinutes() + ":" + d.getSeconds() + "." + d.getMilliseconds();
				stream.writeLine(dateStr + "\t" + msg);
			} catch(ignore) {
			} finally {
			    stream.close();
			}
		} catch (ignore2) {
		}
	}
};

var logTiming = function (msg) {
	 log(msg + ((new Date()).getTime() - startedAt)/1000 + " seconds");
	 startedAt = (new Date()).getTime();
};

var callScript = function (path) {
	try {		
		if(FileSystem.getFileInfo(path)) {
			var f = new Stream.File(path);
			try {
				var fn = new Function("Core", f.toString(), path, 1);
				var result = fn(Core);
				delete fn;
				return result;
			} finally {
				f.close();
			}
		}
	} catch(e) {
		if(log) {
			log("Error calling " + path + ": " + e);
		}
	}
};

// Allows developers to override default paths, trace functions etc
try {
	if (FileSystem.getFileInfo(userScript)) {
		callScript(userScript);
	}
} catch (ignore) {
}

// Adds all addons actions to the Core.actions array
var addActions = function(addon) {
	if(addon && addon.actions) {
		for(var i = 0, n = addon.actions.length; i < n; i++) {
			addon.actions[i].addon = addon;
			Core.actions.push(addon.actions[i]);
		}
	}
};

// Returns content of the file <path> as a string.
// If any kind of error happens (file doesn't exist, or is not readable etc) returns <defVal>
//
var getFileContent = function (path, defVal) {
	var stream;
	try {
		stream = new Stream.File(path);
		return stream.toString();
	} catch (whatever) {
	} finally {
		try {
			stream.close();
		} catch (ignore) {
		}
	}
	return defVal;
};

var endsWith = function(str, postfix) {
	return str.lastIndexOf(postfix) === str.length - postfix.length;
};

// Initializes core, starting it either as a single file, or concatenating smaller files
var initializeCore = function(corePath, coreFile) {
	if( FileSystem.getFileInfo(coreFile)) {
		callScript(coreFile);
	} else {
		var iterator = new FileSystem.Iterator(corePath);
		try {
			var item, utils = [], path;
			while (item = iterator.getNext()) {
				if (item.type == "file") {
					path = item.path;
					if (endsWith(path, ".js")) {
						utils.push(path);
					}
				}
			}
			logTiming("Listing files took ");
			utils.sort();
			
			// Load utils
			var content = "";
			for (var i = 0, n = utils.length; i < n; i++) {
				content += getFileContent(corePath + utils[i], "") + "\n";	
			}
			logTiming("Combining files took ");
			
			var fn = new Function("Core", content, corePath, 1);
			logTiming("Compiling core took ");
			fn(Core);
			logTiming("Calling core took ");
			delete fn;			
		} catch (e) {
			log("Error in initializeCore: " + e);
		} finally {
			iterator.close();
		}
	}
};

// Initializes addons & utils in an alphabetic order
// Utils have "_" prefix and are initialized before addons
var initialize = function (addonPath) {
	var iterator = new FileSystem.Iterator(addonPath);
	try {
		var item;
		var addons = [];
		while (item = iterator.getNext()) {
			if (item.type == "file") {
				var path = item.path;
				if(endsWith(path, ".js")) {
					addons.push(path);
				}
			}
		}
		addons.sort();
		
		// Load addons
		for (var i = 0, n = addons.length; i < n; i++) {
			var addon = callScript(addonPath + addons[i]);
			if(typeof addon !== "undefined") {
				Core.addons.push(addon);
				addActions(addon);
			}
		}
		
		// Will load options and initialize addons, create menu nodes etc
		Core.initialize();		
	} catch (e) {
		log("Error in initialize: " + e);
	} finally {
		iterator.close();
	}
};

logTiming("PRSPlus preparation took ");
initializeCore(config.coreRoot, config.coreFile);
initialize(config.addonRoot);
delete initialize;
delete initializeCore;

// Finished at, in milliseconds
logTiming("PRSPlus initialization took ");