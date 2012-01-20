// Name: ViewerSettings
//
// History:
//	2012-01-19 quisvir - Initial version, reset autoPage timer on page change
//	2012-01-20 Mark Nord - kbook.model.processing() kbook.model.processed();
//		but this prevents SubCPUThread from sleeping, might lead to high battery consumption

tmp = function() {

	// Localize
	var L, LX, log;
	L = Core.lang.getLocalizer("ViewerSettings_x50");
	LX = Core.lang.LX;
	log = Core.log.getLogger('ViewerSettings');

	var autoPageTimer, autoPageToggle, autoPageCallBack, autoPageRestart;

	autoPageToggle = function () {
		if (!autoPageTimer) {
			Core.ui.showMsg(L("AUTO_PAGE_TURNER") + ": " + L("VALUE_TRUE"), 2);
			kbook.model.processing(100);
			autoPageTimer = new Timer();
			autoPageTimer.onCallback = autoPageCallback;
			autoPageTimer.target = null;
			autoPageTimer.delay = parseInt(ViewerSettings.options.AutoPageTurnerTime) * 1000;
			autoPageTimer.schedule(autoPageTimer.delay);
		} else {
			autoPageTimer.cancel();
			autoPageTimer.close();
			autoPageTimer = null;
			kbook.model.processed(100);
			Core.ui.showMsg(L("AUTO_PAGE_TURNER") + ": " + L("VALUE_FALSE"), 2);
		}
	}
	
	autoPageCallback = function () {
		if (kbook.model.STATE === 'PAGE') {
			kbook.model.container.sandbox.PAGE_GROUP.sandbox.PAGE.doNext();
		} else {
			autoPageToggle();
		}
	}

	autoPageRestart = function () {
		if (autoPageTimer) {
			autoPageTimer.cancel();
			autoPageTimer.schedule(autoPageTimer.delay);
		}
	}

	var ViewerSettings = {
		name: "ViewerSettings",
		settingsGroup: "viewer",
		optionDefs: [
		{
			name: "AutoPageTurnerTime",
			title: L("AUTO_PAGE_TURNER"),
			icon: "CLOCK",
			defaultValue: "60",
			values: ["10", "20", "30", "40", "50", "60", "75", "90", "105", "120", "150", "180", "210", "240", "270", "300"],
			valueTitles: {
				"10": LX("SECONDS", 10),
				"20": LX("SECONDS", 20),
				"30": LX("SECONDS", 30),
				"40": LX("SECONDS", 40),
				"50": LX("SECONDS", 50),
				"60": LX("SECONDS", 60),
				"75": LX("SECONDS", 75),
				"90": LX("SECONDS", 90),
				"105": LX("SECONDS", 105),
				"120": LX("SECONDS", 120),
				"150": LX("SECONDS", 150),
				"180": LX("SECONDS", 180),
				"210": LX("SECONDS", 210),
				"240": LX("SECONDS", 240),
				"270": LX("SECONDS", 270),
				"300": LX("SECONDS", 300)
			}
		}],
		actions: [
		{
			name: "autoPageToggle",
			title: L("TOGGLE_AUTO_PAGE_TURNER"),
			group: "Book",
			icon: "CLOCK",
			action: function () {
				autoPageToggle();
			}
		}],
		onInit: function () {
			Core.events.subscribe(Core.events.EVENTS.BOOK_PAGE_CHANGED, autoPageRestart);
		}
	};

	Core.addAddon(ViewerSettings);
};
try {
	tmp();
} catch (e) {
	// Core's log
	log.error("in ViewerSettings.js", e);
}
