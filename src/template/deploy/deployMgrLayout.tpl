<div>
	<ul class="nav nav-tabs" id = "deployMgrNav">
		<li <%if(selectedPageUI=="showAllAppUI"){%>class = "active"<%} %> ><a href="showAllAppUI">查看应用部署</a></li>
		<%if(uploadAppAuthFlag=="true"){
			%><li <%if(selectedPageUI=="updateAppUI"){%>class = "active"<%} %> ><a href="updateAppUI" >上传应用</a></li><%
		}%>
	</ul>
</div>
<br/>
<div id = "downContentRegion"></div>
<div id = "pagebarRegion"></div>





