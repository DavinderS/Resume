$(window).on('beforeunload', function() {
    $(window).scrollTop(0);
});
$(window).ready(function() {
    var currentBlock = 0;
    var scrollInProgress = false;
    var swipeY = null;
    var disableScroll = false;
    var animationInProgress;

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
        if (animationInProgress)
        {
        animationInProgress.stop(true, true);
    }
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
        if (mobile) {
            $('html, body').css('overflowY', 'hidden');
        }
        $(".fullScreenOverlay").show();
        if (target == "sapLogo") {
            $(".overlayBlock").html("<div class='overlayTitle'>SAP - Application Developer</div><div class='overlayText'>Developed a beach cleanup application <ul><li>NodeJS based application that primarily utilized Mongoose (MongoDB) and BackboneJS</li><li>I was given a template that took care of setting up the database and provided an example of a few webpages, a schema and some interaction between the server and the client</li><li>Used the examples to build a custom Schema and used existing methods to post/get/update and delete information from the database</li>Used a wireframe created by another student to create the HTML/CSS for the application</li><li> Used GitHub to save files and Heroku to show the client the applications progress</li></ul></div>");
        }
        else if (target == "haaLogo") {
            $(".overlayBlock").html("<div class='overlayTitle'>Huang and Associates Analytics - Full Stack Developer</div><div class='overlayText'>Worked on a production level application for a startup<ul><li>Worked with a team of 3 other co-op developers under 1 front-end manager and 1 back-end manager</li><li> Stored code using Sourcetree (Git) and worked using multiple branches</li><li> Worked extensive hours before application demos in order to ensure a working application</li><li> Helped younger co-ops with some of the more difficult code and best practices</li><li> Provided extensive document due to complexity of the code and changing developers</li></ul>Database<ul><li> Wrote both DDL and DML statements for an SQL database</li><li> Initial database connection and configuration was already completed, modified tables as needed for specific pages</li></ul>Server<ul><li> Used SQL Alchemy to query the database and Flask to create the API routes</li><li> Sent back appropriates error codes and messages in order to improve debugging</li><li> Utilized Redis to save and pull temporary information</li><li> Followed strict guidelines and heavily commented in order to improve code clarity</li></ul>Client<ul><li> Used a wide array of libraries/frameworks including AngularJS, Angular Materials, AG-grid, Bootstrap, flowJS and more</li><li> Each page had a unique controller, template and service that all followed similar design patterns to keep all pages consistent. It also utilized directives for common elements</li><li> Created a library that held AG-grid functions. This library handled the initial set up and cell-rendering functions for all grids throughout the application</li><li> Followed an online style guide in order to keep the code behind all pages as similar and easy to follow as possible</li></ul></div>")
        }
        else if (target == "ttcLogo") {
            $(".overlayBlock").html("<div class='overlayTitle'>Toronto Transit Commission - GIS Developer / Programmer Analyst</div><div class='overlayText'>Used Crystal Reports to modify a universe and create reports for internal users<ul><li>Edited the existing universe for the reports which required extensive SQL</li><li>Created reports using WEB Intelligence rich client for internal users</li><li>Redesigned the universe to be more user friendly so users could create ad-hoc reports</li><li>Tested reports to verify the data was accurate and fixed the visual display, so that it matched the old reporting system</li></ul></div>");

        }
        else if (target == "eitLogo") {
            $(".overlayBlock").html("<div class='overlayTitle'>Envision IT - Front End Web Developer</div><div class='overlayText'>Developed the front end of a vacation tracking software for another company<ul><li>Used JavaScript, HTML and SQL to develop the application</li><li>Made it work with IE8 in a SharePoint environment</li><li>Worked in an AGILE environment</li><li>Used TFS with Urban Turtle to manage code</li><li>Worked alongside the back-end developer to help my client communicate with his REST web service</li><li>Converted an IE10 application to work with IE8</li></ul>Worked on a mapping Proof of Concept<ul><li>Used the ArcGIS JavaScript API to create a proof of concept</li><li>Tested custom popups, searching by point name and more to see if it would work for our application</li><li>Created deployment documentation for use in a SharePoint environemnt</li></ul></div>");
        }
        else if (target == "communitechLogo") {
            $(".overlayBlock").html("<div class='overlayTitle'>Communitech - Application Developer</div><div class='overlayText'>Developed a beach cleanup application <ul><li>NodeJS based application that primarily utilized Mongoose (MongoDB) and BackboneJS</li><li>I was given a template that took care of setting up the database and provided an example of a few webpages, a schema and some interaction between the server and the client</li><li>Used the examples to build a custom Schema and used existing methods to post/get/update and delete information from the database</li><li>Used a wireframe created by another student to create the HTML/CSS for the application</li><li> Used GitHub to save files and Heroku to show the client the applications progress</li></ul></div>");

        }

    })
    $(".exitOverlay").click(function() {
        disableScroll = false;
        $(".fullScreenOverlay").hide();
        if (mobile) {
         $('html, body').css('overflowY', 'auto'); 
        }

    })
    function scrollHandler(delta) {
        if (!disableScroll)
        {
            if (delta >= 0) {
                if (!scrollInProgress && $(document).scrollTop() != 0) {
                    currentBlock -= 1;
                    scrollInProgress = true;
                    animationInProgress = $('html, body').animate({
                        scrollTop: $(document).scrollTop() - window.innerHeight
                    }, 1000, function() {
                        scrollInProgress = false;
                    });
                }
            } else {

                if (!scrollInProgress && $(document).height() != $(document).scrollTop() + window.innerHeight) {
                    currentBlock += 1
                    scrollInProgress = true;
                    animationInProgress = $('html, body').animate({
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
