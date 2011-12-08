// Name: Unpacker
// Description: Support rar, zip and 7z archives.
// Author: Shura1oplot
//
// History:
//	2011-08-09 Shura1oplot - Initial version
//  2011-12-08 Ben Chenoweth - Added CBR and CBZ to supported archives; commented out unrar for now
//
try {
	tmp = function() {
		var L, supportedArchives, defaultPassword, UNRAR, P7ZIP, unpack, getRarCmdLine, getP7zipCmdLine;
		//UNRAR = System.applyEnvironment("[prspPath]") + "unrar";
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
			//var extension;
			
			if (password === undefined) {
				password = defaultPassword;
			}
			
			// 7za is supposed to be able to handle rar files, so these lines have been commented out for now
			//extension = Core.io.extractExtension(path);
			//if ((extension === "rar") || (extension === "cbr")) {
				//cmd = getRarCmdLine(path, outputDir, password);
			//} else {
				cmd = getP7zipCmdLine(path, outputDir, password);
			//}
			try {
				//log.trace(cmd);
				Core.shell.exec(cmd);
			} catch (e) {
				log.error("unpacker", e);
			}
		};
		
		/*getRarCmdLine = function (path, outputDir, password) {
			var cmdOutputDir;
			if (outputDir === undefined) {
				cmdOutputDir = "";
			} else {
				cmdOutputDir = " \"" + outputDir + "\"";
			}
			return UNRAR + " x -p\"" + password  + "\" -y \"" + path + "\"" + cmdOutputDir;
		}; */
		
		getP7zipCmdLine = function (path, outputDir, password) {
			var cmdOutputDir;
			if (outputDir === undefined) {
				cmdOutputDir = "";
			} else {
				cmdOutputDir = " -o\"" + outputDir + "\"";
			}
			//return P7ZIP + cmdOutputDir + " -p\"" + password  + "\" -y x \"" + path + "\"";
			return P7ZIP + cmdOutputDir + " -y x \"" + path + "\"";
		};
		
		Core.unpacker = {
			supportedArchives: supportedArchives,
			unpack: unpack
		};
	};
	
	tmp();
} catch (e) {
	log.error("Error in core_unpacker.js", e);
}
