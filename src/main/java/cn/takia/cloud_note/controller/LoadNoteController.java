package cn.takia.cloud_note.controller;

import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import cn.takia.cloud_note.service.NoteService;
import cn.takia.cloud_note.util.NoteResult;

@Controller
@RequestMapping("/note")
public class LoadNoteController {
	@Resource
	private NoteService noteService;
	
	@RequestMapping("/loadnotes.do")
	@ResponseBody
	public NoteResult<List<Map>> execute(String bookId) {
		NoteResult<List<Map>> result = 
				noteService.loadBookNotes(bookId);
		return result;
	}
}
