<div class = "row">
	<div class = "col-sm-2 text-right" ><label for="groupName" class="control-label">部署状态：</label></div>
	<div class = "col-sm-4" >
		<select  id = "deployStatus4Search" class = "form-control input-sm">
			<option <%if(status=="0"){%>selected="selected"<%} %>  value="0">全部</option>
			<option <%if(status=="1"){%>selected="selected"<%} %> value="1">已部署</option>
			<option <%if(status=="2"){%>selected="selected"<%}%>  value="2">部署失败</option>
			<option <%if(status=="4"){%>selected="selected"<%} %>  value="4">反部署失败</option>
		</select>
	</div>
	<div class = "col-sm-2" ><button  id = "groupAppMgrSearchBtn" type="button"  class="btn">查询</button></div>
</div>
<br/>
<div id = "tipInfoRegion"></div>
<div id = "listRegion" ></div>
<div id = "pagebarRegion"></div>
<input type = "hidden" id = "hiddenGroupId" value = "<%=groupId%>"/>
<input type = "hidden" id = "freshPage4GroupAppTabUrl"/>
<input type = "hidden" id = "freshPage4GroupAppTabFlag"/>


