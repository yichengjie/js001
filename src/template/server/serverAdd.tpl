<br>
<form class="form-horizontal" id = "addServerForm"  role="form" method= "POST">
   <div class="form-group">
      <label for="groupName" class="col-sm-3 control-label">服务器组名称：</label>
      <div class="col-sm-4">
         <select id = "groupName"  class  = "form-control input-sm">
         <%
       		for(var i = 0 ; i < groupList.length;i++){
       		%><option  <%if(i==0){%>selected = "selected"<%} %>   value = "<%=groupList[i].groupId%>"><%=groupList[i].groupName%></option><%
       		}
         %>
         </select>
      </div>
      <div class="col-sm-2"><button type = "button" id = "toAddGroupUIBtn"  class = "btn myhand  <%if(groupAddFlag!="true"){%>disabled<%}%>">添加分组</button></div>
   </div>
   
   <div class="form-group" id = "serverNameDiv" >
      <label for="serverName" class="col-sm-3 control-label">服务器名称：</label>
      <div class="col-sm-4">
        <input type="text" id="serverName"   class="form-control input-sm"  placeholder="必填项" />
      </div>
      <div><span class = "text-danger">*</span><span id = "serverNameTip"></span></div>
   </div>
   
   <div class="form-group" id = "serverCategoryDiv">
      <label for="serverCategory" class="col-sm-3 control-label">服务器类型：</label>
      <div class="col-sm-4">
      	 <select  id="serverCategory" class="form-control input-sm">
			 <option value="1">JCF服务器</option>	
		 </select>
      </div>
       <div><span id = "serverCategoryTip"></span></div>
   </div>
   
   <div class="form-group" id = "rmiRegistryHostDiv">
      <label for="rmiRegistryHost" class="col-sm-3 control-label">服务器IP：</label>
      <div class="col-sm-4">
         <select id="rmiRegistryHost"   class="form-control input-sm">
         	<%for(var i = 0 ; i < nodeIpList.length; i ++){
         	    if(i==0){
            %>
            		<option selected = "selected" value = "<%=nodeIpList[i].serverIp%>"><%=nodeIpList[i].serverIp%></option>
            <%   
         	    }else{
         	%>
         			<option  value = "<%=nodeIpList[i].serverIp%>"><%=nodeIpList[i].serverIp%></option>
         	<%
         	    }
         	}
         	%>
         	
         </select>
      </div>
      <div><span class = "text-danger">*</span><span id = "rmiRegistryHostTip"></span></div>
   </div>
   
   <div class="form-group" id = "rmiRegistryPortDiv" >
      <label for="rmiRegistryPort" class="col-sm-3 control-label">JMX Registry端口：</label>
      <div class="col-sm-4">
         <input type="text" id="rmiRegistryPort"   class="form-control input-sm"  placeholder="必填项，【1024~65535】之间数字">
      </div>
      <div><span class = "text-danger">*</span><span id = "rmiRegistryPortTip"></span></div>
   </div>
   
   
   <div class="form-group" id = "rmiServerPortDiv">
      <label for="rmiServerPort" class="col-sm-3 control-label">JMX Server端口：</label>
      <div class="col-sm-4">
         <input type="text" id="rmiServerPort"  class="form-control input-sm"  placeholder="必填项，【1024~65535】之间数字">
      </div>
      <div><span class = "text-danger">*</span><span id = "rmiServerPortTip" ></span></div>
   </div>
   
   <div class="form-group" id= "httpPortDiv" >
      <label for="httpPort" class="col-sm-3 control-label">HTTP端口：</label>
      <div class="col-sm-4">
         <input type="text" id="httpPort"  class="form-control input-sm"  placeholder="必填项，【1024~65535】之间数字">
      </div>
      <div><span class = "text-danger">*</span><span id = "httpPortTip"></span></div>
   </div>
   
   
   <div class="form-group" id = "sshPortDiv" >
      <label for="sshPort" class="col-sm-3 control-label">OSGI Console端口：</label>
      <div class="col-sm-4">
         <input type="text" id="sshPort"   class="form-control input-sm"  placeholder="必填项，【1024~65535】之间数字">
      </div>
      <div><span class = "text-danger">*</span><span id = "sshPortTip"></span></div>
   </div>
   
   <div class="form-group" id = "java_MemoryDiv" >
      <label for="java_Memory" class="col-sm-3 control-label">堆内存大小：</label>
      <div class="col-sm-4 ">
         <input type="text" id="java_Memory"   class="form-control input-sm" value="1536M"  placeholder="单位为kK,mM,gG">
      </div>
      <div><span>(单位:kK,mM,gG)&nbsp;</span><span id = "java_MemoryTip"></span></div>
   </div>
   
   <div class="form-group" id = "java_Max_Perm_MemDiv" >
      <label for="java_Max_Perm_Mem" class="col-sm-3 control-label">永久代堆大小：</label>
      <div class="col-sm-4">
         <input type="text" id="java_Max_Perm_Mem"   class="form-control input-sm"  placeholder="单位为kK,mM,gG">
      </div>
      <div><span>(单位:kK,mM,gG)&nbsp;</span><span id = "java_Max_Perm_MemTip"></span></div>
   </div>
   
   <div class="form-group" id = "karaf_optsDiv" >
      <label for="karaf_opts" class="col-sm-3 control-label">JVM扩展参数：</label>
      <div class="col-sm-4">
         <input type="text" id="karaf_opts"  class="form-control input-sm"  placeholder="配置的JVM参数超过系统内存值后将导致错误">
      </div>
      <div><span id = "karaf_optsTip"></span></div>
   </div>
   
   <div class="form-group" id = "direct_mem_sizeDiv" >
      <label for="direct_mem_size" class="col-sm-3 control-label">最大可分配系统内存：</label>
      <div class="col-sm-4">
         <input type="text" id="direct_mem_size"  class="form-control input-sm"  placeholder="不建议配置">
      </div>
      <div><span class = "text-info">(单位:kK,mM,gG)&nbsp;</span><span id = "direct_mem_sizeTip"></span></div>
   </div>
   
   <div class="form-group" id = "gcoptionsDiv" >
      <label for="gcoptions" class="col-sm-3 control-label">GC选项：</label>
      <div class="col-sm-4">
         <input type="text" id="gcoptions"  class="form-control input-sm"  placeholder="">
      </div>
      <div><span id = "gcoptionsTip"></span></div>
   </div>
   
   <div class="form-group" id = "heapDumpPathDiv" >
      <label for="heapDumpPath" class="col-sm-3 control-label">堆内存快照的存储文件路径：</label>
      <div class="col-sm-4">
         <input type="text" id="heapDumpPath"   class="form-control input-sm"  placeholder="">
      </div>
      <div><span id = "heapDumpPathTip"></span></div>
   </div>
   
   <div class="form-group" id = "gcFileDiv" >
      <label for="gcFile" class="col-sm-3 control-label">GC日志的文件名和路径：</label>
      <div class="col-sm-4">
         <input type="text" id="gcFile"   class="form-control input-sm"  placeholder="JDK 7版本开始兼容">
      </div>
      <div><span id = "gcFileTip"></span></div>
   </div>
   
    <div class="form-group" id = "gcRotationDiv" >
      <label for="gcRotation" class="col-sm-3 control-label">GC日志自动转储：</label>
      <div class="col-sm-4">
      	 <select id="gcRotation"  class="form-control input-sm" placeholder="JDK 7版本开始兼容">
			<option value="-XX:+UseGCLogFileRotation">true</option>
			<option value="" selected="selected">false</option>
		 </select>
      </div>
       <div><span id = "gcRotationTip"></span></div>
   </div>
   
   <div class="form-group" id = "gcFileNumDiv" >
      <label for="gcFileNum" class="col-sm-3 control-label">GC日志绕接数目：</label>
      <div class="col-sm-4">
         <input type="text" id="gcFileNum"   class="form-control input-sm"  placeholder="JDK 7版本开始兼容">
      </div>
      <div ><span id = "gcFileNumTip"></span></div>
   </div>
   
   <div class="form-group" id = "gcFileSizeDiv" >
      <label for="gcFileSize" class="col-sm-3 control-label">GC日志大小：</label>
      <div class="col-sm-4">
         <input type="text" id="gcFileSize"   class="form-control input-sm"  placeholder="单位为kK,mM,gG">
      </div>
      <div><span>(单位:kK,mM,gG)&nbsp;</span><span id = "gcFileSizeTip"></span></div>
   </div>
   
   <div class="form-group" id = "bindPortDiv" >
      <label for="bindPort" class="col-sm-3 control-label">监听端口：</label>
      <div class="col-sm-4">
         <input type="text" id="bindPort"   class="form-control input-sm"  placeholder="必填项，【1024~65535】之间数字">
      </div>
      <div><span class = "text-danger">*</span><span id = "bindPortTip"></span></div>
   </div>
   
   <div class="form-group" id = "loadFactorDiv">
      <label for="loadFactor" class="col-sm-3 control-label">负载均衡因子：</label>
      <div class="col-sm-4">
         <input type="text" id="loadFactor" class="form-control input-sm" value="10"  placeholder="必填项,正整数">
      </div>
      <div><span class = "text-danger">*</span><span id = "loadFactorTip"></span></div>
   </div>
   
   <div class="form-group" id = "memoryPoolSizeDiv" >
      <label for="memoryPoolSize" class="col-sm-3 control-label">系统内存池的大小：</label>
      <div class="col-sm-4">
         <input type="text" id="memoryPoolSize"   class="form-control input-sm" value="0"  placeholder="必填项目，单位：M">
      </div>
      <div><span class = "text-danger">*</span><span>(单位:M)&nbsp;</span><span  id = "memoryPoolSizeTip"></span></div>
   </div>
   
   <div class="form-group" id = "blockSizeDiv" >
      <label for="blockSize" class="col-sm-3 control-label">系统内存块大小：</label>
      <div class="col-sm-4">
         <input type="text" id="blockSize" class="form-control input-sm"  value="8" placeholder="必填项，单位：KB">
      </div>
      <div><span class = "text-danger">*</span><span>(单位:KB)&nbsp;</span><span id = "blockSizeTip"></span></div>
   </div>
   
   <div class="form-group" id = "heapMessageLimitDiv" >
      <label for="heapMessageLimit" class="col-sm-3 control-label">JVM内存中消息体最大值：</label>
      <div class="col-sm-4">
         <input type="text" id="heapMessageLimit"   class="form-control input-sm" value="-1" placeholder="必填项，单位：Byte">
      </div>
      <div><span class = "text-danger">*</span><span>(单位:Byte)&nbsp;</span><span id = "heapMessageLimitTip"></span></div>
   </div>
   
   <div class="form-group" id = "channelQueueSizeDiv" >
      <label for="channelQueueSize" class="col-sm-3 control-label">发送队列大小：</label>
      <div class="col-sm-4">
         <input type="text" id="channelQueueSize"   class="form-control input-sm" value="2048"  placeholder="必填项">
      </div>
      <div><span class = "text-danger">*</span><span id = "channelQueueSizeTip"></span></div>
   </div>
   
   <div class="form-group" id = "channelConcurrentDiv" >
      <label for="channelConcurrent" class="col-sm-3 control-label">连接并发数：</label>
      <div class="col-sm-4">
         <input type="text" id="channelConcurrent"   class="form-control input-sm"  value="2" placeholder="必填项">
      </div>
      <div><span class = "text-danger">*</span><span id = "channelConcurrentTip"></span></div>
   </div>
   
   <div class="form-group" id = "connectionRetryDiv" >
      <label for="connectionRetry" class="col-sm-3 control-label">链接重试次数：</label>
      <div class="col-sm-4">
         <input type="text" id="connectionRetry"   class="form-control input-sm"  value="3" placeholder="必填项">
      </div>
      <div><span class = "text-danger">*</span><span id = "connectionRetryTip"></span></div>
   </div>
   
   <div class="form-group" id = "heartBeatTimeDiv" >
      <label for="heartBeatTime" class="col-sm-3 control-label">JCF服务器通信的心跳间隔：</label>
      <div class="col-sm-4">
         <input type="text" id="heartBeatTime"   class="form-control input-sm" value="30"  placeholder="必填项，单位：秒（s）">
      </div>
      <div><span class = "text-danger">*</span><span>(单位：秒(s))&nbsp;</span><span id = "heartBeatTimeTip"></span></div>
   </div>
   
  
   <input type="hidden" id="messageBodyLimit"    value="500" >
   
   <div class="form-group" id = "registryIpDiv" >
      <label for="registryIp" class="col-sm-3 control-label">注册库IP：</label>
      <div class="col-sm-4">
         <select id = "registryIp" class="form-control input-sm">
         	<%for(var i = 0 ; i < nodeIpList.length; i ++){
         	    if(i==0){
            %>
            		<option selected = "selected" value = "<%=nodeIpList[i].serverIp%>"><%=nodeIpList[i].serverIp%></option>
            <%   
         	    }else{
         	%>
         			<option  value = "<%=nodeIpList[i].serverIp%>"><%=nodeIpList[i].serverIp%></option>
         	<%
         	    }
         	}
         	%>
         </select>
      </div>
   </div>
   
   <div class="form-group" id = "registryPortDiv" >
      <label for="registryPort" class="col-sm-3 control-label">注册库端口：</label>
      <div class="col-sm-4">
         <input type="text" id="registryPort"   class="form-control input-sm"  placeholder="必填项，【1024~65535】之间数字">
      </div>
      <div><span class = "text-danger">*</span><span id = "registryPortTip"></span></div>
   </div>
   
   <div class="form-group" id = "synchTimeDiv" >
      <label for="synchTime" class="col-sm-3 control-label">注册库同步间隔：</label>
      <div class="col-sm-4">
         <input type="text" id="synchTime"   class="form-control input-sm" value="5" placeholder="必填项，单位：秒（s）">
      </div>
      <div><span class = "text-danger">*</span><span>(单位：秒(s))&nbsp;</span><span id = "synchTimeTip"></span></div>
   </div>
   
   <div class="form-group" id = "maxIdleTimeDiv" >
      <label for="maxIdleTime" class="col-sm-3 control-label">JCF服务器失效超时：</label>
      <div class="col-sm-4">
         <input type="text" id="maxIdleTime"   class="form-control input-sm" value="180" placeholder="必填项，单位：秒（s）">
      </div>
      <div><span class = "text-danger">*</span><span>(单位：秒(s))&nbsp;</span><span  id = "maxIdleTimeTip" ></span></div>
   </div>
   
   
   <!--新需求修改，跟踪带相关配置修改-->
   
   <div class="form-group" id = "auditLevelDiv" >
      <label for="auditLevel" class="col-sm-3 control-label">跟踪带日志输出规则：</label>
      <div class="col-sm-4">
      	 <select id="auditLevel" class="form-control input-sm" >
      	 	<%for(var i = 0 ; i < tracLogKeyList.length ; i ++){
      	 		if(i==0){
      	 			%><option selected = "selected" value="<%=tracLogKeyList[i]%>"><%=tracLogValueList[i]%></option><%
      	 		}else{
      	 			%><option value="<%=tracLogKeyList[i]%>"><%=tracLogValueList[i]%></option><%
      	 		}
      	 	}%>
		 </select>
      </div>
   </div>
   
   
   
   <div class="form-group" id = "persistQueueFullPathDiv" >
      <label for="persistQueueFullPath" class="col-sm-3 control-label">服务器持久化队列文件保存路径：</label>
      <div class="col-sm-4">
         <input type="text" id="persistQueueFullPath"   class="form-control input-sm" value="/opt/applog/jcf/"  placeholder="">
      </div>
      <div><span class = "text-danger">*</span><span id = "persistQueueFullPathTip"></span></div>
   </div>
   
   <div class="form-group" id = "serverLogLevelDiv" >
      <label for="serverLogLevel" class="col-sm-3 control-label">服务器日志级别：</label>
      <div class="col-sm-4">
         <select id = "serverLogLevel" class="form-control input-sm" >
         	<%for(var i = 0 ; i < serverLogLevels.length ; i++){
         		if(i==0){
         	%>
         			<option selected = "selected" value = "<%=serverLogLevels[i]%>"><%=serverLogLevels[i]%></option>
         	<%
         		}else{
         	%>
         			<option value = "<%=serverLogLevels[i]%>"><%=serverLogLevels[i]%></option>
         	<%	
         		}
         	}%>
         </select>
      </div>
   </div>
   
   <div class="form-group" id = "serverLogTypeDiv" >
      <label for="serverLogType" class="col-sm-3 control-label">服务器日志类型：</label>
      <div class="col-sm-4">
         <select id = "serverLogType" class="form-control input-sm" >
         	<%
         		for(var i = 0 ; i < serverLogTypeList.length;i++){
         		   if(i==0){
            %>
            			<option selected = "selected" value = "<%=serverLogTypeList[i].key%>"><%=serverLogTypeList[i].value%></option>
            <%
         		   }else{
         	%>
         				<option value = "<%=serverLogTypeList[i].key%>"><%=serverLogTypeList[i].value%></option>
         	<%
         		   }
         		}
         	%>
         </select>
      </div>
   </div>
   
   
    <!--1.3新增，cache服务器日志类型只有两种,(按天，大小)-->
    <div class="form-group" id = "serverLogType4CacheDiv" >
      <label for="serverLogType4Cache" class="col-sm-3 control-label">服务器日志类型：</label>
      <div class="col-sm-4">
         <select id = "serverLogType4Cache" class="form-control input-sm" >
         	<option value="daily" selected="selected">按天记录</option>
			<option value="roll">按大小记录</option>
         </select>
      </div>
   </div>
   
   <!--1.3修改增加参数-->
   
   
   <input type = "hidden" id = "jvmMemory4Cache" value = "<%=cacheGroupMap.jvmMemory%>"/>
   
   <div class="form-group" id = "statisticsSyncTimeDiv" >
      <label for="statisticsSyncTime" class="col-sm-3 control-label">统计数据同步时间：</label>
      <div class="col-sm-4">
         <input type="text" id="statisticsSyncTime"  value = "<%=cacheGroupMap.statisticsSyncTime%>"  class="form-control input-sm"   placeholder="">
      </div>
      <div><span class = "text-danger">*</span><span class= "text-info">(单位:秒(s))</span><span id = "statisticsSyncTimeTip"></span></div>
   </div>
   
   <!--监控文件目标路径隐藏-->
   <input type="hidden" id="statisticsPath"  value = "<%=cacheGroupMap.statisticsPath%>"  class="form-control input-sm"   placeholder="">
   <!--监控文件目标路径隐藏-->
   
   
   
   <div class="form-group" id = "jvmHeapAlertDiv" >
      <label for="jvmHeapAlert" class="col-sm-3 control-label">JVM内存报警阈值(百分比)：</label>
      <div class="col-sm-4">
         <input type="text" id="jvmHeapAlert" value = "<%=cacheGroupMap.jvmHeapAlert%>"   class="form-control input-sm"   placeholder="">
      </div>
      <div><span class = "text-danger">*</span><span id = "jvmHeapAlertTip"></span></div>
   </div>
   
   
   <div class="form-group" id = "jvmHeapBlockDiv" >
      <label for="jvmHeapBlock" class="col-sm-3 control-label">JVM内存阻塞阈值(百分比)：</label>
      <div class="col-sm-4">
         <input type="text" id="jvmHeapBlock" value = "<%=cacheGroupMap.jvmHeapBlock%>"  class="form-control input-sm"   placeholder="">
      </div>
      <div><span class = "text-danger">*</span><span id = "jvmHeapBlockTip"></span></div>
   </div>
   
   
   <div class="form-group" id = "maxSize4StoreDiv" >
      <label for="maxSize4Store" class="col-sm-3 control-label">存储最大个数：</label>
      <div class="col-sm-4">
         <input type="text" id="maxSize4Store"  value = "<%=cacheGroupMap.maxSize4Store%>"  class="form-control input-sm"  placeholder="">
      </div>
      <div><span class = "text-danger">*</span><span id = "maxSize4StoreTip"></span></div>
   </div>
   
   <div class="form-group" id = "cacheNodeAlertDiv" >
      <label for="cacheNodeAlert" class="col-sm-3 control-label">存储报警阈值(个)：</label>
      <div class="col-sm-4">
         <input type="text" id="cacheNodeAlert"  value = "<%=cacheGroupMap.cacheNodeAlert%>" class="form-control input-sm"   placeholder="">
      </div>
      <div><span class = "text-danger">*</span><span id = "cacheNodeAlertTip"></span></div>
   </div>
   
   
</form>
	
<div class="form-group">
  <div class="col-sm-offset-2 col-sm-10">
     <button type="button" id = "addServerNext" class="btn btn-primary">下一步</button>
  </div>
</div>




