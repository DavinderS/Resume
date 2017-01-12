$(window).on('beforeunload', function() {
    $(window).scrollTop(0);
});
$(window).ready(function() {
    var currentBlock = 0;
    var scrollInProgress = false;
    var swipeY = null;
    var disableScroll = false;
    var animationInProgress;
    var scrollPosition = 0;
    var scrollRatio = 0;
    window.mobilecheck = function() {
      var check = false;
      (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
      return check;
    };
    var mobile = window.mobilecheck();
    if (!mobile) {
        $(".content").addClass("desktop");
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
        if (window.innerWidth < 750) {
            $(".plusIcon").addClass("plusIconMobile");

        } else {
            $(".plusIcon").removeClass("plusIconMobile");
        }
        if (window.innerWidth < 550) {
            $(".logo").addClass("logoMobile");
            $(".logoText").hide();
        } else {
            $(".logo").removeClass("logoMobile");
            $(".logoText").show();

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
        $(window).scrollTop($(".blockContainer").eq(currentBlock).offset().top);
    }
    document.onkeydown = function(e) {
        if (e.keyCode == 40) {
            scrollHandler(-1);
        } else if (e.keyCode == 38) {
            scrollHandler(1);
        }
    }
    $(".overlay").click(function(e) {
        target = e.currentTarget.nextSibling.id;
        disableScroll = true;
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

    })
    function scrollHandler(delta) {

        if (!disableScroll && !mobile)
        {
            if (delta >= 0) {
                if (!scrollInProgress && scrollPosition!= 0) {
                    currentBlock -= 1;
                    scrollInProgress = true;
                    scrollPosition += 100;
                    animationInProgress = $('.content').animate({
                        top: scrollPosition + "%"
                    }, 750,"SteppedEase", function() {
                        scrollInProgress = false;
                    });
                }
            } else {

                if (!scrollInProgress  && scrollPosition != -500) {
                    currentBlock += 1
                    scrollInProgress = true;
                    scrollPosition -= 100;
                    animationInProgress = $('.content').animate({
                        top: scrollPosition + "%"
                    }, 750,"SteppedEase", function() {
                        scrollInProgress = false;
                    });
                }
            }
        }
    }
    $(document).bind('touchstart',function(e) {
        swipeY = e.originalEvent.touches[0].clientY;
        if (animationInProgress)
        {
            animationInProgress.stop(true, false);
        }   
    })
    $(document).bind('touchmove', function(e) {
        scrollHandler(e.originalEvent.touches[0].clientY - swipeY)
    })
    $(document).bind('touchend', function(e) {
        scrollPosition = $(window).scrollTop()

        var scrollRatio = (Math.min(Math.abs(scrollPosition - window.innerHeight * currentBlock),Math.abs(scrollPosition - window.innerHeight * currentBlock + window.innerHeight), Math.abs(scrollPosition -window.innerHeight * currentBlock -window.innerHeight)))/(window.innerHeight/2)
        if (scrollPosition > $(".blockContainer").eq(currentBlock).offset().top + window.innerHeight/4) {
            currentBlock += 1
            scrollInProgress = true;
            animationInProgress = $('html, body').animate({
                scrollTop: window.innerHeight * currentBlock
            }, 750 * scrollRatio, function() {
                scrollInProgress = false;
            });

        } else if (scrollPosition < $(".blockContainer").eq(currentBlock).offset().top - window.innerHeight/4) {
            currentBlock -= 1
            scrollInProgress = true;
            animationInProgress = $('html, body').animate({
                scrollTop: window.innerHeight * currentBlock
            }, 750 * scrollRatio, function() {
                scrollInProgress = false;
            });
        } else {
            animationInProgress = $('html, body').animate({
                scrollTop: window.innerHeight * currentBlock
            }, 750 * scrollRatio, function() {
                scrollInProgress = false;
            });
        }
    })
    $(window).bind('mousewheel', function(event) {
        scrollHandler(event.originalEvent.wheelDelta);
    });
    $(window).resize(resize);
    resize();
})
