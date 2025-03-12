function Item(name, speedMod, image) {
	this.name = name;
	this.speedMod = speedMod;
	this.image = image;
	this.type = 'Item';
};

function Weapon(name, attackMod, speedMod, image) {
	var weapon = Object.create(new Item(name, speedMod, image));
	weapon.attackMod = attackMod;
	weapon.type = 'Weapon';
	return weapon;
};

Weapon.get = function(weaponDesc) {
	var image;
	var attackMod = 1;
	var speedMod = 0;
	var splitted = weaponDesc.split('_');
	var name = splitted[0];
	if (splitted.length > 1) {
		attackMod = parseInt(splitted[1]);
	}
	if (name == 'Dagger') {
		image = 'image/dagger.png';
		speedMod = 2;
	} else if (name == 'QuarterStaff') {
		image = 'image/staff.png';
	} else if (name == 'ShortSword') {
		image = 'image/short_sword.png';
	} else if (name == 'SilverBlade') {
		image = 'image/silver_blade.png';
	} else if (name == 'LongSword') {
		image = 'image/long_sword.png';
		speedMod = -2;
	} else if (name == 'TwoHanded') {
		image = 'image/two_handed.png';
		speedMod = -4;
	} else if (name == 'MagicSword') {
		image = 'image/magic_sword.png';
	}
	if (splitted.length > 2) {
		speedMod = parseInt(splitted[2]);
	}
	return new Weapon(name, attackMod, speedMod, image);
};

function Armor(name, defenseMod, speedMod, image) {
	var armor = Object.create(new Item(name, speedMod, image));
	armor.defenseMod = defenseMod;
	armor.type = 'Armor';
	return armor;
};

Armor.get = function(armorDesc) {
	var image;
	var defenseMod = 1;
	var speedMod = 0;
	var splitted = armorDesc.split('_');
	var name = splitted[0];
	if (splitted.length > 1) {
		defenseMod = parseInt(splitted[1]);
	}
	if (name == 'LeatherArmor') {
		image = 'image/leather_armor.png';
	} else if (name == 'StuddedLeather') {
		image = 'image/studded_leather.png';
		speedMod = -2;
	} else if (name == 'ChainMail') {
		image = 'image/chain_mail.png';
		speedMod = -4;
	} else if (name == 'PlateMail') {
		image = 'image/plate_mail.png';
		speedMod = -6;
	} else if (name == 'FullPlate') {
		image = 'image/full_plate.png';
		speedMod = -8;
	}
	if (splitted.length > 2) {
		speedMod = parseInt(splitted[2]);
	}
	return new Armor(name, defenseMod, speedMod, image);
};

function Potion(name, hpMod, image) {
	var potion = Object.create(new Item(name, 0, image));
	potion.hpMod = hpMod;
	potion.type = 'Potion';
	return potion;
};

Potion.get = function(potionDesc) {
	var image = 'image/potion.png';
	var hpMod = 0;
	var splitted = potionDesc.split('_');
	var name = splitted[0];
	if (splitted.length > 1) {
		hpMod = parseInt(splitted[1]);
	}
	return new Potion(name, hpMod, image);
};