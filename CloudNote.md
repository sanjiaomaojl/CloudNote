# CloudNote
云笔记
#在线云笔记
##概述
云笔记，用于实现用户在线学习记录、分享、收藏笔记。学习来自达内课堂的SSM项目。
##模块划分
-用户模块
-笔记本模块
-笔记模块
-分享/收藏笔记
-回收模块
##设计思想
MVC设计思想

表现层:html + css + jQuery + ajax
控制层:sprigmvc
业务层:service组件
持久层:Dao组件
##技术架构
采用技术:java+jQuery+ajax+springmvc
##规范
-所有请求ajax方式访问
-前端采用HTML
请求结果进行JSON相应
##数据库
采用mysql数据库
具体设计为https://github.com/sanjiaomaojl/CloudNote/blob/master/cloud_note.sql
##运行
可在Tomcat上运行项目，初始接口为https://github.com/sanjiaomaojl/CloudNote/blob/master/src/main/webapp/index.html
可在页面完成注册登录等工作
