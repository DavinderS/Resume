$(window).ready(function() {


    // Animations
    var interval = 1000;
    function showBlock() {
    $(".titleBlock").fadeIn(interval, moveBlock);
    }
    function moveBlock() {
       setTimeout(function() {
        $(".titleBlock").animate({top:"0%", height:"100vh"},interval)
        $(".title").animate({top:"35%"}, interval, showButtons)
    }, interval);
    }
    function showButtons() {
        $(".button").fadeIn(interval);
    }

    setTimeout(showBlock, 500);

    //Button Handlers
    $("#workExperienceButton").click(function() {
        $("#mainPage").animate({left:"-100%"}, 2000);
        $("#workExperience").animate({left:"0%"}, 2000);
    });
    $("#backButton").click(function() {
        $("#mainPage").animate({left:"0%"}, 2000);
        $("#workExperience").animate({left:"100%"}, 2000);
    });



    // Resizing
    resizeText = function() {
        if (window.innerWidth > 430 && window.innerWidth <= 640) {
            $(".title").addClass("titleTablet");
            $(".titleDescription").addClass("titleDescriptionTablet");
            $(".button").addClass("buttonTablet");

        } else {
            $(".title").removeClass("titleTablet");
            $(".titleDescription").removeClass("titleDescriptionTablet");
            $(".button").removeClass("buttonTablet");
        }
        if (window.innerWidth < 430) {
            $(".title").addClass("titleMobile");
            $(".titleDescription").addClass("titleDescriptionMobile");
            $(".button").addClass("buttonMobile");
        } else {
            $(".title").removeClass("titleMobile");
            $(".titleDescription").removeClass("titleDescriptionMobile");
            $(".button").removeClass("buttonMobile");

        }
    }
    $(window).resize(resizeText);
    resizeText();
})
