function Monster(name, attack, defense, speed, hp, images, xpValue, doSpecAtt, doSpecDef, doSpecMov, imgYPosAdjustment) {
	var monster = Object.create(new Creature(name, attack, defense, speed, hp, images));
	monster.isMoving = true;
	monster.isArchEnemy = false;
	monster.xpValue = xpValue;
	monster.type = 'Monster';
	monster.thread = null;
	monster.imgYPosAdjustment = imgYPosAdjustment;

	monster.getDistanceFromPlayer = function(maxPos) {
		if (Game.player.position.direction == 'NORTH' && this.position.x == Game.player.position.x && 
				this.position.y < Game.player.position.y && Game.player.position.y - this.position.y < maxPos) {
			return Game.player.position.y - this.position.y;
		} else if (Game.player.position.direction == 'SOUTH' && this.position.x == Game.player.position.x && 
				this.position.y > Game.player.position.y && this.position.y - Game.player.position.y < maxPos) {
			return this.position.y - Game.player.position.y;
		} else if (Game.player.position.direction == 'EAST' && this.position.y == Game.player.position.y && 
				this.position.x > Game.player.position.x && this.position.x - Game.player.position.x < maxPos) {
			return this.position.x - Game.player.position.x;
		} else if (Game.player.position.direction == 'WEST' && this.position.y == Game.player.position.y && 
				this.position.x < Game.player.position.x && Game.player.position.x - this.position.x < maxPos) {
			return Game.player.position.x - this.position.x;
		}
		return -1;
	};

	monster.move = function() {
		var nextMove = this.position.getNextPosition();
		nextMove.direction = this.position.direction;
		if (Game.map.getField(nextMove.x, nextMove.y) != ' ' || Monster.getIndexByPosition(nextMove.x, nextMove.y) != null || 
				(nextMove.x == Game.player.position.x && nextMove.y == Game.player.position.y)) {
			var tried = [];
			tried.push(this.position.direction);
			for (var i = 0; i < 3; i++) {
				var nextPossDirection;
				do {
					nextPossDirection = Monster.directions[Combat.roll(0, 4)];
				} while (tried.indexOf(nextPossDirection) != -1);
				nextMove = (new Position(this.position.x, this.position.y, nextPossDirection)).getNextPosition();
				if (Game.map.getField(nextMove.x, nextMove.y) == ' ' && 
						Monster.getIndexByPosition(nextMove.x, nextMove.y) == null && 
						!(nextMove.x == Game.player.position.x && nextMove.y == Game.player.position.y)) {
					nextMove.direction = nextPossDirection;
					break;
				}
				tried.push(nextPossDirection);
			}
		}
		return nextMove;
	};

	monster.doSpecAtt = function() { return true; };
	if (doSpecAtt != null && typeof(doSpecAtt) === 'function') {
		monster.doSpecAtt = doSpecAtt;
	};
	monster.doSpecDef = function() { return true; };
	if (doSpecDef != null && typeof(doSpecDef) === 'function') {
		monster.doSpecDef = doSpecDef;
	};
	monster.doSpecMov = function() { return true; };
	if (doSpecMov != null && typeof(doSpecMov) === 'function') {
		monster.doSpecMov = doSpecMov;
	};

	return monster;
};

Monster.directions = ['NORTH', 'SOUTH', 'EAST', 'WEST'];

Monster.get = function(type) {
	if (type == 'GOBLIN') {
		return new Monster('Goblin', 4, 10, 1, Combat.roll(13, 8), {move: 'image/goblin.png', 
			bleed: 'image/goblin_bl.png'}, 20);
	} else if (type == 'KOBOLD') {
		return new Monster('Kobold', 2, 9, 6, Combat.roll(10, 5), {move: 'image/kobold.png', 
			bleed: 'image/kobold_bl.png'}, 12);
	} else if (type == 'KOBOLD_CHIEFTAIN') {
		return new Monster('Kobold Chieftain', 6, 16, 4, 35, {move: 'image/goblin.png', 
			bleed: 'image/goblin_bl.png'}, 35);
	} else if (type == 'ZOMBIE') {
		return new Monster('Zombie', 3, 14, -8, Combat.roll(10, 20), {move: 'image/zombie.png', 
			bleed: 'image/zombie_bl.png'}, 30);
	} else if (type == 'GHOUL') {
		return new Monster('Ghoul', 5, 17, -2, Combat.roll(20, 20), {move: 'image/ghoul.png', 
			bleed: 'image/ghoul_bl.png'}, 45, function() {
				var roll = Combat.roll(1, 3);
				if (Game.player.poisonedInterval == null && !Game.player.paralyzed && roll == 1) {
					Game.player.poisonedInterval = true;
					Message.print('Ghoul attacks with poisonous breath.', false);
					MazeUtil.drawGreenCloud();
					var that = this;
					setTimeout(function() {
						if (that.position.isNeighborPosition(Game.player.position.x, Game.player.position.y)) {
							if (!Game.player.savingThrow()) {
								Game.player.paralyzed = true;
								Event.actAbility(false);
								Message.print(Game.player.name+' is paralyzed.', false);
								setTimeout(function() {
									Game.player.paralyzed = false;
									Event.actAbility(true);
								}, 4000);
							}
							if (!Game.player.savingThrow()) {
								Message.print(Game.player.name+' is poisoned.', false);
								Game.player.poisonedInterval = setInterval(function() {
									if (Game.player.poisonedInterval != null) {
										var damage = Combat.roll(1, 10);
										Game.player.hp -= damage;
										Message.print('Poison takes effect on '+Game.player.name+' and causes '+damage+' damage.', false);
										Combat.death();
									}
								}, 5000);
								setTimeout(function() {
									Game.player.resetPoison();
								}, 26000);
							}
						} else {
							Game.player.poisonedInterval = null;
							Message.print('The poisonous cloud misses '+Game.player.name+'.', false);
						}
					}, 800);
					return false;
				}
				return true;
			});
	} else if (type == 'GORGON') {
		return new Monster('Gorgon', 10, 19, -4, Combat.roll(70, 30), {move: 'image/gorgon.png', 
			bleed: 'image/gorgon_bl.png'}, 105, function() {
				var roll = Combat.roll(1, 4);
				if (!Game.player.petrified && !Game.player.paralyzed && (this.firstBreath == null || this.firstBreath == false || roll == 1)) {
					this.firstBreath = true;
					Message.print('Gorgon attacks with petrifying breath.', false);
					MazeUtil.drawGreenCloud();
					var that = this;
					setTimeout(function() {
						if (that.position.isNeighborPosition(Game.player.position.x, Game.player.position.y) && !Game.player.savingThrow()) {
							Game.player.paralyzed = true;
							Event.actAbility(false);
							Game.player.petrified = true;
							Message.print(Game.player.name+' is being petrified.', false);
							setTimeout(function() {
								if (Game.player.petrified) {
									if (Game.player.savingThrow()) {
										Game.player.petrified = false;
										if (Game.player.paralyzed) {
											Game.player.paralyzed = false;
											Event.actAbility(true);
										}
										Message.print('Petrification of '+Game.player.name+' is reversed.', false);
									} else {
										Game.player.hp = 0;
										Message.print('Petrification of '+Game.player.name+' is complete.', false);
										Combat.death();
									}
								}
							}, 4000);
						} else {
							Message.print('The petrifying breath misses '+Game.player.name+'.', false);
						}
					}, 800);
					return false;
				}
				return true;
			});
	} else if (type == 'GIANT_TOAD') {
		return new Monster('Giant Toad', 7, 15, 11, Combat.roll(35, 30), {move: 'image/toad.png', 
			bleed: 'image/toad_bl.png'}, 60);
	} else if (type == 'FOMORIAN_GIANT') {
		return new Monster('Fomorian Giant', 15, 21, 5, Combat.roll(120, 20), {move: 'image/fomorian_giant.png', 
			bleed: 'image/fomorian_giant_bl.png'}, 170);
	} else if (type == 'FIRE_GIANT') {
		return new Monster('Fire Giant', 21, 26, 3, Combat.roll(110, 40), {move: 'image/fire_giant.png', 
			bleed: 'image/fire_giant_bl.png'}, 200);
	} else if (type == 'FIRE_GIANT_KING') {
		return new Monster('Fire Giant King', 25, 28, 4, 160, {move: 'image/fire_giant.png', 
			bleed: 'image/fire_giant_bl.png'}, 230);
	} else if (type == 'INTELLECT_DEVOURER') {
		return new Monster('Intellect Devourer', 13, 16, 8, Combat.roll(30, 40), {move: 'image/intellect_devourer.png', 
			bleed: 'image/intellect_devourer_bl.png'}, 110, function() {
				var isInPlayersView = (this.getDistanceFromPlayer(2) > -1);
				if (isInPlayersView) {
					var roll = Combat.roll(1, 5);
					if (!Game.player.paralyzed && roll == 1) {
						Message.print('Intellect Devourer attacks with Psionic energy.', false);
						if (!Game.player.savingThrow()) {
							Game.player.paralyzed = true;
							Event.actAbility(false);
							Message.print(Game.player.name+' is paralyzed by Psionic energy.', false);
							setTimeout(function() {
								Game.player.paralyzed = false;
								Event.actAbility(true);
							}, 4000);
						} else {
							Message.print('Psionic energy misses '+Game.player.name+'.', false);
						}
						return false;
					} else if (roll == 2) {
						Message.print('Intellect Devourer attacks with Psionic energy.', false);
						if (!Game.player.savingThrow()) {
							var damage = 25;
							Game.player.hp -= damage;
							Message.print(Game.player.name+' is hit by Psionic energy and suffers '+damage+' damage.', false);
							Combat.death();
						} else {
							Message.print('Psionic energy misses '+Game.player.name+'.', false);
						}
						return false;
					}
				}
				return true;
			}, null, function() { // move
				var viewCode = Game.map.getViewCode(Game.player.position);
				var maxPos = Math.min(Math.floor((viewCode.length-2) / 2), Config.maze.length);
				var isInPlayersView = (this.getDistanceFromPlayer(maxPos) > -1);
				if (isInPlayersView) {
					var roll = Combat.roll(1, 2);
					if (!Game.player.paralyzed && roll == 1) {
						Message.print('Intellect Devourer attacks from a distance with Psionic energy.', false);
						if (!Game.player.savingThrow()) {
							Game.player.paralyzed = true;
							Event.actAbility(false);
							Message.print(Game.player.name+' is paralyzed by Psionic energy.', false);
							setTimeout(function() {
								Game.player.paralyzed = false;
								Event.actAbility(true);
							}, 4000);
						} else {
							Message.print('Psionic energy misses '+Game.player.name+'.', false);
						}
					} else {
						Message.print('Intellect Devourer attacks from a distance with Psionic energy.', false);
						if (!Game.player.savingThrow()) {
							var damage = 25;
							Game.player.hp -= damage;
							Message.print(Game.player.name+' is hit by Psionic energy and suffers '+damage+' damage.', false);
							Combat.death();
						} else {
							Message.print('Psionic energy misses '+Game.player.name+'.', false);
						}
					}
				}
				return true;
		});
	} else if (type == 'TROLL') {
		return new Monster('Troll', 14, 17, -3, Combat.roll(50, 25), {move: 'image/troll.png', 
			bleed: 'image/troll_bl.png'}, 100, null, function() {
				if (this.maxHp == null) { // defend
					this.maxHp = this.hp;
				}
				var regeneration = 1;
				if (this.hp <= this.maxHp - regeneration) {
					this.hp += regeneration;
					Message.print('Some wounds of the Troll have been regenerated.', false);
				}
				return true;
			}, function() {
				if (this.maxHp == null) { // move
					this.maxHp = this.hp;
				}
				var regeneration = 2;
				if (this.hp <= this.maxHp - regeneration) {
					this.hp += regeneration;
					Message.print('Some wounds of the Troll have been regenerated.', false);
				}
				return true;
			});
	} else if (type == 'HAG') {
		return new Monster('Lady', 11, 19, 8, Combat.roll(80, 30), {move: 'image/lady.png', 
			bleed: 'image/lady.png'}, 115, function() {
				if (this.shapeChanged == null || this.shapeChanged) {
					var nextPos = Game.player.position.getNextPosition();
					if (nextPos.x == this.position.x && nextPos.y == this.position.y) {
						var thisMonster = this;
						setTimeout(function() {
							thisMonster.shapeChanged = false;
							thisMonster.isMoving = true;
						}, 4000);
					}
				} else {
					this.name = 'Hag';
					this.images.move = 'image/hag.png';
					this.images.bleed = 'image/hag_bl.png';
				}
				return true;
			});
	} else if (type == 'HOMONCULOUS') {
		return new Monster('Homonculous', 1, 10, 3, 15, {move: 'image/homonculous.png', 
			bleed: 'image/homonculous_bl.png'}, 13);
	} else if (type == 'CRAWLING_CLAWS') {
		return new Monster('Crawling Claws', 1, 12, 13, Combat.roll(5, 5), {move: 'image/claws.png', 
			bleed: 'image/claws_bl.png'}, 10);
	} else if (type == 'HUMAN_GUARD') {
		return new Monster('Human Guard', 3, 12, 0, Combat.roll(20, 10), {move: 'image/human_guard.png', 
			bleed: 'image/human_guard_bl.png'}, 25);
	} else if (type == 'HUMAN_ELITE_WARRIOR') {
		return new Monster('Human Elite Warrior', 11, 18, 1, Combat.roll(50, 30), {move: 'image/human_guard.png', 
			bleed: 'image/human_guard_bl.png'}, 85);
	} else if (type == 'HUMAN_PRIEST') {
		return new Monster('Human Priest', 8, 16, 2, Combat.roll(35, 10), {move: 'image/human_priest.png', 
			bleed: 'image/human_priest_bl.png'}, 55, function() {
				if (this.healing == null) {
					this.healing = 2;
				}
				if (this.hp < 15 && this.healing > 0) {
					Message.print('Human Priest casts Healing.', false);
					MazeUtil.drawHealing();
					var that = this;
					setTimeout(function() {
						that.hp += Combat.roll(3, 10);
						that.healing--;
						Message.print('Some wounds of the Human Priest have been cured.', false);
					}, 600);
					return false;
				} else if (!Game.player.paralyzed) {
					var roll = Combat.roll(1, 5);
					if (roll == 1) {
						Message.print('Human Priest casts a Hold Spell.', false);
						MazeUtil.drawPowerWord();
						var that = this;
						setTimeout(function() {
							if (that.position.isNeighborPosition(Game.player.position.x, Game.player.position.y) && !Game.player.savingThrow()) {
								Game.player.paralyzed = true;
								Event.actAbility(false);
								Message.print('Hold Spell affects '+Game.player.name+'.', false);
								setTimeout(function() {
									Game.player.paralyzed = false;
									Event.actAbility(true);
								}, 4000);
							} else {
								Message.print('Hold Spell misses '+Game.player.name+'.', false);
							}
						}, 800);
						return false;
					}
				}
			return true;
		});
	} else if (type == 'DROW_MAGE') {
		return new Monster('Drow Mage', 6, 15, 6, Combat.roll(25, 25), {move: 'image/drow.png', 
			bleed: 'image/drow_bl.png'}, 65, function() {
				if (this.lightning == null) {
					this.lightning = 2;
				}
				var savingThrowModifier = -2;
				var roll = Combat.roll(1, 3);
				if (roll == 1) {
					Message.print('Drow Mage casts Magic Missile.', false);
					MazeUtil.drawMagicMissile();
					setTimeout(function() {
						if (!Game.player.savingThrow(savingThrowModifier)) {
							var damage = Combat.roll(5, 10);
							if (damage > 0) {
								Game.player.hp -= damage;
								Message.print('Magic Missile does '+damage+' damage on '+Game.player.name+'.', false);
								Combat.death();
							}
						}
					}, 800);
					return false;
				} else if (this.lightning > 0 && roll == 2) {
					Message.print('Drow Mage casts Lightning.', false);
					MazeUtil.drawLightning();
					var that = this;
					this.lightning--;
					setTimeout(function() {
						if (that.position.isNeighborPosition(Game.player.position.x, Game.player.position.y) && !Game.player.savingThrow(savingThrowModifier)) {
							var damage = Combat.roll(0, 40);
							if (damage > 0) {
								Game.player.hp -= damage;
								Message.print('Lightning does '+damage+' damage on '+Game.player.name+'.', false);
								Combat.death();
							}
						} else {
							Message.print('Lightning misses '+Game.player.name+'.', false);
						}
					}, 800);
					return false;
				}
				return true;
		});
	} else if (type == 'NIGHTMARE') {
		return new Monster('Nightmare', 12, 18, 4, Combat.roll(50, 40), {move: 'image/nightmare.png', 
			bleed: 'image/nightmare_bl.png'}, 110, function() {
				var roll = Combat.roll(1, 2);
				if (roll == 1 && !Game.player.blind) {
					Message.print('Nightmare breathes a dark smoke.', false);
					MazeUtil.drawBlackSmoke();
					setTimeout(function() {
						if (!Game.player.savingThrow()) {
							Game.player.blind = true;
							Message.print('Smoke affects '+Game.player.name+'.', false);
							MazeUtil.draw(Game.map.getViewCode(Game.player.position), false, Game.map.wall);
							setTimeout(function() {
								Game.player.blind = false;
							}, 3000);
						} else {
							Message.print('Smoke misses '+Game.player.name+'.', false);
						}
					}, 800);
				} else {
					Message.print('Nightmare attacks with fire breath.', false);
					MazeUtil.drawFireball();
					setTimeout(function() {
						if (!Game.player.savingThrow()) {
							var damage = Combat.roll(10, 20);
							if (damage > 0) {
								Game.player.hp -= damage;
								Message.print('Fire does '+damage+' damage on '+Game.player.name+'.', false);
								Combat.death();
							}
						}
					}, 800);
					return false;
				}
				return true;
		});
	} else if (type == 'SKELETON') {
		return new Monster('Skeleton', 2, 11, -2, Combat.roll(10, 15), {move: 'image/skeleton.png', 
			bleed: 'image/skeleton.png'}, 15);
	} else if (type == 'GIANT_SKELETON') {
		return new Monster('Giant Skeleton', 5, 16, 1, Combat.roll(30, 20), {move: 'image/giant_skeleton.png', 
			bleed: 'image/giant_skeleton.png'}, 50, function() {
				var roll = Combat.roll(1, 5);
				if (roll == 1) {
					Message.print('Giant Skeleton casts a Fireball.', false);
					MazeUtil.drawFireball();
					setTimeout(function() {
						if (!Game.player.savingThrow()) {
							var damage = Combat.roll(0, 20);
							if (damage > 0) {
								Game.player.hp -= damage;
								Message.print('Fireball does '+damage+' damage on '+Game.player.name+'.', false);
								Combat.death();
							}
						}
					}, 800);
					return false;
				}
			return true;
		});
	} else if (type == 'HELL_HOUND') {
		return new Monster('Hell Hound', 8, 14, 7, Combat.roll(40, 20), {move: 'image/hell_hound.png', 
			bleed: 'image/hell_hound_bl.png'}, 70, function() {
				var roll = Combat.roll(1, 10);
				if (roll <= 3) {
					Message.print('Hell Hound attacks with fire breath.', false);
					MazeUtil.drawFireball();
					setTimeout(function() {
						if (!Game.player.savingThrow()) {
							var damage = Combat.roll(0, 15);
							if (damage > 0) {
								Game.player.hp -= damage;
								Message.print('Fire does '+damage+' damage on '+Game.player.name+'.', false);
								Combat.death();
							}
						}
					}, 800);
					return false;
				}
			return true;
		});
	} else if (type == 'SPECTRE') {
		return new Monster('Spectre', 7, 16, 4, Combat.roll(40, 30), {move: 'image/spectre.png', 
			bleed: 'image/spectre_bl.png'}, 75, null, function() {
				if (Game.player.weapon != null && (Game.player.weapon.name.indexOf('Silver') >= 0 || 
						Game.player.weapon.name.indexOf('Magic') >= 0)) {
					return true;
				} else {
					Message.print('Spectre can only be hit by silver or magic weapons!', false);
					return false;
				}
			});
	} else if (type == 'INVISIBLE_STALKER') {
		return new Monster('Invisible Stalker', 9, 19, 2, Combat.roll(30, 35), {move: 'image/invisible.png', 
			bleed: 'image/invisible_bl.png'}, 90);
	} else if (type == 'LESSER_FIRE_ELEMENTAL') {
		return new Monster('Lesser Fire Elemental', 13, 19, -1, Combat.roll(40, 40), {move: 'image/fire_elemental.png', 
			bleed: 'image/fire_elemental_bl.png'}, 120, function() {	
				var roll = Combat.roll(1, 2);
				if (roll == 1) {
					Message.print('Lesser Fire Elemental attacks with a Fireball.', false);
					MazeUtil.drawFireball();
					setTimeout(function() {
						if (!Game.player.savingThrow()) {
							var damage = Combat.roll(0, 30);
							if (damage > 0) {
								Game.player.hp -= damage;
								Message.print('Fireball does '+damage+' damage on '+Game.player.name+'.', false);
								Combat.death();
							}
						}
					}, 800);
					return false;
				}
			return true;
		});
	} else if (type == 'LESSER_WATER_ELEMENTAL') {
		return new Monster('Lesser Water Elemental', 12, 21, -3, Combat.roll(60, 30), {move: 'image/water_elemental.png', 
			bleed: 'image/water_elemental_bl.png'}, 120, function() {
				Message.print(this.name+' attacks', false);
				if (Game.player.hp > 0) {
					var damage = Combat.attack(this, Game.player);
					if (damage > 0) {
						var addDamage = 5;
						Game.player.hp -= addDamage;
						Message.print('Water attack does '+addDamage+' extra damage on '+Game.player.name+'.', false);
						Combat.death();
						var nextPos = Game.player.position.getNextPosition();
						if (this.position.x != nextPos.x || this.position.y != nextPos.y) {
							MazeUtil.drawBackstab();
						}
					}
				}
				return false;
			});
	} else if (type == 'DEATH_KNIGHT') {
		return new Monster('Death Knight', 16, 25, 0, Combat.roll(70, 40), {move: 'image/death_knight.png', 
			bleed: 'image/death_knight.png'}, 180, function() {	
				if (this.deathWord == null || !this.deathWord) {
					Message.print('Death Knight attacks with Word Of Death.', false);
					MazeUtil.drawPowerWord();
					this.deathWord = true;
					var that = this;
					setTimeout(function() {
						if (that.position.isNeighborPosition(Game.player.position.x, Game.player.position.y) && !Game.player.savingThrow()) {
							Game.player.hp = 0;
							Message.print('Word Of Death kills '+Game.player.name+'.', false);
							Combat.death();
						} else {
							Message.print('Word Of Death misses '+Game.player.name+'.', false);
						}
					}, 800);
					return false;
				}
			return true;
		}, function() {
			if (Game.player.weapon != null && (Game.player.weapon.name.indexOf('Silver') >= 0 || 
					Game.player.weapon.name.indexOf('Magic') >= 0)) {
				return true;
			} else {
				var damage = Combat.attack(Game.player, this);
				if (this.isMoving == null) {
					this.isMoving = true;
				}
				if (damage > 0) {
					var damageAbsorption = 2;
					Message.print('Some damage of your weapon was absorbed by the Death Knight!', false);
					this.hp += (damage < damageAbsorption ? damage : damageAbsorption);
					Combat.death();
					MazeUtil.draw(Game.map.getViewCode(Game.player.position), true, Game.map.wall);
				}
				return false;
			}
		});
	} else if (type == 'LICH') {
		return new Monster('Lich', 18, 24, 12, Combat.roll(140, 20), {move: 'image/lich.png', 
			bleed: 'image/lich.png'}, 280, function() {
				var savingThrowModifier = -5;
				if (this.lightning == null) {
					this.lightning = 3;
				}
				if (this.poisonous == null) {
					this.poisonous = 2;
				}
				if (this.haste == null || !this.haste) {
					Message.print('Lich is hasted.', false);
					this.haste = true;
				} else {
					var roll = Combat.roll(1, 8);
					if (roll == 1 && !Game.player.paralyzed && (this.stunWord == null || !this.stunWord)) {
						Message.print('Lich attacks with Word Of Stunning.', false);
						MazeUtil.drawPowerWord();
						this.stunWord = true;
						var that = this;
						setTimeout(function() {
							if (that.position.isNeighborPosition(Game.player.position.x, Game.player.position.y) && !Game.player.savingThrow(savingThrowModifier)) {
								Game.player.paralyzed = true;
								Event.actAbility(false);
								Message.print('Word Of Stunning affects '+Game.player.name+'.', false);
								setTimeout(function() {
									Game.player.paralyzed = false;
									Event.actAbility(true);
								}, 6000);
							} else {
								Message.print('Word Of Stunning misses '+Game.player.name+'.', false);
							}
						}, 800);
					} else if (roll == 2 && (this.deathWord == null || !this.deathWord)) {
						Message.print('Lich attacks with Word Of Death.', false);
						MazeUtil.drawPowerWord();
						this.deathWord = true;
						var that = this;
						setTimeout(function() {
							if (that.position.isNeighborPosition(Game.player.position.x, Game.player.position.y) && !Game.player.savingThrow(savingThrowModifier)) {
								Game.player.hp = 0;
								Message.print('Word Of Death kills '+Game.player.name+'.', false);
								Combat.death();
							} else {
								Message.print('Word Of Death misses '+Game.player.name+'.', false);
							}
						}, 800);
					} else if (roll == 3 && !Game.player.blind && (this.blindWord == null || !this.blindWord)) {
						Message.print('Lich attacks with Word Of Blindness.', false);
						MazeUtil.drawPowerWord();
						this.blindWord = true;
						var that = this;
						setTimeout(function() {
							if (that.position.isNeighborPosition(Game.player.position.x, Game.player.position.y) && !Game.player.savingThrow(savingThrowModifier)) {
								Game.player.blind = true;
								Message.print('Word Of Blindness affects '+Game.player.name+'.', false);
								MazeUtil.draw(Game.map.getViewCode(Game.player.position), false, Game.map.wall);
								setTimeout(function() {
									Game.player.blind = false;
								}, 8000);
							} else {
								Message.print('Word Of Blindness misses '+Game.player.name+'.', false);
							}
						}, 800);
					} else if (roll == 4 && this.lightning > 0) {
						Message.print('Lich casts Lightning.', false);
						MazeUtil.drawLightning();
						var that = this;
						this.lightning--;
						setTimeout(function() {
							if (that.position.isNeighborPosition(Game.player.position.x, Game.player.position.y) && !Game.player.savingThrow(savingThrowModifier)) {
								var damage = Combat.roll(0, 40);
								if (damage > 0) {
									Game.player.hp -= damage;
									Message.print('Lightning does '+damage+' damage on '+Game.player.name+'.', false);
									Combat.death();
								}
							} else {
								Message.print('Lightning misses '+Game.player.name+'.', false);
							}
						}, 800);
					} else if (roll == 5 && this.poisonous > 0 && Game.player.poisonedInterval == null) {
						Game.player.poisonedInterval = true;
						Message.print('Lich casts Poisonous Cloud.', false);
						MazeUtil.drawGreenCloud();
						var that = this;
						this.poisonous--;
						setTimeout(function() {
							if (that.position.isNeighborPosition(Game.player.position.x, Game.player.position.y) && !Game.player.savingThrow(savingThrowModifier)) {
								Message.print(Game.player.name+' is poisoned.', false);
								Game.player.poisonedInterval = setInterval(function() {
									if (Game.player.poisonedInterval != null) {
										var damage = Combat.roll(5, 15);
										Game.player.hp -= damage;
										Message.print('Poison takes effect on '+Game.player.name+' and causes '+damage+' damage.', false);
										Combat.death();
									}
								}, 5000);
								setTimeout(function() {
									Game.player.resetPoison();
								}, 26000);
							} else {
								Game.player.poisonedInterval = null;
								Message.print('Poisonous Cloud misses '+Game.player.name+'.', false);
							}
						}, 800);
					} else if (roll < 8) {
						Message.print('Lich casts a Fireball.', false);
						MazeUtil.drawFireball();
						setTimeout(function() {
							if (!Game.player.savingThrow(savingThrowModifier)) {
								var damage = Combat.roll(0, 30);
								if (damage > 0) {
									Game.player.hp -= damage;
									Message.print('Fireball does '+damage+' damage on '+Game.player.name+'.', false);
									Combat.death();
								}
							}
						}, 800);
					} else {
						return true;
					}
				}
				return false;
		}, function() {
			if (Game.player.weapon != null && (Game.player.weapon.name.indexOf('Silver') >= 0 || 
					Game.player.weapon.name.indexOf('Magic') >= 0)) {
				return true;
			} else {
				var damage = Combat.attack(Game.player, this);
				if (this.isMoving == null) {
					this.isMoving = true;
				}
				if (damage > 0) {
					var damageAbsorption = 3;
					Message.print('Some damage of your weapon was absorbed by the Lich!', false);
					this.hp += (damage < damageAbsorption ? damage : damageAbsorption);
					Combat.death();
					MazeUtil.draw(Game.map.getViewCode(Game.player.position), true, Game.map.wall);
				}
				return false;
			}
		});
	} else if (type == 'BEHOLDER') {
		return new Monster('Beholder', 17, 22, 3, Combat.roll(100, 40), {move: 'image/beholder.png', 
			bleed: 'image/beholder_bl.png'}, 220, function() {
				var savingThrowModifier = -5;
				var roll = Combat.roll(1, 6);
				var that = this;
				if (roll == 1 && !Game.player.paralyzed) {
					Message.print('Beholder attacks with Ray Of Stunning.', false);
					MazeUtil.drawPowerWord();
					setTimeout(function() {
						if (that.position.isNeighborPosition(Game.player.position.x, Game.player.position.y) && !Game.player.savingThrow(savingThrowModifier)) {
							Game.player.paralyzed = true;
							Event.actAbility(false);
							Message.print('Ray Of Stunning affects '+Game.player.name+'.', false);
							setTimeout(function() {
								Game.player.paralyzed = false;
								Event.actAbility(true);
							}, 4000);
						} else {
							Message.print('Ray Of Stunning misses '+Game.player.name+'.', false);
						}
					}, 800);
				} else if (roll == 2) {
					Message.print('Beholder attacks with Ray Of Death.', false);
					MazeUtil.drawPowerWord();
					setTimeout(function() {
						if (that.position.isNeighborPosition(Game.player.position.x, Game.player.position.y) && !Game.player.savingThrow(savingThrowModifier)) {
							Game.player.hp = 0;
							Message.print('Ray Of Death kills '+Game.player.name+'.', false);
							Combat.death();
						} else {
							Message.print('Ray Of Death misses '+Game.player.name+'.', false);
						}
					}, 800);
				} else if (roll == 3 && !Game.player.blind) {
					Message.print('Beholder attacks with Ray Of Blindness.', false);
					MazeUtil.drawPowerWord();
					setTimeout(function() {
						if (that.position.isNeighborPosition(Game.player.position.x, Game.player.position.y) && !Game.player.savingThrow(savingThrowModifier)) {
							Game.player.blind = true;
							Message.print('Ray Of Blindness affects '+Game.player.name+'.', false);
							MazeUtil.draw(Game.map.getViewCode(Game.player.position), false, Game.map.wall);
							setTimeout(function() {
								Game.player.blind = false;
							}, 4000);
						} else {
							Message.print('Ray Of Blindness misses '+Game.player.name+'.', false);
						}
					}, 800);
				} else if (roll == 4 && !Game.player.weakened) {
					Message.print('Beholder attacks with Ray Of Enfeeblement.', false);
					MazeUtil.drawPowerWord();
					setTimeout(function() {
						if (that.position.isNeighborPosition(Game.player.position.x, Game.player.position.y) && !Game.player.savingThrow(savingThrowModifier)) {
							Game.player.weakened = true;
							Game.player.recalculate();
							MazeUtil.draw(Game.map.getViewCode(Game.player.position), false, Game.map.wall);
							MazeUtil.drawWeaponArmor();
							Message.print('Ray Of Enfeeblement affects '+Game.player.name+'.', false);
							setTimeout(function() {
								Game.player.weakened = false;
								Game.player.recalculate();
								MazeUtil.drawWeaponArmor();
							}, 12000);
						} else {
							Message.print('Ray Of Enfeeblement misses '+Game.player.name+'.', false);
						}
					}, 800);
				} else if (roll == 5 && !Game.player.petrified && !Game.player.paralyzed) {
					Message.print('Beholder attacks with Ray Of Petrification.', false);
					MazeUtil.drawPowerWord();
					setTimeout(function() {
						if (that.position.isNeighborPosition(Game.player.position.x, Game.player.position.y) && !Game.player.savingThrow(savingThrowModifier)) {
							Game.player.paralyzed = true;
							Event.actAbility(false);
							Game.player.petrified = true;
							Message.print(Game.player.name+' is being petrified.', false);
							setTimeout(function() {
								if (Game.player.petrified) {
									if (Game.player.savingThrow(savingThrowModifier)) {
										Game.player.petrified = false;
										if (Game.player.paralyzed) {
											Game.player.paralyzed = false;
											Event.actAbility(true);
										}
										Message.print('Petrification of '+Game.player.name+' is reversed.', false);
									} else {
										Game.player.hp = 0;
										Message.print('Petrification of '+Game.player.name+' is complete.', false);
										Combat.death();
									}
								}
							}, 4000);
						} else {
							Message.print('Ray Of Petrification misses '+Game.player.name+'.', false);
						}
					}, 800);
				} else {
					return true;
				}
				return false;
		}, null, function() { // move
			var viewCode = Game.map.getViewCode(Game.player.position);
			var maxPos = Math.min(Math.floor((viewCode.length-2) / 2), Config.maze.length);
			var isInPlayersView = (this.getDistanceFromPlayer(maxPos) > -1);
			if (isInPlayersView) {
				var savingThrowModifier = -5;
				var roll = Combat.roll(1, 7);
				var playerPos = Game.player.position;
				if (roll == 1 && !Game.player.paralyzed) {
					Message.print('Beholder attacks from a distance with Ray Of Stunning.', false);
					MazeUtil.drawPowerWord();
					setTimeout(function() {
						if (playerPos.x == Game.player.position.x && playerPos.y == Game.player.position.y && !Game.player.savingThrow(savingThrowModifier)) {
							Game.player.paralyzed = true;
							Event.actAbility(false);
							Message.print('Ray Of Stunning affects '+Game.player.name+'.', false);
							setTimeout(function() {
								Game.player.paralyzed = false;
								Event.actAbility(true);
							}, 4000);
						} else {
							Message.print('Ray Of Stunning misses '+Game.player.name+'.', false);
						}
					}, 800);
				} else if (roll == 2 && !Game.player.blind) {
					Message.print('Beholder attacks from a distance with Ray Of Blindness.', false);
					MazeUtil.drawPowerWord();
					setTimeout(function() {
						if (playerPos.x == Game.player.position.x && playerPos.y == Game.player.position.y && !Game.player.savingThrow(savingThrowModifier)) {
							Game.player.blind = true;
							Message.print('Ray Of Blindness affects '+Game.player.name+'.', false);
							MazeUtil.draw(Game.map.getViewCode(Game.player.position), false, Game.map.wall);
							setTimeout(function() {
								Game.player.blind = false;
							}, 4000);
						} else {
							Message.print('Ray Of Blindness misses '+Game.player.name+'.', false);
						}
					}, 800);
				} else if (roll == 3 && !Game.player.weakened) {
					Message.print('Beholder attacks from a distance with Ray Of Enfeeblement.', false);
					MazeUtil.drawPowerWord();
					setTimeout(function() {
						if (playerPos.x == Game.player.position.x && playerPos.y == Game.player.position.y && !Game.player.savingThrow(savingThrowModifier)) {
							Game.player.weakened = true;
							Game.player.recalculate();
							MazeUtil.draw(Game.map.getViewCode(Game.player.position), false, Game.map.wall);
							MazeUtil.drawWeaponArmor();
							Message.print('Ray Of Enfeeblement affects '+Game.player.name+'.', false);
							setTimeout(function() {
								Game.player.weakened = false;
								Game.player.recalculate();
								MazeUtil.drawWeaponArmor();
							}, 12000);
						} else {
							Message.print('Ray Of Enfeeblement misses '+Game.player.name+'.', false);
						}
					}, 800);
				} else if (roll == 4 && !Game.player.petrified && !Game.player.paralyzed) {
					Message.print('Beholder attack from a distances with Ray Of Petrification.', false);
					MazeUtil.drawPowerWord();
					setTimeout(function() {
						if (playerPos.x == Game.player.position.x && playerPos.y == Game.player.position.y && !Game.player.savingThrow(savingThrowModifier)) {
							Game.player.paralyzed = true;
							Event.actAbility(false);
							Game.player.petrified = true;
							Message.print(Game.player.name+' is being petrified.', false);
							setTimeout(function() {
								if (Game.player.petrified) {
									if (Game.player.savingThrow(savingThrowModifier)) {
										Game.player.petrified = false;
										if (Game.player.paralyzed) {
											Game.player.paralyzed = false;
											Event.actAbility(true);
										}
										Message.print('Petrification of '+Game.player.name+' is reversed.', false);
									} else {
										Game.player.hp = 0;
										Message.print('Petrification of '+Game.player.name+' is complete.', false);
										Combat.death();
									}
								}
							}, 4000);
						} else {
							Message.print('Ray Of Petrification misses '+Game.player.name+'.', false);
						}
					}, 800);
				} else if (roll == 5) {
					Message.print('Beholder attacks from a distance with Ray Of Death.', false);
					MazeUtil.drawPowerWord();
					setTimeout(function() {
						if (playerPos.x == Game.player.position.x && playerPos.y == Game.player.position.y && !Game.player.savingThrow(savingThrowModifier)) {
							Game.player.hp = 0;
							Message.print('Ray Of Death kills '+Game.player.name+'.', false);
							Combat.death();
						} else {
							Message.print('Ray Of Death misses '+Game.player.name+'.', false);
						}
					}, 800);
				} else {
					return true;
				}
				return false;
			}
			return true;
		});
	} else if (type == 'RED_DRAGON') {
		return new Monster('Red Dragon', 26, 32, 10, Combat.roll(200, 50), {move: 'image/red_dragon.png', 
			bleed: 'image/red_dragon_bl.png'}, 360, function() {
				var savingThrowModifier = -10;
				var roll = Combat.roll(1, 8);
				if (roll == 1 && (this.deathWord == null || !this.deathWord)) {
					Message.print('Red Dragon attacks with Word Of Death.', false);
					MazeUtil.drawPowerWord();
					this.deathWord = true;
					var that = this;
					setTimeout(function() {
						if (that.position.isNeighborPosition(Game.player.position.x, Game.player.position.y) && !Game.player.savingThrow(savingThrowModifier)) {
							Game.player.hp = 0;
							Message.print('Word Of Death kills '+Game.player.name+'.', false);
							Combat.death();
						} else {
							Message.print('Word Of Death misses '+Game.player.name+'.', false);
						}
					}, 800);
				} else if (roll < 5 && !Game.player.blind && !Game.player.paralyzed) {
					Message.print('Red Dragon breathes a dark smoke.', false);
					MazeUtil.drawBlackSmoke();
					setTimeout(function() {
						if (!Game.player.savingThrow(savingThrowModifier)) {
							Game.player.blind = true;
							Message.print('Smoke blinds '+Game.player.name+'.', false);
							MazeUtil.draw(Game.map.getViewCode(Game.player.position), false, Game.map.wall);
							setTimeout(function() {
								Game.player.blind = false;
							}, 3000);
						}
						if (!Game.player.savingThrow(savingThrowModifier)) {
							Game.player.paralyzed = true;
							Event.actAbility(false);
							Message.print(Game.player.name+' is paralyzed.', false);
							setTimeout(function() {
								Game.player.paralyzed = false;
								Event.actAbility(true);
							}, 4000);
						}
					}, 800);
					return true;
				} else {
					Message.print('Red Dragon attacks with its breath weapon.', false);
					MazeUtil.drawFireball();
					var that = this;
					setTimeout(function() {
						if (!Game.player.savingThrow(savingThrowModifier)) {
							var damage = Combat.roll(0, 60);
							if (damage > 0) {
								Game.player.hp -= damage;
								Message.print('Fire does '+damage+' damage on '+Game.player.name+'.', false);
								Combat.death();
							}
						}
					}, 800);
				}
				return false;
		}, function() {
			if (Game.player.weapon != null && (Game.player.weapon.name.indexOf('Silver') >= 0 || 
					Game.player.weapon.name.indexOf('Magic') >= 0)) {
				return true;
			} else {
				var damage = Combat.attack(Game.player, this);
				if (this.isMoving == null) {
					this.isMoving = true;
				}
				if (damage > 0) {
					var damageAbsorption = 4;
					Message.print('Some damage of your weapon was absorbed by the Dragon!', false);
					this.hp += (damage < damageAbsorption ? damage : damageAbsorption);
					Combat.death();
					MazeUtil.draw(Game.map.getViewCode(Game.player.position), true, Game.map.wall);
				}
				return false;
			}
		}, null, 0.25);
	}
};

Monster.getIndexByPosition = function(x, y) {
	for (var i = 0; i < Game.monsters.length; i++) {
		if (Game.monsters[i] != null && Game.monsters[i].position != null && 
				Game.monsters[i].position.x == x && Game.monsters[i].position.y == y) {
			return i;
		}
	}
	return null;
};

Monster.setArchEnemyToAll = function() {
	for (var i = 0; i < Game.monsters.length; i++) {
		if (Game.monsters[i] != null) {
			Game.monsters[i].isArchEnemy = true;
		}
	}
};

Monster.archEnemyExists = function() {
	for (var i = 0; i < Game.monsters.length; i++) {
		if (Game.monsters[i] != null && Game.monsters[i].isArchEnemy) {
			return true;
		}
	}
	return false;
};