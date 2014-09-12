DROP TABLE IF EXISTS t_moni_policy_res_avail_rule_group CASCADE;


CREATE TABLE t_moni_policy_res_avail_rule_group
(
	c_id VARCHAR(36) NOT NULL,
	c_policy_id VARCHAR(100) NOT NULL COMMENT '策略ID',
	c_frequency_id VARCHAR(100) NOT NULL COMMENT '采集频度',
	c_xml VARCHAR(4000) COMMENT 'XML1',
	c_xml2 VARCHAR(4000) COMMENT 'XML2',
	c_xml3 VARCHAR(4000) COMMENT 'XML3',
	PRIMARY KEY (c_id)
)  ENGINE=INNODB DEFAULT CHARSET=utf8 COMMENT='资源可用状态定义';