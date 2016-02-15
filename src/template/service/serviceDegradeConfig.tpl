<div id="degradeModal"  class="modal" aria-hidden="true" style="z-index:10400;"  data-backdrop="static"> 
   <div class="modal-dialog" style = "width:700px;">
      <div class="modal-content">
         <div class="modal-header">
            <button type="button" class="close" 
               data-dismiss="modal" aria-hidden="true">
                  &times;
            </button>
            <h4 class="modal-title" id="myModalLabel">
                         降级服务配置
            </h4>
         </div>
         <div class="modal-body">
              <form class="form-horizontal">
                  <div class="form-group" >
					      <label  class="col-sm-3 control-label">降级服务名称</label>
					      <div class="col-sm-5">
					        <input type="text" id="degradeServiceName" name="degradeServiceName"  class="form-control input-sm"  type="text" value="<%=degradeServiceName%>" />
					      </div>
					      <div><span class = "text-danger"></span><span id = "degradeServiceNameTip"></span></div>
				    </div>
				    
				    <div class="form-group"  >
					      <label  class="col-sm-3 control-label">按单位时间内交易数</label>
					      <div class="col-sm-5">
					        <input type="checkbox"  id="tpsSelected"  class="select" <%if (tpsSelected){%>checked="checked"<%}%> />
					      </div>
					      <div></div>
				    </div>
				    
				    <div class="form-group" >
					      <label  class="col-sm-3 control-label">交易数</label>
					      <div class="col-sm-5">
					        <input type="text" id="degradeTPU" name="degradeTPU"  class="form-control input-sm"  type="text" value="<%=degradeTPU%>" <%if (!tpsSelected){%>readonly="readonly"<%}%> />
					      </div>
					      <div><span class = "text-danger">*</span><span id = "degradeTPUTip"></span></div>
				    </div>
				    
				     <div class="form-group" >
					      <label  class="col-sm-3 control-label">时间单位</label>
					      <div class="col-sm-5">
					        <input type="text" id="degradeTimeUnit" name="degradeTimeUnit"  class="form-control input-sm"  type="text" value="<%if(degradeTimeUnit!=null && degradeTimeUnit!=""){ %> <%=degradeTimeUnit%> <% } else {%> 1000 <%}%>"  <%if (!tpsSelected){%>readonly="readonly"<%}%>  placeholder="1000"/>
					      </div>
					      <div><span class = "text-danger">*ms</span><span id = "degradeTimeUnitTip"></span></div>
				    </div>
				    
				      <div class="form-group"  >
					      <label  class="col-sm-3 control-label">按队列百分比</label>
					      <div class="col-sm-5">
					        <input type="checkbox"  id="queueSelected" class="select"  <%if (queueSelected){%>checked="checked"<%}%>/>
					      </div>
					      <div></div>
				     </div>
				    
				    <div class="form-group" >
					      <label  class="col-sm-3 control-label">队列百分比%</label>
					      <div class="col-sm-5">
					        <input type="text" id="degradePercent" name="degradePercent"  class="form-control input-sm"  type="text" value="<%=degradePercent%>" <%if (!queueSelected){%>readonly="readonly"<%}%> placeholder="正整数" />
					      </div>
					      <div><span class = "text-danger">* 0-100</span><span id = "degradePercentTip"></span></div>
				    </div>

               </form>
              
           </div>
              <div class="modal-footer">
                 <button type="button" class="btn btn-default" data-dismiss="modal">返回</button>
                 <button id ="submitFormBtn" type="button" class="btn btn-primary config">修改</button>
         </div>
      </div><!-- /.modal-content -->
</div><!-- /.modal -->



