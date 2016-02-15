 <div class = "col-sm-2 text-right" ><label for="groupName" class="control-label">部署状态：</label></div>
   <div class = "col-sm-4" >
	<select  id = "deployStatus4Search" class = "form-control input-sm">
		<%
			if(status=="0"){
			  %><option selected="selected" value="0">全部</option><%
			}else{
			  %><option value="0">全部</option><%
			}
			
			if(status=="1"){
			  %><option selected="selected" value="1">已部署</option><%
			}else{
			  %><option value="1">已部署</option><%
			}
			if(status=="2"){
			  %><option selected="selected" value="2">部署失败</option><%
			}else{
			  %><option value="2">部署失败</option><%
			}
			
			if(status=="4"){
			  %><option  selected="selected" value="4">反部署失败</option><%
			}else{
			  %><option   value="4">反部署失败</option><%
			}
			
			if(status=="5"){
			  %><option  selected="selected" value="5">已回滚</option><%
			}else{
			  %><option value="5">已回滚</option><%
			}
			
			if(status=="6"){
			  %><option  selected="selected" value="6">回滚失败</option><%
			}else{
			  %><option value="6">回滚失败</option><%
			}
		%>
	</select>
</div>
<div class = "col-sm-2" ><button type="button"  class="btn">查询</button></div>