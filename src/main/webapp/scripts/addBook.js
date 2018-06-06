//
function addBook(){
	var userId = getCookie("userId");
	var bookName = $("#input_notebook").val();
	//alert(bookName);
	$.ajax({
		url:path + "/book/add.do",
		type:"post",
		data:{"userId":userId,"bookName":bookName},
		dataType:"json",
		success:function(result){
			var book = result.data;
			if(result.status == 0){
				var id = book.cn_notebook_id;
				var bookName = book.cn_notebook_name;
				creatBookLi(id,bookName);
				//提示修改成功
				alert(result.msg);
			}
		},
		error:function(){
			alert("笔记本创建失败");
		}
	});
}