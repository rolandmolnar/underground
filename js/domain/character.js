Character.levels = [100, 300, 600, 1000, 1500, 2100, 2800, 3600, 4500, 
                    5500, 6600, 7800, 9100, 10500, 12000, 13600, 15300, 17100, 19000];

function Character(level, weapon, armor) {
	var character = Object.create(new Creature('Player', 1, 1, 1, 1, null));

	character.recalculate = function() {
		var lastLevel = this.level;
		this.level = 1;
		for (var i = 0; i < Character.levels.length; i++) {
			if (this.xp >= Character.levels[i]) {
				this.level = i+2; 
			} else {
				break;
			}
		}
		this.maxHp = this.level*10 + 40;
		this.attack = this.level + (this.weapon == null ? 0 : this.weapon.attackMod);
		this.defense = 10 + this.level + (this.armor == null ? 0 : this.armor.defenseMod);
		this.speed = this.level + (this.weapon == null ? 2 : this.weapon.speedMod) + 
			(this.armor == null ? 2 : this.armor.speedMod);
		if (this.weakened) {
			Game.player.attack -= 5;
			Game.player.defense -= 5;
			Game.player.speed -= 10;
		}
		if (this.level > lastLevel) {
			Message.print(this.name+' level up! New level: '+this.level, false);
			this.hp = this.maxHp;
		}
	};

	character.resetPoison = function() {
		if (this.poisonedInterval != null) {
			clearInterval(this.poisonedInterval);
			this.poisonedInterval = null;
		}
	};

	character.resetWeakened = function() {
		if (this.weakened) {
			this.weakened = false;
			Event.weakening(false);
		}
	};

	character.calculateMove = function(arrow) {
		var newPosX = this.position.x;
		var newPosY = this.position.y;
		var newDirection = this.position.direction;
		if (arrow == 'UP') {
			if (this.position.direction == 'NORTH') {
				newPosY--;
			} else if (this.position.direction == 'SOUTH') {
				newPosY++;
			} else if (this.position.direction == 'EAST') {
				newPosX++;
			} else if (this.position.direction == 'WEST') {
				newPosX--;
			}
		} else if (arrow == 'DOWN') {
			if (this.position.direction == 'NORTH') {
				newPosY++;
			} else if (this.position.direction == 'SOUTH') {
				newPosY--;
			} else if (this.position.direction == 'EAST') {
				newPosX--;
			} else if (this.position.direction == 'WEST') {
				newPosX++;
			}
		} else if (arrow == 'LEFT') {
			if (this.position.direction == 'NORTH') {
				newPosX--;
			} else if (this.position.direction == 'SOUTH') {
				newPosX++;
			} else if (this.position.direction == 'EAST') {
				newPosY--;
			} else if (this.position.direction == 'WEST') {
				newPosY++;
			}
		} else if (arrow == 'RIGHT') {
			if (this.position.direction == 'NORTH') {
				newPosX++;
			} else if (this.position.direction == 'SOUTH') {
				newPosX--;
			} else if (this.position.direction == 'EAST') {
				newPosY++;
			} else if (this.position.direction == 'WEST') {
				newPosY--;
			}
		} else if (arrow == 'TURN_LEFT') {
			if (this.position.direction == 'NORTH') {
				newDirection = 'WEST';
			} else if (this.position.direction == 'SOUTH') {
				newDirection = 'EAST';
			} else if (this.position.direction == 'EAST') {
				newDirection = 'NORTH';
			} else if (this.position.direction == 'WEST') {
				newDirection = 'SOUTH';
			}
		} else if (arrow == 'TURN_RIGHT') {
			if (this.position.direction == 'NORTH') {
				newDirection = 'EAST';
			} else if (this.position.direction == 'SOUTH') {
				newDirection = 'WEST';
			} else if (this.position.direction == 'EAST') {
				newDirection = 'SOUTH';
			} else if (this.position.direction == 'WEST') {
				newDirection = 'NORTH';
			}
		} else {
			throw 'Invalid movement: '+arrow;
		}
		return new Position(newPosX, newPosY, newDirection);
	};

	character.move = function(position) {
		if (Game.map.isWall(position.x, position.y)) {
			return 'WALL';
		}
		if (Game.map.isDoor(position.x, position.y)) {
			if (position.x == 0 || position.x == Game.map.width-1 || position.y == 0 || 
					position.y == Game.map.height-1) {
				return 'OUT';
			}
			return 'DOOR';
		}
		if (Monster.getIndexByPosition(position.x, position.y) != null) {
			return 'MONSTER';
		}
		if (Game.map.isDimensionDoor(position.x, position.y)) {
			return 'OUT';
		}
		this.setPosition(position.x, position.y, position.direction);
		return null;
	};

	character.savingThrow = function(modifier) {
		var mod = (modifier == null ? 0 : modifier);
		var percentage = ((this.level + mod) * 5 - 5);
		if (percentage > 95) {
			percentage = 95;
		} else if (percentage < 0) {
			percentage = 0;
		}
		var roll = Combat.roll(0, 100);
		if (roll < percentage) {
			Message.print('Successful saving throw!', false);
			return true;
		}
		return false;
	};

	character.pickUp = function() {
		var posX = this.position.x;
		var posY = this.position.y;
		if (!(posX in Game.map.items) || !(posY in Game.map.items[posX]) || Game.map.items[posX][posY].length == 0) {
			var nextPosition = this.position.getNextPosition();
			posX = nextPosition.x;
			posY = nextPosition.y;
		}
		if (posX in Game.map.items && posY in Game.map.items[posX]) {
			var items = Game.map.items[posX][posY];
			if (items.length > 0) {
				var topItem = items[items.length-1];
				if (topItem.type == 'Potion') {
					this.hp = ((this.hp + topItem.hpMod) > this.maxHp ? this.maxHp : this.hp + topItem.hpMod);
					Game.map.items[posX][posY].pop();
					Message.print('Gulp!', false);
					if (this.hp <= 0) {
						Combat.death();
					}
				} else if (topItem.type == 'Weapon') {
					var oldWeapon = this.weapon;
					this.weapon = topItem;
					Game.map.items[posX][posY].pop();
					if (oldWeapon != null) {
						Message.print(oldWeapon.name+' dropped', false);
						Game.map.items[posX][posY] = [];
						Game.map.items[posX][posY].push(oldWeapon);
						for (var i = 0; i < items.length; i++) {
							Game.map.items[posX][posY].push(items[i]);
						}
					}
					Message.print(topItem.name+' acquired', false);
				} else if (topItem.type == 'Armor') {
					var oldArmor = this.armor;
					this.armor = topItem;
					Game.map.items[posX][posY].pop();
					if (oldArmor != null) {
						Message.print(oldArmor.name+' dropped', false);
						Game.map.items[posX][posY] = [];
						Game.map.items[posX][posY].push(oldArmor);
						for (var i = 0; i < items.length; i++) {
							Game.map.items[posX][posY].push(items[i]);
						}
					}
					Message.print(topItem.name+' acquired', false);
				}
			}
		}
	};

	character.drop = function(item) {
		if (item != null) {
			var posX = this.position.x;
			var posY = this.position.y;
			if (!(posX in Game.map.items)) {
				Game.map.items[posX] = [];
			}
			if (!(posY in Game.map.items[posX])) {
				Game.map.items[posX][posY] = [];
			}
			var oldItemStack = Game.map.items[posX][posY];
			Game.map.items[posX][posY] = [];
			Game.map.items[posX][posY].push(item);
			if (oldItemStack != null) {
				for (var i = 0; i < oldItemStack.length; i++) {
					Game.map.items[posX][posY].push(oldItemStack[i]);
				}
			}
			if (item.type == 'Weapon') {
				this.weapon = null;
			} else if (item.type == 'Armor') {
				this.armor = null;
			}
			Message.print(item.name+' dropped', false);
		}
	};

	character.level = level;
	character.xp = (level > 1 ? Character.levels[level-2] : 0);
	character.weapon = weapon;
	character.armor = armor;
	character.type = 'Character';
	character.recalculate();
	character.hp = character.maxHp;
	character.blind = false;
	character.poisonedInterval = null;
	character.paralyzed = false;
	character.petrified = false;
	character.blind = false;
	character.weakened = false;

	return character;
};