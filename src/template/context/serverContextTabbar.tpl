<ul id="ContextNavbar" class="nav nav-tabs">
	<% for(var i = 0; i < labels.length; i++){ %>
		<%if ((labels[i].id=="contextConfig") && (contextConfigAuth!="true")){%>
		<%}else{%>
			<li id="<%=labels[i].id%>" class="<%if(current==labels[i].id){%>active<%}%>">
				<a href="#contextMgr/server/param/serverId=<%=serverId%>&selectTab=<%=labels[i].id%>"><%=labels[i].name%></a>
			</li>
		<%}%>
	<%}%>
</ul>
