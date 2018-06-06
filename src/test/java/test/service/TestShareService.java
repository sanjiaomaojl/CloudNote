package test.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.junit.Before;
import org.junit.Test;

import cn.takia.cloud_note.entity.Share;
import cn.takia.cloud_note.service.ShareService;
import cn.takia.cloud_note.util.NoteResult;
import test.TestBase;

public class TestShareService extends TestBase{
	private ShareService shareService;
	@Before
	public void init() {
		shareService = 
				super.getContext().getBean(
						"shareService",ShareService.class);
	}
	@Test
	public void test1() {
		NoteResult<Share> result = 
				shareService.addShare("054449b4-93d4-4f97-91cb-e0043fc4497f");
		System.out.println(result.getStatus());
		System.out.println(result.getMsg());
		System.out.println(result.getData());
	}
	@Test
	public void test2() {
		NoteResult<List<Share>> result =
				shareService.selectNote("1",2);
		System.out.println(result.getStatus());
		System.out.println(result.getMsg());
		System.out.println(result.getData());
	}
}
