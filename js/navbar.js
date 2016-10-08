(function ($) {
  $(document).ready(function(){
    
	// // hide .navbar first
	// $(".navbar").hide();
	
	// fade in .navbar
	$(function () {
		
		$(window).scroll(function () {
            // set distance user needs to scroll before we fadeIn navbar
			if ($(this).scrollTop() > 100) {
				$('.navbar-inverse').fadeIn();
				$('.navbar-inverse').css('background-color', '#393e41');
				
				// $('.navbar-header').css('background-color', '#393e41').fadeIn();

			} else {
				$('.navbar-inverse').css('background-color', 'transparent');
				
				// $('.navbar-header').css('background-color', 'transparent');
			}
		});
	
	});

});
  }(jQuery));