// Name: Archiver
// Description: Support rar, zip and 7z archives.
// Author: Shura1oplot
//
// History:
//	2011-08-09 Shura1oplot - Initial version
//  2011-12-08 Ben Chenoweth - Added CBR and CBZ to supported archives; commented out unrar for now
//  2011-12-09 Ben Chenoweth - Reinstated unrar & default password switch
//  2011-12-09 Ben Chenoweth - Renamed file from core_unpacker.js to core_archiver.js
//
try {
	tmp = function() {
		var L, supportedArchives, defaultPassword, UNRAR, P7ZIP, unpack, getRarCmdLine, getP7zipCmdLine;
		UNRAR = System.applyEnvironment("[prspPath]") + "unrar";
		P7ZIP = System.applyEnvironment("[prspPath]") + "7za";
		supportedArchives = {
			"7z": true,
			"rar": true,
			"zip": true,
			"cbz": true,
			"cbr": true,
		};
		defaultPassword = "qwerty";

		unpack = function (path, outputDir, password) {
			var extension;
			
			if (password === undefined) {
				password = defaultPassword;
			}
			
			extension = Core.io.extractExtension(path);
			if ((extension === "rar") || (extension === "cbr")) {
				cmd = getRarCmdLine(path, outputDir, password);
			} else {
				cmd = getP7zipCmdLine(path, outputDir, password);
			}
			try {
				//log.trace(cmd);
				Core.shell.exec(cmd);
			} catch (e) {
				log.error("archiver", e);
			}
		};
		
		getRarCmdLine = function (path, outputDir, password) {
			var cmdOutputDir;
			if (outputDir === undefined) {
				cmdOutputDir = "";
			} else {
				cmdOutputDir = " \"" + outputDir + "\"";
			}
			return UNRAR + " x -p\"" + password  + "\" -y \"" + path + "\"" + cmdOutputDir;
			//return UNRAR + " x -y \"" + path + "\"" + cmdOutputDir;
		};
		
		getP7zipCmdLine = function (path, outputDir, password) {
			var cmdOutputDir;
			if (outputDir === undefined) {
				cmdOutputDir = "";
			} else {
				cmdOutputDir = " -o\"" + outputDir + "\"";
			}
			return P7ZIP + cmdOutputDir + " -p\"" + password  + "\" -y x \"" + path + "\"";
			//return P7ZIP + cmdOutputDir + " -y x \"" + path + "\"";
		};
		
		Core.archiver = {
			supportedArchives: supportedArchives,
			unpack: unpack
		};
	};
	
	tmp();
} catch (e) {
	log.error("Error in core_archiver.js", e);
}
