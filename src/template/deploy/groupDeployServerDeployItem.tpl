<td><%=serverName%></td>
<td><%=groupName%></td>
<td><%=serverIp%></td>
<td>
	<%if("1"==serverCategory){
		%>JCF服务器<%
	}else if ("2"==serverCategory){
		%>适配服务器<%
	}else if ("3"==serverCategory){
		%>上下文服务器<%
	}else if ("4"==serverCategory){
		%>服务库<%
	}else{
		%><%=serverCategory%><%
	}%>
</td>
<td class = "serverAppInfoTd"><a href = "#">查看</a></td>
