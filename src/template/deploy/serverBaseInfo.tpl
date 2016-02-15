<br/>
<div class = "col-sm-1 text-right">名称:</div>
<div class = "col-sm-2"><%=serverName%></div>
<div class = "col-sm-1 text-right">分组:</div>
<div class = "col-sm-2"><%=groupName%></div>
<div class = "col-sm-1 text-right">类别:</div>
<div class = "col-sm-2">
	<%
		if("1"==serverCategory){
		   %>JCF服务器<%
		}else if ("2"==serverCategory){
		   %>适配服务器<%
		}else if ("3"==serverCategory){
		   %>上下文服务器<%
		}else if ("4"==serverCategory){
		   %>服务库<%
		}else{
		   %><%=serverCategory%><%
		}
	%>
</div>
<input type = "hidden" id = "hiddenGroupId4BaseInfo" value = "<%=groupId%>" />
<input type = "hidden" id = "hiddenServerId4BaseInfo" value = "<%=serverId%>" />