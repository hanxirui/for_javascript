

###############################################

 REST API 



1.host/resmodel/       GET      login.html


##############################################

login

1.host/login                  POST  校验，登陆
2.host/login                  GET   定向
3.host/login/logout/:userId   GET   注销


###############################################
admin
1.host/resmodel/admin/          GET  
2.host/resmodel/admin/leftpage  GET
3.host/resmodel/admin/userdata/:pageNow  GET
 

###############################################

user 
1.host/remodle/admin/user/new   GET  弹出新增页


###############################################

userInfo 类

userInfo={
    	userId:'sdadadasd',
    	userName:userName,
    	webpath:req.host,
    	role:''
    };




###############################################

 数据结构 在db目下。
 默认用户密码，。admin/admin



















###############################################


部署环境
172.17.160.191
administrator-p@ssw0rd
###############################################


每个html每个html页 用  <% include baseInfo.html %>   加载常量页。
里面定义了 js中 需要用到的常量。



##############################################