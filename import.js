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
	function last(arr) {
		if (!Array.isArray(arr)) {
			return false;
		}
		return arr[arr.length-1];
	}
	function cosD(degr) {
		return Math.cos(formA(degr, 'rad'));
	}
	function sinD(degr) {
		return Math.sin(formA(degr, 'rad'));
	}
//* graphics
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
	function sum2Coord(coord1, coord2) {
		return new Coord(coord1.x + coord2.x, coord1.y + coord2.y);
	}
	function sumCoordVal(coord1, x, y) {
		return new Coord(coord1.x + x, coord1.y + y);
	}
	function dist(coord1, coord2) {
		return Math.sqrt(((coord1.x - coord2.x) ** 2) + ((coord1.y - coord2.y) ** 2));
	}
	let canvas = document.querySelector("canvas");
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
	const cnv = {
		w: canvas.width,
		h: canvas.height,
		c: new Coord(canvas.width/2, canvas.height/2)
	}
	let ctx = canvas.getContext("2d");
	function circle(coord, radius, action = '') {
		ctx.beginPath();
		ctx.arc(coord.x, coord.y, radius, 0, Math.PI * 2);
		if (action == '' || action == 'fill') {
			ctx.fill();
		}
		if (action == '' || action == 'stroke') {
			ctx.stroke();
		}
	}
	function rectV(coord, width, length, action = '') { //? rect with lines parallel to screen
		ctx.beginPath();
		ctx.rect(coord.x, coord.y, width, length);
		if (action == '' || action == 'fill') {
			ctx.fill();
		}
		if (action == '' || action == 'stroke') {
			ctx.stroke();
		}
	}
	function rectC(coord1, coord2, action = '') { //? rect with lines parallel to screen
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
	}
	function line(coord1, coord2) {
		ctx.beginPath();
		ctx.moveTo(coord1.x, coord1.y);
		ctx.lineTo(coord2.x, coord2.y);
		ctx.stroke();
	}
	function showUnits(unit = 0) {
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
//* rigidbodies
	class RigidRect {
		constructor(coord, degr, width, length, color = 'black') {
			this.coord = coord;
			this.degr = degr;
			this.width = (width == null || width < 0)? 0 : width;
			this.length = (length == null || length < 0)? 0 : length;
			this.corners = new Array();
			this.color = color;
			this.calcCorners();
		}
		calcCorners() {
			this.corners = new Array();
			this.corners.push(new Coord(this.coord.x + cosD(this.degr)*(this.length/2) + cosD(this.degr+90)*(this.width/2),
								this.coord.y - sinD(this.degr)*(this.length/2) - sinD(this.degr+90)*(this.width/2)));
			if (this.width > 0) {
				this.corners.push(new Coord(this.coord.x + cosD(this.degr)*(this.length/2) - cosD(this.degr+90)*(this.width/2),
								this.coord.y - sinD(this.degr)*(this.length/2) + sinD(this.degr+90)*(this.width/2)));
			}
			if (this.length > 0) {
				this.corners.push(new Coord(this.coord.x - cosD(this.degr)*(this.length/2) - cosD(this.degr+90)*(this.width/2),
								this.coord.y + sinD(this.degr)*(this.length/2) + sinD(this.degr+90)*(this.width/2)));
				if (this.width > 0) {
					this.corners.push(new Coord(this.coord.x - cosD(this.degr)*(this.length/2) + cosD(this.degr+90)*(this.width/2),
									this.coord.y + sinD(this.degr)*(this.length/2) - sinD(this.degr+90)*(this.width/2)));
				}
			}
		}
		hitR(rRect) {
			
		}
		hitC(rCirc) {
			
		}
		bounce(mirrorDegr) {
			this.degr = formA(mirrorDegr*2-this.degr+180);
		}
		showHitbox() {
			ctx.strokeStyle = this.color;
			for (let i = 0; i < this.corners.length; i++) {
				line(this.corners[i], this.corners[(i+1)%this.corners.length]);
				//ctx.fillText(i, this.corners[i].x, this.corners[i].y);
			}
		}
	}
	class RigidCirc {
		constructor(coord, degr, radius) {
			this.coord = coord;
			this.degr = degr;
			this.radius = radius;
		}
		hitR(rRect) {
			
		}
		hitC(rCirc) {
			return (Math.sqrt((rCirc.coord.x - this.coord.x) **2 + (rCirc.coord.y - this.coord.y) ** 2) <= rCirc.radius + this.radius);
		}
		bounce(mirrorDegr) {
			this.degr = formA(mirrorDegr*2-this.degr+180);	
		}
	}
//* user commands
	let inspectVar; //? use to inspect a variable when you press a mouse button
	let mouse = {
		pos: new Coord(),
		btn: {
			l: false,
			m: false,
			r: false
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
		if (inspectVar != undefined) {
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
		esc: false
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
			case 'Escape': key.esc = true; break;
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
			case 'Escape': key.esc = false; break;
			default: break;
		}
	});