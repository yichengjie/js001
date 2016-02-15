<td><%=appName%></td>
<td><%=serviceName%></td>
<td><%=serviceCategory%></td>
<td><%=appVersion%></td>
<td class="sericeStatus">
	<%if(serviceStatus==1){
		%>启动&nbsp;&nbsp;&nbsp;<a class="stop myhand" href = "stop">停止</a>||<a class="forceStop myhand" href = "forceStop">强停</a><%
	}else if(serviceStatus==2){
		%>停止&nbsp;&nbsp;&nbsp;<a class="start myhand" href = "start">启动<a><%
	}else if(serviceStatus==3){
		%>启动中&nbsp;&nbsp;&nbsp;停止||强停<%
	}else if(serviceStatus==4){
		%>停止中&nbsp;&nbsp;&nbsp;启动||停止||<a class="forceStop myhand" href = "forceStop">强制停止</a><%
	}else if(serviceStatus==5){
		%>挂起&nbsp;&nbsp;&nbsp;挂起<%
	}else if(serviceStatus==6){
		%>挂起中&nbsp;&nbsp;&nbsp;挂起中<%
	}else if(serviceStatus==7){
		%>异常<%
	}else if(serviceStatus==8){
		%>查询中<%
	}else{
		%>未知<%
	}%>
</td>
<td class="groupServiceCfgTd"><a class = "myhand">组配置</a></td>
