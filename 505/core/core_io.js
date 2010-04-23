// Name: IO
// Description: File IO related methods
// Author: kartu
//
// History:
//	2010-03-14 kartu - Initial version, refactored from Utils
//	2010-04-21 kartu - Reformatted

try {
	Core.io = {
		// Returns content of the file <path> as a string.
		// If any kind of error happens (file doesn't exist, or is not readable etc) returns <defVal>
		//
		getFileContent: function (path, defVal) {
			var stream;
			try {
				stream = new Stream.File(path);
				return stream.toString();
			} catch (whatever) {
			} finally {
				try {
					stream.close();
				} catch (ignore) {
				}
			}
			return defVal;
		},
		
		// Sets content of the file <path> to <content>. If file exists it will be overwritten.
		//
		setFileContent: function (path, content) {
			var stream;
			try {
				if (FileSystem.getFileInfo(path)) {
					FileSystem.deleteFile(path);
				}
				stream = new Stream.File(path, 1);
				stream.writeString(content);
				stream.flush();
			} catch (e) {
				throw "in setFileContent: " + e;
			} finally {
				try {
					stream.close();
				} catch (ignore) {
				}
			}
		},
		
		// Copies file from <from> to <to>, deleting the target file first
		//
		// Arguments:
		//	from - source file
		//	to - target file
		//
		// Throws exceptions on errors. 
		copyFile: function (from, to) {
			if (FileSystem.getFileInfo(to)) {
				FileSystem.deleteFile(to);
			}
			//FileSystem.copyFile(from, to);
			// Copy/paste from FileSystem.copyFile, slightly modified (removed progress)
			var s, d, c, len, totalLen, copied;
			try {
				s = new Stream.File(from, 2);
				d = new Stream.File(to, 3);
				len = 128 * 1024;
				copied = 0;
				totalLen = s.bytesAvailable;
				c = new Chunk(len);
				while (s.readChunk(len, c)) {
					copied += c.length;
					d.writeChunk(c);
				}
				if (copied !== totalLen) {
					throw "Error copying " + from + " to " + to;
				}
			} finally {
				if (c) {
					c.free();
				}
				if (s) {
					s.close();
				}
				if (d) {
					d.close();
				}
			}
		}
	};
} catch (e) {
	log.error("initializing core-io", e);
}