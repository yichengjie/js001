<br/>
<form class="form-horizontal" role="form">
	
   <input type = "hidden" id = "id" value = "<%=model.id%>" />
	
	
   <div class="form-group" id = "loginIDDiv" >
      <label for="loginID" class="col-sm-3 control-label">用户ID：</label>
      <div class="col-sm-4">
        <input type="text" readonly = "readonly" id="loginID"  value = "<%=model.loginID%>"  class="form-control input-sm"   placeholder="必填项" />
      </div>
      <div><span class = "text-danger">*</span><span id = "loginIDTip"></span></div>
   </div>
	
  
   
   <div class="form-group" id = "nameDiv" >
      <label for="name" class="col-sm-3 control-label">用户名称：</label>
      <div class="col-sm-4">
        <input type="text" id="name"  value = "<%=model.name%>"  class="form-control input-sm"   placeholder="必填项" />
      </div>
      <div><span class = "text-danger">*</span><span id = "nameTip"></span></div>
   </div>
   
   <div class="form-group" id = "passwordDiv" >
      <label for="password" class="col-sm-3 control-label">密码：</label>
      <div class="col-sm-4">
        <input type="password" id="password"  value = ""  class="form-control input-sm"   placeholder="必填项" />
      </div>
      <div><span class = "text-danger">*</span><span id = "passwordTip"></span></div>
   </div>
   
   <div class="form-group" id = "confirmpasswordDiv" >
      <label for="confirmpassword" class="col-sm-3 control-label">确认密码：</label>
      <div class="col-sm-4">
        <input type="password" id="confirmpassword"  value = ""  class="form-control input-sm"   placeholder="必填项" />
      </div>
      <div><span class = "text-danger">*</span><span id = "confirmpasswordTip"></span></div>
   </div>
   
   <div class="form-group" id = "deptIdDiv" >
      <label for="deptId" class="col-sm-3 control-label">部门：</label>
      <div class="col-sm-4">
        <input type="text" id="deptId"  value = "<%=model.deptId%>"  class="form-control input-sm"  />
      </div>
      <div><span class = "text-danger"></span><span id = "deptIdTip"></span></div>
   </div>
   
   <div class="form-group" id = "postDiv" >
      <label for="post" class="col-sm-3 control-label">职务：</label>
      <div class="col-sm-4">
        <input type="text" id="post"  value = "<%=model.post%>"  class="form-control input-sm"  />
      </div>
      <div><span class = "text-danger"></span><span id = "postTip"></span></div>
   </div>
 
   <div class="form-group" id = "telDiv" >
      <label for="tel" class="col-sm-3 control-label">电话：</label>
      <div class="col-sm-4">
        <input type="text" id="tel"  value = "<%=model.tel%>"  class="form-control input-sm"  />
      </div>
      <div><span class = "text-danger"></span><span id = "telTip"></span></div>
   </div>
  
  <div class="form-group" id = "roleIdDiv" >
      <label for="roleId" class="col-sm-3 control-label">角色：</label>
      <div class="col-sm-4">
      	<% if("false"==model.canMod){ %>
      	<input type="hidden" id="roleId" value = "<%=model.roleId%>" />
      	<select id = "roleId" name="roleId" disabled="disabled" class = "form-control input-sm">
      	<% }else{ %>
      	<select id = "roleId" name="roleId" class = "form-control input-sm">
      	<% } %>
      			<%
					for(var i = 0 ; i <roleList.length; i ++){
					  if(model.roleId==roleList[i].id){
					  	%>
					  		<option selected = "selected" value = "<%=roleList[i].id%>" ><%=roleList[i].name%></option>
					  	<%
					  }else{
						%>
						    <option value = "<%=roleList[i].id%>" ><%=roleList[i].name%></option>
						<%
					  }
					}
				%>
      	</select>
      </div>
      <div><span class = "text-danger"></span><span id = "roleIdTip"></span></div>
   </div>
   
   
   <div class="form-group" id = "emailDiv" >
      <label for="email" class="col-sm-3 control-label">邮箱：</label>
      <div class="col-sm-4">
        <input type="text" id="email"  value = "<%=model.email%>"  class="form-control input-sm"  />
      </div>
      <div><span class = "text-danger"></span><span id = "emailTip"></span></div>
   </div>
   
   <div class="form-group">
      <div class="col-sm-offset-3">
         <button type="button" id = "modifyUser" class="btn btn-primary">修改</button>
      	 <button type="button" id = "back" class="btn btn-primary" >返回</button>
      </div>
   </div>
</form>