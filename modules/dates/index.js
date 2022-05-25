//! unpublished
const unixF = {
	toDate: (timestamp, format = 'dd/mm/yyyy') => {
		let date = new Date(timestamp);
		let result = '';
		let val = {
			date: date.getDate(),
			month: date.getMonth() + 1,
			year: date.getFullYear()
		};
		if (format.indexOf('dd') != -1) {
			format = format.replace('d', '');
			if (date.getDate() < 10) {
				val.date = '0' + val.date;
			}
		}
		if (format.indexOf('mm') != -1) {
			format = format.replace('m', '');
			if (date.getMonth() < 10) {
				val.month = '0' + val.month;
			}
		}
		if (format.indexOf('yyyy') != -1) {
			format = format.replace('yyy', '');
		}
		else if(format.indexOf('yy') != -1) {
			val.year %= 100;
			format = format.replace('y', '');
		}
		for (const char of format) {
			console.log(char);
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
		};
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
	 * * 'f' or 'full' (default) for the full day name or the number of letters you want to output
	 * @return {string} The week day
	 */
	toWeekDay: (timestamp, letters = 'full') => {
		let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
		if (letters == 'full' || letters == 'f') {
			return days[new Date(timestamp).getDay()];
		}
		else if(letters >= 0) {
			return days[new Date(timestamp).getDay()].slice(0, letters);
		}
	},
	dateCMP: (timestamp1, timestamp2) => {
		let d1 = unix.toDate(timestamp1).split('/');
		let d2 = unix.toDate(timestamp2).split('/');
		return d1[2] == d2[2]? (d1[1] == d2[1]? (d1[0] == d2[0]? false : true) : true) : true;
	}
}