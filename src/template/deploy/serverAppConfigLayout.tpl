<div  id = "baseInfoRegion" ></div>
<div id = "tipInfoRegion"></div>
<div>
	<form id = "uploadAppCfgForm"   method="post" enctype="multipart/form-data" target="hidden_frame">
		<table class="table">
	   		<caption>上传配置文件</caption>
	   		 <tbody>
	   			<tr>
	   				<td width = "20%"><input type="file" id="inputfile" name = "inputfile" /></td>
	   				<td width  = "10%">
	   					<button id = "uploadAppCfgBtn" type="button" class="btn input-sm  <%if(uploadCfgAuthFlag!='true'){%>disabled<%}%>">提交</button>
	   				</td>
	   				<td><span class = "text-info">(文件后缀满足:properties,txt,xml,cfg,drl,且文件大小不超过1MB)</span></td>
	   				<td width = "*%"></td>
	   			</tr>
	   		 </tbody>
	   	</table>
   	</form>
</div>

<iframe name="hidden_frame" style="display:none;"></iframe>
    
<div  id = "currentDirRegion" ></div>
<br>
<div id = "listRegion" ></div>
<div id = "pagebarRegion" ></div>

<button id = "toLastPageBtn" class = "btn btn-primary" >返回</button>
