 <% for(var i=0; i < groups.length; i++){ %>
 	<ul class="nav nav-list" >
 		<li class="nav-header group">
 			<% if(groups[i].servers != undefined&&groups[i].servers .length>0){%>
	  			<span class="open_or_closeGroup myhand groupOpen" >&nbsp;&nbsp;</span>
 			<% }else{
 			%>
 				&nbsp;&nbsp;&nbsp;
 			<%
 			}%>
		 		<a class="groupName myhand"  myid = "<%=groups[i].groupId%>" ><%=groups[i].groupName%></a>
	  	</li>
	  	
	    <% if(groups[i].servers != undefined){ %>
	    	 <% for(var j=0; j < groups[i].servers.length; j++){ %>
	    	 	<li class = "server"><a class = "myhand" myid = "<%=groups[i].servers[j].id%>">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<%=groups[i].servers[j].name%></a></li>
	    	 <%}%>
	    <%}%>
    </ul>
 <%}%>
