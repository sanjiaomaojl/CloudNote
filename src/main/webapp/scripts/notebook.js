//sctipts/notebook.js
//网页加载之后执行

var SUCCESS=0;

$(function(){
	
	//var id = getCookie('userId');
	//console.log(id);
	
	//调用方法加载笔记本列表
	//loadNotebooks();
	loadPagedNotebooks();
	
	//利用事件冒泡,绑定li被点击时候执行事件程序
	//绑定笔记本列表中li元素被点击的事件
	$('#pc_part_1').on('click',
			'li.notebook',loadNotes);
	//监听翻页请求 more
	$('#pc_part_1').on('click',
			'li.more', loadPagedNotebooks);
	
	//绑定点击笔记列表事件
	$('#pc_part_2').on('click','li',loadNote);
	
	//绑定点击保存笔记事件
	$('#save_note').on('click', updateNote);
	
	//绑定添加笔记本按钮
	$('#add_notebook').on('click', demo); 
	
	//绑定添加笔记按钮
	$('#add_note').on('click', showAddNoteDialog); 
	
	//绑定关闭按键事件
	$('#can').on('click', '.cancel, .close', closeDialog);
	
	//绑定添加笔记对话框中的 保存按钮事件
	$('#can').on('click', '.save-note', saveNote);
	
	//监听笔记子菜单按钮点击事件
	$('#pc_part_2').on('click', '.note_menu_btn', 
			showNoteMenu);
	
	//点击文档的任何位置都收起笔记子菜单
	$(document).click(closeNoteMenu);
	
	//打开移动笔记对话框
	$('#pc_part_2').on('click', '.btn_move', 
			showMoveDialog);
	
	//绑定移动笔记对话框中的 移动笔记按钮事件
	$('#can').on('click', '.move-note', 
			moveNote);
	
});

function moveNote(){
	var url = "note/move.do";
	//得到选定的笔记, 获取当前选定笔记的ID
	var li = $('#pc_part_2 .checked').parent();
	var data = {noteId: li.data('noteId'),
			notebookId: $('#moveSelect').val()}
	$.post(url, data, function(result){
		if(result.state==SUCCESS){
			//更新显示效果
			li.remove();
			closeDialog();
		}else{
			alert(result.message);
		}
	})
}

function showMoveDialog(){

	
	//显示移动笔记的对话框, 在页面加载成功以后, 将
	//列出笔记列表信息
	$('#can').load('alert/alert_move.html', function(){
		//获取全部笔记本列表 li
		//将li中的笔记信息填充到select列表中
		$('#moveSelect').empty();
		$('#pc_part_1 li').each(function(){
			var li = $(this);
			//创建option对象
			var opt = $('<option></option>')
				.val(li.data('notebookId'))
				.html(li.text().trim());
			//添加到 select 列表中
			$('#moveSelect').append(opt);	
		});
	});
}

function closeNoteMenu(){
	$('.note_menu').hide();
}
function showNoteMenu(){
	//如果不是选定的 笔记项目就不显示菜单
	//var a = $(this).parent('.checked');
	//if(a.length==0){
	//	return;
	//}
	//<a class="s checked btn">
	//var cls = a.attr('class');
	//cls = "s checked btn"
	//       012
	//if(!cls){
	//	return;
	//}
	//if(cls.indexOf('checked')<0){
	//	return;
	//}
	//找到 子菜单, 调用show()方法
	//this 就是点击的按钮对象, 利用按钮的上下文关系
	//找到子菜单, 并且调用show()方法
	var menu=$(this).parent('.checked').next();
	menu.toggle();
	return false;//阻止事件继续传播
}

function closeDialog(){
	$('#can').empty();
	$('.opacity_bg').hide();
}

function showAddNoteDialog(){
	var notebookId=$('#input_note_title').data('notebookId');
	if(notebookId){
		$('.opacity_bg').show();
		$('#can').load('alert/alert_note.html');
	}else{
		alert("请选择笔记本！");
	}
}

//笔记对话框中的 保存按钮事件
function saveNote(){
	var url = 'note/add.do';
	var notebookId=$('#input_note_title')
		.data('notebookId');
	var title = $('#can #input_note').val();
 
	var data = {userId:getCookie('userId'),
		notebookId:notebookId,
		title:title};
	//console.log(data);
	
	$.post(url, data, function(result){
		if(result.state==SUCCESS){
			var note=result.data;
			//console.log(note);
			showNote(note);
			//找到显示笔记列表的ul对象
			var ul = $('#pc_part_2 .contacts-list');
			var li = noteTemplate.replace(
					'[title]', note.title);
			li = $(li);
			li.find('a').addClass('checked');
			ul.find('a').removeClass('checked');
			ul.prepend(li);
			
			closeDialog();   
			//123 
		}else{
			alert(result.message);
		}
	});
}

function updateNote(){
	var url = 'note/update.do';
	var note = $('#input_note_title').data('note');
	var data = {noteId:note.id};
	var modified = false;
	var title = $('#input_note_title').val();
	if(title && title!=note.title){
		data.title = title;
		modified = true;
	}
	var body = um.getContent();
	if(body && body != note.body ){
		data.body = body;
		modified = true;
	}
	if(modified){
		$('#save_note').attr('disabled','disabled')
			.html('保存中...');
		
		$.post(url, data, function(result){
			setTimeout(function(){
				$('#save_note').removeAttr('disabled')
					.html('保存笔记');
			},1000);
			if(result.state == 0){
				//console.log("Success!");
				//内存中的 note 改成新的数据
				note.title = title;
				note.body = body;
				var l = $('#pc_part_2 .checked').parent();
				$('#pc_part_2 .checked').remove()
				var li = noteTemplate.replace(
						'[title]', title);
				var a = $(li).find('a');
				a.addClass('checked');
				l.prepend(a);
			}else{
				alert(result.mesage);
			}
		});
	}
}

function loadNote(){
	var li = $(this);
	//获取在显示时候绑定到li中的笔记ID值
	var id = li.data('noteId');
	
	//设置选中高亮效果
	li.parent().find('a').removeClass('checked');
	li.find('a').addClass('checked');
	
	var url = 'note/get.do';
	var data= {noteId: id };
	
	$.getJSON(url, data, function(result){
		//console.log(result);
		if(result.state==0){
			var note = result.data;
			showNote(note);
		}else{
			alert(result.message);
		}
	});
}

function showNote(note){
	//绑定笔记信息, 用于保存操作
	$('#input_note_title').data('note', note);
	
	$('#input_note_title').val(note.title);
	um.setContent(note.body);
}

function loadNotes(){
	//在事件方法中的this就是当前发生事件的对象 li
	var li = $(this);
	console.log(li);
	//获取在显示时候绑定到li中的笔记本ID值
	var id = li.data('notebookId');
	console.log(id);
	
	//设置选中高亮效果
	li.parent().find('a').removeClass('checked');
	li.find('a').addClass('checked');
	
	var url = 'note/list.do';
	var data= {notebookId: id };
	
	//绑定笔记本ID， 用于添加笔记功能
	$('#input_note_title').data('notebookId', id);
	
	$.getJSON(url, data, function(result){
		//console.log(result);
		if(result.state==0){
			var notes = result.data;
			showNotes(notes);
		}else{
			alert(result.message);
		}
	});
}

var noteTemplate = 
	'<li class="online">'+
	'	<a><i class="fa fa-file-text-o" title="online" rel="tooltip-bottom"></i> [title]<button type="button" class="btn btn-default btn-xs btn_position btn_slide_down note_menu_btn"><i class="fa fa-chevron-down"></i></button></a>'+
	'	<div class="note_menu" tabindex="-1">'+
	'		<dl>'+
	'			<dt><button type="button" class="btn btn-default btn-xs btn_move" title="移动至..."><i class="fa fa-random"></i></button></dt>'+
	'			<dt><button type="button" class="btn btn-default btn-xs btn_share" title="分享"><i class="fa fa-sitemap"></i></button></dt>'+
	'			<dt><button type="button" class="btn btn-default btn-xs btn_delete" title="删除"><i class="fa fa-times"></i></button></dt>'+
	'  		</dl>'+
	'	</div>'+
	'</li>';

function showNotes(notes){
	var ul = $('#pc_part_2 .contacts-list');
	ul.empty();
	for(var i=0; i<notes.length; i++){
		var note = notes[i];
		var li = noteTemplate.replace('[title]', 
				note.title);
		//绑定noteId到li对象
		li = $(li).data('noteId', note.id);
		
		ul.append(li);
	}
}

function loadPagedNotebooks(){
	//获取li.data('page'), 如果没有则是第一页
	var more = $(this);
	var page = 0;
	if(more.data('page')){
		page = more.data('page');
	}
	//page数据是 showPagedNotebooks 方法绑定到more按钮上的
	
	var url = "notebook/page.do";
	var data = {userId: getCookie('userId'), 
			page: page };
	$.getJSON(url, data, function(result){
		if(result.state==SUCCESS){
			var notebooks = result.data;
			showPagedNotebooks(notebooks, page);
		}else{
			alert(result.message);
		}
	});
}
function showPagedNotebooks(notebooks, page){
	//把数据显示到 笔记本 列表区域
	var ul = $('#pc_part_1 .contacts-list');
	if(page==0){
		ul.empty();
	}else{
		//删除 <li class=more >元素
		ul.find('.more').remove();
	}
	//显示 每个笔记本
	for(var i=0; i<notebooks.length; i++){
		var notebook = notebooks[i];
		var li = notebookTemplate.replace(
			'[name]', notebook.name);
		//绑定笔记本Id到li
		li = $(li).data('notebookId', notebook.id);
		ul.append(li);
	}
	//在more上绑定 page+1;
	var more = $(moreTemplate);
	more.data('page', page+1);
	//显示more按钮
	if(notebooks.length!=0){
		ul.append(more);
	}
}

var moreTemplate = '<li class="online more">'+
	'<a>'+
	'<i class="fa fa-plus" title="online" '+
		' rel="tooltip-bottom">'+
	'</i> 加载更多</a></li>'

function loadNotebooks(){
	//请求 notebook/list.do
	//如果成功就将请求结果显示到界面(DOM)上
	var url = 'notebook/list.do';
	var data = {userId:getCookie('userId')};
	console.log(data);
	$.getJSON(url, data, function(result){
		if(result.state==0){
			//console.log(result);
			var list = result.data;
			showNotebooks(list);
		}else{
			alert(result.message);
		}
	});
}

function showNotebooks(list){
	//找到ul对象
	var ul = $('#pc_part_1 .contacts-list');
	ul.empty();
	//为List中每个笔记本对象生成一个li元素, 添加到ul中
	for(var i=0; i<list.length; i++){
		var notebook=list[i];
		var li = notebookTemplate.replace(
				'[name]', notebook.name);
		//JQuery 提供了数据绑定方法, 可以在DOM元素上
		//绑定任何数据. 
		// li.data(key, value) 获取数据 li.data(key)
		li = $(li).data('notebookId', notebook.id);
		//将生成的li元素添加到页面的ul元素中
		ul.append(li);
	}
}


var notebookTemplate=
	'<li class="online notebook">'+
	'<a>'+
	'<i class="fa fa-book" title="online" '+
		' rel="tooltip-bottom">'+
	'</i> [name]</a></li>';

function demo(){
	var sum = 0;
	console.log(i);
	for(var i = 0; i<10; i+=2){
		sum += test();
	}
	console.log(sum);
}

function test(){
	var i = 5;
	return i + 8;
}


