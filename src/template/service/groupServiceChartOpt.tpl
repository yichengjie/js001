<div id = "queryGroupDataModal" class="modal" aria-hidden="true" style="z-index:10400;"  data-backdrop="static">
   <div class="modal-dialog" style = "width:700px;">
      <div class="modal-content">
         <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
            <h4 class="modal-title" id="myModalLabel">数据查询选项</h4>
         </div>
         <div class="modal-body">
         <form class="form-horizontal"  role="form" method= "POST">
 	          <div class="form-group" id = "addGroup_groupCategoryDiv" >
			      <label for="addGroup_groupCategory" class="col-sm-3 control-label">数据类型：</label>
			      <div class="col-sm-5">
			          <select id="dataType"  class  = "form-control input-sm">
			          	 <%
					      	   if(1==checkGroupCategory){
					      		  %><option selected = "selected"  value = "1" >实时数据</option>
					     			<option value = "2" >历史数据</option><%
					      	   }else{
					      	 	  %><option value = "1" >实时数据</option>
					     			<option selected = "selected" value = "2" >历史数据</option><%
					      	   }
					     %>
				     </select>
			      </div>
			  </div>	
         	  			
 			  <div class="form-group" id = "addGroup_groupNameDiv" >
			      <label for="addGroup_groupCategory" class="col-sm-3 control-label">处理类型：</label>
			      <div class="col-sm-5">
			          <select id="disposeType"  class  = "form-control input-sm">
					     <option selected = "selected"  value = "1" >处理时间</option>
					     <option value = "2" >处理结果</option>
				     </select>
			      </div>
			   </div>
         </form>
          <%
		   	if(checkGroupCategory=="2"){//选择历史数据
		  %>
		   	   	<form class="form-horizontal" id = "addServerForm"  role="form" method= "POST">
		   	   		
		   	   		<div class="form-group" id = "addGroup_groupPasswordDiv" >
					      <label for="addGroup_groupPassword" class="col-sm-3 control-label">开始日期：</label>
					      <div class="col-sm-5">
					      	<input type="text" id="startTime" type="text" class="form-control input-sm"  placeholder="必填项" />
							
					      </div>
					      <div>
					      		<span class = "text-danger">
					      			<img  id="startDate" src="./static/js/seajs-modules/My97DatePicker/skin/datePicker.gif"width="16" height="22" align="absmiddle">
					      		</span>
					      		<span id = "addGroup_groupPasswordTip"></span>
					      </div>
				    </div>
		   	   		
		   	   		<div class="form-group" id = "addGroup_broadcastURLDiv" >
					      <label for="addGroup_broadcastURL" class="col-sm-3 control-label">结束日期：</label>
					      <div class="col-sm-5">
					      	<input type="text" id="endTime" type="text" class="form-control input-sm"  placeholder="必填项" />
							
					      </div>
					      <div><span class = "text-danger">
					      	<img  id="endDate" src="./static/js/seajs-modules/My97DatePicker/skin/datePicker.gif"width="16" height="22" align="absmiddle"></span>
					      	<span id = "addGroup_groupPasswordTip"></span>
					      </div>
				    </div>
		   	   	</form>
		   	<%
		   	}
		   %>
         </div>
         <div class="modal-footer">
            <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
            <button id = "queryDataBtn" type="button" class="btn btn-primary">查询 </button>
         </div>
      </div>
</div>