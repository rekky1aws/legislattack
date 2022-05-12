class Fighter {
	constructor (name, power, speed, maxHP, imageLink='placeholder.png', money=0, moneyCoeff=1, item=null) {
		this.name=name;
		this.imageLink="/images/"+imageLink;
		this.power=power; // De 0 à 250.
		this.speed=speed; // De 0 à 100.
		this.maxHP=maxHP;
		this.life=maxHP; // De 0 à 1000, 100x les pourcentages
		this.money=money;
		this.moneyCoeff=moneyCoeff;
		this.item=item;
	}

	display(i) {
		let resultStr="<div class=\"fighter flex flex-col justify-center items-center ease-in-out duration-200 active:scale-90 hover\" onclick=chooseFighter(this,"+i+")>";

		resultStr+="<img src=\""+this.imageLink+"\" alt=\""+this.name+"\" class=\"fighterImage rounded object-contain bg-white m-2 w-40 aspect-square\">";
		resultStr+="<div class=\"fighterName text-center text-sm md:text-xl\">"+this.name+"</div>";

		resultStr+="</div>";
		/*console.log(resultStr);*/
		return resultStr;
	}

	get attack() {
		return Math.floor(this.power*(0.5+Math.random()));
	}

	suffer(damage) {
		if(this.life-damage>0)
		{
			this.life-=damage;
		} else {
			this.life=0;
		}
	}

	heal(hp) {
		if(this.life+hp>=this.maxHP)
		{
			this.life=this.maxHP;
		} else {
			this.life+=hp;
		}
	}

}

class Item {
	constructor (name, description, effect, price, imageLink='/images/placeholder.png', numOfUses=1) {
		this.name=name;
		this.description=description;
		this.effect=effect;
		this.price=price;
		this.imageLink=imageLink;
		this.numOfUses=numOfUses;
	}
}