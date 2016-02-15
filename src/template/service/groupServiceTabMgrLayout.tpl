<div id = "tipInfoRegion"></div>
<div  id = "searchBarRegion">
	<table class = "table">
		<tr>
			<td width = "8%">服务类型:</td>
			<td width = "20%">
				<select id = "search4ServiceType"  class  = "form-control input-sm">
	         	 	<option value="" selected="selected">全部</option>
	         	 	<%
	         	 		for(var i = 0 ; i < categoryList.length ; i ++){
	         	 			if(paramCategory==categoryList[i].key){
	         	 				%><option selected = "selected" value="<%=categoryList[i].key%>"><%=categoryList[i].value%></option><%
	         	 			}else{
	         	 				%><option value="<%=categoryList[i].key%>"><%=categoryList[i].value%></option><%
	         	 			}
	         	 		}
	         	 	%>
         	 	</select>
			</td>
			<td width = "8%">运行状态:</td>
			<td width = "20%">
				<select id = "search4RuningStatus"  class  = "form-control input-sm">
	         	 	<option value="" selected="selected">全部</option>
	         	 	<%
	         	 		for(var j = 0 ; j < statusList.length ; j ++){
	         	 			if(paramStatus==statusList[j].key){
	         	 			   %><option selected = "selected" value="<%=statusList[j].key%>"><%=statusList[j].value%></option><%
	         	 			}else{
	         	 			   %><option value="<%=statusList[j].key%>"><%=statusList[j].value%></option><%
	         	 			}
	         	 		}
	         	 	%>
         	 	</select>
			</td>
			<td width = "8%">应用列表:</td>
			<td width = "20%">
				<select id = "search4AppName"  class  = "form-control input-sm">
	         	 	<option value="" selected="selected">全部</option>
					<%
	         	 		for(var k = 0 ; k < appNameList.length ; k ++){
	         	 			if(paramAppName==appNameList[k]){
	         	 				%><option selected = "selected" value="<%=appNameList[k]%>"><%=appNameList[k]%></option><%
	         	 			}else{
	         	 				%><option value="<%=appNameList[k]%>"><%=appNameList[k]%></option><%
	         	 			}
	         	 		}
	         	 	%>
         	 	</select>
			</td>
			<td width = "8%"><button id = "searchGroupServiceBtn"  class = "btn">查询</button></td>
			<td width = "*%"></td>
		</tr>
	</table>
</div>
<div  id = "listRegion"></div>
<div  id = "pagebarRegion"></div>
<input id = "hiddenGroupIdOnPage" type = "hidden" value = "<%=groupId%>"/>
<input id = "freshPage4GroupServiceFlag" type = "hidden" />
<input id = "freshPage4GroupServiceUrl" type = "hidden" />
