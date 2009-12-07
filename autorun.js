this.addonRoot = "/Data/addons/";
this.beSilent = true;
this.logFile = addonRoot + "addons.log";

var userScript = "/Data/user.js";

var Utils = {
	trace : function (msg) {
		if(beSilent) {
			return;
		}
		try {
			var stream = new Stream.File(logFile, 1, 0);
		        try {
				stream.seek(stream.bytesAvailable);
				stream.writeLine(new Date() + "\t" + msg);
			} catch(ignore) {
			} finally {
			    stream.close();
			}
		} catch (ignore2) {
		}
        }
};

var trace = Utils.trace;
var callScript = function (path) {
	try {		
		trace("Calling script: " + path);
		if(FileSystem.getFileInfo(path)) {
			var result;
			var f = new Stream.File(path);
			try {
				var fn = new Function("Utils", f.toString(), path, 1);
				var result = fn(Utils);
				delete fn;
				return result;
			} finally {
				f.close();
			}
		} else {
			trace(path + " not found ");
		}
		return result;
	} catch(e) {
		trace("Error when calling script "  + path + ": " + e);
	}
}


// Allows developers to override default paths, trace functions etc
try {
	if(FileSystem.getFileInfo(userScript)) {
		Utils.trace("calling user  script");
		callScript(userScript);
	}
} catch (ignore) {
	Utils.trace("script failed: " + ignore);
}

// Initializes addons & utils in an alphabetic order
// Utils have "_" prefix and are initialized before addons
var initialize = function () {
	var iterator = new FileSystem.Iterator(addonRoot);
	try {
		var item;
		var utils = [];
		var addons = [];
		while(item = iterator.getNext()) {
			if (item.type == "file") {
				var path = item.path;
				if(path.length > 2 && path.substring(path.length - 3) === ".js") {
					if(path.substring(0, 1) == "_") {
						utils.push(path);
					} else {
						addons.push(path);
					}
				}
			}
		}
		utils.sort();
		addons.sort();
		
		var rootDir = addonRoot;
		// Init utils
		for(var i = 0, n = utils.length; i < n; i++) {
			callScript(rootDir + utils[i]);
		}
		// Init addons
		for(i = 0, n = addons.length; i < n; i++) {
			var addon = callScript(rootDir + addons[i]);
			if(typeof addon !== "undefined") {
				Utils.createAddonNode(addon);
			}
		}
	} finally {
		iterator.close();
	}
}

initialize();