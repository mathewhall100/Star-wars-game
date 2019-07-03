

/*Javascript for Star Wars game */

$(document).ready(function() {


/*Global Variables*/

var numBattles = 0;
var rebelScore = 0;
var empireScore = 0;

var playerArea = $('#plArea');
var enemyArea = $('#enArea');
var gameSpace = $('#gmSpace');


/*Objects*/

/* Player and enemy Object Constructors and inheritances*/

function Character (name, image, hp) {
	this.name = name;
	this.image = image;
	this.hp = hp;
}

// inherit Player object from Character object

function Player (name, image, hp, ap) {
	Character.call(this, name, image, hp);

	this.ap = ap; 
	this.attack = function () {
		Game.enemyHp = Game.enemyHp-Game.playerAs;
	};
}


// inherit Enemy object from Character object

function Enemy(name, image, hp, cap, diffLev) {
	Character.call(this, name, image, hp);

	this.cap = cap;
	this.diffLev = diffLev;
	this.counterAttack = function () {
		Game.playerHp = Game.playerHp-Game.enemyCas;
	};
}

/*Create object instances of each character
  Use array of objetcs to allow easy referencing when 'this' cannot be used (e.g. in event listeners)*/

var rebels = [];
rebels[0] = new Player('Luke Skywalker', 'assets/images/luke.png', 160, 20);
rebels[1] = new Player('Obi Wan Kenobi', 'assets/images/obiwan.png', 100, 16);
rebels[2] = new Player('Yoda', 'assets/images/yoda.png', 140,12);
rebels[3] = new Player('Princes Leia', 'assets/images/leia.png', 180,8);

var empires = [];
empires[0] = new Enemy('Darth Vader', 'assets/images/vader.png', 120, 25, 2);
empires[1] = new Enemy('Storm Trooper', 'assets/images/trooper.png', 60, 10, 1);
empires[2] = new Enemy('Storm Trooper', 'assets/images/trooper.png', 60, 10, 1);
empires[3] = new Enemy('Dark Lord of Sith', 'assets/images/sith.png', 160, 30, 3);
empires[4] = new Enemy('General Grevious', 'assets/images/grevious.png', 140, 20, 2);


/*Constructor for Game object */

var Game = {

	$playerSelected: "",
	$enemySelected: "",

	diffLevel: 3,

	playerHp: 0,
	playerAs: 0,
	numAttacks: 0,
	enemyHp: 0,
	enemyCas: 0,

	enemyNumber: 0,
	numDefeated: 0,

	player: "none",
	attackBtn: true,
	timesClicked: 0,


	/*Add Rebel Leaders to game and add event listener to images*/

	rebelLineUp: function() {

		playerArea.append("<h3 id='rebelheader'>Pick a Rebel commander as your fighter:</h3>");

		for (var i=0; i < rebels.length; i++) {
			playerArea.append("<img src='" + rebels[i].image + "' alt='Image of " + rebels[i].name + "' class='plimage' id='rebimg" + i + "' value='" + i + "' >");
		}

		playerArea.append("<p id='info1'>&nbsp;</p>");
		playerArea.append("<p id='info2'>&nbsp;</p>");

		$('#rebelheader').removeClass('white-text').addClass('yellow-text');

		/* Event listener for each clickable image */

		$(".plimage").on ("click", Game.rebelClicked);

	},


	/*Add Imperial fighters to game and add event listener to images*/
	/*Called after from rebelClicked function so shows only after a player has been selected*/

 	empireLineUp: function() {

		enemyArea.append("<h3 id='empireheader'>Pick your first Imperial enemy to fight:</h3>");

		for (var i=0; i < empires.length; i++) {
			enemyArea.append("<img src='" + empires[i].image + "' alt='Image of " + empires[i].name + "' class='enimage' id='empimg" + i + "' value='" + i + "' >");
		}

		enemyArea.append("<p id='info3'>&nbsp;</p>");
		enemyArea.append("<p id='info4'>&nbsp;</p>");

		$('#empireheader').removeClass('white-text').addClass('yellow-text');
		$('#rebelheader').removeClass('yellow-text').addClass('white-text');

		/* Event listener for each clickable image */

		$(".enimage").on ("click", Game.enemyClicked);

	},


	/*Adds a rebel character and its information to the Gamespace*/
	/*Calls function to show Imperial images when complete*/

	rebelClicked: function() {

	if (Game.player == "none") {

		gameSpace.empty();
		Game.setUpGamespace ();

		enemyArea.empty();

		Game.playerPut ($('#' + this.id), $(this).attr("value"));    /*Move enemy selected to gamesapce with fade effect*/

		$('#info1').text("You have selected " + Game.$playerSelected.name + " as your Rebel fighter.");

		$('#info2').text("Now pick an enemy to fight!!");

		Game.playerHp = Game.$playerSelected.hp;
		Game.playerAp = Game.$playerSelected.ap;
		Game.playerAs = Game.playerAp;

		Game.player = "selected";

		Game.empireLineUp ();

		}

		else  {
			$('#info1').text("Only one player can fight at one time!").delay(2000).queue(function() {
				$('#info1').text("You have selected " + Game.$playerSelected.name + " as your Rebel fighter"); 
				$('#info1').dequeue();
				});
		}	
	},

	/* Method to get chosen player from event listener and move enemy image and info into gameSpace */
	
	playerPut: function (id, val) {

		id.fadeOut(500, function () {id.remove(); });

		Game.$playerSelected = rebels[val];					//select object as player using value attribute of event listner
		
		gameSpace.append("<img src='" + Game.$playerSelected.image + "' class='player' id='gplayer'>"); 
		$('#gplayer').hide();
		$('#gplayer').fadeIn(2000);

		/*Write player parameters to placeholders*/

		$('#plinfo').html('<h3>' + Game.$playerSelected.name + '</h3>');
		$('#plinfoHp').text("Health points: " + Game.$playerSelected.hp);
		$('#plinfoAs').text("Attack strength: " + Game.$playerSelected.ap);


	},


	/*Adds an Imperial enemy character and its information to the Gamespace*/
	/*Returns into program flow to await user determined events*/

	enemyClicked: function () {

		$('#empireheader').removeClass('yellow-text').addClass('white-text');

		Game.timesClicked++;

		if (Game.timesClicked == 1) {

		if (Game.enemyNumber == 0) {

			Game.enemyPut ($('#' + this.id), $(this).attr("value"));   /*Move enemy selected to gamespace with fade effect*/
			
			}

			else {

				$('#gameinfo').empty();
				$('#attackinfo').empty();

				Game.enemyPut ($('#' + this.id), $(this).attr("value"));   /*Move enemy selected to gamespace with fade effect*/

				/* re-enable attack button */

				$('#attack').attr("style", "background-color: yellow");
				Game.attackBtn = true;

				if (Game.enemyNumber == 5) {

					$('empireheader').text("You are fighting the last Imperial enemy")
					$('#info3').empty();
					$('#info4').empty();
					}
			}

		$('#info3').text(Game.$enemySelected.name + " is selected to fight.");

		$('#info4').text("Let the battle begin!");

		Game.enemyHp = Game.$enemySelected.hp;
		Game.enemyCas = Game.$enemySelected.cap;

		$('#attack').show(200);		/*Display attack button*/

		}

		else {	

			/*Show timed warning that only one enemy can be selected at once*/

			$('#info3').text("You can only fight one enemy at one time!").delay(2000).queue(function() {
				$('#info3').text($enemySelected.name + " is selected to fight."); 
				$('#info3').dequeue();
			});
		}
	},

	/* Method to get chosen enemy from event listener and move enemy image and info into gameSpace */

	enemyPut: function (id, val) {

		id.fadeOut(500, function () {id.remove(); });

		Game.$enemySelected = empires[val]; 							
		
		gameSpace.append("<img src='" + Game.$enemySelected.image + "' class='enemy' id='genemy'>"); 
		$('#genemy').hide();
		$('#genemy').fadeIn(2000);

		/*Write enemy parameters in placeholders */

		$('#eninfo').html('<h3>' + Game.$enemySelected.name + '</h3>');
		$('#eninfoHp').text("Health points: " + Game.$enemySelected.hp);
		$('#eninfoCas').text("Attack strength: " + Game.$enemySelected.cap);
		$('#endeftext').text("Enemies defeated: " + Game.numDefeated);
	},

	/*Set up the main gamespace with placeholders for player and enemy information*/

	setUpGamespace: function () {

		/*Create placeholders with Ids for player information*/

		gameSpace.append("<p id='plinfo'>&nbsp;</p>");
		gameSpace.append("<p id='plinfoHp'>&nbsp;</p>");
		gameSpace.append("<p id='plinfoAs'>&nbsp;</p>");

		/*Create placeholders with IDs for enemy information*/

		gameSpace.append("<p id='eninfo'>&nbsp;</p>");
		gameSpace.append("<p id='eninfoHp'>&nbsp;</p>");
		gameSpace.append("<p id='eninfoCas'>&nbsp;</p>");
		gameSpace.append("<p id='endeftext'>&nbsp;</p>");

		/*Create placeholders with IDs for attack & counterattack information */

		gameSpace.append("<p id='attackinfo'>&nbsp;</p>");
		gameSpace.append("<p id='counterinfo'>&nbsp;</p>");
		gameSpace.append("<p id='gameinfo'>&nbsp;</p>");

		/*Create attack button, add to gamespace and attach event listener*/

		var attackBtn = $('<button>');
		attackBtn.attr('type', 'button');
		attackBtn.addClass("attbtn");
		attackBtn.attr('id', 'attack');
		attackBtn.text('Attack');

		gameSpace.append(attackBtn);
		$('#attack').hide();				/*Hide attack button until needed*/

		$("#attack").on('click', Game.attackFunc);
	},


	/*Information and contrls to change difficulty level*/

	difficultyLev: function() {

		var array = ['easy', 'moderate', 'hard', 'almost impossible'];

		enemyArea.empty();
		enemyArea.append("<h3 id='scores'>--------------------<br />Difficulty level<br />--------------------</h3>");
		enemyArea.append('<input type="radio" name="levbut" value="4"> Easy<br />');
		enemyArea.append('<input type="radio" name="levbut" value="3" checked="checked"> Moderate<br />');
		enemyArea.append('<input type="radio" name="levbut" value="2"> Hard<br />');
		enemyArea.append('<input type="radio" name="levbut" value="1"> Almost impossible<br />');
		enemyArea.append('<button id="submit" class="diffbtn">Submit</button>');
		enemyArea.append('<p id="difftext">&nbsp;</p>');
		
		$('#difftext').html('Difficulty Level currently set to <span class="yellow-text">' + array[4-Game.diffLevel] + '</span>. <br /><br />Now pick a rebel leader to start the game!');

		$('#submit').click(function() {
			var radioValue = $('input[name="levbut"]:checked').val();
			Game.diffLevel = radioValue;
			$('#difftext').html('Difficulty Level currently set to <span class="yellow-text">' + array[4-Game.diffLevel] + '</span>. <br /><br />Now pick a rebel leader to start the game!');

		});				
	},


/*Attack button clicked*/

 	attackFunc: function() {

		if (Game.attackBtn) {

			Game.numAttacks++;

			Game.$enemySelected.counterAttack();  		//enemy object method
			Game.$playerSelected.attack(); 				//player object method

			if (Game.playerHp < 0) {Game.playerHp = 0;}
			if (Game.enemyHp < 0) {Game.enemyHp = 0;}

			
			
			$('#attackinfo').html("<span class='yellow-text'>You attacked! </span><br />"
				+ Game.$enemySelected.name +  " sustained <br />" + Game.playerAs + " points of damage"); 


			$('#counterinfo').html("<span class='yellow-text'>" + Game.$enemySelected.name + "<br />counter-attacked: </span><br />You sustained <br />"
				+  Game.enemyCas + " points of damage"); 


			$('#plinfoHp').text("Health points: " + Game.playerHp);
			$('#plinfoAs').text("Attack strength: " + Game.playerAs);

			$('#eninfoHp').text("Health points: " + Game.enemyHp);
			$('#plinfoCas').text("Attack strength: " + Game.enemyCas);
		 
			

			if (Game.enemyHp < 1) {Game.attackBtnDisable();Game.enemyDefeated();}

			if (Game.playerHp < 1) {Game.attackBtnDisable(); Game.playerDefeated();}

			Game.playerAs = Game.playerAs+(Game.playerAp*Game.diffLevel);

			$('#plinfoAs').text("Attack strength: " + Game.playerAs);
		}
	},



	/* Disable the attack button by greying it out and setting its marker to false */

	attackBtnDisable: function () {

				$('#attack').attr("style", "background-color: grey");
				Game.attackBtn = false;
	},


	/*Enemy defeated (enemyHp < 1) */

	enemyDefeated: function () {	

			/* Move defeated enemy to defeated enemies area and resize through animation*/
			var leftPos = 80+(Game.numDefeated*3.9);
			$('#genemy').animate({left: leftPos+'%', top: '185px', height: '65px', width: '40px'}, "slow");
			$('#genemy').attr("id","");   	/* remove its id so no longer responds to #genemy */

			
			$('#attackinfo').html("You defeated " + Game.$enemySelected.name + "!<br /><br />" + Game.$enemySelected.name + " RIP!");
			$('#counterinfo').html("");

			Game.numDefeated++;
		
			$('#endeftext').text("Enemies Defeated: " + Game.numDefeated);

			if (Game.numDefeated >4) {Game.empireDefeated();}

			else {
				$('#gameinfo').html("").delay(1000).queue(function() {
				$('#gameinfo').html("But there is no time to rest...<br /><br />" + "<span class='yellow-text'>Select your next opponent above!</span>");
				$('#gameinfo').dequeue();
	
				});

				Game.selectNextEnemy ();
				}
	},


	/* Select the next enemy to fight */

	selectNextEnemy: function () {

	$('#empireheader').append("").delay(1000).queue(function() {
				
		$('#empireheader').removeClass('white-text').addClass('yellow-text');

		if (Game.enemyNumber <4) {$('#empireheader').html("Pick the next Imperial enemy to fight:");}

			else {$('#empireheader').text("You have only one more Imperial enemy to fight:");}

		$('#empireheader').dequeue();

		});

	$('#info3').empty();
	$('#info4').empty();

	Game.enemyNumber++;
	Game.timesClicked = 0;

	},
		

	/*player defeated (playerHp < 1);*/

	playerDefeated: function () {

		if (Game.enemyHp > 0) {

			$('#attackinfo').html("&nbsp;&nbsp;&nbsp;&nbsp;<span>GAME OVER</span><br /><br />&nbsp;&nbsp;&nbsp;&nbsp;" + Game.$enemySelected.name + " defeated you!");

			}

			else {

			$('#attackinfo').html("&nbsp;&nbsp;&nbsp;&nbsp;<span>GAME OVER</span><br /><br />&nbsp;&nbsp;&nbsp;&nbsp;You and " + Game.$enemySelected.name + " delivered fatal blows to each other!");

			}

		$('#counterinfo').empty();
		$('#gameinfo').empty();

		$('#attack').hide();

		$('#gplayer').css('opacity', '0.3');

		numBattles++;
		empireScore++;
		Game.updateScores(numBattles, rebelScore, empireScore);

		Game.againOrQuit ();
	},


	/*Empire defeated (enemyHp < 1);*/

		empireDefeated: function () {

		$('#counterinfo').empty();
		$('#gameinfo').empty();

		$('#attackinfo').html("&nbsp;&nbsp;&nbsp;&nbsp;<span class='red-text'>GAME OVER</span><br /><br />" + 
							"&nbsp;&nbsp;&nbsp;&nbsp;You defeated: <br /><br />&nbsp;&nbsp;&nbsp;&nbsp; - two " + 
							empires[1].name + "s<br />&nbsp;&nbsp;&nbsp;&nbsp; - " + 
							empires[4].name + "<br />&nbsp;&nbsp;&nbsp;&nbsp; - " +
							empires[0].name + "<br />&nbsp;&nbsp;&nbsp;&nbsp; - and the " +
							empires[3].name + "<br /><br />&nbsp;&nbsp;&nbsp;&nbsp;" +
							"The Rebellion won this battle but the war is not over!.");


		$('#attack').hide();

		numBattles++;
		rebelScore++;
		Game.updateScores(numBattles, rebelScore, empireScore);

		Game.againOrQuit ();
	},


	/*Update and dispaly number of battles and player/empire scores in enemy Area*/

	updateScores: function (batt, rebel, empire) {

		enemyArea.empty();

		enemyArea.append("<h3 id='scores'>----------------<br />S C O R E S<br />----------------</h3>");
		enemyArea.append("<p id='numbatts'>Battles fought: " + batt + "</p>");
		enemyArea.append("<p id='rebelsc'>Rebels: " + rebel + "</p>");
		enemyArea.append("<p id='empiresc'>Empire: " + empire + "</p>");
	},


	/*Display play again or Quit buttons and attach event listeners*/

	againOrQuit: function () {

		var playBtn = $('<button>');
			playBtn.attr('type', 'button');
			playBtn.addClass("playbtn");
			playBtn.attr('id', 'play');
			playBtn.text('Play again');
		enemyArea.append(playBtn);

		var quitBtn = $('<button>');
			quitBtn.attr('type', 'button');
			quitBtn.addClass("quitBtn");
			quitBtn.attr('id', 'quit');
			quitBtn.text('Quit game');
		enemyArea.append(quitBtn);

		$("#play").on('click', Game.playAgain);
		$("#quit").on('click', Game.quitGame);
	},


	/*If Play again selected  - reset global variables and call setup functions*/

	playAgain: function () {

		/* Reset game variables */

		Game.$playerSelected = "";
		Game.$enemySelected = "";

		Game.playerHp = 0;
		Game.playerAs = 0;
		Game.numAttacks = 0;
		Game.enemyHp = 0;
		Game.enemyCas = 0;

		Game.enemyNumber = 0;
		Game.numDefeated = 0;
		
		Game.player = "none";
		Game.attackBtn = true;
		Game.timesClicked = 0;

		/* Clear game Areas */

		playerArea.empty();
		enemyArea.empty();
		gameSpace.empty();

		/* Call setup functions */

		Game.setUpGamespace ();
		Game.difficultyLev (); 
		Game.rebelLineUp ();

	},

	/*Quit game by loading another website */	

	quitGame: function () {

	// Quit game

	},

};	


/* ----------------------------------------------   CALLS  -----------------------------------------------------*/


/*Run functions non document load : display difficulty level and then rebel fighters to select 
  Note++ star wars scroll text at beginning is in CSS only NOT JS */


Game.difficultyLev ();

Game.rebelLineUp ();



/* ---------------------------------------------- document.ready function return-----------------------------------------------------*/

}); 