//! unpublished
const unixF = {
	toDate: (timestamp, format = 'dd/mm/yyyy') => {
		let date = new Date(timestamp);
		let result;
/* 		let cType = ''; //find a better way
		let types = ['d', 'm', 'y'];
		format.forEach(char => {
			let tIndex = types.indexOf(char);
			if (char != cType && tIndex == undefined) { //? separator
				result += char;
			}
			else if (char != type) {
				type = char;

			}
			else {
				if ()
			}
		}); */
		result = date.getDate() + '/' + (date.getMonth()+1) + '/' + date.getFullYear();
		return result;
	},
	toTime: (timestamp, format = 'hh:mm:ss') => {
		let time = new Date(timestamp);
		let H = time.getHours();
		let M = time.getMinutes();
		return (H < 10?'0':'') + H + ':' + (M < 10?'0':'') + M;
	},
	toWeekDay: (timestamp, format = 'full') => {
		let days;
		if (format == 'full') {
			days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
		}
		else if(format == 'short') {
			days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
		}
		return days[new Date(timestamp).getDay()];
	},
	dateCMP: (timestamp1, timestamp2) => {
		let d1 = unix.toDate(timestamp1).split('/');
		let d2 = unix.toDate(timestamp2).split('/');
		return d1[2] == d2[2]? (d1[1] == d2[1]? (d1[0] == d2[0]? false : true) : true) : true;
	}
}
module.exports = unixF;