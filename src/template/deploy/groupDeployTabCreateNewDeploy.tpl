<!----------------------------------可部署应用包列表页面-------------------------------------------->
<div id = "page1">
	<div id = "listRegion"></div><!--显示列表区域-->
	<div id = "pagebarRegion"></div><!--显示分页栏条区域-->
	<div>
		<button type="button" id = "groupServerCfgNextStepBtn" class="btn">下一步</button>
	</div>
</div>

<!---------------------------------下面为待部署服务器列表页面--------------------------------------->
<div id = "page2" class = "hidden" >
	<div id = "serverListRegion"></div>
	<div>
		<table class = "table list">
			<caption>是否配置应用日志</caption>
			<tr>
				<td width = "7%"><input type = "radio" name = "cfgLogFlag" checked = "checked" value = "true"/>是</td>
				<td width = "7%"><input type = "radio" name = "cfgLogFlag"  value = "false"/>否</td>
				<td width = "*%"></td>
			</tr>
		</table>
	</div>
	<div>
		<button  id = "backStep4SelectAppBtn" type="button"  class="btn">上一步</button>&nbsp;&nbsp;
		<button  id = "nextStep4ConfigAppLogBtn" type="button"  class="btn">下一步</button>
	</div>
</div>

<!----------------------------------应用日志配置页面------------------------->
<br/>
<div id = "page3" class = "hidden" >
   <form class="form-horizontal" id = "appCfgForm"  role="form" method= "POST">
   		 <div class="form-group" id = "groupAppNameDiv">
	        <label for="groupAppName" class="col-sm-3 control-label">应用名称：</label>
	        <div class="col-sm-4">
	      	   <input type="text" id="groupAppName" readonly="readonly"   class="form-control input-sm"  placeholder="必填项">
	        </div>
	        <div><span class = "text-danger">*</span><span id = "groupAppNameTip"></span></div>
	     </div>
	     
   		 <div class="form-group" id = "appConfigFileNameDiv">
	        <label for="appConfigFileName" class="col-sm-3 control-label">应用日志配置文件名称：</label>
	        <div class="col-sm-4">
	      	   <input type="text" id="appConfigFileName"   class="form-control input-sm"  placeholder="名称需与应用包名一致(如为适配服务,建议为适配服务名)">
	        </div>
	        <div><span class = "text-danger">*</span><span id = "appConfigFileNameTip"></span></div>
	     </div>
	     
	      <div class="form-group" id = "logSavePathDiv">
	        <label for="logSavePath" class="col-sm-3 control-label">应用日志存放路径：</label>
	        <div class="col-sm-4">
	      	   <input type="text" id="logSavePath"   class="form-control input-sm"  placeholder="如:  app/abc 或  abc">
	        </div>
	        <div><span class = "text-danger">*</span><span id = "logSavePathTip"></span></div>
	     </div>
	     
	     <div class="form-group" id = "maxLogFileSizeDiv">
	        <label for="maxLogFileSize" class="col-sm-3 control-label">应用日志文件最大大小：</label>
	        <div class="col-sm-4">
	      	   <input type="text" id="maxLogFileSize"  value = "512MB"  class="form-control input-sm"  placeholder="必填项">
	        </div>
	        <div><span class = "text-danger">*</span><span id = "maxLogFileSizeTip"></span></div>
	     </div>
	     
	     <div class="form-group" id = "logFileMaxBackupIndexDiv">
	        <label for="logFileMaxBackupIndex" class="col-sm-3 control-label">应用日志最多存放个数：</label>
	        <div class="col-sm-4">
	      	   <input type="text" id="logFileMaxBackupIndex"   class="form-control input-sm"  value = "10" placeholder="必填项">
	        </div>
	        <div><span class = "text-danger">*</span><span id = "logFileMaxBackupIndexTip"></span></div>
	     </div>
	     
	     <div class="form-group" id = "logLevelDiv">
	        <label for="logLevel" class="col-sm-3 control-label">应用日志级别：</label>
	        <div class="col-sm-4">
	           <select id="logLevel" class="form-control input-sm">
	           		<%for(var i = 0 ; i < logLevels.length ;i++){
	           			if(i==0){
	           				%><option selected = "selected" value = "<%=logLevels[i]%>"><%=logLevels[i]%></option><%
	           			}else{
	           				%><option value = "<%=logLevels[i]%>"><%=logLevels[i]%></option><%
	           			}
	           		}%>
	           </select>
	        </div>
	        <div><span id = "logLevelTip"></span></div>
	     </div>
	     
	     <div class="form-group" id = "logAppenderTypeDiv">
	        <label for="logAppenderType" class="col-sm-3 control-label">应用日志格式：</label>
	        <div class="col-sm-4">
	      	   <select id="logAppenderType" class="form-control input-sm">
	      	   		<%for(var j = 0 ; j < logTypes.length ; j++){
	      	   			if(j==0){
	      	   				%><option selected = "selected" value = "<%=logTypes[j].key%>"><%=logTypes[j].value%></option><%
	      	   			}else{
	      	   				%><option value = "<%=logTypes[j].key%>"><%=logTypes[j].value%></option><%
	      	   			}
	      	   		}%>
	           </select>
	        </div>
	        <div><span id = "logAppenderTypeTip"></span></div>
	     </div>
	     
	     <!--------------------------------第二部分------------------------------------------>
	     
	     
	     <!--------------------------------第三部分------------------------------------------>
	     
	     <div class="form-group" id = "selectRunningDiv">
	        <label for="selectRunning" class="col-sm-3 control-label">是否记录性能日志：</label>
	        <div class="col-sm-4">
	      	   <input id="selectRunning" value="1"  type="checkbox"/>
	        </div>
	        <div><span id = "selectRunningTip"></span></div>
	     </div>
	     
	     <div class="form-group" id = "runningLogSavePathDiv">
	        <label for="runningLogSavePath" class="col-sm-3 control-label">性能日志存放路径：</label>
	        <div class="col-sm-4">
	      	   <input type="text" id="runningLogSavePath"   class="form-control input-sm"  placeholder="如:  app/abc 或  abc">
	        </div>
	        <div><span class = "text-danger">*</span><span id = "runningLogSavePathTip"></span></div>
	     </div>
	     
	     <div class="form-group" id = "maxRunningLogFileSizeDiv">
	        <label for="maxRunningLogFileSize" class="col-sm-3 control-label">性能日志文件最大大小：</label>
	        <div class="col-sm-4">
	      	   <input type="text" id="maxRunningLogFileSize" value = "512MB"  class="form-control input-sm"  placeholder="必填项">
	        </div>
	        <div><span class = "text-danger">*</span><span id = "maxRunningLogFileSizeTip"></span></div>
	     </div>
	     
	     <div class="form-group" id = "runningLogFileMaxBackupIndexDiv">
	        <label for="runningLogFileMaxBackupIndex" class="col-sm-3 control-label">性能日志最多存放个数：</label>
	        <div class="col-sm-4">
	      	   <input type="text" id="runningLogFileMaxBackupIndex" value = "10"  class="form-control input-sm"  placeholder="必填项">
	        </div>
	        <div><span class = "text-danger">*</span><span id = "runningLogFileMaxBackupIndexTip"></span></div>
	     </div>
   </form>
   <input type = "hidden" id = "isSubmitFormFlag"/>
   <div class="form-group">
	  <div class="col-sm-offset-2 col-sm-10">
	     <button type="button" id = "appCfgApplyBtn" class="btn btn-warning  <%if(authAppLogOperFlag!='true'){%>disabled<%}%>">应用</button>
	     <button type="button" id = "appCfgBackBtn" class="btn">上一步</button>
	     <button type="button" id = "appCfgNextBtn" class="btn">下一步</button>
	  </div>
   </div>
</div>
