$(window).ready(function() {


    // Animations
    var interval = 1000;
    function showBlock() {
    $(".titleBlock").fadeIn(interval, moveBlock);
    }
    function moveBlock() {
       setTimeout(function() {
        $(".titleBlock").animate({top:"0", height:"100vh"},interval)
        $(".title").animate({top:"30%"}, interval, showButtons)
    }, interval);
    }
    function showButtons() {
        $(".button").fadeIn(interval);
    }

    setTimeout(showBlock, 500);

    //Button Handlers
    $("#workExperienceButton").click(function() {
        $("#mainPage").animate({left:"-200%"}, 2000);
        $("#workExperience").animate({left:"0%"}, 2000);
    });
    $("#backButton").click(function() {
        $("#mainPage").animate({left:"0%"}, 2000);
        $("#workExperience").animate({left:"200%"}, 2000);
    });



    // Resizing
    resizeText = function() {
        if (window.innerWidth < 550) {
            $(".title").addClass("titleMobile");
            $(".titleDescription").addClass("titleDescriptionMobile");
            $(".buttonText").addClass("buttonTextMobile");
        } else {
            $(".title").removeClass("titleMobile");
            $(".titleDescription").removeClass("titleDescriptionMobile");
            $(".buttonText").removeClass("buttonTextMobile");

        }
    }
    $(window).resize(resizeText);
    resizeText();
})
