var MazeUtil = function() {};

MazeUtil.popUpSleep = 300;

MazeUtil.draw = function(mazeViewCode, isBleeding, wall) {
	//console.log(mazeViewCode);

	// clear
	Canvas.ctx().clearRect(0, 0, Canvas.width(), Canvas.height());
	// background, basic style
	Canvas.ctx().fillStyle = (Game.player.blind ? '#000000' : wall.floorColor);
	Canvas.ctx().strokeStyle = '#000000';
	Canvas.ctx().fillRect(0, 0, Canvas.width(), Canvas.height());
	if (!Game.player.blind) {
		// walls
		var mazeBits = mazeViewCode.split('');
		for (var i = 0; i < mazeBits.length-3; i++) {
			var pos = Math.floor(i / 2);
			var x1 = (pos == 0 ? 0 : Config.maze[pos - 1]);
			var x2 = Config.maze[pos];
			var y1u;
			var y2u = MazeUtil.calculateYUpper(x2);
			if (mazeBits[i] == ' ') {
				if (mazeBits.length > i+2 && mazeBits[i+2] == ' ') {
					continue;
				}
				y1u = y2u;
			} else {
				y1u = MazeUtil.calculateYUpper(x1);
			}
			var y1l;
			var y2l = MazeUtil.calculateYLower(x2);
			if (mazeBits[i] == ' ') {
				y1l = y2l;
			} else {
				y1l = MazeUtil.calculateYLower(x1);
			}
			if (i % 2 == 1) {
				// right side
				x1 = Canvas.width() - x1;
				x2 = Canvas.width() - x2;
			}
			Canvas.ctx().lineWidth = 2;
			Canvas.ctx().beginPath();
			Canvas.ctx().moveTo(x1, y1u);
			Canvas.ctx().lineTo(x2, y2u);
			if (wall.textureType == 'Plain') {
				Canvas.ctx().lineTo(x2, y2l)
				Canvas.ctx().lineTo(x1, y1l);
			} else if (wall.textureType == 'TwoTriangles') {
				Canvas.ctx().lineTo((i % 2 == 0 ? x2 : x1), (i % 2 == 0 ? y2l : y1l)); // left and right sides
			} else if (wall.textureType == 'FourTriangles') {
				Canvas.ctx().lineTo(x1, y1l)
				Canvas.ctx().lineTo(x2, y2l);
			}
			Canvas.ctx().lineTo(x1, y1u);
			Canvas.ctx().closePath();
			Canvas.ctx().fillStyle = wall.mainColor;
			Canvas.ctx().fill();
			Canvas.ctx().stroke();
			if (wall.textureType == 'TwoTriangles' || wall.textureType == 'FourTriangles') {
				Canvas.ctx().beginPath();
				if (wall.textureType == 'TwoTriangles') {
					if (i % 2 == 0) {
						// left side
						Canvas.ctx().moveTo(x1, y1u);
						Canvas.ctx().lineTo(x1, y1l);
						Canvas.ctx().lineTo(x2, y2l);
						Canvas.ctx().lineTo(x1, y1u);
					} else {
						// right side
						Canvas.ctx().moveTo(x2, y2u);
						Canvas.ctx().lineTo(x2, y2l);
						Canvas.ctx().lineTo(x1, y1l);
						Canvas.ctx().lineTo(x2, y2u);
					}
				} else if (wall.textureType == 'FourTriangles') {
					Canvas.ctx().moveTo(x1, y1l);
					Canvas.ctx().lineTo(x2, y2u)
					Canvas.ctx().lineTo(x2, y2l);
					Canvas.ctx().lineTo(x1, y1u);
					Canvas.ctx().lineTo(x1, y2u);
				}
				Canvas.ctx().closePath();
				Canvas.ctx().fillStyle = wall.secondaryColor;
				Canvas.ctx().fill();
				Canvas.ctx().stroke();
			}
			if (mazeBits[i] == 'D' || mazeBits[i] == 'O') {
				// doors, open doors
				var doorWidth = Math.floor((x2 - x1) * Config.doorRatio.x);
				var x1d = x1 + Math.floor((x2 - x1 - doorWidth) / 2);
				var x2d = x1 + Math.floor((x2 - x1 + doorWidth) / 2);
				var y1ld = (i % 2 == 0 ? MazeUtil.calculateYLower(x1d) : MazeUtil.calculateYLower(Canvas.width()-x1d));
				var y1ud = (i % 2 == 0 ? MazeUtil.calculateYUpper(x1d) : MazeUtil.calculateYUpper(Canvas.width()-x1d));
				var doorHeight1 = Math.floor((y1ld - y1ud) * Config.doorRatio.y);
				var y1ud = y1ld - doorHeight1;
				var y2ld = (i % 2 == 0 ? MazeUtil.calculateYLower(x2d) : MazeUtil.calculateYLower(Canvas.width()-x2d));
				var y2ud = (i % 2 == 0 ? MazeUtil.calculateYUpper(x2d) : MazeUtil.calculateYUpper(Canvas.width()-x2d));
				var doorHeight2 = Math.floor((y2ld - y2ud) * Config.doorRatio.y);
				var y2ud = y2ld - doorHeight2;
				Canvas.ctx().lineWidth = 3;
				Canvas.ctx().beginPath();
				Canvas.ctx().moveTo(x1d, y1ud);
				Canvas.ctx().lineTo(x2d, y2ud);
				Canvas.ctx().lineTo(x2d, y2ld);
				Canvas.ctx().lineTo(x1d, y1ld);
				Canvas.ctx().lineTo(x1d, y1ud);
				Canvas.ctx().closePath();
				Canvas.ctx().fillStyle = (mazeBits[i] == 'D' ? '#885533' : '#000000');
				Canvas.ctx().strokeStyle = '#000000';
				Canvas.ctx().fill();
				Canvas.ctx().stroke();
			}
		}
		Canvas.ctx().lineWidth = 2;
		var maxPos = Math.min(Math.floor((mazeBits.length-2) / 2), Config.maze.length);
		// last wall at the end
		if (mazeBits[mazeBits.length-1] != 'Z' && !(mazeBits.length > Config.maze.length * 2 + 2 && 
				(mazeBits[Config.maze.length * 2 + 2] == ' ' || mazeBits[Config.maze.length * 2 + 2] == 'S'))) {
			if (maxPos > 0) {
				var x1 = Config.maze[maxPos - 1];
				var x2 = Canvas.width() - x1;
				var yu = MazeUtil.calculateYUpper(x1);
				var yl = MazeUtil.calculateYLower(x1);
				Canvas.ctx().beginPath();
				Canvas.ctx().moveTo(x1, yu);
				Canvas.ctx().lineTo(x2, yu);
				if (wall.textureType == 'Plain') {
					Canvas.ctx().lineTo(x2, yl);
					Canvas.ctx().lineTo(x1, yl);
				} else if (wall.textureType == 'TwoTriangles') {
					Canvas.ctx().lineTo(x2, yl);
				} else if (wall.textureType == 'FourTriangles') {
					Canvas.ctx().lineTo(x1, yl)
					Canvas.ctx().lineTo(x2, yl);
				}
				Canvas.ctx().lineTo(x1, yu);
				Canvas.ctx().closePath();
				Canvas.ctx().fillStyle = wall.mainColor;
				Canvas.ctx().fill();
				Canvas.ctx().stroke();
				if (wall.textureType == 'TwoTriangles' || wall.textureType == 'FourTriangles') {
					Canvas.ctx().beginPath();
					if (wall.textureType == 'TwoTriangles') {
						Canvas.ctx().moveTo(x1, yu);
						Canvas.ctx().lineTo(x1, yl);
						Canvas.ctx().lineTo(x2, yl);
						Canvas.ctx().lineTo(x1, yu);
					} else if (wall.textureType == 'FourTriangles') {
						Canvas.ctx().moveTo(x1, yl);
						Canvas.ctx().lineTo(x2, yu)
						Canvas.ctx().lineTo(x2, yl);
						Canvas.ctx().lineTo(x1, yu);
						Canvas.ctx().lineTo(x1, yu);
					}
					Canvas.ctx().closePath();
					Canvas.ctx().fillStyle = wall.secondaryColor;
					Canvas.ctx().fill();
					Canvas.ctx().stroke();
				}
				// end door
				if (mazeBits[mazeBits.length-1] == 'D' || mazeBits[mazeBits.length-1] == 'O') {
					MazeUtil.drawFrontDoor(maxPos, mazeBits[mazeBits.length-1]);
				}
			}
		}
		// Dimension door
		MazeUtil.drawDimensionDoors(maxPos);
		// Items
		MazeUtil.drawItems(maxPos);
		// Monsters
		MazeUtil.drawMonsters(maxPos, isBleeding);
	}
	// HP bar, XP bar
	MazeUtil.drawHpBar();
	MazeUtil.drawLevelBar();
	// Events
	MazeUtil.popUpEvent();
};

MazeUtil.drawFrontDoor = function(maxPos, doorCode) {
	if (doorCode == null) {
		doorCode = 'D';
	}
	Canvas.ctx().lineWidth = 3;
	Canvas.ctx().fillStyle = (doorCode == 'D' ? '#885533' : '#000000');
	Canvas.ctx().strokeStyle = '#000000';
	var x1 = Config.maze[maxPos-1];
	var x2 = Canvas.width() - x1;
	var y1 = MazeUtil.calculateYUpper(x1);
	var y2 = MazeUtil.calculateYLower(x1);
	var diffX = x2-x1;
	var diffY = y2-y1;
	x1 = Math.round(x1 + diffX/2 - (diffX * Config.doorRatio.x / 2));
	y1 = Math.round(y2 - (diffY * Config.doorRatio.y));
	var doorWidth = Math.round(diffX * Config.doorRatio.x);
	var doorHeight = Math.round(diffY * Config.doorRatio.y);
	Canvas.ctx().beginPath();
	Canvas.ctx().moveTo(x1, y1);
	Canvas.ctx().lineTo(x1+doorWidth, y1);
	Canvas.ctx().lineTo(x1+doorWidth, y1+doorHeight);
	Canvas.ctx().lineTo(x1, y1+doorHeight);
	Canvas.ctx().lineTo(x1, y1);
	Canvas.ctx().closePath();
	Canvas.ctx().fill();
	Canvas.ctx().stroke();
	if (doorCode == 'D') {
		Canvas.ctx().beginPath();
		Canvas.ctx().fillStyle = '#000000';
		Canvas.ctx().moveTo(x1+doorWidth*Config.doorRatio.xx, y1+doorHeight*Config.doorRatio.yy);
		Canvas.ctx().arc(x1+doorWidth*Config.doorRatio.xx, y1+doorHeight*Config.doorRatio.yy, 
			diffY*Config.doorRatio.r, 0, 2*Math.PI);
		Canvas.ctx().closePath();
		Canvas.ctx().fill();
		Canvas.ctx().stroke();
	}
};

MazeUtil.drawDimensionDoors = function(maxPos) {
	var posX = Game.player.position.x;
	var posY = Game.player.position.y;
	if (Game.player.position.direction == 'NORTH') {
		posY = posY - maxPos;
	} else if (Game.player.position.direction == 'SOUTH') {
		posY = posY + maxPos;
	} else if (Game.player.position.direction == 'EAST') {
		posX = posX + maxPos;
	} else if (Game.player.position.direction == 'WEST') {
		posX = posX - maxPos;
	}
	var z = 0;
	for (var i = maxPos; i >= 0; i--) {
		if (posX in Game.map.dimensions && posY in Game.map.dimensions[posX]) {
			var img = new Image();
			img.src = 'image/dimension_door.png';
			img.distance = i;
			img.onload = function() {
				var x = (this.distance > 0 ? Config.maze[this.distance-1] : 0);
				var yu = MazeUtil.calculateYUpper(x);
				var yl = MazeUtil.calculateYLower(x);
				var width = Canvas.width()-2*x;
				var height = yl-yu;
				Canvas.ctx().drawImage(this, x, yu, width, height);
			};
		}
		if (Game.player.position.direction == 'NORTH') {
			posY++;
		} else if (Game.player.position.direction == 'SOUTH') {
			posY--;
		} else if (Game.player.position.direction == 'EAST') {
			posX--;
		} else if (Game.player.position.direction == 'WEST') {
			posX++;
		}
	}
};

MazeUtil.drawMonsters = function(maxPos, isBleeding) {
	var posArr = [];
	var monsterIdxArr = [];
	var nextPos = Game.player.position.getNextPosition();
	var monsterToAttack = Monster.getIndexByPosition(nextPos.x, nextPos.y);
	var monsters = Game.monsters;
	for (var i = 0; i < monsters.length; i++) {
		if (monsters[i] != null) {
			var distance = monsters[i].getDistanceFromPlayer(maxPos);
			if (distance > -1) {
				posArr.push(distance);
				monsterIdxArr[distance] = i;
			}
		}
	}
	// order distances descending
	posArr.sort(function(a, b) {return b-a;});
	// display monsters
	var monsterImgs = [];
	for (var i = 0; i < posArr.length; i++) {
		var monsterIdx = monsterIdxArr[posArr[i]];
		monsterImgs[i] = new Image();
		monsterImgs[i].src = (isBleeding && monsterToAttack != null && monsterIdx == monsterToAttack ? 
			monsters[monsterIdx].images.bleed : monsters[monsterIdx].images.move);
		monsterImgs[i].idx = monsterIdx;
		monsterImgs[i].distance = posArr[i];
		monsterImgs[i].loaded = false;
		monsterImgs[i].onload = function() {
			this.loaded = true;
		};
	}
	var t = setInterval(function() {
		var allLoaded = true;
		for (var i = 0; i < posArr.length; i++) {
			if (!monsterImgs[i].loaded) {
				allLoaded = false;
				break;
			}
		}
		var allValid = true;
		if (allLoaded) {
			clearInterval(t);
			for (var i = 0; i < posArr.length; i++) {
				var x = Config.maze[monsterImgs[i].distance-1];
				var yu = MazeUtil.calculateYUpper(x);
				var yl = MazeUtil.calculateYLower(x);
				var width = Canvas.width()-2*x;
				var height = yl-yu;
				var actualMonster = Game.monsters[monsterImgs[i].idx];
				if (actualMonster != null) {
					if (actualMonster.getDistanceFromPlayer(maxPos) == monsterImgs[i].distance) {
						if (actualMonster.imgYPosAdjustment != null) {
							yu += Math.round(height*actualMonster.imgYPosAdjustment);
						}
						Canvas.ctx().drawImage(monsterImgs[i], x, yu, width, height);
					} else {
						allValid = false;
						break;
					}
				}
			}
			if (!allValid) {
				MazeUtil.drawMonsters(maxPos, isBleeding);
			}
		}
	}, 20);
};

MazeUtil.drawItems = function(maxPos) {
	maxPos--;
	var imageArr = [];
	var posX = Game.player.position.x;
	var posY = Game.player.position.y;
	if (Game.player.position.direction == 'NORTH') {
		posY = posY - maxPos;
	} else if (Game.player.position.direction == 'SOUTH') {
		posY = posY + maxPos;
	} else if (Game.player.position.direction == 'EAST') {
		posX = posX + maxPos;
	} else if (Game.player.position.direction == 'WEST') {
		posX = posX - maxPos;
	}
	var z = 0;
	for (var i = maxPos; i >= 0; i--) {
		if (posX in Game.map.items && posY in Game.map.items[posX]) {
			var fieldStack = Game.map.items[posX][posY];
			for (var j = 0; j < fieldStack.length; j++) {
				imageArr[z] = new Image();
				imageArr[z].src = fieldStack[j].image;
				imageArr[z].distance = i;
				imageArr[z].onload = function() {
					var x = (this.distance > 0 ? Config.maze[this.distance-1] : 0);
					var yu = MazeUtil.calculateYUpper(x);
					var yl = MazeUtil.calculateYLower(x);
					var frameWidth = Canvas.width()-2*x;
					var frameHeight = yl-yu;
					var imageBaseWidth = 60;
					var imageBaseHeight = 60;
					var imgWidth = Math.round(imageBaseWidth*frameWidth/Canvas.width()*1.2);
					var imgHeight = Math.round(imageBaseHeight*(frameHeight/Canvas.height())*1.2);
					Canvas.ctx().drawImage(this, x+(frameWidth*0.7)-imgWidth, yu+frameHeight-5-imgHeight, imgWidth, imgHeight);
				};
				z++;
			}
		}
		if (Game.player.position.direction == 'NORTH') {
			posY++;
		} else if (Game.player.position.direction == 'SOUTH') {
			posY--;
		} else if (Game.player.position.direction == 'EAST') {
			posX--;
		} else if (Game.player.position.direction == 'WEST') {
			posX++;
		}
	}
};

MazeUtil.drawMagic = function(imageFileName, width, height) {
	var img = new Image();
	img.src = 'image/'+imageFileName;
	img.onload = function() {
		var imgWidth = width;
		var imgHeight = height;
		var x = Math.floor((Canvas.width()-imgWidth)/2);
		var y = Math.floor((Canvas.height()-imgHeight)/2)-50;
		Canvas.ctx().drawImage(this, x, y, imgWidth, imgHeight);
	}
};

MazeUtil.drawMagicMissile = function() {
	MazeUtil.drawMagic('magic_missile.png', 200, 200);
};

MazeUtil.drawFireball = function() {
	MazeUtil.drawMagic('fireball.png', 256, 254);
};

MazeUtil.drawLightning = function() {
	MazeUtil.drawMagic('lightning.png', 300, 300);
};

MazeUtil.drawGreenCloud = function() {
	MazeUtil.drawMagic('green_cloud.png', 300, 200);
};

MazeUtil.drawBlackSmoke = function() {
	MazeUtil.drawMagic('black_smoke.png', 300, 200);
};

MazeUtil.drawPowerWord = function() {
	MazeUtil.drawMagic('power_word.png', 256, 254);
};

MazeUtil.drawHealing = function() {
	MazeUtil.drawMagic('healing.png', 200, 200);
};

MazeUtil.drawHpBar = function() {
	var x = 20;
	var y = 15;
	var barWidth = 150;
	var barHeight = 20;
	Canvas.ctx().lineWidth = 1;
	Canvas.ctx().strokeStyle = '#ffffff';
	var color = 'green';
	if (Game.player.hp < Game.player.maxHp*0.6) {
		if (Game.player.hp < Game.player.maxHp*0.25) {
			color = 'red';
		} else {
			color = 'yellow';
		}
	}
	Canvas.ctx().fillStyle = color;
	Canvas.ctx().beginPath();
	Canvas.ctx().moveTo(x, y);
	Canvas.ctx().lineTo(x+barWidth, y);
	Canvas.ctx().lineTo(x+barWidth, y+barHeight);
	Canvas.ctx().lineTo(x, y+barHeight);
	Canvas.ctx().lineTo(x, y);
	Canvas.ctx().closePath();
	Canvas.ctx().stroke();
	if (Game.player.hp > 0) {
		Canvas.ctx().beginPath();
		Canvas.ctx().moveTo(x, y);
		Canvas.ctx().lineTo(x+Math.floor(barWidth*Game.player.hp/Game.player.maxHp), y);
		Canvas.ctx().lineTo(x+Math.floor(barWidth*Game.player.hp/Game.player.maxHp), y+barHeight);
		Canvas.ctx().lineTo(x, y+barHeight);
		Canvas.ctx().lineTo(x, y);
		Canvas.ctx().fill();
		Canvas.ctx().stroke();
	}
	Canvas.ctx().fillStyle = '#ffffff';
	Canvas.ctx().font = '20px Arial';
	Canvas.ctx().fillText(Game.player.hp, x+3, y+barHeight-3);
};

MazeUtil.drawLevelBar = function() {
	var x = Canvas.width() - 170;
	var y = 15;
	var barWidth = 150;
	var barHeight = 20;
	Canvas.ctx().lineWidth = 1;
	Canvas.ctx().strokeStyle = '#ffffff';;
	Canvas.ctx().fillStyle = '#8b008b';
	Canvas.ctx().beginPath();
	Canvas.ctx().moveTo(x, y);
	Canvas.ctx().lineTo(x+barWidth, y);
	Canvas.ctx().lineTo(x+barWidth, y+barHeight);
	Canvas.ctx().lineTo(x, y+barHeight);
	Canvas.ctx().lineTo(x, y);
	Canvas.ctx().closePath();
	Canvas.ctx().stroke();
	var xp = (Game.player.level < 2 ? Game.player.xp : Game.player.xp-Character.levels[Game.player.level-2]);
	if (xp > 0) {
		var maxXp = Character.levels[Game.player.level-1]-(Game.player.level < 2 ? 0 : Character.levels[Game.player.level-2]);
		Canvas.ctx().beginPath();
		Canvas.ctx().moveTo(x, y);
		Canvas.ctx().lineTo(x+Math.floor(barWidth*xp/maxXp), y);
		Canvas.ctx().lineTo(x+Math.floor(barWidth*xp/maxXp), y+barHeight);
		Canvas.ctx().lineTo(x, y+barHeight);
		Canvas.ctx().lineTo(x, y);
		Canvas.ctx().fill();
		Canvas.ctx().stroke();
	}
	Canvas.ctx().fillStyle = '#ffffff';
	Canvas.ctx().font = '20px Arial';
	Canvas.ctx().fillText(Game.player.xp, x+3, y+barHeight-3);
};

MazeUtil.drawBackstab = function() {
	var x = 25;
	var y = 60;
	Canvas.ctx().fillStyle = 'yellow';
	Canvas.ctx().font = '25px Arial';
	Canvas.ctx().fillText('BACKSTAB!', x, y);
};

MazeUtil.drawWeaponArmor = function() {
	var weaponImg = document.getElementById('weapon');
	weaponImg.src = (Game.player.weapon == null ? 'image/empty.png' : Game.player.weapon.image);
	document.getElementById('attackModifier').innerHTML = Game.player.attack;
	var armorImg = document.getElementById('armor');
	armorImg.src = (Game.player.armor == null ? 'image/empty.png' : Game.player.armor.image);
	document.getElementById('defenseModifier').innerHTML = Game.player.defense;
	document.getElementById('speedModifier').innerHTML = Game.player.speed;
	document.getElementById('level').innerHTML = Game.player.level;
};

MazeUtil.popUpEvent = function() {
	setTimeout(function() {
		var posX = Game.player.position.x;
		var posY = Game.player.position.y;
		if (posX in Game.map.events && posY in Game.map.events[posX] && Game.map.events[posX][posY] != null) {
			Message.print('"'+Game.map.events[posX][posY]+'"', false);
			alert(Game.map.events[posX][posY].replace(/\*/g, '"'));
			Game.map.events[posX][posY] = null;
		}
	}, MazeUtil.popUpSleep);
};

MazeUtil.popUpInitEvent = function() {
	if (Game.map.initEvent != null) {
		var eventText = Game.map.initEvent;
		setTimeout(function() {
			Message.print('"'+eventText+'"', false);
			alert(eventText.replace(/\*/g, '"'));
		}, MazeUtil.popUpSleep);
		Game.map.initEvent = null;
	}
};

MazeUtil.popUpEndEvent = function() {
	if (Game.map.endEvent != null) {
		Message.print('"'+Game.map.endEvent+'"', false);
		alert(Game.map.endEvent.replace(/\*/g, '"'));
		Game.map.endEvent = null;
	}
};

MazeUtil.calculateYUpper = function(x) {
	return Math.round((2 * x * Config.focusY) / Canvas.width());
};

MazeUtil.calculateYLower = function(x) {
	var y = Math.round((2 * x * (Canvas.height()-Config.focusY)) / Canvas.width());
	return Canvas.height() - y;
};