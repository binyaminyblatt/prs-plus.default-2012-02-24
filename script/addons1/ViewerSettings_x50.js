// Name: ViewerSettings_x50
// Description: Allows to 
//	choose if Overlap in 2page mode is masked, 
//	disables doubleTapAction and so dictionary
//	toggle border color grey/white
//	disable pageturn gesture
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
//	2011-09-04 Mark Nord - added some appropriate icons (avoid "SEARCH" / #39 as this will break the Options-Sub-Menu)
//	2011-09-08 quisvir - Renamed scrolling (in zoom lock) to panning
//	2011-09-13 quisvir - Added input dialog for custom contrast & brightness values
//	2011-09-29 quisvir - Added Page Turn by Single Tap
//	2011-10-01 quisvir - Close reading popup menu (dict etc) and cancel selection by tapping page
//	2011-10-05 quisvir - Added 1-Column split for 350 & 650
//	2011-10-09 Mark Nord - fixed #182 MaskOverlap for PRS-950
//	2011-10-13 quisvir - Fixed #196 "No Page Turn with Gestures" doesn't disable Multi-Page Turn
//  2011-10-13 Ben Chenoweth - assigned more icons
//	2011-10-24 quisvir - Fixed #203 "Book rotation scribbled notes origin incorrect"
//	2011-11-26 quisvir - Fixed Issue #228 "No Page Turn with Gestures" doesn't disable page turns through pageShortcutOverlayModel
//	2011-11-28 quisvir - Moved touch-related code to Touch Settings addon
//	2011-12-07 quisvir - Cosmetic changes
//	2011-12-14 quisvir - Added action to toggle True Landscape mode in book

tmp = function() {

	// Localize	 	
	var L = Core.lang.getLocalizer("ViewerSettings_x50");
	var log = Core.log.getLogger('ViewerSettings_x50');

	// Functions and vars for toggleTrueLandscape action
	var orgOrientation, docWidth, docHeight, oldIsScrollView, falseFunc, toggleTrueLandscape, restoreLandscape, oldOnEnterOrientation1, oldOnEnterOrientation2;
	oldIsScrollView = kbook.kbookPage.isScrollView;
	falseFunc = function () { return false };
	docWidth = Number(System.applyEnvironment('[kFskDocumentViewerWidth]'));
	docHeight = Number(System.applyEnvironment('[kFskDocumentViewerHeight]'));
	orgOrientation = null;
	
	toggleTrueLandscape = function () {
		var book, orient;
		if (kbook.model.STATE !== 'PAGE') return;
		book = kbook.bookData.book;
		book.clearSplitParts();
		if (orgOrientation === null) {
			orgOrientation = ebook.getOrientation();
			kbook.kbookPage.isScrollView = falseFunc;
			if (orgOrientation === 0 || orgOrientation === 2) {
				orient = (kbook.model.orientationToRotateFlag) ? 3 : 1;
				ebook.rotate(orient);
			}
			book.mediaRebrowse(docHeight + 30, docWidth - 30, false, false);
		} else {
			if (orgOrientation !== null) ebook.rotate(orgOrientation);
			restoreLandscape(true);
		}
	}
	
	restoreLandscape = function (current) {
		if (orgOrientation !== null) {
			kbook.kbookPage.isScrollView = oldIsScrollView;
			if (current === true && kbook.model.currentBook) kbook.bookData.book.mediaRebrowse(docWidth, docHeight, false, false);
			orgOrientation = null;
		}
	}
	
	oldOnEnterOrientation1 = kbook.model.onEnterOrientation;
	kbook.model.onEnterOrientation = function (node) {
		restoreLandscape(true);
		oldOnEnterOrientation1.apply(this, arguments);
	}
	
	oldOnEnterOrientation2 = kbook.kbookPage.onEnterOrientation;
	kbook.kbookPage.onEnterOrientation = function () {
		restoreLandscape(true);
		oldOnEnterOrientation2.apply(this, arguments);
	}
	
	// Change custom contrast variable if user has entered valid number
	kbook.model.container.doContrastChange = function (text) {
		var msg, value = parseInt(text);
		if (isNaN(value)) {
			msg = L("ERROR_NOT_A_NUMBER");
		} else if (value < -127 || value > 127) {
			msg = L("ERROR_NOT_WITHIN_RANGE") + ' [-127 / 127]';
		} else {
			ViewerSettings_x50.options.CustomContrast = value.toString(); // without toString(), option comment displays an error for negative values
		}
		if (msg) {
			ViewerSettings_x50.options.CustomContrast = 0;
		} else {
			msg = L("CUSTOM_VIEW_MSG");
		}
		Core.ui.showMsg(msg);
		Core.settings.saveOptions(ViewerSettings_x50);
	}
	
	// Change custom brightness variable if user has entered valid number
	kbook.model.container.doBrightnessChange = function (text) {
		var msg, value = parseInt(text);
		if (isNaN(value)) {
			msg = L("ERROR_NOT_A_NUMBER");
		} else if (value < -225 || value > 225) {
			msg = L("ERROR_NOT_WITHIN_RANGE") + ' [-225 / 225]';
		} else {
			ViewerSettings_x50.options.CustomBrightness = value.toString();
		}
		if (msg) {
			ViewerSettings_x50.options.CustomBrightness = 0;
		} else {
			msg = L("CUSTOM_VIEW_MSG");
		}
		Core.ui.showMsg(msg);
		Core.settings.saveOptions(ViewerSettings_x50);
	}

	// Bind custom contrast & brightness values to Restore button
	pageOptionToneCurveEditorOverlayModel.initToneCurveEditor = function () {
		var contrast = parseInt(this.targetModel.doSomething('getContrast'));
		var brightness = parseInt(this.targetModel.doSomething('getBrightness'));
		if (ViewerSettings_x50.options.BindToRestoreButton === "true") {
			this.org_slider_1 = ViewerSettings_x50.options.CustomContrast;
			this.org_slider_2 = ViewerSettings_x50.options.CustomBrightness;
		} else {
			this.org_slider_1 = contrast;
			this.org_slider_2 = brightness;
		}
		this.ToneUpdate(contrast, brightness);
	};
	
	/*/ overload to enable landscape-mode split in 3 - for debuging with PRS-650  
	var oldKbookPageCheckNaturalInfo = kbook.kbookPage.checkNaturalInfo;
	kbook.kbookPage.checkNaturalInfo = function (naturalBounds) {
		oldKbookPageCheckNaturalInfo.apply(this, arguments);
		if (this.partsNatural === 2) this.partsNatural = 3;
	} // end debug code*/

	// overload kbookPage.draw to peek into & patch
	kbook.kbookPage.draw = function (event) {
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
				this.portMatrixReviseX = naturalBounds.x + (naturalBounds.width - (this.sourcePageWidth * this.portMatrixReviseRatio)) / 2;
				this.portMatrixReviseY = naturalBounds.y + (naturalBounds.height - (this.sourcePageHeight * this.portMatrixReviseRatio)) / 2;
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
		if (ViewerSettings_x50.options.NotMarkOverlapArea === "false") {
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
							/* original (defsk-ed) code
							minOverlap[0] = yMaxN - size;
							maxOverlap[0] = yMinN + size; */
							// fixed Mark Nord
							maxOverlap[0] = yMaxN + yMinN - size; 
							minOverlap[0] = size; 
							}
						else {
							if (parts === 3) {
								if (this.yOffset === yMinN) {
									/* original (defsk-ed) code
									minOverlap[0] = <global>.Math.floor(yMaxN + yMinN - size / 2);
									maxOverlap[0] = yMinN + size;
									in genaral swap min/max */
									maxOverlap[0] = Math.floor((yMaxN + yMinN - size) / 2);
									minOverlap[0] = yMinN + size;
								}
								else {
									if (this.yOffset !== yMaxN - size) {
										maxOverlap[0] = Math.floor((yMaxN + yMinN - size) / 2);
										minOverlap[0] = yMinN + size;
										maxOverlap[1] = yMaxN - size;
										minOverlap[1] = Math.floor((yMaxN + yMinN + size) / 2);
									}
									else {
										maxOverlap[0] = yMaxN - size;
										minOverlap[0] = Math.floor((yMaxN + yMinN + size) / 2);
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
	
	// 1-Column split
	if (Core.config.model !== '950') {
		// add 1-column split function to be called from selectStyleOverlay.xml
		kbook.model.container.sandbox.SELECT_STYLE_OVERLAY_GROUP.sandbox.VIEW.sandbox.SELECT_STYLE_OVERLAY.sandbox.doSplitPage2x1 = function () {
			if (kbook.model.container.getVariable('ORIENTATION')) {
				Core.ui.showMsg(L('ONLY_IN_PORTRAIT_ORIENTATION'));
				return;
			}
			kbook.model.doSomething('switchNormalPage');
			kbook.model.doSomething('switchSplitPage', 2);
			pageSelectStyleOverlayModel.closeCurrentOverlay();
		}
		
		// add calculations for 1-column split to resize function
		var oldresizePageSplitPage = kbook.kbookPage.resizePageSplitPage;
		kbook.kbookPage.resizePageSplitPage = function (splitNumber) {
			if (splitNumber === 2) {
				var screenWidth, screenHeight, pageWidth, pageHeight, xOffset, yOffset, bounds;
				screenWidth = this.getSize(false) - 2 * this.marginWidth;
				screenHeight = this.getSize(true) - 2 * this.marginHeight;
				pageWidth = this._pageWidth;
				pageHeight = this._pageHeight;
				xOffset = 0;
				yOffset = 0;
				bounds = this.getPageCache(this.getPage(), this.getPageOffset(), this.getPart()).naturalBounds;
				if (bounds) {
					pageWidth = Math.floor(bounds.width / this.ratio);
					xOffset = Math.floor(bounds.x / this.ratio);
					pageHeight = Math.floor(bounds.height / this.ratio);
					yOffset = Math.floor(bounds.y / this.ratio);
				}
				if (screenWidth <= pageWidth) {
					Core.ui.showMsg(L('ONLY_TALL_DOCUMENTS'));
					this.switchNormalPage();
					return;
				}
				this.ratio = screenWidth / pageWidth;
				this.overlapX = 0;
				this.overlapY = pageHeight * ((screenWidth/pageWidth) - 1);
				this.splitX = [xOffset * this.ratio, xOffset * this.ratio];
				this.splitY = [0,pageHeight - this.overlapY];
				this.splitWidth = screenWidth;
				this.splitHeight = screenHeight;
				this.splitNumber = 2;
				this.numberOfLines = 2;
				this.numberOfColumns = 1;
				this.resizePage();
				this.moveOffset(this.splitX[this.currentSplit], this.splitY[this.currentSplit]);
			} else {
				oldresizePageSplitPage.apply(this, arguments);
			}
		};
		
		// activate 1-column-split radio button if style is active
		var oldopenSelectStyle = pageSelectStyleOverlayModel.openSelectStyle;
		pageSelectStyleOverlayModel.openSelectStyle = function () {
			oldopenSelectStyle.apply(this, arguments);
			if (kbook.model.doSomething('getSplitPageColumns') === 1) this.setVariable('PAGE_STYLE_NO', 6);
		};
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
			groupTitle: L("CUSTOM_VIEW_SETTINGS"),
			groupIcon: "CONTRAST",
			optionDefs: [
				{
					name: "CustomContrast",
					title: L("CUSTOM_CONTRAST"),
					icon: "CONTRAST",
					defaultValue: 0,
					values: [0,"Custom"],
					valueTitles: { "Custom": L("VALUE_CUSTOM") }
				},
				{
					name: "CustomBrightness",
					title: L("CUSTOM_BRIGHTNESS"),
					icon: "BRIGHTNESS",					
					defaultValue: 0,
					values: [0,"Custom"],
					valueTitles: { "Custom": L("VALUE_CUSTOM") }
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
				}
			]}
		],
		onInit: function () {
			Core.events.subscribe(Core.events.EVENTS.BOOK_CHANGED, restoreLandscape, true);
			if (ViewerSettings_x50.options.BorderColor === 'white') kbook.kbookPage.borderColor = Color.rgb.parse('white');
		},
		onSettingsChanged: function (propertyName, oldValue, newValue, object) {
			kbook.kbookPage.borderColor = (ViewerSettings_x50.options.BorderColor === 'grey') ? Color.rgb.parse('#6D6D6D') : Color.rgb.parse('white');
			if (propertyName === "CustomContrast" && newValue === "Custom") kbook.model.openLineInput(L("CUSTOM_CONTRAST") + ':', '', 'doContrastChange', '', true, 'number');
			if (propertyName === "CustomBrightness" && newValue === "Custom") kbook.model.openLineInput(L("CUSTOM_BRIGHTNESS") + ':', '', 'doBrightnessChange', '', true, 'number');
		},
		actions: [{
			name: "toggleTrueLandscape",
			title: L("TOGGLE_TRUE_LANDSCAPE"),
			group: "Book",
			icon: "LANDSCAPE",
			action: function () {
				toggleTrueLandscape();
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
