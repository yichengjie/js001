<td><%=name%></td>
<td><%=groupName%></td>
<td><%=version%></td>
<td><%=userName%></td>
<td><%=uploadDate%></td>
<td>
	<%
		if(appStatus==1){
		%>已部署<%
		}else if (appStatus=="2"){
		%>部署失败<%
		}else if (appStatus=="3"){
		%>已反部署<%
		}else if (appStatus=="4"){
		%>反部署失败<%
		}else if (appStatus=="5"){
		%>已回滚<%
		}else if(appStatus=="6"){
		%>回滚失败<%
		}else if (appStatus=="7"){
		%>正在部署<%
		}else if (appStatus=="8"){
		%>正在反部署<%
		}else if (appStatus=="8"){
		%>正在回滚<%
		}else if(appStatus=="10"){
		%>未部署<%
		}else{
		%>状态不一致<%
		}
	%>
</td>
<td>
	<%if(isDefaultVersion=="TRUE"){
	%><span class = "text-success">是</span><%
	}else if (isDefaultVersion=="FALSE"){
	%><span class = "text-warning">否</span><%
	}else{
	%><span class = "text-danger">状态不一致</span><%
	}%>
</td>
<td class = "alreadyUploadAppClearTd">	
	<%
		if(appStatus=="2"||appStatus=="3"||appStatus=="10"){
		%><a class = "clearAppBtn myhand" appId = "<%=id%>" appStatus ="<%=appStatus%>" >清除应用</a><%
		}else{
		%>清除应用<%
		}
	%>
</td>