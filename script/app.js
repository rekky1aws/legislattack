// INITIALISATION
// Fighters
let fighterArr = [
	// Fighter(name, power, speed, maxHP, imageLink='placeholder.png', money=0, item=null)
	new Fighter('Union Populaire', 250, 2, 6504, 'union-populaire.png', 5),
	new Fighter('Les républicains', 200, 1, 7843, 'republicains.png'),
	new Fighter('Rassemblement National', 400, 1, 5749, 'rassemblement-national.png')/*,
	new Fighter('Reconquete', 400, 1, 5749, 'reconquete.jpg'),
	new Fighter('Parti Socialiste', 500, 0, 5555, 'ps.png'),
	new Fighter('Ensemble', 475, 3, 6666, 'ensemble.png'),
	new Fighter('Nouveau Parti Anticapitaliste', 500, 90, 10, 'npa.jpg'),
	new Fighter('Résistons', 500, 90, 10, 'resistons.png'),
	new Fighter('PopSchool', 500, 90, 10, 'popschool.png')*/
];
console.log(fighterArr);

let itemArr = [
	// Item(name, description, effect, price, imageLink='/images/placeholder.png', numOfUses=1)
	new Item('Petit Pot de Vin', 'Permet de regagner 300 points de vie', petitPotDeVin, 300, 'petit_pot_de_vin.png'),
	new Item('Pot de Vin Moyen', 'Permet de regagner 750 points de vie', moyenPotDeVin, 700, 'moyen_pot_de_vin.png'),
	new Item('Grand Pot de Vin', 'Permet de regagner 2000 points de vie', grandPotDeVin, 1900, 'gros_pot_de_vin.png'),
];
console.log(itemArr);

let playerFighter = null;
let botFighter = null;
let selectedItem = null;

// FUCNTIONS
// Jump to anchor
function jump(h){
    var url = location.href;               //Save down the URL without hash.
    location.href = "#"+h;                 //Go to the target element.
    history.replaceState(null,null,url);   //Don't like hashes. Changing it back.
}

// Use Item
function useItem () {
	if(playerFighter.item) {
		playerFighter.item.effect();
		playerFighter.item=null;
		refreshFight();
	} else {
		console.log("Vous n'avez pas d'objet équipé");
		// A changer en affichage dans la page.
	}
}

// Functions to execute on load
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
	loadItems();
	refreshShop();
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
	let refMoneyFight = document.getElementById('money-disp-fight');
	let refMoneyShop = document.getElementById('money-disp-shop');
	playerFighter.money+=playerFighter.moneyCoeff;
	refMoneyFight.innerHTML=playerFighter.money+'$';
	refMoneyShop.innerHTML=playerFighter.money+'$';
}

// Other functions
// Select fighter
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

// Refresh Shop display
function refreshShop () {
	let refChosenItemDisp = document.getElementById('chosen-item-display');
	if (selectedItem)
	{
		refChosenItemDisp.innerHTML = "<div class=\"selectedItemDisp text-center\">Objet Choisi :</div>";
		refChosenItemDisp.innerHTML += "<div class=\"selectedItemName font-bold text-xl text-center\">"+selectedItem.name+"</div>";
		refChosenItemDisp.innerHTML += "<div class=\"selectedItemDescription text-center italic\">"+selectedItem.description+"</div>";	
	} else {
		refChosenItemDisp.innerHTML = "<div class=\"text-center\">Choisissez un objet a acheter<div>";
	}
	
}

// Select Item
function chooseItem (elt, itemIndex) {
	selectedItem = itemArr[itemIndex];
	refreshShop();

	console.log(selectedItem);
}

// Go to fight phase
function startFight() {
	// Debt du combat
	console.log("Début du Combat");

	let refMsgErrChoice = document.getElementById('no-fighter-msg');

	if (!playerFighter) {
		/*console.log('Pas de parti selectionné');*/
		refMsgErrChoice.style.right ='0';
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
		refMsgErrChoice.style.right ='-100%';

		setInterval(makeMoney, 100);
	 }
}

// Validate Item
function validateItem () {
	console.log("Validation de l'item");

	let refMsgErrShop = document.getElementById('no-item-msg');
	let refMsgNoMoney = document.getElementById('no-money-msg');
	let refMsgSpace = document.getElementById('no-space-msg');

	if (!selectedItem) {
		refMsgErrShop.style.display = 'block';
	} else {
		if (playerFighter.money - selectedItem.price > 0)
		{
			if (playerFighter.item) {
				refMsgSpace.style.display = 'block';
			} else {
				playerFighter.item = selectedItem;
				playerFighter.money -= selectedItem.price;
				selectedItem = null;
				hideErrorMessages();
				refreshShop();
				jump('combat');
			}
		} else {
			refMsgNoMoney.style.display = 'block';
		}
	}
}

function hideErrorMessages () {
	let refMsgErrShop = document.getElementById('no-item-msg');
	let refMsgNoMoney = document.getElementById('no-money-msg');
	let refMsgSpace = document.getElementById('no-space-msg');

	refMsgErrShop.style.display = 'none';
	refMsgNoMoney.style.display = 'none';
	refMsgSpace.style.display = 'none';
}

// Refresh Fight zone display
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

