// Name: ViewerSettings_x50
// Description: Allows to 
//	choose if Overlap in 2page mode is masked, 
//	disables doubleTapAction and so dictionary
//	toggle border color grey/white
//	disable pageturen gesture
// Author: Mark Nord
//
// History:
//	2011-08-21 Mark Nord - Initial version
//	2011-08-23 Mark Nord - changed strategy to prevent dictionary (thanks quisvir)
//	2011-08-29 Mark Nord - fix: masking of overlap works now correct in landscape-mode
//	2011-08-30 Mark Nord - renamed to ViewerSetting_x50; default for mask-overlap set to mask overlap
//				keybindable action to switch gesture-pageturn on/off
//	2011-09-01 Mark Nord - Used appropriate icons - based in Ben Chenoweth suggestion
//	2011-09-02 quisvir - Added Custom View Settings (Brightness & Contrast) using (OnScreen) Restore Button
//	2011-09-02 quisvir - Added option to enable scrolling in Zoom Lock mode
//	2011-09-04 Mark Nord - added some appropriate icons (avoid "SEARCH" / #39 as this will breake the Options-Sub-Menu)

tmp = function() {

	switch (Core.config.model) {
	case "505":
	case "300":
	case "600":
		return;	
		break;
	default:       
	}

	// Localize	 	
	var L = Core.lang.getLocalizer("ViewerSettings_x50");

	// Constants
	
	// Enable scrolling in Zoom Lock mode
	if (Core.config.model != "350") {
	
	var zoomlockold;
	
	var oldZoomdoDrag = Fskin.kbookZoomOverlay.doDrag;
	Fskin.kbookZoomOverlay.doDrag = function (x, y, type, tapCount) {
	zoomlockold = this.isZoomLock;
	if (Core.addonByName.ViewerSettings_x50.options.ZoomLockScroll == "true" && zoomlockold) { this.isZoomLock = false; }
	oldZoomdoDrag.apply(this, arguments);
	this.isZoomLock = zoomlockold;
	}
	
	var oldZoomOverlaydone = Fskin.kbookZoomOverlay.done;
	Fskin.kbookZoomOverlay.done = function () {
		if (zoomlockold) { this.isZoomLock = true; }
		oldZoomOverlaydone.apply(this, arguments);
		this.isZoomlock = zoomlockold;
	};

	Fskin.kbookZoomOverlay.canLine = function () {
		if (this.getVariable('STATE') == 'PAGE' && this.isZoomLock && Core.addonByName.ViewerSettings_x50.options.ZoomLockScroll != "true") { return true; }
		else { return false; }
	};

	Fskin.kbookZoomOverlay.canLineAndHold = function () {
		if (this.getVariable('STATE') == 'PAGE' && this.isZoomLock && Core.addonByName.ViewerSettings_x50.options.ZoomLockScroll != "true") { return true; }
		else { return false; }
	};
	}
	
	// Bind custom contrast & brightness values to Restore button
	pageOptionToneCurveEditorOverlayModel.initToneCurveEditor = function () {
		var contrast, brightness;
		contrast = parseInt(this.targetModel.doSomething('getContrast'));
		brightness = parseInt(this.targetModel.doSomething('getBrightness'));
		if (Core.addonByName.ViewerSettings_x50.options.BindToRestoreButton == "true") {
		this.org_slider_1 = Core.addonByName.ViewerSettings_x50.options.CustomContrast;
		this.org_slider_2 = Core.addonByName.ViewerSettings_x50.options.CustomBrightness;
		}
		else {
		this.org_slider_1 = contrast;
		this.org_slider_2 = brightness;
		}
		this.ToneUpdate(contrast, brightness);
	};
	
	// overload kbook.kbookPage.doSelectWord called by kbook.kbookPage.readingTracker.doubleTap to disable Dictionary
	var oldDoSelectWord = kbook.kbookPage.doSelectWord;
	var doSelectWord = function (){
		if (Core.addonByName.ViewerSettings_x50.options.NoDictionary === "false") {
			return oldDoSelectWord.apply(this, arguments);
			
		}
	}

	// overload kbookPage.draw to peek into & patch
	var draw = function (event) {
		var data, window, x, y, width, height, cache, naturalBounds, range, ratioX, ratioY, rct, state, backup, bitmap, cutout, u, xMin, xSize, yMin, ySize, size, minOverlap, maxOverlap, yMinN, yMaxN, parts, j, half, mark1, mark2, span, bounds, c, minSpan, maxSpan, i, bound, bound_y, update;
		minOverlap =[];
		maxOverlap =[];
		this._isInvalidPage = false;
		if (this.markupHelper && this.markupHelper.isActive()) {
			this.markupHelper.draw(this, this.getWindow());
			return;
		}
		data = this.data;
		if (!data) {
			return;
		}
		window = this.getWindow();
		x = this.x;
		y = this.y;
		width = this.width;
		height = this.height;
		cache = this.getPageCache(this.getPage(), this.getPageOffset(), this.getPart());
		if (cache && (!this.facing && !this.isZooming)) {
			naturalBounds = cache.naturalBounds;
			if (this.portMatrixReviseRatio === undefined && naturalBounds) {
				ratioX = naturalBounds.width / this.sourcePageWidth;
				ratioY = naturalBounds.height / this.sourcePageHeight;
				this.portMatrixReviseRatio = Math.max(ratioX, ratioY);
				this.portMatrixReviseX = naturalBounds.x + naturalBounds.width - (this.sourcePageWidth * this.portMatrixReviseRatio) / 2;
				this.portMatrixReviseY = naturalBounds.y + naturalBounds.height - (this.sourcePageHeight * this.portMatrixReviseRatio) / 2;
			}
			if (this.marginRemove) {
				if (!this.marginRemoveDrawRect) {
					if (this.dynamicScrollHeight) {
						rct = new Rectangle(naturalBounds);
						rct.scaleToFit(0, 0, this._pageWidth, this._pageHeight);
					}
					else {
						rct = new Rectangle(0, 0, this._pageWidth, this._pageHeight);
					}
					rct.x = naturalBounds.x + (naturalBounds.width - rct.width) / 2;
					rct.y = naturalBounds.y + (naturalBounds.height - rct.height) / 2;
					this.marginRemoveDrawRect = rct;
				}
				naturalBounds = this.marginRemoveDrawRect;
				if (!this.isScrollView()) {
					this.xOffset = Math.floor(naturalBounds.x + naturalBounds.width / 2 - this._pageWidth / 2);
					this.yOffset = Math.floor(naturalBounds.y + naturalBounds.height / 2 - this._pageHeight / 2);
				}
			}
			if (this.isScrollView()) {
				this.checkNaturalInfo(naturalBounds);
				state = this.getHalfPageWrapped();
				this.sandbox.updateHalfPageIcon(state);
			}
			if (this.styleSplitPage) {
				this.sandbox.updateSplitPageIcon(this.getSplitPageWrapped());
				this.sandbox.showSplitHalfPageIcon(true, false);
			}
			else {
				this.sandbox.showSplitHalfPageIcon(false, true);
			}
			this.halfPage = this.getHalfPage();
		}
		backup = null;
		if (!this.monochrome.isRunning()) {
			backup = this.execToneCurveChange(cache.bitmap);
		}
		Fskin.bookScroller.draw.call(this, event);
		if (backup) {
			cache.bitmap.close();
			cache.bitmap = backup;
		}
		if (Core.addonByName.ViewerSettings_x50.options.NotMarkOverlapArea === "false") {
			bitmap = cache.bitmap;
			if (bitmap && !cache.error) {
				if (!this.isZooming && (this.isScrollView() && !this.monochrome.isRunning()) ) {
					try {
						cutout = this.skin.cutouts[26];
						xMin = this.getMin(false);	
						xSize = this.getSize(false);
						size = this.getSize(true);
						range = this.getRange(true);
						yMinN = this.yMinNatural;
						yMaxN = this.yMaxNatural;
						parts = this.partsNatural;
						if (parts == 2) {
							/* original code
							minOverlap[0] = yMaxN - size;
							maxOverlap[0] = yMinN + size; */
							// fixed Mark Nord
							maxOverlap[0] = yMaxN + yMinN - size; 
							minOverlap[0] = size; 
							}
						else {
							if (parts === 3) {
								if (this.yOffset === yMinN) {
									minOverlap[0] = Math.floor(yMaxN + yMinN - size / 2);
									maxOverlap[0] = size; //yMinN + size;
								}
								else {
									if (this.yOffset !== yMaxN - size) {
										minOverlap[0] = Math.floor(yMaxN + yMinN - size / 2);
										maxOverlap[0] = yMinN + size;
										minOverlap[1] = yMaxN - size;
										maxOverlap[1] = Math.floor(yMaxN + yMinN + size / 2);
									}
									else {
										minOverlap[0] = yMaxN - size;
										maxOverlap[0] = Math.floor(yMaxN + yMinN + size / 2);
									}
								}
							}
						}
						j = 0;
						while (j < minOverlap.length) {
							half = Math.floor((minOverlap[j] + maxOverlap[j]) / 2);
							mark1 = data.mark(this.getPage(), this.getPageOffset(), xMin, half);
							mark2 = data.mark(this.getPage(), this.getPageOffset(), (xMin + xSize) / 2, half);
							if (mark1 && mark2) {
								span = new Document.Viewer.Span(mark1, mark2);
								if (span) {
									bounds = span.getBounds();
									if (bounds) {
										c = bounds.length;
										if (c > 0) {
											minSpan = 32767;
											maxSpan = 0;
											i = 0;
											while (i < c) {
												bound = bounds[i];
												bound_y = bound.y + this.marginHeight;
												if (minSpan > bound_y) {
													minSpan = bound_y;
												}
												if (maxSpan < bound_y + bound.height) {
													maxSpan = bound_y + bound.height;
												}
												i++;
											}
											update = 0;
											if (minOverlap[j] <= minSpan && maxSpan <= maxOverlap[j]) {
												if (this.yOffset === yMinN || (this.yOffset !== yMaxN - size && j !== 0)) {
													if (update === 0 || minSpan < half) {
														update = 1;
														half = minSpan;
													}
												}
												else {
													if (update === 0 || half < maxSpan) {
														update = 1;
														half = maxSpan;
													}
												}
											}
										}
										if (this.yOffset === yMinN) {
											yMin = this.getMin(true) + half - yMinN;
											ySize = this.getMax(true) - yMin;
											u = 0;
										}
										else {
											if (this.yOffset !== yMaxN - size) {
												if (j === 0) {
													yMin = this.getMin(true);
													ySize = half - this.yOffset;
													u = 1;
												}
												else {
													yMin = this.getMin(true) + half - this.yOffset;
													ySize = this.getMax(true) - yMin;
													u = 0;
												}
											}
											else {
												yMin = this.getMin(true);
												ySize = half - this.yOffset;
												u = 1;
											}
										}
										cutout.fill(window, u, 0, xMin, yMin, xSize, ySize);
									}
									span.close();
								}
							}
							j++;
						}
						maxOverlap = new Array();
					}
					catch (e)
					{
						log.error("in MarkOverlap ", e);	
					}
				}
			}
		}
		this.drawError(window, x, y, cache);
		if (this.monochrome.isRunning()) {
			this.monochrome.setFrameInfo(this.getCurrentID(), this.mapPage(this.getPage()), this.getPageOffset(), this.getPart(), this.yOffset);
		}
	};

	var ViewerSettings_x50 = {
		name: "ViewerSettings_x50",
		settingsGroup: "viewer", // "advanced",
		optionDefs: [
			{
				name: "NotMarkOverlapArea",
				title: L("OPTION_NOTMARKOVERLAP"),
				icon: "LANDSCAPE",
				defaultValue: "false",
				values: ["true", "false"],
				valueTitles: {
					"true": L("VALUE_TRUE"),
					"false": L("VALUE_FALSE")
				}
			},	
			{
				name: "NoDictionary",
				title: L("OPTION_NODICT"),
				icon: "NODICTIONARY",
				defaultValue: "false",
				values: ["true", "false"],
				valueTitles: {
					"true": L("VALUE_TRUE"),
					"false": L("VALUE_FALSE")
				}
			},	
			{
				name: "BorderColor",
				title: L("OPTION_BORDERCOLOR"),
				icon: "COLOR",
				defaultValue: "grey",
				values: ["grey", "white"],
				valueTitles: {
					"grey": L("VALUE_GREY"),
					"white": L("VALUE_WHITE")
				}									
			},
			{
				name: "NoGesturePageTurn",
				title: L("OPTION_NOGESTURE"),
				icon: "GESTURE",
				defaultValue: "false",
				values: ["true", "false"],
				valueTitles: {
					"true": L("VALUE_TRUE"),
					"false": L("VALUE_FALSE")
				}	
			},
			{
				name: "ZoomLockScroll",
				title: L("ZOOMLOCK_SCROLL"),
				icon: "#41",
				defaultValue: "true",
				values: ["true", "false"],
				valueTitles: {
					"true": L("VALUE_TRUE"),
					"false": L("VALUE_FALSE")
				}
			},
			{
			groupTitle: L("CUSTOM_VIEW_SETTINGS"),
			groupIcon: "BRIGHT_CONT",
			optionDefs: [
				{
					name: "CustomContrast",
					title: L("CUSTOM_CONTRAST"),
					icon: "CONTRAST",
					defaultValue: 0,
					values: [127,120,110,100,90,80,70,60,50,45,40,35,30,25,20,15,10,5,0,-5,-10,-15,-20,-25,-30,-35,-40,-45,-50,-60,-70,-80,-90,-100,-110,-120,-127],
				},
				{
					name: "CustomBrightness",
					title: L("CUSTOM_BRIGHTNESS"),
					icon: "BRIGHTNESS",					
					defaultValue: 0,
					values: [225,200,175,150,125,100,90,80,70,60,50,40,30,20,10,0,-10,-20,-30,-40,-50,-60,-70,-80,-90,-100,-125,-150,-175,-200,-225],
				},
				{
					name: "BindToRestoreButton",
					title: L("BIND_TO_RESTORE_BUTTON"),
					icon: "BACK",
					defaultValue: "false",
					values: ["true","false"],
					valueTitles: {
						"true": L("VALUE_TRUE"),
						"false": L("VALUE_FALSE")
				}
				},
			],
			}
		],
		/**
		* @constructor
		*/
		onInit: function () {
			kbook.kbookPage.draw = draw;
			kbook.kbookPage.doSelectWord = doSelectWord;
			this.onSettingsChanged();
		},
		onSettingsChanged: function (propertyName, oldValue, newValue, object) {
			kbook.kbookPage.canLine = (ViewerSettings_x50.options.NoGesturePageTurn === "true") ? function () {return false;} : function () {return !this.preventLine;};
			if (ViewerSettings_x50.options.BorderColor === 'grey') 
				{kbook.kbookPage.borderColor=Color.rgb.parse('#6D6D6D')
			} else { kbook.kbookPage.borderColor=Color.rgb.parse('white')
			}
			switch (propertyName) {
			case "CustomContrast": case "CustomBrightness": case "BindToRestoreButton":
			if (Core.addonByName.ViewerSettings_x50.options.BindToRestoreButton != "true") { Core.ui.showMsg(L("CUSTOM_VIEW_MSG")); }
			}
		},
		actions: [{
			name: "toggleGestureOnOff",
			title: L("ACTION_toggleGestureOnOff"),
			group: "Utils",
			icon: "SETTINGS",
			action: function () {
				if (ViewerSettings_x50.options.NoGesturePageTurn === "true") {
					ViewerSettings_x50.options.NoGesturePageTurn = "false";
				}
				else {
					ViewerSettings_x50.options.NoGesturePageTurn = "true";
				}
			kbook.kbookPage.canLine = (ViewerSettings_x50.options.NoGesturePageTurn === "true") ? function () {return false;} : function () {return !this.preventLine;};
			}
		}] 	
	};

	Core.addAddon(ViewerSettings_x50);
};
try {
	tmp();
} catch (e) {
	// Core's log
	log.error("in ViewerSettings_x50.js", e);
}
