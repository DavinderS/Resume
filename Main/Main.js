$(window).on('beforeunload', function() {
    $(window).scrollTop(0);
});
$(window).ready(function() {
    var currentBlock = 0;
    var scrollInProgress = false;

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
        $(window).scrollTop($(".block").eq(currentBlock).offset().top);
    }

    $(".caretDown").click(function() {
       $('html, body').animate({
        scrollTop: $("#aboutImage").offset().top
    }, 1000);
   })

    $(window).bind('mousewheel', function(event) {
        if (event.originalEvent.wheelDelta >= 0) {
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
    });
    $(window).resize(resize);
    resize();
})
