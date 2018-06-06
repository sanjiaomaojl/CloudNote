package test.service;


import org.junit.Before;
import org.junit.Test;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

import cn.takia.cloud_note.entity.User;
import cn.takia.cloud_note.service.UserService;
import cn.takia.cloud_note.util.NoteResult;

public class TestUserService {
	UserService service;
	@Before
	public void init() {
		String[] conf = {"conf/spring-mybatis.xml","conf/spring-mvc.xml","conf/spring-transaction.xml"};
		ApplicationContext ctx 
		= new ClassPathXmlApplicationContext(conf);
		service = ctx.getBean("userService",UserService.class);
	}
	
	@Test	//用例-3:预期结果:登录成功
	public void test3() {
		NoteResult<User> result 
			= service.checkLogin("demo", "123456");
		System.out.println(service.getClass().getName());
//		System.out.println(result.getStatus());
//		System.out.println(result.getMsg());
//		System.out.println(result.getData());
	}
	@Test //用例-4:预期结果:注册成功
	public void testSave() {
		NoteResult<Object> result 
			= service.addUser("123456","李大钊",  "25ll");
		System.out.println(result.getStatus());
		System.out.println(result.getMsg());
	}
	
	
	
}
