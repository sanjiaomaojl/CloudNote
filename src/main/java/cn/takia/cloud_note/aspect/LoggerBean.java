package cn.takia.cloud_note.aspect;

import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.springframework.stereotype.Component;

//起到定义<bean>的作用
@Component
//相当于<aop:aspect ref="loggerNean">
@Aspect
public class LoggerBean {
	@Before("within(cn.takia.cloud_note.controller..*)")
	public void logController() {
		System.out.println("AOP功能注入!");
	}
	//切入点的配置信息
	@Before("within(cn.takia.cloud_note.service..*)")
	public void logService() {
		System.out.println("AOP的Service功能注入!");
	}
}
