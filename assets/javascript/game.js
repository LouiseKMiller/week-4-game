// javascript file for Assignment 4
// Buffy RPG game - Louise K Miller
$(document).ready (function() {

	var audio = new Audio('assets/images/buffyTheme.mp3');
	audio.play();

	$(".charBlock").click(function() {
		$("#yourCharDiv").append($("#buffyChar"));

	});
				
});