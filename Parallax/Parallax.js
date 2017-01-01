$(window).ready(function() {
    var test = true;

    resizeText = function() {
        //650
        //403
        $("#test")[0].innerText = window.outerHeight;

        if (window.innerWidth > 403) {
            $("h1").addClass("h1Tablet");
        } else {
            $("h1").removeClass("h1Tablet");
        }
        if (window.innerWidth < 876) {
            $("h1").addClass("h1Mobile");
            $(".titleDescription").addClass("titleDescriptionMobile");
        } else {
            $("h1").removeClass("h1Mobile");
            $(".titleDescription").removeClass("titleDescriptionMobile");
        }
    }

    hideLoader = function() {
        $(".loadingPanel").fadeOut(750, showContent);
    }
    showContent = function() {
        $(".content").fadeIn(750, showButtons);
    }
    showButtons = function() {
    /*    $(".button").animate({
            top: "20px"
        },
        750);*/
    }


    resizeText();
    $(window).resize(resizeText);
    if (test == false)
    {
    setTimeout(hideLoader,3000);
} else {
        $(".loadingPanel").hide();
        $(".content").show();

}

})
