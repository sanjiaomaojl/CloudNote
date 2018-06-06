//弹出创建笔记对话框
function alertAddNoteWindow(){
	//判断是否有笔记本被选中
	var $li=$("#book_ul a.checked").parent();
	if($li.length == 0){
		alert("请选择笔记本");
	}else{//弹出创建笔记对话框
		$("#can").load("alert/alert_note.html");
		//显示背景
		$(".opacity_bg").show();
	}
}
//弹出新建笔记本对话框
function alertAddBookWindow(){
	//弹出新建笔记本对话框
	$("#can").load("alert/alert_notebook.html");
	//显示背景
	$(".opacity_bg").show();
}
//弹出删除笔记对话框
function alertDeleteWindow(){
	//弹出删除笔记对话框
	$("#can").load("alert/alert_delete_note.html");
	//显示背景
	$(".opacity_bg").show();
}
//关闭对话框
function closeAlertWindow(){
	//清空div内容
	$("#can").html("");
	//隐藏背景色
	$(".opacity_bg").hide();
}
