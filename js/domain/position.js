function Position(x, y, direction) {
	if (direction != 'NORTH' && direction != 'SOUTH' && 
			direction != 'EAST' && direction != 'WEST' && direction != null) {
		throw 'Direction must be NORTH, SOUTH, EAST or WEST';
	}
	this.x = Math.floor(x);
	this.y = Math.floor(y);
	this.direction = direction;

	this.getNextPosition = function() {
		var x = this.x;
		var y = this.y;
		if (this.direction == 'NORTH') {
			y--;
		} else if (this.direction == 'SOUTH') {
			y++;
		} else if (this.direction == 'EAST') {
			x++;
		} else if (this.direction == 'WEST') {
			x--;
		}
		return new Position(x, y, null);
	};

	this.isNeighborPosition = function(posX, posY) {
		if ((this.x == posX && (this.y == posY+1 || this.y == posY-1)) || 
				(this.y == posY && (this.x == posX+1 || this.x == posX-1))) {
			return true;
		}
		return false;
	};
};