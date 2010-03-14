// Name: System
// Description: Fsk system methods 
// Author: kartu
//
// History:
//	2010-03-14 kartu - Initial version, refactored from Utils

Core.system = {};

// Calls script located in "path", using "log" to log errors
// Arguments:
//	path - path to the script
//	log - logger
// Throws exceptions if script fails or file cannot be found.
Core.system.callScript = function (path, log) {
	try {		
		if (FileSystem.getFileInfo(path)) {
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
	} catch (e) {
		var msg = "Error calling " + path + ": " + e;
		if (log) {
			log.error(msg);
		}
		throw msg;
		
	}
};


// A bit weird way to clone an object. There might be a better function or FSK specific operator to do the same
// Arguments:
//      obj - object to clone
// Returns:
//      "copy" of an object (linked objects as well as functions aren't cloned)
//
Core.system.cloneObj = function (obj) {
	var temp = FskCache.playlistResult;
	var dummy = {};
	try {
		FskCache.playlistResult = obj;
		var result = FskCache.playlist.browse(dummy);
		delete result.db;
		delete result.playlist;
		return result;
	} catch (e) {
		log.error("error cloning: " + e);
		return undefined;
	} finally {
		FskCache.playlistResult = temp;
	}
};

// Getting values of properties of objects created by .so bytecode isn't always possible for custom functions.
// However they are visible to .xb code
// Arguments:
//      obj - object to get value from
//      propName - property name, could also look like "prop1.prop2.prop3"
// Returns:
//      property value or undefined, if property is not defined
//
Core.system.getSoValue = function (obj, propName) {
	return FskCache.mediaMaster.getInstance.call(obj, propName);
};
