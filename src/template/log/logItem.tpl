<div class="groupName"><%=groupName%></div>
<div class="appName"><%=appName%></div>
<div class="fileName"><%=fileName%></div>
<div class="fileDelete">
	<%if(logDeleteAuth=='true'){
	   %><a href="javascript:void(0);">删除</a><%
	}else{
	   %>删除<%
	}%>
</div>
