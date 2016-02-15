<td class="groupServerIdsTd">
	<input type="checkbox" serverStatus="<%=processStatus%>" serverName="<%=serverName%>" value="<%=serverName%>"/>
</td>
<td><%=groupName%></td>
<td name="serverName"><%=serverName%></td>
<td><%=serverIp%></td>
<td>
	<%if(serverCategory==1){%>
		JCF服务器
	<%}else if (serverCategory==2){%>
		TSI适配服务器
	<%}else if(serverCategory==3){%>
		上下文服务器
	<%}else if(serverCategory==4){%>
		<%if (registryServerCategory==1){%>
			主服务库
		<%}else{%>
			备服务库
		<%}%>
	<%}else if (serverCategory==7){%>
		JCFCache
	<%}%>
	
</td>
<td>
	<%if(processStatus==1){%>
		启动
	<%}else if(processStatus==2){%>
		停止
	<%}else if(processStatus==3){%>
		启动中...
	<%}else if(processStatus==4){%>
		停止中...
	<%}else if(processStatus==44){%>
		强停中..
	<%}else if(processStatus==7){%>
		查询中...
	<%}else{%>
		异常
	<%}%>
</td>
<%if(serverCategory=="1"){
%>
<td class="operTd">
	<%if(processStatus=="1"){%>
		<%
		   if(jcfStopFlag=="true"){
		   %> <a href="stop">停止</a><%
		   }else{
		   	  %>停止<%
		   }
		%>
		|
		<%if(jcfForceStopFlag=="true"){
			%><a href="forceStop">强制停止</a><%
		}else{
			%><span class = "text-info">强制停止</span><%
		}%>
	<%}else if(processStatus=="2"){%>
		<%if(jcfStartFlag=="true"){
			%><a href="start">启动</a><%
		}else{
			%><span class = "text-info">启动</span><%
		}%>	
	<% }else if (processStatus=="3"){%>
		启动中
	<%}else if (processStatus=="4"){%>
		停止中|
		<%if(jcfForceStopFlag=="true"){
			%><a href="forceStop">强制停止</a><%
		}else{
			%><span class = "text-info">强制停止</span><%
		}%>
	<%}else if (processStatus=="44"){%>
		<%if(jcfForceStopFlag=="true"){
			%><a href="forceStop">强制停止</a><%
		}else{
			%><span class = "text-info">强制停止</span><%
		}%>
	<%}else{%>
		<%if(jcfForceStopFlag=="true"){
			%><a href="forceStop">强制停止</a><%
		}else{
			%><span class = "text-info">强制停止</span><%
		}%>
	<%}%>
</td>
<td class="configTd">
	<%if((processStatus=="1"||processStatus=="2")&&(jcfConfigFlag=="true")){%>
		<a href="<%=serverId%>" serverName="<%=serverName%>">配置</a>
	<%}else{%>
		<span class = "text-info">配置</span>
	<%}%>
</td>
<td class="deleteTd">
	<%if(processStatus=="1"||processStatus=="3"||processStatus=="4"||processStatus=="44"||jcfUnloadFlag!="true"){%>
		<span class = "text-info">删除</span>
	<%}else{%>
		<a href="<%=serverId%>" name="<%=serverName%>" >删除</a>
	<%}%>
</td>
<td class="memoryDetailTd" >
	<%if((processStatus=="1")&&jcfMemViewFlag=="true"){%>
		<a href="<%=serverId%>">内存查看</a>
	<%}else{%>
		<span class = "text-info">内存查看</span>
	<%}%>
</td>
<td><%=nodeControllerPort%></td>

<%
}else if (serverCategory=="3"||serverCategory=="7"){//上下文服务器
%>
<td class="operTd">
	<%if(processStatus=="1"){%>
		<%if(contextStopFlag=="true"){
			%><a href="stop">停止</a><%
		}else{
			%><span class = "text-info">停止</span><%
		}%>
		|
		<%if(contextForceStopFlag=="true"){
			%><a href="forceStop">强制停止</a><%
		}else{
			%><span class = "text-info">强制停止</span><%
		}%>
	<%}else if(processStatus=="2"){%>	
		<%if(contextStarFlag=="true"){
			%><a href="start">启动</a><%
		}else{
			%><span class = "text-info">启动</span><%
		}%>
	<% }else if (processStatus=="3"){%>
		启动中
	<%}else if (processStatus=="4"){%>
		停止中|
		<%if(contextForceStopFlag=="true"){
			%><a href="forceStop">强制停止</a><%
		}else{
			%>强制停止<%
		}%>
	<%}else if (processStatus=="44"){%>
		<%if(contextForceStopFlag=="true"){
			%><a href="forceStop">强制停止</a><%
		}else{
			%>强制停止<%
		}%>
	<%}else{%>
		<%if(contextForceStopFlag=="true"){
			%><a href="forceStop">强制停止</a><%
		}else{
			%>强制停止<%
		}%>
	<%}%>
</td>
<td class="deleteTd">
	<%if(processStatus=="1"||processStatus=="3"||processStatus=="4"||processStatus=="44"||contextUnloadFlag!="true"){%>
		删除
	<%}else{%>
		<a href="<%=serverId%>" name="<%=serverName%>" >删除</a>
	<%}%>
</td>
<%
}else if (serverCategory=="4"){
%>
<td class="operTd">
	<%if(processStatus=="1"){%>
		<%if(registryStopFlag=="true"){
			%><a href="stop">停止</a><%
		}else{
			%>停止<%
		}%>
		|
		<%if(registryForceStopFlag=="true"){
			%><a href="forceStop">强制停止</a><%
		}else{
			%>强制停止<%
		}%>
	<%}else if(processStatus=="2"){%>	
		<%if(registryStartFlag=="true"){
			%><a href="start">启动</a><%
		}else{
			%>启动<%
		}%>
		
	<% }else if (processStatus=="3"){%>
		启动中
	<%}else if (processStatus=="4"){%>
		停止中|
		<%if(registryForceStopFlag=="true"){
			%><a href="forceStop">强制停止</a><%
		}else{
			%>强制停止<%
		}%>
	<%}else if (processStatus=="44"){%>
		<%if(registryForceStopFlag=="true"){
			%><a href="forceStop">强制停止</a><%
		}else{
			%>强制停止<%
		}%>
	<%}else{%>
		<%if(registryForceStopFlag=="true"){
			%><a href="forceStop">强制停止</a><%
		}else{
			%>强制停止<%
		}%>
	<%}%>
</td>
<td class="configTd">
	<%if((processStatus=="1"||processStatus=="2")&&(registryConfigFlag=="true")){%>
		<a href="<%=serverId%>" serverName="<%=serverName%>">配置</a>
	<%}else{%>
		配置
	<%}%>
</td>
<td class="deleteTd">
	<%if(processStatus=="1"||processStatus=="3"||processStatus=="4"||processStatus=="5"||processStatus=="44"||registryUnloadFlag!="true"){%>
		删除
	<%}else{%>
		<a href="<%=serverId%>" name="<%=serverName%>" >删除</a>
	<%}%>
</td>
<td class="changeRegistryServerTd">
	<%if(processStatus=="1"&&registryServerCategory=="2"&&registrySwitchFlag=="true"){%>
		<a href="#">切换</a>
	<%}else{%>
		切换
	<%}%>
</td>
<%
}%>