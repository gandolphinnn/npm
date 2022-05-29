class Game {
	constructor() {
		this.gameObj = new Array();
	}
	backend() {
		this.gameObj.forEach(obj => {
			if (mathF.parentClass(obj) == 'RigidRect')
				obj.calcCorners();
		});
		this.gameObj[0].move();
	}
	frontend() {
		this.gameObj.forEach(obj => {
			obj.showHitbox();
		});
	}
	addObj(obj) {
		this.gameObj.push(obj)
	}
}
class Obj extends RigidRect {
	constructor() {
		super(new Coord(100, 100), 0, 100, 100); //rect
		//super(new Coord(100, 100), 0, 50); //circ
	}
	draw() {
		this.showHitbox();
	}
	move() {
		if (key.KW || key.Up)
			this.coord.y -= 5;
		if (key.KA || key.Left)
			this.coord.x -= 5;
		if (key.KS || key.Down)
			this.coord.y += 5;
		if (key.KD || key.Right)
			this.coord.x += 5;
	}
}
let game = new Game();
game.addObj(new Obj());
animate(game);