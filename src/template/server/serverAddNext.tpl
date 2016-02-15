<!-- 模态框（Modal） -->
<div class="modal fade" id="addServerNextDialog" tabindex="-1" role="dialog" 
		aria-labelledby="myModalLabel" aria-hidden="true" data-backdrop="static">
   <div class="modal-dialog" style = "width:500px;">
      <div class="modal-content">
         <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
            <h4 class="modal-title" id="myModalLabel">确认添加服务器 </h4>
         </div>
         <div class="modal-body">
            <form class="form-horizontal" role="form">
			   <div class="form-group">
			      <label for="loginID" class="col-sm-4" control-label">服务器名称：</label>
			      <div class="col-sm-5">
			         <input type="text" readonly="readonly" class="form-control input-sm" value = "<%=serverName%>" placeholder="必填项">
			      </div>
			   </div>
			   
			   <div class="form-group">
			      <label for="loginID" class="col-sm-4" control-label">服务器类型：</label>
			      <div class="col-sm-5">
			         <input type="text" readonly="readonly" class="form-control input-sm" value = "<%=categoryName%>服务器" placeholder="必填项">
			      </div>
			   </div>
			   
			   <div class="form-group">
			      <label for="loginID" class="col-sm-4" control-label">服务器分组为：</label>
			      <div class="col-sm-5">
			         <input type="text" readonly="readonly"  class="form-control input-sm" value = "<%=groupName%>" >
			      </div>
			   </div>
			   
			   <div class="form-group">
			      <label for="loginID" class="col-sm-4" control-label">服务器IP为：</label>
			      <div class="col-sm-5">
			         <input type="text" readonly="readonly" name = "loginID" class="form-control input-sm" value = "<%=rmiRegistryHost%>" >
			      </div>
			   </div>
			   
			   <%
      			if(serverCategory!="3"){
      			%>
      			   <div class="form-group">
				      <label for="loginID" class="col-sm-4" control-label">JMX Registry端口：</label>
				      <div class="col-sm-5">
				         <input type="text" readonly="readonly" class="form-control input-sm" value = "<%=rmiRegistryPort%>" >
				      </div>
				   </div>
				   
				   <div class="form-group">
				      <label for="loginID" class="col-sm-4" control-label">JMX Server端口：</label>
				      <div class="col-sm-5">
				         <input type="text" readonly="readonly" class="form-control input-sm" value = "<%=rmiServerPort%>" >
				      </div>
				   </div>
      			<%
      			}
     		   %>
			</form>
			
			
         </div>
         
         <div class="modal-footer">
         	<span id = "showWaitInfo" class = "text-warning hide">服务器添加中，请耐心等待...</span>
            <button type="button" id = "addserverCloseBtn" class="btn btn-default" data-dismiss="modal">关闭</button>
            <button type="button" id = "addServerAndStart" class="btn btn-primary">添加并启动</button>
      	    <button type="button" id = "addServerNotStart" class="btn btn-primary" >添加</button>
         </div>
      </div><!-- /.modal-content -->
</div><!-- /.modal -->
