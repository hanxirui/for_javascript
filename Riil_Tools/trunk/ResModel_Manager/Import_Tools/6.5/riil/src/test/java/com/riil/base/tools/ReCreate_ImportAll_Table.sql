
CREATE DATABASE /*!32312 IF NOT EXISTS*/`riil_resmodel` /*!40100 DEFAULT CHARACTER SET utf8 */;

/*Table structure for table `t_aduit_log` */

DROP TABLE IF EXISTS `t_aduit_log`;

CREATE TABLE `t_aduit_log` (
  `c_time` datetime DEFAULT NULL,
  `c_user` varchar(45) DEFAULT NULL,
  `c_info` varchar(500) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='操作日志表';

/*Table structure for table `t_dict_coll_frequency` */

DROP TABLE IF EXISTS `t_dict_coll_frequency`;

CREATE TABLE `t_dict_coll_frequency` (
  `c_id` varchar(36) NOT NULL,
  `c_metric_type` varchar(50) DEFAULT NULL COMMENT '指标类型',
  `c_name` varchar(100) NOT NULL COMMENT '频度名称',
  `c_name_en` varchar(100) DEFAULT NULL,
  `c_frequency` int(11) DEFAULT NULL COMMENT '采集频度',
  `c_frequency_unit` varchar(50) DEFAULT NULL COMMENT '频度单位，SECOND、MINUTE、HOUR、DAY',
  `c_sort_id` smallint(6) DEFAULT NULL COMMENT '排序号',
  `c_desc` varchar(100) DEFAULT NULL COMMENT '描述',
  `c_type` tinyint(4) DEFAULT NULL COMMENT '频度类型，0使用周期，1使用计划（日期），2使用计划（星期），周期采集为默认。',
  `c_month` varchar(50) DEFAULT NULL COMMENT '月份',
  `c_week` varchar(20) DEFAULT NULL COMMENT '周几列表，1,3,5',
  `c_day` varchar(100) DEFAULT NULL COMMENT '天',
  `c_hour` varchar(100) DEFAULT NULL COMMENT '小时',
  `c_minute` varchar(20) DEFAULT NULL COMMENT '分',
  PRIMARY KEY (`c_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='采集频度字典表';

/*Table structure for table `t_ml_back_plane` */

DROP TABLE IF EXISTS `t_ml_back_plane`;

CREATE TABLE `t_ml_back_plane` (
  `c_id` int(11) NOT NULL AUTO_INCREMENT,
  `c_backplane_name` varchar(270) DEFAULT NULL,
  `c_project_name` varchar(270) DEFAULT NULL,
  `c_ventor` varchar(180) DEFAULT NULL,
  `c_equipment_type` varchar(180) DEFAULT NULL,
  `c_apply_date` date DEFAULT NULL,
  `c_operator_id` varchar(90) DEFAULT NULL,
  `c_desc` varchar(750) DEFAULT NULL,
  PRIMARY KEY (`c_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT=' 背板管理表';

/*Table structure for table `t_ml_manuf` */

DROP TABLE IF EXISTS `t_ml_manuf`;

CREATE TABLE `t_ml_manuf` (
  `c_id` double NOT NULL AUTO_INCREMENT,
  `c_manuf_id` varchar(108) DEFAULT NULL,
  `c_manuf_name` varchar(300) DEFAULT NULL,
  `c_photoid` varchar(180) DEFAULT NULL,
  `c_manuf_icon` varchar(2295) DEFAULT NULL,
  `c_operator` varchar(135) DEFAULT NULL,
  PRIMARY KEY (`c_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='厂商管理表';

/*Table structure for table `t_ml_role` */

DROP TABLE IF EXISTS `t_ml_role`;

CREATE TABLE `t_ml_role` (
  `c_id` int(11) NOT NULL AUTO_INCREMENT,
  `c_role_id` varchar(50) NOT NULL COMMENT '角色实际主键',
  `c_role_name` varchar(60) NOT NULL COMMENT '角色名称',
  `c_role_content` varchar(300) DEFAULT NULL COMMENT '备注',
  `c_role_style` varchar(60) NOT NULL COMMENT '角色类型',
  PRIMARY KEY (`c_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='模型角色表';

/*Table structure for table `t_ml_user` */

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
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='模型用户表';

/*Table structure for table `t_moni_cmd` */

DROP TABLE IF EXISTS `t_moni_cmd`;

CREATE TABLE `t_moni_cmd` (
  `c_id` char(36) NOT NULL COMMENT '采集指令ID',
  `c_cmds_group_id` char(36) NOT NULL COMMENT '采集指令组ID',
  `c_index` varchar(50) DEFAULT NULL COMMENT '采集指令索引',
  `c_protocol` varchar(50) DEFAULT NULL COMMENT '采集指令协议',
  `c_cmd` varchar(2000) NOT NULL COMMENT '采集指令',
  PRIMARY KEY (`c_id`),
  KEY `index_group_id` (`c_cmds_group_id`)
) ENGINE=InnoDB DEFAULT CHARSET=gbk COMMENT='采集指令表';

/*Table structure for table `t_moni_cmd_filters` */

DROP TABLE IF EXISTS `t_moni_cmd_filters`;

CREATE TABLE `t_moni_cmd_filters` (
  `c_id` char(36) NOT NULL COMMENT '过滤器ID',
  `c_cmd_id` char(36) NOT NULL COMMENT '采集指令ID',
  `c_dependecy` varchar(50) NOT NULL COMMENT '依赖索引',
  `c_row` varchar(50) NOT NULL COMMENT '行',
  `c_column` varchar(50) NOT NULL COMMENT '列',
  `c_cmdParameterName` varchar(50) NOT NULL COMMENT 'cmd对应的属性名称',
  PRIMARY KEY (`c_id`),
  KEY `index_cmd_id` (`c_cmd_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COMMENT='采集指令过滤器表';

/*Table structure for table `t_moni_cmd_properties` */

DROP TABLE IF EXISTS `t_moni_cmd_properties`;

CREATE TABLE `t_moni_cmd_properties` (
  `c_cmd_id` char(36) NOT NULL COMMENT '采集指令ID',
  `c_name` varchar(200) NOT NULL COMMENT '属性名称',
  `c_value` varchar(200) NOT NULL COMMENT '属性值',
  KEY `index_cmd_id` (`c_cmd_id`)
) ENGINE=InnoDB DEFAULT CHARSET=gbk COMMENT='采集指令属性表';

/*Table structure for table `t_moni_cmds_conn_protocol` */

DROP TABLE IF EXISTS `t_moni_cmds_conn_protocol`;

CREATE TABLE `t_moni_cmds_conn_protocol` (
  `c_id` char(36) NOT NULL COMMENT '协议ID',
  `c_cmds_group_id` char(36) NOT NULL COMMENT '采集指令组ID',
  `c_protocol` char(36) NOT NULL COMMENT '协议',
  PRIMARY KEY (`c_id`),
  KEY `index_cmds_group_id` (`c_cmds_group_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COMMENT='采集指令组连接协议';

/*Table structure for table `t_moni_cmds_group` */

DROP TABLE IF EXISTS `t_moni_cmds_group`;

CREATE TABLE `t_moni_cmds_group` (
  `c_id` char(36) NOT NULL COMMENT '采集指令组ID',
  `c_metricbinding_id` varchar(36) NOT NULL COMMENT '指标绑定ID',
  `c_is_default` varchar(4) NOT NULL COMMENT '是否默认',
  `c_is_dynamic` varchar(4) NOT NULL COMMENT '是否动态指令',
  `c_sort_id` int(11) DEFAULT NULL COMMENT '排序号',
  PRIMARY KEY (`c_id`),
  KEY `index_metricbinding_id` (`c_metricbinding_id`)
) ENGINE=InnoDB DEFAULT CHARSET=gbk COMMENT='采集指令组表';

/*Table structure for table `t_moni_cmds_process_para` */

DROP TABLE IF EXISTS `t_moni_cmds_process_para`;

CREATE TABLE `t_moni_cmds_process_para` (
  `c_id` char(36) NOT NULL COMMENT '参数ID',
  `c_cmds_processor_id` char(36) NOT NULL COMMENT '处理器ID',
  `c_parameter` varchar(200) NOT NULL COMMENT '处理参数',
  `c_sort_id` int(11) DEFAULT NULL COMMENT '排序号',
  PRIMARY KEY (`c_id`),
  KEY `index_cmds_processor_id` (`c_cmds_processor_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COMMENT='采集指令组处理参数表';

/*Table structure for table `t_moni_cmds_processor` */

DROP TABLE IF EXISTS `t_moni_cmds_processor`;

CREATE TABLE `t_moni_cmds_processor` (
  `c_id` char(36) NOT NULL COMMENT '处理器ID',
  `c_cmds_group_id` char(36) NOT NULL COMMENT '采集指令组ID',
  `c_className` varchar(500) DEFAULT NULL COMMENT '处理器',
  `c_method` varchar(200) NOT NULL COMMENT '处理方法',
  PRIMARY KEY (`c_id`),
  KEY `index_cmds_group_id` (`c_cmds_group_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COMMENT='采集指令组处理器表';

/*Table structure for table `t_moni_cmds_support` */

DROP TABLE IF EXISTS `t_moni_cmds_support`;

CREATE TABLE `t_moni_cmds_support` (
  `c_id` char(36) NOT NULL COMMENT '支持ID',
  `c_cmds_group_id` char(36) NOT NULL COMMENT '采集指令组ID',
  `c_version` varchar(200) NOT NULL COMMENT '支持版本',
  `c_rel` varchar(200) NOT NULL COMMENT '支持发布',
  PRIMARY KEY (`c_id`),
  KEY `index_cmds_group_id` (`c_cmds_group_id`)
) ENGINE=InnoDB DEFAULT CHARSET=gbk COMMENT='采集指令扩展支持\r\n';

/*Table structure for table `t_moni_event_base` */

DROP TABLE IF EXISTS `t_moni_event_base`;

CREATE TABLE `t_moni_event_base` (
  `c_id` varchar(36) NOT NULL COMMENT '事件ID',
  `c_name` varchar(50) NOT NULL COMMENT '事件名称',
  `c_name_display` varchar(50) DEFAULT NULL COMMENT '事件显示名称，包括{METRIC_NAME}变量，如主机CPU超过严重阈值',
  `c_type` varchar(50) DEFAULT NULL COMMENT '事件类型，可用性事件、性能事件、配置事件',
  `c_desc` varchar(100) DEFAULT NULL COMMENT '事件描述',
  `c_is_recovery_event` tinyint(4) DEFAULT NULL COMMENT '主资源还是子资源',
  `c_exp_id` tinyint(4) DEFAULT NULL COMMENT '表达式序号',
  `c_recovery_event_ids` varchar(50) DEFAULT NULL COMMENT '恢复事件IDs',
  `c_tag1` varchar(50) DEFAULT NULL COMMENT '冗余字段1',
  `c_tag2` varchar(50) DEFAULT NULL COMMENT '冗余字段2',
  `c_tag3` varchar(50) DEFAULT NULL COMMENT '冗余字段3',
  `c_tag4` varchar(50) DEFAULT NULL COMMENT '冗余字段4',
  PRIMARY KEY (`c_id`)
) ENGINE=InnoDB DEFAULT CHARSET=gbk COMMENT='事件基础表';

/*Table structure for table `t_moni_metric_base` */

DROP TABLE IF EXISTS `t_moni_metric_base`;

CREATE TABLE `t_moni_metric_base` (
  `c_id` varchar(36) NOT NULL,
  `c_name` varchar(100) DEFAULT NULL COMMENT '指标名称',
  `c_desc` varchar(500) DEFAULT NULL COMMENT '指标描述',
  `c_metric_type` varchar(50) DEFAULT NULL COMMENT '指标类型,性能指标、配置指标、可用性指标',
  `c_unit` varchar(50) DEFAULT NULL COMMENT '指标单位',
  `c_data_type` varchar(10) DEFAULT NULL COMMENT '数据类型',
  `c_sort_id` int(11) DEFAULT NULL COMMENT '排序号',
  `c_tag1` varchar(50) DEFAULT NULL COMMENT '冗余字段1',
  `c_tag2` varchar(50) DEFAULT NULL COMMENT '冗余字段2',
  `c_is_custom` tinyint(4) DEFAULT '-1' COMMENT '是否自定义',
  `c_user_id` varchar(50) DEFAULT NULL COMMENT '操作人',
  PRIMARY KEY (`c_id`),
  KEY `idx_moni_base_type` (`c_metric_type`),
  KEY `idx_moni_base_sortid` (`c_sort_id`)
) ENGINE=InnoDB DEFAULT CHARSET=gbk COMMENT='指标基础表';

/*Table structure for table `t_moni_metric_group` */

DROP TABLE IF EXISTS `t_moni_metric_group`;

CREATE TABLE `t_moni_metric_group` (
  `c_id` varchar(100) NOT NULL COMMENT '指标组ID',
  `c_name` varchar(100) NOT NULL COMMENT '指标组名称',
  `c_desc` varchar(100) DEFAULT NULL COMMENT '描述',
  `c_group_type` varchar(50) DEFAULT NULL COMMENT '指标组类型',
  `c_sort_id` smallint(6) DEFAULT NULL COMMENT '排序号',
  `c_tag1` varchar(50) DEFAULT NULL COMMENT '冗余字段1',
  `c_tag2` varchar(50) DEFAULT NULL COMMENT '冗余字段2',
  `c_tag3` varchar(50) DEFAULT NULL COMMENT '冗余字段3',
  `c_tag4` varchar(50) DEFAULT NULL COMMENT '冗余字段4',
  `c_is_custom` tinyint(4) DEFAULT '1' COMMENT '是否自定义',
  PRIMARY KEY (`c_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='指标组表';

/*Table structure for table `t_moni_metric_group_rel` */

DROP TABLE IF EXISTS `t_moni_metric_group_rel`;

CREATE TABLE `t_moni_metric_group_rel` (
  `c_metric_group_id` varchar(100) NOT NULL COMMENT '指标组ID',
  `c_metric_id` varchar(36) NOT NULL COMMENT '指标ID',
  UNIQUE KEY `UQ_metric_group_rel` (`c_metric_group_id`,`c_metric_id`)
) ENGINE=InnoDB DEFAULT CHARSET=gbk COMMENT='指标组关联关系表';

/*Table structure for table `t_moni_metric_process_para` */

DROP TABLE IF EXISTS `t_moni_metric_process_para`;

CREATE TABLE `t_moni_metric_process_para` (
  `c_id` char(36) NOT NULL COMMENT '参数ID',
  `c_metricbinding_id` char(36) NOT NULL COMMENT '指标绑定ID',
  `c_parameter` varchar(200) NOT NULL COMMENT '处理参数',
  `c_sort_id` int(11) DEFAULT NULL COMMENT '排序号',
  PRIMARY KEY (`c_id`),
  KEY `index_metricbinding_id` (`c_metricbinding_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COMMENT='指标处理参数表';

/*Table structure for table `t_moni_metricbinding` */

DROP TABLE IF EXISTS `t_moni_metricbinding`;

CREATE TABLE `t_moni_metricbinding` (
  `c_id` char(36) CHARACTER SET utf8 NOT NULL COMMENT '指标绑定ID',
  `c_model_id` varchar(100) CHARACTER SET utf8 DEFAULT NULL COMMENT '监控模型ID',
  `c_metric_id` char(36) CHARACTER SET utf8 DEFAULT NULL COMMENT '指标ID',
  `c_className` varchar(500) CHARACTER SET utf8 DEFAULT NULL COMMENT '处理器类名',
  `c_method` varchar(200) CHARACTER SET utf8 DEFAULT NULL COMMENT '处理器方法名',
  `c_is_instance` tinyint(4) DEFAULT '-1' COMMENT '是否实例化',
  `c_is_initvalue` tinyint(4) DEFAULT '-1' COMMENT '是否初始化',
  `c_is_displayname` tinyint(4) DEFAULT '-1' COMMENT '是否显示名称',
  PRIMARY KEY (`c_id`)
) ENGINE=InnoDB DEFAULT CHARSET=gbk;

/*Table structure for table `t_moni_model_base` */

DROP TABLE IF EXISTS `t_moni_model_base`;

CREATE TABLE `t_moni_model_base` (
  `c_id` varchar(100) NOT NULL COMMENT '模型ID',
  `c_res_type_id` varchar(100) DEFAULT NULL COMMENT '资源类型ID',
  `c_name` varchar(100) DEFAULT NULL COMMENT '模型名称',
  `c_desc` varchar(500) DEFAULT NULL COMMENT '模型描述',
  `c_is_snmp` tinyint(4) DEFAULT NULL COMMENT '是否纯snmp模型',
  `c_plugin_id` varchar(1000) DEFAULT NULL COMMENT '插件ID',
  `c_main_model_id` varchar(100) DEFAULT NULL COMMENT '主模型ID',
  `c_is_main` tinyint(4) DEFAULT NULL COMMENT '主资源还是子资源',
  `c_tree_node_id` varchar(36) DEFAULT NULL COMMENT '模板的tree节点',
  `c_vendor_id` varchar(36) DEFAULT NULL COMMENT '厂商ID',
  `c_vendor_name` varchar(100) DEFAULT NULL COMMENT '厂商名称',
  `c_precondition` varchar(4000) DEFAULT NULL COMMENT '前提条件，发现或采集前提条件。包括<br>换行',
  `c_connect_info_desc` varchar(4000) DEFAULT NULL COMMENT '连接信息填写说明',
  `c_is_custom` tinyint(4) DEFAULT '1' COMMENT '是否自定义',
  `c_tag1` varchar(50) DEFAULT NULL COMMENT '冗余字段1',
  `c_tag2` varchar(50) DEFAULT NULL COMMENT '冗余字段2',
  `c_tag3` varchar(50) DEFAULT NULL COMMENT '冗余字段3',
  `c_tag4` varchar(500) DEFAULT NULL COMMENT '冗余字段4(存processor字段)',
  PRIMARY KEY (`c_id`),
  KEY `idx_moni_model_base_tree` (`c_tree_node_id`),
  KEY `idx_moni_model_base_main` (`c_is_main`)
) ENGINE=InnoDB DEFAULT CHARSET=gbk COMMENT='监控模型基础信息';

/*Table structure for table `t_moni_model_metric_rel` */

DROP TABLE IF EXISTS `t_moni_model_metric_rel`;

CREATE TABLE `t_moni_model_metric_rel` (
  `c_model_id` varchar(100) NOT NULL COMMENT '监控模型ID',
  `c_metric_id` varchar(36) NOT NULL COMMENT '指标ID',
  `c_res_type_id` varchar(100) DEFAULT NULL COMMENT '资源类型ID',
  UNIQUE KEY `UQ_model_metric_rel` (`c_model_id`,`c_metric_id`),
  KEY `index_model_id` (`c_model_id`)
) ENGINE=InnoDB DEFAULT CHARSET=gbk COMMENT='模型指标关联关系表';

/*Table structure for table `t_moni_model_sysoid` */

DROP TABLE IF EXISTS `t_moni_model_sysoid`;

CREATE TABLE `t_moni_model_sysoid` (
  `C_MODEL_ID` varchar(100) DEFAULT NULL,
  `C_RESTYPE_ID` varchar(100) DEFAULT NULL,
  `C_OS_TYPE` varchar(45) DEFAULT NULL,
  `C_DEV_TYPE` varchar(45) DEFAULT NULL,
  `C_SYS_OID` varchar(45) DEFAULT NULL,
  `C_VENDOR_MODEL_ID` varchar(60) DEFAULT NULL,
  `C_VENDOR_ID` varchar(60) DEFAULT NULL,
  `C_SERIES` varchar(100) DEFAULT NULL,
  `C_MODEL_NUMBER` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Table structure for table `t_moni_policy_action` */

DROP TABLE IF EXISTS `t_moni_policy_action`;

CREATE TABLE `t_moni_policy_action` (
  `c_id` varchar(36) NOT NULL,
  `c_company_id` varchar(36) DEFAULT NULL,
  `c_policy_id` varchar(100) NOT NULL COMMENT '策略ID',
  `c_action_name` varchar(30) DEFAULT NULL COMMENT '脚本名称',
  `c_plugin_id` varchar(36) DEFAULT NULL COMMENT '采集协议插件，通用日志WMI、TELNET、SSH等，界面是执行方式',
  `c_file` varchar(500) DEFAULT NULL COMMENT '日志或脚本路径及名称',
  `c_args` varchar(200) DEFAULT NULL COMMENT '脚本参数',
  `c_event_ids` varchar(4000) DEFAULT NULL COMMENT 'action脚本触发事件列表',
  `c_in_use` tinyint(4) DEFAULT NULL COMMENT '是否启用',
  `c_desc` varchar(200) DEFAULT NULL,
  `c_tag1` varchar(50) DEFAULT NULL COMMENT '冗余字段1',
  `c_tag2` varchar(50) DEFAULT NULL COMMENT '冗余字段2',
  PRIMARY KEY (`c_id`,`c_policy_id`),
  KEY `idx_moni_pcy_act_pcy` (`c_policy_id`)
) ENGINE=InnoDB DEFAULT CHARSET=gbk COMMENT='action定义';

/*Table structure for table `t_moni_policy_event` */

DROP TABLE IF EXISTS `t_moni_policy_event`;

CREATE TABLE `t_moni_policy_event` (
  `c_id` varchar(36) NOT NULL,
  `c_company_id` varchar(36) DEFAULT NULL,
  `c_name` varchar(50) NOT NULL COMMENT '事件名称,脚本日志trap时存储',
  `c_policy_id` varchar(100) NOT NULL COMMENT '策略ID',
  `c_event_id` varchar(50) NOT NULL COMMENT '事件ID',
  `c_level` varchar(50) DEFAULT NULL COMMENT '事件级别',
  `c_in_use` tinyint(4) DEFAULT NULL COMMENT '是否启用',
  `c_type` varchar(50) DEFAULT NULL COMMENT '事件类型',
  `c_match_type` varchar(20) DEFAULT NULL COMMENT '关联类型，抖动或关联',
  `c_desc` varchar(100) DEFAULT NULL COMMENT '事件描述',
  `c_tag1` varchar(50) DEFAULT NULL COMMENT '冗余字段1',
  `c_tag2` varchar(50) DEFAULT NULL COMMENT '冗余字段2',
  PRIMARY KEY (`c_id`),
  UNIQUE KEY `UQ_policy_event` (`c_policy_id`,`c_event_id`),
  KEY `idx_moni_pcy_eve_level` (`c_level`),
  KEY `idx_moni_pcy_eve_use` (`c_in_use`)
) ENGINE=InnoDB DEFAULT CHARSET=gbk COMMENT='策略事件配置';

/*Table structure for table `t_moni_policy_event_rule` */

DROP TABLE IF EXISTS `t_moni_policy_event_rule`;

CREATE TABLE `t_moni_policy_event_rule` (
  `c_id` varchar(36) NOT NULL,
  `c_company_id` varchar(36) DEFAULT NULL,
  `c_policy_id` varchar(100) NOT NULL COMMENT '策略ID',
  `c_event_id` varchar(50) NOT NULL COMMENT '事件ID',
  `c_events` varchar(1000) DEFAULT NULL COMMENT '事件列表',
  `c_win_event_id` varchar(50) DEFAULT NULL COMMENT 'windows事件ID',
  `c_log_level` varchar(100) DEFAULT NULL COMMENT '多个级别逗号分隔',
  `c_source` varchar(100) DEFAULT NULL COMMENT '来源',
  `c_key_exp` varchar(500) DEFAULT NULL COMMENT '关键字与或表达式,CPURate,>,80',
  `c_gen_rule_type` varchar(20) DEFAULT NULL COMMENT '产生规则，连续产生、仅产生一次',
  `c_exp_desc` varchar(200) DEFAULT NULL COMMENT '表达式描述，给用户看的，如内存利用率,大于,80',
  `c_time` smallint(6) DEFAULT NULL COMMENT '计时，单位分钟',
  `c_counts` smallint(6) DEFAULT NULL COMMENT '计数',
  `c_trap_type` varchar(20) DEFAULT NULL COMMENT 'trap分类',
  `c_trap_group` varchar(20) DEFAULT NULL COMMENT 'trap分组',
  `c_trap_enterprise` varchar(200) DEFAULT NULL COMMENT '企业id，snmpv2就是trapoid',
  `c_trap_general` varchar(200) DEFAULT NULL COMMENT '通用陷阱号',
  `c_trap_special` varchar(200) DEFAULT NULL COMMENT '计时分钟',
  `c_trap_template` varchar(4000) DEFAULT NULL COMMENT 'trap模板定义，包括宏变量',
  `c_trap_template_en` varchar(4000) DEFAULT NULL COMMENT 'trap外文模板',
  `c_in_use` tinyint(4) DEFAULT NULL COMMENT '是否启用',
  `c_tag1` varchar(50) DEFAULT NULL COMMENT '冗余字段1',
  `c_tag2` varchar(50) DEFAULT NULL COMMENT '冗余字段2',
  PRIMARY KEY (`c_id`),
  KEY `idx_moni_event_rule_policy` (`c_policy_id`,`c_event_id`),
  KEY `idx_moni_event_rule_event` (`c_policy_id`)
) ENGINE=InnoDB DEFAULT CHARSET=gbk COMMENT='事件规则';

/*Table structure for table `t_moni_policy_info` */

DROP TABLE IF EXISTS `t_moni_policy_info`;

CREATE TABLE `t_moni_policy_info` (
  `c_id` varchar(100) NOT NULL COMMENT '监控策略ID',
  `c_policy_type` varchar(20) DEFAULT NULL COMMENT '策略类型：MONITOR、LOG.SYSLOG、LOG.WINDOWS、LOG.COMMONLOG、SCRIPT.ACTION、SCRIPT.TIMER、SCRIPT.ADV、TRAP、ROOM',
  `c_name` varchar(100) DEFAULT NULL,
  `c_desc` varchar(500) DEFAULT NULL,
  `c_tree_node_id` varchar(36) DEFAULT NULL COMMENT 'tree节点ID，如：base为00；host为00.01，AIX就是00.01.01 如果是此模板为子资源模板，此列为空',
  `c_res_type_id` varchar(100) DEFAULT NULL COMMENT '资源类型ID',
  `c_res_type_name` varchar(100) DEFAULT NULL COMMENT '资源类型名称',
  `c_model_id` varchar(100) DEFAULT NULL COMMENT '监控模型ID',
  `c_model_name` varchar(100) DEFAULT NULL COMMENT '监控模型名称',
  `c_is_main` tinyint(4) DEFAULT NULL COMMENT '主策略还是子策略',
  `c_in_use` tinyint(4) DEFAULT NULL COMMENT '是否启用',
  `c_main_policy_id` varchar(100) DEFAULT NULL COMMENT '主策略ID',
  `c_is_default` tinyint(4) DEFAULT '-1' COMMENT '是否默认策略',
  `c_is_factory` tinyint(4) DEFAULT NULL COMMENT '是否出厂配置',
  `c_user_domain_id` varchar(50) DEFAULT NULL,
  `c_create_user` varchar(50) DEFAULT NULL COMMENT '创建用户',
  `c_update_user` varchar(50) DEFAULT NULL COMMENT '修改用户',
  `c_publish_user` varchar(50) DEFAULT NULL COMMENT '发布用户',
  `c_create_time` datetime DEFAULT NULL,
  `c_update_time` datetime DEFAULT NULL,
  `c_publish_time` datetime DEFAULT NULL COMMENT '发布时间',
  `c_original_policy_id` varchar(100) DEFAULT NULL COMMENT '原策略ID',
  `c_separator_col` varchar(10) DEFAULT NULL COMMENT '列分隔符',
  `c_separator_row` varchar(10) DEFAULT NULL COMMENT '行分隔符',
  `c_frequency` varchar(4000) DEFAULT NULL COMMENT '执行频率，脚本策略执行频率表达式：大类型；小类型；开始时间；结束时间；间隔。大类型：执行一次、周期性执行一次、周期性执行多次。小类型：每周、每天。间隔：每一周、每一天',
  `c_event_ids` varchar(4000) DEFAULT NULL COMMENT 'action脚本触发事件列表',
  `c_file_name` varchar(500) DEFAULT NULL COMMENT '文件名称',
  `c_args` varchar(200) DEFAULT NULL COMMENT '脚本参数',
  `c_port` varchar(20) DEFAULT NULL COMMENT '采集协议对应的端口',
  `c_plugin_id` varchar(36) DEFAULT NULL COMMENT '采集协议插件，通用日志WMI、TELNET、SSH等，界面是执行方式',
  `c_bandwidth_type` varchar(20) DEFAULT NULL COMMENT '带宽类型:10M,100M,1000M,10G',
  `c_company_id` varchar(36) DEFAULT NULL,
  `c_tag1` varchar(50) DEFAULT NULL COMMENT '冗余字段1',
  `c_tag2` varchar(50) DEFAULT NULL COMMENT '冗余字段2',
  `c_tag3` varchar(50) DEFAULT NULL COMMENT '冗余字段3',
  `c_tag4` varchar(50) DEFAULT NULL COMMENT '冗余字段4',
  PRIMARY KEY (`c_id`),
  KEY `idx_moni_ply_info_type` (`c_policy_type`),
  KEY `idx_moni_ply_info_use` (`c_in_use`),
  KEY `idx_moni_ply_info_pub` (`c_in_use`,`c_is_main`,`c_policy_type`)
) ENGINE=InnoDB DEFAULT CHARSET=gbk COMMENT='策略表';

/*Table structure for table `t_moni_policy_metric` */

DROP TABLE IF EXISTS `t_moni_policy_metric`;

CREATE TABLE `t_moni_policy_metric` (
  `c_id` varchar(36) NOT NULL,
  `c_policy_id` varchar(100) NOT NULL COMMENT '策略ID',
  `c_metric_id` varchar(50) NOT NULL COMMENT '指标ID',
  `c_name` varchar(100) DEFAULT NULL,
  `c_in_use` tinyint(4) DEFAULT NULL COMMENT '是否启用',
  `c_gen_event` tinyint(4) DEFAULT '-1' COMMENT '是否产生事件',
  `c_frequency_id` varchar(20) DEFAULT NULL COMMENT '采集频度ID',
  `c_flapping` smallint(6) DEFAULT NULL COMMENT '连续次数',
  `c_retry_times` smallint(6) DEFAULT NULL COMMENT '重试次数',
  `c_time_out` int(11) DEFAULT NULL COMMENT '超时时间,毫秒',
  `c_company_id` varchar(36) DEFAULT NULL,
  `c_tag1` varchar(50) DEFAULT NULL COMMENT '冗余字段1',
  `c_tag2` varchar(50) DEFAULT NULL COMMENT '冗余字段2',
  PRIMARY KEY (`c_id`),
  UNIQUE KEY `UQ_moni_policy_metric` (`c_policy_id`,`c_metric_id`),
  KEY `idx_moni_pcy_metric_id` (`c_metric_id`),
  KEY `idx_moni_pcy_policy_id` (`c_policy_id`)
) ENGINE=InnoDB DEFAULT CHARSET=gbk COMMENT='监控策略指标配置表';

/*Table structure for table `t_moni_policy_res_avail_rule` */

DROP TABLE IF EXISTS `t_moni_policy_res_avail_rule`;

CREATE TABLE `t_moni_policy_res_avail_rule` (
  `c_id` varchar(36) NOT NULL,
  `c_policy_id` varchar(100) NOT NULL COMMENT '策略ID',
  `c_frequency_id` varchar(100) NOT NULL COMMENT '采集频度',
  `c_xml` varchar(4000) DEFAULT NULL COMMENT 'XML1',
  `c_xml2` varchar(4000) DEFAULT NULL COMMENT 'XML2',
  `c_xml3` varchar(4000) DEFAULT NULL COMMENT 'XML3',
  `c_flapping` smallint(6) DEFAULT NULL COMMENT '抖动次数',
  PRIMARY KEY (`c_id`),
  KEY `idx_moni_ava_rule` (`c_policy_id`)
) ENGINE=InnoDB DEFAULT CHARSET=gbk COMMENT='资源可用状态定义';

/*Table structure for table `t_moni_policy_res_rel` */

DROP TABLE IF EXISTS `t_moni_policy_res_rel`;

CREATE TABLE `t_moni_policy_res_rel` (
  `c_id` varchar(36) NOT NULL,
  `c_policy_id` varchar(100) NOT NULL COMMENT '策略ID',
  `c_inst_id` varchar(36) NOT NULL COMMENT '实例ID,实例表的c_id',
  `c_sub_inst_id` varchar(36) DEFAULT NULL COMMENT '子实例ID,子实例表的c_id',
  `c_is_main` tinyint(4) DEFAULT NULL COMMENT '主策略还是子策略',
  `c_tag1` varchar(50) DEFAULT NULL COMMENT '冗余字段1',
  PRIMARY KEY (`c_id`,`c_policy_id`),
  UNIQUE KEY `UQ_policy_res_rel` (`c_policy_id`,`c_inst_id`,`c_sub_inst_id`),
  KEY `idx_moni_pcy_resrel_main` (`c_is_main`,`c_policy_id`),
  KEY `idx_moni_pcy_res_rel_ins` (`c_inst_id`,`c_sub_inst_id`)
) ENGINE=InnoDB DEFAULT CHARSET=gbk COMMENT='策略资源关联表';

/*Table structure for table `t_moni_policy_script_metric` */

DROP TABLE IF EXISTS `t_moni_policy_script_metric`;

CREATE TABLE `t_moni_policy_script_metric` (
  `c_id` varchar(36) NOT NULL,
  `c_company_id` varchar(36) DEFAULT NULL,
  `c_policy_id` varchar(100) NOT NULL COMMENT '策略ID',
  `c_metric_id` varchar(50) NOT NULL COMMENT '指标ID',
  `c_metric_name` varchar(100) DEFAULT NULL COMMENT '指标名称',
  `c_metric_name_en` varchar(100) DEFAULT NULL COMMENT '指标英文名称',
  `c_data_type` varchar(20) DEFAULT NULL COMMENT '指标数据类型',
  `c_column_id` smallint(6) DEFAULT NULL COMMENT '列号',
  `c_row_id` smallint(6) DEFAULT NULL COMMENT '行号',
  PRIMARY KEY (`c_id`,`c_policy_id`),
  UNIQUE KEY `UQ_policy_script_metric` (`c_policy_id`,`c_metric_id`,`c_company_id`)
) ENGINE=InnoDB DEFAULT CHARSET=gbk COMMENT='脚本指标定义';

/*Table structure for table `t_moni_policy_threshold` */

DROP TABLE IF EXISTS `t_moni_policy_threshold`;

CREATE TABLE `t_moni_policy_threshold` (
  `c_id` varchar(36) NOT NULL,
  `c_policy_id` varchar(100) NOT NULL COMMENT '策略ID',
  `c_metric_id` varchar(50) NOT NULL COMMENT '指标ID',
  `c_day_or_week` varchar(20) DEFAULT NULL COMMENT '每天还是每周',
  `c_weeks` varchar(20) DEFAULT NULL COMMENT '周几列表，1,3,5',
  `c_start_time` varchar(20) DEFAULT NULL COMMENT '开始时间',
  `c_end_time` varchar(20) DEFAULT NULL COMMENT '结束时间',
  `c_exp1` varchar(50) DEFAULT NULL COMMENT '阀值表达式，1、2、3从高级别到低级别>80',
  `c_exp2` varchar(50) DEFAULT NULL COMMENT '阀值表达式',
  `c_exp3` varchar(50) DEFAULT NULL COMMENT '阀值表达式',
  `c_exp_desc1` varchar(500) DEFAULT NULL COMMENT '表达式描述',
  `c_exp_desc2` varchar(500) DEFAULT NULL COMMENT '表达式描述',
  `c_exp_desc3` varchar(500) DEFAULT NULL COMMENT '表达式描述',
  `c_tag1` varchar(50) DEFAULT NULL COMMENT '冗余字段1',
  `c_tag2` varchar(50) DEFAULT NULL COMMENT '冗余字段2',
  PRIMARY KEY (`c_id`,`c_policy_id`),
  KEY `idx_moni_policy_thshd` (`c_policy_id`)
) ENGINE=InnoDB DEFAULT CHARSET=gbk COMMENT='时间段阈值设置';

/*Table structure for table `t_moni_res_type` */

DROP TABLE IF EXISTS `t_moni_res_type`;

CREATE TABLE `t_moni_res_type` (
  `c_id` varchar(100) NOT NULL COMMENT '资源类型ID',
  `c_parent_id` varchar(100) DEFAULT NULL COMMENT '父类型id，体现继承关系，base-host-win',
  `c_name` varchar(100) NOT NULL COMMENT '类型名称',
  `c_is_main` tinyint(4) DEFAULT NULL COMMENT '主资源还是子资源',
  `c_tree_level` smallint(6) DEFAULT NULL COMMENT '层数,root为0级，host为1级 ，aix为2级',
  `c_tree_node_id` varchar(36) DEFAULT NULL COMMENT 'tree节点ID，如：base为00；host为00.01，AIX就是00.01.01 ',
  `c_res_catalog` varchar(16) DEFAULT NULL COMMENT '资源一级分类，如主机、网络设备',
  `c_icon` varchar(500) DEFAULT NULL COMMENT '图标',
  `c_vendor_id` varchar(36) DEFAULT NULL COMMENT '厂商ID, 仅叶子节点有厂商ID',
  `c_sort_id` int(11) DEFAULT NULL COMMENT '排序列， 用于类型树的显示顺序',
  `c_is_custom` tinyint(4) DEFAULT '1' COMMENT '是否自定义',
  `c_tag1` varchar(50) DEFAULT NULL COMMENT '冗余字段1',
  `c_tag2` varchar(50) DEFAULT NULL COMMENT '冗余字段2',
  `c_tag3` varchar(50) DEFAULT NULL COMMENT '冗余字段3',
  `c_tag4` varchar(50) DEFAULT NULL COMMENT '冗余字段4',
  PRIMARY KEY (`c_id`),
  KEY `idx_moni_type_node` (`c_tree_node_id`),
  KEY `idx_moni_type_lev` (`c_tree_level`,`c_is_main`),
  KEY `idx_moni_type_sort` (`c_sort_id`)
) ENGINE=InnoDB DEFAULT CHARSET=gbk COMMENT='资源类型表';

/*Table structure for table `t_moni_vendor` */

DROP TABLE IF EXISTS `t_moni_vendor`;

CREATE TABLE `t_moni_vendor` (
  `c_id` varchar(36) NOT NULL COMMENT '厂商ID',
  `c_name` varchar(100) NOT NULL COMMENT '厂商名称',
  `c_vendor_icon` varchar(500) DEFAULT NULL COMMENT '厂商ICON',
  `c_sort_id` smallint(6) DEFAULT NULL COMMENT '排序号',
  `c_tag1` varchar(50) DEFAULT NULL COMMENT '冗余字段1',
  `c_tag2` varchar(50) DEFAULT NULL COMMENT '冗余字段2',
  `c_tag3` varchar(50) DEFAULT NULL COMMENT '冗余字段3',
  `c_tag4` varchar(50) DEFAULT NULL COMMENT '冗余字段4',
  PRIMARY KEY (`c_id`),
  KEY `idx_vendor_sort` (`c_sort_id`)
) ENGINE=InnoDB DEFAULT CHARSET=gbk COMMENT='厂商表';

/*Table structure for table `t_resmodel_vendor` */

DROP TABLE IF EXISTS `t_resmodel_vendor`;

CREATE TABLE `t_resmodel_vendor` (
  `C_ID` varchar(108) DEFAULT NULL,
  `C_VENDOR_ID` varchar(108) DEFAULT NULL,
  `C_VENDOR_NAME` varchar(300) DEFAULT NULL,
  `C_VENDOR_OID` varchar(150) DEFAULT NULL,
  `C_DEV_TYPE` varchar(150) DEFAULT NULL,
  `C_MODEL_TYPE` varchar(300) DEFAULT NULL,
  `C_SERIES` varchar(300) DEFAULT NULL,
  `C_MODEL_NUMBER` varchar(300) DEFAULT NULL,
  `C_VENDOR_ICON` varchar(1500) DEFAULT NULL,
  `C_MODEL_ICON` varchar(300) DEFAULT NULL,
  `C_TAG1` varchar(150) DEFAULT NULL,
  `C_TAG2` varchar(150) DEFAULT NULL,
  `C_TAG3` varchar(150) DEFAULT NULL,
  `C_TAG4` varchar(150) DEFAULT NULL,
  `c_sort_id` smallint(6) DEFAULT NULL,
  `C_DEV_NAME` varchar(150) DEFAULT NULL,
  `C_OPERATOR` varchar(150) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Table structure for table `t_vendor_model` */

DROP TABLE IF EXISTS `t_vendor_model`;

CREATE TABLE `t_vendor_model` (
  `C_ID` varchar(36) NOT NULL COMMENT '厂商型号ID',
  `C_VENDOR_ID` varchar(36) DEFAULT NULL COMMENT '厂商ID',
  `C_VENDOR_NAME` varchar(100) NOT NULL COMMENT '厂商名称',
  `C_SERIES` varchar(100) DEFAULT NULL COMMENT '系列',
  `C_MODEL_NUMBER` varchar(100) DEFAULT NULL COMMENT '设备型号',
  `C_VENDOR_ICON` varchar(500) DEFAULT NULL COMMENT '厂商ICON',
  `C_MODEL_ICON` varchar(100) DEFAULT NULL COMMENT '设备型号图标',
  `C_TAG1` varchar(50) DEFAULT NULL,
  `C_TAG2` varchar(50) DEFAULT NULL,
  `C_TAG3` varchar(50) DEFAULT NULL,
  `C_TAG4` varchar(50) DEFAULT NULL,
  `c_sort_id` smallint(6) DEFAULT NULL COMMENT '排序号',
  PRIMARY KEY (`C_ID`),
  KEY `idx_vendor_id` (`C_VENDOR_ID`),
  KEY `idx_vendor_model_sort` (`c_sort_id`)
) ENGINE=InnoDB DEFAULT CHARSET=gbk COMMENT='厂商型号表';
