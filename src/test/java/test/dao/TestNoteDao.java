package test.dao;


import java.util.List;
import java.util.Map;

import org.junit.Before;
import org.junit.Test;

import cn.takia.cloud_note.dao.NoteDao;
import cn.takia.cloud_note.entity.Note;
import test.TestBase;

public class TestNoteDao extends TestBase{
	private NoteDao noteDao;
	@Before
	public void init() {
		noteDao = super.getContext()
				.getBean("noteDao",NoteDao.class);
	}
	
	@Test
	public void testNoteDao() {
		List<Map> list = noteDao.findByBookId("fa8d3d9d-2de5-4cfe-845f-951041bcc461");
		for (Map map : list) {
			System.out.println(
					map.get("cn_note_id")+","+
					map.get("cn_note_title"));
		}
	}
	@Test
	public void testFind() {
		Note note = noteDao.findByNoteId(
				"054449b4-93d4-4f97-91cb-e0043fc4497f");
		System.out.println(note.getCn_note_id());
		System.out.println(note.getCn_note_title());
		System.out.println(note.getCn_note_body());
	}
	@Test
	public void testUpdate() {
		Note note = new Note();
		String noteId = 
				"054449b4-93d4-4f97-91cb-e0043fc4497f";
		note.setCn_note_id(noteId);
		String title = "传奇大哥";
		note.setCn_note_title(title);
		String body = "上次和克晶已经上了搜索殷勤";
		note.setCn_note_body(body);
		Long time = System.currentTimeMillis();
		note.setCn_note_last_modify_time(time);
		Integer num = noteDao.updateNote(note);
		System.out.println(num);
	}
	@Test
	public void testAdd() {
		Note note = new Note();
		note.setCn_user_id("1234567890");
		String noteId = 
				"123456789";
		note.setCn_note_id(noteId);
		String bookId = "123456789";
		note.setCn_notebook_id(bookId);
		note.setCn_note_status_id("1");
		String title = "传奇大哥";
		note.setCn_note_title(title);
		String body = "上次和克晶已经上了搜索殷勤";
		note.setCn_note_body(body);
		Long time = System.currentTimeMillis();
		note.setCn_note_create_time(time);
		note.setCn_note_last_modify_time(time);
		noteDao.addNote(note);
	}
	@Test
	public void testDelete() {
		Note note = new Note();
		String noteId = 
				"054449b4-93d4-4f97-91cb-e0043fc4497f";
		note.setCn_note_id(noteId);
		Long time = System.currentTimeMillis();
		note.setCn_note_last_modify_time(time);
		noteDao.deleteNote(note);
	}
}








