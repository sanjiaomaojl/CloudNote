package test.dao;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.junit.Before;
import org.junit.Test;

import cn.takia.cloud_note.dao.ShareDao;
import cn.takia.cloud_note.entity.Share;
import cn.takia.cloud_note.util.NoteUtil;
import test.TestBase;

public class TestShareDao extends TestBase{
	private ShareDao shareDao;
	@Before
	public void init() {
		shareDao = super.getContext().getBean("shareDao",ShareDao.class);
	}
	@Test
	public void test1() {
		Share share = new Share();
		String shareId = NoteUtil.createId();
		share.setCn_share_id(shareId);
		share.setCn_share_title("ceshi");
		share.setCn_share_body("ceshi");
		share.setCn_note_id("003ec2a1-f975-4322-8e4d-dfd206d6ac0c");
		shareDao.addShare(share);
	}
	@Test
	public void test2() {
		Map<String, Object> param = new HashMap();
		param.put("title", "1");
		param.put("begin", 1);
		List<Share> list = shareDao.selectNote(param);
		System.out.println(list.size());
	}
}









