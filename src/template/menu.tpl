<%for(var i = 0 ; i < menus.length; i ++){%>
	<div>
		<a href="#<%=menus[i].key%>" class="menu<%=i+1%> <%if(menus[i].key==current){%>select<%}%>"><%=menus[i].value%></a>
	</div>
<%}%>

