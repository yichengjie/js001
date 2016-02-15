<div class="col-md-4" style="margin-top: 28px;">
	共 <span class="myblue"><%=page.recordCount%></span> 条,共 <span class="myblue"><%=page.pageCount%></span> 页,当前 <span class="myblue"><%=page.currentPage%></span>页;
	每页<input type="text" value="<%=page.pageSize%>" id="pageSize" style="width:25px;height:23px;"/>条
</div>

<div class="col-md-offset-8">
	 <ul class="pagination">
	 	<%
		 	if(1==page.currentPage){
		%>
		       <li class="disabled">
		 	     <a href="javascript:void(0)" pageNum='1'>&laquo;</a>
		       </li>
		<%
		 	}else{
		%>
			   <li>
				  <a class="canClick" href="javascript:void(0)" pageNum='1'>&laquo;</a>
			   </li>
		<%
		 	}
		%>
		 
		 <%
		 	for(var i=page.beginPageIndex; i<=page.endPageIndex; i++){
			 	if(page.currentPage!=i){
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
		 
		 <%
		 	if(page.pageCount==page.currentPage){
		 %>
		 		<li class="disabled">
		 			<a href="javascript:void(0)" pageNum='<%=page.pageCount%>'>&raquo;</a>
		 		</li>
		 <%
		 	}else{
		 %>
		 		<li >
		 			<a class="canClick" href="javascript:void(0)" pageNum='<%=page.pageCount%>'>&raquo;</a>
		 		</li>
		 <%
		 	}
		 %>
	 </ul>
</div>