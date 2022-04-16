//* math
	function formA(angle, type = '') {
		if (type == 'rad') {
			angle %= 360; // turn in |0 - 360| range
			if (angle < 0)
				angle += 360 // turn in positive angle
			angle *= Math.PI / 180;
		}
		if (type == 'degr') {
			angle *= 180 / Math.PI;
			angle %= 360; // turn in |0 - 360| range
			if (angle < 0)
				angle += 360 // turn in positive angle
		}
		if (type == '') {
			angle %= 360; // turn in |0 - 360| range
			if (angle < 0)
				angle += 360 // turn in positive angle
		}
		return angle;
	}
	function rand(min, max) {
		min = Math.ceil(min);
		max = Math.floor(max);
		return Math.floor(Math.random() * (max - min + 1)) + min;
	}
	function rand0(max) {
		max = Math.floor(max);
		return Math.floor(Math.random() * (max - 1));
	}
//* graphics
	let canvas = document.querySelector("canvas");
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
	let ctx = canvas.getContext("2d");
	class Coord {
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
	function sumCoord(coord1, coord2) {
		return new Coord(coord1.x + coord2.x, coord1.y + coord2.y);
	}
	function dist(coord1, coord2) {
		return Math.sqrt(((coord1.x - coord2.x) ** 2) + ((coord1.y - coord2.y) ** 2));
	}
	function circle(coord, radius) {
		ctx.beginPath();
		ctx.arc(coord.x, coord.y, radius, 0, Math.PI * 2);
		ctx.fill();
	}
	class RigidRect {
		constructor(coord, degr, width, length) {
			if(width == null && length == null)
				width = 1;
			this.coord = coord;
			this.degr = degr;
			this.width = width;
			this.length = length;
			this.angles = new Array((width == null || length == null)? 2 : 4);
			this.calcAngles
		}
		calcAngles() {
			this.barr.p1.set(inters.x + Math.cos(formA(this.barr.degr, 'rad'))* this.barr.len/2,
			inters.y - Math.sin(formA(this.barr.degr, 'rad'))* this.barr.len/2);
			this.barr.p2.set(inters.x - Math.cos(formA(this.barr.degr, 'rad'))* this.barr.len/2,
			inters.y + Math.sin(formA(this.barr.degr, 'rad'))* this.barr.len/2);
		}
		hitR(rigidRect) {
			
		}
		hitC(rigidCirc) {

		}
		bounce(mirrorDegr) {
			if (mirrorDegr >= 180) {
				mirrorDegr -= 180;
			}	
		}
	}
	class RigidCirc {
		constructor(coord, degr, radius) {
			this.coord = coord;
			this.degr = degr;
			this.radius = radius;
		}
		hitR(rigidRect) {
			
		}
		hitC(rigidCirc) {

		}
		bounce(mirrorDegr) {
			if (mirrorDegr >= 180) {
				mirrorDegr -= 180;
			}	
		}
	}
//* user commands
	let inspectVar; //? to use to inspect a variable when you press a mouse button
	let mouse = {
		pos: new Coord(),
		btn: {
			l: false,
			r: false,
			m: false
		}
	};
	document.addEventListener('contextmenu', event => event.preventDefault());
	document.addEventListener('mousedown', function(e) {
		switch (e.button) {
			case 0: mouse.btn.l = true; break;
			case 1: mouse.btn.m = true; e.preventDefault(); break;
			case 2: mouse.btn.r = true; break;
			default: break;
		}
		if (inspectVar != undefined && inspectVar != null) {
			console.log(inspectVar);
		}
	})
	document.addEventListener('mouseup', function(e) {
		switch (e.button) {
			case 0: mouse.btn.l = false; break;
			case 1: mouse.btn.m = false; break;
			case 2: mouse.btn.r = false; break;
			default: break;
		}
	})
	document.addEventListener('mousemove', function(e) {
		mouse.pos.y = e.clientY;
		mouse.pos.x = e.clientX;
	});
	let key = {
		w: false,
		a: false,
		s: false,
		d: false,
		shift: false,
		ctrl: false,
		q: false,
		e: false,
		space: false,
		enter: false,
	};
	document.addEventListener('keydown', function(e) {
		switch (e.code) {
			case 'KeyW': case 'ArrowUp': key.w = true; break;		
			case 'KeyA': case 'ArrowLeft': key.a = true; break;		
			case 'KeyS': case 'ArrowDown': key.s = true; break;		
			case 'KeyD': case 'ArrowRight':	key.d = true; break;		
			case 'LShift': case 'RShift': key.shift = true; break;		
			case 'LControl': case 'RControl': key.ctrl = true; break;		
			case 'KeyQ': key.q = true; break;
			case 'KeyE': key.e = true; break;
			case 'Space': key.space = true; break;
			case 'Enter': key.enter = true; break;
			default: break;
		}
	});
	document.addEventListener('keyup', function(e) {
		switch (e.code) {
			case 'KeyW': case 'ArrowUp': key.w = false; break;		
			case 'KeyA': case 'ArrowLeft': key.a = false; break;		
			case 'KeyS': case 'ArrowDown': key.s = false; break;		
			case 'KeyD': case 'ArrowRight':	key.d = false; break;		
			case 'LShift': case 'RShift': key.shift = false; break;		
			case 'LControl': case 'RControl': key.ctrl = false; break;		
			case 'KeyQ': key.q = false; break;
			case 'KeyE': key.e = false; break;
			case 'Space': key.space = false; break;
			case 'Enter': key.enter = false; break;
			default: break;
		}
	});