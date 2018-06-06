package test;

import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;


public abstract class TestBase {
	public ApplicationContext getContext() {
		String[] conf = {"conf/spring-mybatis.xml","conf/spring-mvc.xml"};
		ApplicationContext ctx 
		= new ClassPathXmlApplicationContext(conf);
		return ctx;
	}
}
