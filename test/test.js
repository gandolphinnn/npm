class Game {
	constructor(player) {
		this.player = player;
		this.gameObj = new Array();
	}
	backend() {
		this.player.move();
		this.player.calcCorners();
		this.gameObj.forEach(obj => {
			if (mathF.parentClass(obj) == 'RigidRect')
				obj.calcCorners();
		});
		this.gameObj.forEach(obj => {
			let hitPoints = rigidF.collision(this.player, obj)
			if (hitPoints) {
				hitPoints.forEach(point => {
					drawF.circle(point, 5);
				});
			}
		});
	}
	frontend() {
		this.player.showHitbox();
		this.gameObj.forEach(obj => {
			obj.draw();
		});
	}
	addObj(obj) {
		this.gameObj.push(obj)
	}
}
class Player extends RigidRect {
	constructor() {
		super(new Coord(320, 320), 0, 120, 120); //rect
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
		if (key.KE)
			this.degr -= 5;
		if (key.KQ)
			this.degr += 5;
	}
}
class Rect extends RigidRect {
	constructor() {
		super(new Coord(150, 150), 0, 200, 200, 'red');
	}
	draw() {
		this.showHitbox();
	}
}
class Circ extends RigidCirc {
	constructor() {
		super(new Coord(500, 500), 0, 50);
	}
	draw() {
		this.showHitbox();
	}
}
let game = new Game(new Player());
game.addObj(new Rect());
game.addObj(new Circ());
animate(game);