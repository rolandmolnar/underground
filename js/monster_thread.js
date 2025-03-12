function MonsterThread(index) {
	this.index = index;
	this.thread = null;
	this.lastViewCode = null;

	this.start = function() {
		this.thread = setInterval(function() {
			var move = false;
			var viewCode = Game.map.getViewCode(Game.player.position);
			var firstAppear = (this.lastViewCode == null || this.lastViewCode != viewCode);
			var maxPos = Math.min(Math.floor((viewCode.length-2) / 2), Config.maze.length);
			var wasInPlayersView = (Game.monsters[index].getDistanceFromPlayer(maxPos) > -1);
			if (Game.monsters[index].position.isNeighborPosition(Game.player.position.x, Game.player.position.y)) {
				if (Game.monsters[index].isMoving == null) {
					Game.monsters[index].isMoving = true;
				}
				if (Game.monsters[index].doSpecAtt()) {
					if (Game.player.hp > 0) {
						var damage = Combat.attack(Game.monsters[index], Game.player);
						if (damage > 0) {
							Combat.death();
							var nextPos = Game.player.position.getNextPosition();
							if (Game.monsters[index].position.x != nextPos.x || Game.monsters[index].position.y != nextPos.y) {
								MazeUtil.drawBackstab();
							}
						}
					}
				}
			} else if (Game.monsters[index].isMoving) {
				if (Game.monsters[index].doSpecMov()) {
					var nextMove = Game.monsters[index].move();
					if (Game.map.getField(nextMove.x, nextMove.y) == ' ' && Monster.getIndexByPosition(nextMove.x, nextMove.y) == null && 
							!(nextMove.x == Game.player.position.x && nextMove.y == Game.player.position.y)) {
						Game.monsters[index].setPosition(nextMove.x, nextMove.y, nextMove.direction);
						move = true;
					}
				}
			}
			var isInPlayersView = (Game.monsters[index].getDistanceFromPlayer(maxPos) > -1);
			if ((firstAppear || move) && (wasInPlayersView || isInPlayersView)) {
				MazeUtil.draw(viewCode, false, Game.map.wall);
				this.lastViewCode = viewCode;
			}
		}, Creature.calculateWait(Game.monsters[index].speed));
	};

	this.stop = function() {
		clearInterval(this.thread);
	};
};

MonsterThread.startAllThreads = function() {
	for (var i = 0; i < Game.monsters.length; i++) {
		if (Game.monsters[i] != null) {
			Game.monsters[i].thread = new MonsterThread(i);
			Game.monsters[i].thread.start();
		}
	}
};

MonsterThread.stopAllThreads = function() {
	for (var i = 0; i < Game.monsters.length; i++) {
		if (Game.monsters[i] != null && Game.monsters[i].thread != null) {
			Game.monsters[i].thread.stop();
		}
	}
};