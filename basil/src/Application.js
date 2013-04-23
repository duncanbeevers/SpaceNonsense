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
    var rootView, gameplayView;

    // Resize function is called initially,
    // and whenever device is rotated, or browser is resized
    function rescaleRootView() {
      var w = device.width,
          h = device.height;

      rootView.style.update({
        width  : w,
        height : h
      });

      gameplayView.style.update({
        width: w,
        height: h
      });
    }

    // Create the root view
		rootView = new ui.StackView({
			superview       : this,
      backgroundColor : '#37B34A'
 		});

    // Subscribe to size/orientation changes
    device.screen.subscribe("Resize", rescaleRootView);

 		// Planet Scene
 		gameplayView = new GameplayView();

 		rootView.push(gameplayView);

    // Manually trigger the first resize
    rescaleRootView();
	};

	this.launchUI = function () {};
});
