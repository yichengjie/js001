<br/>
<form class="form-horizontal" id = "addRoleForm"  role="form" method= "POST">
	  <div class="form-group" id = "nameDiv" >
	      <label for="name" class="col-sm-3 control-label">角色名称：</label>
	      <div class="col-sm-4">
	        <input type="text" id="name"   class="form-control input-sm"  placeholder="必填项" />
	      </div>
	      <div><span class = "text-danger">*</span><span id = "nameTip"></span></div>
   	  </div>
	  <div class="form-group" id = "descriptionDiv" >
	      <label for="description" class="col-sm-3 control-label">角色描述：</label>
	      <div class="col-sm-4">
	        <input type="text" id="description"   class="form-control input-sm"  placeholder="必填项" />
	      </div>
	      <div><span class = "text-danger">*</span><span id = "descriptionTip"></span></div>
   	  </div>
</form>

<input type = "hidden" id = "menuIds" value = "" />

<div class="form-group">
  <div class="col-sm-offset-2">
     <button type="button" id = "backLastPageBtn" class="btn">返回</button>
     <button type="button" id = "addRoleBtn" class="btn btn-primary">提交</button>
     <span id = "powerTip" class = "text-danger"></span>
  </div>
</div>

<div class="zTreeDemoBackground" style="padding-left:120px;width:270px;display:table-cell;">
	<ul id="roleTree1" class="ztree"></ul>
</div>
<div class="zTreeDemoBackground" style="padding-left:150px;width:270px;display:table-cell;">
	<ul id="roleTree2" class="ztree"></ul>
</div>
