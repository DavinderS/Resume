$(window).ready(function() {

    var interval = 1000;

    // Animations
    setTimeout(showBlock, 500);
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






    // Resizing
    resizeText = function() {
        if (window.innerWidth < 876) {
            $(".title").addClass("titleMobile");
            $(".titleDescription").addClass("titleDescriptionMobile");
        } else {
            $(".title").removeClass("titleMobile");
            $(".titleDescription").removeClass("titleDescriptionMobile");
        }
    }
    resizeText();
    $(window).resize(resizeText);
})
