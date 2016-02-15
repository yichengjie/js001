<div <%if(flag=="true"){%>class="alert alert-success"<%}else{%>class="alert alert-danger"<%}%> >
	<button type="button" class="close" data-dismiss="alert" aria-hidden="true"> &times;</button>
    <%=msg%>
</div>