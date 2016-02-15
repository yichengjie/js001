<div id = "addGroupModal" class="modal" aria-hidden="true" style="z-index:10400;"  data-backdrop="static">
   <div class="modal-dialog" style = "width:700px;">
      <div class="modal-content">
         <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
            <h4 class="modal-title" id="myModalLabel">服务器组添加</h4>
         </div>
         <div class="modal-body">
         <form class="form-horizontal"  role="form" method= "POST">
 	          <div class="form-group" id = "addGroup_groupCategoryDiv" >
			      <label for="addGroup_groupCategory" class="col-sm-3 control-label">组类型：</label>
			      <div class="col-sm-5">
			          <select id="addGroup_groupCategory"  class  = "form-control input-sm">
					     <%
					      	for(var i = 0 ; i < groupList.length ; i++){
					      	   if(groupList[i].groupCategoryId==checkGroupCategory){//默认选中jcf服务器
					      		  %><option selected = "selected"  value = "<%=groupList[i].groupCategoryId%>" ><%=groupList[i].groupCategoryName%></option><%
					      	   }else{
					      	 	  %><option value = "<%=groupList[i].groupCategoryId%>" ><%=groupList[i].groupCategoryName%></option><%
					      	   }
					      	}
					     %>
				     </select>
			      </div>
			      <div><span class = "text-danger">*</span><span id = "addGroup_groupCategoryTip"></span></div>
			  </div>	
         	  			
 			  <div class="form-group" id = "addGroup_groupNameDiv" >
			      <label for="addGroup_groupName" class="col-sm-3 control-label">组名称：</label>
			      <div class="col-sm-5">
			      	<%if(checkGroupCategory=="1"){//jcf服务器组
			      	    %><input type="text" id="addGroup_groupName" value = "jcfGroup" class="form-control input-sm"  placeholder="必填项" /><%
			      	}else if (checkGroupCategory=="3"){//上下文服务器组
			      	    %><input type="text" id="addGroup_groupName" value = "contextGroup"  readonly = "readonly" class="form-control input-sm"  placeholder="必填项" /><%
			      	}else if (checkGroupCategory=="4"){//注册库组
			      	    %><input type="text" id="addGroup_groupName" value = "registryGroup" readonly = "readonly" class="form-control input-sm"  placeholder="必填项" /><%
			      	}else if (checkGroupCategory=="6"){//适配服务器组
			      	    %><input type="text" id="addGroup_groupName" value = "adapterGroup"  readonly = "readonly" class="form-control input-sm"  placeholder="必填项" /><%
			      	}else if (checkGroupCategory=="7"){//cache服务器组
			      		%><input type="text" id="addGroup_groupName" value = "cacheGroup" readonly = "readonly" class="form-control input-sm"  placeholder="必填项" /><%
			      	}%>
			      </div>
			      <div><span class = "text-danger">*</span><span id = "addGroup_groupNameTip"></span></div>
			   </div>
         </form>
          <%
		   	if(checkGroupCategory=="7"){//如果选择的是cache服务器组,则需要别的配置
		  %>
		   	   	<form class="form-horizontal" id = "addServerForm"  role="form" method= "POST">
		   	   		
		   	   		<div class="form-group" id = "addGroup_groupPasswordDiv" >
					      <label for="addGroup_groupPassword" class="col-sm-3 control-label">域密码：</label>
					      <div class="col-sm-5">
					        <input type="text" id="addGroup_groupPassword"   class="form-control input-sm"  placeholder="必填项" />
					      </div>
					      <div><span class = "text-danger">*</span><span id = "addGroup_groupPasswordTip"></span></div>
				    </div>
		   	   		
		   	   		<!--广播地址暂时隐藏
				    <label for="addGroup_broadcastURL" class="col-sm-3 control-label">广播地址：</label>
				    <span class = "text-info">(IP:端口)</span><span id = "addGroup_broadcastURLTip"></span>
				    -->
				    <input type="hidden" id="addGroup_broadcastURL"   class="form-control input-sm"  placeholder="必填项" />
		   	   		
		   	   		
		   	   		
		   	   		
		   	   		
		   	   		<div class="form-group" id = "addGroup_maxSize4StoreDiv" >
					      <label for="addGroup_maxSize4Store" class="col-sm-3 control-label">存储最大个数：</label>
					      <div class="col-sm-5">
					        <input type="text" id="addGroup_maxSize4Store"  value = "1000" class="form-control input-sm"  placeholder="必填项" />
					      </div>
					      <div><span class = "text-danger">*</span><span id = "addGroup_maxSize4StoreTip"></span></div>
				    </div>
				    
				    <!-----------------------------新增参数开始----------------------------------->
				    <div class="form-group" id = "addGroup_maxSize4CacheDiv" >
					      <label for="addGroup_maxSize4Cache" class="col-sm-3 control-label">cache最大个数：</label>
					      <div class="col-sm-5">
					        <input type="text" id="addGroup_maxSize4Cache"  value = "1000" class="form-control input-sm"  placeholder="必填项" />
					      </div>
					      <div><span class = "text-danger">*</span><span id = "addGroup_maxSize4CacheTip"></span></div>
				    </div>
				    
				    <div class="form-group" id = "addGroup_networkPortDiv" >
					      <label for="addGroup_networkPort" class="col-sm-3 control-label">networkPort：</label>
					      <div class="col-sm-5">
					        <input type="text" id="addGroup_networkPort"  value = "8000" class="form-control input-sm"  placeholder="必填项" />
					      </div>
					      <div><span class = "text-danger">*</span><span id = "addGroup_networkPortTip"></span></div>
				    </div>
				    
				    <div class="form-group" id = "addGroup_tcpIPMemberDiv" >
					      <label for="addGroup_tcpIPMember" class="col-sm-3 control-label">tcp-ip member：</label>
					      <div class="col-sm-5">
					        <input type="text" id="addGroup_tcpIPMember"  value = "" class="form-control input-sm"  placeholder="[10.6.148.225:8000,10.6.148.224:8000]" />
					      </div>
					      <div><span class = "text-danger">*</span><span id = "addGroup_tcpIPMemberTip"></span></div>
				    </div>
				    <!---------------------新增参数结束--------------------------------------------->
		   	   		
		   	   		<div class="form-group" id = "addGroup_singleDataMaxLengthDiv" >
					      <label for="addGroup_singleDataMaxLength" class="col-sm-3 control-label">单数据最大长度：</label>
					      <div class="col-sm-5">
					        <input type="text" id="addGroup_singleDataMaxLength"  class="form-control input-sm"  placeholder="必填项" />
					      </div>
					      <div><span class = "text-danger">*</span><span id = "addGroup_singleDataMaxLengthTip"></span></div>
				    </div>
		   	   		
		   	   		<div class="form-group" id = "addGroup_cacheNodeAlertDiv" >
					      <label for="addGroup_cacheNodeAlert" class="col-sm-3 control-label">存储报警阀值：</label>
					      <div class="col-sm-5">
					        <input type="text" id="addGroup_cacheNodeAlert" value = "600"  class="form-control input-sm"  placeholder="必填项" />
					      </div>
					      <div><span class = "text-danger">*</span><span class = "text-info">(个)</span><span id = "addGroup_cacheNodeAlertTip"></span></div>
				    </div>
		   	   		
		   	   		<div class="form-group"  >
					      <label  class="col-sm-3 control-label">CACHE类型：</label>
					      <div class="col-sm-5">
					        <input type="radio"  name = "addGroup_cacheModel" checked = "checked" value = "LRU"/> LRU
					        <input type="radio"  name = "addGroup_cacheModel" value = "LFU"/> LFU
					      </div>
					      <div></div>
				    </div>
		   	   		
		   	   		<div class="form-group" id = "addGroup_jvmMemoryDiv" >
					      <label for="addGroup_jvmMemory" class="col-sm-3 control-label">JVM内存：</label>
					      <div class="col-sm-5">
					        <input type="text" id="addGroup_jvmMemory"   class="form-control input-sm"  placeholder="必填项" />
					      </div>
					      <div><span class = "text-danger">*</span><span class = "text-info">(kK,mM,gG)</span><span id = "addGroup_jvmMemoryTip"></span></div>
				    </div>
		   	   		
		   	   		<div class="form-group" id = "addGroup_jvmHeapAlertDiv" >
					      <label for="addGroup_jvmHeapAlert" class="col-sm-3 control-label">内存报警阀值：</label>
					      <div class="col-sm-5">
					        <input type="text" id="addGroup_jvmHeapAlert" value = "60"  class="form-control input-sm"  placeholder="必填项" />
					      </div>
					      <div><span class = "text-danger">*</span><span class = "text-info">(%)</span><span id = "addGroup_jvmHeapAlertTip"></span></div>
				    </div>
		   	   		
		   	   		<div class="form-group" id = "addGroup_dataBackupNumDiv" >
					      <label for="addGroup_dataBackupNum" class="col-sm-3 control-label">数据备份个数：</label>
					      <div class="col-sm-5">
					        <input type="text" id="addGroup_dataBackupNum"   class="form-control input-sm"  placeholder="必填项" />
					      </div>
					      <div><span class = "text-danger">*</span><span id = "addGroup_dataBackupNumTip"></span></div>
				    </div>
				  
		   	   		<input type="hidden" id="addGroup_statisticsPath"  value = "../measureOutput/" />
		   	   		
		   	   		
		   	   		<div class="form-group" id = "addGroup_statisticsSyncTimeDiv" >
					      <label for="addGroup_statisticsSyncTime" class="col-sm-3 control-label">数据同步时间：</label>
					      <div class="col-sm-5">
					        <input type="text" id="addGroup_statisticsSyncTime" value = "60"  class="form-control input-sm"  placeholder="必填项" />
					      </div>
					      <div><span class = "text-danger">*</span><span class = "text-info">(秒)</span><span id = "addGroup_statisticsSyncTimeTip"></span></div>
				    </div>
		   	   		
		   	   		<div class="form-group" id = "addGroup_jvmHeapBlockDiv" >
					      <label for="addGroup_jvmHeapBlock" class="col-sm-3 control-label">内存阻塞阀值：</label>
					      <div class="col-sm-5">
					        <input type="text" id="addGroup_jvmHeapBlock"  value = "85" class="form-control input-sm"  placeholder="必填项" />
					      </div>
					      <div><span class = "text-danger">*</span><span class = "text-info">(%)</span><span id = "addGroup_jvmHeapBlockTip"></span></div>
				    </div>
		   	   	</form>
		   	<%
		   	}
		   %>
         </div>
         <div class="modal-footer">
            <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
            <button id = "addGroupBtn" type="button" class="btn btn-primary">添加 </button>
         </div>
      </div>
</div>