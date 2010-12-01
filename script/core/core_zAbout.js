// Name: About
// Description: Adds PRS+ stuff to the about screen 
// Author: kartu
//
// History:
//	2010-03-14 kartu - Initial version, refactored from Utils
//	2010-04-05 kartu - Added Core.version object.
//	2010-04-17 kartu - Moved global vars into local functions context
//	2010-05-20 kartu - Removed script reference from about string
//	2010-06-27 kartu - Fixed error log message (was refering to core-hook2, instead of lang)
//	2010-06-27 kartu - Adapted for 300

try {
	// dummy function, to avoid introducing global vars
	tmp = function() {
		var about, data, records, record, record1, prspFirmwareVersion;
		// About
		about = kbook.model.container.sandbox.ABOUT_GROUP.sandbox.ABOUT;
		data = about.sandbox.data;
		records = data.records;
		record1 = data.getRecord(1);
		record = new Fskin.TableRecord(data, record1);
		prspFirmwareVersion = Core.io.getFileContent(System.applyEnvironment("[prspVersionFile]"), "n/a");
		record.sandbox.text = "PRS+ " + prspFirmwareVersion +
			"\nAuthor: Mikheil Sukhiashvili aka kartu (kartu3@gmail.com) using work of: " + 
			"igorsk, boroda, obelix, pepak, kravitz, Mark Nord and others.\n" +
			"Translations were done by:\n" +
			"     Catalan: surquizu\n" +
			"     Czech: Hobogen\n" +
			"     French: VICTORSJG, Duglum, ronnn\n" +
			"     Georgian: rawerfas, kartu\n" +
			"     German: Duglum, klawong, Mark Nord\n" +			
			"     Italian: Samhain, Salvatore Ingala\n" +
			"     Russian: SLL, boroda, amutin, happyhgy\n" +
			"     Simplified Chinese: thawk, frank0734\n" +
			"     Spanish: surquizu, VICTORSJG\n" +
			"© GNU Lesser General Public License.";
		record.sandbox.kind = 4;
		records.splice(0, 0, record);
		about.dataChanged();

		Core.version = {
			firmware: prspFirmwareVersion
		};
	};
	tmp();
} catch (e) {
	log.error("initializing core-about", e);
}