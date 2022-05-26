//! unpublished
//! MUST INCLUDE 'graphic2'
let inspectVar; //? to use to inspect a variable when you press a mouse button
let mouse = {
	pos: new Coord(),
	btn: {
		l: false,
		m: false,
		r: false
	}
};
let key = {
	w: false,
	up: false,
	a: false,
	left: false,
	s: false,
	down: false,
	d: false,
	right: false,
	q: false,
	e: false,
	r: false,
	shift: false,
	ctrl: false,
	space: false,
	enter: false,
	tab: false,
	esc: false
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
document.addEventListener('keydown', event => event.preventDefault());
document.addEventListener('keydown', function(e) {
	console.log(e.code);
	switch (e.code) {
		case 'KeyW': key.w = true; break;
		case 'ArrowUp': key.up = true; break;
		case 'KeyA': key.a = true; break;
		case 'ArrowLeft': key.left = true; break;
		case 'KeyS': key.s = true; break;
		case 'ArrowDown': key.down = true; break;
		case 'KeyD': key.d = true; break;
		case 'ArrowRight': key.right = true; break;
		case 'KeyQ': key.q = true; break;
		case 'KeyE': key.e = true; break;
		case 'KeyR': key.r = true; break;
		case 'Space': key.space = true; break;
		case 'Enter': key.enter = true; break;
		case 'Tab': key.tab = true; break;
		case 'Escape': key.esc = true; break;
		default: break;
	}
});
document.addEventListener('keyup', function(e) {
	switch (e.code) {
		case 'KeyW': key.w = false; break;
		case 'ArrowUp': key.up = false; break;
		case 'KeyA': key.a = false; break;
		case 'ArrowLeft': key.left = false; break;
		case 'KeyS': key.s = false; break;
		case 'ArrowDown': key.down = false; break;
		case 'KeyD': key.d = false; break;
		case 'ArrowRight': key.right = false; break;
		case 'LShift': case 'RShift': key.shift = false; break;		
		case 'LControl': case 'RControl': key.ctrl = false; break;		
		case 'KeyQ': key.q = false; break;
		case 'KeyE': key.e = false; break;
		case 'KeyR': key.r = false; break;
		case 'Space': key.space = false; break;
		case 'Enter': key.enter = false; break;
		case 'Tab': key.tab = false; break;
		case 'Escape': key.esc = false; break;
		default: break;
	}
});