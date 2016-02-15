<td><input type = "checkbox" class = "serverIds" appStatus = "<%=appStatus%>" name = "serverIds" value = "<%=serverId%>"></td>
<td><%=serverName%></td>
<td><%=appName%></td>
<td>
	<%
		if(appStatus=="1"){
			%>已部署<%
		}else if (appStatus=="2"){
			%>部署失败<%
		}else if (appStatus=="3"){
			%>已反部署<%
		}else if (appStatus=="4"){
			%>反部署失败<%
		}else if (appStatus=="5"){
			%>已回滚<%
		}else if (appStatus=="6"){
			%>回滚失败<%
		}else if (appStatus=="7"){
			%>正在部署<%
		}else if (appStatus=="8"){
			%>正在反部署<%
		}else if (appStatus=="9"){
			%>正在回滚<%
		}else{
			%><%=appStatus%><%
		}
	%>
</td>
<td><%=uploadDate%></td>
<td class = "deployOrNotTd">
	<%
		if(appStatus=="2"){
		%>
			<%if(deployAuthFlag=="true"){
			%><a href = "reDeploy" class ="myhand">重新部署</a><%
			} else{
			%><span class = "text-info">重新部署</span><%
			}%>
		<%
		}else if (appStatus=="1"){
		%>
			<%if(undeployAuthFlag=="true"){
			%><a href = "undeploy" class ="myhand">反部署</a><%
			} else{
			%><span class = "text-info">反部署</span><%
			}%>
		<%
		}else if (appStatus=="4"){
		%>
			<%if(undeployAuthFlag=="true"){
			%><a href = "reUndeploy" class ="myhand">重新反部署</a><%
			} else{
			%><span class = "text-info">重新反部署</span><%
			}%>
		<%
		}
	%>
</td>
