<div id="appLogConfigHead">
	<div class="line">
		<div class="content">
			<label>应用日志名称</label>
		</div>
		<div class="value">
			<select id="appName" name="appName" class="length" autocomplete="off">
				<option></option>
				<%for (var i = 0; i < appNameList.length; i++){%>
					<option><%=appNameList[i].appName%></option>
				<%}%> 
			</select>
			<span style="position:absolute;border-top:1pt solid #c1c1c1;border-left:1pt solid #c1c1c1;border-bottom:1pt solid #c1c1c1;width:230px;height:30px;left: 535px;top: 60px;">
				<input id="groupAppName" name="groupAppName" type="text" class="control-form input-sm" value="" style="width:227px;height:28px;border:0pt;"/>
			</span>
		</div>
		<div class="warn">
			<span class="text-danger">*</span>
			<span id="groupAppNameTip"></span>
		</div>
	</div>
</div>