package cn.takia.cloud_note.controller;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import cn.takia.cloud_note.entity.Book;
import cn.takia.cloud_note.service.BookService;
import cn.takia.cloud_note.util.NoteResult;

@Controller
@RequestMapping("/book")
public class LoadBooksConreoller {
	@Resource
	private BookService bookService;
	
	@RequestMapping("/loadbooks.do")
	@ResponseBody
	public NoteResult<List<Book>> ececute(String userId){
		NoteResult<List<Book>> result = 
				bookService.loadUserBooks(userId);
		return result;
	}
}
