<br/>
<form class="form-horizontal" role="form">

   <div class="form-group" id = "loginIDDiv" >
      <label for="loginID" class="col-sm-2 control-label">用户ID：</label>
      <div class="col-sm-3">
        <input type="text" id="loginID"   class="form-control input-sm"  placeholder="必填项" />
      </div>
      <div><span class = "text-danger">*</span><span id = "loginIDTip"></span></div>
   </div>
   
   
   <div class="form-group" id = "nameDiv" >
      <label for="name" class="col-sm-2 control-label">用户名称：</label>
      <div class="col-sm-3">
        <input type="text" id="name"  value = " " class="form-control input-sm"  placeholder="必填项" />
      </div>
      <div><span class = "text-danger">*</span><span id = "nameTip"></span></div>
   </div>
   
   <div class="form-group" id = "passwordDiv" >
      <label for="password" class="col-sm-2 control-label">密码：</label>
      <div class="col-sm-3">
        <input type="password" id="password"   class="form-control input-sm"  placeholder="必填项" />
      </div>
      <div><span class = "text-danger">*</span><span id = "passwordTip"></span></div>
   </div>
   
   <div class="form-group" id = "confirmpasswordDiv" >
      <label for="confirmpassword" class="col-sm-2 control-label">确认密码：</label>
      <div class="col-sm-3">
        <input type="password" id="confirmpassword"   class="form-control input-sm"  placeholder="必填项" />
      </div>
      <div><span class = "text-danger">*</span><span id = "confirmpasswordTip"></span></div>
   </div>
   
   <div class="form-group" id = "deptIdDiv" >
      <label for="deptId" class="col-sm-2 control-label">部门：</label>
      <div class="col-sm-3">
        <input type="deptId" id="deptId"   class="form-control input-sm"  placeholder="" />
      </div>
      <div><span id = "deptIdTip"></span></div>
   </div>
   
   <div class="form-group" id = "postDiv" >
      <label for="post" class="col-sm-2 control-label">职务：</label>
      <div class="col-sm-3">
        <input type="post" id="post"   class="form-control input-sm"  placeholder="" />
      </div>
      <div><span id = "postTip"></span></div>
   </div>
   
   <div class="form-group" id = "telDiv" >
      <label for="tel" class="col-sm-2 control-label">电话：</label>
      <div class="col-sm-3">
        <input type="tel" id="tel"   class="form-control input-sm"  placeholder="" />
      </div>
      <div><span id = "telTip"></span></div>
   </div>
   
   <div class="form-group" id = "roleIdDiv" >
      <label for="roleId" class="col-sm-2 control-label">角色：</label>
      <div class="col-sm-3">
      	 <select id = "roleId" name="roleId"  class = "form-control input-sm">
         		<%
         			for(var i = 0 ; i < list.length ; i ++){
         			  if(i==0){
         		%>
         			    <option selected="selected" value = "<%=list[i].id%>" ><%=list[i].name%></option>
         		<%	  
         			  }else{
         		%>
         				<option  value = "<%=list[i].id%>" ><%=list[i].name%></option>
         		<%  
         			  }
         			}
         		%>
		 </select>
      </div>
      <div><span class = "text-danger">*</span><span id = "roleIdTip"></span></div>
   </div>
   
   <div class="form-group" id = "emailDiv" >
      <label for="email" class="col-sm-2 control-label">邮箱：</label>
      <div class="col-sm-3">
        <input type="tel" id="email"   class="form-control input-sm"  placeholder="" />
      </div>
      <div><span id = "emailTip"></span></div>
   </div>
   
   
   <div class="form-group">
      <div class="col-sm-offset-2 col-sm-10">
         <button type="button" id = "addUser" class="btn btn-primary">添加</button>
      	 <button type="button" id = "back" class="btn" >返回</button>
      </div>
   </div>
</form>
