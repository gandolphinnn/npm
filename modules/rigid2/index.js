//! unpublished
//! MUST INCLUDE 'math' and 'graphic2'
class RigidRect{
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
		this.corners.push(new Coord(this.coord.x + mathF.cosD(this.degr)*(this.length/2) + mathF.cosD(this.degr+90)*(this.width/2),
							this.coord.y - mathF.sinD(this.degr)*(this.length/2) - mathF.sinD(this.degr+90)*(this.width/2)));
		if (this.width > 0) {
			this.corners.push(new Coord(this.coord.x + mathF.cosD(this.degr)*(this.length/2) - mathF.cosD(this.degr+90)*(this.width/2),
							this.coord.y - mathF.sinD(this.degr)*(this.length/2) + mathF.sinD(this.degr+90)*(this.width/2)));
		}
		if (this.length > 0) {
			this.corners.push(new Coord(this.coord.x - mathF.cosD(this.degr)*(this.length/2) - mathF.cosD(this.degr+90)*(this.width/2),
							this.coord.y + mathF.sinD(this.degr)*(this.length/2) + mathF.sinD(this.degr+90)*(this.width/2)));
			if (this.width > 0) {
				this.corners.push(new Coord(this.coord.x - mathF.cosD(this.degr)*(this.length/2) + mathF.cosD(this.degr+90)*(this.width/2),
								this.coord.y + mathF.sinD(this.degr)*(this.length/2) - mathF.sinD(this.degr+90)*(this.width/2)));
			}
		}
	}
	collision(rBody) {
		if (mathF.parentClass(rBody) == 'RigidRect') {
			let hitPoints = new Array(), line1, line2;
			for (let i = 0; i < this.corners.length; i++) {
				line1 = new Line(this.corners[i], this.corners[(i+1) % this.corners.length]);
				for (let i = 0; i < rBody.corners.length; i++) {
					line2 = new Line(rBody.corners[i], rBody.corners[(i+1) % rBody.corners.length]);
					if(line1.hitL(line2)) {
						hitPoints.push(line1.hitL(line2));
					}
				}
			}
			if (hitPoints.length == 0)
				return false;
			return hitPoints;
		}
		else if(mathF.parentClass(rBody) == 'RigidCirc') {
			console.log('Work In Progress');
			return false;
		}
	}
	bounce(mirrorDegr) {
		this.degr = mathF.formA(mirrorDegr*2-this.degr+180);
	}
	showHitbox() {
		let color = ctx.strokeStyle;
		ctx.strokeStyle = this.color;
		for (let i = 0; i < this.corners.length; i++) {
			drawF.line(this.corners[i], this.corners[(i+1)%this.corners.length]);
		}
		drawF.circle(this.coord, 3);
		ctx.strokeStyle = color;
	}
}
class RigidCirc {
	constructor(coord, degr, radius, color= 'black') {
		this.coord = coord;
		this.degr = degr;
		this.radius = radius;
		this.color = color
	}
	collision(rBody) {
		if (mathF.parentClass(rBody) == 'RigidRect') {
			console.log('Work In Progress');
			return false;
		}
		else if(mathF.parentClass(rBody) == 'RigidCirc') {
			let hitPoints = new Array();
			let d = Math.sqrt((this.coord.x - rCirc.coord.x) ** 2 + (this.coord.y - rCirc.coord.y) ** 2);
			if (d > this.radius + rCirc.radius) {
				return false;			
			}
			else {
				let x1 = this.coord.x, y1 = this.coord.y, r1 = this.radius;
				let x2 = rCirc.coord.x, y2 = rCirc.coord.y, r2 = rCirc.radius;
				let l = (r1**2 - r2**2 + d**2) / (2*d);
				let h = Math.sqrt(r1**2 - l**2);
				hitPoints.push(new Coord(l/d*(x2-x1) + h/d*(y2-y1) + x1, l/d*(y2-y1) - h/d*(x2-x1) + y1));
				hitPoints.push(new Coord(l/d*(x2-x1) - h/d*(y2-y1) + x1, l/d*(y2-y1) + h/d*(x2-x1) + y1));
			}
			return hitPoints;
		}
	}
	bounce(mirrorDegr) {
		this.degr = mathF.formA(mirrorDegr*2-this.degr+180);
	}
	showHitbox() {
		let color = ctx.strokeStyle;
		ctx.strokeStyle = this.color;
		drawF.circle(this.coord, this.radius, 'stroke');
		drawF.circle(this.coord, 3);
		ctx.strokeStyle = color;
	}
}
const rigidF = {
	bounce: (rBody, mirrorDegr) => {
		rBody.degr = mathF.formA(mirrorDegr*2-rBody.degr+180);
	},
	collision(rBody1, rBody2) {
		let hitPoints = new Array();
		if (mathF.parentClass(rBody1) == 'RigidRect' && mathF.parentClass(rBody2) == 'RigidRect') {
			//todo add point inside detection
			let line1, line2;
			for (let i = 0; i < rBody1.corners.length; i++) {
				line1 = new Line(rBody1.corners[i], rBody1.corners[(i+1) % rBody1.corners.length]);
				for (let i = 0; i < rBody2.corners.length; i++) {
					line2 = new Line(rBody2.corners[i], rBody2.corners[(i+1) % rBody2.corners.length]);
					if(line1.hitL(line2)) {
						hitPoints.push(line1.hitL(line2));
					}
				}
			}
			if (hitPoints.length == 0) {
				return false;
			}
		}
		else if (mathF.parentClass(rBody1) == 'RigidCirc' && mathF.parentClass(rBody2) == 'RigidCirc') {
			//todo add point inside detection
			let d = Math.sqrt((rCirc1.coord.x - rCirc2.coord.x) ** 2 + (rCirc1.coord.y - rCirc2.coord.y) ** 2);
			if (d > rCirc1.radius + rCirc2.radius) {
				return false;			
			}
			else {
				let x1 = rCirc1.coord.x, y1 = rCirc1.coord.y, r1 = rCirc1.radius;
				let x2 = rCirc2.coord.x, y2 = rCirc2.coord.y, r2 = rCirc2.radius;
				let l = (r1**2 - r2**2 + d**2) / (2*d);
				let h = Math.sqrt(r1**2 - l**2);
				hitPoints.push(new Coord(l/d*(x2-x1) + h/d*(y2-y1) + x1, l/d*(y2-y1) - h/d*(x2-x1) + y1));
				hitPoints.push(new Coord(l/d*(x2-x1) - h/d*(y2-y1) + x1, l/d*(y2-y1) + h/d*(x2-x1) + y1));
			}
		}
		else {
			let	rRect = mathF.parentClass(rBody1) == 'RigidRect'? rBody1 : rBody2;
			let	rCirc = mathF.parentClass(rBody1) == 'RigidCirc'? rBody1 : rBody2;
			/* let AM = coordF.dist(rRect.corners[0], rCirc.coord);
			let AB = coordF.dist(rRect.corners[0], rRect.corners[1]);
			let AD = coordF.dist(rRect.corners[0], mathF.last(rRect.corners));
			//(0<AM⋅AB<AB⋅AB)∧(0<AM⋅AD<AD⋅AD)
			if((0 < AM*AB) && (AM*AB < AB*AB) && (0 < AM*AD) && (AM*AD < AD*AD)) {
				console.log(true);
			} */
			
			//* distance circ center and rect corner <= circ radius
			//* distance circ center and rect edge <= circ radius
			//* circ center inside rect
			let corn = rRect.corners, D;
			for (let i = 0; i < corn.length; i++) {
				D = (corn[(i+1)%corn.length].x - corn[i].x) * (rCirc.coord.y - corn[i].y) - (rCirc.coord.x - corn[i].x) * (corn[(i+1)%rRect.corners.length].y - rRect.corners[i].y)
				/* if (D < 0) {
					console.log(D);
				} */
			}
		}
		return hitPoints;
	},
	rayCast(coord, degr, rBodies) {

	}
}