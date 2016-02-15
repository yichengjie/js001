<br/>
<div id = "tipInfoRegion"></div>
<div  id = "searchBarRegion">
	<div class = "row">
		<div class = "col-sm-2 text-right"><label for="addGroup_groupCategory" class="control-label">服务类型：</label></div>
		<div class = "col-sm-2">
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
		</div>
		<div class = "col-sm-2 text-right"><label for="addGroup_groupCategory" class="control-label">运行状态：</label></div>
		<div class = "col-sm-2">
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
		</div>
		<div class = "col-sm-2"><button id= "searchServerServiceBtn" class = "btn">查询</button></div>
	</div>
</div>
<br/>
<div  id = "listRegion"></div>
<div  id = "pagebarRegion"></div>
<input id = "hiddenServerIdOnPage" type = "hidden" value = "<%=serverId%>"/>
<input id = "freshPage4ServerServiceFlag" type = "hidden" />
<input id = "freshPage4ServerServiceUrl" type = "hidden" />