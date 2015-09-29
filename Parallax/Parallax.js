$(window).on('beforeunload', function() {
	// Always start from scroll = 0
    $(window).scrollTop(0);
});
var moving = false;
var target = 0;
$(document).ready(function(){
	document.onmousewheel = function(e) {
		if (moving == false)
		{
			if (e.deltaY > 0)
			{
				target = window.pageYOffset + window.innerHeight
			}
			if (e.deltaY < 0)
			{
				target = window.pageYOffset - Math.max(window.innerHeight, 0)
			}
			update(window.pageYOffset, target)
		}
	}
	update = function(initialPoint, target) {
		moving = true
		$('html, body').animate({
    	scrollTop: target
 	}, 1000, function() {
 		moving = false
 	});
	}
});