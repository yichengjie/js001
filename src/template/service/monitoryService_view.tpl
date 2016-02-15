<table class = "table table-bordered">
	<caption>服务实例基本信息</caption>
	<thead></thead>
	<tbody>
	  <tr>
	  	<td>服务名称&nbsp;:&nbsp;</td>
	  	<td><%=name%></td>
	  	<td>所属分组&nbsp;:&nbsp;</td>
	  	<td><%=gname%></td>
	  </tr>
	  <tr>
	  	<td>当前版本&nbsp;:&nbsp;</td>
	  	<td><%=currentVersion%></td>
	  	<td>服务器名称&nbsp;:&nbsp;</td>
	  	<td><%=serverName%></td>
	  </tr>
	</tbody>
</table>
<br/>
<table class = "table table-condensed">
	<thead>
	</thead>
	<tbody>
	  <tr>
	    <td width = "40%">请求处理线程池的主动执行任务的近似线程数 &nbsp;:&nbsp;</td>
	    <td width = "10%"><%=configInfo.requestPoolActive%></td>
	    <td width = "10%"></td>
	    <td width = "*%"></td>
	  </tr>
	  <tr>
	    <td>应答处理线程池的主动执行任务的近似线程数 &nbsp;:&nbsp;</td>
	    <td><%=configInfo.responsePoolActive%></td>
	    <td></td>
	    <td width = "*%"></td>
	  </tr>
	  <tr>
	    <td>请求处理线程池的曾经同时位于线程池中的最大线程数 &nbsp;:&nbsp;</td>
	    <td><%=configInfo.requestPoolLargestPoolSize%></td>
	    <td></td>
	    <td width = "*%"></td>
	  </tr>
	  <tr>
	    <td>应答处理线程池的曾经同时位于线程池中的最大线程数&nbsp;:&nbsp;</td>
	    <td><%=configInfo.responsePoolLargestPoolSize%></td>
	    <td></td>
	    <td width = "*%"></td>
	  </tr>
	  <tr>
	    <td>应答队列中消息大小&nbsp;:&nbsp;</td>
	    <td><%=configInfo.replyQueueSize%></td>
	    <td></td>
	    <td width = "*%"></td>
	  </tr>
	  <tr>
	    <td>请求队列中消息大小&nbsp;:&nbsp;</td>
	    <td><%=requestQueueSize%></td>
	    <td><button id = "clearQueueInfoBtn" class = "btn <%if(authClearQueueFlag!="true"){%>disabled<%}%>">清除队列</button></td>
	    <td width = "*%"></td>
	  </tr>
	</tbody>
</table>
<br/>
<%if(compensate=="1"){%>
<table class = "table table-condensed">
	<caption>补偿服务信息</caption>
	<thead>
	</thead>
	<tbody>
	  <tr>
	    <td width = "40%">请求处理线程池的主动执行任务的近似线程数 &nbsp;:&nbsp;</td>
	    <td width = "10%"><%=compensateRunningInfo.requestPoolActive%></td>
	    <td width = "*%"></td>
	  </tr>
	  <tr>
	    <td>应答处理线程池的主动执行任务的近似线程数 &nbsp;:&nbsp;</td>
	    <td><%=compensateRunningInfo.responsePoolActive%></td>
	    <td></td>
	  </tr>
	  <tr>
	    <td>请求处理线程池的曾经同时位于线程池中的最大线程数 &nbsp;:&nbsp;</td>
	    <td><%=compensateRunningInfo.requestPoolLargestPoolSize%></td>
	    <td ></td>
	  </tr>
	  <tr>
	    <td>应答处理线程池的曾经同时位于线程池中的最大线程数 &nbsp;:&nbsp;</td>
	    <td><%=compensateRunningInfo.responsePoolLargestPoolSize%></td>
	    <td></td>
	  </tr>
	  <tr>
	    <td>应答队列中消息大小&nbsp;:&nbsp;</td>
	    <td><%=compensateRunningInfo.replyQueueSize%></td>
	    <td></td>
	  </tr>
	  <tr>
	    <td>请求队列中消息大小 &nbsp;:&nbsp;</td>
	    <td><%=compensateRunningInfo.requestQueueSize%></td>
	    <td></td>
	  </tr>
	</tbody>
</table>
<%
}%>

<div>
	&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
	<button id = "monitorServiceBackBtn" class = "btn btn-default" >返回</button>
	<button id = "monitorServiceRefreshBtn" class = "btn btn-primary" >刷新</button>
</div>