package cn.takia.cloud_note.dao;

import java.util.List;
import java.util.Map;

import cn.takia.cloud_note.entity.Share;

public interface ShareDao {
	public void addShare(Share share);
	public List<Share> selectNote(Map params);
}
