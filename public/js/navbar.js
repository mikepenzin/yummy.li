(function ($) {
	$(document).ready(function(){
		// hide .navbar first
		$(".navbar-fixed-bottom").hide();
		// fade in .navbar
		$(function () {
			$(window).scroll(function () {
		        // set distance user needs to scroll before we fadeIn navbar
				if ($(this).scrollTop() > 100) {
					$('.navbar-inverse').fadeIn();
					$('.navbar-inverse').css('background-color', '#393e41');
				} else {
					$('.navbar-inverse').css('background-color', 'transparent');
					$('.navbar-fixed-bottom').fadeOut();
				}
				if ($(this).scrollTop() > 300) {
					$('.navbar-fixed-bottom').fadeIn();
				} else {
					$('.navbar-fixed-bottom').fadeOut();
				}
			});
		});
	});
}(jQuery));