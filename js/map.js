function Map(name, width, initPosition, map, wall, initMode, xpValue, labels) {

	this.createObjects = function(initMode) {
		if (initMode == 'COMPLETE') {
			if (this.labels['EVENT_INIT'] != null) {
				this.initEvent = this.labels['EVENT_INIT'];
			}
			if (this.labels['EVENT_END'] != null) {
				this.endEvent = this.labels['EVENT_END'];
			}
		}
		for (var i = 0; i < this.map.length; i++) {
			var posX = i % this.width;
			var posY = Math.floor(i / this.width);
			var field = this.map.charAt(i);
			if (field in this.labels) {
				var isDoor = false;
				var isDimensionDoor = false;
				var splitted = this.labels[field].split('~');
				for (var j = 0; j < splitted.length; j++) {
					var objType = splitted[j].substring(0, splitted[j].indexOf('/'));
					var concreteObj = splitted[j].substring(objType.length+1);
					if (initMode == 'COMPLETE') {
						if (objType == 'MONSTER') {
							var isMoving = true;
							var isArchEnemy = false;
							if (concreteObj.indexOf('OnHold') > -1) {
								isMoving = false;
							} else if (concreteObj.indexOf('Guarding') > -1) {
								isMoving = null;
							}
							if (concreteObj.indexOf('ArchEnemy') > -1) {
								isArchEnemy = true;
							}
							var parIdx = concreteObj.indexOf('(');
							if (parIdx > -1) {
								concreteObj = concreteObj.substring(0, parIdx);
							}
							var monster = Monster.get(concreteObj);
							monster.isMoving = isMoving;
							monster.isArchEnemy = isArchEnemy;
							monster.setPosition(posX, posY, Monster.directions[Combat.roll(0, 4)]);
							Game.monsters.push(monster);
						} else if (objType == 'EVENT') {
							if (!(posX in this.events)) {
								this.events[posX] = [];
							}
							this.events[posX][posY] = concreteObj;
						} else {
							if (!(posX in this.items)) {
								this.items[posX] = [];
							}
							if (!(posY in this.items[posX])) {
								this.items[posX][posY] = [];
							}
							if (objType == 'WEAPON') {
								this.items[posX][posY].push(Weapon.get(concreteObj));
							} else if (objType == 'ARMOR') {
								this.items[posX][posY].push(Armor.get(concreteObj));
							} else if (objType == 'POTION') {
								this.items[posX][posY].push(Potion.get(concreteObj));
							}
						}
					}
					if (objType == 'DOOR' || objType == 'DIMENSION') {
						if (objType == 'DOOR') {
							isDoor = true;
							if (!(posX in this.doors)) {
								this.doors[posX] = [];
							}
						} else if (objType == 'DIMENSION') {
							isDimensionDoor = true;
							if (!(posX in this.dimensions)) {
								this.dimensions[posX] = [];
							}
						}
						var splittedDoor = concreteObj.split('_');
						var sysDir = splittedDoor[0];
						var nextMapIdx = Game.getMapIndex(this.name)+1;
						if (splittedDoor.length > 1) {
							nextMapIdx = parseInt(splittedDoor[1]);
						}
						var initPosRef = MapSystem[Game.system][nextMapIdx] == null ? null : MapSystem[Game.system][nextMapIdx].initPosition;
						var initPos = new Position(null, null, null);
						if (initPosRef != null) {
							initPos = new Position(initPosRef.x, initPosRef.y, initPosRef.direction);
						}
						if (splittedDoor.length > 3) {
							initPos.x = parseInt(splittedDoor[2]);
							initPos.y = parseInt(splittedDoor[3]);
						}
						if (splittedDoor.length > 4) {
							initPos.direction = splittedDoor[4];
						}
						if (objType == 'DOOR') {
							this.doors[posX][posY] = new EnterPosition(nextMapIdx, initPos, sysDir);
						} else if (objType == 'DIMENSION') {
							this.dimensions[posX][posY] = new EnterPosition(nextMapIdx, initPos, sysDir);
						}
					}
				}
				var end = this.map.substr(i+1);
				this.map = this.map.substr(0, i);
				if (isDoor) {
					this.map += 'D';
				} else if (isDimensionDoor) {
					this.map += 'Z';
				} else {
					this.map += ' ';
				}
				this.map += end;
			}
		}
		if (initMode == 'COMPLETE' && !Monster.archEnemyExists()) {
			Monster.setArchEnemyToAll();
		}
	};

	this.getField = function() {
		return this.getField(this.position.x, this.position.y);
	};

	this.getField = function(x, y) {
		var mapInd = (y * this.width) + x;
		return this.map.charAt(mapInd);
	};

	this.getViewCode = function(position) {
		var limit = Config.maze.length;
		var code = '';
		var posX = position.x;
		var posY = position.y;
		var lastPosX = position.x;
		var lastPosY = position.y;
		for (var i = 0; i < Config.maze.length+1; i++) {
			if (position.direction == 'NORTH') {
				code += this.getField(posX-1, posY);
				code += this.getField(posX+1, posY);
				posY--;
			} else if (position.direction == 'SOUTH') {
				code += this.getField(posX+1, posY);
				code += this.getField(posX-1, posY);
				posY++;
			} else if (position.direction == 'EAST') {
				code += this.getField(posX, posY-1);
				code += this.getField(posX, posY+1);
				posX++;
			} else if (position.direction == 'WEST') {
				code += this.getField(posX, posY+1);
				code += this.getField(posX, posY-1);
				posX--;
			}
			if (this.isWall(lastPosX, lastPosY)) {
				code += 'X';
				break;
			} else if (this.isIllusionaryWall(lastPosX, lastPosY)) {
				if (i != 0) {
					code += 'S';
					break;
				}
			} else if (this.isDoor(lastPosX, lastPosY)) {
				code += 'D';
				break;
			} else if (this.isOpenDoor(lastPosX, lastPosY)) {
				if (i != 0) {
					code += 'O';
					break;
				}
			} else if (this.isDimensionDoor(lastPosX, lastPosY)) {
				code += 'Z';
				break;
			} else if (i == Config.maze.length) {
				code += ' ';
				break;
			}
			lastPosX = posX;
			lastPosY = posY;
		}
		return code;
	};

	this.isWall = function(x, y) {
		return this.getField(x, y) == 'X';
	};

	this.isIllusionaryWall = function(x, y) {
		return this.getField(x, y) == 'S';
	};

	this.isDoor = function(x, y) {
		return this.getField(x, y) == 'D';
	};

	this.isOpenDoor = function(x, y) {
		return this.getField(x, y) == 'O';
	};

	this.isDimensionDoor = function(x, y) {
		return this.getField(x, y) == 'Z';
	};

	// constructor
	if (width <= 0) {
		throw 'Width must be positive.';
	}
	if (map.length % width != 0) {
		throw 'The map must be rectangle shaped and its width must be set correctly.';
	}
	this.name = name;
	this.xpValue = xpValue;
	this.map = map;
	this.wall = wall;
	this.width = Math.floor(width);
	this.height = Math.floor(map.length / width);
	this.initPosition = initPosition;
	this.labels = labels;
	this.items = [];
	this.initEvent = null;
	this.endEvent = null;
	this.events = [];
	this.doors = [];
	this.dimensions = [];
	this.createObjects(initMode);
};

var MapUtil = function() {};
MapUtil.getMap = function(systemName, idx, initMode) {
	return new Map(MapSystem[systemName][idx].mapName, MapSystem[systemName][idx].width, 
			MapSystem[systemName][idx].initPosition, MapSystem[systemName][idx].map, MapSystem[systemName][idx].wall, 
			initMode, MapSystem[systemName][idx].xpValue, MapSystem[systemName][idx].labels);
};