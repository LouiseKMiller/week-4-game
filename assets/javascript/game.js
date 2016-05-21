// javascript file for Assignment 4
// Buffy RPG game - Louise K Miller

//=======================================================
//  Prior to Page Load, declare variables
//  Characters defined in characters object
//========================================================

	var gameState = "begin";
	var yourCharName;
	var yourCharStrength;
	var defenderName;
	var defenderStrength;
	var yourPoints;
	var defenderPoints;
	var attackCounter = 1;
	var roundCounter = 0;
	var yourChar;
	var defenderChar;
	var audio = new Audio('assets/images/buffyTheme.mp3');

	var characters = [
		{charID: "buffyChar",
		 charName: "Buffy",
		 startPoints: 185,
		 strength: 15,
		 counterStrength: 10,
		 imgHtml: '<img src="assets/images/buffy.jpg" alt="buffy" class="charImage">'
		},

		{charID: "angelChar",
		 charName: "Angel",
		 startPoints: 165,
		 strength: 12,
		 counterStrength: 18,
		 imgHtml: '<img src="assets/images/angel.jpg" alt="angel" class="charImage">'
		},

		{charID: "willowChar",
		 charName: "Willow",
		 startPoints: 170,
		 strength: 10,
		 counterStrength: 22,
		 imgHtml: '<img src="assets/images/willow.jpg" alt="willow" class="charImage">'
		},

		{charID: "spikeChar",
		 charName: "Spike",
		 startPoints: 190,
		 strength: 18,
		 counterStrength: 25,
		 imgHtml: '<img src="assets/images/spike.jpg" alt="spike" class="charImage">'
		}
		];

//=======================================================
//  Prior to Page Load, and after restart
//  create and add character blocks to top row
//========================================================

	function restart() {
		for (var i=0; i<characters.length; i++) {

			$('#topRowOfChars').append("<div id='"+characters[i].charID+"' class='charBlock'></div");
			var currentCharID = "#"+characters[i].charID;
			$(currentCharID).append("<h4 class='charName'>"+characters[i].charName+"</h3>");
			$(currentCharID).append(characters[i].imgHtml);
			$(currentCharID).append("<h5 class='charPoints'>"+characters[i].startPoints+"</h3></div>")
		};

		$("#scoreDiv").hide();
		$("#restartButton").hide();
		$("#gameResult").hide();
		$('#topRowOfChars').show();

		audio.play();
	};

	restart();

$(document).ready (function() {


//=======================================================
//  At beginning of game, user clicks in top row to choose Your Character
//  and all other characters move to available enemies section
//  yourChar = characters array index number for chosen character
//  Game State changes to "pickDefender"
//  yourPoints = your character's starting points
//========================================================

	$("#topRowOfChars").on("click", ".charBlock", function() {
		if (gameState == "begin") {

			var charPicked = $(this);

//  find characters array number for selected character

			var yourCharID = $(this).attr('id');
			for (var i=0; i<characters.length; i++) {
				if (characters[i].charID==yourCharID) 
					yourChar=i;
			};
			yourCharName = characters[yourChar].charName;
			yourPoints = characters[yourChar].startPoints;

			charPicked.addClass('yourCharacter');
			$("#yourCharDiv").append(charPicked);
			$("#enemiesDiv").append($(".charBlock:not(.yourCharacter)"));
			$("#topRowOfChars").hide();

			gameState = "pickDefender";
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
			$('#gameResult').hide();
			var charPicked = $(this);
			var defenderID = $(this).attr('id');
			for (i=0; i<characters.length; i++) {
				if (characters[i].charID==defenderID) 
					defenderChar=i;
			}
			defenderName = characters[defenderChar].charName;
			defenderPoints = characters[defenderChar].startPoints;

			charPicked.addClass('defenderCharacter');
			$("#defenderDiv").append(charPicked);

			gameState="playGame";

		};
	});

//==================================================================
//  if Game State is "playGame"
//  user clicks the attack button to score points
//  at end of game, announce the win or loss
//  If lose, game over
//
	$("#attackButton").on("click", function() {
		if (gameState=="playGame") {
			var damageToDefender = attackCounter*characters[yourChar].strength;
			var damageToYou = characters[defenderChar].counterStrength;
			attackCounter++;
			yourPoints = Math.max(0, (yourPoints - damageToYou));
			defenderPoints = Math.max(0, (defenderPoints - damageToDefender));
			$(".yourCharacter h5").html(yourPoints);
			$(".defenderCharacter h5").html(defenderPoints);

//	if yourPoints is <= zero, announce you lose, and show restart button
			if (yourPoints<=0) {
				$("#scoreDiv").hide();
				$("#gameResult h3").html("You have been defeated... GAME OVER!!")
				$("#gameResult").show();
				$("#restartButton").show();
				gameState = "gameOver";
			}

			else if (defenderPoints<=0 && roundCounter<(characters.length-2)) {
				console.log(roundCounter);

				$("#scoreDiv").hide();
				$('.defenderCharacter').remove();
				roundCounter++;

				$("#gameResult h3").html("You have defeated "+ defenderName+".  Choose your next enemy.");
					gameState = "pickDefender";
				$("#gameResult").show();
				$("#restartButton").hide();
			}

			else if (defenderPoints<=0 && roundCounter==(characters.length-2)) {
				console.log(roundCounter);
				$("#scoreDiv").hide();
				$('.defenderCharacter').remove();
				$("#gameResult h3").html("Congratulations! You've won!");
				gameState = "gameOver";
				$("#gameResult").show();
				$("#restartButton").show();
			}
			

			else {
				$(".defenderName").html(defenderName);
				$("#defenderDamage").html(damageToDefender);
				$("#yourDamage").html(damageToYou);
				$("#scoreDiv").show();
			} //if round continues
		}
		//if playGame state
		else if (gameState=="pickDefender") {
			$("#gameResult h3").html("No enemy here!")
			$("#gameResult").show();
		};

	}); //on click function

//=========================================================
//  Game is over, restart button takes you back to start
//========================================================

	$("#restartButton").on("click", function() {
		audio.pause();
		audio.load();
		gameState = "begin";
		attackCounter = 1;
		roundCounter = 0;
		$(".charBlock").remove();
		restart();
		$("#scoreDiv").hide();
		$("#gameResult").hide();


	});
			
})