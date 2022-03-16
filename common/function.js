var dateFormat=function(dateStr){
    var date = new Date(dateStr);
        Y = date.getFullYear(),
        M = ("0" + (date.getMonth() + 1)).slice(-2),
        D = ("0" + date.getDate()).slice(-2);
        h=(date.getHours()>9?date.getHours():"0"+date.getHours()) 
		m= (date.getMinutes()>9?date.getMinutes():"0"+date.getMinutes()) 
		s=(date.getSeconds()>9?date.getSeconds():"0"+date.getSeconds())

        return Y + "-" + M + "-" + D+ " " + h+':'+m+':'+s;
}

var dateStr=function(dateStr){
    var date = new Date(dateStr);
        Y = date.getFullYear(),
        M = ("0" + (date.getMonth() + 1)).slice(-2),
        D = ("0" + date.getDate()).slice(-2);
        h=(date.getHours()>9?date.getHours():"0"+date.getHours()) 
		m= (date.getMinutes()>9?date.getMinutes():"0"+date.getMinutes()) 
		s=(date.getSeconds()>9?date.getSeconds():"0"+date.getSeconds())

        return Y+M+D+h+m+s;
}

module.exports ={dateFormat,dateStr}