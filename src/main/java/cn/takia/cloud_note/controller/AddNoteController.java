package cn.takia.cloud_note.controller;

import javax.annotation.Resource;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import cn.takia.cloud_note.entity.Note;
import cn.takia.cloud_note.service.NoteService;
import cn.takia.cloud_note.util.NoteResult;

@Controller
@RequestMapping("/note")
public class AddNoteController {
	@Resource
	NoteService service;
	@RequestMapping("/add.do")
	@ResponseBody
	public NoteResult<Note> execute(String userId, String bookId, String title){
		NoteResult<Note> result = service.addNote(userId, bookId, title);
		return result;
	}
}
