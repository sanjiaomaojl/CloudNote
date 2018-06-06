package test.service;

import java.util.List;
import java.util.Map;

import org.junit.Before;
import org.junit.Test;

import cn.takia.cloud_note.entity.Note;
import cn.takia.cloud_note.service.NoteService;
import cn.takia.cloud_note.util.NoteResult;
import test.TestBase;

public class TestNoteService extends TestBase{
	NoteService noteService;
	@Before
	public void init() {
		noteService = super.getContext().getBean(
				"noteService",NoteService.class);
	}
	@Test
	public void test() {
		NoteResult<List<Map>> list = 
				noteService.loadBookNotes(
				"d92e6b86-e48a-485d-8f11-04a93818bb42");
		System.out.println(list.getStatus());
		System.out.println(list.getMsg());
		System.out.println(list.getData());
	}
	@Test
	public void test2() {
		NoteResult<Note> result = 
			noteService.loadNote(
				"054449b4-93d4-4f97-91cb-e0043fc4497f");
		System.out.println(result.getStatus());
		System.out.println(result.getMsg());
		System.out.println(result.getData());
	}
	@Test
	public void test3() {
		String noteId = "054449b4-93d4-4f97-91cb-e0043fc4497f";
		String title = "java笔记";
		String body = "jdbc驱动的理解与实现";
		NoteResult<Object> result = 
			noteService.updateNote(noteId, title, body);
		System.out.println(result.getStatus());
		System.out.println(result.getMsg());
	}
	@Test
	public void test4() {
		String userId = "123";
		String bookId = "123";
		String title = "123";
		NoteResult<Note> result = 
				noteService.addNote(userId, bookId, title);
		System.out.println(result.getStatus());
		System.out.println(result.getMsg());
		System.out.println(result.getData());
	}
	@Test
	public void test5() {
		String noteId = "054449b4-93d4-4f97-91cb-e0043fc4497f";
		NoteResult<Object> result = 
				noteService.deleteNote(noteId);
		System.out.println(result.getStatus());
		System.out.println(result.getMsg());
	}
}














