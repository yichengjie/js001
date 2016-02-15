<ul id="dataSourceNavbar" class="nav nav-tabs">
	<% for(var i = 0; i < labels.length; i++){ %>
		<%if ((labels[i].id=="deployDataSource") && (deployDataSourceAuth!="true")){%>
		<%}else{%>
			<li id="<%=labels[i].id%>" class="<%if(current==labels[i].id){%>active<%}%>">
				<a href="#dataSrcMgr/server/param/serverId=<%=serverId%>&selectTab=<%=labels[i].id%>"><%=labels[i].name%></a>
			</li>
		<%}%>
	<%}%>
</ul>
