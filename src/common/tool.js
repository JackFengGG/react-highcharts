// MA
export const calculateMA = (data, dayCount) => {
	var result = [];
	for (var i = 0; i < data.length; i++) {
		if (i<dayCount) {
			result.push('-');
			continue;
		}
		var sum = 0;
		for (var j = 0; j < dayCount; j++) {
			sum += data[i-j].close;
		}
		var res = (sum/dayCount).toFixed(4);
		result.push(res);
	}
	return result;
}

//时间
const add0 = (m) => {return m<10?'0'+m:m }
//获取到分
export const getLocalTime = (nS) => {
    if (!nS) return '-';
    let time = new Date(parseInt(nS));
    let y = time.getFullYear();
    let m = time.getMonth()+1;
    let d = time.getDate();
    let h = time.getHours();
    let mm = time.getMinutes();
    let s = time.getSeconds();
    let dateStr = y+''+add0(m)+''+add0(d)+' '+add0(h)+':'+add0(mm)
    return dateStr;
  }
//  获取到秒
export const getLocalTimeSS = (nS) => {
    if (!nS) return '-';
    let time = new Date(parseInt(nS));
    let y = time.getFullYear();
    let m = time.getMonth()+1;
    let d = time.getDate();
    let h = time.getHours();
    let mm = time.getMinutes();
    let s = time.getSeconds();
    let dateStr = y+''+add0(m)+''+add0(d)+' '+add0(h)+':'+add0(mm)+':'+s
    return dateStr;
}
//获取到天
export const getLocalTimeDay = (nS) => {
    if (!nS) return '-';
    let time = new Date(parseInt(nS));
    let y = time.getFullYear();
    let m = time.getMonth()+1;
    let d = time.getDate();
    let dateStr = y+''+add0(m)+''+add0(d);
    return dateStr;
}