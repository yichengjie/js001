<!--
<div  id = "groupServiceConfigModal"  class="modal fade" id="myModal" tabindex="-1" role="dialog" 
   aria-labelledby="myModalLabel" aria-hidden="true"   data-backdrop="static">
-->
<div id = "groupServiceConfigModal" class="modal" aria-hidden="true" style="z-index:10400;"  data-backdrop="static">
   <div class="modal-dialog">
      <div class="modal-content">
         <div class="modal-header">
            <button type="button" class="close" 
               data-dismiss="modal" aria-hidden="true">
                  &times;
            </button>
            <h4 class="modal-title" id="myModalLabel">
                    组服务配置
            </h4>
         </div>
         <div class="modal-body">
         <input id = "hiddenPageFlag" type = "hidden" value = "<%=pageFlag%>"/>
       <%
	if("page1"==pageFlag){//SIH/TUMST/TUMSB/UTL类型适配服务返回页面//SIHServiceData
	   %>
	   		<form class="form-horizontal" role="form">
	   			<input type="hidden" id="serviceId" value="<%=serviceId%>" /> 
			    <div class="form-group" id = "inputQueueDiv" >
		            <label for="inputQueue" class="col-sm-4 control-label">接入MQ队列名称：</label>
		            <div class="col-sm-4">
		            	<input  id="inputQueue" value = "<%=inputQueue%>"  type="text" class="form-control input-sm"  placeholder="" />
		            </div>
		            <div><span class = "text-danger"></span><span id = "inputQueueTip"></span></div>
		        </div>
		        
		          
		        <div class="form-group" id = "inMpeNumDiv" >
		            <label for="inMpeNum" class="col-sm-4 control-label">接入MQ连接个数：</label>
		            <div class="col-sm-4">
		            	<input  id="inMpeNum" value = "<%=inMpeNum%>"  type="text" class="form-control input-sm"  placeholder="" />
		            </div>
		            <div><span class = "text-danger">*</span><span id = "inMpeNumTip"></span></div>
		        </div>
		        
		        <div class="form-group" id = "outputQueueDiv" >
		            <label for="outputQueue" class="col-sm-4 control-label">接出MQ队列名称：</label>
		            <div class="col-sm-4">
		            	<input  id="outputQueue" value = "<%=outputQueue%>"  type="text" class="form-control input-sm"  placeholder="" />
		            </div>
		            <div><span class = "text-danger">*</span><span id = "outputQueueTip"></span></div>
		        </div>
		        
		        <div class="form-group" id = "outMpeNumDiv" >
		            <label for="outMpeNum" class="col-sm-4 control-label">接出MQ连接个数：</label>
		            <div class="col-sm-4">
		            	<input  id="outMpeNum" value = "<%=outMpeNum%>"  type="text" class="form-control input-sm"  placeholder="" />
		            </div>
		            <div><span class = "text-danger">*</span><span id = "outMpeNumTip"></span></div>
		        </div>
		        
		        <div class="form-group" id = "mqServerInfoDiv" >
		            <label for="mqServerInfo" class="col-sm-4 control-label">MQ服务器信息(IP/PORT/通道名/队列管理器名/超时转移时间):</label>
		            <div class="col-sm-4">
		            	<input  id="mqServerInfo" value = "<%=mqServerInfo%>"  type="text" class="form-control input-sm"  placeholder="" />
		            </div>
		            <div><span class = "text-danger">*</span><span id = "mqServerInfoTip"></span></div>
		        </div>
		        
		        
		        <div class="form-group" id = "requestQueueSizeDiv" >
		            <label for="requestQueueSize" class="col-sm-4 control-label">请求队列大小:</label>
		            <div class="col-sm-4">
		            	<input  id="requestQueueSize" value = "<%=requestQueueSize%>"  type="text" class="form-control input-sm"  placeholder="" />
		            </div>
		            <div><span class = "text-danger">*</span><span id = "requestQueueSizeTip"></span></div>
		        </div>
		        
		        <div class="form-group" id = "invokeContextSizeDiv" >
		            <label for="invokeContextSize" class="col-sm-4 control-label">应答队列大小:</label>
		            <div class="col-sm-4">
		            	<input  id="invokeContextSize" value = "<%=invokeContextSize%>"  type="text" class="form-control input-sm"  placeholder="" />
		            </div>
		            <div><span class = "text-danger">*</span><span id = "invokeContextSizeTip"></span></div>
		        </div>
		        
		        <div class="form-group" id = "threadPoolSizeDiv" >
		            <label for="threadPoolSize" class="col-sm-4 control-label">适配服务线程池大小:</label>
		            <div class="col-sm-4">
		            	<input  id="threadPoolSize" value = "<%=threadPoolSize%>"  type="text" class="form-control input-sm"  placeholder="" />
		            </div>
		            <div><span class = "text-danger">*</span><span id = "threadPoolSizeTip"></span></div>
		        </div>
		        
		        <div class="form-group" id = "messageModeDiv" >
		            <label for="messageMode" class="col-sm-4 control-label">信息模式:</label>
		            <div class="col-sm-4">
		            	<input  id="messageMode" value = "<%=messageMode%>" readonly="readonly" type="text" class="form-control input-sm"  placeholder="" />
		            </div>
		            <div><span class = "text-danger">*</span><span id = "messageModeTip"></span></div>
		        </div>
		        
		        <div class="form-group" id = "upperLimitDiv" >
		            <label for="upperLimit" class="col-sm-4 control-label">队列预警值:</label>
		            <div class="col-sm-4">
		            	<input  id="upperLimit" value = "<%=upperLimit%>"  type="text" class="form-control input-sm"  placeholder="" />
		            </div>
		            <div><span class = "text-danger">*%(1-99)</span><span id = "upperLimitTip"></span></div>
		        </div>
		        
		        <div class="form-group" id = "queueTypeDiv" >
		            <label for="queueType" class="col-sm-4 control-label">队列类型:</label>
		            <div class="col-sm-4">
		            	<select id="queueType"   class="form-control input-sm">
		            		<%if(messageMode=="one_way"){%>
	            				<%for(var i = 0 ; i < queueTypes.length ; i ++){%>
		            				<option <%if(queueType==queueTypes[i]){%>selected = "selected"<%}%>  value = "<%=queueTypes[i]%>"><%=queueTypes[i]%></option>
		            			<%}%>
	            			<%}else{%>
	            				<option value="SimpleQueue" selected="selected" >SimpleQueue</option>
	            			<%}%>
		            	</select>
		            </div>
		            <div><span class = "text-danger">*</span><span id = "queueTypeTip"></span></div>
		        </div>
	   		</form>
	   <%	
	}   
 else if ("page2"==pageFlag){//businessService
	   %>
	   		<form class="form-horizontal" role="form">
	   			<input type="hidden" id="serviceId" value="<%=serviceId%>" /> 
	   			<div class="form-group" id = "requestQueueSizeDiv" >
		            <label for="requestQueueSize" class="col-sm-4 control-label">请求队列大小：</label>
		            <div class="col-sm-4">
		            	<input  id="requestQueueSize" value = "<%=requestQueueSize%>"  type="text" class="form-control input-sm"  placeholder="" />
		            </div>
		            <div><span class = "text-danger">*</span><span id = "requestQueueSizeTip"></span></div>
		        </div>
		        
		        <div class="form-group" id = "invokeContextSizeDiv" >
		            <label for="invokeContextSize" class="col-sm-4 control-label">应答队列大小：</label>
		            <div class="col-sm-4">
		            	<input  id="invokeContextSize" value = "<%=invokeContextSize%>"  type="text" class="form-control input-sm"  placeholder="" />
		            </div>
		            <div><span class = "text-danger">*</span><span id = "invokeContextSizeTip"></span></div>
		        </div>
		        
		        <div class="form-group" id = "threadPoolSizeDiv" >
		            <label for="threadPoolSize" class="col-sm-4 control-label">线程池大小：</label>
		            <div class="col-sm-4">
		            	<input  id="threadPoolSize" value = "<%=threadPoolSize%>"  type="text" class="form-control input-sm"  placeholder="" />
		            </div>
		            <div><span class = "text-danger">*</span><span id = "threadPoolSizeTip"></span></div>
		        </div>
		        
		        <div class="form-group" id = "messageModeDiv" >
		            <label for="messageMode" class="col-sm-4 control-label">信息模式：</label>
		            <div class="col-sm-4">
		            	<select id="messageMode"   class="form-control input-sm">
		            		<%for(var j = 0 ; j < messageModes.length ; j ++){
		            			if(messageMode== messageModes[j]){
		            			  %><option selected = "selected" value = "<%=messageModes[j]%>"><%=messageModes[j]%></option><%
		            			}else{
		            			  %><option value = "<%=messageModes[j]%>"><%=messageModes[j]%></option><%
		            			}
		            		}%>
		            	</select>
		            </div>
		            <div><span class = "text-danger">*</span><span id = "messageModeTip"></span></div>
		        </div>
		        
		        <div class="form-group" id = "upperLimitDiv" >
		            <label for="upperLimit" class="col-sm-4 control-label">队列预警值：</label>
		            <div class="col-sm-4">
		            	<input  id="upperLimit" value = "<%=upperLimit%>"  type="text" class="form-control input-sm"  placeholder="" />
		            </div>
		            <div><span class = "text-danger">*</span><span id = "upperLimitTip"></span></div>
		        </div>
		        
		        <div class="form-group" id = "queueTypeDiv" >
		            <label for="queueType" class="col-sm-4 control-label">队列类型:</label>
		            <div class="col-sm-4">
		            	<select id="queueType"   class="form-control input-sm">
		            		<%if(messageMode=="one_way"){%>
	            				<%for(var i = 0 ; i < queueTypes.length ; i ++){%>
		            				<option <%if(queueType==queueTypes[i]){%>selected = "selected"<%}%>  value = "<%=queueTypes[i]%>"><%=queueTypes[i]%></option>
		            			<%}%>
	            			<%}else{%>
	            				<option value="SimpleQueue" selected="selected" >SimpleQueue</option>
	            			<%}%>
		            	</select>
		            </div>
		            <div><span class = "text-danger">*</span><span id = "queueTypeTip"></span></div>
		        </div>
		        <input type="hidden" id="sticky" value="<%=sticky%>" />
		        <% if(sticky== "true" || sticky =="TRUE") { %>
		        <div class="form-group" id = "stickyDiv">
		            <label class="col-sm-4 control-label">亲和服务消息头名称：</label>
		            <div class="col-sm-4">
		            	<input id="stickyHeader" value="<%=stickyHeader%>" type="text" class="form-control input-sm"/>
		          
		            </div>
		            <div>
		            	<span class="text-danger">*</span>
		            	<span id="stickyHeaderTip"></span>
		            	<a href="javascript:void(0);" id="help" class="helpClass">帮助</a>
		            </div>
		        </div>
		        <%}%>
	   			
	   		</form>	
	   <%	
	}else if ("page3"==pageFlag){//http
	   %>
	   	<form class="form-horizontal" role="form">
	   		<input type="hidden" id="serviceId" value="<%=serviceId%>" /> 
	   		<div class="form-group" id = "invokeServiceNameDiv" >
		        <label for="invokeServiceName" class="col-sm-4 control-label">调用服务名称：</label>
		        <div class="col-sm-4">
		           <input  id="invokeServiceName" value = "<%=invokeServiceName%>" readonly="readonly"  type="text" class="form-control input-sm"  placeholder="" />
		        </div>
		        <div><span class = "text-danger">*</span><span id = "invokeServiceNameTip"></span></div>
		    </div>
		    
	   		<div class="form-group" id = "invokeTimeoutDiv" >
		        <label for="invokeTimeout" class="col-sm-4 control-label">调用超时时间：</label>
		        <div class="col-sm-4">
		           <input  id="invokeTimeout" value = "<%=invokeTimeout%>"  type="text" class="form-control input-sm"  placeholder="" />
		        </div>
		        <div><span class = "text-danger">*</span><span id = "invokeTimeoutTip"></span></div>
		    </div>
		    
	   	</form>
	   <%	
	}
%>               
         </div>
         <div class="modal-footer">
            <button type="button"  id = "backBtn" class="btn btn-default"  data-dismiss="modal">返回</button>
            <button type="button" id = "submitFormBtn" class="btn btn-primary" >修改</button>
         </div>
      </div><!-- /.modal-content -->
</div><!-- /.modal -->