this.addonDir = "/Data/addons/";
this.beSilent = true;
this.logFile = addonDir + "addons.log";

var userScript = "/Data/user.js";

var utils = {
	// A bit weird way to clone an object. There might be a better function or FSK specific operator to do the same
	// Arguments:
	//      obj - object to clone
	// Returns:
	//      "copy" of an object (linked objects as well as functions aren't cloned)
	cloneObj : function (obj) {
		var temp = FskCache.playlistResult;
		var dummy = {};
		try {
			FskCache.playlistResult = obj;
			var result = FskCache.playlist.browse(dummy);
			delete result.db;
			delete result.playlist;
			return result;
		} catch (e) {
			this.trace("error cloning: " + e);
			return undefined;
		} finally {
			FskCache.playlistResult = temp;
		}
	}, 
	
	// Getting values of properties of objects created by .so bytecode isn't always possible for custom functions.
	// However they are visible to .xb code
	// Arguments:
	//      obj - object to get value from
	//      propName - property name, could also look like "prop1.prop2.prop3"
	// Returns:
	//      property value or undefined, if property is not defined
	getSoValue : function (obj, propName) {
		return FskCache.mediaMaster.getInstance.call(obj, propName);
	},

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
		} catch (ignore) {
		}
        }
};

var trace = utils.trace;
function callScript(path) {
	try {		
		trace("Calling script: " + path);
		if(FileSystem.getFileInfo(path)) {
			var f = new Stream.File(path);
			try {
				var fn = new Function("utils", f.toString(), path, 1);
				fn(utils);
				delete fn;
			} finally {
				f.close();
			}
		} else {
			trace(path + " not found ");
		}
		trace("finished");
	} catch(e) {
		trace("Error when calling script "  + path + ": " + e);
	}
}


// Allows developers to override default paths, trace functions etc
try {
	if(FileSystem.getFileInfo(userScript)) {
		utils.trace("calling user  script");
		callScript(userScript);
	}
} catch (ignore) {
	utils.trace("script failed: " + ignore);
}


var iterator = new FileSystem.Iterator(addonDir);
var item;
while(item = iterator.getNext()) {
	if (item.type == "file") {
		var path = item.path;
		if(path.length > 2 && path.substring(0, 1) !== "_" && path.substring(path.length - 3) === ".js") {
			callScript(addonDir + path);
		}
	}
}