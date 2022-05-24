//* published
	function formA(angle, type = '') {
		if (type == 'rad') {
			angle %= 360; // turn in |0 - 360| range
			if (angle < 0)
				angle += 360 // turn in positive angle
			angle *= Math.PI / 180;
		}
		if (type == 'degr') {
			angle *= 180 / Math.PI;
			angle %= 360; // turn in |0 - 360| range
			if (angle < 0)
				angle += 360 // turn in positive angle
		}
		if (type == '') {
			angle %= 360; // turn in |0 - 360| range
			if (angle < 0)
				angle += 360 // turn in positive angle
		}
		return angle;
	};
	function rand(min, max) {
		min = Math.ceil(min);
		max = Math.floor(max);
		return Math.floor(Math.random() * (max - min + 1)) + min;
	};
	function rand0(max) {
		max = Math.floor(max);
		return Math.floor(Math.random() * (max - 1));
	};
	function last(arr) {
		if (!Array.isArray(arr)) {
			return false;
		}
		return arr[arr.length-1];
	};
	function cosD(degr) {
		return Math.cos(formA(degr, 'rad'));
	};
	function sinD(degr) {
		return Math.sin(formA(degr, 'rad'));
	};