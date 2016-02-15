<td><input  type="checkbox" name="serverIds" value="<%=id%>" title="<%=name%>"  checked="checked"/></td>
<td><%=name%></td>
<td>
	<%
		if(category=="1"){
			%>JCF服务器<%	
		}else if (category=="2"){
			%>适配服务器<%
		}else if (category=="3"){
			%>上下文服务器<%
		}else if (category=="4"){
			%>服务库<%
		}else{
			%><%=category%><%
		}
	%>
</td>
<td><%=ip%></td>