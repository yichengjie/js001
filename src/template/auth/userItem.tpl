<td><%=loginID%></td>
<td><%=name%></td>
<td><%=roleName%></td>
<td><a href = "javascript:void(0)" class = "oper detail" value = "<%=id%>" >查看</a></td>
<td><a href = "javascript:void(0)" class ="oper modify" value = "<%=id%>" >修改</a>
<%if(loginID!="admin"){
%>|<a href = "javascript:void(0)" class = "oper delete" value = "<%=id%>" loginID = "<%=loginID%>" >删除</a><%
}%>
</td>
