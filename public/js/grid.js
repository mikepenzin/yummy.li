(function($) {
	$("#gallery-recipes").gridalicious({
	  selector: '.item',
	  gutter: 20,
	  width: 250,
	  animate: true,
	  animationOptions: {
	    queue: true,
	    speed: 200,
	    duration: 300,
	    effect: 'fadeInOnAppear'
	  }
	});
})(jQuery);