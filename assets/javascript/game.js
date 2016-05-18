// javascript file for Assignment 4
// Buffy RPG game - Louise K Miller
$(document).ready (function() {

//	$("#scoreDiv").hide();
	var audio = new Audio('assets/images/buffyTheme.mp3');
	audio.play();

	var gameState = "begin";
	var yourCharName;
	var yourCharStrength;
	var defenderName;
	var defenderStrength;
	var yourPoints;
	var defenderPoints;

//=======================================================
//  At beginning of game, user clicks in top row to choose Your Character
//  and all other characters move to available enemies section
//  Game State changes to "pickDefender"
//========================================================

	$("#topRowOfChars").on("click", ".charBlock", function() {
		if (gameState == "begin") {
			var charPicked = ($(this));
			yourCharName = (jQuery(this).children("h3").text());
			yourCharStrength = (jQuery(this).children("h4").text());
			charPicked.addClass('yourCharacter');
			$("#yourCharDiv").append(charPicked);
			$("#enemiesDiv").append($(".charBlock:not(.yourCharacter)"));
			$("#topRowOfChars").hide();
			gameState = "pickDefender";
			console.log (yourCharName);
			console.log (yourCharStrength);
		};
	});
		
//==================================================================
//  if Game State is "pickDefender"
//  user can choose a character from Available Enemies section
//  and that character is moved to Defender section
//  Game State changes to "playGame"
//==================================================================

	$("#enemiesDiv").on("click", ".charBlock", function() {
		if (gameState=="pickDefender") {
			var charPicked = ($(this));
			defenderName = (jQuery(this).children("h3").text());
			defenderStrength = (jQuery(this).children("h4").text());
			charPicked.attr('id','defenderCharacter');
			$("#defenderDiv").append(charPicked);
			gameState="playGame";
			console.log (defenderName);
			console.log (defenderStrength);

		};
	});

//==================================================================
//  if Game State is "playGame"
//  user clicks the attack button to score points
//  at end of game, we move to Game State of "gameOver"
				
})