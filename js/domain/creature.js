function Creature(name, attack, defense, speed, hp, images) {
	this.type = 'Creature';
	this.name = name;
	this.attack = attack;
	this.defense = defense;
	this.speed = speed;
	this.hp = hp;
	this.images = images;
	this.position = null;

	this.setPosition = function(x, y, direction) {
		this.position = new Position(x, y, direction);
	};
};

Creature.calculateWait = function(speed) {
	if (speed > 20) {
		speed = 20;
	}
	return 1400-(speed*50);
};