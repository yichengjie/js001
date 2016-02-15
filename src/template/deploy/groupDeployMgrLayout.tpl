<ul class="nav nav-tabs" id = "groupDeployMgrNav">
	<li <%if("showAllAppUI"==selectedPageUI){%>class = "active"<%}%>><a href="showAllAppUI">应用管理</a></li>
	<%if(createNewDeployAuthFlag=="true"){
	   %>
		 <li <%if("createNewDeployUI"==selectedPageUI){%>class = "active"<%}%>><a href="createNewDeployUI" >新建部署</a></li>
	   <%
	}%>
	<li <%if("showServerDeployInfoUI"==selectedPageUI){%>class = "active"<%}%>><a href="showServerDeployInfoUI" >服务器部署情况</a></li>
</ul>
<br/>
<div id = "downContentRegion"></div>
<input type = "hidden" id = "groupDeploy4GroupIdHidden" value = "<%=groupId%>"/>