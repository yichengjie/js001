<div>
	<ul class="nav nav-tabs " id = "serverMgrNav">     
		<%
			if(((groupCategory=="1"||groupCategory=="6"||groupCategory=="7")&&jcfGroupCfgFlag=="true")||
				groupCategory=="4"&&registryGroupCfgFlag=="true"
			){//jcf和适配器
		%>
			    <li <%if(selectedPageUI=="serverGroupConfig"){%>class = 'active'<%}%> ><a href="serverGroupConfig">服务器组配置</a></li>      
		<%	
			}
		%>
		<li <%if(selectedPageUI=="serverGroupList"){%>class = 'active'<%}%> ><a href="serverGroupList">服务器控制</a></li>      
	</ul>
	<input type = "hidden" id = "hiddenGroupId" value = "<%=hiddenGroupId%>">
</div>
<div id = "tipInfoRegion"></div>
<div  id = "searchRegion"></div>
<div  id = "listRegion"></div>
<div  id = "pagebarRegion"></div>
<input id = "freshPage4GroupServerFlag" type = "hidden" />
<input id = "freshPage4GroupServerUrl" type = "hidden" />