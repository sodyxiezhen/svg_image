import $ from 'jquery'
class Star{
	constructor(params){
		if (typeof params.resource == 'undefined') {
			throw new Error('resource invalid');
		}
		if (typeof params.pen == 'undefined') {
			throw new Error('resource invalid');
		}
		this.resource = params.resource;
		this.pen = params.pen;
		this.manager = params.manager;
		this.startX = params.startX || 0;
		this.startY = params.startY || 0;
		this._image = this.pen.image(this.resource, 20, 20);
		this.startMove();
	}
	startMove(){
		var _self = this;
		var _selfImage = this._image;
		var xStep = this.getRrandStep();
		var yStep = this.getRrandStep();
		var direction = _self.getRandDirection();

		var paintWidth = this.manager.width;
		console.log('xStep == ' + xStep + ' yStep == ' + yStep);
		setInterval(function(){
			if (_self.startY > _self.manager.height) {
				_self.startY = 0;	
			}
			if (_self.startX > paintWidth) {
				console.log(_self.startX);
				console.log(paintWidth);
				_self.startX = 0;	
				console.log(_self.startX);
			}

			if (_self.startX < 0) {
				_self.startX = paintWidth;	
			}
			if (direction) {
				_self.startX += xStep;
			} else {
				_self.startX -= xStep;
			}
			_self.startY += yStep;
			_selfImage.move(_self.startX, _self.startY);
		}, 25);
	}
	getRrandStep(){
		var rand = Math.floor(Math.random() * 20);
		return 0.5 + rand * 0.03;
	}
	getRandDirection(){
		return Math.random() < 0.5;
	}
}
module.exports = Star;