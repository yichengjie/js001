<div class="modal fade" id="grayModal" tabindex="-1" role="dialog" 
   aria-labelledby="myModalLabel" aria-hidden="true" data-backdrop="static">
   <div class="modal-dialog">
      <div class="modal-content">
         <div class="modal-header">
            <button type="button" class="close" 
               data-dismiss="modal" aria-hidden="true">
                  &times;
            </button>
            <h4 class="modal-title" id="myModalLabel">
                      灰度配置
            </h4>
         </div>
         <div class="modal-body">
                <form class="form-horizontal">
                  <div class="form-group" >
					      <label  class="col-sm-3 control-label">按流量百分比</label>
					      <div class="col-sm-5">
					        <input type="radio"  id="serviceTrafficSelected"   name="grayConfig"  class="grayConfig" <%if (serviceTrafficSelected){%>checked="checked"<%}%> value="serviceTraffic" />
					      </div>
					      <div></div>
				    </div>
				    
				    <div class="form-group" >
					      <label  class="col-sm-3 control-label">流量配置</label>
					      <div class="col-sm-5">
					        <input id="serviceTraffic" name="serviceTraffic"  class="form-control input-sm"  type="text" value="<%=serviceTraffic%>"  <%if (!serviceTrafficSelected){%>readonly="readonly"<%}%> placeholder="正整数" />
					      </div>
					      <div><span class = "text-danger">*%(1-99)</span><span id = "serviceTrafficTip"></span></div>
				    </div>
				    
				     <div class="form-group" >
					      <label  class="col-sm-3 control-label">按报文头</label>
					      <div class="col-sm-5">
					        <input id="serviceHeaderSelected"  name="grayConfig" class="grayConfig"  type="radio" <%if (serviceHeaderSelected){%>checked="checked"<%}%> value="serviceHeader" />
					      </div>
				    </div>
				    
				      <div class="form-group"  >
					      <label  class="col-sm-3 control-label">报文头配置</label>
					      <div class="col-sm-5">
					        <input id="serviceHeader" name="serviceHeader" class="form-control input-sm" type="text" value="<%=serviceHeader%>"  <%if (!serviceHeaderSelected){%>readonly="readonly"<%}%>  placeholder="key-value形式"/>
					      </div>
					     <div class="warn">
			                <span class="text-danger">*</span>
			                <span id="serviceHeaderTip"></span>
			                <a href="javascript:void(0);" id="grayHelp" class="helpClass">帮助</a>
		                 </div>
				     </div>
               </form>
        </div>
        <div class="modal-footer">
               <button type="button" class="btn btn-default cancel" id = "backBtn"  data-dismiss="modal">返回</button>
	    	  <button type="button" class="btn btn-primary config" id = "submitFormBtn">修改</button>
        </div>
      </div><!-- /.modal-content -->
</div><!-- /.modal -->

