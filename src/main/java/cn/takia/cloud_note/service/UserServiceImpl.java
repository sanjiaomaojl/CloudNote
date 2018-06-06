package cn.takia.cloud_note.service;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import cn.takia.cloud_note.dao.UserDao;
import cn.takia.cloud_note.entity.User;
import cn.takia.cloud_note.util.NoteResult;
import cn.takia.cloud_note.util.NoteUtil;

@Service("userService") //扫描的Spring容器
@Transactional
public class UserServiceImpl implements UserService{

	@Resource
	private UserDao userDao;
	public NoteResult<User> checkLogin(String name, String password) {
		//接收结果数据
		NoteResult<User> result = new NoteResult<User>();
		//检查用户名
		User user = userDao.findByName(name);
		if(user == null){
			result.setStatus(1);
			result.setMsg("用户不存在");
			return result;
		}
		//检查密码
		String md5_password = NoteUtil.md5(password);
		//将用户输入的1234明文加密和数据库密文对比
		if(!user.getCn_user_password().equals(md5_password)){
			result.setStatus(2);
			result.setMsg("密码错误");
			return result;
		}
		//用户名和密码正确
		result.setStatus(0);
		result.setMsg("用户名和密码正确");
		result.setData(user);
		return result;
	}
	@Override
	public NoteResult<Object> addUser(String name,String password,String nick) {
		//接收结果数据
		NoteResult<Object> result = new NoteResult<Object>();
		//检查用户
		User hasUser = userDao.findByName(name);
 		if(hasUser != null) {
			result.setStatus(1);
			result.setMsg("该用户已存在");
			return result;
		}
			User user = new User(); 
			user.setCn_user_id(NoteUtil.createId());
			user.setCn_user_name(name);
			user.setCn_user_password(NoteUtil.md5(password));
			user.setCn_user_nick(nick);
			userDao.save(user);
			//构建返回结果
			result.setStatus(0);
			result.setMsg("注册成功");
			return result;
	}
	
}
