@echo off 

set run_path=%~dp0
set url=%~1
set dbUser=%~2
set dbPass=%~3
set dbUrl=%~4


set ROOT_PATH=.
java "-cp" "%ROOT_PATH%/lib/bcprov-ext-jdk16-1.46.jar;%ROOT_PATH%/lib/jgroups-3.0.0.Final.jar;%ROOT_PATH%/lib/commons-compress-1.0.jar;%ROOT_PATH%/lib/commons-dbcp-1.4.jar;%ROOT_PATH%/lib/commons-email-1.2.jar;%ROOT_PATH%/lib/commons-io-2.4.jar;%ROOT_PATH%/lib/commons-jexl-2.0.1.jar;%ROOT_PATH%/lib/commons-lang-2.6.jar;%ROOT_PATH%/lib/commons-logging-1.1.3.jar;%ROOT_PATH%/lib/commons-pool-1.6.jar;%ROOT_PATH%/lib/dom4j-1.6.1.jar;%ROOT_PATH%/lib/log4j-1.2.16.jar;%ROOT_PATH%/lib/mybatis-3.1.1.jar;%ROOT_PATH%/lib/mybatis-spring-1.1.1.jar;%ROOT_PATH%/lib/mysql-connector-java-5.1.22.jar;%ROOT_PATH%/lib/riil-basepojo-6.6.0-SNAPSHOT.jar;%ROOT_PATH%/lib/riil-core-6.6.0-SNAPSHOT.jar;%ROOT_PATH%/lib/spring-aop-3.2.8.RELEASE.jar;%ROOT_PATH%/lib/spring-asm-3.0.5.RELEASE.jar;%ROOT_PATH%/lib/spring-beans-3.2.8.RELEASE.jar;%ROOT_PATH%/lib/spring-context-3.2.8.RELEASE.jar;%ROOT_PATH%/lib/spring-context-support-3.0.5.RELEASE.jar;%ROOT_PATH%/lib/spring-core-3.2.8.RELEASE.jar;%ROOT_PATH%/lib/spring-dao-2.0.8.jar;%ROOT_PATH%/lib/spring-expression-3.2.8.RELEASE.jar;%ROOT_PATH%/lib/spring-ibatis-2.0.8.jar;%ROOT_PATH%/lib/spring-jdbc-3.2.8.RELEASE.jar;%ROOT_PATH%/lib/spring-orm-3.0.5.RELEASE.jar;%ROOT_PATH%/lib/spring-oxm-3.0.5.RELEASE.jar;%ROOT_PATH%/lib/spring-test-3.2.8.RELEASE.jar;%ROOT_PATH%/lib/spring-web-3.0.5.RELEASE.jar;%ROOT_PATH%/lib/spring-webmvc-3.0.5.RELEASE.jar;%ROOT_PATH%/lib/spring-webmvc-portlet-3.0.5.RELEASE.jar;%ROOT_PATH%/lib/velocity-1.7.jar;%ROOT_PATH%/lib/xstream-1.4.2.jar;%ROOT_PATH%/lib/spring-tx-3.0.5.RELEASE.jar;%ROOT_PATH%/exportTest.jar;" "-Xms64m" "-Xmx256m" "com.riil.resmodel.Main" "%url%" "%dbUser%" "%dbPass%" "%dbUrl%"
