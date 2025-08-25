var Combat = function() {};

Combat.attack = function(attCreature, defCreature) {
	var roll = Combat.roll(1, 20);
	Message.print(attCreature.name+': attack roll '+roll, false);
	var damage = 0;
	if (roll > 1) {
		var attValue = attCreature.attack + roll;
		var defValue = defCreature.defense;
		if (attValue > defValue + 10) {
			var criticalHitExtraDamage = attValue - defValue - 10;
			damage = attValue - defValue + criticalHitExtraDamage;
			Message.print(attCreature.name+': critical hit', false);
		} else if (attValue > defValue) {
			damage = attValue - defValue;
		}
		if (roll >= 20) {
			damage += 10;
			Message.print(attCreature.name+': lucky hit', false);
		}
		defCreature.hp -= damage;
		if (damage > 0) {
			Message.print(attCreature.name+' does '+damage+' damage on '+defCreature.name, false);
		} else {
			Message.print(attCreature.name+': miss', false);
		}
	} else {
		Message.print(attCreature.name+': unlucky miss', false);
	}
	return damage;
};

Combat.death = function() {
	for (var i = 0; i < Game.monsters.length; i++) {
		if (Game.monsters[i] != null && Game.monsters[i].hp <= 0) {
			Message.print(Game.monsters[i].name+' is killed.', false);
			Game.player.xp += Game.monsters[i].xpValue;
			Message.print(Game.player.name+' has gained '+Game.monsters[i].xpValue+' XP', false);
			Game.player.recalculate();
			MazeUtil.drawLevelBar();
			MazeUtil.drawWeaponArmor();
			Game.monsters[i].thread.stop();
			Game.monsters[i] = null;
		}
	}
	MazeUtil.draw(Game.map.getViewCode(Game.player.position), false, Game.map.wall);
	if (Game.player.hp <= 0) {
		Game.player.resetPoison();
		Game.player.weakened = false;
		Game.player.paralyzed = false;
		Game.player.petrified = false;
		Game.player.blind = false;
		MazeUtil.drawHpBar();
		setTimeout(function() {
			MonsterThread.stopAllThreads();
			Message.print('You have been killed.', false);
			var backToSavePoint = confirm("You have been killed.\nPress OK to return to the last checkpoint, or Cancel to start the game again.");
			Event.actAbility(true);
			if (backToSavePoint == true) {
				Game.player = Game.saveInfo.player;
				Game.player.recalculate();
				Game.loadMap(Game.saveInfo.enterPosition);
			    Message.print('Returning to the last checkpoint...');
			} else {
				location.reload();
			}
		}, 800);
		return true;
	}
	return false;
};

Combat.roll = function(min, diff) {
	return Math.floor((Math.random()*diff + min));
};