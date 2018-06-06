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
public class updateNoteController {
	@Resource
	private NoteService noteService;
	@RequestMapping("/update.do")
	@ResponseBody
	public NoteResult<Object> execute(String noteId, String title, String body) {
		NoteResult<Object> result 
		= noteService.updateNote(noteId, title, body);
		return result;
	}
}
