function Wall(textureType, mainColor, secondaryColor, floorColor) {
	this.textureType = (textureType == null ? 'Plain' : textureType);
	if (this.textureType != 'Plain' && this.textureType != 'TwoTriangles' && this.textureType != 'FourTriangles') {
		throw 'Texture type must be Plain, TwoTriangles or FourTriangles';
	}
	this.mainColor = (mainColor == null ? '#888888' : mainColor);
	this.secondaryColor = secondaryColor;
	this.floorColor = (floorColor == null ? '#000000' : floorColor);
};