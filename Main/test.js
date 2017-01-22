<script>
    var readyStateCheckInterval = setInterval(function() {
        if (document.readyState === "complete") {
            clearInterval(readyStateCheckInterval);
            init();
        }
    }, 10);
    init = function() {
      var els = document.querySelectorAll("a[href='/landscape/?category=TEST123']")[0].parentElement.parentElement.parentElement.parentElement.previousElementSibling;
      console.log(els);
        hideImages = function(blockIndex, show) {
            var objectsToHide = document.getElementsByClassName("sqs-block summary-v2-block sqs-block-summary-v2")[0].parentElement.parentElement.parentElement.parentElement;
            var startingOpacity = 1;
            var targetOpacity = 0;
            var endDisplay = "none";
            var changeRate = -0.02;
            if (show) {
                startingOpacity = 0;
                targetOpacity = 1;
                endDisplay = "block";
                changeRate = 0.02;
                objectsToHide[blockIndex].style.display = endDisplay;
            }

            var opacity = startingOpacity;
            var id = setInterval(frame, 10);

            function frame() {
                if (startingOpacity > targetOpacity && opacity <= targetOpacity || startingOpacity < targetOpacity && opacity >= targetOpacity) {
                    clearInterval(id);
                    if (show) {
                        objectsToHide[blockIndex].style.display = endDisplay;
                    } else {
                        for (i = 0; i < 4; i++) {
                            objectsToHide[i].style.display = endDisplay;
                        }
                        hideImages(blockIndex, true);
                    }
                } else {
                    opacity += changeRate;
                    if (show) {
                        objectsToHide[blockIndex].style.opacity = opacity;

                    } else {
                        for (i = 0; i < 4; i++) {
                            objectsToHide[i].style.opacity = opacity;
                        }
                    }

                }
            }
        }
        document.getElementById("Abstract").onclick = function() {
            hideImages(0);
            document.getElementById("Abstract").style.textDecoration = "underline"
            document.getElementById("Landscape").style.textDecoration = "none"
            document.getElementById("Portrait").style.textDecoration = "none"
            document.getElementById("StillLife").style.textDecoration = "none"

        }
        document.getElementById("Landscape").onclick = function() {
            hideImages(1);
            document.getElementById("Abstract").style.textDecoration = "none"
            document.getElementById("Landscape").style.textDecoration = "underline"
            document.getElementById("Portrait").style.textDecoration = "none"
            document.getElementById("StillLife").style.textDecoration = "none"
        }
        document.getElementById("Portrait").onclick = function() {
            hideImages(2);
            document.getElementById("Abstract").style.textDecoration = "none"
            document.getElementById("Landscape").style.textDecoration = "none"
            document.getElementById("Portrait").style.textDecoration = "underline"
            document.getElementById("StillLife").style.textDecoration = "none"
        }
        document.getElementById("StillLife").onclick = function() {
            hideImages(3);
            document.getElementById("Abstract").style.textDecoration = "none"
            document.getElementById("Landscape").style.textDecoration = "none"
            document.getElementById("Portrait").style.textDecoration = "none"
            document.getElementById("StillLife").style.textDecoration = "underline"
        }
    }
</script>