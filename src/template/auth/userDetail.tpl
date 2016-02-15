<br/>
<form class="form-horizontal" role="form">
   <div class="form-group" id = "loginIDDiv" >
      <label for="loginID" class="col-sm-3 control-label">用户ID：</label>
      <div class="col-sm-4"><input type = "text" disabled="disabled"  id="loginID"  value = "<%=model.loginID%>"   class="form-control input-sm"    /></div>
   </div>
   
   
   <div class="form-group" id = "nameDiv" >
      <label for="name" class="col-sm-3 control-label">用户名称：</label>
      <div class="col-sm-4">
      	<input type = "text" disabled="disabled"  id="name"  value = "<%=model.name%>"   class="form-control input-sm"    />
      </div>
   </div>
   
   
   <div class="form-group" id = "deptIdDiv" >
      <label for="deptId" class="col-sm-3 control-label">部门：</label>
      <div class="col-sm-4">
      	<input type = "text" disabled="disabled"  id="deptId"  value = "<%=model.deptId%>"   class="form-control input-sm"    />
      </div>
   </div>
   
   <div class="form-group" id = "postDiv" >
      <label for="post" class="col-sm-3 control-label">职务：</label>
      <div class="col-sm-4">
      	<input type = "text" disabled="disabled"  id="post"  value = "<%=model.post%>"   class="form-control input-sm"    />
      </div>
   </div>
   
   
    <div class="form-group" id = "telDiv" >
      <label for="tel" class="col-sm-3 control-label">电话：</label>
      <div class="col-sm-4">
      	<input type = "text" disabled="disabled"  id="tel"  value = "<%=model.tel%>"   class="form-control input-sm"    />
      </div>
   </div>
   
   
   <div class="form-group" id = "roleIdDiv" >
      <label for="roleId" class="col-sm-3 control-label">角色：</label>
      <div class="col-sm-4">
      	<input type = "text" disabled="disabled"  id="roleId"  value = "<%=model.roleName%>"   class="form-control input-sm"    />
      </div>
   </div>
   
   
   <div class="form-group" id = "emailDiv" >
      <label for="email" class="col-sm-3 control-label">邮箱：</label>
      <div class="col-sm-4">
      	<input type = "text" disabled="disabled"  id="email"  value = "<%=model.email%>"   class="form-control input-sm"    />
      </div>
   </div>

   
     <div class="form-group">
      <div class="col-sm-offset-3">
      	 <button type="button" id = "back" class="btn btn-primary" >返回</button>
      </div>
   </div>
</form>
