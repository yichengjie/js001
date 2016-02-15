<br/>
<div  id = "upContentRegion" >
	<div class = "row">
		<div class = "col-sm-2 text-right"><label for="addGroup_groupCategory" class="control-label">服务器组名称：</label></div>
		<div class = "col-sm-3">
			<select id = "serviceGroupName"  class  = "form-control input-sm">
	         	 	<option value="" selected="selected"></option>
	         	 	<%
	         	 		for(var i = 0 ; i < groupNameList.length ;i ++){
	         	 			%><option value="<%=groupNameList[i].groupId%>" ><%=groupNameList[i].groupName%></option><%
	         	 		}
	         	 	%>
	        </select>
		</div>
		
		<div class = "col-sm-2 text-right"><label for="addGroup_groupCategory" class="control-label">服务名称：</label></div>
		<div class = "col-sm-3">
			<select id = "serviceName"  class  = "form-control input-sm">
	         	<!-- <option value="" selected="selected"></option> -->
	        </select>
		</div>
	</div>
</div>
<div id = "showTipRegion"></div>
<br/>
<div id = "downContentRegion" ></div>