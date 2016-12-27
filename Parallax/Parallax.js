$(document).ready(function() {
    resizeText = function() {
        console.log(window.innerWidth);
        if (window.innerWidth < 500) {
            $("h1").addClass("h1Mobile");
            $("p").addClass("pMobile");
        } else {
            $("h1").removeClass("h1Mobile");
            $("p").removeClass("pMobile");
        }
    }
    resizeText();
    $(window).resize(resizeText);

})
