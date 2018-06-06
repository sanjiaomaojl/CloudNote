//根据用户id显示笔记本列表
function loadUserBooks(){
	//获取userId
	var userId = getCookie("userId");
	//alert(userId);
	//判断是否获取有效的userId
	if(userId == null){
		window.location.href("log_in.html");
	}else{
		//发送ajax请求
		$.ajax({
			url:path + "/book/loadbooks.do",
			type:"post",
			data:{"userId":userId},
			dataType:"json",
			success:function(result){
				//判断查询是否成功
				if(result.status == 0){
					//获取笔记本集合
					var books = result.data;
					for(var i=0;i<books.length;i++){
						//获取笔记本id
						var bookId = books[i].cn_notebook_id;
						var bookName = books[i].cn_notebook_name;
						//创建笔记本列表的li元素
						creatBookLi(bookId,bookName);
					}
				}
			},
			error:function(){
				alert("笔记本加载失败");
			}
		});
	}
};

//创建笔记本列表的li元素
function creatBookLi(bookId,bookName){
	var sli="";
	sli+='<li class="online">';
	sli+='<a>';
	sli+='<i class="fa fa-book" title="online" rel="tooltip-bottom">';
	sli+='</i>';
	sli+=bookName;
	sli+='</a>';
	sli+='</li>';
	//将sli字符串转换成jQuery对象li元素
	var $li = $(sli);
	//将bookId的值与jQuery对象绑定
	$li.data("bookId",bookId);
	//将li元素添加到笔记本ul列表区
	$("#book_ul").append($li);
}










