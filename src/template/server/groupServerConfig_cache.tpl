<br/>
<div id = "errInfoRegion"></div>
<div id = "jcfCacheGroupCfgRegion">
	<input type = "hidden" id = "groupName" value = "<%=groupName%>" />
	<input type = "hidden" id = "groupId" value = "<%=groupId%>"/>
	
	<form class="form-horizontal"  role="form" method= "POST">
   		<div class="form-group" id = "addGroup_groupPasswordDiv" >
		      <label for="addGroup_groupPassword" class="col-sm-3 control-label">域密码：</label>
		      <div class="col-sm-4">
		        <input type="text" id="addGroup_groupPassword"  value = "<%=groupPassword%>" class="form-control input-sm"  placeholder="必填项" />
		      </div>
		      <div><span class = "text-danger">*</span><span id = "addGroup_groupPasswordTip"></span></div>
	    </div>
	    
	    <!--
	    <label for="addGroup_broadcastURL" class="col-sm-3 control-label">广播地址：</label>
	    <span class = "text-info">(IP:端口)</span><span id = "addGroup_broadcastURLTip"></span>
	    -->
   		<input type="hidden" id="addGroup_broadcastURL"   value = "<%=broadcastURL%>" class="form-control input-sm"  placeholder="必填项" />
   		
   		
   		
   		<div class="form-group" id = "addGroup_maxSize4StoreDiv" >
		      <label for="addGroup_maxSize4Store" class="col-sm-3 control-label">存储最大个数：</label>
		      <div class="col-sm-4">
		        <input type="text" id="addGroup_maxSize4Store"  value = "<%=maxSize4Store%>"  class="form-control input-sm"  placeholder="必填项" />
		      </div>
		      <div><span class = "text-danger">*</span><span id = "addGroup_maxSize4StoreTip"></span></div>
	    </div>
	    
	    <!-----------------------------新增参数开始----------------------------------->
	    <div class="form-group" id = "addGroup_maxSize4CacheDiv" >
		      <label for="addGroup_maxSize4Cache" class="col-sm-3 control-label">cache最大个数：</label>
		      <div class="col-sm-4">
		        <input type="text" id="addGroup_maxSize4Cache"  value = "<%=maxSize4Cache%>" class="form-control input-sm"  placeholder="必填项" />
		      </div>
		      <div><span class = "text-danger">*</span><span id = "addGroup_maxSize4CacheTip"></span></div>
	    </div>
	    
	    <div class="form-group" id = "addGroup_networkPortDiv" >
		      <label for="addGroup_networkPort" class="col-sm-3 control-label">networkPort：</label>
		      <div class="col-sm-4">
		        <input type="text" id="addGroup_networkPort"  value = "<%=networkPort%>" class="form-control input-sm"  placeholder="必填项" />
		      </div>
		      <div><span class = "text-danger">*</span><span id = "addGroup_networkPortTip"></span></div>
	    </div>
	    
	    <div class="form-group" id = "addGroup_tcpIPMemberDiv" >
		      <label for="addGroup_tcpIPMember" class="col-sm-3 control-label">tcp-ip member：</label>
		      <div class="col-sm-4">
		        <input type="text" id="addGroup_tcpIPMember"  value = "<%=tcpIPMember%>" class="form-control input-sm"  placeholder="[10.6.148.225:8000,10.6.148.224:8000]" />
		      </div>
		      <div><span class = "text-danger">*</span><span id = "addGroup_tcpIPMemberTip"></span></div>
	    </div>
	    <!---------------------新增参数结束--------------------------------------------->
   		
   		<div class="form-group" id = "addGroup_singleDataMaxLengthDiv" >
		      <label for="addGroup_singleDataMaxLength" class="col-sm-3 control-label">单数据最大长度：</label>
		      <div class="col-sm-4">
		        <input type="text" id="addGroup_singleDataMaxLength" value = "<%=singleDataMaxLength%>"  class="form-control input-sm"  placeholder="必填项" />
		      </div>
		      <div><span class = "text-danger">*</span><span id = "addGroup_singleDataMaxLengthTip"></span></div>
	    </div>
   		
   		<div class="form-group" id = "addGroup_cacheNodeAlertDiv" >
		      <label for="addGroup_cacheNodeAlert" class="col-sm-3 control-label">存储报警阀值：</label>
		      <div class="col-sm-4">
		        <input type="text" id="addGroup_cacheNodeAlert"  value = "<%=cacheNodeAlert%>" class="form-control input-sm"  placeholder="必填项" />
		      </div>
		      <div><span class = "text-danger">*</span><span class = "text-info">(个)</span><span id = "addGroup_cacheNodeAlertTip"></span></div>
	    </div>
   		
   		<div class="form-group"  >
		      <label  class="col-sm-3 control-label">CACHE类型：</label>
		      <div class="col-sm-4">
		      	<%if(cacheModel=="LRU"||cacheModel=="LFU"){
		      		if(cacheModel=="LRU"){
		      		%>
		      		   <input type="radio"  name = "addGroup_cacheModel" checked = "checked" value = "LRU"/> LRU
		        	   <input type="radio"  name = "addGroup_cacheModel" value = "LFU"/> LFU
		      		<%
		      		}else{
		      		%>
		      		   <input type="radio"  name = "addGroup_cacheModel"  value = "LRU"/> LRU
		        	   <input type="radio"  name = "addGroup_cacheModel" checked = "checked" value = "LFU"/> LFU
		      		<%
		      		}
		      	}else{
		      		%>
		      		   <input type="radio"  name = "addGroup_cacheModel" checked = "checked" value = "LRU"/> LRU
		        	   <input type="radio"  name = "addGroup_cacheModel" value = "LFU"/> LFU
		      		<%
		      	}%>
		      </div>
		      <div></div>
	    </div>
   		
   		<div class="form-group" id = "addGroup_jvmMemoryDiv" >
		      <label for="addGroup_jvmMemory" class="col-sm-3 control-label">JVM内存：</label>
		      <div class="col-sm-4">
		        <input type="text" id="addGroup_jvmMemory"  value = "<%=jvmMemory%>" class="form-control input-sm"  placeholder="必填项" />
		      </div>
		      <div><span class = "text-danger">*</span><span class = "text-info">(kK,mM,gG)</span><span id = "addGroup_jvmMemoryTip"></span></div>
	    </div>
   		
   		<div class="form-group" id = "addGroup_jvmHeapAlertDiv" >
		      <label for="addGroup_jvmHeapAlert" class="col-sm-3 control-label">内存报警阀值：</label>
		      <div class="col-sm-4">
		        <input type="text" id="addGroup_jvmHeapAlert" value = "<%=jvmHeapAlert%>"  class="form-control input-sm"  placeholder="必填项" />
		      </div>
		      <div><span class = "text-danger">*</span><span class = "text-info">(%)</span><span id = "addGroup_jvmHeapAlertTip"></span></div>
	    </div>
   		
   		<div class="form-group" id = "addGroup_dataBackupNumDiv" >
		      <label for="addGroup_dataBackupNum" class="col-sm-3 control-label">数据备份个数：</label>
		      <div class="col-sm-4">
		        <input type="text" id="addGroup_dataBackupNum"  value = "<%=dataBackupNum%>" class="form-control input-sm"  placeholder="必填项" />
		      </div>
		      <div><span class = "text-danger">*</span><span id = "addGroup_dataBackupNumTip"></span></div>
	    </div>
   
	    
	    <input type="hidden" id="addGroup_statisticsPath" value = "<%=statisticsPath%>"  class="form-control input-sm"  placeholder="必填项" />
   		
   		<div class="form-group" id = "addGroup_statisticsSyncTimeDiv" >
		      <label for="addGroup_statisticsSyncTime" class="col-sm-3 control-label">数据同步时间：</label>
		      <div class="col-sm-4">
		        <input type="text" id="addGroup_statisticsSyncTime" value = "<%=statisticsSyncTime%>"  class="form-control input-sm"  placeholder="必填项" />
		      </div>
		      <div><span class = "text-danger">*</span><span class = "text-info">(秒)</span><span id = "addGroup_statisticsSyncTimeTip"></span></div>
	    </div>
   		
   		<div class="form-group" id = "addGroup_jvmHeapBlockDiv" >
		      <label for="addGroup_jvmHeapBlock" class="col-sm-3 control-label">内存阻塞阀值：</label>
		      <div class="col-sm-4">
		        <input type="text" id="addGroup_jvmHeapBlock" value = "<%=jvmHeapBlock%>"  class="form-control input-sm"  placeholder="必填项" />
		      </div>
		      <div><span class = "text-danger">*</span><span class = "text-info">(%)</span><span id = "addGroup_jvmHeapBlockTip"></span></div>
	    </div>
   	</form>
   	
   	 <div class="form-group">
	      <div class="col-sm-offset-2 col-sm-10">
	         <button type="button" id = "groupServerCfgSubmit" class="btn btn-primary">保存</button>
	      </div>
	 </div>
</div>