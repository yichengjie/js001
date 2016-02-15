<div id = "showTipInfoRegion"></div>
<div class = "row">
		<div class = "col-sm-2 text-right"><label class="control-label">应用路径:</label></div>
		<div class = "col-sm-3"><input type="text" id="uploadAppName"  readonly="readonly" class="form-control"  placeholder="必填项" /></div>
		<div class = "col-sm-1"><button type="submit" id = "uploadAppBtn"  class="btn btn-default">上传</button></div>
</div>

<hr/>
<div class = "row">
   <div class = "col-sm-2 text-right"><button type="button" id = "backParentFilePathBtn" class="btn btn-default">上层目录</button></div>
   <div class = "col-sm-2 text-right"><label class="control-label">当前目录:</label></div>
   <div class = "col-sm-6"><div id = "currentFilePathRegion"></div></div>
</div>

<br/>
<div id = "listRegion" ></div><!--显示列表区域-->
<div id = "pagebarRegion" ></div><!--显示分页栏条区域-->
<div id = "alreadyUploadAppRegion" ></div><!--显示已上传引用区域-->
<br/>