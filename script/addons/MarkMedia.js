// Name: Media Tags
// Description: Allows to "mark" media nodes with one of the predefined marks (plus, minus, cross etc)
// Author: kartu
//
tmp = function() {
	var L = Core.lang.getLocalizer("MediaTag");
	var log = Core.log.getLogger("MediaTag");
	var model = kbook.model;
	var root = model.container.root;
	var MENU = kbook.model.container.sandbox.MENU_GROUP.sandbox.MENU;
	var NUM_ICONS = 5;
	var MARK_PROPERTY = "mark1";
	// Menu's draw method
	var oldDraw = Fskin.kbookMenu.draw; 
	
	var MediaTag;
	/**
	* Draw method, called after kbook menu has finished drawing. Draws icons over media nodes.
	*/	
	var draw = function (event) {
		var x, y, i, n, j, m, idx, win, markIcon, w, h, gap, marks, record, offset, tabCount, recordCount;
		
		oldDraw.apply(this, arguments);
		try {
			// Vertical layout, don't draw anything
			if (this.width > this.height) {
				return;
			}
			
			recordCount = this.countRecords();
			offset = this.offset;
			tabCount = this.tabCount;
			
			win = this.getWindow();
			markIcon = root.cutouts.markIcon;
			w = markIcon.width;
			h = markIcon.height;
			gap = 5;
	
			for (i = offset, n = Math.min(offset + tabCount, recordCount); i < n; i++) {
				record = this.getRecord(i);
				if (record && record.media && record.media.mark1 !== undefined) {
					idx = i - offset;
					
					y = 70 + 70 * idx;
					marks = record.media.mark1.split(" ");
					switch (MediaTag.options.position) {
						case "bottom":
							x = 70;
							for (j = 0, m = marks.length; j < m; j++) {
								markIcon.draw(win, marks[j], 0, x + w * j, y + 70 - h - gap, w, h);
							}
							break;
						case "right":
							x = 600 - 70;
							for (j = marks.length - 1; j >= 0; j--) {
								markIcon.draw(win, marks[j], 0, x - w * (marks.length - j), y + gap, w, h);
							}
							break;
						case "overIcon":
							x = 70 - w;
							for (j = 0, m = marks.length; j < m; j++) {
								markIcon.draw(win, marks[j], 0, x, y + (h - 2) * j + gap, w, h);
							}
							break;
					}
				}
			}
		} catch (e) {
			log.error("draw", e);
		}
	};
	
	// Addon's init function
	var init = function() {
		// Bind to kbookMenu's draw
		Fskin.kbookMenu.draw = draw;
	};	
	
	MediaTag = {
		name: "MediaTag",
		title: L("TITLE"),
		icon: "BACK",
		onInit: init,
		settingsGroup: "menu",
		optionDefs: [{
			name: "position",
			title: "OPTION_POSITION",
			defaultValue: "bottom",
			icon: "LIST",
			values: ["overIcon", "bottom", "right"],
			valueTitles: {
				overIcon: L("VALUE_OVER_ICON"),
				bottom: L("VALUE_BOTTOM"),
				right: L("VALUE_RIGHT")
			}
		}]
	};
	
	var toggleTag = function(media, tagId) {
		var marks, markProp;
		try {
			markProp = media[MARK_PROPERTY];
			if (markProp !== undefined) {
				marks = markProp.split(" ");
				var found = false;
				for (var i = marks.length - 1; i >= 0; i--) {
					marks[i] = Number(marks[i]);
					if (marks[i] === tagId) {
						marks.splice(i, 1);
						found = true;
					}
				}
				if (!found) {
					marks.push(tagId);
				}
				if (marks.length > 0) {
					marks.sort();
					media[MARK_PROPERTY] = marks.join(" ");
				} else {
					delete media[MARK_PROPERTY];
				}
			} else {
				media[MARK_PROPERTY] = "" + tagId;
			}
		} catch (e) {
			Core.ui.doBlink();
		}
	};

	var actionFunction = function() {
		if (model.current && model.current && model.current.nodes && model.current.nodes[MENU.selection]) {
			if (model.current.nodes[MENU.selection].media) {
				var media = model.current.nodes[MENU.selection].media;
				var markId = this.tag;
				toggleTag(media, markId);
				// redraw selected item
				MENU.invalidateSelection();
			}
		} else {
			Core.ui.doBlink();
		}
	};

	// Add actions
	MediaTag.actions = [];
	for (var i = 0; i < NUM_ICONS; i++) {
		MediaTag.actions.push({
			name: "mark" + i,
			tag: i,
			title: L("MARK_" + i),
			icon: "BACK",
			action: actionFunction
		});
	}
	
	Core.addAddon(MediaTag);
};

try {
	tmp();
} catch (e) {
	// Core's log
	log.error("in MediaTag.js", e);
}
