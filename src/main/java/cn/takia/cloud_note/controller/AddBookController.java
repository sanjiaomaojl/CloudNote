package cn.takia.cloud_note.controller;

import javax.annotation.Resource;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import cn.takia.cloud_note.service.BookService;
import cn.takia.cloud_note.util.NoteResult;

@Controller
@RequestMapping("/book")
public class AddBookController {
	@Resource
	private BookService service;
	
	@RequestMapping("/add.do")
	@ResponseBody
	public NoteResult<Object> execute(String bookName,String userId){
		NoteResult<Object> result = service.addBook(bookName, userId);
		return result;
	}
}





