package cn.takia.cloud_note.service;

import java.util.List;

import cn.takia.cloud_note.entity.Share;
import cn.takia.cloud_note.util.NoteResult;

public interface ShareService {
	public NoteResult<Share> addShare(String noteId);
	public NoteResult<List<Share>> selectNote(String keyword,int page);
}
