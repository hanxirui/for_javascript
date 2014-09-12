/*
Navicat MySQL Data Transfer

Source Server         : 127.0.0.1
Source Server Version : 50513
Source Host           : 127.0.0.1:3306
Source Database       : res_model

Target Server Type    : MYSQL
Target Server Version : 50513
File Encoding         : 65001

Date: 2014-08-19 15:56:01
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for t_ml_role
-- ----------------------------
DROP TABLE IF EXISTS `t_ml_role`;
CREATE TABLE `t_ml_role` (
  `c_id` int(11) NOT NULL AUTO_INCREMENT,
  `c_role_id` varchar(50) NOT NULL COMMENT '角色实际主键',
  `c_role_name` varchar(60) NOT NULL COMMENT '角色名称',
  `c_role_content` varchar(300) DEFAULT NULL COMMENT '备注',
  `c_role_style` varchar(60) NOT NULL COMMENT '角色类型',
  PRIMARY KEY (`c_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8 COMMENT='模型角色表';

-- ----------------------------
-- Records of t_ml_role
-- ----------------------------
INSERT INTO `t_ml_role` VALUES ('2', 'DEV_ENGINEER', '研发工程师', null, '2');
INSERT INTO `t_ml_role` VALUES ('3', 'MAN_ENGINEER', '维护工程师', null, '1');
