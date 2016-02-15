<br/>
<form class="form-horizontal" role="form">
   <input type="hidden" id="serverId" value="<%=configureInfo.serverId%>"/>
   <input type = "hidden" id = "groupId" value ="<%=groupId%>"/>
   <input type = "hidden" id = "serverCategory" value ="<%=serverCategory%>"/>
   
   <div class="form-group" id = "java_MemoryDiv" >
      <label for="java_Memory" class="col-sm-3 control-label">堆内存大小：</label>
      <div class="col-sm-4">
        <input type="text" id="java_Memory"  value = "<%=configureInfo.java_Memory%>"  class="form-control input-sm"  placeholder="单位只能为kK,mM,gG" />
      </div>
      <div><span class = "text-info">(单位:kK,mM,gG)&nbsp;</span><span id = "java_MemoryTip"></span></div>
   </div>

   <div class="form-group" id = "java_Perm_MemDiv" >
      <label for="java_Perm_Mem" class="col-sm-3 control-label">永久代堆大小：</label>
      <div class="col-sm-4">
        <input type="text" id="java_Perm_Mem" value = "<%=configureInfo.java_Perm_Mem%>"   class="form-control input-sm"  placeholder="单位只能为kK,mM,gG" />
      </div>
      <div><span class = "text-info">(单位:kK,mM,gG)&nbsp;</span><span id = "java_Perm_MemTip"></span></div>
   </div>

   <div class="form-group" id = "karaf_optsDiv" >
      <label for="karaf_opts" class="col-sm-3 control-label">JVM扩展参数：</label>
      <div class="col-sm-4">
        <input type="text" id="karaf_opts" value = "<%=configureInfo.karaf_opts%>"   class="form-control input-sm"  placeholder="必配置JVM参数超过系统内存值后将导致错误" />
      </div>
      <div><span id = "karaf_optsTip"></span></div>
   </div>
   
   <!--组配置增加页面控件开始-------------------------------->
   <!--堆内存快照-->
   
   <div class="form-group" id = "heapDumpPathDiv" >
      <label for="heapDumpPath" class="col-sm-3 control-label">堆内存快照的存储文件路径：</label>
      <div class="col-sm-4">
         <input type="text" id="heapDumpPath"  value = "<%=configureInfo.heapDumpPath%>"  class="form-control input-sm"  placeholder="">
      </div>
      <div><span id = "heapDumpPathTip"></span></div>
   </div>
	   
   <div class="form-group" id = "gcFileDiv" >
      <label for="gcFile" class="col-sm-3 control-label">GC日志的文件名和路径：</label>
      <div class="col-sm-4">
         <input type="text" id="gcFile" value = "<%=configureInfo.gcFile%>"   class="form-control input-sm"  placeholder="JDK 7版本开始兼容">
      </div>
      <div><span id = "gcFileTip"></span></div>
   </div>
	   
   <div class="form-group" id = "gcRotationDiv" >
      <label for="gcRotation" class="col-sm-3 control-label">GC日志自动转储：</label>
      <div class="col-sm-4">
      	 <select id="gcRotation"  class="form-control input-sm" placeholder="JDK 7版本开始兼容">
			<%
      	 	 if(configureInfo.gcRotation=="-XX:+UseGCLogFileRotation"){
      	 	 %>
      	 	 	<option selected = "selected"  value="-XX:+UseGCLogFileRotation">true</option>
      	 	 	<option value="" >false</option>
      	 	 <%
      	 	 }else if(""==configureInfo.gcRotation) {
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
         <input type="text" id="gcFileNum"  value = "<%=configureInfo.gcFileNum%>"  class="form-control input-sm"  placeholder="JDK 7版本开始兼容">
      </div>
      <div><span id = "gcFileNumTip"></span></div>
   </div>
	    
   <div class="form-group" id = "gcFileSizeDiv" >
      <label for="gcFileSize" class="col-sm-3 control-label">GC日志大小：</label>
      <div class="col-sm-4">
         <input type="text" id="gcFileSize"  value = "<%=configureInfo.gcFileSize%>"  class="form-control input-sm"  placeholder="单位为k,K,m,M,g,G">
      </div>
      <div><span class = "text-info">(单位:k,K,m,M,g,G)&nbsp;</span><span id = "gcFileSizeTip"></span></div>
   </div> 
	   
   
   <!--监听端口-->
   <!--组配置增加页面控件结束-------------------------------->
   
   
   <div class="form-group" id = "synchTimeDiv" >
      <label for="synchTime" class="col-sm-3 control-label">注册库同步时间隔：</label>
      <div class="col-sm-4">
        <input type="text" id="synchTime"  value = "<%=configureInfo.synchTime%>" class="form-control input-sm"  placeholder="必填项，正整数" />
      </div>
      <div><span class = "text-info">(单位:秒)</span><span class = "text-danger">*</span><span id = "synchTimeTip"></span></div>
   </div>
   
   <div class="form-group" id = "maxIdleTimeDiv" >
      <label for="maxIdleTime" class="col-sm-3 control-label">JCF服务器失效超时：</label>
      <div class="col-sm-4">
        <input type="text" id="maxIdleTime" value = "<%=configureInfo.maxIdleTime%>"  class="form-control input-sm"  placeholder="必填项，正整数" />
      </div>
      <div><span class = "text-info">(单位:秒)</span><span class = "text-danger">*</span><span id = "maxIdleTimeTip"></span></div>
   </div>
   
   
  <div class="form-group" id = "serverLogLevelDiv" >
      <label for="serverLogLevel" class="col-sm-3 control-label">服务日志级别：</label>
      <div class="col-sm-4">
         <select id = "serverLogLevel" class="form-control input-sm" >
         	 <%
         	  for(var i = 0 ; i < serverLogLevels.length ;i ++){
         	    var curll = serverLogLevels[i] ;
         		if(curll==configureInfo.serverLogLevel){
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
         		if(curlt.key==configureInfo.serverLogType){
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
   
   <div class="form-group">
      <div class="col-sm-offset-2 col-sm-10">
         <button type="button" id = "groupServerCfgSubmit" class="btn btn-primary">保存</button>
      </div>
   </div>
   
</form>
