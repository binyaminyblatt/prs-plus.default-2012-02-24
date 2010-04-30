// Name: UI
// Description: User interface related methods and constants
// Author: kartu
//
// Externals:
//	kbook.root
//	kbook.root.children.settings
//	kbook.root.nodes
//	kbook.root.nodes[9].nodes
//	kbook.tableData
//	function kbook.tableData.getValue
//	function kbook.tableData.getKind
//
// History:
//	2010-03-14 kartu - Initial version, refactored from Utils
//	2010-04-05 kartu - Removed stale code, added logging to getValue
//	2010-04-10 kartu - Improved error reporting
//	2010-04-17 kartu - Removed global var
//	2010-04-25 kartu - Marked setLevel Core.ui.ContainerNode as constructor
//	2010-04-27 kravitz - Added showMsg()
//	2010-04-27 kravitz - Fixed getValue() and getKind()

try {
	Core.ui = {
		// Node icons
		NodeKinds: {
			BOOK: 2,
			FILE: 2,
			AUDIO: 3,
			PICTURE: 4,
			SETTINGS: 5,
			AUTHOR: 6,
			CONTINUE: 7,
			PREVIOUS_PAGE: 8,
			NEXT_PAGE: 9,
			BOOKMARK: 10,
			LIST: 11,
			CLOCK: 12,
			PAUSE: 13,
			PLAY: 14,
			INFO: 15,
			LOCK: 16,
			BOOKS: 17,
			PICTURES: 18,
			CROSSED_BOX: 19,
			DATE: 22,
			ABOUT: 25,
			BACK: 26,
			ABC: 27,
			DATETIME: 28,
			DB: 29,
			SHUTDOWN: 31,
			FOLDER: 37,
			MS: 34,
			SD: 35,
			INTERNAL_MEM: 36,
			GAME: 38,
			TEXT_SCALE: 2, //FIXME add icon
//ReadMark			READ_BOOK: 29, //FIXME add icon
			DEFAULT: 37,
			getIcon: function (strKind) {
				var kind = this[strKind];
				if (typeof kind === "undefined") {
					kind = Core.ui.NodeKinds.DEFAULT;
				}
				return kind;
			}
		},

		// Small icons on the right side of books
		NodeSourceKinds: {
			NONE: 0,
			MS: 2, // memory stick
			SD: 3 // SD card
		},

		// Book MIME types
		BookMIMEs: {
			"application/x-sony-bbeb": "BBeB Book",
			"text/plain": "Plain Text",
			"application/rtf": "Rich Text Format",
			"application/pdf": "Adobe PDF",
			"application/epub+zip": "EPUB Document"
		},

		// Reference to nodes
		nodes: {
			root: kbook.root,
			"continue": kbook.root.nodes[0],
			booksByTitle: kbook.root.nodes[1],
			booksByAuthor: kbook.root.nodes[2],
			booksByDate: kbook.root.nodes[3],
			collections: kbook.root.nodes[4],
			bookmarks: kbook.root.nodes[5],
			nowPlaying: kbook.root.nodes[6],
			music: kbook.root.nodes[7],
			pictures: kbook.root.nodes[8],
			settings: kbook.root.nodes[9],
			advancedSettings: kbook.root.nodes[9].nodes[4]
		},

		// Creates "container" node, that displayes nodes in this.nodes[] array
		// Arguments:
		//	arg, can have the following fields:
		//		parent - parent node
		//		title - title of this node (shown on top of the screen, when inside the node)
		//		name - name of this node (shown in lists, if none supplied, title is used instead)
		//		comment - comment text (shown on the right bottom in list mode)
		//		kind - one of the NodeKinds, determines which icon to show
		//		sourceKind - one of the NodeSourceKinds, determines which small icon will be shown
		//					on the right side of the list (eg small "sd" letters)
		//		separator - if equals to 1, node's bottom line will be shown in bold
		createContainerNode: function (arg) {
			var obj = Core.system.cloneObj(kbook.root.children.settings);
			Core.ui.ContainerNode.call(obj, undefined);
			if (typeof arg !== "undefined") {
				if (arg.hasOwnProperty("parent")) {obj.parent = arg.parent;}
				if (arg.hasOwnProperty("title")) {obj.title = arg.title;}
				if (arg.hasOwnProperty("name")) {
					obj.name = arg.name;
				} else {
					obj.name = arg.title;
				}
				if (arg.hasOwnProperty("comment") && (typeof arg.comment !== "undefined")) {
					obj._mycomment = arg.comment;
				} else {
					obj._mycomment = "";
				}
				if (arg.hasOwnProperty("kind")) {obj.kind = arg.kind;}
				if (arg.hasOwnProperty("sourceKind")) {obj._mysourceKind = arg.sourceKind;}
				if (arg.hasOwnProperty("separator")) {obj._myseparator = arg.separator;}
			}
			obj.nodes = [];

			return obj;
		},
	};


	// Shows "msgs" for a second
	// Arguments:
	//	msgs - array of strings
	Core.ui.showMsg = function (msgs) {
		var cnt = msgs.length;
		if (cnt == 0) {
			return;
		}
		var win = kbook.model.container.getWindow();
		// Settings
		var gap = 20;
		var spc = 10;
		win.setTextStyle("bold");
		win.setTextSize(22);
		// Calc
		var ms_w = [];
		var ms_h = [];
		for (var i = 0; i < cnt; i++) {
			var b = win.getTextBounds(msgs[i]);
			ms_w.push(b.width);
			ms_h.push(b.height);
		}
		var w = Math.max.apply( Math, ms_w ) + gap * 2;
		var h = ms_h[0] * cnt + spc * (cnt - 1) + gap * 2;
		var b = win.getBounds();
		var x = Math.max(0, (b.width - w) / 2);
		var y = Math.max(0, (b.height - h) / 2);
		// Drawing
		win.beginDrawing();
		win.setPenColor(Color.white);
		win.fillRectangle(x, y, w, h);
		win.setPenColor(Color.black);
		win.frameRectangle(x, y, w, h);
		win.frameRectangle(x + 1, y + 1, w - 2, h - 2);
		var x1 = x + gap;
		var y1 = y + gap;
		for (var i = 0; i < cnt; i++) {
			win.drawText(msgs[i], x1, y1, ms_w[i], ms_h[i]);
			y1 += ms_h[i] + spc;
		}
		win.endDrawing();
		// Pause
		if (typeof this.showMsgTimer == "undefined") {
			this.showMsgTimer = new Timer();
			this.showMsgTimer.target = this;
		}
		this.showMsgTimer.onCallback = function (d) {
			win.invalidate(x, y, w, h);
		};
		this.showMsgTimer.schedule(1000);
	};


	// Container node, displays subnodes, takes care of paging etc
	/**
	 * @constructor
	 */
	Core.ui.ContainerNode = function (arg) {
		var oldEnter = this.enter;
		var oldExit = this.exit;

		this.enter = function () {
			try {
				// Call construct
				if (typeof (this._myconstruct) == "function") {
					var endHere = this._myconstruct.apply(this, arguments);
					if (endHere === true) {
						return;
					}
				}

				// Restore item selection
				if (this.hasOwnProperty("selectionIndex") && this.hasOwnProperty("nodes")) {
					var nodeToSelect = this.nodes[this.selectionIndex];
					if (nodeToSelect) {
						nodeToSelect.selected = true;
					}
				}
			} catch (e) {
				log.error("ContainerNode.enter(): " + e);
			}
			oldEnter.apply(this, arguments);
		};

		this.exit = function () {
			try {
				// Save parent's selection
				var nodes = this.nodes;
				this.selectionIndex = undefined;
				if (nodes) {
					for (var i = 0, n = nodes.length; i < n; i++) {
						if (nodes[i].selected) {
							this.selectionIndex = i;
							break;
						}
					}
				}

				if (this.hasOwnProperty("_myconstruct")) {
					delete this.nodes;
					this.nodes = [];
				}
			} catch (ignore) {
			}
			oldExit.apply(this, arguments);
		};
	};
	Core.ui.ContainerNode.prototype = Core.system.cloneObj(kbook.root.children.settings); // settings node

	// Little hack to allow easy changing of node title, comment, kind etc
	kbook.tableData.oldGetValue = kbook.tableData.getValue;
	kbook.tableData.getValue = function (node, field) {
		try {
			var myVal = node["_my" + field];
			if (typeof myVal != "undefined") {
				if (typeof myVal == "function") {
					return myVal.call(node);
				}
				return myVal;
			}
		} catch (e) {
			log.error("in _my getValue: field '" + field + "' node '" + node.name + "': " + e);
		}
		try {
			return this.oldGetValue.apply(this, arguments);
		} catch (e2) {
			log.error("in getValue: " + e2);
			return "error: " + e2;
		}
	};

	kbook.tableData.oldGetKind = kbook.tableData.getKind;
	kbook.tableData.getKind = function () {
		try {
			var myVal = this.node._mykind;
			if (typeof myVal != "undefined") {
				if (typeof myVal == "function") {
					return myVal.call(this.node);
				}
				return myVal;
			}
		} catch (e) {
			log.error("in _my getKind: " + e);
		}
		try {
			return this.oldGetKind.apply(this, arguments);
		} catch (e2) {
			log.error("in getKind: " + e2);
			return "error: " + e2;
		}
	};
} catch (e) {
	log.error("initializing core-ui", e);
}