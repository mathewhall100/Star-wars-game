

/*Javascript for Star Wars game (Week 4 Homework )*/

$(document).ready(function() {


/*Global Variables*/

var $playerSelected = "";
var $enemySelected = "";
var player = "none";

var diffLevel = 3;
var numBattles = 0;
var rebelScore = 0;
var empireScore = 0;

var playerHp = 0;
var playerAs = 0;
var numAttacks = 0;
var enemyHp = 0;
var enemyCas = 0;
var enemyNumber = 0;
var numDefeated = 0;

var attackBtn = true;
var timesClicked = 0;

var playerArea = $('#plArea');
var enemyArea = $('#enArea');
var gameSpace = $('#gmSpace');


/*Objects*/

/*Object Constructors and inheritances*/


function Character (name, image, hp) {
	this.name = name;
	this.image = image;
	this.hp = hp;

	this.fadeIn = function () {};
	this.intoPlay = function () {};
}

function Player (name, image, hp, ap) {
	Character.call(this, name, image, hp);

	this.ap = ap; 
	this.attack = function () {};
}

function Opponent(name, image, hp, cap, diffLev) {
	Character.call(this, name, image, hp);

	this.cap = cap;
	this.diffLev = diffLev;
	this.counterAttack = function () {};
}

/*Create objects instances for gameplay*/


var luke = new Player ('Luke Skywalker', 'assets/images/luke.png', 160, 20);
var obiWan = new Player ('Obi Wan Kenobi', 'assets/images/obiwan.png', 100, 16);
var yoda = new Player ('Yoda', 'assets/images/yoda.png', 140,12);
var leia = new Player ('Princes Leia', 'assets/images/leia.png', 180,8);

var vader = new Opponent('Darth Vader', 'assets/images/vader.png', 120, 25, 2);
var trooper1 = new Opponent('Storm Trooper', 'assets/images/trooper.png', 60, 10, 1);
var trooper2 = new Opponent('Storm Trooper', 'assets/images/trooper.png', 60, 10, 1);
var lord = new Opponent('Dark Lord of Sith', 'assets/images/sith.png', 160, 30, 3);
var grevious = new Opponent('General Grevious', 'assets/images/grevious.png', 140, 20, 2);


/*Game setup functions*/

/*Function: Add Rebel Leaders to game and add event listener to images*/

function rebelLineUp () {
	playerArea.append("<h3>Pick a Rebel leader as your fighter:</h3>");
	playerArea.append("<img src='" + luke.image + "' alt='Luke Skywalker' class='plimage' id='pLuke' data-objname='luke'>");
	playerArea.append("<img src='" + obiWan.image + "' alt='Obi Wan Kenobi' class='plimage' id='pObiWan' data-objname='obiWan'>");
	playerArea.append("<img src='" + yoda.image + "' alt='Yoda' class='plimage' id='pYoda' data-objname='yoda'>");
	playerArea.append("<img src='" + leia.image + "' alt='princess Leia' class='plimage' id='pLeia' data-objname='leia'>");
	playerArea.append("<p id='info1'>&nbsp;</p>");
	playerArea.append("<p id='info2'>&nbsp;</p>");

	$(".plimage").on ("click", rebelClicked);
}


/*Add Imperial fighters to game and add event listener to images*/
/*Called after from rebelClicked fucntion so shows only after a player has been selected*/

function empireLineUp () {
	enemyArea.append("<h3 id = 'empireheader'>Pick your first Imperial enemy to fight:</h3>");
	enemyArea.append("<img src='" + vader.image + "' alt='Darth Vader' class='enimage' id='eVader' data-objname='vader'>");
	enemyArea.append("<img src='" + trooper1.image + "' alt='Storm Trooper 1' class='enimage' id='eTrooper1' data-objname='trooper1'>");
	enemyArea.append("<img src='" + trooper2.image + "' alt='Storm Trooper 2' class='enimage' id='eTrooper2' data-objname='trooper2'>");
	enemyArea.append("<img src='" + grevious.image + "' alt='General Grevious' class='enimage' id='eGreviouse' data-objname='grevious'>");
	enemyArea.append("<img src='" + lord.image + "' alt='The Dark Lord' class='enimage' id='eLord' data-objname='lord'>");
	enemyArea.append("<p id='info3'>&nbsp;</p>");
	enemyArea.append("<p id='info4'>&nbsp;</p>");

	$(".enimage").on ("click", enemyClicked);

}

/*Adds a rebel character and its information to the Gamespace*/
/*Calls function to show Imperial images when complete*/

function rebelClicked() {

	gameSpace.empty();
	setUpGamespace ();
	enemyArea.empty();

	if (player == "none") {

		/*Move enemy selected to gamesapce with fade effect*/

		$('#' + this.id).fadeOut(500, function () {$('#' + this.id).remove(); });

		$playerSelected = eval($(this).attr("data-objname"));

		gameSpace.append("<img src='" + $playerSelected.image + "' class='player' id='gplayer'>"); 
		$('#gplayer').hide();
		$('#gplayer').fadeIn(2000);

		/*Write player parameters to placeholders*/

		$('#plinfo').html('<h3>' + $playerSelected.name + '</h3>');
		$('#plinfoHp').text("Health points: " + $playerSelected.hp);
		$('#plinfoAs').text("Attack strength: " + $playerSelected.ap);

		

		$('#info1').text("You have selected " + $playerSelected.name + " as your Rebel fighter.");

		$('#info2').text("Now pick an enemy to fight!!");

		playerHp = $playerSelected.hp;
		playerAp = $playerSelected.ap;
		playerAs = playerAp;

		player = "selected";

		empireLineUp ();

		}

		else  {
			$('#info1').text("Only one player can fight at one time!").delay(2000).queue(function() {
				$('#info1').text("You have selected " + $playerSelected.name + " as your Rebel fighter"); 
				$('#info1').dequeue();
				});
		}
		
		
}

/*Adds an Imperial enemy character and its information to the Gamespace*/
/*Returns into program flow*/

function enemyClicked () {

		timesClicked++;

	if (timesClicked == 1) {

		if (enemyNumber == 0) {

			/*Move enemy selected to gamespace with fade effect*/

			$('#' + this.id).fadeOut(500, function () {$('#' + this.id).remove(); });

			$enemySelected = eval($(this).attr("data-objname"));
			gameSpace.append("<img src='" + $enemySelected.image + "' class='enemy' id='genemy'>"); 
			$('#genemy').hide();
			$('#genemy').fadeIn(2000);

			/*Write enemy parameters in placeholders */

			$('#eninfo').html('<h3>' + $enemySelected.name + '</h3>');
			$('#eninfoHp').text("Health points: " + $enemySelected.hp);
			$('#eninfoCas').text("Attack strength: " + $enemySelected.cap);
			$('#endeftext').text("Enemies defeated: " + numDefeated);

			
			}

			else {

				$('#gameinfo').empty();
				$('#attackinfo').empty();

				$('#' + this.id).fadeOut(2000, function () {$('#' + this.id).remove(); });

				$enemySelected = eval($(this).attr("data-objname"));
				gameSpace.append("<img src='" + $enemySelected.image + "' class='enemy' id='genemy'>"); 
				$('#genemy').hide();
				$('#genemy').fadeIn(2000);

				/*Write enemy parameters in placeholders */

				$('#eninfo').text($enemySelected.name + ": ");
				$('#eninfoHp').text("Health points: " + $enemySelected.hp);
				$('#eninfoCas').text("Attack strength: " + $enemySelected.cap);
				$('#endeftext').text("Enemies Defeated: " + numDefeated);

				/* re-enable attack button */

				$('#attack').attr("style", "background-color: yellow");
				attackBtn = true;

				if (enemyNumber == 5) {

					$('empireheader').text("You are fighting the last Imperial enemy")
					$('#info3').empty();
					$('#info4').empty();
					}
			}

		$('#info3').text($enemySelected.name + " is selected to fight.");

		$('#info4').text("Let the battle begin!");

		enemyHp = $enemySelected.hp;
		enemyCas = $enemySelected.cap;

		$('#attack').show(200);		/*Display attack button*/

		}

		else {	

			/*Show timed warning that only one enemy can be selected at once*/

			$('#info3').text("You can only fight one enemy at one time!").delay(2000).queue(function() {
				$('#info3').text($enemySelected.name + " is selected to fight."); 
				$('#info3').dequeue();
			});

		}


	
}

function setUpGamespace () {

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

	$("#attack").on('click', attackFunc);
}

function difficultyLev () {
		var array = ['easy', 'moderate', 'hard', 'probably impossible'];

		enemyArea.empty();

		enemyArea.append("<h3 id='scores'>--------------------<br />Difficulty level<br />--------------------</h3>");
		enemyArea.append('<input type="radio" name="levbut" value="4"> Easy<br />');
		enemyArea.append('<input type="radio" name="levbut" value="3" checked="checked"> Moderate<br />');
		enemyArea.append('<input type="radio" name="levbut" value="2"> Hard<br />');
		enemyArea.append('<input type="radio" name="levbut" value="1"> Probably impossible<br />');
		enemyArea.append('<button id="submit" class="diffbtn">Submit</button>');
		enemyArea.append('<p id="difftext">&nbsp;</p>');
		
		$('#difftext').html('Difficulty Level currently set to <u>' + array[4-diffLevel] + '</u>. Now pick a rebel leader to start the game!');


		$('#submit').click(function() {
			var radioValue = $('input[name="levbut"]:checked').val();
			diffLevel = radioValue;
			console.log(diffLevel);

			$('#difftext').html('Difficulty Level currently set to <u>' + array[4-diffLevel] + '</u>. Now pick a rebel leader to start the game');

		});
				
}



/* ----------------------------------------------   CALLS  -----------------------------------------------------*/




/*Start game setup by first calling to funvtion to display rebel images from player to select a fighter*/

difficultyLev ();

rebelLineUp ();



/*Attack button clicked*/


function attackFunc ()	{

		if (attackBtn) {

			numAttacks++;

			playerHp = playerHp-enemyCas;
			enemyHp = enemyHp-playerAs;
			if (playerHp < 0) {playerHp = 0;}
			if (enemyHp < 0) {enemyHp = 0;}

			
			
			$('#attackinfo').html("You attacked: <br />"
				+ $enemySelected.name +  " sustained <br />" + playerAs + " points of damage"); 


			$('#counterinfo').html($enemySelected.name + "<br />counter-attacked: <br />You sustained <br />"
				+  enemyCas + " points of damage"); 


			$('#plinfoHp').text("Health points: " + playerHp);
			$('#plinfoAs').text("Attack strength: " + playerAs);

			$('#eninfoHp').text("Health points: " + enemyHp);
			$('#plinfoCas').text("Attack strength: " + enemyCas);
		 
			

			if (enemyHp < 1) {attackBtnDisable (); enemyDefeated();}

			if (playerHp < 1) {attackBtnDisable (); playerDefeated();}

			playerAs = playerAs+(playerAp*diffLevel);
			$('#plinfoAs').text("Attack strength: " + playerAs);
		}

}

/* Disable the attack button by greying it out and setting its marker to false */

function attackBtnDisable () {

				$('#attack').attr("style", "background-color: grey");
				attackBtn = false;
}


/*Enemy defeated (enemyHp < 1) */

function enemyDefeated () {

			$('#attackinfo').html("You defeated " + $enemySelected.name + "!<br /><br />" + $enemySelected.name + " RIP!");
						

			$('#counterinfo').html("");
			$('#gameinfo').html("There are still " + (4-numDefeated) + " more Imperial enemies still alive.<br /><br />" + "<span>Select your next opponent to fight!</span>");
							

			/* Move defeated enemy to defeated enemies area and resize through animation*/
			var leftPos = 80+(numDefeated*3.9);
			$('#genemy').animate({left: leftPos+'%', top: '185px', height: '65px', width: '40px'}, "slow");
			$('#genemy').attr("id","");   /* remove its id so no longer responds to #genemy */

			numDefeated++;
		
			$('#endeftext').text("Enemies Defeated: " + numDefeated);

			if (numDefeated >4) {empireDefeated();}

			else {selectNextEnemy ();}

}

function selectNextEnemy () {

	if (enemyNumber <5) {$('#empireheader').text("Pick the next Imperial enemy to fight:");}

	else {$('#empireheader').text("You have only one more Imperial enemy to fight:");}

	$('#info3').empty();
	$('#info4').empty();

	enemyNumber++;
	timesClicked = 0;
}
			

			

/*player defeated (playerHp < 1);*/

function playerDefeated () {

		if (enemyHp > 0) {

			$('#attackinfo').html("&nbsp;&nbsp;&nbsp;&nbsp;<span>GAME OVER</span><br /><br />&nbsp;&nbsp;&nbsp;&nbsp;" + $enemySelected.name + " defeated you!");

			}

			else {

			$('#attackinfo').html("&nbsp;&nbsp;&nbsp;&nbsp;<span>GAME OVER</span><br /><br />&nbsp;&nbsp;&nbsp;&nbsp;You and " + $enemySelected.name + " delivered fatal blows to each other!");

			}


		$('#counterinfo').empty();
		$('#gameinfo').empty();

		$('#attack').hide();

		$('#gplayer').css('opacity', '0.3');

		numBattles++;
		empireScore++;
		updateScores(numBattles, rebelScore, empireScore);

		againOrQuit ();

}

/*Empire defeated (playerHp < 1);*/

function empireDefeated () {

		$('#counterinfo').empty();
		$('#gameinfo').empty();

		$('#attackinfo').html("&nbsp;&nbsp;&nbsp;&nbsp;<span>GAME OVER</span><br /><br />" + 
							"&nbsp;&nbsp;&nbsp;&nbsp;You defeated: <br /><br />&nbsp;&nbsp;&nbsp;&nbsp; - two " + 
							trooper1.name + "s<br /><br />&nbsp;&nbsp;&nbsp;&nbsp; - " + 
							grevious.name + "<br /><br />&nbsp;&nbsp;&nbsp;&nbsp; - " +
							vader.name + "<br /><br />&nbsp;&nbsp;&nbsp;&nbsp; - and the " +
							lord.name + "<br /><br />&nbsp;&nbsp;&nbsp;&nbsp;");


		$('#attack').hide();

		numBattles++;
		rebelScore++;
		updateScores(numBattles, rebelScore, empireScore);

		againOrQuit ();

}

function updateScores (batt, rebel, empire) {
		enemyArea.empty();

		enemyArea.append("<h3 id='scores'>----------------<br />S C O R E S<br />----------------</h3>");
		enemyArea.append("<p id='numbatts'>Battles fought: " + batt + "</p>");
		enemyArea.append("<p id='rebelsc'>Rebels: " + rebel + "</p>");
		enemyArea.append("<p id='empiresc'>Empire: " + empire + "</p>");

}

function againOrQuit () {

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

		$("#play").on('click', playAgain);
		$("#quit").on('click', quitGame);

}

function playAgain () {

	$playerSelected = "";
	$enemySelected = "";
	player = "none";
	diffLevel = 1;

	playerHp = 0;
	playerAs = 0;
	numAttacks = 0;
	enemyHp = 0;
	enemyCas = 0;
	enemyNumber = 0;
	numDefeated = 0;

	attackBtn = true;
	timesClicked = 0;

	playerArea.empty();
	enemyArea.empty();
	gameSpace.empty();

	setUpGamespace ();
	difficultyLev (); 
	rebelLineUp ();

}

function quitGame () {

}



}); /*document ready function return*/