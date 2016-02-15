<br/>
<form class="form-horizontal" role="form">
   <div class="form-group" id = "nodeControllerIpDiv" >
      <label for="nodeControllerIp" class="col-sm-3 control-label">节点控制器IP：</label>
      <div class="col-sm-4">
        <select id = "nodeControllerIp" class="form-control input-sm" >
        	<% for(var i = 0 ; i < nodeIpList.length ;i ++){
        			var curIpInfo = nodeIpList[i] ;
        		if(i == 0){
        	%>
        			<option value = "<%=curIpInfo.serverIp%>" selected="selected" ><%=curIpInfo.serverIp%></option>
        	<%
        		}else{
        	%>
        			<option value = "<%=curIpInfo.serverIp%>" ><%=curIpInfo.serverIp%></option>
        	<%
        		}
        	}%>
        </select>
      </div>
   </div>

   <div class="form-group" id = "nodeLevelDiv" >
      <label for="nodeLevel" class="col-sm-3 control-label">节点控制器日志级别：</label>
      <div class="col-sm-4">
        <select id = "nodeLevel" class="form-control input-sm" >
        	<option value = "DEBUG" selected="selected">DEBUG</option>
			<option value = "INFO" >INFO</option>
			<option value = "ERROR" >ERROR</option>
        </select>
      </div>
   </div>

   <div class="form-group" id = "queuecapacityDiv" >
      <label for="queuecapacity" class="col-sm-3 control-label">队列大小：</label>
      <div class="col-sm-4">
        <input type="text" id="queuecapacity"   class="form-control input-sm"  placeholder="必填项" />
      </div>
      <div><span class = "text-danger">*</span><span id = "queuecapacityTip"></span></div>
   </div>

   <div class="form-group" id = "mqHostIpDiv" >
      <label for="mqHostIp" class="col-sm-3 control-label">TAM MQ IP：</label>
      <div class="col-sm-4">
        <input type="text" id="mqHostIp"   class="form-control input-sm"  placeholder="必填项" />
      </div>
      <div><span class = "text-danger">*</span><span id = "mqHostIpTip"></span></div>
   </div>

   <div class="form-group" id = "mqPortDiv" >
      <label for="mqPort" class="col-sm-3 control-label">TAM MQ Port：</label>
      <div class="col-sm-4">
        <input type="text" id="mqPort"  class="form-control input-sm"  placeholder="必填项" />
      </div>
      <div><span class = "text-danger">*</span><span id = "mqPortTip"></span></div>
   </div>

   <div class="form-group" id = "ccsidDiv" >
      <label for="ccsid" class="col-sm-3 control-label">CCSID：</label>
      <div class="col-sm-4">
        <input type="text" id="ccsid"   class="form-control input-sm"  placeholder="必填项" />
      </div>
      <div><span class = "text-danger">*</span><span id = "ccsidTip"></span></div>
   </div>

   <div class="form-group" id = "mqManagerDiv" >
      <label for="mqManager" class="col-sm-3 control-label">MQManager名称：</label>
      <div class="col-sm-4">
        <input type="text" id="mqManager"   class="form-control input-sm"  placeholder="必填项" />
      </div>
      <div><span class = "text-danger">*</span><span id = "mqManagerTip"></span></div>
   </div>

   <div class="form-group" id = "mqChannelDiv" >
      <label for="mqChannel" class="col-sm-3 control-label">MQManager通道：</label>
      <div class="col-sm-4">
        <input type="text" id="mqChannel"   class="form-control input-sm"  placeholder="必填项" />
      </div>
      <div><span class = "text-danger">*</span><span id = "mqChannelTip"></span></div>
   </div>

   <div class="form-group" id = "mqNameDiv" >
      <label for="mqName" class="col-sm-3 control-label">MQ名称：</label>
      <div class="col-sm-4">
        <input type="text" id="mqName"   class="form-control input-sm"  placeholder="必填项" />
      </div>
      <div><span class = "text-danger">*</span><span id = "mqNameTip"></span></div>
   </div>
  
   
   <div class="form-group">
      <div class="col-sm-offset-2 col-sm-10">
         <button type="button" id = "cfgSubmit" class="btn btn-primary">保存</button>
      </div>
   </div>
   
</form>
