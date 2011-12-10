// Name: Archiver
// Description: Support rar, zip and 7z archives.
// Author: Shura1oplot
//
// History:
//	2011-08-09 Shura1oplot - Initial version
//  2011-12-08 Ben Chenoweth - Added CBR and CBZ to supported archives; commented out unrar for now
//  2011-12-09 Ben Chenoweth - Reinstated unrar & default password switch
//  2011-12-09 Ben Chenoweth - Renamed file from core_unpacker.js to core_archiver.js
//  2011-12-10 Ben Chenoweth - Added list function
//
try {
	tmp = function() {
		var L, supportedArchives, defaultPassword, UNRAR, P7ZIP, RESULT_FILE, unpack, getRarCmdLine, getP7zipCmdLine;
		UNRAR = System.applyEnvironment("[prspPath]") + "unrar";
		P7ZIP = System.applyEnvironment("[prspPath]") + "7za";
		RETURNED_LIST = "/tmp/returnedlist";
		supportedArchives = {
			"7z": true,
			"rar": true,
			"zip": true,
			"cbz": true,
			"cbr": true
		};
		defaultPassword = "qwerty";

		list = function (path, outputDir, password) {
			var extension, result;
			
			if (password === undefined) {
				password = defaultPassword;
			}
			
			extension = Core.io.extractExtension(path);
			if ((extension === "rar") || (extension === "cbr")) {
				cmd = getRarCmdLine(path, outputDir, password, "list");
			} else {
				cmd = getP7zipCmdLine(path, outputDir, password, "list");
			}
			try {
				try {
					FileSystem.deleteFile(RETURNED_LIST);
				} catch (ignore) {
				}
				log.trace(cmd);
				Core.shell.exec(cmd);
				result = Core.io.getFileContent(RETURNED_LIST, "222");
				log.trace("result="+result);
				if (result !== "222") {
					return result;
				} else {
					return null;
				}
			} catch (e) {
				log.error("archiver", e);
			}
		};

		unpack = function (path, outputDir, password) {
			var extension;
			
			if (password === undefined) {
				password = defaultPassword;
			}
			
			extension = Core.io.extractExtension(path);
			if ((extension === "rar") || (extension === "cbr")) {
				cmd = getRarCmdLine(path, outputDir, password, "unpack");
			} else {
				cmd = getP7zipCmdLine(path, outputDir, password, "unpack");
			}
			try {
				//log.trace(cmd);
				Core.shell.exec(cmd);
			} catch (e) {
				log.error("archiver", e);
			}
		};
		
		getRarCmdLine = function (path, outputDir, password, action) {
			var cmdOutputDir;
			if (outputDir === undefined) {
				cmdOutputDir = "";
			} else {
				cmdOutputDir = " \"" + outputDir + "\"";
			}
			switch (action) {
				case 'unpack' : return UNRAR + " x -p\"" + password  + "\" -y \"" + path + "\"" + cmdOutputDir;
				case 'list' : return UNRAR + " -p\"" + password  + "\" lP \"" + path + "\" >" + RETURNED_LIST;
			}
		};
		
		getP7zipCmdLine = function (path, outputDir, password, action) {
			var cmdOutputDir;
			if (outputDir === undefined) {
				cmdOutputDir = "";
			} else {
				cmdOutputDir = " -o\"" + outputDir + "\"";
			}
			switch (action) {
				case 'unpack' : return P7ZIP + cmdOutputDir + " -p\"" + password  + "\" -y x \"" + path + "\"";
				case 'list' : return P7ZIP + " -p\"" + password  + "\" l -PRSP \"" + path + "\" >" + RETURNED_LIST;
			}
		};

		Core.archiver = {
			supportedArchives: supportedArchives,
			list: list,
			unpack: unpack
		};
	};
	
	tmp();
} catch (e) {
	log.error("Error in core_archiver.js", e);
}
