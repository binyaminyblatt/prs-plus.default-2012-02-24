// Name: 505
// Description: Sony PRS-505 bootstrap code
//	Receives PARAMS argument with the following fields:
//		bootLog, Core, loadAddons, loadCore
//	Must call loadAddons, loadCore and Core.init at appropriate times
//
// History:
//	2011-03-04 kartu - Initial version

var tmp = function() {
	var oldReadPreference, oldCallback;
	
	// Init core here
	oldReadPreference = kbook.model.readPreference;
	kbook.model.readPreference = function() {
		try {
			oldReadPreference.apply(this, arguments);
			// restore "old" readPreference
			kbook.model.readPreference = oldReadPreference;
			
			PARAMS.loadCore();
			PARAMS.Core.lang.init(Core.config.corePath + "lang/" + "English.js");
			PARAMS.loadAddons();
			PARAMS.Core.init();
		} catch (e) {
			PARAMS.bootLog("in overriden readPreference " + e);
		}
	};
	
	oldCallback = FskCache._diskSource.synchronizeCallback;
	FskCache._diskSource.synchronizeCallback = function() {
		try {
			if (PARAMS.Core && PARAMS.Core.config && PARAMS.Core.config.disableCardScan) {
				this.target.synchronizedSource();
				this.target.synchronizeDone();
				this.stack.pop();
			} else {
				oldCallback.apply(this, arguments);
			}
		} catch (e) {
			PARAMS.bootLog("Error in callback: " + e);
			oldCallback.apply(this, arguments);
		}
	};

	
	/*
		<function id="doDigit" params="part"><![CDATA[
			var c = this.PAGE.countPages().toString().length - 1;
			var s = "";
			for (var i = 0; i < c; i++)
				s += "_";
			s += part.key.charAt(0);
			this.setVariable("GOTO_VARIABLE", s);
			var container = this.container;
			container.beforeModal(container.GOTO_GROUP);
		]]></function>
	*/
	// First digit is ignored, if it is zero, when opening "goto" dialog (original function quoted above)
	kbook.model.container.sandbox.PAGE_GROUP.sandbox.doDigit = function(part) {
		try {
			var c, s, i, container, key;
			PARAMS.bootLog("sandbox.PAGE is " + this.sandbox.PAGE);
			c = this.sandbox.PAGE.countPages().toString().length - 1;
			s = "";
			for (i = 0; i < c; i++) {
				s += "_";
			}
			key = part.key.charAt(0);
			if (key !== "0") {
				s += key;
			} else {
				s += "_";
			}
			this.setVariable("GOTO_VARIABLE", s);
			container = kbook.model.container;
			container.sandbox.beforeModal.call(container, container.sandbox.GOTO_GROUP);
		} catch (ignore) {
			PARAMS.bootLog("error in doDigit: " + ignore);
		}
	};
	
	// Fix sorting
	var compareStrings =  PARAMS.Core.config.compat.compareStrings;
	String.prototype.localeCompare = function(a) {
		return compareStrings(this.valueOf(), a);
	};
};

tmp();
