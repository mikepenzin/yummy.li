!function(n){n(document).ready(function(){n(".navbar-fixed-bottom").hide(),n(function(){n(window).scroll(function(){n(this).scrollTop()>70?(n(".navbar-inverse").fadeIn(),n(".navbar-inverse").css("background-color","#393e41")):(n(".navbar-inverse").css("background-color","transparent"),n(".navbar-fixed-bottom").fadeOut()),n(this).scrollTop()>200?n(".navbar-fixed-bottom").fadeIn():n(".navbar-fixed-bottom").fadeOut()})})})}(jQuery);