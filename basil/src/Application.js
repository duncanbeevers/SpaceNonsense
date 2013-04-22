import ui.StackView;
import ui.TextView;

import device;

import src.views.GameplayView as GameplayView;

// Application descends from GC.Application
exports = Class(GC.Application, function () {

	this.initUI = function () {
		// View stack for main screens
		this.setupViews();

		// var textview = new ui.TextView({
		// 	superview: this.view,
		// 	layout: "box",
		// 	text: "Hello, world!",
		// 	color: "white"
		// });
	};

	this.setupViews = function() {
    // Declare root view local for closure visibility
    var rootView;

    // Resize function is called initially,
    // and whenever device is rotated, or browser is resized
    function rescaleRootView() {
      var w           = device.width,
          h           = device.height,
          screen      = device.screen,
          scale       = Math.max(w, h),
          xOffset     = w / 2,
          yOffset     = h / 2,
          style       = rootView.style;

      style.scale = scale;
      style.x     = xOffset;
      style.y     = yOffset;
    }

    // Create the root view
		rootView = new ui.StackView({
			superview       : this,
      width           : 1,
      height          : 1,
      anchorX         : 0.5,
      anchorY         : 0.5,
      backgroundColor : '#37B34A'
 		});

    // Subscribe to size/orientation changes
    device.screen.subscribe("Resize", rescaleRootView);

    // Manually trigger the first resize
    rescaleRootView();

 		// Planet Scene
 		var gameplayView = new GameplayView();

 		rootView.push(gameplayView);
	};

	this.launchUI = function () {};
});
