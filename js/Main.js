$(window).load(function() {
    // Global
    var scrollInProgress = false;
    var disableScroll = false;
    var animationInProgress;
    var page = 0;
    var topBarMobile = false;
    var overlayOpen = false;


    // Once the window is loaded, fade the loading panel out and show the page
    $(".loadingPanel").fadeOut(500, function() {
        $(".hideInitial").fadeIn(500);
        $("#hide").fadeOut(500);
    });

    function showAlert(text, warning) {
        $("#alert").text(text);
        if (warning) {
            $("#alert").css("background-color","rgba(150,0,0, 0.75)");
        } else {
            $("#alert").css("background-color","rgba(0,150,0, 0.75)");
        }


        $("#alert").slideDown(500, function() {
            setTimeout(function() {
                $("#alert").slideUp(500);
            }, 3000)
        })
    }
    // ALL
    // Used to manage the location of the slider on the top nav bar
    function calculateSliderPosition() {
        var topBarBlocks = 6;
        var sliderPositionX = (page * 100)/topBarBlocks;
        var sliderPositionY = 0;
        if(topBarMobile) {
            topBarBlocks = 3;
            sliderPositionX = (page * 100)/topBarBlocks;
            if (page >= 3)
            {
                sliderPositionX = ((page - 3) * 100)/topBarBlocks;
                sliderPositionY = 50;
            }
        }
        return {
            left: sliderPositionX + "%",
            top: sliderPositionY + "px"
        }
    }

    function changePage(event) {
        var target = event.target.id.split("_")[1];
        // need this for the callback
        var initialPage = page;
        var newPage = parseInt(target);

        scrollInProgress = true;

        if (page != newPage) {
            // Hide the old page and fade in the new one. Using a black div (#hide) is more efficient than fading all the other elements
            $("#hide").fadeIn(500, function() {
                $($(".blockContainer")[initialPage]).hide();
                $($(".blockContainer")[newPage]).show();
                $("#hide").fadeOut(500, function() {
                    scrollInProgress = false;
                });
            });

            // update the page number before you move the slider
            page = newPage;

            // Move the slider back into position
            $('.selectedSlider').animate(calculateSliderPosition(),  500, function() {
                disableScroll = false;
                overlayOpen = false;
                $(".fullScreenOverlay").hide();
                $(".fullScreenOverlay").css("left", "100%");
            });

            
        }
    }

    $(".barBlock").click(changePage);

    // Resizing
    function resize() {
        // Complete animations instantly on resize to prevent conflicts 
        if (animationInProgress)
        {
            animationInProgress.stop(true, true);
        }

        // 1st Page
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

        // All pages
        if (window.innerWidth < 545) {
            if (overlayOpen) {
                $(".fullScreenOverlay").css("left", "0px")
            }
            $("#alert").addClass("alertMobile");
            $(".topBar").addClass("topBarMobile");
            $(".barBlock").addClass("barBlockMobile");
            $(".selectedSlider").addClass("selectedSliderMobile");
            $(".blockContainer").addClass("blockContainerMobile");
            $(".fullScreenOverlay").addClass("fullScreenOverlayMobile");
            // Work page
            $(".logo").addClass("logoMobile");
            $(".logoText").hide();
            topBarMobile = true;
        } else
        {
            if (overlayOpen) {
                $(".fullScreenOverlay").css("left", "320px")
            }
            $("#alert").removeClass("alertMobile");
            $(".topBar").removeClass("topBarMobile");
            $(".barBlock").removeClass("barBlockMobile");
            $(".selectedSlider").removeClass("selectedSliderMobile");
            $(".blockContainer").removeClass("blockContainerMobile");
            $(".fullScreenOverlay").removeClass("fullScreenOverlayMobile");
            // Work page
            $(".logo").removeClass("logoMobile");
            $(".logoText").show();
            topBarMobile = false;
        }
        // Recalculate the slider position
        var sliderPositionObj = calculateSliderPosition();
        $(".selectedSlider").css("top", sliderPositionObj.top);
        $(".selectedSlider").css("left", sliderPositionObj.left);
        $(window).scrollTop($(".blockContainer").eq(page).offset().top);
    }



    // Work
    function populateOverlay(target) {        
        if (target == "sapLogo") {
            $(".overlayBlock").html("<div class='overlayTitle'>Application Developer<br><span class='overlayDescription'>SAP</span></div><div class='overlayText'>Worked on a IOT MQTT client, publisher and Transformer<ul><li>Created an MQTT client and publisher using Java and Paho MQTT library</li><li>Worked directly with solutions architect to determine best solution for project</li><li>Received sensor data from MQTT protocol as JSON and used GSON to parse and reformat data</li><li>Once data was converted, sent it into a StreamingLite project</li><li>Created CCL/CCLScript to be run in StreamingLite to aggregate and filter incoming data</li><li>Integrated code from analytics tool to also be used in StreamingLite project </li><li>Created a presentation explaining the capabilities and limits for CCL/CCLScript</li><liPresented to the development team and executives, presentation consisted of explanation, live demo and question and answer session</li><li>Wrote extensive comments and documentation to allow other developers to take over with minimal issues</li></ul></div><div class='caretDownOverlay'></div>");
        }
        else if (target == "haaLogo") {
            $(".overlayBlock").html("<div class='overlayTitle'>Full Stack Developer<br><span class='overlayDescription'>Huang and Associates Analytics</span></div><div class='overlayText'>Worked on a production level application for a startup<ul><li>Worked with a team of 3 other co-op developers under 1 front-end manager and 1 back-end manager</li><li> Stored code using Sourcetree (Git) and worked using multiple branches</li><li> Worked extensive hours before application demos in order to ensure a working application</li><li> Helped younger co-ops with some of the more difficult code and best practices</li><li> Provided extensive document due to complexity of the code and changing developers</li></ul>Database<ul><li> Wrote both DDL and DML statements for an SQL database</li><li> Initial database connection and configuration was already completed, modified tables as needed for specific pages</li></ul>Server<ul><li> Used SQL Alchemy to query the database and Flask to create the API routes</li><li> Sent back appropriates error codes and messages in order to improve debugging</li><li> Utilized Redis to save and pull temporary information</li><li> Followed strict guidelines and heavily commented in order to improve code clarity</li></ul>Client<ul><li> Used a wide array of libraries/frameworks including AngularJS, Angular Materials, AG-grid, Bootstrap, flowJS and more</li><li> Each page had a unique controller, template and service that all followed similar design patterns to keep all pages consistent. It also utilized directives for common elements</li><li> Created a library that held AG-grid functions. This library handled the initial set up and cell-rendering functions for all grids throughout the application</li><li> Followed an online style guide in order to keep the code behind all pages as similar and easy to follow as possible</li></ul></div><div class='caretDownOverlay'></div>")
        }
        else if (target == "ttcLogo") {
            $(".overlayBlock").html("<div class='overlayTitle'>GIS Developer / Programmer Analyst<br><span class='overlayDescription'>Toronto Transit Commission</span></div><div class='overlayText'>Used Crystal Reports to modify a universe and create reports for internal users<ul><li>Edited the existing universe for the reports which required extensive SQL</li><li>Created reports using WEB Intelligence rich client for internal users</li><li>Redesigned the universe to be more user friendly so users could create ad-hoc reports</li><li>Tested reports to verify the data was accurate and fixed the visual display, so that it matched the old reporting system</li></ul></div><div class='caretDownOverlay'></div>");
        }
        else if (target == "eitLogo") {
            $(".overlayBlock").html("<div class='overlayTitle'>Front End Web Developer<br><span class='overlayDescription'>Envision IT</span></div><div class='overlayText'>Developed the front end of a vacation tracking software for another company<ul><li>Used JavaScript, HTML and SQL to develop the application</li><li>Made it work with IE8 in a SharePoint environment</li><li>Worked in an AGILE environment</li><li>Used TFS with Urban Turtle to manage code</li><li>Worked alongside the back-end developer to help my client communicate with his REST web service</li><li>Converted an IE10 application to work with IE8</li></ul>Worked on a mapping Proof of Concept<ul><li>Used the ArcGIS JavaScript API to create a proof of concept</li><li>Tested custom popups, searching by point name and more to see if it would work for our application</li><li>Created deployment documentation for use in a SharePoint environemnt</li></ul></div><div class='caretDownOverlay'></div>");
        }
        else if (target == "communitechLogo") {
            $(".overlayBlock").html("<div class='overlayTitle'>Application Developer<br><span class='overlayDescription'>Communitech</span></div><div class='overlayText'>Developed a beach cleanup application <ul><li>NodeJS based application that primarily utilized Mongoose (MongoDB) and BackboneJS</li><li>I was given a template that took care of setting up the database and provided an example of a few webpages, a schema and some interaction between the server and the client</li><li>Used the examples to build a custom Schema and used existing methods to post, get, update and delete information from the database</li><li>Used a wireframe created by another student to create the HTML/CSS for the application</li><li> Used GitHub to save files and Heroku to show the client the applications progress</li></ul></div><div class='caretDownOverlay'></div>");
        }
        if ($(".fullScreenOverlay")[0].scrollHeight > window.innerHeight)
        {
            $(".caretDownOverlay").fadeIn(500);
        }
    }

    function openOverlay(event) {
        var target = event.currentTarget.nextSibling.id;
        var overlayLeft = 320;
        disableScroll = true;

        $(".fullScreenOverlay").show();

        if (topBarMobile) {
            overlayLeft = 0;
        }
        if (overlayOpen)
        {
            // Hide the Caret
            $(".caretDownOverlay").fadeOut(500);

            // Scroll back to the top if it isn't already there
            if ($(".fullScreenOverlay").scrollTop() != 0)
            {
                $(".fullScreenOverlay").animate({scrollTop: 0}, 200);   
            }
            // Since the overlay is open, move it off the screen
            $(".fullScreenOverlay").animate({left:"100%"}, 500, function() {
                // update the overlay html
                populateOverlay(target);
                // Bring the updated overlay back
                $(".fullScreenOverlay").animate({left:overlayLeft+"px"}, 500);

            });
        } else {
            // Show the overlay
            populateOverlay(target);
            $(".fullScreenOverlay").animate({left:overlayLeft+"px"}, 500);
            overlayOpen = true;
        }
    }

    function closeOverlay() {
        disableScroll = false;
        $(".caretDownOverlay").fadeOut(500);
        $(".fullScreenOverlay").animate({left:"100%"}, 500, function(e) {
            if (e)
            {
                populateOverlay(e.currentTarget.nextSibling.id);
            }
            overlayOpen = false;
        });
    }

    // on the work page, hide the caret if you're not scrolled all the way to the top
    function toggleCaret() {
       if ($(".fullScreenOverlay").scrollTop() == 0) {
            $(".caretDownOverlay").fadeIn(500);
        } else {
            $(".caretDownOverlay").fadeOut(500);
        }
    }

    $(".fullScreenOverlay").scroll(toggleCaret())
    $(".overlay").click(openOverlay);
    $(".exitOverlay").click(closeOverlay);


    // GAME
    $("#gameButton").click(function(e) {
        // Check if they are using PC
        if (navigator.userAgent.match(/(iPhone|iPod|iPad|Android|BlackBerry|IEMobile)/)) {
            e.preventDefault();
            showAlert("This game is not supported on mobile devices", true);
        }
    })


    // MORE
    // Initialize Firebase
    var config = {
        apiKey: "AIzaSyAL2JFL1rW_AQmM0LuJtfiQ1tdOwF73_0w",
        authDomain: "resume-73f6f.firebaseapp.com",
        databaseURL: "https://resume-73f6f.firebaseio.com",
        projectId: "resume-73f6f",
        storageBucket: "",
        messagingSenderId: "975412699394"
    };
    firebase.initializeApp(config);


    const dbRefObject = firebase.database().ref("Comments");

    var refreshData = function(snapshot) {
        var comments = snapshot.val();
        // Convert the comments into an array of {name:x comment:x} objects
        var formattedComments = $.map(comments, function(value, index) {
            return [value];
        });
        // Initialize JsGrid
        $("#comments").jsGrid({
            width: "80%",
            marginLeft: "10%",
            height: "400px",
            paging:true,
            sorting: true,
            data: formattedComments,
            fields: [
            { name: "name", title:"Name or Company", type: "text", width: 50, validate: "required" },
            { name: "comment", title:"Comment", type: "text", width: 150, validate: "required"},
            ]
        })
    }
    
    firebase.database().ref("Comments").once('value').then(refreshData);

    submitComment = function() {
        var comment = $("#comment").val();
        var commenter = $("#commenter").val();
        if (comment != "" && commenter != "") {
            dbRefObject.push({"name":commenter,"comment":comment}, function() {
                firebase.database().ref("Comments").once('value').then(function(snapshot) {
                    showAlert("Success", false);
                    refreshData(snapshot);
                });
            });
            $("#comment").val("");
            $("#commenter").val("");
            //submit
        } else {
            showAlert("Please fill out both fields", true)
        }
    }


$(window).resize(resize);
resize();
})
