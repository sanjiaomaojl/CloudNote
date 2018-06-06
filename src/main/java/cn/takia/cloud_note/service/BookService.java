package cn.takia.cloud_note.service;

import java.util.List;

import cn.takia.cloud_note.entity.Book;
import cn.takia.cloud_note.util.NoteResult;

public interface BookService {
	public NoteResult<List<Book>> loadUserBooks(String userId);
	public NoteResult<Object> addBook(String title,String userId);
}
