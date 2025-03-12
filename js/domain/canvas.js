var Canvas = {
	elem: null
};

Canvas.ctx = function() {
	return Canvas.elem.getContext('2d');
};

Canvas.width = function() {
	return Canvas.elem.width;
};

Canvas.height = function() {
	return Canvas.elem.height;
};