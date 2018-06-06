package cn.takia.cloud_note.aspect;

import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.springframework.stereotype.Component;

@Component
@Aspect
public class AuditBean {
	@Around("within(cn.takia.cloud_note.service..*)")
	public Object audit(ProceedingJoinPoint point) {
		Object obj = null;
		try {
			long timeStart = System.currentTimeMillis();
			obj = point.proceed();
			long timeEnd = System.currentTimeMillis();
			String name = point.getSignature().toString();
			System.out.println(name+"耗时:"+(timeEnd-timeStart));
		} catch (Throwable e) {
			e.printStackTrace();
		}
		return obj;
	}
	
}
