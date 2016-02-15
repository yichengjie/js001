<div class="groupselect"><input class="select" type="checkbox" <%if (selected == true){%>checked="true"<%}%>/></div>
<div class="groupserverName"><%=serverName%></div>
<div class="groupdsName"><%=dataSourceName%></div>
<div class="groupdsURL"><%=URL%></div>
<div class="groupdsUserName"><%=userName%></div>
<div class="groupdsundeploy">
	<%if(groupUninstallAuthFlag=='true'){
		%><a href="javascript:void(0);">组卸载</a><%
	}else{
		%>组卸载<%
	}%>
</div>
<div class="groupdsrestart">
	<%if(groupRestartAuthFlag=='true'){
		%><a href="javascript:void(0);">组重启</a><%
	}else{
		%>组重启<%
	}%>
</div>
