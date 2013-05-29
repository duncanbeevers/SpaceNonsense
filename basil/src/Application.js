import ui.StackView;
import ui.TextView;

import device;

import src.views.MainMenuView as MainMenuView;

var BOUNDS_WIDTH = 576,
    BOUNDS_HEIGHT = 1024;

// Application descends from GC.Application
exports = Class(GC.Application, function () {

	this.initUI = function () {
		// View stack for main screens
		this.setupViews();
	};

	this.setupViews = function() {
    // Declare root view local for closure visibility
    var rootView = this.view;

    // Resize function is called initially,
    // and whenever device is rotated, or browser is resized
    function rescaleRootView() {
      var w = device.width,
          h = device.height;

      if (w < h) {
        rootView.style.update({
          width: BOUNDS_WIDTH,
          height: BOUNDS_HEIGHT,
          scale: w / BOUNDS_WIDTH
        });
      } else {
        rootView.style.update({
          width: BOUNDS_HEIGHT,
          height: BOUNDS_WIDTH,
          scale: h / BOUNDS_HEIGHT
        });
      }
    }

    // Subscribe to size/orientation changes
    device.screen.subscribe("Resize", rescaleRootView);

    // Manually trigger the first resize
    rescaleRootView();

    var mainMenuView = new MainMenuView({
      superview: rootView,
      width: rootView.style.width,
      height: rootView.style.height
    });

    mainMenuView.show();
	};

	this.launchUI = function () {};
});
