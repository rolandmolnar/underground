function EnterPosition(nextMapIdx, initPosition, systemDirection) {
	this.nextMapIdx = nextMapIdx;
	this.initPosition = initPosition;
	this.systemDirection = (systemDirection == null ? '' : systemDirection);
};