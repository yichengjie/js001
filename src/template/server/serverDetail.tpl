<%
	if(configInfo.serverCategory==3){
%>
	<div class = "row detailDivHight">
	   <div class = "col-sm-3 textRight">所属分组&nbsp;:</div>
	   <div class = "col-sm-3"><%=configInfo.groupNameShowUser%></div>
	</div>
	
	<div class = "row detailDivHight">
	   <div class = "col-sm-3 textRight">服务器名称&nbsp;:</div>
	   <div class = "col-sm-3"><%=configInfo.serverName%></div>
	</div>
	<div class = "row detailDivHight">
	   <div class = "col-sm-3 textRight">服务器类型&nbsp;:</div>
	   <div class = "col-sm-3">上下文服务器</div>
	</div>
	
	<div class = "row detailDivHight">
	   <div class = "col-sm-3 textRight">服务器IP&nbsp;:</div>
	   <div class = "col-sm-3"><%=configInfo.serverIpShowUser%></div>
	</div>
	
<%		
	}else if (configInfo.serverCategory==4){
%>
	<div class = "row detailDivHight">
	   <div class = "col-sm-3 textRight">服务库组名&nbsp;:</div>
	   <div class = "col-sm-3"><%=configInfo.groupNameShowUser%></div>
	</div>
	<div class = "row detailDivHight">
	   <div class = "col-sm-3 textRight">服务库名&nbsp;:</div>
	   <div class = "col-sm-3"><%=configInfo.serverName%></div>
	</div>
	
	<div class = "row detailDivHight">
	   <div class = "col-sm-3 textRight">服务库类型&nbsp;:</div>
	   <div class = "col-sm-3">服务库</div>
	</div>
	
	<div class = "row detailDivHight">
	   <div class = "col-sm-3 textRight">服务库IP&nbsp;:</div>
	   <div class = "col-sm-3"><%=configInfo.rmiRegistryHost%></div>
	</div>
	
	<div class = "row detailDivHight">
	   <div class = "col-sm-3 textRight">JMX Registry端口&nbsp;:</div>
	   <div class = "col-sm-3"><%=configInfo.rmiRegistryPort%></div>
	</div>
	
	<div class = "row detailDivHight">
	   <div class = "col-sm-3 textRight">JMX Server端口&nbsp;:</div>
	   <div class = "col-sm-3"><%=configInfo.rmiServerPort%></div>
	</div>
	
	
	<div class = "row detailDivHight">
	   <div class = "col-sm-3 textRight">OSGI端口&nbsp;:</div>
	   <div class = "col-sm-3"><%=configInfo.sshPort%></div>
	</div>
	
	<div class = "row detailDivHight">
	   <div class = "col-sm-3 textRight">堆内存大小&nbsp;:</div>
	   <div class = "col-sm-3"><%=configInfo.java_Memory%></div>
	</div>
	
	<div class = "row detailDivHight">
	   <div class = "col-sm-3 textRight">永久代堆大小&nbsp;:</div>
	   <div class = "col-sm-3"><%=configInfo.java_Perm_Mem%></div>
	</div>
	
	<div class = "row detailDivHight">
	   <div class = "col-sm-3 textRight">JVM扩展参数&nbsp;:</div>
	   <div class = "col-sm-3"><%=configInfo.karaf_opts%></div>
	</div>
	
	<div class = "row detailDivHight">
	   <div class = "col-sm-3 textRight">堆内存快照的存储文件路径&nbsp;:</div>
	   <div class = "col-sm-3"><%=configInfo.heapDumpPath%></div>
	</div>
	
	<div class = "row detailDivHight">
	   <div class = "col-sm-3 textRight">GC日志的文件名和路径&nbsp;:</div>
	   <div class = "col-sm-3"><%=configInfo.gcFile%></div>
	</div>
	
	<div class = "row detailDivHight">
	   <div class = "col-sm-3 textRight">GC日志文件的自动转储&nbsp;:</div>
	   <div class = "col-sm-3"><%=configInfo.gcRotation%></div>
	</div>
	
	<div class = "row detailDivHight">
	   <div class = "col-sm-3 textRight">GC日志文件的绕接数目&nbsp;:</div>
	   <div class = "col-sm-3"><%=configInfo.gcFileNum%></div>
	</div>
	
	<div class = "row detailDivHight">
	   <div class = "col-sm-3 textRight">GC日志文件的大小&nbsp;:</div>
	   <div class = "col-sm-3"><%=configInfo.gcFileSize%></div>
	</div>
	
	<div class = "row detailDivHight">
	   <div class = "col-sm-3 textRight">监听端口&nbsp;:</div>
	   <div class = "col-sm-3"><%=configInfo.bindPort%></div>
	</div>
	
	<div class = "row detailDivHight">
	   <div class = "col-sm-3 textRight">注册库同步间隔&nbsp;:</div>
	   <div class = "col-sm-3"><%=configInfo.synchTime%>秒</div>
	</div>
	
	<div class = "row detailDivHight">
	   <div class = "col-sm-3 textRight">JCF服务器失效超时&nbsp;:</div>
	   <div class = "col-sm-3"><%=configInfo.maxIdleTime%>秒</div>
	</div>
	
	<div class = "row detailDivHight">
	   <div class = "col-sm-3 textRight">服务器日志级别&nbsp;:</div>
	   <div class = "col-sm-3"><%=configInfo.serverLogLevel%></div>
	</div>
	
	<div class = "row detailDivHight">
	   <div class = "col-sm-3 textRight">服务器日志类型&nbsp;:</div>
	   <div class = "col-sm-3">
	   	<%if(configInfo.serverLogType=="daily"){
	   	%>按天记录<%	
	   	}else if (configInfo.serverLogType=="roll"){
	   	%>按大小记录<%
	   	}else if (configInfo.serverLogType=="hoursize"){
	   	%>按小时和大小记录<%
	   	}else if (configInfo.serverLogType=="dailysize"){
	   	%>按天和大小记录<%
	   	}else {
	   	%>其他<%
	   	}%>
	   </div>
	</div>
<%	
	}else if (configInfo.serverCategory==7){
%>

	<div class = "row detailDivHight">
		   <div class = "col-sm-3 textRight">服务器组名&nbsp;:</div>
		   <div class = "col-sm-3"><%=configInfo.groupNameShowUser%></div>
		</div>
		
		<div class = "row detailDivHight">
		   <div class = "col-sm-3 textRight">服务器名&nbsp;:</div>
		   <div class = "col-sm-3"><%=configInfo.serverName%></div>
		</div>
		
		<div class = "row detailDivHight">
		   <div class = "col-sm-3 textRight">服务器类型&nbsp;:</div>
		   <div class = "col-sm-3">JCFCache服务器</div>
		</div>
		
		<div class = "row detailDivHight">
		   <div class = "col-sm-3 textRight">JCF服务器IP&nbsp;:</div>
		   <div class = "col-sm-3"><%=configInfo.rmiRegistryHost%></div>
		</div>
		
		<div class = "row detailDivHight">
		   <div class = "col-sm-3 textRight">日志级别&nbsp;:</div>
		   <div class = "col-sm-3"><%=configInfo.serverLogLevel%></div>
		</div>
		
		<div class = "row detailDivHight">
		   <div class = "col-sm-3 textRight">服务器日志类型&nbsp;:</div>
		   <div class = "col-sm-3">
		   	 	<%if(configInfo.serverLogType=="daily"){
			   	%>按天记录<%	
			   	}else if (configInfo.serverLogType=="roll"){
			   	%>按大小记录<%
			   	}else {
			   	%><%=configInfo.serverLogType%><%
			   	}%>
		   </div>
		</div>
		
		<div class = "row detailDivHight">
		   <div class = "col-sm-3 textRight">统计数据同步时间(秒)&nbsp;:</div>
		   <div class = "col-sm-3"><%=configInfo.statisticsSyncTime%></div>
		</div>
		
		
		
		<div class = "row detailDivHight">
		   <div class = "col-sm-3 textRight">JVM内存报警阀值(百分比)&nbsp;:</div>
		   <div class = "col-sm-3"><%=configInfo.jvmHeapAlert%></div>
		</div>
		<div class = "row detailDivHight">
		   <div class = "col-sm-3 textRight">JVM内存阻塞阀值(百分比)&nbsp;:</div>
		   <div class = "col-sm-3"><%=configInfo.jvmHeapBlock%></div>
		</div>
		<div class = "row detailDivHight">
		   <div class = "col-sm-3 textRight">存储最大个数&nbsp;:</div>
		   <div class = "col-sm-3"><%=configInfo.maxSize4Store%></div>
		</div>
		<div class = "row detailDivHight">
		   <div class = "col-sm-3 textRight">存储报警阀值(个)&nbsp;:</div>
		   <div class = "col-sm-3"><%=configInfo.cacheNodeAlert%></div>
		</div>


<%		
	}else if (configInfo.serverCategory==1||configInfo.serverCategory==2){//jcf和adapter服务器
%>
	<div class = "row detailDivHight">
	   <div class = "col-sm-3 textRight">JCF服务器组名&nbsp;:</div>
	   <div class = "col-sm-3"><%=configInfo.groupNameShowUser%></div>
	</div>
	
	<div class = "row detailDivHight">
	   <div class = "col-sm-3 textRight">JCF服务器名&nbsp;:</div>
	   <div class = "col-sm-3"><%=configInfo.serverName%></div>
	</div>
	
	<div class = "row detailDivHight">
	   <div class = "col-sm-3 textRight">JCF服务器类型&nbsp;:</div>
	   <div class = "col-sm-3">JCF服务器</div>
	</div>
	
	
	<div class = "row detailDivHight">
	   <div class = "col-sm-3 textRight">JCF服务器IP&nbsp;:</div>
	   <div class = "col-sm-3"><%=configInfo.rmiRegistryHost%></div>
	</div>
	
	<div class = "row detailDivHight">
	   <div class = "col-sm-3 textRight">JMX Registry端口&nbsp;:</div>
	   <div class = "col-sm-3"><%=configInfo.rmiRegistryPort%></div>
	</div>
	
	<div class = "row detailDivHight">
	   <div class = "col-sm-3 textRight">JMX Server端口&nbsp;:</div>
	   <div class = "col-sm-3"><%=configInfo.rmiServerPort%></div>
	</div>
	
	<div class = "row detailDivHight">
	   <div class = "col-sm-3 textRight">HTTP端口&nbsp;:</div>
	   <div class = "col-sm-3"><%=configInfo.httpPort%></div>
	</div>
	
	<div class = "row detailDivHight">
	   <div class = "col-sm-3 textRight">OSGI Console端口&nbsp;:</div>
	   <div class = "col-sm-3"><%=configInfo.sshPort%></div>
	</div>
	
	<div class = "row detailDivHight">
	   <div class = "col-sm-3 textRight">堆内存大小&nbsp;:</div>
	   <div class = "col-sm-3"><%=configInfo.java_Memory%></div>
	</div>
	
	<div class = "row detailDivHight">
	   <div class = "col-sm-3 textRight">永久代堆大小&nbsp;:</div>
	   <div class = "col-sm-3"><%=configInfo.java_Max_Perm_Mem%></div>
	</div>
	
	<div class = "row detailDivHight">
	   <div class = "col-sm-3 textRight">JVM扩展参数&nbsp;:</div>
	   <div class = "col-sm-3"><%=configInfo.karaf_opts%></div>
	</div>
	
	<div class = "row detailDivHight">
	   <div class = "col-sm-3 textRight">最大可分配系统内存&nbsp;:</div>
	   <div class = "col-sm-3"><%=configInfo.direct_mem_size%></div>
	</div>
	
	<div class = "row detailDivHight">
	   <div class = "col-sm-3 textRight">GC选项&nbsp;:</div>
	   <div class = "col-sm-3"><%=configInfo.gcoptions%></div>
	</div>
	
	<div class = "row detailDivHight">
	   <div class = "col-sm-3 textRight">堆内存快照的存储路径&nbsp;:</div>
	   <div class = "col-sm-3"><%=configInfo.heapDumpPath%></div>
	</div>
	
	<div class = "row detailDivHight">
	   <div class = "col-sm-3 textRight">GC日志文件名和路径&nbsp;:</div>
	   <div class = "col-sm-3"><%=configInfo.gcFile%></div>
	</div>
	
	<div class = "row detailDivHight">
	   <div class = "col-sm-3 textRight">GC日志的自动转储&nbsp;:</div>
	   <div class = "col-sm-3"><%if("-XX:+UseGCLogFileRotation"==configInfo.gcRotation){%>是<%}else{%>否<%}%></div>
	</div>
	
	<div class = "row detailDivHight">
	   <div class = "col-sm-3 textRight">GC日志文件绕接数&nbsp;:</div>
	   <div class = "col-sm-3"><%=configInfo.gcFileNum%></div>
	</div>
	
	<div class = "row detailDivHight">
	   <div class = "col-sm-3 textRight">GC日志文件的大小&nbsp;:</div>
	   <div class = "col-sm-3"><%=configInfo.gcFileSize%></div>
	</div>
	
	<div class = "row detailDivHight">
	   <div class = "col-sm-3 textRight">监听端口&nbsp;:</div>
	   <div class = "col-sm-3"><%=configInfo.bindPort%></div>
	</div>
	
	<div class = "row detailDivHight">
	   <div class = "col-sm-3 textRight">负载因子&nbsp;:</div>
	   <div class = "col-sm-3"><%=configInfo.loadFactor%></div>
	</div>
	
	<div class = "row detailDivHight">
	   <div class = "col-sm-3 textRight">系统内存池大小&nbsp;:</div>
	   <div class = "col-sm-3"><%=configInfo.memoryPoolSize%>M</div>
	</div>
	
	<div class = "row detailDivHight">
	   <div class = "col-sm-3 textRight">系统内存块大小&nbsp;:</div>
	   <div class = "col-sm-3"><%=configInfo.blockSize%>KB</div>
	</div>
	
	<div class = "row detailDivHight">
	   <div class = "col-sm-3 textRight">发送队列大小&nbsp;:</div>
	   <div class = "col-sm-3"><%=configInfo.channelQueueSize%></div>
	</div>
	
	<div class = "row detailDivHight">
	   <div class = "col-sm-3 textRight">JVM内存中的消息最大值&nbsp;:</div>
	   <div class = "col-sm-3"><%=configInfo.heapMessageLimit%>Byte</div>
	</div>
	
	<div class = "row detailDivHight">
	   <div class = "col-sm-3 textRight">连接并发数&nbsp;:</div>
	   <div class = "col-sm-3"><%=configInfo.channelConcurrent%></div>
	</div>
	
	<div class = "row detailDivHight">
	   <div class = "col-sm-3 textRight">连接重试次数&nbsp;:</div>
	   <div class = "col-sm-3"><%=configInfo.connectionRetry%></div>
	</div>
	
	<div class = "row detailDivHight">
	   <div class = "col-sm-3 textRight">JCF服务器通信的心跳间隔&nbsp;:</div>
	   <div class = "col-sm-3"><%=configInfo.heartBeatTime%>秒</div>
	</div>
	
	
	<div class = "row detailDivHight">
	   <div class = "col-sm-3 textRight">注册库IP&nbsp;:</div>
	   <div class = "col-sm-3"><%=configInfo.registryIp%></div>
	</div>
	
	<div class = "row detailDivHight">
	   <div class = "col-sm-3 textRight">注册库端口&nbsp;:</div>
	   <div class = "col-sm-3"><%=configInfo.registryPort%></div>
	</div>
	
	<div class = "row detailDivHight">
	   <div class = "col-sm-3 textRight">注册库同步间隔&nbsp;:</div>
	   <div class = "col-sm-3"><%=configInfo.synchTime%></div>
	</div>
	
	<div class = "row detailDivHight">
	   <div class = "col-sm-3 textRight">跟踪带日志输出规则&nbsp;:</div>
	   <div class = "col-sm-3"><%=configInfo.auditLevelShowUser%></div>
	</div>
	
	
	<div class = "row detailDivHight">
	   <div class = "col-sm-3 textRight">服务器持久化队列文件存放路径&nbsp;:</div>
	   <div class = "col-sm-3"><%=configInfo.persistQueueFullPath%></div>
	</div>
	
	<div class = "row detailDivHight">
	   <div class = "col-sm-3 textRight">服务器日志级别&nbsp;:</div>
	   <div class = "col-sm-3"><%=configInfo.serverLogLevel%></div>
	</div>
	
	<div class = "row detailDivHight">
	   <div class = "col-sm-3 textRight">服务器日志类型&nbsp;:</div>
	   <div class = "col-sm-3">
	   	  	<%if(configInfo.serverLogType=="daily"){
		   	%>按天记录<%	
		   	}else if (configInfo.serverLogType=="roll"){
		   	%>按大小记录<%
		   	}else if (configInfo.serverLogType=="hoursize"){
		   	%>按小时和大小记录<%
		   	}else if (configInfo.serverLogType=="dailysize"){
		   	%>按天和大小记录<%
		   	}else {
		   	%>其他<%
		   	}%>
	   </div>
	</div>
<%
	}
%>