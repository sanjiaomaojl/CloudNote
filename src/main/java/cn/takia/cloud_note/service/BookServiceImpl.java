package cn.takia.cloud_note.service;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import cn.takia.cloud_note.dao.BookDao;
import cn.takia.cloud_note.entity.Book;
import cn.takia.cloud_note.util.NoteResult;
import cn.takia.cloud_note.util.NoteUtil;

@Service("bookService")
public class BookServiceImpl implements BookService{
	@Resource
	private BookDao bookDao;
	@Override
	public NoteResult<List<Book>> loadUserBooks(String userId) {
		NoteResult<List<Book>> result = new NoteResult<List<Book>>();
		List<Book> list = bookDao.findByUserId(userId);
			result.setStatus(0);
			result.setMsg("查询笔记本成功");
			result.setData(list);
			return result;
	}
	@Override
	public NoteResult<Object> addBook(String bookName, String userId) {
		NoteResult<Object> result = new NoteResult<Object>();
		Book book = new Book();
		String book_id = NoteUtil.createId();
		book.setCn_notebook_id(book_id);
		book.setCn_notebook_name(bookName);
		book.setCn_user_id(userId);
		book.setCn_notebook_type_id("1");
		bookDao.save(book);
		//构建返回结果
		result.setStatus(0);
		result.setMsg("添加成功");
		result.setData(book);
		return result;
	}
	
}







