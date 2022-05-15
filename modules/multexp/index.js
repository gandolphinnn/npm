let v = 4;
console.log(v);
module.exports = {
	f1: () => {
		console.log('first export');
	},
	f2: () => {
		console.log('second export');
	},
	C1: class {
		constructor() {
			this.a = v;
		}
		clog() {
			console.log(this.a);
		}
	},
};