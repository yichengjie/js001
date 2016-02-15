<td><%=appName%></td>
<td><%=serviceName%></td>
<td><%=serviceCategory%></td>
<td><%=appVersion%></td>
<%
	if(serviceCategory=="BusinessService"){
	%>
		<td>
			<%if(serviceProperty==1){
				%>[域外]&nbsp;<button type="button" class="changeDomainBtn btn btn-success btn-xs <%if(authJcfSXQHFlag!="true"){%>disabled<%}%> ">切换</button><%
			}else if(serviceProperty==0){
				%>[域内]&nbsp;<button type="button"  class="changeDomainBtn btn btn-warning  btn-xs <%if(authJcfSXQHFlag!="true"){%>disabled<%}%> ">切换</button><%
			}%>
		</td>
		<td class = "changeDefaultVersionTd" >
			<%
			 if(isDefaultVersion=="TRUE"){
			%>[是]
				<%if(authSwitchDefaultVersionFlag=="true"){
					%>&nbsp;<button type="button"  class="btn btn-success btn-xs">切换</button><%
				}
			}else{
			%>[否]
				<%if(authSwitchDefaultVersionFlag=="true"){
					%>&nbsp;<button type="button" class="btn btn-warning btn-xs">切换</button><%
				}
			 }
			%>
		</td>
		<td class="serviceOperationTd">
			<%if(serviceStatus=="1"){
			%>
				[启动]&nbsp;
				<%if(authJcfStopFlag=="true"){
					%><a class="stop myhand" href = "stop">停止</a><%
				}%>
				<%if(authJcfForceStopFlag=="true"){
					%>|<a class="forceStop myhand" href = "forceStop">强停</a><%
				}%>
			<%
			}else if(serviceStatus=="2"){
			%>
				[停止]&nbsp;
				<%if(authJcfStartFlag=="true"){
					%><a class="start myhand" href = "start">启动</a><%
				}%>
			<%
			}else if(serviceStatus=="3"){
				%>[启动中]<%
			}else if(serviceStatus=="4"){
			%>
				[停止中]&nbsp;
				<%if(authJcfForceStopFlag=="true"){
					%><a class="forceStop myhand" href = "forceStop">强停</a><%
				}%>
			<%
			}else if(serviceStatus=="5"){
				%>[挂起]<%
			}else if(serviceStatus=="6"){
				%>[挂起中]<%
			}else if(serviceStatus=="7"){
				%>[未知]<%
			}else if(serviceStatus=="8"){
				%>[查询中]<%
			}else if (serviceStatus=="9"){
			%>
				[服务停止，补偿服务运行]&nbsp;
				<%if(authJcfStartFlag=="true"){
					%><a class="start myhand" href = "start">启动</a><%
				}%>
				<%if(authJcfStopFlag=="true"){
					%><a class="stop myhand" href = "stop">停止</a><%
				}%>
				<%if(authJcfForceStopFlag=="true"){
					%>|<a class="forceStop myhand" href = "forceStop">强停</a><%
				}%>
			<%
			}else if (serviceStatus=="10"){
			%>
				[服务运行，补偿服务停止]&nbsp;
				<%if(authJcfStopFlag=="true"){
					%><a class="stop myhand" href = "stop">停止</a><%
				}%>
				<%if(authJcfForceStopFlag=="true"){
					%>|<a class="forceStop myhand" href = "forceStop">强停</a><%
				}%>
			<%
			}else{
				%>[未知]<%
			}%>
		</td>
	<%}else if (serviceCategory=="sih"){%>
		<td>
			<%if(serviceProperty==1){
			   %>[域外]<%
			}else if(serviceProperty==0){
			   %>[域内]<%
			}%>
		</td>
		<td class = "changeDefaultVersionTd" >
		 <span class = "text-info">不支持切换</span>
		</td>
		
		<td class="serviceOperationTd">
			<%if(serviceStatus=="1"){
			%>
				[启动]&nbsp;
				<%if(authSihStopFlag=="true"){
					%><a class="stop myhand" href = "stop">停止</a><%
				}%>
				<%if(authSihForceStopFlag=="true"){
					%>|<a class="forceStop myhand" href = "forceStop">强停</a><%
				}%>
			<%
			}else if(serviceStatus=="2"){
			%>
				[停止]&nbsp;
				<%if(authSihStartFlag=="true"){
					%><a class="start myhand" href = "start">启动</a><%
				}%>
			<%
			}else if(serviceStatus=="3"){
				%>[启动中]<%
			}else if(serviceStatus=="4"){
			%>
				[停止中]&nbsp;
				<%if(authSihForceStopFlag=="true"){
					%><a class="forceStop myhand" href = "forceStop">强停</a><%
				}%>
			<%
			}else if(serviceStatus=="5"){
				%>[挂起]<%
			}else if(serviceStatus=="6"){
				%>[挂起中]<%
			}else if(serviceStatus=="7"){
				%>[未知]<%
			}else if(serviceStatus=="8"){
				%>[查询中]<%
			}else if (serviceStatus=="9"){
			%>
				[服务停止，补偿服务运行]&nbsp;
				<%if(authSihStartFlag=="true"){
					%><a class="start myhand" href = "start">启动</a><%
				}%>
				<%if(authSihStopFlag=="true"){
					%><a class="stop myhand" href = "stop">停止</a><%
				}%>
				<%if(authSihForceStopFlag=="true"){
					%>|<a class="forceStop myhand" href = "forceStop">强停</a><%
				}%>
			<%
			}else if (serviceStatus=="10"){
			%>
				[服务运行，补偿服务停止]&nbsp;
				<%if(authSihStopFlag=="true"){
					%><a class="stop myhand" href = "stop">停止</a><%
				}%>
				<%if(authSihForceStopFlag=="true"){
					%>|<a class="forceStop myhand" href = "forceStop">强停</a><%
				}%>
			<%
			}else{
				%>[未知]<%
			}%>
		</td>
	<%
	}else if (serviceCategory=="http"){
	%>
		<td>
			<%if(serviceProperty==1){
			   %>[域外]<%
			}else if(serviceProperty==0){
			   %>[域内]<%
			}%>
		</td>
		<td class = "changeDefaultVersionTd" >
		 <span class = "text-info">不支持切换</span>
		</td>
		
		
		<td class="serviceOperationTd">
			<%if(serviceStatus=="1"){
			%>
				[启动]&nbsp;
				<%if(authHttpStopFlag=="true"){
					%><a class="stop myhand" href = "stop">停止</a><%
				}%>
				<%if(authHttpForceStopFlag=="true"){
					%>|<a class="forceStop myhand" href = "forceStop">强停</a><%
				}%>
			<%
			}else if(serviceStatus=="2"){
			%>
				[停止]&nbsp;
				<%if(authHttpStartFlag=="true"){
					%><a class="start myhand" href = "start">启动</a><%
				}%>
			<%
			}else if(serviceStatus=="3"){
				%>[启动中]<%
			}else if(serviceStatus=="4"){
			%>
				[停止中]&nbsp;
				<%if(authHttpForceStopFlag=="true"){
					%><a class="forceStop myhand" href = "forceStop">强停</a><%
				}%>
			<%
			}else if(serviceStatus=="5"){
				%>[挂起]<%
			}else if(serviceStatus=="6"){
				%>[挂起中]<%
			}else if(serviceStatus=="7"){
				%>[未知]<%
			}else if(serviceStatus=="8"){
				%>[查询中]<%
			}else if (serviceStatus=="9"){
			%>
				[服务停止，补偿服务运行]&nbsp;
				<%if(authHttpStartFlag=="true"){
					%><a class="start myhand" href = "start">启动</a><%
				}%>
				<%if(authHttpStopFlag=="true"){
					%><a class="stop myhand" href = "stop">停止</a><%
				}%>
				<%if(authHttpForceStopFlag=="true"){
					%>|<a class="forceStop myhand" href = "forceStop">强停</a><%
				}%>
			<%
			}else if (serviceStatus=="10"){
			%>
				[服务运行，补偿服务停止]&nbsp;
				<%if(authHttpStopFlag=="true"){
					%><a class="stop myhand" href = "stop">停止</a><%
				}%>
				<%if(authHttpForceStopFlag=="true"){
					%>|<a class="forceStop myhand" href = "forceStop">强停</a><%
				}%>
			<%
			}else{
				%>[未知]<%
			}%>
		</td>
	<%
	}else if (serviceCategory=="webservice"){
	%>
		<td>
			<%if(serviceProperty==1){
			   %>[域外]<%
			}else if(serviceProperty==0){
			   %>[域内]<%
			}%>
		</td>
		<td class = "changeDefaultVersionTd" >
		<span class = "text-info">不支持切换</span>
		</td>
		
		<td class="serviceOperationTd">
			<%if(serviceStatus=="1"){
			%>
				[启动]&nbsp;
				<%if(authWebStopFlag=="true"){
					%><a class="stop myhand" href = "stop">停止</a><%
				}%>
				<%if(authWebForceStopFlag=="true"){
					%>|<a class="forceStop myhand" href = "forceStop">强停</a><%
				}%>
			<%
			}else if(serviceStatus=="2"){
			%>
				[停止]&nbsp;
				<%if(authWebStartFlag=="true"){
					%><a class="start myhand" href = "start">启动</a><%
				}%>
			<%
			}else if(serviceStatus=="3"){
				%>[启动中]<%
			}else if(serviceStatus=="4"){
			%>
				[停止中]&nbsp;
				<%if(authWebForceStopFlag=="true"){
					%><a class="forceStop myhand" href = "forceStop">强停</a><%
				}%>
			<%
			}else if(serviceStatus=="5"){
				%>[挂起]<%
			}else if(serviceStatus=="6"){
				%>[挂起中]<%
			}else if(serviceStatus=="7"){
				%>[未知]<%
			}else if(serviceStatus=="8"){
				%>[查询中]<%
			}else if (serviceStatus=="9"){
			%>
				[服务停止，补偿服务运行]&nbsp;
				<%if(authWebStartFlag=="true"){
					%><a class="start myhand" href = "start">启动</a><%
				}%>
				<%if(authWebStopFlag=="true"){
					%><a class="stop myhand" href = "stop">停止</a><%
				}%>
				<%if(authWebForceStopFlag=="true"){
					%>|<a class="forceStop myhand" href = "forceStop">强停</a><%
				}%>
			<%
			}else if (serviceStatus=="10"){
			%>
				[服务运行，补偿服务停止]&nbsp;
				<%if(authWebStopFlag=="true"){
					%><a class="stop myhand" href = "stop">停止</a><%
				}%>
				<%if(authWebForceStopFlag=="true"){
					%>|<a class="forceStop myhand" href = "forceStop">强停</a><%
				}%>
			<%
			}else{
				%>[未知]<%
			}%>
		</td>
	<%
	}else if (serviceCategory=="tumsb"){
	%>
		<td>
			<%if(serviceProperty==1){
			   %>[域外]<%
			}else if(serviceProperty==0){
			   %>[域内]<%
			}%>
		</td>
		<td class = "changeDefaultVersionTd" >
		<span class = "text-info">不支持切换</span>
		</td>
		
		<td class="serviceOperationTd">
			<%if(serviceStatus=="1"){
			%>
				[启动]&nbsp;
				<%if(authTbStopFlag=="true"){
					%><a class="stop myhand" href = "stop">停止</a><%
				}%>
				<%if(authTbForceStopFlag=="true"){
					%>|<a class="forceStop myhand" href = "forceStop">强停</a><%
				}%>
			<%
			}else if(serviceStatus=="2"){
			%>
				[停止]&nbsp;
				<%if(authTbStartFlag=="true"){
					%><a class="start myhand" href = "start">启动</a><%
				}%>
			<%
			}else if(serviceStatus=="3"){
				%>[启动中]<%
			}else if(serviceStatus=="4"){
			%>
				[停止中]&nbsp;
				<%if(authTbForceStopFlag=="true"){
					%><a class="forceStop myhand" href = "forceStop">强停</a><%
				}%>
			<%
			}else if(serviceStatus=="5"){
				%>[挂起]<%
			}else if(serviceStatus=="6"){
				%>[挂起中]<%
			}else if(serviceStatus=="7"){
				%>[未知]<%
			}else if(serviceStatus=="8"){
				%>[查询中]<%
			}else if (serviceStatus=="9"){
			%>
				[服务停止，补偿服务运行]&nbsp;
				<%if(authTbStartFlag=="true"){
					%><a class="start myhand" href = "start">启动</a><%
				}%>
				<%if(authTbStopFlag=="true"){
					%><a class="stop myhand" href = "stop">停止</a><%
				}%>
				<%if(authTbForceStopFlag=="true"){
					%>|<a class="forceStop myhand" href = "forceStop">强停</a><%
				}%>
			<%
			}else if (serviceStatus=="10"){
			%>
				[服务运行，补偿服务停止]&nbsp;
				<%if(authTbStopFlag=="true"){
					%><a class="stop myhand" href = "stop">停止</a><%
				}%>
				<%if(authTbForceStopFlag=="true"){
					%>|<a class="forceStop myhand" href = "forceStop">强停</a><%
				}%>
			<%
			}else{
				%>[未知]<%
			}%>
		</td>
	<%
	}else if (serviceCategory=="tumst"){
	%>
		<td>
			<%if(serviceProperty==1){
			   %>[域外]<%
			}else if(serviceProperty==0){
			   %>[域内]<%
			}%>
		</td>
		<td class = "changeDefaultVersionTd" >
		<span class = "text-info">不支持切换</span>
		</td>
		
		
		<td class="serviceOperationTd">
			<%if(serviceStatus=="1"){
			%>
				[启动]&nbsp;
				<%if(authTtStopFlag=="true"){
					%><a class="stop myhand" href = "stop">停止</a><%
				}%>
				<%if(authTtForceStopFlag=="true"){
					%>|<a class="forceStop myhand" href = "forceStop">强停</a><%
				}%>
			<%
			}else if(serviceStatus=="2"){
			%>
				[停止]&nbsp;
				<%if(authTtStartFlag=="true"){
					%><a class="start myhand" href = "start">启动</a><%
				}%>
			<%
			}else if(serviceStatus=="3"){
				%>[启动中]<%
			}else if(serviceStatus=="4"){
			%>
				[停止中]&nbsp;
				<%if(authTtForceStopFlag=="true"){
					%><a class="forceStop myhand" href = "forceStop">强停</a><%
				}%>
			<%
			}else if(serviceStatus=="5"){
				%>[挂起]<%
			}else if(serviceStatus=="6"){
				%>[挂起中]<%
			}else if(serviceStatus=="7"){
				%>[未知]<%
			}else if(serviceStatus=="8"){
				%>[查询中]<%
			}else if (serviceStatus=="9"){
			%>
				[服务停止，补偿服务运行]&nbsp;
				<%if(authTtStartFlag=="true"){
					%><a class="start myhand" href = "start">启动</a><%
				}%>
				<%if(authTtStopFlag=="true"){
					%><a class="stop myhand" href = "stop">停止</a><%
				}%>
				<%if(authTtForceStopFlag=="true"){
					%>|<a class="forceStop myhand" href = "forceStop">强停</a><%
				}%>
			<%
			}else if (serviceStatus=="10"){
			%>
				[服务运行，补偿服务停止]&nbsp;
				<%if(authTtStopFlag=="true"){
					%><a class="stop myhand" href = "stop">停止</a><%
				}%>
				<%if(authTtForceStopFlag=="true"){
					%>|<a class="forceStop myhand" href = "forceStop">强停</a><%
				}%>
			<%
			}else{
				%>[未知]<%
			}%>
		</td>
	<%
	}else if (serviceCategory=="utl"){
	%>
		<td>
			<%if(serviceProperty==1){
			   %>[域外]<%
			}else if(serviceProperty==0){
			   %>[域内]<%
			}%>
		</td>
		<td class = "changeDefaultVersionTd" >
		<span class = "text-info">不支持切换</span>
		</td>
		
		<td class="serviceOperationTd">
			<%if(serviceStatus=="1"){
			%>
				[启动]&nbsp;
				<%if(authUtlStopFlag=="true"){
					%><a class="stop myhand" href = "stop">停止</a><%
				}%>
				<%if(authUtlForceStopFlag=="true"){
					%>|<a class="forceStop myhand" href = "forceStop">强停</a><%
				}%>
			<%
			}else if(serviceStatus=="2"){
			%>
				[停止]&nbsp;
				<%if(authUtlStartFlag=="true"){
					%><a class="start myhand" href = "start">启动</a><%
				}%>
			<%
			}else if(serviceStatus=="3"){
				%>[启动中]<%
			}else if(serviceStatus=="4"){
			%>
				[停止中]&nbsp;
				<%if(authUtlForceStopFlag=="true"){
					%><a class="forceStop myhand" href = "forceStop">强停</a><%
				}%>
			<%
			}else if(serviceStatus=="5"){
				%>[挂起]<%
			}else if(serviceStatus=="6"){
				%>[挂起中]<%
			}else if(serviceStatus=="7"){
				%>[未知]<%
			}else if(serviceStatus=="8"){
				%>[查询中]<%
			}else if (serviceStatus=="9"){
			%>
				[服务停止，补偿服务运行]&nbsp;
				<%if(authUtlStartFlag=="true"){
					%><a class="start myhand" href = "start">启动</a><%
				}%>
				<%if(authUtlStopFlag=="true"){
					%><a class="stop myhand" href = "stop">停止</a><%
				}%>
				<%if(authUtlForceStopFlag=="true"){
					%>|<a class="forceStop myhand" href = "forceStop">强停</a><%
				}%>
			<%
			}else if (serviceStatus=="10"){
			%>
				[服务运行，补偿服务停止]&nbsp;
				<%if(authUtlStopFlag=="true"){
					%><a class="stop myhand" href = "stop">停止</a><%
				}%>
				<%if(authUtlForceStopFlag=="true"){
					%>|<a class="forceStop myhand" href = "forceStop">强停</a><%
				}%>
			<%
			}else{
				%>[未知]<%
			}%>
		</td>
	<%
	}
%>


<td class="degradeConfig">

 <% if(serviceCategory == "BusinessService" && messageMode =="request_response" ){ %>
	<%
	   if ((degradeConfig == "false" || degradeConfig == "FALSE") && (degradeEnable == "false" || degradeEnable == "FALSE")){
	%>
	   <a href="javascript:void(0);" class="serviceDegradeConfig">配置</a>
	<%
	}else if ((degradeConfig == "true" || degradeConfig == "TRUE") && (degradeEnable == "false" || degradeEnable == "FALSE")){
	%>
		关闭 &nbsp;&nbsp;&nbsp; <a href="serviceDegradeConfig" class="serviceDegradeConfig">配置</a>
		||
		<a href="javascript:void(0);" class="openServiceDegradeConfig">开启</a>
	<%
	}
	   else if (degradeConfig == "true" && degradeEnable == "true"){
	%>
		开启 &nbsp;&nbsp;&nbsp; <a href="serviceDegradeConfig" class="serviceDegradeConfig">配置</a>
		||
		<a href="javascript:void(0);" class="closeServiceDegradeConfig">关闭</a>
	<%
	}else if ((degradeConfig == "false" || degradeConfig == "FALSE") && degradeEnable == "true"){
	%>
		开启 &nbsp;&nbsp;&nbsp; <a href="javascript:void(0);" class="serviceDegradeConfig">配置</a>
		||
		<a href="javascript:void(0);" class="closeServiceDegradeConfig">关闭</a>
	<%
	}
	}else{ %>
       <span >不支持 </span>
	<% } %>
</td>

<td>
    <% if(isDefaultVersion == "TRUE" ||  isDefaultVersion=="true" || grayConfig== "false" || grayConfig == "FALSE") { %>
       <span >不支持 </span>
     <% }
    else {
		if(grayEnable=="TRUE" || grayEnable =="true"){ %>
		   开启 &nbsp;&nbsp;&nbsp;<a href="javascript:void(0);" class="serviceGrayConfig">配置</a>
			||
			<a href="javascript:void(0);" class="closeServiceGrayConfig" >关闭</a>
	<%	}else if(grayEnable=="FALSE" || grayEnable =="false"){ %>
		  关闭 &nbsp;&nbsp;&nbsp;  <a href="javascript:void(0);" class="serviceGrayConfig">配置</a>
			||
			<a href="javascript:void(0);" class="openServiceGrayConfig" >开启</a>
	<%	}
    }%>
</td>

<td class="groupServiceCfgTd"> <a class = "myhand">组配置</a></td>
<td><a class = "myhand serviceDetail">详情</a></td>
<td><a class = "myhand GroupMoniView">查看</a></td>

