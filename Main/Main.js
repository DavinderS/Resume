$(window).on('beforeunload', function() {
    $(window).scrollTop(0);
});
$(window).ready(function() {
    var currentBlock = 0;
    var scrollInProgress = false;
    var swipeY = null;
    var disableScroll = false;
    function detectmob() { 
        if( navigator.userAgent.match(/Android/i) || navigator.userAgent.match(/webOS/i) || navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPad/i) || navigator.userAgent.match(/iPod/i) || navigator.userAgent.match(/BlackBerry/i) || navigator.userAgent.match(/Windows Phone/i)){
            return true;
        }
        else {
            return false;
        }
    }
    var mobile = detectmob();

    if (mobile) {
        $(".block, .blockContainer").css("height", window.innerHeight);
        $(".logo").css("height", window.innerHeight/2-100)
        $('html, body').css('overflowY', 'auto'); 
        $(".caretDown, .caretText, .caretUp").hide();
        $("#gameButton").replaceWith("<div class='button' onclick='gameAlert()'>PLAY</div>")

        $(window).bind("orientationchange", function() {
            $(".loadingPanel").show();
            $(window).scrollTop(0);

            setTimeout(function() {
                $(".block, .blockContainer").css("height", window.innerHeight)
                $(".loadingPanel").hide();
                $(window).scrollTop(0);
            }, 300)
        });
    }

    gameAlert = function() {
        $(".alert").slideDown(500, function() {
            setTimeout(function() {
                $(".alert").slideUp(500);
            }, 3000)
        })
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
    $(".logo").click(function(e) {
        target = e.currentTarget.id;
        disableScroll = true;
        console.log(target);
        if (target == "communitechLogo") {
            //$(".fullScreenOverlay").load("WorkExperience_Communitech.html");
            $(".fullScreenOverlay").show();
            $(".overlayText").html("Developed an application that utilized a database <ul><li>NodeJS based application that primarily utilized Mongoose (MongoDB) and BackboneJS</li><li>I was given a template that took care of setting up the database and provided an example of a few webpages and some interaction between the server and the client</li><li>Used the examples to build a Schema and used existing methods to post/get/update and delete information from the database</li>Used a wireframe created by another student to create the HTML/CSS for the application</li><li> Used GitHub to save files and Heroku to show client app progress</li>");
        }
    })
    $(".exitOverlay").click(function() {
        disableScroll = false;
        $(".fullScreenOverlay").hide();
    })
    function scrollHandler(delta) {
        if (!disableScroll)
        {
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
            } else {

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
    }
    if (!mobile) {
        $(window).bind('mousewheel', function(event) {
            scrollHandler(event.originalEvent.wheelDelta);
        });
    }
    $(window).resize(resize);
    resize();
})
