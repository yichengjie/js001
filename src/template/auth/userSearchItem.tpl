<table class="search table">
	<tr>
		<td align="middle">用户ID :</td>
		<td class="col-md-3">
			<input type = "text" id = "loginId" value = "<%=loginId%>" class="form-control" />
		</td>
		<td align="middle">角色 : </td>
		<td class="col-md-3">
			<select id = "roleId" class="form-control">
			<option selected= 'selected' value = "">全部</option>
			<% 
				for(var i=0; i < roleList.length; i++){ 
				var c = roleList[i] ;
				if(roleId==c.id){
					%><option value = '<%=c.id%>' selected= 'selected' ><%=c.name%></option><%	
				}else{
					%><option value = '<%=c.id%>' ><%=c.name%></option><%	
				}
			}%>
			</select>
		</td>
		<td><button class = "btn" id = "selectUser" type = "button">查询</button></td>
		<td><button class = "btn" id = "toAddUserUI" type = "button">新增用户</button></td>
	</tr>
 </table