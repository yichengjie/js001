<ul class="nav nav-tabs" id = "groupServiceMgrNav">
		<%
			if("showServiceMgrUI"==selectedPageUI){
				%><li class = "active"><a href="showServiceMgrUI">服务管理</a></li><%
			}else{
				%><li><a href="showServiceMgrUI">服务管理</a></li><%
			}
			if("configGroupServiceUI"==selectedPageUI){
				%><li class = "active"><a href="configGroupServiceUI" >组服务配置</a></li> <%
			}else{
				%><li><a href="configGroupServiceUI" >组服务配置</a></li> <%
			}
		%>
</ul>
<br/>
<div id = "downContentRegion"></div>
<input type = "hidden" id = "groupService4GroupIdHidden" value = "<%=groupId%>"/>