 <% for(var i=0; i < groups.length; i++){ %>
 	<ul class="nav nav-list" >
 		<li id="<%=groups[i].groupId%>" class="group <%if(groups[i].groupId == current){%>select<%}%>">
		 	<a href="#logMgr/group/param/groupId=<%=groups[i].groupId%>" class="group"><%=groups[i].groupName%></a>
	  	</li>
    </ul>
 <%}%>
