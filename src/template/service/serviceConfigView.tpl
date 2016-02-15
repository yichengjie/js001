<%	
if(flag=="true"){//正确返回数据
%>		
	<form class="form-horizontal"   role="form" method= "POST">
		 <input type = "hidden" id = "serviceId" value = "<%=serviceId%>"/>
		 <input type = "hidden" id = "serverName" value = "<%=serverName%>"/>
	<%
		if("BusinessService"==serviceCategory){//1111111111111111111111
		   %>
		      <div class="form-group" id = "requestQueueSizeDiv" >
		         <label for="requestQueueSize" class="col-sm-4 control-label  text-left">请求队列大小：</label>
		         <div class="col-sm-4">
		            <input  id="requestQueueSize"  value = "<%=requestQueueSize%>"   type="text" class="form-control input-sm"  placeholder="" />
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
		         <div><span id = "threadPoolSizeTip"></span></div>
		      </div>
		      
		      
		      <div class="form-group" id = "messageModeDiv" >
		         <label for="messageMode" class="col-sm-4 control-label">信息模式：</label>
		         <div class="col-sm-4">
		            <select id="messageMode"   class="form-control input-sm">
		            	<option <%if(messageMode=="one_way"){%>selected = "selected" <%}%> value="one_way" selected="selected">one_way</option>
		            	<option <%if(messageMode=="request_response"){%>selected = "selected" <%}%>  value="request_response">request_response</option>
		            	<option <%if(messageMode=="reliable_one_way"){%>selected = "selected" <%}%>  value="reliable_one_way">reliable_one_way</option>	
		            </select>
		         </div>
		         <div><span id = "messageModeTip"></span></div>
		      </div>
		      
		      <div class="form-group" id = "upperLimitDiv" >
		         <label for="upperLimit" class="col-sm-4 control-label">队列预警值：</label>
		         <div class="col-sm-4">
		            <input id="upperLimit" value = "<%=upperLimit%>"   type="text"  class="form-control input-sm"  placeholder="" />
		         </div>
		         <div><span class ="text-info">(%)</span><span id = "upperLimitTip"></span></div>
		      </div>
		      
		      <div class="form-group" id = "queueTypeDiv" >
		         <label for="queueType" class="col-sm-4 control-label">队列类型：</label>
		         <div class="col-sm-4">
		            <select id="queueType"   class="form-control input-sm">
		             	<%if(messageMode=="one_way"){%>
		             		<option value="SimpleQueue" <%if(queueType=="SimpleQueue"){%>selected="selected"<%}%> >SimpleQueue</option>
		               		<option value="PersistQueue" <%if(queueType=="PersistQueue"){%>selected="selected"<%}%> >PersistQueue</option>
		             	<%}else{%>
		             		<option value="SimpleQueue" selected="selected" >SimpleQueue</option>
		             	<%}%>
					</select>
		         </div>
		         <div><span id = "queueTypeTip"></span></div>
		      </div>
		      
		      <div class="form-group">
			     <div class="col-sm-offset-4 col-sm-10">
			        <button type="button" id = "submitFormBtn" name = "BusinessService" class="btn btn-primary">应用</button>
			     </div>
			  </div>
		   <%
		}else if ("sih"==serviceCategory||"tumsb"==serviceCategory||"tumst"==serviceCategory||"utl"==serviceCategory){//22222222222222222222222
		   %>
		 	<div class="form-group" id = "inputQueueDiv" >
		         <label for="inputQueue" class="col-sm-4 control-label">接入MQ队列名称：</label>
		         <div class="col-sm-4">
		            <input id="inputQueue" value = "<%=inputQueue%>"  type="text" class="form-control input-sm"  placeholder="" />
		         </div>
		         <div><span id = "inputQueueTip"></span></div>
		    </div>
		    
		    <div class="form-group" id = "inMpeNumDiv" >
		         <label for="inMpeNum" class="col-sm-4 control-label">接入MQ连接个数：</label>
		         <div class="col-sm-4">
		            <input id="inMpeNum" value = "<%= (inMpeNum=='0'?'':inMpeNum)%>" type="text"  class="form-control input-sm"  placeholder="" />
		         </div>
		         <div><span id = "inMpeNumTip"></span></div>
		    </div>
		    
		 	<div class="form-group" id = "outputQueueDiv" >
		         <label for="outputQueue" class="col-sm-4 control-label">接出MQ队列名称：</label>
		         <div class="col-sm-4">
		            <input id="outputQueue" value = "<%=outputQueue%>" type="text"  class="form-control input-sm"  placeholder="" />
		         </div>
		         <div><span id = "outputQueueTip"></span></div>
		    </div>
		    
		    
		 	<div class="form-group" id = "outMpeNumDiv" >
		         <label for="outMpeNum" class="col-sm-4 control-label">接出MQ连接个数：</label>
		         <div class="col-sm-4">
		            <input id="outMpeNum"  value = "<%= (outMpeNum=='0'?'':outMpeNum)%>" type="text" class="form-control input-sm"  placeholder="" />
		         </div>
		         <div><span id = "outMpeNumTip"></span></div>
		    </div>
		    
		 	<div class="form-group" id = "threadPoolSizeDiv" >
		         <label for="threadPoolSize" class="col-sm-4 control-label">适配服务线程池大小：</label>
		         <div class="col-sm-4">
		            <input id="threadPoolSize" value = "<%=threadPoolSize%>" type="text"  class="form-control input-sm"  placeholder="" />
		         </div>
		         <div><span id = "threadPoolSizeTip"></span></div>
		    </div>
		    
		 	<div class="form-group" id = "mqServerInfoDiv" >
		         <label for="mqServerInfo" class="col-sm-4 control-label">MQ服务器信息（格式IP/PORT/通道名/队列管理器名/超时转移时间）：</label>
		         <div class="col-sm-4">
		            <input id="mqServerInfo" value = "<%=mqServerInfo%>" type="text"  class="form-control input-sm"  placeholder="" />
		            <input  id="mode" value = "" type="hidden" />
		            <input  id="serviceName" value = "" type="hidden"  />
		         </div>
		         <div><span id = "mqServerInfoTip"></span></div>
		    </div>
		 	
		 	<div class="form-group" id = "requestQueueSizeDiv" >
		         <label for="requestQueueSize" class="col-sm-4 control-label">请求队列大小：</label>
		         <div class="col-sm-4">
		            <input id="requestQueueSize" value = "<%=requestQueueSize%>"  type="text"  class="form-control input-sm"  placeholder="" />
		         </div>
		         <div><span id = "requestQueueSizeTip"></span></div>
		    </div>
		 	
		 	<div class="form-group" id = "invokeContextSizeDiv" >
		         <label for="invokeContextSize" class="col-sm-4 control-label">应答队列大小：</label>
		         <div class="col-sm-4">
		            <input id="invokeContextSize" value = "<%=invokeContextSize%>"  type="text" class="form-control input-sm"  placeholder="" />
		         </div>
		         <div><span id = "invokeContextSizeTip"></span></div>
		    </div>
		 	
		 	<div class="form-group" id = "messageModeDiv" >
		         <label for="messageMode" class="col-sm-4 control-label">信息模式：</label>
		         <div class="col-sm-4">
		            <input id="messageMode"  value = "<%=messageMode%>" readonly="readonly" type="text"  class="form-control input-sm"  placeholder="" />
		         </div>
		         <div><span id = "messageModeTip"></span></div>
		    </div>
		 	
		 	<div class="form-group" id = "upperLimitDiv" >
		         <label for="upperLimit" class="col-sm-4 control-label">队列预警值：</label>
		         <div class="col-sm-4">
		            <input id="upperLimit" value = "<%=upperLimit%>" type="text" class="form-control input-sm"  placeholder="" />
		         </div>
		         <div><span class ="text-info">(%)</span><span id = "upperLimitTip"></span></div>
		    </div>
		    
		     <div class="form-group" id = "queueTypeDiv" >
		         <label for="queueType" class="col-sm-4 control-label">队列类型：</label>
		         <div class="col-sm-4">
		            <select id="queueType"   class="form-control input-sm">
		               	<%if(messageMode=="one_way"){%>
		             		<option value="SimpleQueue" <%if(queueType=="SimpleQueue"){%>selected="selected"<%}%> >SimpleQueue</option>
		               		<option value="PersistQueue" <%if(queueType=="PersistQueue"){%>selected="selected"<%}%> >PersistQueue</option>
		             	<%}else{%>
		             		<option value="SimpleQueue" selected="selected" >SimpleQueue</option>
		             	<%}%>
					</select>
		         </div>
		         <div><span id = "queueTypeTip"></span></div>
		     </div>
		     
		     
		      <div class="form-group">
			     <div class="col-sm-offset-4 col-sm-10">
			        <button type="button" id = "submitFormBtn" name = "AdapterService" class="btn btn-primary">应用</button>
			     </div>
			  </div>
		 	
		   <%
		}else if ("http"==serviceCategory){//33333333333333333333333333333333
		   %>
		   	  <div class="form-group" id = "invokeServiceNameDiv" >
		         <label for="invokeServiceName" class="col-sm-4 control-label">调用服务名称 ：</label>
		         <div class="col-sm-4">
		            <input id="invokeServiceName" value = "<%=invokeServiceName%>" readonly="readonly" type="text"  class="form-control input-sm"  placeholder="" />
		         </div>
		         <div><span id = "invokeServiceNameTip"></span></div>
		      </div>
		      
		      <div class="form-group" id = "invokeTimeoutDiv" >
		         <label for="invokeTimeout" class="col-sm-4 control-label">调用超时时间 ：</label>
		         <div class="col-sm-4">
		            <input id="invokeTimeout" value = "<%=invokeTimeout%>" type="text" class="form-control input-sm"  placeholder="" />
		         </div>
		         <div><span id = "invokeTimeoutTip"></span></div>
		      </div>
		      
		      <div class="form-group" id = "threadPoolSizeDiv" >
		        <label for="threadPoolSize" class="col-sm-4 control-label">线程池大小：</label>
	            <div class="col-sm-4">
	            	<input  id="threadPoolSize" value = "<%=threadPoolSize%>"  type="text" class="form-control input-sm"  placeholder="" />
	            </div>
		        <div><span class = "text-danger">*</span><span id = "threadPoolSizeTip"></span></div>
		      </div>
		      
		       <div class="form-group">
			     <div class="col-sm-offset-4 col-sm-10">
			        <button type="button" id = "submitFormBtn" name = "http" class="btn btn-primary">应用</button>
			     </div>
			  </div>
		      
		   <%
		}else if ("webservice"==serviceCategory){//4444444444444444444444444444444444
		   %>
		      <div class="form-group" id = "invokeServiceNameDiv" >
		         <label for="invokeServiceName" class="col-sm-4 control-label">调用服务名称 ：</label>
		         <div class="col-sm-4">
		            <input id="invokeServiceName" value = "<%=invokeServiceName%>" readonly="readonly"  type="text" class="form-control input-sm"  placeholder="" />
		         </div>
		         <div><span id = "invokeServiceNameTip"></span></div>
		      </div>
		      
		      <div class="form-group" id = "invokeTimeoutDiv" >
		         <label for="invokeTimeout" class="col-sm-4 control-label">调用超时时间 ：</label>
		         <div class="col-sm-4">
		            <input id="invokeTimeout" value = "<%=invokeTimeout%>" type="text" class="form-control input-sm"  placeholder="" />
		         </div>
		         <div><span id = "invokeTimeoutTip"></span></div>
		      </div>
		      
		      <div class="form-group" id = "threadPoolSizeDiv" >
		        <label for="threadPoolSize" class="col-sm-4 control-label">线程池大小：</label>
	            <div class="col-sm-4">
	            	<input  id="threadPoolSize" value = "<%=threadPoolSize%>"  type="text" class="form-control input-sm"  placeholder="" />
	            </div>
		        <div><span class = "text-danger">*</span><span id = "threadPoolSizeTip"></span></div>
		      </div>
		      
		      <div class="form-group">
			     <div class="col-sm-offset-4 col-sm-10">
			        <button type="button" id = "submitFormBtn" name = "webservice" class="btn btn-primary">应用</button>
			     </div>
			  </div>
		   <%
		}
	 %>
	 </form>
<%}else{%>
		<div >
			<div id="unknowServiceTips" style="color:red;"><%=configError%></div>
		</div>	
<%}%>



