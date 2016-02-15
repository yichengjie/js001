<div class="dsName <%if(connected==true){%>connect<%}%>"><%=dataSourceName%></div>
<div class="dsStatus <%if(connected==true){%>connect<%}%>"><%if(connected==true){%>已连接<%}else{%>未连接<%}%></div>
<div class="dsURL"><%=URL%></div>
<div class="dsUserName"><%=userName%></div>
<div class="dsTest">测试连接</div>