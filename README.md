# CloudNote
## 概述
云笔记，用于实现用户在线学习记录、分享、收藏笔记。学习来自达内课堂的SSM项目。
## 模块划分
- 用户模块 <br>
- 笔记本模块 <br>
- 笔记模块 <br>
- 分享/收藏笔记 <br>
- 回收模块 <br>
## 设计思想 <br>
MVC设计思想 <br>

表现层:html + css + jQuery + ajax <br>
控制层:sprigmvc <br>
业务层:service组件 <br>
持久层:Dao组件 <br>
## 技术架构
采用技术:java+jQuery+ajax+springmvc <br>
## 规范
- 所有请求ajax方式访问 <br>
- 前端采用HTML <br>
请求结果进行JSON相应 <br>
## 数据库
采用mysql数据库 <br>
数据库的设计为:https://github.com/sanjiaomaojl/CloudNote/blob/master/cloud_note.sql <br>
## 运行
可在Tomcat上运行该项目。<br>
初始页面为https://github.com/sanjiaomaojl/CloudNote/blob/master/src/main/webapp/log_in.html 可实现用户的登录注册。<br>
登录成功后，用户可实现创建、修改、删除等操作，所有操作简单便捷。<br>
