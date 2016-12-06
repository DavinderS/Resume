function checkBrowser(href) {
	console.log(navigator.userAgent);
	if(navigator.userAgent.indexOf("Chrome") == -1 )
    {
    	showAlert("Please use Google Chrome to view this link");
    } else {
    	window.location.href = href;
    }
}
function showAlert(msg) {
	$('#alert').text(msg);
    $('#alert').animate({
        height: 50,
    }, 1000);
    setTimeout(function() {
    	$('#alert').animate({
        height: 0
    }, 1000, function() {
		$('#alert').text("");
    })
    },4000)
}
$(document).ready(function(){
  $(".loading").fadeOut("slow");

});