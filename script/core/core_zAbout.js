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
//	2011-01-29 karut - Adapted for x50

try {
	// dummy function, to avoid introducing global vars
	tmp = function() {
		var old, prspFirmwareVersion;
		prspFirmwareVersion = Core.io.getFileContent(System.applyEnvironment("[prspVersionFile]"), "n/a");

		Core.version = {
			firmware: prspFirmwareVersion
		};
		
		old = Fskin.kbookAbout.initialize;
		Fskin.kbookAbout.initialize = function() {
			var data, record, record1, aboutText, versionText;
			try {
				data = this.data;
				record1 = data.getRecord(1);
				record = new Fskin.TableRecord(data, record1);
				versionText = "PRS+ " + prspFirmwareVersion;
				aboutText = 
					"Author: Mikheil Sukhiashvili aka kartu (kartu3@gmail.com) using work of: " + 
					"igorsk, boroda, obelix, pepak, kravitz, Mark Nord and others.\n" +
					"Translations by:\n" +
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
				
				if (data.records.length > 30) {
					// x50
					record.sandbox.kind = 6;
					record.sandbox.text = aboutText;
					data.records.splice(0, 0, record);
					record = new Fskin.TableRecord(data, record1);
					record.sandbox.text =  "PRS+ " + prspFirmwareVersion;
					record.sandbox.kind = 30;
					data.records.splice(0, 0, record);
				} else {
					// older readers
					record.sandbox.kind = 4;
					record.sandbox.text = versionText + "\n" + aboutText;
					data.records.splice(0, 0, record);
				}
				
			} catch (e) {
				log.error("Fskin.kbookAbout.initialize", e);
			}
			old.apply(this, arguments);
		};
	};
	tmp();
} catch (e) {
	log.error("initializing core-about", e);
}