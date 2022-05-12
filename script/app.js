// INITIALISATION
// Fighters
let fighterArr = [
	// Fighter(name, power, speed, maxHP, imageLink='placeholder.png', money=0, item=null)
	new Fighter('Union Populaire', 250, 2, 6504, 'union-populaire.png', 5),
	new Fighter('Les républicains', 200, 1, 7843, 'republicains.png'),
	new Fighter('Rassemblement National', 400, 1, 5749, 'rassemblement-national.png'),
	new Fighter('Reconquete', 400, 1, 5749, 'reconquete.jpg'),
	new Fighter('Parti Socialiste', 500, 0, 5555, 'ps.png'),
	new Fighter('Ensemble', 475, 3, 6666, 'ensemble.png'),
	new Fighter('Nouveau Parti Anticapitaliste', 500, 90, 10, 'npa.jpg'),
	new Fighter('Résistons', 500, 90, 10, 'resistons.png'),
	new Fighter('PopSchool', 500, 90, 10, 'popschool.png')
];
console.log(fighterArr);

let itemArr = [
	// Item(name, description, effect, price, imageLink='/images/placeholder.png', numOfUses=1)
	new Item('Petit Pot de Vin', 'Permet de regagner 300 points de vie', petitPotDeVin, 300)
];
console.log(itemArr);

let playerFighter = null;
let botFighter = null

// FUCNTIONS
// Items
function petitPotDeVin()
{
	playerFighter.heal(300);
}

// Jump to anchor
function jump(h){
    var url = location.href;               //Save down the URL without hash.
    location.href = "#"+h;                 //Go to the target element.
    history.replaceState(null,null,url);   //Don't like hashes. Changing it back.
}

// Fonctions to execute on load
function loadFighters () {
	console.log("Chargement des combattants");
	refChoiceGrid = document.getElementById("choice-grid");
	fighterArr.forEach( function(element, index) {
		refChoiceGrid.innerHTML+=element.display(index);
	});
}

function loadItems () {
	console.log("Chargement des objets dans le magasin");
	refShopGrid = document.getElementById("shop-grid");
	itemArr.forEach( function(element, index) {
		refShopGrid.innerHTML+=element.display(index);
	});
}

// On Load group
function loader () {
	loadFighters();
	jump('choice');
}

// Attack Functions
function playerAttack() {
	// Todo : Animation
	/*let refFoeImage=document.getElementById('foe-image');
	refFoeImage.style.transform = 'translate(50px, 0)'*/

	if (botFighter.life>0) {
		if(playerFighter.life>0)
		{
			botFighter.suffer(playerFighter.attack);
			refreshFight();
		} else {
			console.log("Vous ne pouvez pas attaquer, vous êtes mort");
		}
	} else {
		console.log("Ennemi deja mort");
	}
}

function botAttack() {
	// Todo : Animation
	/*let refPlayerImage=document.getElementById('player-image');
	refPlayerImage.style.transform = 'translate(-50px, 0)'*/

	if (playerFighter.life>0)
	{
		if (botFighter.life>0)
		{
			playerFighter.suffer(botFighter.attack);
			refreshFight();
			} else {
				console.log("L'ennemi ne vous attaque pas car il est déja vaincu");
			}
	} else {
		console.log("Joueur deja mort");
	}
}


// Attack Phase
function launchAttackPhase() {
	// Lancement de la phase d'attaque.
	console.log("Phase d'attaque lancée");

	if (playerFighter.speed > botFighter.speed) {
		playerAttack();
		setTimeout(botAttack, 1000);
	} else if (playerFighter.speed < botFighter.speed) {
		botAttack();
		setTimeout(playerAttack, 1000);
	} else {
		let firstRandom = Math.floor(Math.random()*2); // Si la speed est la même, on décide du premier à jouer au hasard.
		if (firstRandom) {
			playerAttack();
			setTimeout(botAttack, 1000);
		} else {
			botAttack();
			setTimeout(playerAttack, 1000);
		}
	}
	console.log("Vie Joueur : "+playerFighter.life);
	console.log("Vie Ennemi : "+botFighter.life)
}

// Money Functions
function makeMoney() {
	let refMoney = document.getElementById('money-disp');
	playerFighter.money+=playerFighter.moneyCoeff;
	refMoney.innerHTML=playerFighter.money+'$';
}

// Other functions
function chooseFighter(elt, fighterIndex) {
	let refChosenFighterDisp = document.getElementById('chosen-fighter-display');
	playerFighter = fighterArr[fighterIndex];
	refChosenFighterDisp.innerHTML = "Parti choisi : "+playerFighter.name;

	let botIndex=fighterIndex;
	while(botIndex===fighterIndex)
	{
		botIndex=Math.floor(Math.random()*fighterArr.length);
	}
	botFighter=fighterArr[botIndex];

	console.log(playerFighter);
}

function startFight() {
	// Debt du combat
	console.log("Début du Combat");

	let refMsgErr = document.getElementById('no-fighter-msg');

	if (!playerFighter) {
		/*console.log('Pas de parti selectionné');*/
		refMsgErr.style.right ='0';
	} else {	
		let refPlayerImage = document.getElementById('player-image');
		let refFoeImage = document.getElementById('foe-image');
		let refPlayerName = document.getElementById('player-name');
		let refFoeName = document.getElementById('foe-name');

		/*console.log(refPlayerImage);
		console.log(refFoeImage);
		console.log(refPlayerName);
		console.log(refFoeName);*/

		refPlayerImage.src=playerFighter.imageLink;
		refFoeImage.src=botFighter.imageLink;
		refPlayerName.innerHTML=playerFighter.name;
		refFoeName.innerHTML=botFighter.name;

		refreshFight();
		console.log('money before',playerFighter.money);

		jump('combat');
		refMsgErr.style.right ='-100%';

		setInterval(makeMoney, 100);
	 }
}

function refreshFight() {
	// Actualisation du Combat
	console.log('Actualisation du combat');
	let refPlayerHP = document.getElementById('player-hp');
	let refFoeHP = document.getElementById('foe-hp');
/*
	console.log(refPlayerHP);
	console.log(refFoeHP);*/

	refPlayerHP.style.width=Math.floor(playerFighter.life / playerFighter.maxHP * 100)+"%";
	refFoeHP.style.width=Math.floor(botFighter.life / botFighter.maxHP * 100)+"%";

}

