/*
Navicat MySQL Data Transfer

Source Server         : 127.0.0.1
Source Server Version : 50513
Source Host           : 127.0.0.1:3306
Source Database       : res_model

Target Server Type    : MYSQL
Target Server Version : 50513
File Encoding         : 65001

Date: 2014-08-20 12:20:36
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for t_ml_user
-- ----------------------------
DROP TABLE IF EXISTS `t_ml_user`;
CREATE TABLE `t_ml_user` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '主键',
  `c_account` varchar(45) NOT NULL COMMENT '用户登录账号',
  `c_user_name` varchar(150) NOT NULL COMMENT '用户姓名',
  `c_password` varchar(150) NOT NULL COMMENT '密码',
  `c_mail_addr` varchar(150) DEFAULT NULL COMMENT ' 邮箱地址',
  `c_phone_num` varchar(150) DEFAULT NULL COMMENT '电话号码',
  `c_dept` varchar(60) DEFAULT NULL COMMENT '所属部门',
  `c_role` varchar(60) DEFAULT NULL COMMENT '该用户的角色类型',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=83 DEFAULT CHARSET=utf8 COMMENT='模型用户表';

-- ----------------------------
-- Records of t_ml_user
-- ----------------------------
INSERT INTO `t_ml_user` VALUES ('82', 'admin', 'admin', 'cf11c7c899ef00817b111a87312af21d6758547d', '', '', '', 'DEV_ENGINEER');
