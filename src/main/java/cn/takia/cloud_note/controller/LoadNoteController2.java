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
public class LoadNoteController2 {
	@Resource
	private NoteService noteService;
	
	@RequestMapping("/load.do")
	@ResponseBody
	public NoteResult<Note> execute(String noteId) {
		NoteResult<Note> result = 
				noteService.loadNote(noteId);
		return result;
	}
}
