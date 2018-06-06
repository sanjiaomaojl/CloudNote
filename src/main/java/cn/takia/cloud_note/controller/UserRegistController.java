package cn.takia.cloud_note.controller;

import javax.annotation.Resource;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import cn.takia.cloud_note.service.UserService;
import cn.takia.cloud_note.util.NoteResult;

@Controller
@RequestMapping("/user") //匹配请求路径
public class UserRegistController {
	@Resource
	UserService userService;
	@RequestMapping("/add.do") //匹配请求
	@ResponseBody	//JSON输出
	public NoteResult<Object> execute(String name,String password,String nick){
		NoteResult<Object> result = 
			userService.addUser(name, password, nick);
		return result;
	}
}
