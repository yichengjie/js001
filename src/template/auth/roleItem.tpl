<td><%=id%></td>
<td><%=name%></td>
<td><%=description%></td>
<td> <a class = "view myhand">查看</a></td>


<td>
	<%if(name=='系统管理员'){
		%>无操作<%
	}else{
		%>
			<a class = "update myhand">修改</a>|
			<%if(currentLoginRoleName==name){
				%>删除<%
			}else{
				%><a class = "delete myhand">删除</a><%
			}
	}%>
	
</td>