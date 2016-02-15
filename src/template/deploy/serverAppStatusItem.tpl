<td><%=appName%></td>
<td><%=currentVersion%></td>
<td><%=deployDate%></td>
<td>
	<%if(status=="1"){
		%>已部署<%
	}else if (status=="2"){
	    %>部署失败<%
	}else if (status=="3"){
	    %>已反部署<%
	}else if (status=="4"){
	    %>反部署失败<%
	}else if (status=="5"){
	    %>已回滚<%
	}else if (status=="6"){
	    %>回滚失败<%
	}else if(status=="7"){
	    %>正在部署<%
	}else if (status=="8"){
	    %>正在反部署<%
	}else if(status=="9"){
	    %>正在回滚<%
	}else if(status=="0"){
	    %>状态不一致<%
	}else{
	    %><%=status%><%
	}%>
</td>
<td class = "appStatusTd">
	<%
		if(status=="2"){
		  %>
		  	<%if(authDeployFlag=="true"){
		  		%><a href = "deploy" >重新部署</a><%
		  	}else{
		  		%>重新部署<%
		  	}%>
		  <%
		}else if (status=="1"){
		  %>
		  	<%if(authUndeployFlag=="true"){
		  		%><a href = "undeploy" >反部署</a><%
		  	}else{
		  		%>反部署<%
		  	}%>
		  <%
		}else if (status=="4"){
		  %>
		  	<%if(authUndeployFlag=="true"){
		  		%><a href = "undeploy" >重新反部署</a><%
		  	}else{
		  		%>重新反部署<%
		  	}%>
		  <%
		}
	%>
</td>
<td class = "serverAppStautsTd" >
	<%if(status=="1"||status=="4"||status=="6"){
	   %><a  href = "#">查看</a><%
	}else{
	   %>查看<%
	}%>
</td>
