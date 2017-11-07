

/*Javascript for Star Wars game (Week 4 Homework )*/

$(document).ready(function() {


/*Global Variables*/

var $playerSelected = "";
var $enemySelected = "";
var enemyOrder = ['first', 'next', 'next', 'next', 'last'];
var numFought = 0;
var player = "";
var enemy = "";

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


var luke = new Player ('Luke Skywalker', 'assets/images/luke.png', 120, 8);
var obiWan = new Player ('Obi Wan Kenobi', 'assets/images/obiwan.png', 100, 12);
var yoda = new Player ('Yoda', 'assets/images/yoda.png', 140,10);
var leia = new Player ('Princes Leia', 'assets/images/leia.png', 180,6);

var vader = new Opponent('Darth Vader', 'assets/images/vader.png', 120, 25, 2);
var trooper1 = new Opponent('Storm Trooper', 'assets/images/trooper.png', 60, 10, 1);
var trooper2 = new Opponent('Storm Trooper', 'assets/images/trooper.png', 60, 10, 1);
var lord = new Opponent('Dark Lord of Sith', 'assets/images/sith.png', 160, 30, 3);
var grevious = new Opponent('General Grevious', 'assets/images/grevious.png', 140, 20, 2);


/*Game setup*/

/*Add Players*/


playerArea.append("<h3>Pick a Rebel leader as your fighter:</h3>");
playerArea.append("<img src='" + luke.image + "' alt='Luke Skywalker' class='plimage' id='pLuke' data-objname='luke'>");
playerArea.append("<img src='" + obiWan.image + "' alt='Obi Wan Kenobi' class='plimage' id='pObiWan' data-objname='obiWan'>");
playerArea.append("<img src='" + yoda.image + "' alt='Yoda' class='plimage' id='pYoda' data-objname='yoda'>");
playerArea.append("<img src='" + leia.image + "' alt='princess Leia' class='plimage' id='pLeia' data-objname='leia'>");
playerArea.append("<p id='info1'>&nbsp;</p>");
playerArea.append("<p id='info2'>&nbsp;</p>");


/*Add Opponents*/


enemyArea.append("<h3>Pick the " + enemyOrder[numFought] + " Imperial enemy to fight:</h3>");
enemyArea.append("<img src='" + vader.image + "' alt='Darth Vader' class='enimage' id='eVader' data-objname='vader'>");
enemyArea.append("<img src='" + trooper1.image + "' alt='Storm Trooper 1' class='enimage' id='eTrooper1' data-objname='trooper1'>");
enemyArea.append("<img src='" + trooper2.image + "' alt='Storm Trooper 2' class='enimage' id='eTrooper2' data-objname='trooper2'>");
enemyArea.append("<img src='" + grevious.image + "' alt='General Grevious' class='enimage' id='eGreviouse' data-objname='grevious'>");
enemyArea.append("<img src='" + lord.image + "' alt='The Dark Lord' class='enimage' id='eLord' data-objname='lord'>");
enemyArea.append("<p id='info3'>&nbsp;</p>");
enemyArea.append("<p id='info4'>&nbsp;</p>");

/*add event listeners to image objects*/


$(".plimage").on ("click", function () {

	if (player != "selected") {

		$('#' + this.id).fadeOut(2000, function () {$('#' + this.id).remove(); });

		$playerSelected = eval($(this).attr("data-objname"));
		gameSpace.append("<img src='" + $playerSelected.image + "' class='player' id='gplayer'>"); 
		$('#gplayer').hide();
		$('#gplayer').fadeIn(2000);

		gameSpace.append("<p id='plinfo'>" + $playerSelected.name + ": </p>");
		gameSpace.append("<p id='plinfoHp'>Health points: " + $playerSelected.hp + "</p>");
		gameSpace.append("<p id='plinfoAs'>Attack strength: " + $playerSelected.ap + "</p>");

		player = "selected";

		$('#info1').text("You have selected " + $playerSelected.name + " as your Rebel fighter.");

		$('#info2').text("Now pick an imperial character to fight!!");

		}

		else  {
			$('#info1').text("Only one player can fight at one time!").delay(2000).queue(function() {
				$('#info1').text("You have selected " + $playerSelected.name + " as your Rebel fighter"); 
				$('#info1').dequeue();
				});
		}
		
});


$(".enimage").on ("click", function () {

	if (enemy != "selected") {

		$('#' + this.id).fadeOut(2000, function () {$('#' + this.id).remove(); });

		$enemySelected = eval($(this).attr("data-objname"));
		gameSpace.append("<img src='" + $enemySelected.image + "' class='enemy' id='genemy'>"); 
		$('#genemy').hide();
		$('#genemy').fadeIn(2000);

		gameSpace.append("<p id='eninfo'>" + $enemySelected.name + ": </p>");
		gameSpace.append("<p id='eninfoHp'>Health points: " + $enemySelected.hp + "</p>");
		gameSpace.append("<p id='eninfoCas'>Attack strength: " + $enemySelected.cap + "</p>");

		enemy = "selected";

		$('#info3').text("You have selected " + $enemySelected.name + " to fight " + enemyOrder[numFought] + ".");

		$('#info4').text("Let the battle begin!");

		}

		else  {
			$('#info3').text("You can only fight one enemy at one time!").delay(2000).queue(function() {
			$('#info3').text("You have selected " + $enemySelected.name + " to fight " + enemyOrder[numFought] + "."); 
			$('#info3').dequeue();
			});
		}

	var numAttacks = 0;

	var attackBtn = $('<button>');
	attackBtn.attr('type', 'button');
	attackBtn.addClass("attbtn");
	attackBtn.attr('id', 'attack');
	attackBtn.text('Attack');

	gameSpace.append(attackBtn);
	$('#attack').hide();
	$('#attack').show(2000);

	$("#attack").on('click', function() {

		numAttacks++;
		var as = $playerSelected.ap*numAttacks;
			
		gameSpace.append("<p id='attackinfo'>You attacked: <br />"
			+ $enemySelected.name +  " sustained <br />" + as + " points of damage</p>"); 

		gameSpace.append("<p id='counterinfo'>" + $enemySelected.name + "<br />counter-attacked: <br />You sustained <br />"
			+  $enemySelected.cap + " points of damage</p>");  	

		gameSpace.append("<p id='againinfo'>Attack again to defeat your enemy!</p>");  	 



		});



});




}); /*document ready function return*/