// Started at, in milliseconds
var startedAt = (new Date()).getTime();

var root = "/Data/database/system/PRSPlus/";
var config = {
	root: root,
	addonRoot: root + "addons/",
	coreRoot: root + "core/",
	coreFile: root + "core.js",
	defaultLogLevel: "none",
	logFile: this.addonRoot + "PRSPlus.log",
	settingsRoot: root + "settings/"
};

// Typically would be used to override path to addons and logging settings.
var userScript = root + "user.config";

var Utils = {
	config: config,
	utils: [],
	actions: [],
	addons: [],

	loggers: {},
	createLogger: function(cls, level) {
		if(typeof level === "undefined") {
			level = config.defaultLogLevel;
		}
		var result = {};
		result.name = cls;
		result.log = this.log;
		result.setLevel = this.setLevel;
		result.setLevel(level);
		return result;
	},
	getLogger: function(cls, level) {
		var loggers = this.loggers;
		if(loggers.hasOwnProperty(cls)) {
			return loggers[cls];
		} else {
			var logger = this.createLogger(cls, level);
			loggers[cls] = logger;
			return logger;
		}
	},		
	log : function (msg, level) {
		try {
			if(typeof level === "undefined") {
				level = "";
			} else {
				level = " " + level;
			}
			var stream = new Stream.File(config.logFile, 1, 0);
		        try {
				stream.seek(stream.bytesAvailable);
				var d = new Date();
				var dateStr = d.getFullYear() + "-" + (d.getMonth()+1) + "-" + d.getDate() + " " +  d.getHours() +
					":" + d.getMinutes() + ":" + d.getSeconds() + "." + d.getMilliseconds();
				stream.writeLine(dateStr + level + " " + this.name  + "\t" + msg);
			} catch(ignore) {
			} finally {
			    stream.close();
			}
		} catch (ignore2) {
		}
        },
	setLevel: function(level) {
		this.trace = this.info = this.warn = this.error = Utils.dummy;
		switch(level) {
			case "trace":
				this.trace = Utils.trace;// fallthrough
			case "info":
				this.info = Utils.info;// fallthrough
			case "warn":
				this.warn = Utils.warn; // fallthrough
			case "error":
				this.error = Utils.error;// fallthrough
		}
	},
        trace: function(msg) {this.log(msg, "T");},
        info: function(msg) {this.log(msg, "I");},
        warn: function(msg) {this.log(msg, "W");},
        error: function(msg) {this.log(msg, "E");},
        dummy: function() {}
};

Utils.callScript = function (path, log) {
	try {		
		if(FileSystem.getFileInfo(path)) {
			var f = new Stream.File(path);
			try {
				var fn = new Function("Utils", f.toString(), path, 1);
				var result = fn(Utils);
				delete fn;
				return result;
			} finally {
				f.close();
			}
		}
	} catch(e) {
		if(log) {
			log.error("Error calling " + path + ": " + e);
		}
	}
};
var callScript = Utils.callScript;

// Allows developers to override default paths, trace functions etc
try {
	if(FileSystem.getFileInfo(userScript)) {
		callScript(userScript);
	}
} catch (ignore) {
}

var log = Utils.getLogger("autorun");

// Adds all addons actions to the Utils.actions array
var addActions = function(addon) {
	if(addon && addon.actions) {
		for(var i = 0, n = addon.actions.length; i < n; i++) {
			addon.actions[i].addon = addon;
			Utils.actions.push(addon.actions[i]);
		}
	}
};

// Returns content of the file <path> as a string.
// If any kind of error happens (file doesn't exist, or is not readable etc) returns <defVal>
//
Utils.getFileContent = function (path, defVal) {
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
			var item, utils = [];
			while (item = iterator.getNext()) {
				if (item.type == "file") {
					var path = item.path;
					if(endsWith(path, ".js")) {
						utils.push(path);
					}
				}
			}
			utils.sort();
			
			// Load utils
			var content = "";
			for (var i = 0, n = utils.length; i < n; i++) {
				content += Utils.getFileContent(corePath + utils[i], "") + "\n";	
			}
			
			var fn = new Function("Utils", content, corePath, 1);
			fn(Utils);
			delete fn;			
		} catch (e) {
			log.error("in initializeCore: " + e);
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
		while(item = iterator.getNext()) {
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
			var addon = callScript(addonPath + addons[i], log);
			if(typeof addon !== "undefined") {
				Utils.addons.push(addon);
				addActions(addon);
			}
		}
		
		// Will load options and initialize addons, create menu nodes etc
		Utils.initialize();		
	} catch (e) {
		log.error("in initialize: " + e);
	} finally {
		iterator.close();
	}
};

initializeCore(config.coreRoot, config.coreFile);
initialize(config.addonRoot);
delete initialize;
delete initializeCore;

// Finished at, in milliseconds
var finishedAt = (new Date()).getTime();
log.info("PRSPlus initialization took " + (finishedAt - startedAt)/1000 + " seconds");