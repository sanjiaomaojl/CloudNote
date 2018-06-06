//按回车,搜索分享笔记
function enterSelect(event){
	var code = event.keyCode;
	if(code==13){
		//清空原来的列表
		$("#search_ul li").remove();		
		//获取请求参数
		var keyword = $("#search_note").val();
		page = 1;
		loadPageShare(keyword,page);
	}
};
//点击更多按钮，加载结果的下一页
function moreSearchShare(){
	//获取参数
	var keyword = $("#search_note").val();
	page = page + 1;
	//发送ajax请求加载列表
	loadPageShare(keyword,page);
};
function loadPageShare(keyword,page){
	$.ajax({
			url:path+"/share/search.do",
			type:"post",
			data:{"keyword":keyword,"page":page},
			dataType:"json",
			success:function(result){
				//获取数据
				var shares = result.data;
				for(var i = 0;i<shares.length;i++){
					//记录shareId
					var shareId = shares[i].cn_share_id;
					//获取shareTitle
					var shareTitle = shares[i].cn_share_title;
					//获取li对象
					var sli = "";
					sli+='<li class="online">';
					sli+='<a>'
					sli+='<i class="fa fa-file-text-o" title="online" rel="tooltip-bottom"></i>'; 
					sli+=shareTitle;
					sli+='<button type="button" class="btn btn-default btn-xs btn_position btn_slide_down">';
					sli+='<i class="fa fa-chevron-down"></i>';
					sli+='</button>';
					sli+='</a>'
					sli+='</li>';
					//将字符串转换成li的对象
					var $li = $(sli);
					//绑定shareId
					$li.data("shareId",shareId);
					//将li对象添加到ul当中
					$("#search_ul").append($li);
					//切换显示区域
					$("#pc_part_2").hide();//隐藏
					$("#pc_part_6").show();//显示
				}
			},
			error:function(){
				alert("搜索笔记失败");
			}
		});
};
//分享笔记
function share(){
	var $li=$("#note_ul a.checked").parent();
	//获取笔记Id
	var noteId=$li.data("noteId");
	//alert(noteId);
	//发送ajax请求
	$.ajax({
		url:path+"/share/add.do",
		type:"post",
		data:{"noteId":noteId},
		dataType:"json",
		success:function(result){
			var noteTitle = $li.text();
			var sli = "";
			sli+='<i class="fa fa-file-text-o" title="online" rel="tooltip-bottom"></i>'; 
			sli+='<i class="fa fa-sitemap"></i>';
			sli+=noteTitle;
			sli+='<button type="button" class="btn btn-default btn-xs btn_position btn_slide_down">';
			sli+='<i class="fa fa-chevron-down"></i>';
			sli+='</button>';
			//将笔记li元素的<a>标记内容替换
			$li.find("a").html(sli);
			alert("分享笔记成功");
		},
		error:function(){
			alert("分享笔记失败")
		}
	});
}