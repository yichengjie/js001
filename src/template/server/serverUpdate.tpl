<%
   if(configInfo.serverCategory==3){//上下文服务器
%>
	<input type="hidden" id="serverId"  value="<%=configInfo.serverId%>"></input>
	<input type="hidden" id="serverCategory" value="<%=configInfo.serverCategory%>" />
	<input type="hidden" id="serverName"   value="<%=configInfo.serverName%>" />
	<input type="hidden" id="rmiRegistryHost" value="<%=configInfo.serverIpShowUser%>" />
	
	<div class="form-group">
	  <div class="col-sm-10">
	     <button type="button" id = "updateContextServerInfoBtn" class="btn btn-primary">下一步</button>
	  </div>
	</div>
<%
   }else if (configInfo.serverCategory==4){//注册库
%>
	<br/>
	<form class="form-horizontal" id = "addServerForm"  role="form" method= "POST">
		<input type="hidden" id="serverId"  value="<%=configInfo.serverId%>"></input>
		<div class="form-group" >
		    <label for="groupNameShow" class="col-sm-3 control-label">服务库组名：</label>
		    <div class="col-sm-4">
		      	<input  type="text" id="groupNameShow" value = "<%=configInfo.groupNameShowUser%>"  class="form-control input-sm" readonly="readonly"  />
		      	<input  type="hidden" id="groupName" value = "<%=configInfo.groupName%>" />
		    </div>
	    </div>
	    
		<div class="form-group" id = "serverNameDiv" >
		    <label for="serverNameShow" class="col-sm-3 control-label">服务库名：</label>
		    <div class="col-sm-4">
		      <input  type="text" id="serverNameShow"  value = "<%=configInfo.serverName%>" class="form-control input-sm" readonly="readonly"  />
		      <input  type="hidden" id="serverName"  value = "<%=configInfo.serverName%>" />
		    </div>
	    </div>
	    
		<div class="form-group" id = "serverCategoryDiv" >
		    <label for="serverCategoryShow" class="col-sm-3 control-label">服务库类型：</label>
		    <div class="col-sm-4">
		      <input  type="text" id="serverCategoryShow" value = "服务库"  class="form-control input-sm" readonly="readonly"  />
		      <input  type="hidden" id="serverCategory" value = "<%=configInfo.serverCategory%>" />
		    </div>
	    </div>
	    
		<div class="form-group" id = "rmiRegistryHostDiv" >
		    <label for="rmiRegistryHostShow" class="col-sm-3 control-label">服务库IP：</label>
		    <div class="col-sm-4">
		      <input  type="text" id="rmiRegistryHostShow" value = "<%=configInfo.rmiRegistryHost%>"  class="form-control input-sm" readonly="readonly"  />
		      <input  type="hidden" id="rmiRegistryHost" value = "<%=configInfo.rmiRegistryHost%>" />
		    </div>
	    </div>
	    
	   <div class="form-group" id = "rmiRegistryPortDiv" >
	      <label for="rmiRegistryPort" class="col-sm-3 control-label">JMX Registry端口：</label>
	      <div class="col-sm-4">
	         <input type="text" id="rmiRegistryPort"  value = "<%=configInfo.rmiRegistryPort%>"  class="form-control input-sm"  placeholder="必填项，【1024~65535】之间数字">
	         <input type="hidden" id="orgirmiRegistryPort"  value = "<%=configInfo.rmiRegistryPort%>"  >
	      </div>
	      <div><span class = "text-danger">*</span><span id = "rmiRegistryPortTip"></span></div>
	   </div>
	   
	   <div class="form-group" id = "rmiServerPortDiv">
	      <label for="rmiServerPort" class="col-sm-3 control-label">JMX Server端口：</label>
	      <div class="col-sm-4">
	         <input type="text" id="rmiServerPort"  value = "<%=configInfo.rmiServerPort%>" class="form-control input-sm"  placeholder="必填项，【1024~65535】之间数字">
	         <input type="hidden" id="orgirmiServerPort"  value = "<%=configInfo.rmiServerPort%>" >
	      </div>
	      <div><span class = "text-danger">*</span><span id = "rmiServerPortTip" ></span></div>
	   </div>
	   
	   <div class="form-group" id = "sshPortDiv" >
	      <label for="sshPort" class="col-sm-3 control-label">OSGI Console端口：</label>
	      <div class="col-sm-4">
	         <input type="text" id="sshPort"  value = "<%=configInfo.sshPort%>"  class="form-control input-sm"  placeholder="必填项，【1024~65535】之间数字">
	         <input type="hidden" id="orgisshPort"  value = "<%=configInfo.sshPort%>"  >
	      </div>
	      <div><span class = "text-danger">*</span><span id = "sshPortTip"></span></div>
	   </div>
	   
	   <div class="form-group" id = "java_MemoryDiv" >
	      <label for="java_Memory" class="col-sm-3 control-label">堆内存大小：</label>
	      <div class="col-sm-4 ">
	         <input type="text" id="java_Memory" value = "<%=configInfo.java_Memory%>"   class="form-control input-sm" value="1536M"  placeholder="单位为kK,mM,gG">
	      </div>
	      <div><span>(单位:kK,mM,gG)</span><span id = "java_MemoryTip"></span></div>
	   </div>
	   
	   <div class="form-group" id = "java_Perm_MemDiv" >
	      <label for="java_Perm_Mem" class="col-sm-3 control-label">永久代堆大小：</label>
	      <div class="col-sm-4">
	         <input type="text" id="java_Perm_Mem"  value = "<%=configInfo.java_Perm_Mem%>"  class="form-control input-sm"  placeholder="单位为kK,mM,gG">
	      </div>
	      <div><span>(单位:kK,mM,gG)&nbsp;</span><span id = "java_Perm_MemTip"></span></div>
	   </div>
	   
	   <div class="form-group" id = "karaf_optsDiv" >
	      <label for="karaf_opts" class="col-sm-3 control-label">JVM扩展参数：</label>
	      <div class="col-sm-4">
	         <input type="text" id="karaf_opts" value = "<%=configInfo.karaf_opts%>"  class="form-control input-sm"  placeholder="配置的JVM参数超过系统内存值后将导致错误">
	      </div>
	      <div><span id = "karaf_optsTip"></span></div>
	   </div>
	   
	   
	   
	   
	   
	   
	   <div class="form-group" id = "heapDumpPathDiv" >
	      <label for="heapDumpPath" class="col-sm-3 control-label">堆内存快照的存储文件路径：</label>
	      <div class="col-sm-4">
	         <input type="text" id="heapDumpPath"  value = "<%=configInfo.heapDumpPath%>"  class="form-control input-sm"  placeholder="">
	      </div>
	      <div><span id = "heapDumpPathTip"></span></div>
	   </div>
	   
	   <div class="form-group" id = "gcFileDiv" >
	      <label for="gcFile" class="col-sm-3 control-label">GC日志的文件名和路径：</label>
	      <div class="col-sm-4">
	         <input type="text" id="gcFile" value = "<%=configInfo.gcFile%>"   class="form-control input-sm"  placeholder="JDK 7版本开始兼容">
	      </div>
	      <div><span id = "gcFileTip"></span></div>
	   </div>
	   
	   <div class="form-group" id = "gcRotationDiv" >
	      <label for="gcRotation" class="col-sm-3 control-label">GC日志自动转储：</label>
	      <div class="col-sm-4">
	      	 <select id="gcRotation"  class="form-control input-sm" placeholder="JDK 7版本开始兼容">
				<%
	      	 	 if(configInfo.gcRotation=="-XX:+UseGCLogFileRotation"){
	      	 	 %>
	      	 	 	<option selected = "selected"  value="-XX:+UseGCLogFileRotation">true</option>
	      	 	 	<option value="" >false</option>
	      	 	 <%
	      	 	 }else if(""==configInfo.gcRotation) {
	      	 	 %>
	      	 	 	<option value="-XX:+UseGCLogFileRotation">true</option>
	      	 	 	<option selected = "selected" value="" selected="selected">false</option>
	      	 	 <%
	      	 	 }
	      	 	%>
			 </select>
	      </div>
	       <div><span id = "gcRotationTip"></span></div>
	   </div>
	   
	   <div class="form-group" id = "gcFileNumDiv" >
	      <label for="gcFileNum" class="col-sm-3 control-label">GC日志绕接数目：</label>
	      <div class="col-sm-4">
	         <input type="text" id="gcFileNum"  value = "<%=configInfo.gcFileNum%>"  class="form-control input-sm"  placeholder="JDK 7版本开始兼容">
	      </div>
	      <div><span id = "gcFileNumTip"></span></div>
	   </div>
	    
	   <div class="form-group" id = "gcFileSizeDiv" >
	      <label for="gcFileSize" class="col-sm-3 control-label">GC日志大小：</label>
	      <div class="col-sm-4">
	         <input type="text" id="gcFileSize"  value = "<%=configInfo.gcFileSize%>"  class="form-control input-sm"  placeholder="单位为k,K,m,M,g,G">
	      </div>
	      <div><span>(单位:k,K,m,M,g,G)&nbsp;</span><span id = "gcFileSizeTip"></span></div>
	   </div> 
	   
	   <div class="form-group" id = "bindPortDiv" >
	      <label for="bindPort" class="col-sm-3 control-label">监听端口：</label>
	      <div class="col-sm-4">
	         <input type="text" id="bindPort"  value = "<%=configInfo.bindPort%>"  class="form-control input-sm"  placeholder="必填项，【1024~65535】之间数字" />
	         <input type="hidden" id="orgibindPort"  value = "<%=configInfo.bindPort%>" />
	      </div>
	      <div><span class = "text-danger">*</span><span id = "bindPortTip"></span></div>
	   </div>
	   
	   
	   
	   
	   
	   
	     
	   <div class="form-group" id = "synchTimeDiv" >
	      <label for="synchTime" class="col-sm-3 control-label">注册库同步间隔：</label>
	      <div class="col-sm-4">
	         <input type="text" id="synchTime" value = "<%=configInfo.synchTime%>"   class="form-control input-sm" value="5" placeholder="必填项，单位：秒（s）" />
	      </div>
	      <div><span class = "text-danger">*</span><span>(单位：秒(s))&nbsp;</span><span id = "synchTimeTip"></span></div>
	   </div>
	   
	   <div class="form-group" id = "maxIdleTimeDiv" >
	      <label for="maxIdleTime" class="col-sm-3 control-label">JCF服务器失效超时：</label>
	      <div class="col-sm-4">
	         <input type="text" id="maxIdleTime" value = "<%=configInfo.maxIdleTime%>"   class="form-control input-sm" value="180" placeholder="必填项，单位：秒（s）" />
	      </div>
	      <div><span class = "text-danger">*</span><span>(单位：秒(s))&nbsp;</span><span  id = "maxIdleTimeTip" ></span></div>
	   </div>
	   
	   
	   
	   
	   <div class="form-group" id = "serverLogLevelDiv" >
	      <label for="serverLogLevel" class="col-sm-3 control-label">服务日志级别：</label>
	      <div class="col-sm-4">
	         <select id = "serverLogLevel" class="form-control input-sm" >
	         	 <%
	         	  for(var i = 0 ; i < serverLogLevels.length ;i ++){
	         	    var curll = serverLogLevels[i] ;
	         		if(curll==configInfo.serverLogLevel){
	         		%>
	         			<option selected = "selected" value = "<%=curll%>" ><%=curll%></option>
	         		<%
	         		}else {
	         		%>
	         			<option  value = "<%=curll%>" ><%=curll%></option>
	         		<%
	         		}
	         	  }
	         	%>
	         </select>
	      </div>
	   </div>
	   
	   <div class="form-group" id = "serverLogTypeDiv" >
	      <label for="serverLogType" class="col-sm-3 control-label">服务器日志类型：</label>
	      <div class="col-sm-4">
	         <select id = "serverLogType" class="form-control input-sm" >
	         	<%
	         	  for(var i = 0 ; i < serverLogTypeList.length ;i ++){
	         	  	var curlt = serverLogTypeList[i] ;
	         		if(curlt.key==configInfo.serverLogType){
	         		%>
	         			<option selected = "selected"  value = "<%=curlt.key%>" ><%=curlt.value%></option>
	         		<%
	         		}else {
	         		%>
	         			<option  value = "<%=curlt.key%>" ><%=curlt.value%></option>
	         		<%
	         		}
	         	  }
	         	%>
	         </select>
	      </div>
	   </div>
	   
	   
	</form>
	
	<div class="form-group">
	  <div class="col-sm-offset-2 col-sm-10">
	     <button type="button" id = "updateRegistryServerInfoBtn"  class="btn btn-primary"><%=submitBtnInfo%></button>
	  </div>
	</div>
<%   
   }else if(configInfo.serverCategory==7){
   	%>
   	 <form class="form-horizontal" id = "addServerForm"  role="form" method= "POST">
   	 	<input type = "hidden" id = "jvmMemory4Cache" value = "<%=configInfo.jvmMemory4Cache%>"/>
		<input id="serverId" type="hidden" value="<%=configInfo.serverId%>"></input>
		<input id="groupNameText" type="hidden" value="<%=configInfo.groupNameShowUser%>"></input>
		 <div class="form-group" >
		    <label for="groupNameShow" class="col-sm-3 control-label">JCF服务器组名：</label>
		    <div class="col-sm-4">
		      <input  type="text" id="groupNameShow" value = "<%=configInfo.groupNameShowUser%>"  class="form-control input-sm" readonly="readonly"  />
		      <input  type="hidden" id="groupName" value = "<%=configInfo.groupName%>"  />
		    </div>
	    </div>
	    
		<div class="form-group"  >
		    <label for="serverNameShow" class="col-sm-3 control-label">JCF服务器名：</label>
		    <div class="col-sm-4">
		      <input  type="text" id="serverNameShow" value = "<%=configInfo.serverName%>" class="form-control input-sm" readonly="readonly"  />
		      <input  type="hidden" id="serverName" value = "<%=configInfo.serverName%>"  />
		    </div>
	    </div>
	    
		<div class="form-group" >
		    <label for="serverCategoryShow" class="col-sm-3 control-label">JCF服务器类型：</label>
		    <div class="col-sm-4">
		      <input  type="text" id="serverCategoryShow" value = "JCF服务器" class="form-control input-sm" readonly="readonly"  />
		   	  <input  type="hidden" id="serverCategory" value = "<%=configInfo.serverCategory%>"  />
		    </div>
	    </div>
	    
	    <div class="form-group" id = "rmiRegistryHostDiv" >
		    <label for="rmiRegistryHostShow" class="col-sm-3 control-label">JCF服务器IP：</label>
		    <div class="col-sm-4">
		      <input  type="text" id="rmiRegistryHostShow" value = "<%=configInfo.rmiRegistryHost%>" class="form-control input-sm" readonly="readonly"  />
		      <input  type="hidden" id="rmiRegistryHost" value = "<%=configInfo.rmiRegistryHost%>"  />
		    </div>
	    </div>
	    
	    <div class="form-group" id = "serverLogLevelDiv" >
	      <label for="serverLogLevel" class="col-sm-3 control-label">服务日志级别：</label>
	      <div class="col-sm-4">
	         <select id = "serverLogLevel" class="form-control input-sm" >
	         	<%
	         	  for(var i = 0 ; i < serverLogLevels.length ;i ++){
	         	    var curll = serverLogLevels[i] ;
	         		if(curll==configInfo.serverLogLevel){
	         		%>
	         			<option selected = "selected" value = "<%=curll%>" ><%=curll%></option>
	         		<%
	         		}else {
	         		%>
	         			<option  value = "<%=curll%>" ><%=curll%></option>
	         		<%
	         		}
	         	  }
	         	%>
	         </select>
	      </div>
	     </div>
	     
	     <div class="form-group" id = "serverLogTypeDiv" >
	      <label for="serverLogType" class="col-sm-3 control-label">服务器日志类型：</label>
	      <div class="col-sm-4">
	         <select id = "serverLogType" class="form-control input-sm" >
	         	<option value="daily" <%if(configInfo.serverLogType=='daily'){%>selected="selected"<%}%>>按天记录</option>
				<option value="roll" <%if(configInfo.serverLogType=='roll'){%>selected="selected"<%}%>>按大小记录</option>
	         </select>
	      </div>
	    </div>
	    
	   <div class="form-group" id = "statisticsSyncTimeDiv" >
	      <label for="statisticsSyncTime" class="col-sm-3 control-label">统计数据同步时间：</label>
	      <div class="col-sm-4">
	         <input type="text" id="statisticsSyncTime" value = "<%=configInfo.statisticsSyncTime%>"  class="form-control input-sm" value="60"  placeholder="">
	      </div>
	      <div><span class = "text-danger">*</span><span class= "text-info">(单位:秒(s))</span><span id = "statisticsSyncTimeTip"></span></div>
	   </div>
	   
	   <!--监控文件目标路径隐藏-->
	   <input type="hidden" id="statisticsPath" value = "<%=configInfo.statisticsPath%>"  class="form-control input-sm" value="../monitor/"  placeholder="">
	   <!--监控文件目标路径隐藏-->
	   
	   
	   <div class="form-group" id = "jvmHeapAlertDiv" >
	      <label for="jvmHeapAlert" class="col-sm-3 control-label">JVM内存报警阈值(百分比)：</label>
	      <div class="col-sm-4">
	         <input type="text" id="jvmHeapAlert" value = "<%=configInfo.jvmHeapAlert%>"  class="form-control input-sm" value="60"  placeholder="">
	      </div>
	      <div><span class = "text-danger">*</span><span id = "jvmHeapAlertTip"></span></div>
	   </div>
	   
	   
	   <div class="form-group" id = "jvmHeapBlockDiv" >
	      <label for="jvmHeapBlock" class="col-sm-3 control-label">JVM内存阻塞阈值(百分比)：</label>
	      <div class="col-sm-4">
	         <input type="text" id="jvmHeapBlock" value = "<%=configInfo.jvmHeapBlock%>"  class="form-control input-sm" value="85"  placeholder="">
	      </div>
	      <div><span class = "text-danger">*</span><span id = "jvmHeapBlockTip"></span></div>
	   </div>
	   
	   
	   <div class="form-group" id = "maxSize4StoreDiv" >
	      <label for="maxSize4Store" class="col-sm-3 control-label">存储最大个数：</label>
	      <div class="col-sm-4">
	         <input type="text" id="maxSize4Store" value = "<%=configInfo.maxSize4Store%>"  class="form-control input-sm" value="1000"  placeholder="">
	      </div>
	      <div><span class = "text-danger">*</span><span id = "maxSize4StoreTip"></span></div>
	   </div>
	   
	   <div class="form-group" id = "cacheNodeAlertDiv" >
	      <label for="cacheNodeAlert" class="col-sm-3 control-label">存储报警阈值(个)：</label>
	      <div class="col-sm-4">
	         <input type="text" id="cacheNodeAlert"  value = "<%=configInfo.cacheNodeAlert%>" class="form-control input-sm" value="600"  placeholder="">
	      </div>
	      <div><span class = "text-danger">*</span><span id = "cacheNodeAlertTip"></span></div>
	   </div>
	    
	  </form>  
	<div class="form-group">
	  <div class="col-sm-offset-2 col-sm-10">
	     <button type="button" id = "updateJCFCacheServerInfoBtn" class="btn btn-primary"><%=submitBtnInfo%></button>
	  </div>
	</div>
		
   	<%
   }else if(configInfo.serverCategory==1||configInfo.serverCategory==2){
%>
	<br/>
	<form class="form-horizontal" id = "addServerForm"  role="form" method= "POST">
		<input id="serverId" type="hidden" value="<%=configInfo.serverId%>"></input>
		 <div class="form-group" >
		    <label for="groupNameShow" class="col-sm-3 control-label">JCF服务器组名：</label>
		    <div class="col-sm-4">
		      <input  type="text" id="groupNameShow" value = "<%=configInfo.groupNameShowUser%>"  class="form-control input-sm" readonly="readonly"  />
		      <input  type="hidden" id="groupName" value = "<%=configInfo.groupName%>"  />
		    </div>
	    </div>
	    
		<div class="form-group"  >
		    <label for="serverNameShow" class="col-sm-3 control-label">JCF服务器名：</label>
		    <div class="col-sm-4">
		      <input  type="text" id="serverNameShow" value = "<%=configInfo.serverName%>" class="form-control input-sm" readonly="readonly"  />
		      <input  type="hidden" id="serverName" value = "<%=configInfo.serverName%>"  />
		    </div>
	    </div>
	    
		<div class="form-group" >
		    <label for="serverCategoryShow" class="col-sm-3 control-label">JCF服务器类型：</label>
		    <div class="col-sm-4">
		      <input  type="text" id="serverCategoryShow" value = "JCF服务器" class="form-control input-sm" readonly="readonly"  />
		   	  <input  type="hidden" id="serverCategory" value = "<%=configInfo.serverCategory%>"  />
		    </div>
	    </div>
	    
	    <div class="form-group" id = "rmiRegistryHostDiv" >
		    <label for="rmiRegistryHostShow" class="col-sm-3 control-label">JCF服务器IP：</label>
		    <div class="col-sm-4">
		      <input  type="text" id="rmiRegistryHostShow" value = "<%=configInfo.rmiRegistryHost%>" class="form-control input-sm" readonly="readonly"  />
		      <input  type="hidden" id="rmiRegistryHost" value = "<%=configInfo.rmiRegistryHost%>"  />
		    </div>
	    </div>
	    
	    
	    <div class="form-group" id = "rmiRegistryPortDiv" >
	       <label for="rmiRegistryPort" class="col-sm-3 control-label">JMX Registry端口：</label>
	       <div class="col-sm-4">
	         <input type="text" id="rmiRegistryPort" value = "<%=configInfo.rmiRegistryPort%>"  class="form-control input-sm"  placeholder="必填项，【1024~65535】之间数字">
	         <input type="hidden" id="orgirmiRegistryPort" value = "<%=configInfo.rmiRegistryPort%>" >
	       </div>
	       <div><span class = "text-danger">*</span><span id = "rmiRegistryPortTip"></span></div>
	    </div>
	    
	    <div class="form-group" id = "rmiServerPortDiv">
	      <label for="rmiServerPort" class="col-sm-3 control-label">JMX Server端口：</label>
	      <div class="col-sm-4">
	         <input type="text" id="rmiServerPort" value = "<%=configInfo.rmiServerPort%>" class="form-control input-sm"  placeholder="必填项，【1024~65535】之间数字">
	      	 <input type="hidden" id="orgirmiServerPort" value = "<%=configInfo.rmiServerPort%>" >
	      </div>
	      <div><span class = "text-danger">*</span><span id = "rmiServerPortTip" ></span></div>
	    </div>
	    
	    <div class="form-group" id= "httpPortDiv" >
	       <label for="httpPort" class="col-sm-3 control-label">HTTP端口：</label>
	       <div class="col-sm-4">
	          <input type="text" id="httpPort"  value = "<%=configInfo.httpPort%>" class="form-control input-sm"  placeholder="必填项，【1024~65535】之间数字">
	       	  <input type="hidden" id="orgihttpPort" value = "<%=configInfo.httpPort%>" >
	       </div>
	       <div><span class = "text-danger">*</span><span id = "httpPortTip"></span></div>
	    </div>
	    
	    <div class="form-group" id = "sshPortDiv" >
	      <label for="sshPort" class="col-sm-3 control-label">OSGI Console端口：</label>
	      <div class="col-sm-4">
	         <input type="text" id="sshPort"  value = "<%=configInfo.sshPort%>" class="form-control input-sm"  placeholder="必填项，【1024~65535】之间数字">
	      	 <input type="hidden" id="orgisshPort" value = "<%=configInfo.sshPort%>" >
	      </div>
	      <div><span class = "text-danger">*</span><span id = "sshPortTip"></span></div>
	    </div>
	    
	    <div class="form-group" id = "java_MemoryDiv" >
	      <label for="java_Memory" class="col-sm-3 control-label">堆内存大小：</label>
	      <div class="col-sm-4 ">
	         <input type="text" id="java_Memory"  value = "<%=configInfo.java_Memory%>" class="form-control input-sm" value="1536M"  placeholder="单位为kK,mM,gG">
	      </div>
	      <div><span>(单位:kK,mM,gG)&nbsp;</span><span id = "java_MemoryTip"></span></div>
	    </div>
	    
	    <div class="form-group" id = "java_Max_Perm_MemDiv" >
	      <label for="java_Max_Perm_Mem" class="col-sm-3 control-label">永久代堆大小：</label>
	      <div class="col-sm-4">
	         <input type="text" id="java_Max_Perm_Mem"  value = "<%=configInfo.java_Max_Perm_Mem%>" class="form-control input-sm"  placeholder="单位为kK,mM,gG">
	      </div>
	      <div><span>(单位:kK,mM,gG)&nbsp;</span><span id = "java_Max_Perm_MemTip"></span></div>
	    </div>
	    
	    <div class="form-group" id = "karaf_optsDiv" >
	      <label for="karaf_opts" class="col-sm-3 control-label">JVM扩展参数：</label>
	      <div class="col-sm-4">
	         <input type="text" id="karaf_opts" value = "<%=configInfo.karaf_opts%>" class="form-control input-sm"  placeholder="配置的JVM参数超过系统内存值后将导致错误">
	      </div>
	      <div><span id = "karaf_optsTip"></span></div>
	    </div>
	    
	    <div class="form-group" id = "direct_mem_sizeDiv" >
	      <label for="direct_mem_size" class="col-sm-3 control-label">最大可分配系统内存：</label>
	      <div class="col-sm-4">
	         <input type="text" id="direct_mem_size" value = "<%=configInfo.direct_mem_size%>" class="form-control input-sm"  placeholder="不建议配置">
	      </div>
	      <div><span class = "text-info">(单位:kK,mM,gG)&nbsp;</span><span id = "direct_mem_sizeTip"></span></div>
	    </div>
	    
	    <div class="form-group" id = "gcoptionsDiv" >
	      <label for="gcoptions" class="col-sm-3 control-label">GC选项：</label>
	      <div class="col-sm-4">
	         <input type="text" id="gcoptions" value = "<%=configInfo.gcoptions%>" class="form-control input-sm"  placeholder="">
	      </div>
	      <div><span id = "gcoptionsTip"></span></div>
	    </div>
	    
	    
	    
	    
	    
	    
	    
	    
	    <div class="form-group" id = "heapDumpPathDiv" >
	      <label for="heapDumpPath" class="col-sm-3 control-label">堆内存快照的存储文件路径：</label>
	      <div class="col-sm-4">
	         <input type="text" id="heapDumpPath" value = "<%=configInfo.heapDumpPath%>"  class="form-control input-sm"  placeholder="">
	      </div>
	      <div><span id = "heapDumpPathTip"></span></div>
	    </div>
	    
	    <div class="form-group" id = "gcFileDiv" >
	      <label for="gcFile" class="col-sm-3 control-label">GC日志的文件名和路径：</label>
	      <div class="col-sm-4">
	         <input type="text" id="gcFile"  value = "<%=configInfo.gcFile%>" class="form-control input-sm"  placeholder="JDK 7版本开始兼容">
	      </div>
	      <div><span id = "gcFileTip"></span></div>
	    </div>
	    
	    <div class="form-group" id = "gcRotationDiv" >
	       <label for="gcRotation" class="col-sm-3 control-label">GC日志自动转储：</label>
	       <div class="col-sm-4">
	      	 <select id="gcRotation"  class="form-control input-sm" placeholder="JDK 7版本开始兼容">
	      	 	<%
	      	 	 if(configInfo.gcRotation=="-XX:+UseGCLogFileRotation"){
	      	 	 %>
	      	 	 	<option selected = "selected"  value="-XX:+UseGCLogFileRotation">true</option>
	      	 	 	<option value="" >false</option>
	      	 	 <%
	      	 	 }else if(""==configInfo.gcRotation){
	      	 	 %>
	      	 	 	<option value="-XX:+UseGCLogFileRotation">true</option>
	      	 	 	<option selected = "selected" value="" selected="selected">false</option>
	      	 	 <%
	      	 	 }
	      	 	%>
			 </select>
	       </div>
	       <div><span id = "gcRotationTip"></span></div>
	    </div>
	    
	    <div class="form-group" id = "gcFileNumDiv" >
	      <label for="gcFileNum" class="col-sm-3 control-label">GC日志绕接数目：</label>
	      <div class="col-sm-4">
	         <input type="text" id="gcFileNum"  value = "<%=configInfo.gcFileNum%>" class="form-control input-sm"  placeholder="JDK 7版本开始兼容">
	      </div>
	      <div><span id = "gcFileNumTip"></span></div>
	    </div>
	    
	    <div class="form-group" id = "gcFileSizeDiv" >
	      <label for="gcFileSize" class="col-sm-3 control-label">GC日志大小：</label>
	      <div class="col-sm-4">
	         <input type="text" id="gcFileSize" value = "<%=configInfo.gcFileSize%>"  class="form-control input-sm"  placeholder="单位为k,K,m,M,g,G">
	      </div>
	      <div><span>(单位:kK,mM,gG)</span><span id = "gcFileSizeTip"></span></div>
	    </div>
	    
	    
	    
	    
	    
	    
	    
	    
	    
	    
	    <div class="form-group" id = "bindPortDiv" >
	      <label for="bindPort" class="col-sm-3 control-label">监听端口：</label>
	      <div class="col-sm-4">
	         <input type="text" id="bindPort" value = "<%=configInfo.bindPort%>"  class="form-control input-sm"  placeholder="必填项，【1024~65535】之间数字" />
	         <input type="hidden" id="orgibindPort" value = "<%=configInfo.bindPort%>" />
	      </div>
	      <div><span class = "text-danger">*</span><span id = "bindPortTip"></span></div>
	    </div>
	    
	    <div class="form-group" id = "loadFactorDiv">
	      <label for="loadFactor" class="col-sm-3 control-label">负载均衡因子：</label>
	      <div class="col-sm-4">
	         <input type="text" id="loadFactor" value = "<%=configInfo.loadFactor%>" class="form-control input-sm" value="1"  placeholder="必填项,正整数">
	      </div>
	      <div><span class = "text-danger">*</span><span id = "loadFactorTip"></span></div>
	    </div>
	   
	    <div class="form-group" id = "memoryPoolSizeDiv" >
	      <label for="memoryPoolSize" class="col-sm-3 control-label">系统内存池的大小：</label>
	      <div class="col-sm-4">
	         <input type="text" id="memoryPoolSize"  value = "<%=configInfo.memoryPoolSize%>" class="form-control input-sm" value="0"  placeholder="必填项目，单位：M">
	      </div>
	      <div><span class = "text-danger">*</span><span>(单位:M)&nbsp;</span><span  id = "memoryPoolSizeTip"></span></div>
	    </div>
	    
	    <div class="form-group" id = "blockSizeDiv" >
	      <label for="blockSize" class="col-sm-3 control-label">系统内存块大小：</label>
	      <div class="col-sm-4">
	         <input type="text" id="blockSize" value = "<%=configInfo.blockSize%>" class="form-control input-sm"  value="8" placeholder="必填项，单位：KB">
	      </div>
	      <div><span class = "text-danger">*</span><span>(单位:KB)&nbsp;</span><span id = "blockSizeTip"></span></div>
	    </div>
	    
	    <div class="form-group" id = "heapMessageLimitDiv" >
	      <label for="heapMessageLimit" class="col-sm-3 control-label">JVM内存中消息体最大值：</label>
	      <div class="col-sm-4">
	         <input type="text" id="heapMessageLimit" value = "<%=configInfo.heapMessageLimit%>"  class="form-control input-sm" value="-1" placeholder="必填项，单位：Byte">
	      </div>
	      <div><span class = "text-danger">*</span><span>(单位:Byte)&nbsp;</span><span id = "heapMessageLimitTip"></span></div>
	    </div>
	    
	    <div class="form-group" id = "channelQueueSizeDiv" >
	      <label for="channelQueueSize" class="col-sm-3 control-label">发送队列大小：</label>
	      <div class="col-sm-4">
	         <input type="text" id="channelQueueSize" value = "<%=configInfo.channelQueueSize%>"  class="form-control input-sm" value="2048"  placeholder="必填项">
	      </div>
	      <div><span class = "text-danger">*</span><span id = "channelQueueSizeTip"></span></div>
	    </div>
	    
	    <div class="form-group" id = "channelConcurrentDiv" >
	      <label for="channelConcurrent" class="col-sm-3 control-label">连接并发数：</label>
	      <div class="col-sm-4">
	         <input type="text" id="channelConcurrent" value = "<%=configInfo.channelConcurrent%>"  class="form-control input-sm"  value="2" placeholder="必填项">
	      </div>
	      <div><span class = "text-danger">*</span><span id = "channelConcurrentTip"></span></div>
	    </div>
	    
	    <div class="form-group" id = "connectionRetryDiv" >
	      <label for="connectionRetry" class="col-sm-3 control-label">链接重试次数：</label>
	      <div class="col-sm-4">
	         <input type="text" id="connectionRetry"  value = "<%=configInfo.connectionRetry%>" class="form-control input-sm"  value="3" placeholder="必填项">
	      </div>
	      <div><span class = "text-danger">*</span><span id = "connectionRetryTip"></span></div>
	    </div>
	    
	    <div class="form-group" id = "heartBeatTimeDiv" >
	      <label for="heartBeatTime" class="col-sm-3 control-label">JCF服务器通信的心跳间隔：</label>
	      <div class="col-sm-4">
	         <input type="text" id="heartBeatTime"  value = "<%=configInfo.heartBeatTime%>" class="form-control input-sm" value="30"  placeholder="必填项，单位：秒（s）">
	      </div>
	      <div><span class = "text-danger">*</span><span>单位：秒(s)&nbsp;</span><span id = "heartBeatTimeTip"></span></div>
	    </div>
	    
	    
	    <input type="hidden" id="messageBodyLimit"  value = "<%=configInfo.messageBodyLimit%>" />
	    
	    
	    <div class="form-group" id = "registryIpDiv" >
	      <label for="registryIp" class="col-sm-3 control-label">注册库IP：</label>
	      <div class="col-sm-4">
	         <select id = "registryIp" class="form-control input-sm">
	         	<%
	         		for(var i= 0 ; i < nodeIpList.length ; i ++){
	         			var curVo = nodeIpList[i] ;
	         			var curIp = curVo.serverIp ;
	         			if(curIp==configInfo.registryIp){
	         			%>
	         				<option selected = "selected" value = "<%=curVo.serverIp%>" ><%=curVo.serverIp%></option>
	         			<%
	         			}else{
	         			%>
	         				<option value = "<%=curVo.serverIp%>" ><%=curVo.serverIp%></option>
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
	         <input type="text" id="registryPort" value = "<%=configInfo.registryPort%>"  class="form-control input-sm"  placeholder="必填项，【1024~65535】之间数字">
	      </div>
	      <div><span class = "text-danger">*</span><span id = "registryPortTip"></span></div>
	    </div>
	    
	    <div class="form-group" id = "synchTimeDiv" >
	      <label for="synchTime" class="col-sm-3 control-label">注册库同步间隔：</label>
	      <div class="col-sm-4">
	         <input type="text" id="synchTime"  value = "<%=configInfo.synchTime%>"   class="form-control input-sm" value="5" placeholder="必填项，单位：秒（s）">
	      </div>
	      <div><span class = "text-danger">*</span><span id = "synchTimeTip"></span></div>
	    </div>
	    
	    
	    
	    
	    
	    
	    
	    <div class="form-group" id = "auditLevelDiv" >
	      <label for="auditLevel" class="col-sm-3 control-label">跟踪带日志输出规则：</label>
	      <div class="col-sm-4">
	      	 <select id="auditLevel" class="form-control input-sm" >
	      	 	<%for(var i = 0 ; i < tracLogKeyList.length ; i ++){
	      	 		if(configInfo.auditLevel==""){
	      	 			if(i==0){
			      	 		%><option selected = "selected" value="<%=tracLogKeyList[i]%>"><%=tracLogValueList[i]%></option><%
			      	 	}else{
			      	 		%><option value="<%=tracLogKeyList[i]%>"><%=tracLogValueList[i]%></option><%
			      	 	}
	      	 		}else {
	      	 			if(configInfo.auditLevel==tracLogKeyList[i]){
	      	 				%><option selected = "selected" value="<%=tracLogKeyList[i]%>"><%=tracLogValueList[i]%></option><%
	      	 			}else{
	      	 				%><option  value="<%=tracLogKeyList[i]%>"><%=tracLogValueList[i]%></option><%
	      	 			}
	      	 		}
	      	 	}%>
			 </select>
	      </div>
	   </div>
	    
	    
	    <div class="form-group" id = "persistQueueFullPathDiv" >
	      <label for="persistQueueFullPath" class="col-sm-3 control-label">服务器持久化队列文件保存路径：</label>
	      <div class="col-sm-4">
	         <input type="text" id="persistQueueFullPath" value = "<%=configInfo.persistQueueFullPath%>"  class="form-control input-sm" value="/opt/applog/jcf/"  placeholder="">
	      </div>
	      <div><span class = "text-danger">*</span><span id = "persistQueueFullPathTip"></span></div>
	    </div>
	    
	    <div class="form-group" id = "serverLogLevelDiv" >
	      <label for="serverLogLevel" class="col-sm-3 control-label">服务日志级别：</label>
	      <div class="col-sm-4">
	         <select id = "serverLogLevel" class="form-control input-sm" >
	         	<%
	         	  for(var i = 0 ; i < serverLogLevels.length ;i ++){
	         	    var curll = serverLogLevels[i] ;
	         		if(curll==configInfo.serverLogLevel){
	         		%>
	         			<option selected = "selected" value = "<%=curll%>" ><%=curll%></option>
	         		<%
	         		}else {
	         		%>
	         			<option  value = "<%=curll%>" ><%=curll%></option>
	         		<%
	         		}
	         	  }
	         	%>
	         </select>
	      </div>
	    </div>
	    
	    <div class="form-group" id = "serverLogTypeDiv" >
	      <label for="serverLogType" class="col-sm-3 control-label">服务器日志类型：</label>
	      <div class="col-sm-4">
	         <select id = "serverLogType" class="form-control input-sm" >
	         	<%
	         	  for(var i = 0 ; i < serverLogTypeList.length ;i ++){
	         	  	var curlt = serverLogTypeList[i] ;
	         		if(curlt.key==configInfo.serverLogType){
	         		%>
	         			<option selected = "selected"  value = "<%=curlt.key%>" ><%=curlt.value%></option>
	         		<%
	         		}else {
	         		%>
	         			<option  value = "<%=curlt.key%>" ><%=curlt.value%></option>
	         		<%
	         		}
	         	  }
	         	%>
	         </select>
	      </div>
	    </div>
	    
	    
	    
	</form>
	<div class="form-group">
	  <div class="col-sm-offset-2 col-sm-10">
	     <button type="button" id = "updateJCFServerInfoBtn" class="btn btn-primary"><%=submitBtnInfo%></button>
	  </div>
	</div>
<%   
   }
%>