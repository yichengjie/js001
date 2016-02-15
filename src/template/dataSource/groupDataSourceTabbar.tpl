<ul id="dataSourceNavbar" class="nav nav-tabs">
	<% for(var i = 0; i < labels.length; i++){%>
		<%if ((labels[i].id=="groupDataSource")
			||((labels[i].id=="groupDeployDataSource") && (dataSourceDeployAuth=="true"))||
			((labels[i].id=="groupDataSourceConfig") && (dataSourceConfigAuth=="true"))){%>
				<li id="<%=labels[i].id%>" class="<%if(current==labels[i].id){%>active<%}%>">
					<a href="#dataSrcMgr/group/param/groupId=<%=groupId%>&selectTab=<%=labels[i].id%>"><%=labels[i].name%></a>
				</li>
		<%}%>
	<%}%>
</ul>