<div id="appLogConfig">
	<div class="line">
		<div class="content">
			<label>应用日志配置文件名称：</label>
		</div>
		<div class="value">
			<input id="appConfigFileName" name="appConfigFileName" class="form-control input-sm <%if (logFileNameAuth!="true"){%>readonly<%}%>" type="text" value="<%=model.appConfigFileName%>" placeholder="必填项" <%if (logFileNameAuth!="true"){%>readonly="true"<%}%>>
		</div>
		<div class="warn">
			<span class="text-danger">*</span>
			<span id="appConfigFileNameTip"></span>
		</div>
	</div>
	<div class="line">
		<div class="content">
			<label>应用日志存放路径：</label>
		</div>
		<div class="value">
			<input id="logSavePath" name="logSavePath" class="form-control input-sm <%if (logSavePathAuth!="true"){%>readonly<%}%>" type="text" value="<%=model.logSavePath%>" placeholder="如:app/abc 或  abc" <%if (logSavePathAuth!="true"){%>readonly="true"<%}%>>
		</div>
		<div class="warn">
			<span class="text-danger">*</span>
			<span id="logSavePathTip"></span>
		</div>
	</div>
	<div class="line">
		<div class="content">
			<label>应用日志文件最大大小：</label>
		</div>
		<div class="value">
			<input id="maxLogFileSize" name="maxLogFileSize" class="form-control input-sm <%if (logSizeAuth!="true"){%>readonly<%}%>" type="text" value="<%=model.maxLogFileSize%>" <%if (logSizeAuth!="true"){%>readonly="true"<%}%>>
		</div>
		<div class="warn">
			<span class="text-danger">*</span>
			<span class ="text-info">(单位:KB,kb,MB,mb,GB,gb)</span>
			<span id="maxLogFileSizeTip"></span>
		</div>
	</div>
	<div class="line">
		<div class="content">
			<label>应用日志最多存放个数：</label>
		</div>
		<div class="value">
			<input id="logFileMaxBackupIndex" name="logFileMaxBackupIndex" class="form-control input-sm <%if (logNumberAuth!="true"){%>readonly<%}%>" type="text" value="<%=model.logFileMaxBackupIndex%>" <%if (logNumberAuth!="true"){%>readonly="true"<%}%>>
		</div>
		<div class="warn">
			<span class="text-danger">*</span>
			<span id="logFileMaxBackupIndexTip"></span>
		</div>
	</div>
	<div class="line">
		<div class="content">
			<label>应用日志级别：</label>
		</div>
		<div class="value">
			<%if (logLevelAuth=="true"){%>
				<select id="logLevel" name="logLevel" class="form-control input-sm">
					<option value="FATAL" <%if (model.logLevel == "FATAL"){%>selected="true"<%}%>>FATAL</option>
					<option value="ERROR" <%if (model.logLevel == "ERROR"){%>selected="true"<%}%>>ERROR</option>
					<option value="WARN" <%if (model.logLevel == "WARN"){%>selected="true"<%}%>>WARN</option>
					<option value="INFO" <%if (model.logLevel == "INFO"){%>selected="true"<%}%>>INFO</option>
					<option value="DEBUG" <%if (model.logLevel == "DEBUG"){%>selected="true"<%}%>>DEBUG</option>
			 	</select>
			<%}else{%>
				<input id="logLevel" name="logLevel" class="form-control input-sm readonly" type="text" value="<%=model.logLevel%>" readonly="true">
			<%}%>
		</div>
		<div class="warn">
			<span class="text-danger">*</span>
		</div>
	</div>
	<div class="line">
		<div class="content">
			<label>应用日志格式：</label>
		</div>
		<div class="value">
			<%if (logLevelAuth=="true"){%>
				<select id="logAppenderType" name="logAppenderType" class="form-control input-sm">
					<option value="dateAndSize" <%if (model.logAppenderType == "dateAndSize"){%>selected="true"<%}%>>按日期和大小</option>
					<option value="hourAndSize" <%if (model.logAppenderType == "hourAndSize"){%>selected="true"<%}%>>按小时和大小</option>
		 		</select>
			<%}else{%>
				<input id="logAppenderType" name="logAppenderType"  type="hidden" value="<%=model.logAppenderType%>" >
				<input id="logAppenderTypeShow" name="logAppenderTypeShow" class="form-control input-sm readonly" type="text" <%if("dateAndSize"==model.logAppenderType){%>value = "按日期和大小"<%}else if ("hourAndSize"==model.logAppenderType){%>value = "按小时和大小"<%}%> value="" readonly="true">
			<%}%>
		</div>
		<div class="warn">
			<span class="text-danger">*</span>
		</div>
	</div>
	<div class="line">
		<label class="control-label">
      		是否记录性能日志：
      		<%if (logRunningAuth=="true"){%>
      			<input id="isRunningSelect" type="checkbox" <%if (model.isRunningSelect){%>checked="checked"<%}%>>
      		<%}else{%>
      			<input id="isRunningSelect" type="checkbox" <%if (model.isRunningSelect){%>checked="checked"<%}%> disabled="true">
      		<%}%>
      	</label>
	</div>
	<div class="line">
		<div class="content">
			<label>性能日志存放路径：</label>
		</div>
		<div class="value">
			<input id="runningLogSavePath" name="runningLogSavePath" class="form-control input-sm <%if (!model.isRunningSelect){%>redaonly<%}%>" type="text" placeholder="如:app/abc 或  abc" value="<%=model.runningLogSavePath%>" <%if (!model.isRunningSelect){%>readonly="true"<%}%>>
		</div>
		<div class="warn">
			<span class="text-danger">*</span>
      		<span id="runningLogSavePathTip"></span>
		</div>
	</div>
	<div class="line">
		<div class="content">
			<label>性能日志文件最大大小：</label>
		</div>
		<div class="value">
			<input id="maxRunningLogFileSize" name="maxRunningLogFileSize" class="form-control input-sm <%if (!model.isRunningSelect){%>redaonly<%}%>" type="text" value="<%=model.maxRunningLogFileSize%>" <%if (!model.isRunningSelect){%>readonly="true"<%}%>>
		</div>
		<div class="warn">
			<span class="text-danger">*</span>
      		<span id="maxRunningLogFileSizeTip"></span>
		</div>
	</div>
	<div class="line">
		<div class="content">
			<label>性能日志最多存放个数：</label>
		</div>
		<div class="value">
			<input id="runningLogFileMaxBackupIndex" name="runningLogFileMaxBackupIndex" class="form-control input-sm <%if (!model.isRunningSelect){%>redaonly<%}%>" type="text" value="<%=model.runningLogFileMaxBackupIndex%>" <%if (!model.isRunningSelect){%>readonly="true"<%}%>>
		</div>
		<div class="warn">
			<span class="text-danger">*</span>
      		<span id="runningLogFileMaxBackupIndexTip"></span>
		</div>
	</div>
   	<div class="line">
      	<div class="content">
         	<button id="save" class="btn btn-primary <%if(logUpdateAuth!='true'){%>disabled<%}%>" type="button">应用</button>
      	</div>
   	</div>
</div>
