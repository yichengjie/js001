<form class="form-horizontal" role="form">
	<input type="hidden" id="serverId" value="<%=configureInfo.serverId%>"/>
	<input type="hidden" id="groupId" value ="<%=groupId%>"/>
	<input type="hidden" id="serverCategory" value ="<%=serverCategory%>"/>
	<div class="form-group" id = "java_MemoryDiv" >
		<label for="java_Memory" class="col-sm-3 control-label">堆内存大小：</label>
		<div class="col-sm-4">
			<input type="text" id="java_Memory" value="<%=configureInfo.java_Memory%>" class="form-control input-sm" placeholder="单位只能为kK,mM,gG"/>
		</div>
		<div>
			<span class = "text-info">(单位:kK,mM,gG)&nbsp;</span>
			<span id = "java_MemoryTip"></span>
		</div>
	</div>
 	<div class="form-group" id="java_Max_Perm_MemDiv">
		<label for="java_Max_Perm_Mem" class="col-sm-3 control-label">永久代堆大小：</label>
		<div class="col-sm-4">
			<input type="text" id="java_Max_Perm_Mem" value = "<%=configureInfo.java_Max_Perm_Mem%>"  class="form-control input-sm"  placeholder="单位只能为kK,mM,gG" />
      	</div>
      	<div>
      		<span class = "text-info">(单位:kK,mM,gG)&nbsp;</span>
      		<span id = "java_Max_Perm_MemTip"></span>
      	</div>
	</div>
	<div class="form-group" id = "karaf_optsDiv" >
		<label for="karaf_opts" class="col-sm-3 control-label">JVM扩展参数：</label>
		<div class="col-sm-4">
			<input type="text" id="karaf_opts"  value = "<%=configureInfo.karaf_opts%>"    class="form-control input-sm"  placeholder="配置JVM参数超过系统内存值后将导致错误" />
		</div>
		<div>
			<span id = "karaf_optsTip"></span>
		</div>
	</div>
	<div class="form-group" id = "direct_mem_sizeDiv" >
		<label for="direct_mem_size" class="col-sm-3 control-label">最大可分配系统内存：</label>
      	<div class="col-sm-4">
        	<input type="text" id="direct_mem_size" value = "<%=configureInfo.direct_mem_size%>"   class="form-control input-sm"  placeholder="不建议配置" />
      	</div>
      	<div>
      		<span class = "text-info">(单位:kK,mM,gG)&nbsp;</span>
      		<span id = "direct_mem_sizeTip"></span>
      	</div>
	</div>
	<div class="form-group" id = "gcoptionsDiv" >
		<label for="gcoptions" class="col-sm-3 control-label">GC选项：</label>
		<div class="col-sm-4">
        	<input type="text" id="gcoptions"  value = "<%=configureInfo.gcoptions%>"  class="form-control input-sm"  placeholder="" />
      	</div>
      	<div>
      		<span id = "gcoptionsTip"></span>
      	</div>
	</div>
	<div class="form-group" id = "heapDumpPathDiv" >
		<label for="heapDumpPath" class="col-sm-3 control-label">堆内存快照的存储文件路径：</label>
		<div class="col-sm-4">
			<input type="text" id="heapDumpPath" value = "<%=configureInfo.heapDumpPath%>"  class="form-control input-sm"  placeholder="">
	    </div>
	    <div>
	    	<span id = "heapDumpPathTip"></span>
	    </div>
	</div>
	<div class="form-group" id = "gcFileDiv" >
		<label for="gcFile" class="col-sm-3 control-label">GC日志的文件名和路径：</label>
		<div class="col-sm-4">
			<input type="text" id="gcFile"  value = "<%=configureInfo.gcFile%>" class="form-control input-sm"  placeholder="JDK 7版本开始兼容">
	    </div>
	    <div>
	    	<span id = "gcFileTip"></span>
	    </div>
	</div>
	<div class="form-group" id = "gcRotationDiv">
		<label for="gcRotation" class="col-sm-3 control-label">GC日志自动转储：</label>
	    <div class="col-sm-4">
	    	<select id="gcRotation" class="form-control input-sm" placeholder="JDK 7版本开始兼容">
	      	 	<%if(configureInfo.gcRotation=="-XX:+UseGCLogFileRotation"){%>
	      			<option selected = "selected"  value="-XX:+UseGCLogFileRotation">true</option>
	      	 	 	<option value="" >false</option>
	      	 	 <%}else if(""==configureInfo.gcRotation){%>
	      	 	 	<option value="-XX:+UseGCLogFileRotation">true</option>
	      	 	 	<option selected = "selected" value="" selected="selected">false</option>
	      	 	 <%}%>
			</select>
		</div>
		<div>
			<span id="gcRotationTip"></span>
		</div>
	</div>
	<div class="form-group" id="gcFileNumDiv">
		<label for="gcFileNum" class="col-sm-3 control-label">GC日志绕接数目：</label>
		<div class="col-sm-4">
			<input type="text" id="gcFileNum"  value = "<%=configureInfo.gcFileNum%>" class="form-control input-sm"  placeholder="JDK 7版本开始兼容">
      	</div>
      	<div>
      		<span id = "gcFileNumTip"></span>
      	</div>
    </div>
    <div class="form-group" id = "gcFileSizeDiv" >
		<label for="gcFileSize" class="col-sm-3 control-label">GC日志大小：</label>
		<div class="col-sm-4">
			<input type="text" id="gcFileSize" value = "<%=configureInfo.gcFileSize%>"  class="form-control input-sm"  placeholder="单位为k,K,m,M,g,G">
      	</div>
      	<div>
      		<span>(单位:kK,mM,gG)</span><span id="gcFileSizeTip"></span>
      	</div>
    </div>
	<div class="form-group" id = "loadFactorDiv" >
		<label for="loadFactor" class="col-sm-3 control-label">负载均衡因子：</label>
 		<div class="col-sm-4">
        	<input type="text" id="loadFactor" value="<%=configureInfo.loadFactor%>"  class="form-control input-sm"  placeholder="必填项" />
      	</div>
      	<div class="text-danger">*
      		<span id = "loadFactorTip"></span>
      	</div>
	</div>
	<div class="form-group" id="memoryPoolSizeDiv" >
		<label for="memoryPoolSize" class="col-sm-3 control-label">系统内存池大小：</label>
  		<div class="col-sm-4">
    		<input type="text" id="memoryPoolSize" value="<%=configureInfo.memoryPoolSize%>" class="form-control input-sm"  placeholder="单位：M" />
  		</div>
  		<div>
  			<span class="text-danger">*</span>
  			<span class="text-info">(单位:M)&nbsp;</span>
  			<span id="memoryPoolSizeTip"></span>
  		</div>
   	</div>
 	<div class="form-group" id = "blockSizeDiv" >
 		<label for="blockSize" class="col-sm-3 control-label">系统内存块大小：</label>
		<div class="col-sm-4">
			<input type="text" id="blockSize" value = "<%=configureInfo.blockSize%>"  class="form-control input-sm"  placeholder="单位：k" />
		</div>
      	<div>
      		<span class = "text-danger">*</span>
      		<span class = "text-info">(单位:k)&nbsp;</span>
      		<span id = "blockSizeTip"></span>
      	</div>
	</div>
	<div class="form-group" id = "heapMessageLimitDiv" >
 		<label for="heapMessageLimit" class="col-sm-3 control-label">JVM内存消息体最大值：</label>
		<div class="col-sm-4">
        	<input type="text" id="heapMessageLimit" value = "<%=configureInfo.heapMessageLimit%>"  class="form-control input-sm"  placeholder="单位：Byte" />
      	</div>
      	<div>
      		<span class = "text-danger">*</span>
      		<span class = "text-info">(单位:Byte)&nbsp;</span>
      		<span id = "heapMessageLimitTip"></span>
      	</div>
 	</div>
	<div class="form-group" id = "channelQueueSizeDiv" >
      	<label for="channelQueueSize" class="col-sm-3 control-label">并发队列大小：</label>
      	<div class="col-sm-4">
        	<input type="text" id="channelQueueSize" value = "<%=configureInfo.channelQueueSize%>"  class="form-control input-sm"  placeholder="正整数" />
     	 </div>
      	<div>
      		<span class = "text-danger">*</span>
      		<span id = "channelQueueSizeTip"></span>
      	</div>
   	</div>
	<div class="form-group" id = "channelConcurrentDiv" >
     	<label for="channelConcurrent" class="col-sm-3 control-label">连接并发数：</label>
      	<div class="col-sm-4">
        	<input type="text" id="channelConcurrent"  value = "<%=configureInfo.channelConcurrent%>"  class="form-control input-sm"  placeholder="正整数" />
      	</div>
      	<div>
      		<span class = "text-danger">*</span>
      		<span id = "channelConcurrentTip"></span>
      	</div>
	</div>
	<div class="form-group" id = "connectionRetryDiv" >
		<label for="connectionRetry" class="col-sm-3 control-label">连接重试次数：</label>
      	<div class="col-sm-4">
        	<input type="text" id="connectionRetry"  value = "<%=configureInfo.connectionRetry%>" class="form-control input-sm"  placeholder="正整数" />
      	</div>
      	<div>
      		<span class="text-danger">*</span>
      		<span id="connectionRetryTip"></span>
      	</div>
	</div>
	<div class="form-group" id = "heartBeatTimeDiv" >
		<label for="heartBeatTime" class="col-sm-3 control-label">JCF服务器通信心跳间隔：</label>
      	<div class="col-sm-4">
        	<input type="text" id="heartBeatTime" value = "<%=configureInfo.heartBeatTime%>"  class="form-control input-sm"  placeholder="单位：秒（s）" />
      	</div>
      	<div>
      		<span class = "text-info">(单位：秒(s))</span>
      		<span id = "heartBeatTimeTip"></span>
      	</div>
	</div>
	<input type="hidden" id="messageBodyLimit"  value = "<%=configureInfo.messageBodyLimit%>" class="form-control input-sm"  placeholder="单位：k" />
	<div class="form-group" id = "registryIpDiv" >
      	<label for="registryIp" class="col-sm-3 control-label">注册库IP：</label>
      	<div class="col-sm-4">
        	<input type="text" id="registryIp"  value = "<%=configureInfo.registryIp%>" class="form-control input-sm"  placeholder="必填项" />
      	</div>
      	<div>
      		<span class="text-danger">*</span>
      		<span id="registryIpTip"></span>
      	</div>
	</div>
	<div class="form-group" id = "registryPortDiv" >
		<label for="registryPort" class="col-sm-3 control-label">注册库端口：</label>
      	<div class="col-sm-4">
        	<input type="text" id="registryPort" value = "<%=configureInfo.registryPort%>"  class="form-control input-sm"  placeholder="端口应为1024~65535之间的数字" />
      	</div>
      	<div>
      		<span class="text-danger">*</span>
      		<span id="registryPortTip"></span>
      	</div>
	</div>
	<div class="form-group" id = "synchTimeDiv" >
		<label for="synchTime" class="col-sm-3 control-label">注册库同步间隔：</label>
      	<div class="col-sm-4">
        	<input type="text" id="synchTime"  value = "<%=configureInfo.synchTime%>" class="form-control input-sm"  placeholder="单位：秒（s）" />
      	</div>
      	<div>
      		<span class = "text-danger">*</span>
      		<span class = "text-info">(单位:秒(s))</span>
      		<span id = "synchTimeTip"></span>
      	</div>
	</div>
	<div class="form-group" id = "auditLevelDiv" >
		<label for="auditLevel" class="col-sm-3 control-label">跟踪带日志输出规则：</label>
		<div class="col-sm-4">
			<select id="auditLevel" class="form-control input-sm" >
				<%for(var i = 0; i < tracLogKeyList.length; i++){
	      	 		if(configureInfo.auditLevel==""){
	      	 			if(i==0){%>
	      	 				<option selected = "selected" value="<%=tracLogKeyList[i]%>"><%=tracLogValueList[i]%></option>
			      	 	<%}else{%>
			      	 		<option value="<%=tracLogKeyList[i]%>"><%=tracLogValueList[i]%></option>
			      	 	<%}
	      	 		}else {
	      	 			if(configureInfo.auditLevel==tracLogKeyList[i]){%>
	      	 				<option selected = "selected" value="<%=tracLogKeyList[i]%>"><%=tracLogValueList[i]%></option>
	      	 			<%}else{%>
	      	 				<option value="<%=tracLogKeyList[i]%>"><%=tracLogValueList[i]%></option>
	      	 			<%}
	      	 		}
	      	 	}%>
			</select>
		</div>
	</div>
	<div class="form-group" id = "persistQueueFullPathDiv" >
		<label for="persistQueueFullPath" class="col-sm-3 control-label">服务器持久化队列文件保存路径：</label>
		<div class="col-sm-4">
			<input type="text" id="persistQueueFullPath" value = "<%=configureInfo.persistQueueFullPath%>"  class="form-control input-sm" value="/opt/applog/jcf/"  placeholder="">
	    </div>
	    <div>
	    	<span class = "text-danger">*</span>
	    	<span id = "persistQueueFullPathTip"></span>
	    </div>
	</div>
	<div class="form-group" id = "serverLogLevelDiv" >
		<label for="serverLogLevel" class="col-sm-3 control-label">服务日志级别：</label>
		<div class="col-sm-4">
			<select id="serverLogLevel" class="form-control input-sm">
				<%for(var i = 0 ; i < serverLogLevels.length ;i ++){
	         		var curll = serverLogLevels[i] ;
	         		if(curll==configureInfo.serverLogLevel){%>
	         			<option selected = "selected" value = "<%=curll%>" ><%=curll%></option>
	         		<%}else{%>
	         			<option value="<%=curll%>"><%=curll%></option>
	         		<%}
	         	  }%>
			</select>
		</div>
	</div>
	<div class="form-group" id = "serverLogTypeDiv" >
		<label for="serverLogType" class="col-sm-3 control-label">服务器日志类型：</label>
		<div class="col-sm-4">
			<select id = "serverLogType" class="form-control input-sm" >
	         	<%for(var i = 0; i < serverLogTypeList.length; i++){
	         	  	var curlt = serverLogTypeList[i] ;
	         		if(curlt.key==configureInfo.serverLogType){%>
	         			<option selected="selected" value="<%=curlt.key%>" ><%=curlt.value%></option>
	         		<%}else{%>
	         			<option value="<%=curlt.key%>"><%=curlt.value%></option>
	         		<%}
	         	  }%>
			</select>
		</div>
	</div>
	<div class="form-group">
		<div class="col-sm-offset-2 col-sm-10">
			<button type="button" id="groupServerCfgSubmit" class="btn btn-primary">保存</button>
		</div>
   </div>
</form>
