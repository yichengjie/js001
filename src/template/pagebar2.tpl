<div class="pageInfo">
	共 <span class="myblue"><%=recordCount%></span> 条,共 <span class="myblue"><%=pageCount%></span> 页,当前 <span class="myblue"><%=currentPage%></span>页;
	每页<input id="pageSize" type="text" value="<%=pageSize%>"/>条
	<input type = "hidden" id = "currentPage" value = "<%=currentPage%>"/>
	<input type = "hidden" id = "pageCount" value = "<%=pageCount%>"/>
</div>
<div>
	<ul class="pagination">
		<li class="<% if(currentPage <= 1){ %> disabled <% } %>">
			<a class="<% if(currentPage > 1){ %> canClick <% } %>" href="javascript:void(0)" pageNum='1'>&laquo;</a>
	    </li>
		<%for(var i=beginPageIndex; i<=endPageIndex; i++){
			if(currentPage!=i){
		%>
			<li>
				<a class="canClick" href="javascript:void(0)" pageNum='<%=i%>'><%=i%></a>
			</li>
		<%
			}else{
		 %>
			<li class="active">
				<a href="javascript:void(0)" pageNum='<%=i%>'><%=i%></a>
			</li>
		 <%
		 	}
		}
		%>
		<li class="<% if(currentPage >= pageCount){ %> disabled <% } %>">
			<a class="<% if(currentPage < pageCount){ %> canClick <% } %>" href="javascript:void(0)" pageNum='<%=pageCount%>'>&raquo;</a>
		</li>
 </ul>
</div>