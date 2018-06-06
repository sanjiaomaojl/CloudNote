package cn.takia.cloud_note.controller;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import cn.takia.cloud_note.entity.Share;
import cn.takia.cloud_note.service.ShareService;
import cn.takia.cloud_note.util.NoteResult;

@Controller
@RequestMapping("/share")
public class SelectShareNoteController {
	@Resource
	private ShareService shareService;
	@RequestMapping("/search.do")
	@ResponseBody
	public NoteResult<List<Share>> execute(String keyword,int page) {
		
		NoteResult<List<Share>> result = shareService.selectNote(keyword,page);
		return result;
	}
}
