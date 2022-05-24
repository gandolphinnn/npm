//! unpublished
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