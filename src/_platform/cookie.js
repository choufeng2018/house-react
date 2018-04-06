//封装cookie的操作
//功能一：添加cookie的操作
function addCookie(cookieKey,cookieValue,overSeconds){
	document.cookie = cookieKey +"="+cookieValue +";max-age="+overSeconds;
}
//功能二：删除cookie的操作
function deleteCookie(cookieKey){
	//方式一
	//document.cookie = cookieKey +"=;max-age=-1";
	//方式二
	addCookie(cookieKey,"",-1);
}
//功能三：通过key，获取cookie中对应的value值
function getCookie(cookieKey){
	var arr = document.cookie.split("; ");
	for (var i = 0;i < arr.length;i++) {
		var arr2 = arr[i].split("=");
		//遍历时，arr2[0]存储此时的key，arr[1]存储key对应的value值
		if (arr2[0].trim() == cookieKey) {
			//找出该key值
			return arr2[1];
		}
	}
}
//功能四：判断cookie是否存在
function isCookieKey(cookieKey){
	var arr = document.cookie.split(";");
	for (var i = 0;i < arr.length;i++) {
		var arr2 = arr[i].split("=");
		if (arr2[0].trim() == cookieKey) {
			//找出该key值
			return true;
		}
	}
	return false;
}
export {addCookie, deleteCookie, getCookie, isCookieKey}
