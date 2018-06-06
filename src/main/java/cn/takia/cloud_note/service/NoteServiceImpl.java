package cn.takia.cloud_note.service;

import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.sun.org.apache.regexp.internal.recompile;

import cn.takia.cloud_note.dao.NoteDao;
import cn.takia.cloud_note.entity.Note;
import cn.takia.cloud_note.util.NoteResult;
import cn.takia.cloud_note.util.NoteUtil;

@Service("noteService")
public class NoteServiceImpl implements NoteService{
	@Resource
	private NoteDao noteDao;
	@Override
	public NoteResult<List<Map>> loadBookNotes(String bookId) {
		NoteResult<List<Map>> result = new NoteResult<List<Map>>();
		List<Map> list = noteDao.findByBookId(bookId);
		result.setStatus(0);
		result.setMsg("笔记本成功");
		result.setData(list);
		return result;
	}
	@Override
	public NoteResult<Note> loadNote(String noteId) {
		NoteResult<Note> result = new NoteResult<Note>();
		Note note = noteDao.findByNoteId(noteId);
		if(note == null) {
			result.setStatus(1);
			result.setMsg("未找到数据");
			return result;
		}else {
			result.setStatus(0);
			result.setMsg("查询成功");
			result.setData(note);
			return result;
		}
	}
	@Override
	public NoteResult<Object> updateNote(String noteId, String title, String body) {
		NoteResult<Object> result = 
				new NoteResult<Object>();
		Note note = new Note();
		note.setCn_note_id(noteId);
		note.setCn_note_title(title);
		note.setCn_note_body(body);
		Long time = System.currentTimeMillis();
		note.setCn_note_last_modify_time(time);
		Integer num = noteDao.updateNote(note);
		if(num == 1) {
			result.setStatus(0);
			result.setMsg("保存笔记成功");
			return result;
		}else{
			result.setStatus(1);
			result.setMsg("保存笔记失败");
			return result;
		}
	}
	@Override
	public NoteResult<Note> addNote(String userId, String bookId, String title) {
		Note note = new Note();
		//用户ID
		note.setCn_user_id(userId);
		//笔记ID
		String noteId = NoteUtil.createId();
		note.setCn_note_id(noteId);
		//笔记本ID
		note.setCn_notebook_id(bookId);
		//状态值
		note.setCn_note_status_id("1");
		//用户标题
		note.setCn_note_title(title);
		//笔记内容
		String body = "";
		note.setCn_note_body(body);
		//系统时间
		Long time = System.currentTimeMillis();
		//创建时间
		note.setCn_note_create_time(time);
		//最后修改时间
		note.setCn_note_last_modify_time(time);
		//类型1；normal2；favor
		note.setCn_note_type_id("1");
		noteDao.addNote(note);
		//构建result
		NoteResult<Note> result = 
				new NoteResult<Note>();
		result.setStatus(0);
		result.setMsg("保存笔记成功");
		result.setData(note);
		return result;
	}
	@Override
	public NoteResult<Object> deleteNote(String noteId) {
		Note note = new Note();
		note.setCn_note_id(noteId);
		Long time = System.currentTimeMillis();
		note.setCn_note_last_modify_time(time);
		noteDao.deleteNote(note);
		//构建result
		NoteResult<Object> result = 
				new NoteResult<Object>();
		result.setStatus(0);
		result.setMsg("将笔记放入回收站成功");
		return result;
	}
}












