class Game {
	constructor() {
		this.gameObj = new Array();
	}
	backend() {
		this.gameObj.forEach(obj => {
			if (typeof obj == 'Rigidrect')
				this.gameObj.calculateCorners();
		});
	}
	frontend() {
		this.gameObj.forEach(obj => {
			obj.draw();
		});
	}
}
class Obj extends RigidRect {
	constructor() {
		super(new Coord(0, 0), 10, 10);
	}
}
let game = new Game();
let obj1 = new Obj();
console.log(obj1.parent); //RigiRect
animate(game);