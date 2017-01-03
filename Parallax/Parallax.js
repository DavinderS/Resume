$(window).ready(function() {
    resizeText = function() {

        if (window.innerWidth < 876) {
            $(".title").addClass("titleMobile");
            $(".titleDescription").addClass("titleDescriptionMobile");
        } else {
            $(".title").removeClass("titleMobile");
            $(".titleDescription").removeClass("titleDescriptionMobile");
        }
    }
    var interval = 1000;
    resizeText();
    $(window).resize(resizeText);
    setTimeout(showBlock, 500);
    function showBlock() {
    $(".titleBlock").fadeIn(interval, moveBlock);
    }
    function moveBlock() {
       setTimeout(function() {$(".titleBlock").animate({top:"0", height:"100vh"},interval)}, interval);
    }
    function showButtons() {

    }


})
