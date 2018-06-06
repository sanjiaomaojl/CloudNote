var userToken = getCookie("userToken");
if(userToken==null){
	window.location.href=path+"/log_in.html";
}