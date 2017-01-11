$(window).ready(function() {
	var target = "";
	$(".plusIcon").click(function(e) {
		$("#" + target).css("opacity", 0.5);
		target = e.target.id;
		$("#" + target).css("opacity", 1);
		$(".detailBlock").fadeOut(500, function() {
		if (target == "engine") {
			$("#detailView").html('<div class="detailBlock"><img src="engine.jpg" class="detailImage"><div class="detailText">Naturally Aspirated V12 Engine produces 730 Horsepower at 8400 RPM and 507 Ib-ft of Torque at 5500 RPM. 0-60 in 2.9 Seconds with a Top Speed of 350 km/h. Equipped with a 7 Speed ISR Transmission, Rear Self Locking Differential and All Wheel Drive</div></div>');
		} else if (target == "spoiler") {
			$("#detailView").html('<div class="detailBlock"><img src="spoiler.jpg" class="detailImage"><div class="detailText">Carbon fiber bodykit comes the splitter, sideskirt, spoiler and diffuser providing maximum downforce</div></div>');
		} else if (target == "wheel") {
			$("#detailView").html('<div class="detailBlock"><img src="wheel.jpg" class="detailImage"><div class="detailText">Lightwheight Novitec NL1 wheels allow quick acceleration, while 400mm 6 piston carbon-ceramic front and 380 mm 4 piston carbon-ceramic rear brakes help stop the 3500 Ib car</div></div>');
		}
    resize();
		
		$(".detailBlock").fadeIn(500);
		});
	})
	resize = function() {
	    if (window.innerWidth <= 640) {
	        $(".detailImage").addClass("detailImageMobile");
	        $(".detailText").addClass("detailTextMobile");
	    } else {
	        $(".detailImage").removeClass("detailImageMobile");
	        $(".detailText").removeClass("detailTextMobile");

	    }
	};
	$(window).resize(resize);
    resize();
});