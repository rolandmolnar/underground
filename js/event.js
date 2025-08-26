var Event = {
	keyPressed: false
};

Event.init = function() {
	Message.print("Game started.");
	Canvas.elem = document.getElementById('gameCanvas');
	Canvas.elem.width = Config.canvasWidth;
	Canvas.elem.height = Config.canvasHeight;
	Game.system = Game.getSystemFromUrl();
	var sysLvlIdx = 0;
	Game.loadMap(new EnterPosition(sysLvlIdx, MapSystem[Game.system][sysLvlIdx].initPosition), true);

	document.getElementById('app').onkeydown = function(e) {
		if (!Event.keyPressed) {
			Event.keyPressed = true;
			var event = window.event ? window.event : e;
			if ((event.keyCode == '37' || event.keyCode == '65') && !document.getElementById('turnLeftArrow').disabled) {
				Event.move('TURN_LEFT');
			} else if ((event.keyCode == '38' || event.keyCode == '87') && !document.getElementById('upArrow').disabled) {
				Event.move('UP');
			} else if ((event.keyCode == '39' || event.keyCode == '68') && !document.getElementById('turnRightArrow').disabled) {
				Event.move('TURN_RIGHT');
			} else if ((event.keyCode == '40' || event.keyCode == '83') && !document.getElementById('downArrow').disabled) {
				Event.move('DOWN');
			} else if ((event.keyCode == '32' || event.keyCode == '17') && !document.getElementById('attackButton').disabled) {
				Event.attack();
			} else if (event.keyCode == '16' && !document.getElementById('weapon').disabled && !document.getElementById('armor').disabled) {
				Event.pickUp();
			}
		}
	};
	
	document.getElementById('app').onkeyup = function(e) {
		Event.keyPressed = false;
	};
};

Event.move = function(arrow) {
	var moveRes;
	var newPosition = Game.player.position;
	if (Game.isLastMap() && !Monster.archEnemyExists()) {
		moveRes = 'OUT';
	} else {
		newPosition = Game.player.calculateMove(arrow);
		moveRes = Game.player.move(newPosition);
	}
	if (moveRes == null || moveRes == 'OPENDOOR') {
		if (Message.getLastLine() != Game.player.position.direction) {
			Message.print(Game.player.position.direction, false);
		}
		var viewCode = Game.map.getViewCode(Game.player.position);
		MazeUtil.draw(viewCode, false, Game.map.wall);
	} else if (moveRes == 'WALL') {
		Message.print("You can't go that way.", false);
	} else if (moveRes == 'MONSTER') {
		Message.print("You can't go that way. A monster is there!", false);
	} else if (moveRes == 'DOOR') {
		Message.print("The door is locked.", false); 
	} else if (moveRes == 'OUT') {
		var enterPosition = Game.getEnterPosition(newPosition, arrow);
		if (!Game.isLastMap() || // or it is the last map, but ...
			(enterPosition != null && enterPosition.nextMapIdx != null && enterPosition.nextMapIdx < Game.getMapIndex())) {
			var sysDirText = '';
			if (enterPosition.systemDirection == 'UP') {
				sysDirText = " Going up...";
			} else if (enterPosition.systemDirection == 'DOWN') {
				sysDirText = " Going down...";
			} else {
				sysDirText = " Opening it...";
			}
			Message.print("You have found an exit door."+sysDirText);
		}
		MonsterThread.stopAllThreads();
		if (!Game.isLastMap() && !Game.isVisited(enterPosition.nextMapIdx) && 
				Game.map.xpValue != null && Game.map.xpValue > 0) {
			Game.player.xp += Game.map.xpValue;
			Message.print(Game.player.name+' has gained '+Game.map.xpValue+' XP', false);
			Game.player.recalculate();
			Game.markAsCompleted(Game.getMapIndex());
		}
		MazeUtil.popUpEndEvent();
		if (Game.isLastMap() && (enterPosition == null || enterPosition.nextMapIdx == null || 
				enterPosition.nextMapIdx >= Game.getMapIndex())) {
			alert('You have completed the game.');
			location.reload();
		} else {
			Game.loadMap(enterPosition);
		}
	}
};

Event.attack = function() {
	var nextPos = Game.player.position.getNextPosition();
	var monsterToAttack = Monster.getIndexByPosition(nextPos.x, nextPos.y);
	if (monsterToAttack != null) {
		if (Game.monsters[monsterToAttack].doSpecDef()) {
			var damage = Combat.attack(Game.player, Game.monsters[monsterToAttack]);
			if (Game.monsters[monsterToAttack].isMoving == null) {
				Game.monsters[monsterToAttack].isMoving = true;
			}
			if (damage > 0) {
				Combat.death();
				MazeUtil.draw(Game.map.getViewCode(Game.player.position), true, Game.map.wall);
			}
		}
	}
	Event.attackAbility(false);
	setTimeout(function() {
		if (!Game.player.paralyzed) {
			Event.attackAbility(true);
		}
	}, Creature.calculateWait(Game.player.speed));
};

Event.attackAbility = function(enabled) {
	document.getElementById('attackButton').disabled = !enabled;
};

Event.moveAbility = function(enabled) {
	document.getElementById('turnLeftArrow').disabled = !enabled;
	document.getElementById('turnRightArrow').disabled = !enabled;
	document.getElementById('leftArrow').disabled = !enabled;
	document.getElementById('rightArrow').disabled = !enabled;
	document.getElementById('upArrow').disabled = !enabled;
	document.getElementById('downArrow').disabled = !enabled;
};

Event.equipAbility = function(enabled) {
	document.getElementById('weapon').disabled = !enabled;
	document.getElementById('armor').disabled = !enabled;
};

Event.actAbility = function(enabled) {
	Event.attackAbility(enabled);
	Event.moveAbility(enabled);
	Event.equipAbility(enabled);
};

Event.dropWeapon = function() {
	Game.player.drop(Game.player.weapon);
	Game.player.recalculate();
	MazeUtil.drawWeaponArmor();
	MazeUtil.draw(Game.map.getViewCode(Game.player.position), false, Game.map.wall);
};

Event.dropArmor = function() {
	Game.player.drop(Game.player.armor);
	Game.player.recalculate();
	MazeUtil.drawWeaponArmor();
	MazeUtil.draw(Game.map.getViewCode(Game.player.position), false, Game.map.wall);
};

Event.pickUp = function() {
	Game.player.pickUp();
	Game.player.recalculate();
	MazeUtil.drawWeaponArmor();
	MazeUtil.draw(Game.map.getViewCode(Game.player.position), false, Game.map.wall);
};