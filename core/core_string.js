// Name: String
// Description: String related methods
// Author: kartu
//
// History:
//	2010-03-14 kartu - Initial version, refactored from Utils
//	2010-04-21 kartu - Reformatted
try {
	Core.string = {
		compareStrings: function(a, b) {
			return a.localeCompare(b);
		},
		
		startsWith: function(str, prefix) {
			return str.indexOf(prefix) === 0;
		},
		
		endsWith: function(str, postfix) {
			return str.lastIndexOf(postfix) === str.length - postfix.length;
		}
	};
} catch (e) {
	log.error("initializing core-string", e);
}	
