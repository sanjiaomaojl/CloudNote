package cn.takia.cloud_note.controller;

import javax.annotation.Resource;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import cn.takia.cloud_note.entity.Share;
import cn.takia.cloud_note.service.ShareService;
import cn.takia.cloud_note.util.NoteResult;

@Controller
@RequestMapping("/share")
public class ShareNoteConreoller {
	@Resource
	private ShareService shareService;
	
	@RequestMapping("/add.do")
	@ResponseBody
	public NoteResult<Share> execute(String noteId){
		NoteResult<Share> result = shareService.addShare(noteId);
		return result;
	}
}
