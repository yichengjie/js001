 <div id="ycj-alert" class="modal" >
    <div class="modal-dialog modal-sm">
      <div class="modal-content">
        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">×</span><span class="sr-only">Close</span></button>
          <h5 class="modal-title"><i class="fa fa-exclamation-circle"></i>提示:</h5>
        </div>
        <div class="modal-body small" style="text-align:center">
          <p><span  <%if(flag=="true"){%>class = "text-success"<%}else if(flag=="false"){%>class = "text-danger"<%}else{%>class = "text-info"<%}%>  ><%=msg%></span></p>
        </div>
        <div class="modal-footer" >
          <button type="button" class="btn btn-primary confirmOK" data-dismiss="modal">确认</button>
        </div>
      </div>
    </div>
</div>