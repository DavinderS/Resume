$(window).on('beforeunload', function() {
    // Always start from scroll = 0 (Browsers save scroll location in certain cases)
    // can't use it on ready because it scrolls after it's ready
    $(window).scrollTop(0);
});

$(document).ready(function() {
	var moving = false;
	var target = 0;
	var page = 0
    document.onmousewheel = function(e) {
        event.returnValue = false;
        if (moving == false) {
            if (e.deltaY > 0) {
                target = window.pageYOffset + window.innerHeight
                if (target < document.body.scrollHeight) {
                    page++;
                    moving = true
                }
            } else if (e.deltaY < 0) {
                target = window.pageYOffset - window.innerHeight
                if (target >= 0) {
                    page--;
                    moving = true
                }
            }
            if (moving) {
                update(target)
            }
        }
    }

    function update(target) {
        $('html, body').animate({
            scrollTop: target
        }, 1000, function() {
            moving = false

        });
    }
    window.onresize = function(e)
    {
    	window.scrollTo(0, window.innerHeight * page)
    }
});