<div class="dsName"><%=model.dataSourceName%></div>
<div class="dsURL"><%=model.URL%></div>
<div class="dsUserName"><%=model.userName%></div>
<div class="dsInitialSize"><%=model.initialSize%></div>
<div class="dsmaxWait"><%=model.maxWait%></div>
<div class="dsmaxIdle"><%=model.maxIdle%></div>
<div class="dsminIdle"><%=model.minIdle%></div>
<div class="dsconfig">
	<%if (dataSourceConfigAuth == "true"){%>
		<a href="javascript:void(0);">配置</a>
	<%}else{%>
		配置
	<%}%>
</div>
<div class="dsundeploy">
	<%if (dataSourceUndeployAuth == "true"){%>
		<a href="javascript:void(0);">卸载</a>
	<%}else{%>
		卸载
	<%}%>
</div>
<div class="dsrestart">
	<%if (dataSourceRestartAuth == "true"){%>
		<a href="javascript:void(0);">重启</a>
	<%}else{%>
		重启
	<%}%>
</div>
<div class="dsdetail">
	<%if (dataSourceDetailViewAuth == "true"){%>
		<a href="javascript:void(0);">查看</a>
	<%}else{%>
		查看
	<%}%>
</div>