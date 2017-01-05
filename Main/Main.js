$(window).on('beforeunload', function() {
    $(window).scrollTop(0);
});
$(window).ready(function() {
    var currentBlock = 0;
    var scrollInProgress = false;
    var swipeY = null;
    function detectmob() { 
        if( navigator.userAgent.match(/Android/i) || navigator.userAgent.match(/webOS/i) || navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPad/i) || navigator.userAgent.match(/iPod/i) || navigator.userAgent.match(/BlackBerry/i) || navigator.userAgent.match(/Windows Phone/i)){
            return true;
        }
        else {
            return false;
        }
    }
    var mobile = detectmob();
    console.log("ready");
    if (mobile) {
        $(".block, .blockContainer").css("height", window.innerHeight);
        $('html, body').css('overflowY', 'auto'); 
        $(".caretDown, .caretText, .caretUp").hide();
        $(window).bind("orientationchange", function() {
            $(".loadingPanel").show();
         setTimeout(function() {
            $(".block, .blockContainer").css("height", window.innerHeight)
            $(".loadingPanel").hide();
            $(window).scrollTop(0);

        }, 200)
        });
    }
    // Resizing
    resize = function() {
        if (window.innerWidth > 430 && window.innerWidth <= 640) {
            $(".title").addClass("titleTablet");
            $(".titleDescription").addClass("titleDescriptionTablet");
            $(".description").addClass("descriptionTablet");
            $(".button").addClass("buttonTablet");
        } else {
            $(".title").removeClass("titleTablet");
            $(".titleDescription").removeClass("titleDescriptionTablet");
            $(".description").removeClass("descriptionTablet");
            $(".button").removeClass("buttonTablet");
        }
        if (window.innerWidth <= 430) {
            $(".title").addClass("titleMobile");
            $(".titleDescription").addClass("titleDescriptionMobile");
            $(".description").addClass("descriptionMobile");
            $(".button").addClass("buttonMobile");
        } else {
            $(".title").removeClass("titleMobile");
            $(".titleDescription").removeClass("titleDescriptionMobile");
            $(".description").removeClass("descriptionMobile");
            $(".button").removeClass("buttonMobile");
        }
        if (!mobile)
        {
            $(window).scrollTop($(".block").eq(currentBlock).offset().top);
        }
    }

    $(".caretDown").click(function() {
        scrollHandler(-1);
   })
    $(".caretUp").click(function() {
        scrollHandler(1);
   })
    function scrollHandler(delta) {
        if (delta >= 0) {
            if (!scrollInProgress && $(document).scrollTop() != 0) {
                currentBlock -= 1;
                scrollInProgress = true;
                $('html, body').animate({
                    scrollTop: $(document).scrollTop() - window.innerHeight
                }, 1000, function() {
                    scrollInProgress = false;
                });
            }
        }
        else {
            
            if (!scrollInProgress && $(document).height() != $(document).scrollTop() + window.innerHeight) {
                currentBlock += 1
                scrollInProgress = true;
                $('html, body').animate({
                    scrollTop: $(document).scrollTop() + window.innerHeight
                }, 1000, function() {
                    scrollInProgress = false;
                });
            }
        }
    }
    /*
    $(document).bind('touchstart',function(e) {
        swipeY = e.originalEvent.touches[0].clientY;
    })
    $(document).bind('touchmove', function(e) {
        scrollHandler(e.originalEvent.touches[0].clientY - swipeY)
    })*/
    if (!mobile) {
        $(window).bind('mousewheel', function(event) {
            scrollHandler(event.originalEvent.wheelDelta);
        });
    }
    $(window).resize(resize);
    resize();
})
