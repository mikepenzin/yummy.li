(function($) {
	
	$("#gallery-recipes").gridalicious({
	  selector: '.item',
	  gutter: 20,
	  width: 250,
	  animate: true
	});
	
	$("#feature-recipes").gridalicious({
	  selector: '.recipe',
	  gutter: 20,
	  width: 250,
	  animate: true
	});
	
})(jQuery);