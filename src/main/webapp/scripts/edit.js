



/**
 * 根据userID加载笔记本
 * @param {Object} userId
 */
function loadNoteBooks(userId){
	
	//清空数据
	$("#notebook-list").empty();
	
	$.ajax({
		url:path+"/noteBook/loadBooks.do",
		type:"post",
		dataType:"json",
		data:{cn_user_id:userId},
		success:function(result){
			
			if(result.status==0){//数据查询成功
				var list = result.data;
				$(list).each(function(index,ele){
					var noteBookName = ele.cn_notebook_name;
					var noteBookId = ele.cn_notebook_id;
					var noteBookLi ="<li class='online'>" + 
										"<div class='note_menu' style='width:60px;background:#0E7D76;border:0px solid red;margin-top:3px;outline:0px;' id='notebook_action'>" +
											"<button type='button' class='btn btn-default btn-xs btn_rename' title='重命名'><i class='fa fa-random'></i></button>"+
											"<button style='margin:0px;' type='button' class='btn btn-default btn-xs btn_delete' title='删除'><i class='fa fa-times'></i></button>"+
										"</div>" +
										"<a>" +
											"<i class='fa fa-book' title='online' rel='tooltip-bottom'></i>" +
											noteBookName +"   " +
										"</a>" +
									"</li>"	;
					
					//装换为juquery对象 并将Id值存入对象中。
					var $noteBookLi = $(noteBookLi);
					$noteBookLi.data("noteBookId",noteBookId);
					
					$("#notebook-list").append($noteBookLi);
				});
			
			}
		},
		error:function(){
			alert("获取笔记本列表失败");
		}
	
	});
}

//显示回收站
function showRecyleBin(){
	var noteBookId = $("#notebook-list li .checked").parent().data("noteBookId");
	//alert(noteBookId);
	
	//发送请求
	$.ajax({
		url:path+"/note/loadRecNotes.do",
		type:"post",
		dataType:"json",
		data:{cn_notebook_id:noteBookId},
		success:function(result){
			//alert(result.status);
			
			if(result.status==0){//数据查询成功
				
				$(".col-xs-3").hide();
				$("#pc_part_4").show();
					
				$("#pc_part_4 .contacts-list").empty();
				var list = result.data;
				$(list).each(function(index,ele){
					
					var title = ele.cn_note_title;
					var id = ele.cn_note_id;
					
					var noteLi = '<li class="disable">' +
									'<a >' +
										'<i class="fa fa-file-text-o" title="online" rel="tooltip-bottom"></i> ' +
										title +
										'<button type="button" class="btn btn-default btn-xs btn_position btn_delete">' +
											'<i class="fa fa-times"></i>' +
										'</button>' +
										'<button type="button" class="btn btn-default btn-xs btn_position_2 btn_replay">' +
											'<i class="fa fa-reply"></i>' +
										'</button>' +
									'</a>' +
								'</li>';
					
					var $li = $(noteLi);
					$li.data("noteId",id);
					
					$("#pc_part_4 .contacts-list").append($li);
				});
				
			}else{
				alert("获取笔记列表失败");
			}
			
			
		},
		error:function(){
			alert("获取笔记列表失败");
		}
	
	});
}

function replay(){
	var noteId = $(this).parent().parent().data("noteId");
	setNoteStatus(noteId,'0');
	showRecyleBin();
	return false;
}

function deleteNoteFromRec(){
	
	var name = $(this).parent().parent().text();
	var flag = true;
	if(!confirm("确定永久删除该笔记吗，删除后将不能恢复？:\n                                "+name+"")){
		flag = false;
	}
	
	var noteId = $(this).parent().parent().data("noteId");
	if(flag){
		//发送ajax请求
		$.ajax({
			url:path+"/note/deleteNote.do",
			type:"post",
			dataType:"json",
			data:{noteId:noteId},
			success:function(result){
				//alert(result.status);
				if(result.status==0){//数据查询成功
					alert(name+"笔记已删除");
					showRecyleBin();//刷新回收站
				}
			},
			error:function(){
				alert("操作失败");
			}
		
		});
	}
	
				
	
	
}

//重命名笔记本
function reName(){
	alert("asd");
	$("#can").load(path+"/alert/alert_rename.html");
} 



//关闭对话框
function close_window(){
   	  	$("#can").empty();//清除对话框内容,隐藏
	  	$(".opacity_bg").hide();//取消灰色背景
}


/*
 * 添加笔记本
 * @return {TypeName} 
 */
function sure_addbook(){
	
	
	//获取数据
	var noteBookName = $("#input_notebook").val();
	var userId = getCookie("userId");
	//alert(userId);
	
	$("#input_notebook_msg").html(" ");
	//判断数据是否为空
	if(noteBookName==""){
		$("#input_notebook_msg").css("color","red");
		$("#input_notebook_msg").html("笔记本名称不能为空");//给出提示信息
		return;
	}
	
	//发送请求
	$.ajax({
		url:path+"/noteBook/addNoteBook.do",
		type:"post",
		dataType:"json",
		data:{cn_notebook_name:noteBookName,cn_user_id:userId},
		success:function(result){
			if(result.status==0){
				alert(result.msg);
				close_window();//关闭添加窗口
				loadNoteBooks(userId)//刷新笔记本列表
			}else{
				alert(result.msg);
			}
		},
		error:function(){
			alert("添加失败！");
		}
	});
}


/**
 * 删除笔记本
 * @memberOf {TypeName} 
 */


function delBook(){
	var noteBookId = $("#notebook-list li .checked").parent().data("noteBookId");
	//alert(noteBookId);
	
	//发送请求
	$.ajax({
		url:path+"/noteBook/deleteNoteBook.do",
		type:"post",
		dataType:"json",
		data:{noteBookId:noteBookId},
		success:function(result){
			//alert(result.status);
			if(result.status==0){
				
				var userId = getCookie("userId");
				loadNoteBooks(userId);
				alert(result.msg);
			}else{
				alert(result.msg);
			}
			},
		error:function(){
			alert("删除出错！请稍后重试");
		}
	});
}

/**
 * 重命名笔记本
 * @memberOf {TypeName} 
 */
function sure_renameBook(){
	var noteBookId = $("#notebook-list li .checked").parent().data("noteBookId");
	//alert(noteBookId);
	
	var newNoteBookName = $("#input_notebook_rename").val();
	//alert(newNoteBookName);
	//发送请求
	$.ajax({
		url:path+"/noteBook/renameNoteBook.do",
		type:"post",
		dataType:"json",
		data:{noteBookId:noteBookId,newNoteBookName:newNoteBookName},
		success:function(result){
			//alert(result.status);
			if(result.status==0){
				close_window()
				alert(result.msg);
				var userId = getCookie("userId");
				loadNoteBooks(userId);
			}else{
				alert(result.msg);
			}
			},
		error:function(){
			alert("重命名出错！请稍后重试");
		}
	});
}


/**
 * ------------------------------------------------------------------------------------------------------------------------------------------
 * @memberOf {TypeName} 
 */



/**
 * 加载笔记
 * 参数：noteBookId
 * 访问路径：path+“/note/loadNotes.do”
 */

function loadNotes(){
	
	//var noteBookName = $(this).text();
	//var userId = getCookie("userId");
	var noteBookId = $(this).data("noteBookId");
	//alert(noteBookId);
	$("#notebook-list #notebook_action").hide();
	$(this).find("#notebook_action").show();
	
	//突出显示被选中的笔记本
	$("#notebook-list li a").removeClass("checked");
	$(this).find("a").addClass("checked");
	
	//发送请求
	$.ajax({
		url:path+"/note/loadNotes.do",
		type:"post",
		dataType:"json",
		data:{noteBookId:noteBookId},
		success:function(result){
			
			if(result.status==0){//数据查询成功
				
				$(".col-xs-3").hide();
				$("#pc_part_2").show();
				
				$("#note-list").empty();
				var list = result.data;
				//alert(list);
				$(list).each(function(index,ele){
					var title = ele.cn_note_title;
					var id = ele.cn_note_id;
					//alert(name);
					var noteLi = '<li class="online">' +
								'<a>' +
									'<i class="fa fa-file-text-o" title="online" rel="tooltip-bottom"></i>' + 
									title +
									'<button type="button" class="btn btn-default btn-xs btn_position btn_slide_down">' +
										'<i class="fa fa-chevron-down"></i>'+
									'</button>'+
								'</a>'+
								'<div class="note_menu" tabindex="-1">'+
									'<dl>'+
										'<dt><button type="button" class="btn btn-default btn-xs btn_move" title="移动至..."><i class="fa fa-random"></i></button></dt>'+
										'<dt><button type="button" class="btn btn-default btn-xs btn_share" id="share" title="分享"><i class="fa fa-sitemap"></i></button></dt>'+
										'<dt><button type="button" class="btn btn-default btn-xs btn_delete" title="删除"><i class="fa fa-times"></i></button></dt>'+
										'<dt><button type="button" class="btn btn-default btn-xs btn_share" id="like" title="收藏"><i class="fa fa-star" style="font-size:15px;line-height:20px;"></i></button></dt>'+
									'</dl>'+
								'</div>'+
							' </li>';
					
					var $li = $(noteLi);
					$li.data("noteId",id);
					
					$("#note-list").append($li);
				});
			}else{
				alert("获取笔记列表失败");
			}
		},
		error:function(){
			alert("获取笔记列表失败");
		}
	
	});
	
	return false;
}




/**
 * 根据noteId来查找笔记内容
 * 点击笔记，将信息显示到编辑区域；
 * 
 */

function loadNote(){
	//清空原有数据
	$("#myEditor").html(" ");
	$("#save_note_box").show();
	//获取noteId
	var noteId = $(this).data("noteId");
	
	//突出显示被选中的笔记
	$("#note-list li a").removeClass("checked");
	$(this).find("a").addClass("checked");
	
	//发送请求
	$.ajax({
		url:path+"/note/loadNote.do",
		type:"post",
		dataType:"json",
		data:{noteId:noteId},
		success:function(result){
			//alert(result.status);
			
			if(result.status==0){//加载成功
				var title = result.data.title;
				var body = result.data.body;
				
				
				
				//alert(title+":"+body);
				$("#input_note_title").val(title);
				$("#myEditor").html(body);
				
			}else{
				alert("加载笔记出错!请稍后再试。");
			}
		},
		error:function(){
			alert("加载笔记出错!请稍后再试。");
		}
		
	});
}


/**
 * 更改笔记内容
 */

function updateNote(){
	
	//获取页面数据
	var cn_note_title = $("#input_note_title").val();
	var cn_note_body = $("#myEditor").html();
	
	//var text =  $("#note-list li .checked").parent().text();
	//alert("要修改的笔记"+text);
	
	var cn_note_id =$("#note-list li .checked").parent().data("noteId");
	
	//alert(cn_note_id);
	//alert(cn_note_body);
	//alert(cn_note_title);
	
	//发送请求
	$.ajax({
		url:path+"/note/updateNote.do",
		type:"post",
		dataType:"json",
		data:{cn_note_title:cn_note_title,cn_note_body:cn_note_body,cn_note_id:cn_note_id},
		success:function(result){
			//alert(result.status);
			
			if(result.status==0){//加载成功
				//var text = $("#notebook-list li .checked").parent().text();
				//alert(text);
				$("#notebook-list li .checked").parent().click();//跟新笔记列表
				//alert("笔记修改成功");
			}else{
				alert("笔记修改失败");
			}
		},
		error:function(){
			alert("笔记修改失败");
		}
		
	});
	
}

function sure_addnote(){
	//获取数据
	var noteName = $("#input_note").val();
	var userId = getCookie("userId");
	var noteBookId = $("#notebook-list li .checked").parent().data("noteBookId");
	
	
	
	//alert(userId);
	
	$("#input_note_msg").html(" ");
	//判断数据是否为空
	if(noteName==""){
		$("#input_note_msg").css("color","red");
		$("#input_note_msg").html("笔记名称不能为空");//给出提示信息
		return;
	}
	
	//发送请求
	$.ajax({
		url:path+"/note/addNote.do",
		type:"post",
		dataType:"json",
		data:{cn_note_title:noteName,cn_user_id:userId,cn_notebook_id:noteBookId},
		success:function(result){
			if(result.status==0){
				alert(result.msg);
				close_window();//关闭添加窗口
				$("#notebook-list li .checked").parent().click()//刷新笔记列表
			}else{
				alert(result.msg);
			}
		},
		error:function(){
			alert("添加失败！");
		}
	});
}


/**
 * 移动笔记弹窗加载笔记本列表
 * 
 */
function loaNoteBooksOnMoveTo(){
	
    var userId = getCookie("userId");
	//向移动笔记弹框中添加笔记本列表
	$.ajax({
		url:path+"/noteBook/loadBooks.do",
		type:"post",
		dataType:"json",
		data:{cn_user_id:userId},
		success:function(result){
			
			if(result.status==0){//数据查询成功
				var list = result.data;
				$(list).each(function(index,ele){
					var noteBookName = ele.cn_notebook_name;
					var noteBookId = ele.cn_notebook_id;
					//<option value="none">- 请选择 -</option>
					
					var option ="<option value="+ noteBookId +">" + 
										noteBookName +
								"</option>"	;
					
					$("#moveSelect").append(option);
				});
			
			}else{
				alert("获取笔记本列表失败");
			}
		},
		error:function(){
			alert("获取笔记本列表失败");
		}
	
	});

}

/**
 * 移动笔记脚本
 */
function sure_moveto(){
	//获取数据
	var descNoteBookId = $("#moveSelect").val();
	var noteId = getCookie("noteId");
	
	//alert(noteId);
	
	$.ajax({
		url:path+"/note/updateNote.do",
		type:"post",
		dataType:"json",
		data:{cn_note_id:noteId,cn_notebook_id:descNoteBookId},
		success:function(result){
			
			if(result.status==0){// 更改成功
				close_window();//关闭添加窗口
				$("#notebook-list li .checked").parent().click()//刷新笔记列表
				alert(result.msg);
			}else{
				alert(result.msg);
			}
		},
		error:function(){
			alert("移动失败");
		}
	
	});
}

/**
 * 删除笔记
 */
function setNoteStatus(noteId,status){
	//alert(noteId);
	
	//发送请求
	$.ajax({
		url:path+"/note/updateNote.do",
		type:"post",
		dataType:"json",
		data:{cn_note_id:noteId,cn_note_status_id:status},
		success:function(result){
			//alert(result.status);
			if(result.status==0){// 更改成功
				
				//alert("删除成功");
			}else{
				alert("操作失败");
			}
		},
		error:function(){
			alert("操作失败");
		}
	
	});
}


function putInShare(){
	var noteId = $(this).parent().parent().parent().parent().data("noteId");
	alert(noteId);
	
	//发送请求
	$.ajax({
		url:path+"/note/share.do",
		type:"post",
		dataType:"json",
		data:{noteId:noteId},
		success:function(result){
			//alert(result.status);
			if(result.status==0){// 更改成功
				alert(result.msg);
			}else{
				alert(result.msg);
			}
		},
		error:function(){
			alert("操作失败");
		}
	
	});
	
	return false;
}


function searchNote(){
	//alert(event.keyCode);
					var name = $(this).val();
					//alert(name);
					$.ajax({
						url:path+"/note/searchShareNote.do",
						type:"post",
						dataType:"json",
						data:{keyword:name},
						success:function(result){
							//alert(result.data);
							$(".col-xs-3").hide();
							$("#pc_part_6").show();
							$("#pc_part_6 .contacts-list").empty();
							if(result.status==0){
								var list = result.data;
								$(list).each(function(index,ele){
									var title = ele;
									//alert(title);
									var noteLi = '<li class="online">' +
													'<a>' +
														'<i class="fa fa-file-text-o" title="online" rel="tooltip-bottom"></i>' + 
														title +
														'<button type="button" class="btn btn-default btn-xs btn_position btn_slide_down">' +
															'<i class="fa fa-chevron-down"></i>'+
														'</button>'+
													'</a>'+
												'</li>';
												
									$("#pc_part_6 .contacts-list").append(noteLi);
												
								});
								
							}
						},
						error:function(){
							alert("出错啦！！");
						}
					});
}
















