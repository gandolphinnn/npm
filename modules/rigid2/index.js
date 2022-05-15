//! unpublished
const mathF = require('math');
const graphics = require('graphic2');
const Coord = graphics.Coord;
module.exports = {
	RigidRect: class {
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
			console.log('Work In Progress');
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
				graphics.line(this.corners[i], this.corners[(i+1)%this.corners.length]);
			}
		}
	},
	RigidCirc: class {
		constructor(coord, degr, radius) {
			this.coord = coord;
			this.degr = degr;
			this.radius = radius;
		}
		hitR(rRect) {
			console.log('Work In Progress');
		}
		hitC(rCirc) {
			return (Math.sqrt((this.coord.x - rCirc.coord.x) ** 2 + (this.coord.y - rCirc.coord.y) ** 2) <= this.radius + rCirc.radius);
		}
		bounce(mirrorDegr) {
			this.degr = mathF.formA(mirrorDegr*2-this.degr+180);
		}
	},
	rigidF: {
		bounce: (rBody, mirrorDegr) => {
			rigidBody.degr = mathF.formA(mirrorDegr*2-rigidBody.degr+180);
		},
		collCC: (rCirc1, rCirc2) => {
			return (Math.sqrt((rCirc1.coord.x - rCirc2.coord.x) ** 2 + (rCirc1.coord.y - rCirc2.coord.y) ** 2) <= rCirc1.radius + rCirc2.radius);
		},
		collRR: (rRect1, rRect2) => {
			console.log('Work In Progress');
		},
		collRC: (rRect, rCirc) => {
			console.log('Work In Progress');
		}
	}
}