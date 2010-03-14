// Name: Shell
// Description: Linux shell related methods
// Author: kartu
//
// History:
//	2010-03-14 kartu - Initial version, refactored from Utils

Core.shell = {};

// CONSTANTS
var CORE_SHELL_MOUNT_PATH = "/opt/mnt";
var CORE_SHELL_MS_MOUNT_PATH = CORE_SHELL_MOUNT_PATH + "/ms";
var CORE_SHELL_SD_MOUNT_PATH = CORE_SHELL_MOUNT_PATH + "/sd";
var CORE_SHELL_CMD_MOUNT_SD = "mount -t vfat -o utf8 -o shortname=mixed /dev/sdmscard/r5c807a1 " + CORE_SHELL_SD_MOUNT_PATH;
var CORE_SHELL_CMD_MOUNT_MS = "mount -t vfat -o utf8 -o shortname=mixed /dev/sdmscard/r5c807b1 " + CORE_SHELL_MS_MOUNT_PATH;
var CORE_SHELL_CMD_UMOUNT_SD = "umount " + CORE_SHELL_SD_MOUNT_PATH;
var CORE_SHELL_CMD_UMOUNT_MS = "umount " + CORE_SHELL_MS_MOUNT_PATH;
var CORE_SHELL_SCRIPT_HEADER = "#!/bin/sh\n"+
	"PATH=\"/usr/local/bin:/usr/bin:/sbin:/bin:/usr/bin/X11:/usr/games:/usr/local/sony/bin:/usr/sbin\"\n" +
	"LD_LIBRARY_PATH=\"/opt/sony/ebook/application:/lib:/usr/lib:/usr/local/sony/lib:/opt/sony/ebook/lib\"\n" +
	"export PATH LD_LIBRARY_PATH\n";
var CORE_SHELL_VM_FILE = "/opt/sony/ebook/application/prspVM.xml";	
var CORE_SHELL_RESULT_FILE = "/tmp/__result__";

Core.shell.SD = 0;
Core.shell.MS = 1;
Core.shell.MOUNT_PATH = CORE_SHELL_MOUNT_PATH;
Core.shell.MS_MOUNT_PATH = CORE_SHELL_MS_MOUNT_PATH;
Core.shell.SD_MOUNT_PATH = CORE_SHELL_SD_MOUNT_PATH;


// Executes shell command
// Arguments:
//	cmd - linux command to execute
// Throws exception, if command results with result other than zero
Core.shell.exec = function (cmd) {
	try {
		FileSystem.deleteFile(CORE_SHELL_RESULT_FILE);
	} catch (ignore) {
	}

	// Create script file
	Core.io.setFileContent("/tmp/script.sh", CORE_SHELL_SCRIPT_HEADER + cmd + "\necho -n $?>" + CORE_SHELL_RESULT_FILE);

	// Call script
	var myvm = FskInclude.load(CORE_SHELL_VM_FILE);
	try {
		myvm.load();
	} catch(e) {
		throw "vm load error: " + e;
	}

	var result = Core.io.getFileContent(CORE_SHELL_RESULT_FILE, "222");
	if(result !== "0") {
		throw "Failed to execute " + cmd + "\n" + result;
	}
};

// Mounts SD or MS card
// Arguments:
//	card - "MS" or "SD"
Core.shell.mount = function (card) {
	if (card === this.MS) {
		this.exec(CORE_SHELL_CMD_MOUNT_MS);
	} else if (card === this.SD) {
		this.exec(CORE_SHELL_CMD_MOUNT_SD);
	}
};

// Mounts SD or MS card
// Arguments:
//	card - "MS" or "SD"
Core.shell.umount = function (card) {
	if (card === this.MS) {
		this.exec(CORE_SHELL_CMD_UMOUNT_MS);
	} else if (card === this.SD) {
		this.exec(CORE_SHELL_CMD_UMOUNT_SD);
	}
};
