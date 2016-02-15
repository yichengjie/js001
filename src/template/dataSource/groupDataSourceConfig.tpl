<div class="dataSourceConfig">
	<div class="line">
		<div class="content">
			<label>服务器名称：</label>
		</div>
		<div class="value">
			<input id="serverName" name="serverName" class="length readonly" type="text" value="<%=serverName%>" readonly="true">
		</div>
		<div class="warn">
			<span id="dataSourceNameTip">&nbsp;</span>
		</div>
		<div class="content">
			<label>用户名：</label>
		</div>
		<div class="value">
			<input id="userName" name="userName" class="length form-control" type="text" value="<%=userName%>" placeholder="必填项">
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
			<input id="password" name="password" class="length form-control" type="text">
	  	</div>
	  	<div class="warn">
	  		<span class = "text-danger">*</span>
	  		<span id = "passwordTip"></span>
	  	</div>
	  	<div class="content">
	  		<label>Url：</label>
	  	</div>
		<div class="value">
			<input id="URL" name="URL" class="length form-control" type="text" value="<%=URL%>" placeholder="必填项">
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
				<option value="com.ibm.db2.jcc.DB2Driver" <%if(driverClassName=="com.ibm.db2.jcc.DB2Driver"){%>selected="selected"<%}%>>com.ibm.db2.jcc.DB2Driver</option>
				<option value="oracle.jdbc.OracleDriver" <%if(driverClassName=="oracle.jdbc.OracleDriver"){%>selected="selected"<%}%>>oracle.jdbc.OracleDriver</option>
				<option value="org.postgresql.Driver" <%if(driverClassName=="org.postgresql.Driver"){%>selected="selected"<%}%>>org.postgresql.Driver</option>
				<option value="com.mysql.jdbc.Driver" <%if(driverClassName=="com.mysql.jdbc.Driver"){%>selected="selected"<%}%>>com.mysql.jdbc.Driver</option>    		
			</select>
		</div>
		<div class="warn">
			<span id="driverClassNameTip">&nbsp;</span>
		</div>
		<div class="content">
			<label>最大连接数：</label>
		</div>
		<div class="value">
			<input id="maxActive" name="maxActive" class="length form-control" value="<%=maxActive%>" type="text" placeholder="必填项">
		</div>
		<div class="warn">
			<span class="text-danger">*</span>
			<span id="maxActiveTip"></span>
		</div>
	</div>
	<div class="line">
		<div class="content">
			<label>最大等待连接时间：</label>
		</div>
		<div class="value">
			<input id="maxWait" name="maxWait" class="length form-control" value="<%=maxWait%>" type="text" placeholder="必填项">
		</div>
		<div class="warn">
			<span class="text-danger">*</span>
			<span class = "text-info">(单位:毫秒)</span>
			<span id="maxWaitTip"></span>
		</div>
		<div class="content">
			<label>最大空闲数：</label>
		</div>
		<div class="value">
			<input id="maxIdle" name="maxIdle" class="length form-control" value="<%=maxIdle%>" type="text" placeholder="必填项">
		</div>
		<div class="warn">
			<span class="text-danger">*</span>
			<span id="maxIdleTip"></span>
		</div>
	</div>
	<div class="line">
		<div class="content">
			<label>最小空闲数：</label>
		</div>
		<div class="value">
			<input id="minIdle" name="minIdle" class="length form-control" value="<%=minIdle%>" type="text" placeholder="必填项">
	  	</div>
		<div class="warn">
			<span class = "text-danger">*</span>
			<span id = "minIdleTip"></span>
		</div>
		<div class="content">
			<label>初始连接数：</label>
		</div>
		<div class="value">
			<input id="initialSize" name="initialSize" class="length form-control" value="<%=initialSize%>" type="text" placeholder="必填项">
		</div>
		<div class="warn">
			<span class="text-danger">*</span>
			<span id="initialSizeTip"></span>
		</div>
	</div>
	<div>
		<div class="col-sm-offset-4">
			<button id="save" class="btn btn-primary" type="button">保存</button>
		</div>
	</div>
</div>