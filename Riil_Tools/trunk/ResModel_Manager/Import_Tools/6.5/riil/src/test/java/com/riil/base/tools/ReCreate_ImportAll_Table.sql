DROP TABLE IF EXISTS t_moni_event_base CASCADE;
DROP TABLE IF EXISTS t_moni_metric_base CASCADE;
DROP TABLE IF EXISTS t_moni_model_base CASCADE;
DROP TABLE IF EXISTS t_moni_model_metric_rel CASCADE;
DROP TABLE IF EXISTS t_moni_model_sysoid CASCADE;
DROP TABLE IF EXISTS t_moni_temp_base CASCADE;
DROP TABLE IF EXISTS t_vendor_model CASCADE;
DROP TABLE IF EXISTS t_moni_policy_event CASCADE;
DROP TABLE IF EXISTS t_moni_policy_event_rule CASCADE;
DROP TABLE IF EXISTS t_moni_policy_info CASCADE;
DROP TABLE IF EXISTS t_moni_policy_res_rel CASCADE;
DROP TABLE IF EXISTS t_moni_policy_script_metric CASCADE;
DROP TABLE IF EXISTS t_moni_policy_script_res CASCADE;
DROP TABLE IF EXISTS t_moni_policy_action CASCADE;
DROP TABLE IF EXISTS t_moni_policy_metric CASCADE;
DROP TABLE IF EXISTS t_moni_policy_threshold CASCADE;
DROP TABLE IF EXISTS t_moni_policy_res_avail_rule CASCADE;
DROP TABLE IF EXISTS t_dict_coll_frequency CASCADE;
DROP TABLE IF EXISTS t_res_moni_user_config CASCADE;



CREATE TABLE t_moni_event_base
(
	c_id VARCHAR(36) NOT NULL,
	c_moni_temp_id VARCHAR(100) NOT NULL COMMENT '监控模板ID',
	c_event_id VARCHAR(36) NOT NULL COMMENT '事件ID',
	c_name VARCHAR(50) NOT NULL COMMENT '事件名称',
	c_name_display VARCHAR(50) COMMENT '事件显示名称，包括{METRIC_NAME}变量，如主机CPU超过严重阈值',
	c_name_en VARCHAR(100),
	c_type VARCHAR(50) COMMENT '事件类型，可用性事件、性能事件、配置事件',
	c_desc VARCHAR(100) COMMENT '事件描述',
	c_desc_en VARCHAR(100) COMMENT '英文描述',
	c_exp_id TINYINT COMMENT '表达式序号',
	c_tag1 VARCHAR(50) COMMENT '冗余字段1',
	c_tag2 VARCHAR(50) COMMENT '冗余字段2',
	c_tag3 VARCHAR(50) COMMENT '冗余字段3',
	c_tag4 VARCHAR(500) COMMENT '冗余字段4(存模型的processor)',
	PRIMARY KEY (c_id),
	UNIQUE UQ_temp_event(c_event_id, c_moni_temp_id),
	INDEX idx_temp_id (c_moni_temp_id ASC)
)  ENGINE=INNODB DEFAULT CHARSET=utf8 COMMENT='事件基础表';


CREATE TABLE t_moni_metric_base
(
	c_id VARCHAR(36) NOT NULL,
	c_moni_temp_id VARCHAR(100) NOT NULL COMMENT '监控模板ID',
	c_metric_group_id VARCHAR(36) NOT NULL COMMENT '指标组ID',
	c_metric_group_name VARCHAR(50) COMMENT '指标组名称',
	c_metric_id VARCHAR(36) NOT NULL COMMENT '指标ID',
	c_name VARCHAR(100) COMMENT '指标名称',
	c_name_en VARCHAR(100),
	c_metric_type VARCHAR(50) COMMENT '指标类型,性能指标、配置指标、可用性指标',
	c_data_type VARCHAR(10) COMMENT '数据类型',
	c_unit VARCHAR(50) COMMENT '指标单位',
	c_desc VARCHAR(500) COMMENT '指标描述',
	c_desc_en VARCHAR(500) COMMENT '英文描述',
	c_must_monitor TINYINT COMMENT '是否必须监控 1、-1',
	c_is_important TINYINT COMMENT '重要指标',
	c_is_display TINYINT COMMENT '是否显示',
	c_is_default_monitor TINYINT COMMENT '是否默认监控',
	c_tag1 VARCHAR(50) COMMENT '冗余字段1',
	c_tag2 VARCHAR(50) COMMENT '冗余字段2',
	c_sort_id INTEGER COMMENT '排序号',
	PRIMARY KEY (c_id),
	UNIQUE UQ_moni_metric_base(c_moni_temp_id, c_metric_id),
	INDEX idx_temp_id (c_moni_temp_id ASC)
)  ENGINE=INNODB DEFAULT CHARSET=utf8 COMMENT='指标基础表';


CREATE TABLE t_moni_model_base
(
	c_id VARCHAR(100) NOT NULL COMMENT '模型ID',
	c_name VARCHAR(100) COMMENT '事件名称',
	c_name_en VARCHAR(100),
	c_plugin_ids VARCHAR(1000) COMMENT '插件IDs',
	c_moni_temp_id VARCHAR(100) COMMENT '监控模板ID',
	c_tree_node_id VARCHAR(36) COMMENT '模板的tree节点',
	c_is_snmp TINYINT COMMENT '是否纯snmp模型',
	C_VENDOR_ID VARCHAR(36) COMMENT '厂商ID',
	C_VENDOR_NAME VARCHAR(100) COMMENT '厂商名称',
	C_PATH VARCHAR(2000) COMMENT '监控模型文件路径 ',
	c_sub_models VARCHAR(500) COMMENT '子资源监控模型id列表，逗号分隔,cpu,mem.disk',
	c_desc VARCHAR(500) COMMENT '模型描述',
	c_is_main TINYINT COMMENT '主资源还是子资源',
	c_desc_en VARCHAR(500) COMMENT '英文描述',
	c_precondition VARCHAR(4000) COMMENT '前提条件，发现或采集前提条件。包括<br>换行',
	c_precondition_en VARCHAR(4000) COMMENT '前提条件，发现或采集前提条件。包括<br>换行',
	c_connect_info_desc VARCHAR(4000) COMMENT '连接信息填写说明',
	c_connect_info_desc_en VARCHAR(4000) COMMENT '连接信息填写说明',
	c_tag1 VARCHAR(50) COMMENT '冗余字段1',
	c_tag2 VARCHAR(50) COMMENT '冗余字段2',
	c_tag3 VARCHAR(50) COMMENT '冗余字段3',
	c_tag4 VARCHAR(50) COMMENT '冗余字段4',
	PRIMARY KEY (c_id),
	INDEX idx_temp_id (c_moni_temp_id ASC)
)  ENGINE=INNODB DEFAULT CHARSET=utf8 COMMENT='监控模型基础信息';


CREATE TABLE t_moni_model_metric_rel
(
	c_model_id VARCHAR(100) NOT NULL COMMENT '监控模型ID',
	c_moni_temp_id VARCHAR(100) NOT NULL COMMENT '监控模板ID',
	c_metric_id VARCHAR(36) NOT NULL COMMENT '指标ID',
	UNIQUE UQ_model_metric_rel(c_moni_temp_id, c_model_id, c_metric_id),
	INDEX idx_temp_id (c_moni_temp_id ASC, c_metric_id ASC)
)  ENGINE=INNODB DEFAULT CHARSET=utf8 COMMENT='模型指标关联关系表';


CREATE TABLE t_moni_model_sysoid
(
	C_MODEL_ID VARCHAR(100) NOT NULL COMMENT '监控模型ID',
	C_SYS_OID VARCHAR(255) NOT NULL COMMENT 'SYS OID值',
	C_MONI_TEMP_ID VARCHAR(100) NOT NULL COMMENT '监控模板ID',
	C_VENDOR_MODEL_ID VARCHAR(36) COMMENT '厂商型号ID',
	c_os_type VARCHAR(50) COMMENT '操作系统类型',
	c_dev_type VARCHAR(20) COMMENT '设备类型',
	PRIMARY KEY (C_MODEL_ID, C_SYS_OID),
	INDEX idx_temp_id (C_MONI_TEMP_ID ASC),
	INDEX idx_sysoid (C_SYS_OID ASC)
)  ENGINE=INNODB DEFAULT CHARSET=utf8 COMMENT='模型厂商型号sysoid关系表';


CREATE TABLE t_moni_temp_base
(
	c_id VARCHAR(100) NOT NULL COMMENT '监控模板ID',
	c_parent_id VARCHAR(100) COMMENT '父模板id，体现继承关系，base--host--win',
	c_name VARCHAR(100) NOT NULL COMMENT '模板名称',
	c_name_en VARCHAR(100),
	c_tree_level SMALLINT COMMENT '层数,root为0级，host为1级 ，aix为2级',
	c_tree_node_id VARCHAR(36) COMMENT 'tree节点ID，如：base为00；host为00.01，AIX就是00.01.01 如果是此模板为子资源模板，此列为空',
	c_is_main TINYINT COMMENT '主资源还是子资源',
	c_desc VARCHAR(100) COMMENT '模板描述',
	c_desc_en VARCHAR(100) COMMENT '英文描述',
	c_version VARCHAR(50) COMMENT '版本',
	c_sort_id INTEGER,
	c_icon VARCHAR(500),
	c_sub_ress VARCHAR(500) COMMENT '子资源id列表，逗号分隔',
	c_is_display TINYINT COMMENT '是否显示',
	c_is_important TINYINT COMMENT '子模板是否重要，重要的子模板，建立策略时，默认选中',
	c_is_discovery TINYINT COMMENT '是否可发现资源类型',
	c_is_custom TINYINT DEFAULT -1 COMMENT '是否用户自定义1=自定义；-1系统预置',
	c_has_avail_metric TINYINT DEFAULT -1 COMMENT '是否有可用性指标',
	c_res_catalog VARCHAR(16) COMMENT '资源一级分类，如主机、网络设备',
	c_tag1 VARCHAR(50) COMMENT '冗余字段1',
	c_tag2 VARCHAR(50) COMMENT '冗余字段2',
	c_tag3 VARCHAR(50) COMMENT '冗余字段3',
	c_tag4 VARCHAR(50) COMMENT '冗余字段4',
	PRIMARY KEY (c_id)
)  ENGINE=INNODB DEFAULT CHARSET=utf8 COMMENT='监控模板基础表';


CREATE TABLE t_vendor_model
(
	C_ID VARCHAR(36) NOT NULL COMMENT '厂商型号ID',
	C_VENDOR_ID VARCHAR(36) COMMENT '厂商ID',
	C_VENDOR_NAME VARCHAR(100) NOT NULL COMMENT '厂商名称',
	C_SERIES VARCHAR(100) COMMENT '系列',
	C_MODEL_NUMBER VARCHAR(100) COMMENT '设备型号',
	C_VENDOR_ICON VARCHAR(500) COMMENT '厂商ICON',
	C_MODEL_ICON VARCHAR(100) COMMENT '设备型号图标',
	C_TAG1 VARCHAR(50),
	C_TAG2 VARCHAR(50),
	C_TAG3 VARCHAR(50),
	C_TAG4 VARCHAR(50),
	c_sort_id SMALLINT,
	PRIMARY KEY (C_ID),
	INDEX idx_vendor_id (C_VENDOR_ID ASC)
)  ENGINE=INNODB DEFAULT CHARSET=utf8 COMMENT='厂商型号表';


CREATE TABLE t_moni_policy_event
(
	c_id VARCHAR(36) NOT NULL,
	c_company_id VARCHAR(36),
	c_name VARCHAR(50) NOT NULL COMMENT '事件名称,脚本日志trap时存储',
	c_policy_id VARCHAR(100) NOT NULL COMMENT '策略ID',
	c_event_id VARCHAR(50) NOT NULL COMMENT '事件ID',
	c_level VARCHAR(50) COMMENT '事件级别',
	c_in_use TINYINT COMMENT '是否启用',
	c_name_en VARCHAR(100) COMMENT '事件英文名称，脚本日志trap时存储',
	c_type VARCHAR(50) COMMENT '事件类型',
	c_match_type VARCHAR(20) COMMENT '关联类型，抖动或关联',
	c_desc VARCHAR(100) COMMENT '事件描述',
	c_desc_en VARCHAR(100) COMMENT '英文描述',
	c_tag1 VARCHAR(50) COMMENT '冗余字段1',
	c_tag2 VARCHAR(50) COMMENT '冗余字段2',
	PRIMARY KEY (c_id),
	UNIQUE UQ_policy_event(c_policy_id, c_event_id)
)  ENGINE=INNODB DEFAULT CHARSET=utf8 COMMENT='策略事件配置';


CREATE TABLE t_moni_policy_event_rule
(
	c_id VARCHAR(36) NOT NULL,
	c_company_id VARCHAR(36),
	c_policy_id VARCHAR(100) NOT NULL COMMENT '策略ID',
	c_event_id VARCHAR(50) NOT NULL COMMENT '事件ID',
	c_events VARCHAR(1000) COMMENT '事件列表',
	c_win_event_id VARCHAR(50) COMMENT 'windows事件ID',
	c_log_level VARCHAR(100) COMMENT '多个级别逗号分隔',
	c_source VARCHAR(100) COMMENT '来源',
	c_key_exp VARCHAR(500) COMMENT '关键字与或表达式,CPURate,>,80',
	c_gen_rule_type VARCHAR(20) COMMENT '产生规则，连续产生、仅产生一次',
	c_exp_desc VARCHAR(200) COMMENT '表达式描述，给用户看的，如内存利用率,大于,80',
	c_exp_desc_en VARCHAR(200) COMMENT '表达式描述，给用户看的，如内存利用率大于80',
	c_time SMALLINT COMMENT '计时，单位分钟',
	c_counts SMALLINT COMMENT '计数',
	c_trap_type VARCHAR(20) COMMENT 'trap分类',
	c_trap_group VARCHAR(20) COMMENT 'trap分组',
	c_trap_enterprise VARCHAR(200) COMMENT '企业id，snmpv2就是trapoid',
	c_trap_general VARCHAR(200) COMMENT '通用陷阱号',
	c_trap_special VARCHAR(200) COMMENT '计时分钟',
	c_trap_template VARCHAR(4000) COMMENT 'trap模板定义，包括宏变量',
	c_trap_template_en VARCHAR(4000) COMMENT 'trap外文模板',
	c_in_use TINYINT COMMENT '是否启用',
	c_tag1 VARCHAR(50) COMMENT '冗余字段1',
	c_tag2 VARCHAR(50) COMMENT '冗余字段2',
	PRIMARY KEY (c_id)
)  ENGINE=INNODB DEFAULT CHARSET=utf8 COMMENT='事件规则';


CREATE TABLE t_moni_policy_info
(
	c_id VARCHAR(100) NOT NULL COMMENT '监控策略ID',
	c_policy_type VARCHAR(20) COMMENT '策略类型：MONITOR、LOG.SYSLOG、LOG.WINDOWS、LOG.COMMONLOG、SCRIPT.ACTION、SCRIPT.TIMER、SCRIPT.ADV、TRAP、ROOM',
	c_company_id VARCHAR(36),
	c_model_id VARCHAR(100) COMMENT '监控模型ID',
	c_model_name VARCHAR(100) COMMENT '监控模型名称',
	c_moni_temp_id VARCHAR(100) COMMENT '监控模板ID',
	c_moni_temp_name VARCHAR(100) COMMENT '监控模板名称',
	c_tree_node_id VARCHAR(36) COMMENT 'tree节点ID，如：base为00；host为00.01，AIX就是00.01.01 如果是此模板为子资源模板，此列为空',
	c_name VARCHAR(100),
	c_name_en VARCHAR(100),
	c_is_main TINYINT COMMENT '主策略还是子策略',
	c_main_policy_id VARCHAR(100) COMMENT '主策略ID',
	c_create_user VARCHAR(50) COMMENT '创建用户',
	c_update_user VARCHAR(50) COMMENT '修改用户',
	c_publish_user VARCHAR(50) COMMENT '发布用户',
	c_create_time DATETIME,
	c_desc VARCHAR(500),
	c_update_time DATETIME,
	c_publish_time DATETIME COMMENT '发布时间',
	c_user_domain_id VARCHAR(50),
	c_is_default TINYINT DEFAULT -1 COMMENT '是否默认策略',
	c_is_new_version TINYINT COMMENT '是否最新版本',
	c_is_factory TINYINT COMMENT '是否出厂配置',
	c_in_use TINYINT COMMENT '是否启用',
	c_sub_policys VARCHAR(500) COMMENT '子策略列表，逗号分隔',
	c_is_publish TINYINT COMMENT '是否发布标识',
	c_separator_col VARCHAR(10) COMMENT '列分隔符',
	c_separator_row VARCHAR(10) COMMENT '行分隔符',
	c_frequency VARCHAR(4000) COMMENT '执行频率，脚本策略执行频率表达式：大类型；小类型；开始时间；结束时间；间隔。大类型：执行一次、周期性执行一次、周期性执行多次。小类型：每周、每天。间隔：每一周、每一天',
	c_original_policy_id VARCHAR(100) COMMENT '原策略ID',
	c_is_custom TINYINT DEFAULT -1 COMMENT '是否用户自定义1=自定义；-1系统预置',
	c_tag1 VARCHAR(50) COMMENT '冗余字段1',
	c_tag2 VARCHAR(50) COMMENT '冗余字段2',
	c_tag3 VARCHAR(50) COMMENT '冗余字段3',
	c_tag4 VARCHAR(50) COMMENT '冗余字段4',
	c_event_ids VARCHAR(4000) COMMENT 'action脚本触发事件列表',
	c_file_name VARCHAR(500) COMMENT '文件名称',
	c_args VARCHAR(200) COMMENT '脚本参数',
	c_port VARCHAR(20) COMMENT '采集协议对应的端口',
	c_plugin_id VARCHAR(36) COMMENT '采集协议插件，通用日志WMI、TELNET、SSH等，界面是执行方式',
	c_bandwidth_type varchar(20)  COMMENT '带宽类型:10M,100M,1000M,10G' ,
	PRIMARY KEY (c_id)
)  ENGINE=INNODB DEFAULT CHARSET=utf8 COMMENT='策略表';


CREATE TABLE t_moni_policy_res_rel
(
	c_id VARCHAR(36) NOT NULL,
	c_policy_id VARCHAR(100) NOT NULL COMMENT '策略ID',
	c_inst_id VARCHAR(36) NOT NULL COMMENT '实例ID,实例表的c_id',
	c_sub_inst_id VARCHAR(36) COMMENT '子实例ID,子实例表的c_id',
	c_is_main TINYINT COMMENT '主策略还是子策略',
	c_tag1 VARCHAR(50) COMMENT '冗余字段1',
	PRIMARY KEY (c_id, c_policy_id),
	UNIQUE UQ_policy_res_rel(c_policy_id, c_inst_id, c_sub_inst_id)
)  ENGINE=INNODB DEFAULT CHARSET=utf8 COMMENT='策略资源关联表';


CREATE TABLE t_moni_policy_script_metric
(
	c_id VARCHAR(36) NOT NULL,
	c_company_id VARCHAR(36),
	c_policy_id VARCHAR(100) NOT NULL COMMENT '策略ID',
	c_metric_id VARCHAR(50) NOT NULL COMMENT '指标ID',
	c_metric_name VARCHAR(100) COMMENT '指标名称',
	c_metric_name_en VARCHAR(100) COMMENT '指标英文名称',
	c_data_type VARCHAR(20) COMMENT '指标数据类型',
	c_column_id SMALLINT COMMENT '列号',
	c_row_id SMALLINT COMMENT '行号',
	PRIMARY KEY (c_id, c_policy_id),
	UNIQUE UQ_policy_script_metric(c_policy_id, c_metric_id, c_company_id)
)  ENGINE=INNODB DEFAULT CHARSET=utf8 COMMENT='脚本指标定义';


CREATE TABLE t_moni_policy_script_res
(
	c_id VARCHAR(36) NOT NULL,
	c_company_id VARCHAR(36),
	c_policy_id VARCHAR(100) NOT NULL COMMENT '策略ID',
	c_ip VARCHAR(80) NOT NULL,
	c_ip_number VARCHAR(40) COMMENT 'ip地址的数值表示',
	c_ip_v6 VARCHAR(80) COMMENT 'ipv6地址',
	c_ip_number_v6 VARCHAR(40) COMMENT 'ip地址的数值表示',
	c_name VARCHAR(100),
	c_user_name VARCHAR(100) NOT NULL,
	c_password VARCHAR(100),
	c_server_id VARCHAR(36) COMMENT 'server部件编号',
	c_file_path VARCHAR(500) COMMENT '文件路径',
	c_plugin_id VARCHAR(36) COMMENT '采集协议插件，通用日志WMI、TELNET、SSH等',
	c_port VARCHAR(10) COMMENT '采集协议对应的端口',
	c_tag1 VARCHAR(50) COMMENT '冗余字段1',
	c_tag2 VARCHAR(50) COMMENT '冗余字段2',
	c_tag3 VARCHAR(50) COMMENT '冗余字段3',
	c_tag4 VARCHAR(50) COMMENT '冗余字段4',
	PRIMARY KEY (c_id, c_policy_id)
)  ENGINE=INNODB DEFAULT CHARSET=utf8 COMMENT='脚本资源';


CREATE TABLE t_moni_policy_action
(
	c_id VARCHAR(36) NOT NULL,
	c_company_id VARCHAR(36),
	c_policy_id VARCHAR(100) NOT NULL COMMENT '策略ID',
	c_action_name VARCHAR(30) COMMENT '脚本名称',
	c_plugin_id VARCHAR(36) COMMENT '采集协议插件，通用日志WMI、TELNET、SSH等，界面是执行方式',
	c_file VARCHAR(500) COMMENT '日志或脚本路径及名称',
	c_args VARCHAR(200) COMMENT '脚本参数',
	c_event_ids VARCHAR(4000) COMMENT 'action脚本触发事件列表',
	c_in_use TINYINT COMMENT '是否启用',
	c_desc VARCHAR(50),
	c_tag1 VARCHAR(50) COMMENT '冗余字段1',
	c_tag2 VARCHAR(50) COMMENT '冗余字段2',
	PRIMARY KEY (c_id, c_policy_id)
)  ENGINE=INNODB DEFAULT CHARSET=utf8 COMMENT='action定义';


CREATE TABLE t_moni_policy_metric
(
	c_id VARCHAR(36) NOT NULL,
	c_company_id VARCHAR(36),
	c_policy_id VARCHAR(100) NOT NULL COMMENT '策略ID',
	c_metric_id VARCHAR(50) NOT NULL COMMENT '指标ID',
	c_name VARCHAR(100),
	c_frequency_id VARCHAR(20) COMMENT '采集频度ID',
	c_in_use TINYINT COMMENT '是否启用',
	c_tag1 VARCHAR(50) COMMENT '冗余字段1',
	c_tag2 VARCHAR(50) COMMENT '冗余字段2',
	c_count SMALLINT COMMENT '连续次数',
	c_retry_times  smallint NULL COMMENT '重试次数',
	c_time_out  INT NULL COMMENT '超时时间,秒',
	PRIMARY KEY (c_id, c_policy_id),
	UNIQUE UQ_moni_policy_metric(c_policy_id, c_metric_id, c_company_id)
)  ENGINE=INNODB DEFAULT CHARSET=utf8 COMMENT='监控策略指标配置表';


CREATE TABLE t_moni_policy_threshold
(
	c_id VARCHAR(36) NOT NULL,
	c_policy_id VARCHAR(100) NOT NULL COMMENT '策略ID',
	c_metric_id VARCHAR(50) NOT NULL COMMENT '指标ID',
	c_day_or_week VARCHAR(20) COMMENT '每天还是每周',
	c_weeks VARCHAR(20) COMMENT '周几列表，1,3,5',
	c_start_time VARCHAR(20) COMMENT '开始时间',
	c_end_time VARCHAR(20) COMMENT '结束时间',
	c_exp1 VARCHAR(50) COMMENT '阀值表达式，1、2、3从高级别到低级别>80',
	c_exp2 VARCHAR(50) COMMENT '阀值表达式',
	c_exp3 VARCHAR(50) COMMENT '阀值表达式',
	c_exp_desc1 VARCHAR(500) COMMENT '表达式描述',
	c_exp_desc2 VARCHAR(500) COMMENT '表达式描述',
	c_exp_desc3 VARCHAR(500) COMMENT '表达式描述',
	c_tag1 VARCHAR(50) COMMENT '冗余字段1',
	c_tag2 VARCHAR(50) COMMENT '冗余字段2',
	PRIMARY KEY (c_id, c_policy_id)
)  ENGINE=INNODB DEFAULT CHARSET=utf8 COMMENT='时间段阈值设置';

-- 用来保存用户定义的规则
CREATE TABLE t_moni_policy_res_avail_rule
(
	c_id VARCHAR(36) NOT NULL,
	c_policy_id VARCHAR(100) NOT NULL COMMENT '策略ID',
	c_frequency_id VARCHAR(100) NOT NULL COMMENT '采集频度',
	c_xml VARCHAR(4000) COMMENT 'XML1',
	c_xml2 VARCHAR(4000) COMMENT 'XML2',
	c_xml3 VARCHAR(4000) COMMENT 'XML3',
	c_count  SMALLINT   COMMENT '抖动次数', 
	PRIMARY KEY (c_id)
)  ENGINE=INNODB DEFAULT CHARSET=utf8 COMMENT='资源可用状态定义';

CREATE TABLE t_dict_coll_frequency
(
	c_id VARCHAR(36) NOT NULL,
	c_metric_type VARCHAR(50) COMMENT '指标类型',
	c_name VARCHAR(100) NOT NULL COMMENT '频度名称',
	c_name_en VARCHAR(100),
	c_frequency INTEGER COMMENT '采集频度',
	c_frequency_unit VARCHAR(50) COMMENT '频度单位，SECOND、MINUTE、HOUR、DAY',
	c_sort_id SMALLINT,
	c_desc VARCHAR(100),
	c_type TINYINT COMMENT '频度类型，0使用周期，1使用计划（日期），2使用计划（星期），周期采集为默认。',
	c_month VARCHAR(50),
	c_week VARCHAR(20) COMMENT '周几列表，1,3,5',
	c_day VARCHAR(100),
	c_hour VARCHAR(100),
	c_minute VARCHAR(20),
	PRIMARY KEY (c_id)
)  ENGINE=INNODB DEFAULT CHARSET=utf8 COMMENT='采集频度字典表';

CREATE TABLE t_res_moni_user_config
(
	c_id VARCHAR(36) NOT NULL,
	c_user_id VARCHAR(36) COMMENT '用户ID',
	c_res_id VARCHAR(150) COMMENT '资源ID+_policy_+策略ID',
	c_model_id VARCHAR(100) COMMENT '模型ID，用于黙认置参照该模型',
	c_config TEXT COMMENT '用户资源配置portlet信息xml串',
	c_left_portlet_ids VARCHAR(255) COMMENT '左列portletID串，逗号分隔',
	c_right_portlet_ids VARCHAR(255) COMMENT '右列portletID串，逗号分隔',
	c_type VARCHAR(50) COMMENT '配置类型',
	PRIMARY KEY (c_id)
)  COMMENT='资源与用户设置显示Portalet表';