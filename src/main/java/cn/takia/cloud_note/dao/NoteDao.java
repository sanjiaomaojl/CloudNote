package cn.takia.cloud_note.dao;

import java.util.List;
import java.util.Map;

import cn.takia.cloud_note.entity.Note;


public interface NoteDao {
	public List<Map> findByBookId(String bookId);
	public Note findByNoteId(String noteId);
	public int updateNote(Note note);
	public void addNote(Note note);
	public void deleteNote(Note note);
}
