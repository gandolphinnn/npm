//! unpublished
const unixF = {
	toDate: (timestamp, format = 'dd/mm/yyyy') => {
		let date = new Date(timestamp);
		let result = '';
		let val = {
			date: '',
			month: '',
			year: ''
		};
		if (format.indexOf('dd') != -1 && date.getDate() < 10) {
			val.date = date.getDate();
			format.slice(format.indexOf('dd'), format.indexOf('dd') + 1);
		}
		else if(format.indexOf('d') != -1) {
			val.date = date.getDate();
		}
		if (format.indexOf('mm') != -1 && date.getMonth() < 10) {
			val.month = date.getMonth();
			format.slice(format.indexOf('mm'), format.indexOf('mm') + 1);
		}
		else if(format.indexOf('m') != -1) {
			val.month = date.getMonth();
		}
		if (format.indexOf('yyyy') != -1) {
			val.year = date.getFullYear() % 100;
			format.slice(format.indexOf('yyyy'), format.indexOf('yyyy') + 1);
		}
		else if(format.indexOf('yy') != -1) {
			val.year = date.getFullYear();
			format.slice(format.indexOf('yy'), format.indexOf('yy') + 1);
		}
		format.forEach(char => {
			switch (char) {
				case 'd':
					result += val.date;
					break;
				case 'm':
					result += val.month;
					break;
				case 'y':
					result += val.year;
					break;
				default:
					result += char;
					break;
			}
		});
		return result;
	},
	toTime: (timestamp, format = 'hh:mm:ss') => {
		let time = new Date(timestamp);
		let H = time.getHours();
		let M = time.getMinutes();
		return (H < 10?'0':'') + H + ':' + (M < 10?'0':'') + M;
	},
	/**
	 * Convert from unix time to week day.
	 * @param {number} timestamp The unix timestamp.
	 * @param {string} format The format of the day:
	 * * 'f' or 'full' (default) for the full day name
	 * * 's' or 'short' for the 3-letter day name
	 * @return {string} The week day
	 */
	toWeekDay: (timestamp, format = 'full') => {
		let days;
		if (format == 'full' || format == 'f') {
			days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
		}
		else if(format == 'short' || format == 's') {
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