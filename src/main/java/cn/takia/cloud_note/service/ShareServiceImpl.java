package cn.takia.cloud_note.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import cn.takia.cloud_note.dao.NoteDao;
import cn.takia.cloud_note.dao.ShareDao;
import cn.takia.cloud_note.entity.Note;
import cn.takia.cloud_note.entity.Share;
import cn.takia.cloud_note.util.NoteResult;
import cn.takia.cloud_note.util.NoteUtil;

@Service("shareService")
public class ShareServiceImpl implements ShareService{
	@Resource
	private NoteDao noteDao;
	@Resource
	private ShareDao shareDao;
	@Override
	public NoteResult<Share> addShare(String noteId) {
		Note note = noteDao.findByNoteId(noteId);
		NoteResult<Share> result = new NoteResult<Share>();
		Share share = new Share();
			String shareId = NoteUtil.createId();
			share.setCn_share_id(shareId);
			share.setCn_share_title(note.getCn_note_title());
			share.setCn_share_body(note.getCn_note_body());
			share.setCn_note_id(noteId);
			shareDao.addShare(share);
			result.setStatus(0);
			result.setMsg("分享笔记成功");
			result.setData(share);
			return result;
	}
	@Override
	public NoteResult<List<Share>> selectNote(String keyword,int page) {
		String title = "%"+keyword+"%";
		int begin = (page-1)*3;
		Map<String, Object> params = new HashMap();
		params.put("title", title);
		params.put("begin", begin);
		List<Share> list = shareDao.selectNote(params);
		NoteResult<List<Share>> result = new NoteResult<List<Share>>();
		result.setStatus(0);
		result.setMsg("搜索完成");
		result.setData(list);
		return result;
	}
}






