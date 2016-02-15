 <div id="ycj-confirm" class="modal">
    <div class="modal-dialog modal-sm">
      <div class="modal-content">
        <div class="modal-header">
          <%if(ccFlag=="true"){%>
              <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">×</span><span class="sr-only">Close</span></button>
          <%}%>
          <h5 class="modal-title"><i class="fa fa-exclamation-circle"></i> <%=title%></h5>
        </div>
        <div class="modal-body small">
          <p><span class = "text-info"><%=msg%></span></p>
        </div>
        <div class="modal-footer" >
          <button type="button" class="btn btn-primary confirmOK" data-dismiss="modal"><%=btnok %></button>
          <button type="button" class="btn btn-default confirmCancel" data-dismiss="modal"><%=btncl %></button>
        </div>
      </div>
    </div>
</div>