//更新笔记信息
function updateNote(){
	//判断是否有笔记被选中
	var $li=$("#note_ul a.checked").parent();
	if($li.length == 0){
		alert("请选择笔记");
	}else{
		//获取笔记Id
		var noteId=$li.data("noteId");
		//获取笔记标题和内容
		var noteTitle = 
			$("#input_note_title").val().trim();
		var noteBody = um.getContent();
		//alert(noteId);
		//发送ajax请求
		$.ajax({
			url:path + "/note/update.do",
			type:"post",
			data:{"noteId":noteId,
				  "title":noteTitle,
				  "body":noteBody},
			dataType:"json",
			success:function(result){
				if(result.status == 0){
					var str = "";
					str+='<i class="fa fa-file-text-o" title="online" rel="tooltip-bottom"></i>'; 
					str+=noteTitle;
					str+='<button type="button" class="btn btn-default btn-xs btn_position btn_slide_down">';
					str+='<i class="fa fa-chevron-down"></i>';
					str+='</button>';
					//将str替换到li的a元素里
					$li.find("a").html(str);
					//提示修改成功
					alert(result.msg);
				}
			},
			error:function(){
				alert("保存笔记失败!");
			}
		});
	}
}
//显示笔记信息
function loadNotes(){
	//设置选中效果
	$("#note_ul a").removeClass("checked");
	$(this).find("a").addClass("checked");
	//获取请求参数
	var noteId = $(this).data("noteId");
	//alert(noteId);
	//发送ajax请求
	$.ajax({
		url:path + "/note/load.do",
		type:"post",
		data:{"noteId":noteId},
		dataType:"json",
		success:function(result){
			if(result.status == 0){
				//获取返回的笔记标题
				var title = result.data.cn_note_title;
				//获取返回的笔记内容
				var body = result.data.cn_note_body;
				//设置笔记标题
				$("#input_note_title").val(title);
				//设置笔记内容
				um.setContent(body);
			}
		},
		error:function(){
			alert("笔记信息加载失败!");
		}
	});
};
//笔记本放入回收站
function recyclebin(){
	var $li=$("#note_ul a.checked").parent();
	//获取笔记Id
	var noteId=$li.data("noteId");
	$.ajax({
		url:path+"/delete/delete.do",
		type:"post",
		data:{"noteId":noteId},
		dataType:"json",
		success:function(result){
			//清除笔记的标题
			$("#input_note_title").val("");
			//清除笔记的内容
			um.setContent("");
			$li.remove(); 
			//提示创建笔记成功
			alert(result.msg);
		},
		error:function(){
			alert("将笔记放入回收站失败")
		}
	});
}
//新增笔记
function sure_addNote(){
	//获取请求参数
	var title=$("#input_notebook").val();
	//获取用户ID
	var userId = getCookie("userId");
	//获取笔记本ID
	var $li=$("#book_ul a.checked").parent();
	var bookId=$li.data("bookId");
	//alert(title+","+userId+","+bookId);
	//数据格式检查
	var ok = true;
	if(title == ""){//判断是否为空
		ok = false;
		$("#title_span").html("标题不能为空");
	}
	if(userId == null){//检查是否失效
		ok = false;
		window.location.href="log_in.htm";
	}
	if(ok){
		$.ajax({
			url:path+"/note/add.do",
			type:"post",
			data:{"userId":userId,
				"bookId":bookId,
				"title":title},
			dataType:"json",
			success:function(result){
				var note = result.data;
				if(result.status == 0){
					var id = note.cn_note_id;
					var title = note.cn_note_title;
					createNoteLi(id,title);
					//提示创建笔记成功
					alert(result.msg);
				}
			},
			error:function(){
				alert("创建笔记失败");
				//04.26.54
			}
		});
	}
}
//加载笔记本笔记
function loadBookNotes(){
	//设置选中效果
	$("#book_ul a").removeClass("checked");
	$(this).find("a").addClass("checked");
	//获取参数
	var bookId = $(this).data("bookId");
	//alert(bookId);
	$.ajax({
		url:path + "/note/loadnotes.do",
		type:"post",
		data:{"bookId":bookId},
		dataType:"json",
		success:function(result){
			if(result.status == 0){
				var notes = result.data;
				//清除原列表信息
				$("#note_ul").empty();
				for(var i=0;i<notes.length;i++){
					var noteId = notes[i].cn_note_id;
					var noteTitle = notes[i].cn_note_title;
					createNoteLi(noteId,noteTitle);
				}
			}
		},
		error:function(){
			alert("笔记加载失败!");
		}
	});
};

function createNoteLi(noteId,noteTitle){
	var sli = "";
	sli+='<li class="online">';
	sli+='<a>'
	sli+='<i class="fa fa-file-text-o" title="online" rel="tooltip-bottom"></i>'; 
	sli+=noteTitle;
	sli+='<button type="button" class="btn btn-default btn-xs btn_position btn_slide_down">';
	sli+='<i class="fa fa-chevron-down"></i>';
	sli+='</button>';
	sli+='</a>'
	sli+='<div class="note_menu" tabindex="-1">';
	sli+='<dl>';
	sli+='<dt><button type="button" class="btn btn-default btn-xs btn_move" title="移动至..."><i class="fa fa-random"></i></button></dt>';
	sli+='<dt><button type="button" class="btn btn-default btn-xs btn_share" title="分享"><i class="fa fa-sitemap"></i></button></dt>';
	sli+='<dt><button type="button" class="btn btn-default btn-xs btn_delete" title="删除"><i class="fa fa-times"></i></button></dt>';
	sli+='</dl>';
	sli+='</div>';
	sli+='</li>';
	var $li = $(sli);
	$li.data("noteId",noteId);
	$("#note_ul").append($li);
}






