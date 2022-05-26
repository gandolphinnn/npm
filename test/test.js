class R extends RigidRect {
	constructor(coord, degr, w, l) {
		super(coord, degr, w, l);
	}
}
class C extends RigidCirc {
	constructor(coord, degr, r) {
		super(coord, degr, r);
	}
}
function animate() {
	ctx.clearRect(0,0, innerWidth, innerHeight);
	requestAnimationFrame(animate);
	obj1.showHitbox();
	obj2.showHitbox();
	let points = obj1.hitR(obj2);
	if (points) {
		points.forEach(point => {
			drawF.circle(point, 3);
		});
	}
	obj1.degr++;
	obj1.calcCorners();
	obj2.coord.x += Math.sin(mathF.formA(obj1.degr, 'rad'));
	obj2.calcCorners();
	if (key.s || key.down) {
		obj3.coord.y++;
	}
	if (key.w || key.up) {
		obj3.coord.y--;
	}
	if (key.d || key.right) {
		obj3.coord.x++;
	}
	if (key.a || key.left) {
		obj3.coord.x--;
	}
	points = rigidF.collCC(obj3, obj4);
	if (points) {
		points.forEach(point => {
			drawF.circle(point, 3);
		});
	}
	obj3.showHitbox();
	obj4.showHitbox();

}
let obj1 = new R(new Coord(200, 200), 50, 100, 200);
let obj2 = new R(new Coord(280, 200), 50, 100, 200);
let obj3 = new C(new Coord(200, 500), 50, 50);
let obj4 = new C(new Coord(280, 480), 50, 50);
animate();