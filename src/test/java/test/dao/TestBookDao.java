package test.dao;

import org.junit.Test;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

import cn.takia.cloud_note.dao.BookDao;
import cn.takia.cloud_note.entity.Book;
import cn.takia.cloud_note.util.NoteUtil;

public class TestBookDao {
	@Test
	public void textDao() {
		String[] conf = {"conf/spring-mvc.xml","conf/spring-mybatis.xml"};
		ApplicationContext ctx = new ClassPathXmlApplicationContext(conf);
		BookDao dao = ctx.getBean("bookDao",BookDao.class);
		
	}
	@Test
	public void addDao() {
		String[] conf = {"conf/spring-mvc.xml","conf/spring-mybatis.xml"};
		ApplicationContext ctx = new ClassPathXmlApplicationContext(conf);
		BookDao dao = ctx.getBean("bookDao",BookDao.class);
		Book book = new Book();
		String book_id = NoteUtil.createId();
		book.setCn_notebook_id(book_id);
		book.setCn_notebook_name("ceshi");
		book.setCn_user_id("123456789");
		book.setCn_notebook_type_id("1");
		dao.save(book);
	}
}









