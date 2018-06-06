package cn.takia.cloud_note.controller;

import javax.annotation.Resource;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import cn.takia.cloud_note.service.NoteService;
import cn.takia.cloud_note.util.NoteResult;

@Controller
@RequestMapping("delete")
public class DeleteNoteController {
	@Resource
	private NoteService noteService;
	
	@RequestMapping("delete.do")
	@ResponseBody
	public NoteResult<Object> delete(String noteId) {
		NoteResult<Object> result = 
				noteService.deleteNote(noteId);
		return result;
	}
}
