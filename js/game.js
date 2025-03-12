var Game = {
	system: null,
	map: null,
	player: null,
	monsters: null,
	visited: [],
	completed: [],
	saveInfo: {player: null, enterPosition: null}
};

Game.save = function(enterPosition) {
	Game.saveInfo.player = new Character(Game.player.level, Game.player.weapon, Game.player.armor);
	Game.saveInfo.player.xp = Game.player.xp;
	Game.saveInfo.enterPosition = enterPosition;
};

Game.loadMap = function(enterPosition, first) {
	Game.monsters = [];
	var initMode = Game.isCompleted(enterPosition.nextMapIdx) ? 'EMPTY' : 'COMPLETE';
	Game.map = MapUtil.getMap(Game.system, enterPosition.nextMapIdx, initMode);
	if (first != null && first) {
		var level = Game.getLevelFromUrl();
		Game.player = new Character(level == null ? MapSystem[Game.system].player.level : level, 
				MapSystem[Game.system].player.weapon, MapSystem[Game.system].player.armor);
		Game.player.position = enterPosition.initPosition;
	} else {
		Game.player.position = enterPosition.initPosition;
	}
	MonsterThread.startAllThreads();
	MazeUtil.drawWeaponArmor();
	var viewCode = Game.map.getViewCode(Game.player.position);
	MazeUtil.draw(viewCode, false, Game.map.wall);
	Game.save(enterPosition);
	document.getElementById('mapName').innerHTML = Game.map.name;
	Game.markAsVisited(enterPosition.nextMapIdx);
	Message.print("Entering the "+Game.map.name+"...", (first != null && first));
	MazeUtil.popUpInitEvent();
};

Game.isLastMap = function() {
	var index = null;
	var highest = null;
	for (var propertyName in MapSystem[Game.system]) {
		if (MapSystem[Game.system][propertyName].mapName != null) {
			var currIdx = parseInt(propertyName);
			highest = (highest == null || highest < currIdx ? currIdx : highest);
			if (Game.map.name == MapSystem[Game.system][propertyName].mapName) {
				index = currIdx;
			}
		} 
	}
	return (index != null && highest != null && index == highest);
};

Game.getEnterPosition = function(newPosition, arrow) {
	var position;
	var posX = newPosition.x;
	var posY = newPosition.y;
	if (Game.map.doors[posX] != null && Game.map.doors[posX][posY] != null) {
		position = Game.map.doors[posX][posY];
	} else if (Game.map.dimensions[posX] != null && Game.map.dimensions[posX][posY] != null) {
		position = Game.map.dimensions[posX][posY];
	} else {
		var nextMapIdx = Game.getMapIndex()+1;
		if (MapSystem[Game.system][nextMapIdx] == null) {
			return null;
		}
		position = new EnterPosition(nextMapIdx, MapSystem[Game.system][nextMapIdx].initPosition, MapSystem[Game.system].systemDirection);
	}
	return position;
};

Game.markAsVisited = function(level) {
	if (!Game.isVisited(level)) {
		Game.visited.push(level);
	}
};

Game.isVisited = function(level) {
	for (var i = 0; i < Game.visited.length; i++) {
		if (Game.visited[i] == level) {
			return true;
		}
	}
	return false;
};

Game.markAsCompleted = function(level) {
	if (!Game.isCompleted(level)) {
		Game.completed.push(level);
	}
};

Game.isCompleted = function(level) {
	for (var i = 0; i < Game.completed.length; i++) {
		if (Game.completed[i] == level) {
			return true;
		}
	}
	return false;
};

Game.getMapIndex = function(mapName) {
	if (mapName == null && Game.map != null && Game.map.name != null) {
		mapName = Game.map.name;
	}
	for (var propertyName in MapSystem[Game.system]) {
		if (MapSystem[Game.system][propertyName].mapName != null && 
				mapName == MapSystem[Game.system][propertyName].mapName) {
			return parseInt(propertyName);
		}
	}
	return 0;
};

Game.getParamFromUrl = function(paramName) {
	var url = window.location.href;
	var queries = url.split("?");
	var querySection = queries[queries.length-1];
	var params = querySection.split("&");
	for (var i = 0; i < params.length; i++) {
		var param = params[i].split("=");
		if (param.length == 2 && param[0] == paramName) {
			return param[1];
		}
	}
	return null;
};

Game.getSystemFromUrl = function() {
	var system = Game.getParamFromUrl("system");
	if (system != null) {
		if (system in MapSystem) {
			return system;
		}
	}
	for (var propertyName in MapSystem) {
		return propertyName;
	}
	return null;
};

Game.getLevelFromUrl = function() {
	var levelStr = Game.getParamFromUrl("level");
	if (levelStr == null) {
		return null;
	}
	var level = parseInt(levelStr);
	if (level < 1) {
		level = 1;
	} else if (level > Character.levels.length+1) {
		level = Character.levels.length+1;
	}
	return level;
};