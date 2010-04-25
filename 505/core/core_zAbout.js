// Name: About
// Description: Adds PRS+ stuff to the about screen 
// Author: kartu
//
// History:
//	2010-03-14 kartu - Initial version, refactored from Utils
//	2010-04-05 kartu - Added Core.version object.
//	2010-04-17 kartu - Moved global vars into local functions context

try {
	// dummy function, to avoid introducing global vars
	tmp = function() {
		// About
		var getSoValue = Core.system.getSoValue;
		var about = kbook.model.container.ABOUT_GROUP.ABOUT;
		var data = getSoValue(about, "data");
		var records = getSoValue(data, "records");
		var duplicate = getSoValue(this, "Fskin.tableData.duplicate");
		var store = getSoValue(this, "Fskin.tableField.store");
		
		var record = duplicate.call(this, records[1]);
		var prspScriptVersion = Core.io.getFileContent("/Data/database/system/PRSPlus/prsp.ver", "n/a");
		var prspFirmwareVersion = Core.io.getFileContent("/opt/prspfw.ver", "n/a");
		store.call(this, record, "text", "PRS+ Script: " + prspScriptVersion +
			"\nPRS+ Firmware: " + prspFirmwareVersion +
			"\nAuthor: Mikheil Sukhiashvili aka kartu (kartu3@gmail.com) using work of: " + 
			"igorsk, boroda, obelix, pepak, llasram and others.\n" +
			"© GNU Lesser General Public License.");
		store.call(this, record, "kind", 4);
		records.splice(0, 0, record);
		
		about.dataChanged();
		Core.version = {
			script: prspScriptVersion,
			firmware: prspFirmwareVersion
		};
	};
	tmp();
} catch (e) {
	log.error("initializing core-hook2", e);
}
