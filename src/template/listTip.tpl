<%
	if(succList.length>0){
	  %>
		<div class="alert alert-success">
			 <button type="button" class="close" data-dismiss="alert" aria-hidden="true"> &times;</button>
		   <%
			  for(var i = 0 ; i < succList.length ; i ++){
			  %>
				 <%=succList[i]%><br/>
			  <%
			}	
		   %>
		</div>
	  <%
	}
	
	if(errList.length>0){
	  %>
		<div class="alert alert-danger">
			<button type="button" class="close" data-dismiss="alert" aria-hidden="true"> &times;</button>
		   <%
			  for(var j = 0 ; j < errList.length ; j ++){
			  %>
				 <%=errList[j]%><br/>
			  <%
			}	
		   %>
		</div>
	  <%
	}
%>