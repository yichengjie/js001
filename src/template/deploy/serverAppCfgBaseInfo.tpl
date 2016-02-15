<caption>上传配置文件</caption>
<tbody>
	<tr>
		<td width = "5%">应用名称:</td>
		<td width  = "10%"><%=appName%></td>
		<td width = "5%">应用版本:</td>
		<td width  = "5%"><%=appVersion%></td>
		<td width = "5%">服务器名称:</td>
		<td width  = "10%"><%=serverName%></td>
		<td width = "5%">服务器类别:</td>
		<td width  = "10%">
			<%
				if(serverCategory==1){
					%>JCF服务器<%
				}else if(serverCategory==2){
					%>适配服务器<%
				}else if(serverCategory==3){
					%>上下文服务器<%
				}else if(serverCategory==4){
					%>服务库<%
				}else{
					%>其他<%
				}
			%>
		</td>
	</tr>
</tbody>
