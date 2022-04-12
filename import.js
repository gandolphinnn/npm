class Coord {
	constructor(x, y) {
		this.x = x;
		this.y = y;
	}
	set(newx, newy) {
		this.x = newx;
		this.y = newy;
	}
	add(addX, addY) {
		this.x += addX;
		this.y += addY;
	}
	dist(coord) {
		return Math.sqrt((this.x + coord.x) ** 2 + (this.y + coord.y )** 2);
	}
}
function circle(coord, radius) {
	ctx.beginPath();
	ctx.arc(coord.x, coord.y, radius, 0, Math.PI * 2);
	ctx.fill();
}
function rand(min, max) {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min + 1)) + min;
}
function rand(max) {
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - 1));
}
let mouse = {
	pos: new Coord(),
	state: null
}
let key = {
	up: false,
	down: false,
	left: false,
	right: false,
	space: false,
	enter: false,
	shift: false,
	ctrl: false,
};
document.addEventListener('mousemove', function(e) {
	mouse.pos.y = e.clientY;
	mouse.pos.x = e.clientX;
});
document.addEventListener('keydown', function(e) {
	if ((e.code == 'KeyW' || e.code == 'ArrowUp') && !key.up) {
		key.up = true;
	}
	if ((e.code == 'KeyA' || e.code == 'ArrowLeft') && !key.left) {
		key.left = true;
	}
	if ((e.code == 'KeyD' || e.code == 'ArrowRight') && !key.right) {
		key.right = true;
	}
	if ((e.code == 'KeyS' || e.code == 'ArrowDown') && !key.down) {
		key.down = true;
	}
	if ((e.code == 'Space') && !key.space) {
		key.space = true;
	}
	if ((e.code == 'Enter') && !key.enter) {
		key.enter = true;
	}
	if ((e.code == 'LShift' || e.code == 'RShift') && !key.shift) {
		key.shift = true;
	}
	if ((e.code == 'LControl' || e.code == 'RControl') && !key.ctrl) {
		key.ctrl = true;
	}
});
document.addEventListener('keyup', function(e) {
	if ((e.code == 'KeyW' || e.code == 'ArrowUp') && key.up) {
		key.up = false;
	}
	if ((e.code == 'KeyA' || e.code == 'ArrowLeft') && key.left) {
		key.left = false;
	}
	if ((e.code == 'KeyD' || e.code == 'ArrowRight') && key.right) {
		key.right = false;
	}
	if ((e.code == 'KeyS' || e.code == 'ArrowDown') && key.down) {
		key.down = false;
	}
	if ((e.code == 'Space') && key.space) {
		key.space = false;
	}
	if ((e.code == 'Enter') && key.enter) {
		key.enter = false;
	}
	if ((e.code == 'LShift' || e.code == 'RShift') && key.shift) {
		key.shift = false;
	}
	if ((e.code == 'LControl' || e.code == 'RControl') && key.ctrl) {
		key.ctrl = false;
	}
});