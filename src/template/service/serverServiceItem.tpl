<!--
<td>
	<input type="checkbox" name="selected" class="select" value="selected"/>
</td>
-->
<td><%=serviceName%></td>
<td><%=serviceCategory%></td>
<td><%=appVersion%></td>
<td class="sericeStatus">
	<%if(serviceStatus==1){
		%>启动<%
	}else if(serviceStatus==2){
		%>停止<%
	}else if(serviceStatus==3){
		%>启动中<%
	}else if(serviceStatus==4){
		%>停止中<%
	}else if(serviceStatus==5){
		%>挂起<%
	}else if(serviceStatus==6){
		%>挂起中<%
	}else if(serviceStatus==7){
		%>异常<%
	}else if(serviceStatus==8){
		%>查询中<%
	}else if(serviceStatus==9){
		%>服务停止,补偿流程未停止<%
	}else if (serviceStatus==10){
		%>服务运行，补偿流程已停止<%
	}else{
		%>未知<%
	}%>
</td>

<%
	if(serviceCategory=="BusinessService"){
	 %>
	 	<td class="serviceOperationTd">
			<%if(serviceStatus=="1"){
			%>
				<%if(authJcfStopFlag=="true"){
					%><a class="stop myhand" href = "stop">停止</a><%
				}else{
					%><span class = "text-info">停止</span><%
				}%>
				
				<%if(authJcfForceStopFlag=="true"){
					%>|<a class="forceStop myhand" href = "forceStop">强制停止</a><%
				}else{
				    %>|<span class = "text-info">强制停止</span><%
				}%>
			<%
			}else if(serviceStatus=="2"){
			%>
				<%if(authJcfStartFlag=="true"){
					%><a class="start myhand" href = "start">启动</a><%
				}else{
					%><span class = "text-info">启动</span><%
				}%>
			<%
			}else if(serviceStatus=="3"){
				%>停止||强制停止<%
			}else if(serviceStatus=="4"){
			%>
				<%if(authJcfForceStopFlag=="true"){
					%><a class="forceStop myhand" href = "forceStop">强制停止</a><%
				}else{
					%><span class = "text-info">强制停止</span><%
				}%>
			<%
			}else if(serviceStatus=="5"){
				%>挂起<%
			}else if(serviceStatus=="6"){
				%>挂起中<%
			}else if(serviceStatus=="7"){
				%>异常<%
			}else if(serviceStatus=="8"){
				%>查询中<%
			}else if (serviceStatus=="9"){
			%>
				<%if(authJcfStartFlag=="true"){
					%><a class="start myhand" href = "start">启动</a><%
				}else{
					%><span class = "text-info">启动</span><%
				}%>
				<%if(authJcfStopFlag=="true"){
					%><a class="stop myhand" href = "stop">停止</a><%
				}else{
					%><span class = "text-info">停止</span><%
				}%>
				<%if(authJcfForceStopFlag=="true"){
					%>|<a class="forceStop myhand" href = "forceStop">强制停止</a><%
				}else{
				    %>|<span class = "text-info">强制停止</span><%
				}%>
			<% 
			}else if (serviceStatus=="10"){
			%>
				<%if(authJcfStopFlag=="true"){
					%><a class="stop myhand" href = "stop">停止</a><%
				}else{
					%><span class = "text-info">停止</span><%
				}%>
				<%if(authJcfForceStopFlag=="true"){
					%>|<a class="forceStop myhand" href = "forceStop">强制停止</a><%
				}else{
				    %>|<span class = "text-info">强制停止</span><%
				}%>
			<% 
			}else {
				%>未知<%
			}%>
		</td>
		<td class="serverServiceCfgTd">
			<%
			if(serviceStatus!="3"&&serviceStatus!="4"&&serviceStatus!="5"&&serviceStatus!="6"&&serviceStatus!="7"&&serviceStatus!="8"&&authJcfCfgFlag=="true"){
			  %><a  href = "#" class = "myhand">服务配置</a><%
			}else{
			  %><span class = "text-info">服务配置</span><%
			}
			%>
		</td>
		<td class = "serviceCfgMoniTd">
			<%if(serviceStatus=="1"&&authJcfMoniFlag=="true"){
				%><a class = "myhand">查看</a><%
			}else{
				%><span class = "text-info">查看</span><%
			}%>
		</td>
		<td class="serverServiceRespTd">
			<!--<a  href = "#" class = "myhand">查看</a>-->
			<span class = "text-info">查看</span>
		</td>
	 <%
	}else if (serviceCategory=="sih"){
	 %>
	 	<td class="serviceOperationTd">
			<%if(serviceStatus=="1"){
			%>
				<%if(authSihStopFlag=="true"){
				   %><a class="stop myhand" href = "stop">停止</a><%
				}else{
				   %><span class = "text-info">停止</span><%
				}%>
				<%if(authSihForceStopFlag=="true"){
					%>|<a class="forceStop myhand" href = "forceStop">强制停止</a><%
				}else{
					%><span class = "text-info">强制停止</span><%
				}%>
			<%
			}else if(serviceStatus=="2"){
			%>
				<%if(authSihStopFlag=="true"){
				   %><a class="start myhand" href = "start">启动</a><%
				}else{
				   %><span class = "text-info">启动</span><%
				}%>
			<%
			}else if(serviceStatus=="3"){
				%>停止||强制停止<%
			}else if(serviceStatus=="4"){
			%>
				<%if(authSihForceStopFlag=="true"){
					%><a class="forceStop myhand" href = "forceStop">强制停止</a><%
				}else{
					%><span class = "text-info">强制停止</span><%
				}%>
			<%
			}else if(serviceStatus=="5"){
				%>挂起<%
			}else if(serviceStatus=="6"){
				%>挂起中<%
			}else if(serviceStatus=="7"){
				%>异常<%
			}else if(serviceStatus=="8"){
				%>查询中<%
			}else if (serviceStatus=="9"){
			%>
				<%if(authSihStopFlag=="true"){
				   %><a class="start myhand" href = "start">启动</a><%
				}else{
				   %><span class = "text-info">启动</span><%
				}%>
				<%if(authSihStopFlag=="true"){
				   %><a class="stop myhand" href = "stop">停止</a><%
				}else{
				   %><span class = "text-info">停止</span><%
				}%>
				<%if(authSihForceStopFlag=="true"){
					%>|<a class="forceStop myhand" href = "forceStop">强制停止</a><%
				}else{
					%><span class = "text-info">强制停止</span><%
				}%>
			<%
			}else if (serviceStatus=="10"){
			%>
				<%if(authSihStopFlag=="true"){
				   %><a class="stop myhand" href = "stop">停止</a><%
				}else{
				   %><span class = "text-info">停止</span><%
				}%>
				<%if(authSihForceStopFlag=="true"){
					%>|<a class="forceStop myhand" href = "forceStop">强制停止</a><%
				}else{
					%><span class = "text-info">强制停止</span><%
				}%>
			<%
			}else{
				%>未知<%
			}%>
		</td>
		<td class="serverServiceCfgTd">
			<%
			if(serviceStatus!="3"&&serviceStatus!="4"&&serviceStatus!="5"&&serviceStatus!="6"&&serviceStatus!="7"&&serviceStatus!="8"&&authSihCfgFlag=="true"){
			  %><a  href = "#" class = "myhand">服务配置</a><%
			}else{
			  %><span class = "text-info">服务配置</span><%
			}
			%>
		</td>
		<td class = "serviceCfgMoniTd">
			<%if(serviceStatus=="1"&&authSihMoniFlag=="true"){
				%><a class = "myhand">查看</a><%
			}else{
			    %><span class = "text-info">查看</span><%
			}%>
		</td>
		<td class="serverServiceRespTd">
			<!--<a  href = "#" class = "myhand">查看</a>-->
			<span class = "text-info">查看</span>
		</td>
	 <%
	}else if (serviceCategory=="http"){
	 %>
	 	<td class="serviceOperationTd">
			<%if(serviceStatus=="1"){
			%>
				<%if(authHttpStopFlag=="true"){
				   %><a class="stop myhand" href = "stop">停止</a><%
				}else{
				   %><span class = "text-info">停止</span><%
				}%>
				<%if(authHttpForceStopFlag=="true"){
					%>|<a class="forceStop myhand" href = "forceStop">强制停止</a><%
				}else{
					%><span class = "text-info">强制停止</span><%
				}%>
			<%
			}else if(serviceStatus=="2"){
			%>
				<%if(authHttpStartFlag=="true"){
				   %><a class="start myhand" href = "start">启动</a><%
				}else{
				   %><span class = "text-info">启动</span><%
				}%>
			<%
			}else if(serviceStatus=="3"){
				%>停止||强制停止<%
			}else if(serviceStatus=="4"){
			%>
				<%if(authHttpForceStopFlag=="true"){
					%>|<a class="forceStop myhand" href = "forceStop">强制停止</a><%
				}else{
					%><span class = "text-info">强制停止</span><%
				}%>
			<%
			}else if(serviceStatus=="5"){
				%>挂起<%
			}else if(serviceStatus=="6"){
				%>挂起中<%
			}else if(serviceStatus=="7"){
				%>异常<%
			}else if(serviceStatus=="8"){
				%>查询中<%
			}else if (serviceStatus=="9"){
			%>
				<%if(authHttpStopFlag=="true"){
				   %><a class="stop myhand" href = "stop">停止</a><%
				}else{
				   %><span class = "text-info">停止</span><%
				}%>
				<%if(authHttpForceStopFlag=="true"){
					%>|<a class="forceStop myhand" href = "forceStop">强制停止</a><%
				}else{
					%><span class = "text-info">强制停止</span><%
				}%>
			<%
			}else if (serviceStatus=="10"){
			%>
				<%if(authHttpStopFlag=="true"){
				   %><a class="stop myhand" href = "stop">停止</a><%
				}else{
				   %><span class = "text-info">停止</span><%
				}%>
				<%if(authHttpForceStopFlag=="true"){
					%>|<a class="forceStop myhand" href = "forceStop">强制停止</a><%
				}else{
					%><span class = "text-info">强制停止</span><%
				}%>
			<%
			}else{
				%>未知<%
			}%>
		</td>
		<td class="serverServiceCfgTd">
			<%
			if(serviceStatus!="3"&&serviceStatus!="4"&&serviceStatus!="5"&&serviceStatus!="6"&&serviceStatus!="7"&&serviceStatus!="8"&&authHttpCfgFlag=="true"){
			  %><a  href = "#" class = "myhand">服务配置</a><%
			}else{
			  %><span class = "text-info">服务配置</span><%
			}
			%>
		</td>
		
		<td class = "serviceCfgMoniTd">
			<%if(serviceStatus=="1"&&authHttpMoniFlag=="true"){
				%><a class = "myhand">查看</a><%
			}else{
			    %><span class = "text-info">查看</span><%
			}%>
		</td>
		<td class="serverServiceRespTd">
			<!--<a  href = "#" class = "myhand">查看</a>-->
			<span class = "text-info">查看</span>
		</td>
	 <%
	}else if (serviceCategory=="webservice"){
	 %>
	 	<td class="serviceOperationTd">
			<%if(serviceStatus=="1"){
			%>
				<%if(authWebStopFlag=="true"){
				   %><a class="stop myhand" href = "stop">停止</a><%
				}else{
				   %><span class = "text-info">停止</span><%
				}%>
				<%if(authWebForceStopFlag=="true"){
					%>|<a class="forceStop myhand" href = "forceStop">强制停止</a><%
				}else{
					%><span class = "text-info">强制停止</span><%
				}%>
			<%
			}else if(serviceStatus=="2"){
			%>
				<%if(authWebStartFlag=="true"){
				   %><a class="start myhand" href = "start">启动</a><%
				}else{
				   %><span class = "text-info">启动</span><%
				}%>
			<%
			}else if(serviceStatus=="3"){
				%>停止||强制停止<%
			}else if(serviceStatus=="4"){
			%>
				<%if(authWebForceStopFlag=="true"){
					%><a class="forceStop myhand" href = "forceStop">强制停止</a><%
				}else{
					%><span class = "text-info">强制停止</span><%
				}%>
			<%
			}else if(serviceStatus=="5"){
				%>挂起<%
			}else if(serviceStatus=="6"){
				%>挂起中<%
			}else if(serviceStatus=="7"){
				%>异常<%
			}else if(serviceStatus=="8"){
				%>查询中<%
			}else if (serviceStatus=="9"){
			%>	
				<%if(authWebStartFlag=="true"){
				   %><a class="start myhand" href = "start">启动</a><%
				}else{
				   %><span class = "text-info">启动</span><%
				}%>
				<%if(authWebStopFlag=="true"){
				   %><a class="stop myhand" href = "stop">停止</a><%
				}else{
				   %><span class = "text-info">停止</span><%
				}%>
				<%if(authWebForceStopFlag=="true"){
					%>|<a class="forceStop myhand" href = "forceStop">强制停止</a><%
				}else{
					%><span class = "text-info">强制停止</span><%
				}%>
			<%
			}else if (serviceStatus=="10"){
			%>
				<%if(authWebStopFlag=="true"){
				   %><a class="stop myhand" href = "stop">停止</a><%
				}else{
				   %><span class = "text-info">停止</span><%
				}%>
				<%if(authWebForceStopFlag=="true"){
					%>|<a class="forceStop myhand" href = "forceStop">强制停止</a><%
				}else{
					%><span class = "text-info">强制停止</span><%
				}%>
			<%
			}else{
				%>未知<%
			}%>
		</td>
		<td class="serverServiceCfgTd">
			<%
			if(serviceStatus!="3"&&serviceStatus!="4"&&serviceStatus!="5"&&serviceStatus!="6"&&serviceStatus!="7"&&serviceStatus!="8"&&authWebCfgFlag=="true"){
			  %><a  href = "#" class = "myhand">服务配置</a><%
			}else{
			  %><span class = "text-info">服务配置</span><%
			}
			%>
		</td>
		<td class = "serviceCfgMoniTd">
			<%if(serviceStatus=="1"&&authWebMoniFlag=="true"){
				%><a class = "myhand">查看</a><%
			}else{
			    %><span class = "text-info">查看</span><%
			}%>
		</td>
		<td class="serverServiceRespTd">
			<!--<a  href = "#" class = "myhand">查看</a>-->
			<span class = "text-info">查看</span>
		</td>
	 <%
	}else if (serviceCategory=="tumsb"){
	 %>
	 	<td class="serviceOperationTd">
			<%if(serviceStatus=="1"){
			%>
				<%if(authTbStopFlag=="true"){
				   %><a class="stop myhand" href = "stop">停止</a><%
				}else{
				   %><span class = "text-info">停止</span><%
				}%>
				<%if(authTbForceStopFlag=="true"){
					%>|<a class="forceStop myhand" href = "forceStop">强制停止</a><%
				}else{
					%><span class = "text-info">强制停止</span><%
				}%>
			<%
			}else if(serviceStatus=="2"){
			%>
				<%if(authTbStartFlag=="true"){
				   %><a class="start myhand" href = "start">启动</a><%
				}else{
				   %><span class = "text-info">启动</span><%
				}%>
			<%
			}else if(serviceStatus=="3"){
				%>停止||强制停止<%
			}else if(serviceStatus=="4"){
			%>
				<%if(authTbForceStopFlag=="true"){
					%>|<a class="forceStop myhand" href = "forceStop">强制停止</a><%
				}else{
					%><span class = "text-info">强制停止</span><%
				}%>
			<%
			}else if(serviceStatus=="5"){
				%>挂起<%
			}else if(serviceStatus=="6"){
				%>挂起中<%
			}else if(serviceStatus=="7"){
				%>异常<%
			}else if(serviceStatus=="8"){
				%>查询中<%
			}else if (serviceStatus=="9"){
			%>
				<%if(authTbStartFlag=="true"){
				   %><a class="start myhand" href = "start">启动</a><%
				}else{
				   %><span class = "text-info">启动</span><%
				}%>
				<%if(authTbStopFlag=="true"){
				   %><a class="stop myhand" href = "stop">停止</a><%
				}else{
				   %><span class = "text-info">停止</span><%
				}%>
				<%if(authTbForceStopFlag=="true"){
					%>|<a class="forceStop myhand" href = "forceStop">强制停止</a><%
				}else{
					%><span class = "text-info">强制停止</span><%
				}%>
			<%
			}else if (serviceStatus=="10"){
			%>
				<%if(authTbStopFlag=="true"){
				   %><a class="stop myhand" href = "stop">停止</a><%
				}else{
				   %><span class = "text-info">停止</span><%
				}%>
				<%if(authTbForceStopFlag=="true"){
					%>|<a class="forceStop myhand" href = "forceStop">强制停止</a><%
				}else{
					%><span class = "text-info">强制停止</span><%
				}%>
			<%
			}else{
				%>未知<%
			}%>
		</td>
		<td class="serverServiceCfgTd">
			<%
			if(serviceStatus!="3"&&serviceStatus!="4"&&serviceStatus!="5"&&serviceStatus!="6"&&serviceStatus!="7"&&serviceStatus!="8"&&authTbCfgFlag=="true"){
			  %><a  href = "#" class = "myhand">服务配置</a><%
			}else{
			  %><span class = 'text-info'>服务配置</span><%
			}
			%>
		</td>
		<td class = "serviceCfgMoniTd">
			<%if(serviceStatus=="1"&&authTbMoniFlag=="true"){
				%><a class = "myhand">查看</a><%
			}else{
			    %><span class = "text-info">查看</span><%
			}%>
		</td>
		<td class="serverServiceRespTd">
			<!--<a  href = "#" class = "myhand">查看</a>-->
			<span class = "text-info">查看</span>
		</td>
	 <%
	}else if (serviceCategory=="tumst"){
	 %>
	 	<td class="serviceOperationTd">
			<%if(serviceStatus=="1"){
			%>
				<%if(authTtStopFlag=="true"){
				   %><a class="stop myhand" href = "stop">停止</a><%
				}else{
				   %><span class = "text-info">停止</span><%
				}%>
				<%if(authTtForceStopFlag=="true"){
					%>|<a class="forceStop myhand" href = "forceStop">强制停止</a><%
				}else{
					%><span class = "text-info">强制停止</span><%
				}%>
			<%
			}else if(serviceStatus=="2"){
			%>
				<%if(authTtStartFlag=="true"){
				   %><a class="start myhand" href = "start">启动</a><%
				}else{
				   %><span class = "text-info">启动</span><%
				}%>
			<%
			}else if(serviceStatus=="3"){
				%>停止||强制停止<%
			}else if(serviceStatus==4){
			%>
				<%if(authTtForceStopFlag=="true"){
					%>|<a class="forceStop myhand" href = "forceStop">强制停止</a><%
				}else{
					%><span class = "text-info">强制停止</span><%
				}%>
			<%
			}else if(serviceStatus=="5"){
				%>挂起<%
			}else if(serviceStatus=="6"){
				%>挂起中<%
			}else if(serviceStatus=="7"){
				%>异常<%
			}else if(serviceStatus=="8"){
				%>查询中<%
			}else if (serviceStatus=="9"){
			%>
				<%if(authTtStartFlag=="true"){
				   %><a class="start myhand" href = "start">启动</a><%
				}else{
				   %><span class = "text-info">启动</span><%
				}%>
				<%if(authTtStopFlag=="true"){
				   %><a class="stop myhand" href = "stop">停止</a><%
				}else{
				   %><span class = "text-info">停止</span><%
				}%>
				<%if(authTtForceStopFlag=="true"){
					%>|<a class="forceStop myhand" href = "forceStop">强制停止</a><%
				}else{
					%><span class = "text-info">强制停止</span><%
				}%>
			<%
			}else if (serviceStatus=="10"){
			%>
				<%if(authTtStopFlag=="true"){
				   %><a class="stop myhand" href = "stop">停止</a><%
				}else{
				   %><span class = "text-info">停止</span><%
				}%>
				<%if(authTtForceStopFlag=="true"){
					%>|<a class="forceStop myhand" href = "forceStop">强制停止</a><%
				}else{
					%><span class = "text-info">强制停止</span><%
				}%>
			<%
			}else{
				%>未知<%
			}%>
		</td>
		<td class="serverServiceCfgTd">
			<%
			if(serviceStatus!="3"&&serviceStatus!="4"&&serviceStatus!="5"&&serviceStatus!="6"&&serviceStatus!="7"&&serviceStatus!="8"&&authTtCfgFlag=="true"){
			  %><a  href = "#" class = "myhand">服务配置</a><%
			}else{
			  %><span class = "text-info">服务配置</span><%
			}
			%>
		</td>
		<td class = "serviceCfgMoniTd">
			<%if(serviceStatus=="1"&&authTtMoniFlag=="true"){
				%><a class = "myhand">查看</a><%
			}else{
			    %><span class = "text-info">查看</span><%
			}%>
		</td>
		<td class="serverServiceRespTd">
			<!--<a  href = "#" class = "myhand">查看</a>-->
			<span class = "text-info">查看</span>
		</td>
	 <%
	}else if (serviceCategory=="utl"){
	 %>
	 	<td class="serviceOperationTd">
			<%if(serviceStatus=="1"){
			%>
				<%if(authUtlStopFlag=="true"){
				   %><a class="stop myhand" href = "stop">停止</a><%
				}else{
				   %><span class = "text-info">停止</span><%
				}%>
				<%if(authUtlForceStopFlag=="true"){
					%>|<a class="forceStop myhand" href = "forceStop">强制停止</a><%
				}else{
					%><span class = "text-info">强制停止</span><%
				}%>
			<%
			}else if(serviceStatus=="2"){
			%>
				<%if(authUtlStartFlag=="true"){
				   %><a class="start myhand" href = "start">启动</a><%
				}else{
				   %><span class = "text-info">启动</span><%
				}%>
			<%
			}else if(serviceStatus=="3"){
				%>停止||强制停止<%
			}else if(serviceStatus=="4"){
			%>
				<%if(authUtlForceStopFlag=="true"){
					%><a class="forceStop myhand" href = "forceStop">强制停止</a><%
				}else{
					%><span class = "text-info">强制停止</span><%
				}%>
			<%
			}else if(serviceStatus=="5"){
				%>挂起<%
			}else if(serviceStatus=="6"){
				%>挂起中<%
			}else if(serviceStatus=="7"){
				%>异常<%
			}else if(serviceStatus=="8"){
				%>查询中<%
			}else if (serviceStatus=="9"){
			%>
				<%if(authUtlStartFlag=="true"){
				   %><a class="start myhand" href = "start">启动</a><%
				}else{
				   %><span class = "text-info">启动</span><%
				}%>
				<%if(authUtlStopFlag=="true"){
				   %><a class="stop myhand" href = "stop">停止</a><%
				}else{
				   %><span class = "text-info">停止</span><%
				}%>
				<%if(authUtlForceStopFlag=="true"){
					%>|<a class="forceStop myhand" href = "forceStop">强制停止</a><%
				}else{
					%><span class = "text-info">强制停止</span><%
				}%>
			<%
			}else if (serviceStatus=="10"){
			%>
				<%if(authUtlStopFlag=="true"){
				   %><a class="stop myhand" href = "stop">停止</a><%
				}else{
				   %><span class = "text-info">停止</span><%
				}%>
				<%if(authUtlForceStopFlag=="true"){
					%>|<a class="forceStop myhand" href = "forceStop">强制停止</a><%
				}else{
					%><span class = "text-info">强制停止</span><%
				}%>
			<%
			}else{
				%>未知<%
			}%>
		</td>
		<td class="serverServiceCfgTd">
			<%
			if(serviceStatus!="3"&&serviceStatus!="4"&&serviceStatus!="5"&&serviceStatus!="6"&&serviceStatus!="7"&&serviceStatus!="8"&&authUtlCfgFlag=="true"){
			  %><a  href = "#" class = "myhand">服务配置</a><%
			}else{
			  %><span class = "text-info">服务配置</span><%
			}
			%>
		</td>
		<td class = "serviceCfgMoniTd">
			<%if(serviceStatus=="1"&&authUtlMoniFlag=="true"){
				%><a class = "myhand">查看</a><%
			}else{
			    %><span class = "text-info">查看</span><%
			}%>
		</td>
		<td class="serverServiceRespTd">
			<!--<a  href = "#" class = "myhand">查看</a>-->
			<span class = "text-info">查看</span>
		</td>
	 <%
	}
%>
