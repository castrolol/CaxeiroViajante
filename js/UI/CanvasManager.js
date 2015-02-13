function CanvasManager(container, s){
	this.size = s || {w: 500, h: 500};
	var canvas = document.createElement("canvas");
	container.appendChild(canvas);

	this.canvas = canvas;
	this.canvas.width = this.size.w;
	this.canvas.height = this.size.h;
	this.ctx = canvas.getContext("2d");
	this.drawActions = [];
	this._stop = false;
}


CanvasManager.prototype.draw = function(drawAction) {
	
	this.drawActions.push(drawAction);

};


CanvasManager.prototype.clear = function() {
	this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
};


CanvasManager.prototype.init = function() {
	var self = this;

	function drawStep(){
		self.clear();
		self.drawActions.forEach(function(action){

			action(self.ctx);

		});
		if( self._stop ) return;
		requestAnimationFrame(drawStep);

	}
	this._stop = false;
	drawStep();

};


CanvasManager.prototype.stop = function(first_argument){
	this._stop = true;
};

