//! unpublished
let canvas = document.querySelector("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
class Coord{
	constructor(x, y) {
		this.x = x;
		this.y = y;
	}
	set(newX, newY) {
		this.x = newX;
		this.y = newY;
	}
	add(addX, addY) {
		this.x += addX;
		this.y += addY;
	}
	dist(coord) {
		return Math.sqrt((this.x + coord.x) ** 2 + (this.y + coord.y )** 2);
	}
}
ctx = canvas.getContext("2d"),
cnv = {
	body: canvas,
	width: canvas.width,
	height: canvas.height,
	center: new Coord(canvas.width/2, canvas.height/2)
};
let coordF = {
	sum2: (coord1, coord2) => {
		return new Coord(coord1.x + coord2.x, coord1.y + coord2.y);
	},
	sumVal: (coord1, x, y) => {
		return new Coord(coord1.x + x, coord1.y + y);
	},
	dist: (coord1, coord2) => {
		return Math.sqrt(((coord1.x - coord2.x) ** 2) + ((coord1.y - coord2.y) ** 2));
	},
};
drawF = {
	circle: (coord, radius, action = '') => {
		ctx.beginPath();
		ctx.arc(coord.x, coord.y, radius, 0, Math.PI * 2);
		if (action == '' || action == 'fill') {
			ctx.fill();
		}
		if (action == '' || action == 'stroke') {
			ctx.stroke();
		}
	},
	rectV: (coord, width, length, action = '') => { //? rect with lines parallel to screen
		ctx.beginPath();
		ctx.rect(coord.x, coord.y, width, length);
		if (action == '' || action == 'fill') {
			ctx.fill();
		}
		if (action == '' || action == 'stroke') {
			ctx.stroke();
		}
	},
	rectC: (coord1, coord2, action = '') => { //? rect with lines parallel to screen
		ctx.beginPath();
		let x = (coord2.x < coord1.x)? coord2.x : coord1.x;
		let y = (coord2.y < coord1.y)? coord2.y : coord1.y;
		let w = Math.abs(coord1.x-coord2.x);
		let h = Math.abs(coord1.y-coord2.y);		
		ctx.rect(x, y, w, h);
		if (action == '' || action == 'fill') {
			ctx.fill();
		}
		if (action == '' || action == 'stroke') {
			ctx.stroke();
		}
	},
	line: (coord1, coord2) => {
		ctx.beginPath();
		ctx.moveTo(coord1.x, coord1.y);
		ctx.lineTo(coord2.x, coord2.y);
		ctx.stroke();
	},
	units: (unit = 0) => {
		ctx.clearRect(0,0, innerWidth, innerHeight);
		let lineL = [1, 5, 10, 50, 100, 250, 500, 1000];
		if (unit > 0 && unit < cnv.w && !lineL.includes(unit)) {
			lineL.push(unit);
			lineL.sort(function(a, b) {
				return a - b;
			});
		}
		let coord = new Coord(cnv.c.x-500, cnv.c.y-(20*lineL.length/2));
		ctx.lineWidth = 4;
		lineL.forEach(l => {
			if (l == unit) {
				ctx.strokeStyle = 'red';
			}
			else {
				ctx.strokeStyle = 'black';
			}
			line(coord, sumCoordVal(coord, l, 0));
			coord.add(0, 20);
		});
	}
};