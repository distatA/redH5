function myTime(value) {
	let date = new Date(value)
	let year = date.getFullYear()
	let month = date.getMonth() + 1
	month = month > 9 ? month : ('0' + month)
	let day = date.getDate()
	day = day > 9 ? day : ('0' + day)
	let hh = date.getHours()
	hh = hh > 9 ? hh : ('0' + hh)
	let mm = date.getMinutes()
	mm = mm > 9 ? mm : ('0' + mm)
	let ss = date.getSeconds()
	ss = ss > 9 ? ss : ('0' + ss)
	let time = year + '-' + month + '-' + day + ' ' + hh + ':' + mm + ':' + ss
	return time
}

export  {
	myTime
}
