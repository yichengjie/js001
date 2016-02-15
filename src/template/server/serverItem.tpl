<td class = "singleServerInfoTd" ><a href = "<%=serverId%>" ><%=serverName%></a></td>
<td class = "groupServerInfoTd" ><a href = "<%=groupId%>" ><%=groupName%></a></td>
<td><%=serverIp%></td>
<td>
<%
	if(groupCategory==1){
		%>JCF服务器<%
	}else if(groupCategory==6){
		%>适配服务器<%
	}else if(groupCategory==3){
		%>上下文服务器<%
	}else if(groupCategory==4){
		%>服务库<%
	}else if(groupCategory==7){
		%>JCFCache服务器<%
	}else{
		%>其他<%
	}
%>
</td>
<td><%=serverManagePort%></td>
<td><%=serverDeployPort%></td>
<td>
	<%
		if(processStatus==1){
			%>启动<%
		}else if (processStatus==2){
			%>停止<%	
		}else if (processStatus==3){
			%>启动中<%
		}else if (processStatus==4){
			%>停止中<%
		}else if (processStatus==7){
			%>查询中<%
		}else{
			%>异常<%
		}
	%>
</td>
 	

