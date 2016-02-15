<div id="serverContextInfo">
	<div class="line">
		<div class="content">
			<label>超时时间：</label>
		</div>
		<div class="value">
			<%=model.optime%>(毫秒)
		</div>
	</div>
	<div class="line">
		<div class="content">
			<label>失效时间： </label>
		</div>
		<div class="value">
			<%=model.exptime%>(秒)
	  	</div>
	</div>
	<div class="line">
		<div class="content">
			<label>服务器地址：</label>
		</div>
		<div class="value">
			<%=model.servers%>
		</div>
	</div>
	<div>
		<div class="col-sm-offset-0">
			<%if (restartContextAuth == "true"){%>
				<button id="contextRestart" class="btn btn-primary" type="button">重启</button>
			<%}else{%>
				<button id="contextRestartDisable" class="btn btn-primary" type="button">重启</button>
			<%}%>
		</div>
	</div>
</div>