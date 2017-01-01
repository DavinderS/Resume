$(window).ready(function() {
    var test = true;

    resizeText = function() {
        if (window.innerWidth < 650) {
            $("h1").addClass("h1Mobile");
            $("h2").addClass("h2Mobile");
        } else {
            $("h1").removeClass("h1Mobile");
            $("h2").removeClass("h2Mobile");
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
