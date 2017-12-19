import $ from 'jquery'
import SVG from 'svg.js'
import png1 from '../images/1.png'
import png2 from '../images/2.png'
import Star from './Star.js'
export default {
	container: 'drawing',
	width: '100%',
	height: 400,
	bgColor: '#f06',
	pen: null,
	background: null,
	star1Resource: null,
	star1Num: 10,
	star2Resource: null,
	star2Num: 10,
	startWork: function(){
		this.init();
		var _this = this;
		setTimeout(function(){
			_this.drawStar1();
		 	_this.drawStar2();
		},10);
		
	},
	init(){
		let width = $(window).width();
		let height = $(window).height();
		this.width = width;
		this.height = height;
		this.pen = SVG(this.container).size(this.width, this.height);
		this.background = this.pen.rect('100%', '100%').attr({ fill: this.bgColor });
		this.star1Resource = png1;
		this.star2Resource = png2;
		this.star1Num = parseInt(width / 100);
		this.star2Num = parseInt(width / 80);
	},
	drawStar1(){
		for (let i=0; i< this.star1Num; i++) {
			this._drawStar(png1,100 * i, parseInt(Math.random() * this.height));
		}
	},
	drawStar2(){
		for (let i=0; i< this.star2Num; i++) {
			this._drawStar(png2,80 * i, parseInt(Math.random() * this.height));
		}
	},
	_drawStar(starResource, startX, startY){
		var params = {
			resource: starResource,
			startX: startX,
			startY: startY,
			pen: this.pen,
			manager: this
		};
		new Star(params);
	}
};