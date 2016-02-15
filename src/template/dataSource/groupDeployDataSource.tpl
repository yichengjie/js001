<div id="groupDataSourceServerList">

</div>
<div id="addDataSource">
	<div class="line">
		<div class="content">
			<label>数据源名称：</label>
		</div>
		<div class="value">
			<input id="dataSourceName" name="dataSourceName" class="length form-control" type="text" value="" placeholder="必填项：字母、数字、下划线、#">
		</div>
		<div class="warn">
			<span class="text-danger">*</span>
			<span id="dataSourceNameTip">&nbsp;</span>
		</div>
		<div class="content">
			<label>用户名：</label>
		</div>
		<div class="value">
			<input id="userName" name="userName" class="length form-control" type="text" value="" placeholder="必填项：字母、数字、下划线、#">
		</div>
		<div class="warn">
			<span class="text-danger">*</span>
			<span id="userNameTip"></span>
		</div>
	</div>
	<div class="line">
		<div class="content">
			<label>密码： </label>
		</div>
		<div class="value">
			<input id="password" name="password" class="length form-control" type="password" placeholder="必填项">
	  	</div>
	  	<div class="warn">
	  		<span class = "text-danger">*</span>
	  		<span id = "passwordTip"></span>
	  	</div>
	  	<div class="content">
	  		<label>Url：</label>
	  	</div>
		<div class="value">
			<input type="text" id="URL" name="URL" class="length form-control" type="text" value="" placeholder="必填项">
		</div>
		<div class="warn">
			<span class = "text-danger">*</span>
			<span id = "URLTip"></span>
		</div>
	</div>
	<div class="line">
		<div class="content">
			<label>驱动：</label>
		</div>
		<div class="value">
			<select id="driverClassName" name="driverClassName" class="length" autocomplete="off">
				<option value="com.ibm.db2.jcc.DB2Driver">com.ibm.db2.jcc.DB2Driver</option>
				<option value="oracle.jdbc.OracleDriver">oracle.jdbc.OracleDriver</option>
				<option value="org.postgresql.Driver">org.postgresql.Driver</option>
				<option value="com.mysql.jdbc.Driver">com.mysql.jdbc.Driver</option>    		
			</select>
		</div>
		<div class="warn">
			<span id="driverClassNameTip">&nbsp;</span>
		</div>
	</div>
	<div>
		<div class="col-sm-offset-4">
			<button id="save" class="btn btn-primary" type="button">部署</button>
		</div>
	</div>
</div>