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
	hitR(rRect) {
		let hitPoints = new Array(), line1, line2;
		for (let i = 0; i < this.corners.length; i++) {
			line1 = new Line(this.corners[i], this.corners[(i+1) % this.corners.length]);
			for (let i = 0; i < rRect.corners.length; i++) {
				line2 = new Line(rRect.corners[i], rRect.corners[(i+1) % rRect.corners.length]);
				if(line1.hitL(line2)) {
					hitPoints.push(line1.hitL(line2));
				}
			}
		}
		if (hitPoints.length == 0) {
			return false;
		}
		return hitPoints;
	}
	hitC(rCirc) {
		console.log('Work In Progress');
	}
	bounce(mirrorDegr) {
		this.degr = mathF.formA(mirrorDegr*2-this.degr+180);
	}
	showHitbox() {
		ctx.strokeStyle = this.color;
		for (let i = 0; i < this.corners.length; i++) {
			drawF.line(this.corners[i], this.corners[(i+1)%this.corners.length]);
		}
	}
}
class RigidCirc {
	constructor(coord, degr, radius, color= 'black') {
		this.coord = coord;
		this.degr = degr;
		this.radius = radius;
		this.color = color
	}
	hitR(rRect) {
		console.log('Work In Progress');
	}
	hitC(rCirc) {
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
	bounce(mirrorDegr) {
		this.degr = mathF.formA(mirrorDegr*2-this.degr+180);
	}
	showHitbox() {
		ctx.strokeStyle = this.color;
		drawF.circle(this.coord, this.radius, 'stroke');
	}
}
const rigidF = {
	bounce: (rBody, mirrorDegr) => {
		rigidBody.degr = mathF.formA(mirrorDegr*2-rigidBody.degr+180);
	},
	collRR: (rRect1, rRect2) => {
		let hitPoints = new Array(), line1, line2;
		for (let i = 0; i < rRect1.corners.length; i++) {
			line1 = new Line(rRect1.corners[i], rRect1.corners[(i+1) % rRect1.corners.length]);
			for (let i = 0; i < rRect2.corners.length; i++) {
				line2 = new Line(rRect2.corners[i], rRect2.corners[(i+1) % rRect2.corners.length]);
				if(line1.hitL(line2)) {
					hitPoints.push(line1.hitL(line2));
				}
			}
		}
		if (hitPoints.length == 0) {
			return false;
		}
		return hitPoints;
	},
	collCC: (rCirc1, rCirc2) => {
		let hitPoints = new Array();
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
		return hitPoints;
	},
	collRC: (rRect, rCirc) => {
		console.log('Work In Progress');
	}
}