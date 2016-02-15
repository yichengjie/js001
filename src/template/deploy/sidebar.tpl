 <% for(var i=0; i < groups.length; i++){ %>
 	<ul class="nav nav-list" >
 		<li id="<%=groups[i].groupId%>" class="group <%if(groups[i].groupId == current){%>select<%}%>">
 			<% if(groups[i].servers != undefined&&groups[i].servers .length>0){%>
	  			<span class="open_or_closeGroup groupOpen" ></span>
 			<% } %>
		 		<a href="#deployMgr/group/param/groupId=<%=groups[i].groupId%>" class="group"><%=groups[i].groupName%></a>
	  	</li>
	  	
	    <% if(groups[i].servers != undefined){ %>
	    	 <% for(var j=0; j < groups[i].servers.length; j++){ %>
	    	 	<li id="<%=groups[i].servers[j].id%>" class="server <%if(groups[i].servers[j].id == current){%>select<%}%>">
	    	 		<a href="#deployMgr/server/param/serverId=<%=groups[i].servers[j].id%>" class="server"><%=groups[i].servers[j].name%></a>
	    	 	</li>
	    	 <%}%>
	    <%}%>
    </ul>
 <%}%>
