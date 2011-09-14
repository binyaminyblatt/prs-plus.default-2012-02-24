// Name: OneColumnSplit

tmp = function() {

	var L = Core.lang.getLocalizer("ViewerSettings_x50");
	
	// add 1-column split function to be called from selectStyleOverlay.xml
	kbook.model.container.sandbox.SELECT_STYLE_OVERLAY_GROUP.sandbox.VIEW.sandbox.SELECT_STYLE_OVERLAY.sandbox.doSplitPage2x1 = function () {
		if (kbook.model.container.getVariable("ORIENTATION")) {
			Core.ui.showMsg(L("ONLY_IN_PORTRAIT_MODE"));
			return;
		}
		kbook.model.doSomething('switchNormalPage');
		kbook.model.doSomething('switchSplitPage', 2);
		pageSelectStyleOverlayModel.closeCurrentOverlay();
	}
	
	// add calculations for 1-column split to resize function
	var oldresizePageSplitPage = kbook.kbookPage.resizePageSplitPage;
	kbook.kbookPage.resizePageSplitPage = function (splitNumber) {
		if (splitNumber == 2) {
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
				Core.ui.showMsg(L("ONLY_TALL_DOCUMENTS"));
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
		}
		else {
		oldresizePageSplitPage.apply(this, arguments);
		}
	};
	
	// activate 1-column-split radio button if style is active
	var oldopenSelectStyle = pageSelectStyleOverlayModel.openSelectStyle;
	pageSelectStyleOverlayModel.openSelectStyle = function () {
		oldopenSelectStyle.apply(this, arguments);
		if (kbook.model.doSomething('getSplitPageColumns') == 1) { this.setVariable('PAGE_STYLE_NO', 6); }
	};

	var OneColumnSplit = {
		name: "OneColumnSplit",
		/**
		* @constructor
		*/
		onPreInit: function () {
		},
		onInit: function () {
		},
		onSettingsChanged: function (propertyName, oldValue, newValue, object) {
		},
	};

	Core.addAddon(OneColumnSplit);
};
try {
	tmp();
} catch (e) {
	// Core's log
	log.error("in OneColumnSplit.js", e);
}
