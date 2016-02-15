<%if(hasCompensateService=="1"){//表示有补偿服务
  %><td class = "showCompensate"><div class = "arrow_rigth myhand">&nbsp;</div></td><%	
}else{
  %><td>无补偿服务</td><%	
}%>
<td><%=serverName%></td>
<td><%=serviceName%></td>
<td><%=serviceCategory%></td>
<td>
	<%
		if(serviceStatus=="1"){
		   %>启动<%
		}else if (serviceStatus=="2"){
		   %>停止<%
		}else if (serviceStatus=="3"){
		   %>启动中...<%
		}else if (serviceStatus=="4"){
		   %>停止中...<%
		}else if (serviceStatus=="5"){
		   %>挂起<%
		}else if (serviceStatus=="6"){
		   %>挂起中...<%
		}else if (serviceStatus=="7"){
		   %>异常<%
		}else if (serviceStatus=="8"){
		   %>查询中...<%
		}else if (serviceStatus=="9"){
		   %>停止,补偿流程还未停止<%
		}else if (serviceStatus=="10"){
		   %>服务运行，补偿流程停止<%
		}else if (serviceStatus=="21"){
		   %>服务器状态：启动<%
		}else if (serviceStatus=="22"){
		   %>服务器状态：停止<%
		}else if (serviceStatus=="23"){
		   %>服务器状态：启动中<%
		}else if (serviceStatus=="24"){
		   %>服务器状态：停止中<%
		}else if (serviceStatus=="25"){
		   %>服务器状态：服务器异常<%
		}else if (serviceStatus=="26"){
		   %>服务器状态：Down<%
		}else if (serviceStatus=="27"){
		   %>服务器状态：查询中<%
		}else if (serviceStatus=="28"){
		   %>服务器状态：连接异常<%
		}
	%>
</td>


<%if(serviceCategory=="BusinessService"){
%>
	<td class = "serviceStatusOperTd">
		<%
			if(serviceStatus=="1"){%>
				<%if(authJcfStopFlag=="true"){
					%><a href = "stop" class = "myhand">停止</a><%
				}else{
					%><span class = "text-info">停止</span><%
				}%>
			  	<%if(authJcfForceStopFlag=="true"){
			  		%>|<a href = "forceStop" class = "myhand">强制停止</a><%
			  	}else{
			  		%><span class = "text-info">强制停止</span><%
			  	}%>	
			<%}else if (serviceStatus=="2"){%>
				<%if(authJcfStartFlag=="true"){
					%><a href = "start" class = "myhand">启动</a><%
				}else{
					%><span class = "text-info">启动</span><%
				}%>
			<%}else if (serviceStatus=="3"){
			  %>启动/停止<%
			}else if (serviceStatus=="4"){%>
				<%if(authJcfForceStopFlag=="true"){
			  		%><a href = "forceStop" class = "myhand">强制停止</a><%
			  	}else{
			  		%><span class = "text-info">强制停止</span><%
			  	}%>	
			<%}else if (serviceStatus=="5"){
			  %>未知<%
			}else if (serviceStatus=="6"){
			  %>未知<%
			}else if (serviceStatus=="7"){
			  %>&nbsp;<%
			}else if (serviceStatus=="8"){
			  %>无操作<%
			}else if (serviceStatus=="9"){
			%>
				<%if(authJcfStartFlag=="true"){
					%><a href = "start" class = "myhand">启动</a><%
				}else{
					%><span class = "text-info">启动</span><%
				}%>
				<%if(authJcfStopFlag=="true"){
					%><a href = "stop" class = "myhand">|停止</a><%
				}else{
					%><span class = "text-info">停止</span><%
				}%>
			  	<%if(authJcfForceStopFlag=="true"){
			  		%><a href = "forceStop" class = "myhand">|强制停止</a><%
			  	}else{
			  		%><span class = "text-info">强制停止</span><%
			  	}%>	
			<%
			}else if (serviceStatus=="10"){
			%>
				<%if(authJcfStopFlag=="true"){
					%><a href = "stop" class = "myhand">停止</a><%
				}else{
					%><span class = "text-info">停止</span><%
				}%>
			  	<%if(authJcfForceStopFlag=="true"){
			  		%>|<a href = "forceStop" class = "myhand">强制停止</a><%
			  	}else{
			  		%><span class = "text-info">强制停止</span><%
			  	}%>	
			<%
			}else if (serviceStatus=="21"){%>
				<%if(authJcfStartFlag=="true"){
					%><a href = "start" class = "myhand">启动</a><%
				}else{
					%><span class = "text-info">启动</span><%
				}%>
			<%}else if (serviceStatus=="22"){
			  %>&nbsp;<%
			}else if (serviceStatus=="23"){
			  %>&nbsp;<%
			}else if (serviceStatus=="24"){
			  %>&nbsp;<%
			}else if (serviceStatus=="25"){
			  %>&nbsp;<%
			}else if (serviceStatus=="26"){
			  %>&nbsp;<%
			}else if (serviceStatus=="27"){
			  %>&nbsp;<%
			}else if (serviceStatus=="28"){
			  %>&nbsp;<%
			}
		%>
	</td>
	<td class = "serviceCfgTd" >
		<%if((serviceStatus=="1"||serviceStatus=="2"||serviceStatus=="9"||serviceStatus=="10")&&authJcfCfgFlag=="true"){%>
			<a  href = "#" class = "myhand">配置</a>
		<%}else{%>
			<span class = "text-info">配置</span>
		<%}%>
	</td>
	<td class = "serviceMonitorTd" >
		<%if((serviceStatus=="1"||serviceStatus=="10")&&authJcfMoniFlag=="true"){%>
			  <a  href = "#" class = "myhand">查看</a><%
		}else{%>
			 <span class = "text-info"> 查看</span>
		<%}%>
	</td>
<%
}else if (serviceCategory=="sih"){
%>
	<td class = "serviceStatusOperTd">
		<%
			if(serviceStatus=="1"){%>
				<%if(authSihStopFlag=="true"){
					%><a href = "stop" class = "myhand">停止</a><%
				}else{
					%><span class = "text-info">停止</span><%
				}%>
			  	<%if(authSihForceStopFlag=="true"){
			  		%>|<a href = "forceStop" class = "myhand">强制停止</a><%
			  	}else{
			  		%><span class = "text-info">强制停止</span><%
			  	}%>	
			<%}else if (serviceStatus=="2"){%>
				<%if(authSihStartFlag=="true"){
					%><a href = "start" class = "myhand">启动</a><%
				}else{
					%><span class = "text-info">启动</span><%
				}%>
			<%}else if (serviceStatus=="3"){
			  %>启动/停止<%
			}else if (serviceStatus=="4"){%>
				<%if(authSihForceStopFlag=="true"){
			  		%><a href = "forceStop" class = "myhand">强制停止</a><%
			  	}else{
			  		%><span class = "text-info">强制停止</span><%
			  	}%>	
			<%}else if (serviceStatus=="5"){
			  %>未知<%
			}else if (serviceStatus=="6"){
			  %>未知<%
			}else if (serviceStatus=="7"){
			  %>&nbsp;<%
			}else if (serviceStatus=="8"){
			  %>无操作<%
			}else if (serviceStatus=="9"){
			%>
				<%if(authSihStartFlag=="true"){
					%><a href = "start" class = "myhand">启动</a><%
				}else{
					%><span class = "text-info">启动</span><%
				}%>
				<%if(authSihStopFlag=="true"){
					%><a href = "stop" class = "myhand">|停止</a><%
				}else{
					%><span class = "text-info">停止</span><%
				}%>
			  	<%if(authSihForceStopFlag=="true"){
			  		%><a href = "forceStop" class = "myhand">|强制停止</a><%
			  	}else{
			  		%><span class = "text-info">强制停止</span><%
			  	}%>	
			<%
			}else if (serviceStatus=="10"){
			%>
				<%if(authSihStopFlag=="true"){
					%><a href = "stop" class = "myhand">停止</a><%
				}else{
					%><span class = "text-info">停止</span><%
				}%>
			  	<%if(authSihForceStopFlag=="true"){
			  		%>|<a href = "forceStop" class = "myhand">强制停止</a><%
			  	}else{
			  		%><span class = "text-info">强制停止</span><%
			  	}%>	
			<%
			}else if (serviceStatus=="21"){%>
				<%if(authSihStartFlag=="true"){
					%><a href = "start" class = "myhand">启动</a><%
				}else{
					%><span class = "text-info">启动</span><%
				}%>
			<%}else if (serviceStatus=="22"){
			  %>&nbsp;<%
			}else if (serviceStatus=="23"){
			  %>&nbsp;<%
			}else if (serviceStatus=="24"){
			  %>&nbsp;<%
			}else if (serviceStatus=="25"){
			  %>&nbsp;<%
			}else if (serviceStatus=="26"){
			  %>&nbsp;<%
			}else if (serviceStatus=="27"){
			  %>&nbsp;<%
			}else if (serviceStatus=="28"){
			  %>&nbsp;<%
			}
		%>
	</td>
	<td class = "serviceCfgTd" >
		<%if((serviceStatus=="1"||serviceStatus=="2"||serviceStatus=="9"||serviceStatus=="10")&&authSihCfgFlag=="true"){%>
			 <a  href = "#" class = "myhand">配置</a>
		<%}else{%>
			<span class = "text-info"> 配置</span>
		<%}%>
	</td>
	<td class = "serviceMonitorTd" >
		<%if((serviceStatus=="1"||serviceStatus=="10")&&authSihMoniFlag=="true"){%>
			  <a  href = "#" class = "myhand">查看</a><%
		}else{%>
			 <span class = "text-info"> 查看</span>
		<%}%>
	</td>
<%
}else if (serviceCategory=="http"){
%>
	<td class = "serviceStatusOperTd">
		<%
			if(serviceStatus=="1"){%>
				<%if(authHttpStopFlag=="true"){
					%><a href = "stop" class = "myhand">停止</a><%
				}else{
					%><span class = "text-info">停止</span><%
				}%>
			  	<%if(authHttpForceStopFlag=="true"){
			  		%>|<a href = "forceStop" class = "myhand">强制停止</a><%
			  	}else{
			  		%><span class = "text-info">强制停止</span><%
			  	}%>	
			<%}else if (serviceStatus=="2"){%>
				<%if(authHttpStartFlag=="true"){
					%><a href = "start" class = "myhand">启动</a><%
				}else{
					%><span class = "text-info">启动</span><%
				}%>
			<%}else if (serviceStatus=="3"){
			  %>启动/停止<%
			}else if (serviceStatus=="4"){%>
				<%if(authHttpForceStopFlag=="true"){
			  		%><a href = "forceStop" class = "myhand">强制停止</a><%
			  	}else{
			  		%><span class = "text-info">强制停止</span><%
			  	}%>	
			<%}else if (serviceStatus=="5"){
			  %>未知<%
			}else if (serviceStatus=="6"){
			  %>未知<%
			}else if (serviceStatus=="7"){
			  %>&nbsp;<%
			}else if (serviceStatus=="8"){
			  %>无操作<%
			}else if (serviceStatus=="9"){
			%>
				<%if(authHttpStartFlag=="true"){
					%><a href = "start" class = "myhand">启动</a><%
				}else{
					%><span class = "text-info">启动</span><%
				}%>
				<%if(authHttpStopFlag=="true"){
					%><a href = "stop" class = "myhand">|停止</a><%
				}else{
					%><span class = "text-info">停止</span><%
				}%>
			  	<%if(authHttpForceStopFlag=="true"){
			  		%><a href = "forceStop" class = "myhand">|强制停止</a><%
			  	}else{
			  		%><span class = "text-info">强制停止</span><%
			  	}%>	
			<%
			}else if (serviceStatus=="10"){
			%>
				<%if(authHttpStopFlag=="true"){
					%><a href = "stop" class = "myhand">停止</a><%
				}else{
					%><span class = "text-info">停止</span><%
				}%>
			  	<%if(authHttpForceStopFlag=="true"){
			  		%>|<a href = "forceStop" class = "myhand">强制停止</a><%
			  	}else{
			  		%><span class = "text-info">强制停止</span><%
			  	}%>	
			<%
			}else if (serviceStatus=="21"){%>
				<%if(authHttpStartFlag=="true"){
					%><a href = "start" class = "myhand">启动</a><%
				}else{
					%><span class = "text-info">启动</span><%
				}%>
			<%}else if (serviceStatus=="22"){
			  %>&nbsp;<%
			}else if (serviceStatus=="23"){
			  %>&nbsp;<%
			}else if (serviceStatus=="24"){
			  %>&nbsp;<%
			}else if (serviceStatus=="25"){
			  %>&nbsp;<%
			}else if (serviceStatus=="26"){
			  %>&nbsp;<%
			}else if (serviceStatus=="27"){
			  %>&nbsp;<%
			}else if (serviceStatus=="28"){
			  %>&nbsp;<%
			}
		%>
	</td>
	<td class = "serviceCfgTd" >
		<%if((serviceStatus=="1"||serviceStatus=="2"||serviceStatus=="9"||serviceStatus=="10")&&authHttpCfgFlag=="true"){%>
			 <a  href = "#" class = "myhand">配置</a>
		<%}else{%>
			<span class = "text-info"> 配置</span>
		<%}%>
	</td>
	<td class = "serviceMonitorTd" >
		<%if((serviceStatus=="1"||serviceStatus=="10")&&authHttpMoniFlag=="true"){%>
			  <a  href = "#" class = "myhand">查看</a><%
		}else{%>
			 <span class = "text-info"> 查看</span>
		<%}%>
	</td>
<%
}else if (serviceCategory=="webservice"){
%>
	<td class = "serviceStatusOperTd">
		<%
			if(serviceStatus=="1"){%>
				<%if(authWebStopFlag=="true"){
					%><a href = "stop" class = "myhand">停止</a><%
				}else{
					%><span class = "text-info">停止</span><%
				}%>
			  	<%if(authWebForceStopFlag=="true"){
			  		%>|<a href = "forceStop" class = "myhand">强制停止</a><%
			  	}else{
			  		%><span class = "text-info">强制停止</span><%
			  	}%>	
			<%}else if (serviceStatus=="2"){%>
				<%if(authWebStartFlag=="true"){
					%><a href = "start" class = "myhand">启动</a><%
				}else{
					%><span class = "text-info">启动</span><%
				}%>
			<%}else if (serviceStatus=="3"){
			  %>启动/停止<%
			}else if (serviceStatus=="4"){%>
				<%if(authWebForceStopFlag=="true"){
			  		%><a href = "forceStop" class = "myhand">强制停止</a><%
			  	}else{
			  		%><span class = "text-info">强制停止</span><%
			  	}%>	
			<%}else if (serviceStatus=="5"){
			  %>未知<%
			}else if (serviceStatus=="6"){
			  %>未知<%
			}else if (serviceStatus=="7"){
			  %>&nbsp;<%
			}else if (serviceStatus=="8"){
			  %>无操作<%
			}else if (serviceStatus=="9"){
			%>
				<%if(authWebStartFlag=="true"){
					%><a href = "start" class = "myhand">启动</a><%
				}else{
					%><span class = "text-info">启动</span><%
				}%>
				<%if(authWebStopFlag=="true"){
					%><a href = "stop" class = "myhand">|停止</a><%
				}else{
					%><span class = "text-info">停止</span><%
				}%>
			  	<%if(authWebForceStopFlag=="true"){
			  		%><a href = "forceStop" class = "myhand">|强制停止</a><%
			  	}else{
			  		%><span class = "text-info">强制停止</span><%
			  	}%>	
			<%
			}else if (serviceStatus=="10"){
			%>
				<%if(authWebStopFlag=="true"){
					%><a href = "stop" class = "myhand">停止</a><%
				}else{
					%><span class = "text-info">停止</span><%
				}%>
			  	<%if(authWebForceStopFlag=="true"){
			  		%>|<a href = "forceStop" class = "myhand">强制停止</a><%
			  	}else{
			  		%><span class = "text-info">强制停止</span><%
			  	}%>	
			<%
			}else if (serviceStatus=="21"){%>
				<%if(authWebStartFlag=="true"){
					%><a href = "start" class = "myhand">启动</a><%
				}else{
					%><span class = "text-info">启动</span><%
				}%>
			<%}else if (serviceStatus=="22"){
			  %>&nbsp;<%
			}else if (serviceStatus=="23"){
			  %>&nbsp;<%
			}else if (serviceStatus=="24"){
			  %>&nbsp;<%
			}else if (serviceStatus=="25"){
			  %>&nbsp;<%
			}else if (serviceStatus=="26"){
			  %>&nbsp;<%
			}else if (serviceStatus=="27"){
			  %>&nbsp;<%
			}else if (serviceStatus=="28"){
			  %>&nbsp;<%
			}
		%>
	</td>
	<td class = "serviceCfgTd" >
		<%if((serviceStatus=="1"||serviceStatus=="2"||serviceStatus=="9"||serviceStatus=="10")&&authWebCfgFlag=="true"){%>
			 <a  href = "#" class = "myhand">配置</a>
		<%}else{%>
			<span class = "text-info"> 配置</span>
		<%}%>
	</td>
	<td class = "serviceMonitorTd" >
		<%if((serviceStatus=="1"||serviceStatus=="10")&&authWebMoniFlag=="true"){%>
			  <a  href = "#" class = "myhand">查看</a><%
		}else{%>
			 <span class = "text-info"> 查看</span>
		<%}%>
	</td>
<%
}else if (serviceCategory=="tumsb"){
%>
	<td class = "serviceStatusOperTd">
		<%
			if(serviceStatus=="1"){%>
				<%if(authTbStopFlag=="true"){
					%><a href = "stop" class = "myhand">停止</a><%
				}else{
					%><span class = "text-info">停止</span><%
				}%>
			  	<%if(authTbForceStopFlag=="true"){
			  		%>|<a href = "forceStop" class = "myhand">强制停止</a><%
			  	}else{
			  		%><span class = "text-info">强制停止</span><%
			  	}%>	
			<%}else if (serviceStatus=="2"){%>
				<%if(authTbStartFlag=="true"){
					%><a href = "start" class = "myhand">启动</a><%
				}else{
					%><span class = "text-info">启动</span><%
				}%>
			<%}else if (serviceStatus=="3"){
			  %>启动/停止<%
			}else if (serviceStatus=="4"){%>
				<%if(authTbForceStopFlag=="true"){
			  		%><a href = "forceStop" class = "myhand">强制停止</a><%
			  	}else{
			  		%><span class = "text-info">强制停止</span><%
			  	}%>	
			<%}else if (serviceStatus=="5"){
			  %>未知<%
			}else if (serviceStatus=="6"){
			  %>未知<%
			}else if (serviceStatus=="7"){
			  %>&nbsp;<%
			}else if (serviceStatus=="8"){
			  %>无操作<%
			}else if (serviceStatus=="9"){
			%>
				<%if(authTbStartFlag=="true"){
					%><a href = "start" class = "myhand">启动</a><%
				}else{
					%><span class = "text-info">启动</span><%
				}%>
				<%if(authTbStopFlag=="true"){
					%><a href = "stop" class = "myhand">|停止</a><%
				}else{
					%><span class = "text-info">停止</span><%
				}%>
			  	<%if(authTbForceStopFlag=="true"){
			  		%><a href = "forceStop" class = "myhand">|强制停止</a><%
			  	}else{
			  		%><span class = "text-info">强制停止</span><%
			  	}%>	
			<%
			}else if (serviceStatus=="10"){
			%>
				<%if(authTbStopFlag=="true"){
					%><a href = "stop" class = "myhand">停止</a><%
				}else{
					%><span class = "text-info">停止</span><%
				}%>
			  	<%if(authTbForceStopFlag=="true"){
			  		%>|<a href = "forceStop" class = "myhand">强制停止</a><%
			  	}else{
			  		%><span class = "text-info">强制停止</span><%
			  	}%>	
			<%
			}else if (serviceStatus=="21"){%>
				<%if(authTbStartFlag=="true"){
					%><a href = "start" class = "myhand">启动</a><%
				}else{
					%><span class = "text-info">启动</span><%
				}%>
			<%}else if (serviceStatus=="22"){
			  %>&nbsp;<%
			}else if (serviceStatus=="23"){
			  %>&nbsp;<%
			}else if (serviceStatus=="24"){
			  %>&nbsp;<%
			}else if (serviceStatus=="25"){
			  %>&nbsp;<%
			}else if (serviceStatus=="26"){
			  %>&nbsp;<%
			}else if (serviceStatus=="27"){
			  %>&nbsp;<%
			}else if (serviceStatus=="28"){
			  %>&nbsp;<%
			}
		%>
	</td>
	<td class = "serviceCfgTd" >
		<%if((serviceStatus=="1"||serviceStatus=="2"||serviceStatus=="9"||serviceStatus=="10")&&authTbCfgFlag=="true"){%>
			 <a  href = "#" class = "myhand">配置</a>
		<%}else{%>
			<span class = "text-info"> 配置</span>
		<%}%>
	</td>
	<td class = "serviceMonitorTd" >
		<%if((serviceStatus=="1"||serviceStatus=="10")&&authTbMoniFlag=="true"){%>
			  <a  href = "#" class = "myhand">查看</a><%
		}else{%>
			 <span class = "text-info"> 查看</span>
		<%}%>
	</td>
<%
}else if (serviceCategory=="tumst"){
%>
	<td class = "serviceStatusOperTd">
		<%
			if(serviceStatus=="1"){%>
				<%if(authTtStopFlag=="true"){
					%><a href = "stop" class = "myhand">停止</a><%
				}else{
					%><span class = "text-info">停止</span><%
				}%>
			  	<%if(authTtForceStopFlag=="true"){
			  		%>|<a href = "forceStop" class = "myhand">强制停止</a><%
			  	}else{
			  		%><span class = "text-info">强制停止</span><%
			  	}%>	
			<%}else if (serviceStatus=="2"){%>
				<%if(authTtStartFlag=="true"){
					%><a href = "start" class = "myhand">启动</a><%
				}else{
					%><span class = "text-info">启动</span><%
				}%>
			<%}else if (serviceStatus=="3"){
			  %>启动/停止<%
			}else if (serviceStatus=="4"){%>
				<%if(authTtForceStopFlag=="true"){
			  		%><a href = "forceStop" class = "myhand">强制停止</a><%
			  	}else{
			  		%><span class = "text-info">强制停止</span><%
			  	}%>	
			<%}else if (serviceStatus=="5"){
			  %>未知<%
			}else if (serviceStatus=="6"){
			  %>未知<%
			}else if (serviceStatus=="7"){
			  %>&nbsp;<%
			}else if (serviceStatus=="8"){
			  %>无操作<%
			}else if (serviceStatus=="9"){
			%>
				<%if(authTtStartFlag=="true"){
					%><a href = "start" class = "myhand">启动</a><%
				}else{
					%><span class = "text-info">启动</span><%
				}%>
				<%if(authTtStopFlag=="true"){
					%><a href = "stop" class = "myhand">|停止</a><%
				}else{
					%><span class = "text-info">停止</span><%
				}%>
			  	<%if(authTtForceStopFlag=="true"){
			  		%><a href = "forceStop" class = "myhand">|强制停止</a><%
			  	}else{
			  		%><span class = "text-info">强制停止</span><%
			  	}%>	
			<%
			}else if (serviceStatus=="10"){
			%>
				<%if(authTtStopFlag=="true"){
					%><a href = "stop" class = "myhand">停止</a><%
				}else{
					%><span class = "text-info">停止</span><%
				}%>
			  	<%if(authTtForceStopFlag=="true"){
			  		%>|<a href = "forceStop" class = "myhand">强制停止</a><%
			  	}else{
			  		%><span class = "text-info">强制停止</span><%
			  	}%>	
			<%
			}else if (serviceStatus=="21"){%>
				<%if(authTtStartFlag=="true"){
					%><a href = "start" class = "myhand">启动</a><%
				}else{
					%><span class = "text-info">启动</span><%
				}%>
			<%}else if (serviceStatus=="22"){
			  %>&nbsp;<%
			}else if (serviceStatus=="23"){
			  %>&nbsp;<%
			}else if (serviceStatus=="24"){
			  %>&nbsp;<%
			}else if (serviceStatus=="25"){
			  %>&nbsp;<%
			}else if (serviceStatus=="26"){
			  %>&nbsp;<%
			}else if (serviceStatus=="27"){
			  %>&nbsp;<%
			}else if (serviceStatus=="28"){
			  %>&nbsp;<%
			}
		%>
	</td>
	<td class = "serviceCfgTd" >
		<%if((serviceStatus=="1"||serviceStatus=="2"||serviceStatus=="9"||serviceStatus=="10")&&authTtCfgFlag=="true"){%>
			 <a  href = "#" class = "myhand">配置</a>
		<%}else{%>
			<span class = "text-info"> 配置</span>
		<%}%>
	</td>
	<td class = "serviceMonitorTd" >
		<%if((serviceStatus=="1"||serviceStatus=="10")&&authTtMoniFlag=="true"){%>
			  <a  href = "#" class = "myhand">查看</a><%
		}else{%>
			 <span class = "text-info"> 查看</span>
		<%}%>
	</td>
<%
}else if (serviceCategory=="utl"){
%>
	<td class = "serviceStatusOperTd">
		<%
			if(serviceStatus=="1"){%>
				<%if(authUtlStopFlag=="true"){
					%><a href = "stop" class = "myhand">停止</a><%
				}else{
					%><span class = "text-info">停止</span><%
				}%>
			  	<%if(authUtlForceStopFlag=="true"){
			  		%>|<a href = "forceStop" class = "myhand">强制停止</a><%
			  	}else{
			  		%><span class = "text-info">强制停止</span><%
			  	}%>	
			<%}else if (serviceStatus=="2"){%>
				<%if(authUtlStartFlag=="true"){
					%><a href = "start" class = "myhand">启动</a><%
				}else{
					%><span class = "text-info">启动</span><%
				}%>
			<%}else if (serviceStatus=="3"){
			  %>启动/停止<%
			}else if (serviceStatus=="4"){%>
				<%if(authUtlForceStopFlag=="true"){
			  		%><a href = "forceStop" class = "myhand">强制停止</a><%
			  	}else{
			  		%><span class = "text-info">强制停止</span><%
			  	}%>	
			<%}else if (serviceStatus=="5"){
			  %>未知<%
			}else if (serviceStatus=="6"){
			  %>未知<%
			}else if (serviceStatus=="7"){
			  %>&nbsp;<%
			}else if (serviceStatus=="8"){
			  %>无操作<%
			}else if (serviceStatus=="9"){
			%>
				<%if(authUtlStartFlag=="true"){
					%><a href = "start" class = "myhand">启动</a><%
				}else{
					%><span class = "text-info">启动</span><%
				}%>
				<%if(authUtlStopFlag=="true"){
					%><a href = "stop" class = "myhand">|停止</a><%
				}else{
					%><span class = "text-info">停止</span><%
				}%>
			  	<%if(authUtlForceStopFlag=="true"){
			  		%><a href = "forceStop" class = "myhand">|强制停止</a><%
			  	}else{
			  		%><span class = "text-info">强制停止</span><%
			  	}%>	
			<%
			}else if (serviceStatus=="10"){
			%>
				<%if(authUtlStopFlag=="true"){
					%><a href = "stop" class = "myhand">停止</a><%
				}else{
					%><span class = "text-info">停止</span><%
				}%>
			  	<%if(authUtlForceStopFlag=="true"){
			  		%>|<a href = "forceStop" class = "myhand">强制停止</a><%
			  	}else{
			  		%><span class = "text-info">强制停止</span><%
			  	}%>	
			<%
			}else if (serviceStatus=="21"){%>
				<%if(authUtlStartFlag=="true"){
					%><a href = "start" class = "myhand">启动</a><%
				}else{
					%><span class = "text-info">启动</span><%
				}%>
			<%}else if (serviceStatus=="22"){
			  %>&nbsp;<%
			}else if (serviceStatus=="23"){
			  %>&nbsp;<%
			}else if (serviceStatus=="24"){
			  %>&nbsp;<%
			}else if (serviceStatus=="25"){
			  %>&nbsp;<%
			}else if (serviceStatus=="26"){
			  %>&nbsp;<%
			}else if (serviceStatus=="27"){
			  %>&nbsp;<%
			}else if (serviceStatus=="28"){
			  %>&nbsp;<%
			}
		%>
	</td>
	<td class = "serviceCfgTd" >
		<%if((serviceStatus=="1"||serviceStatus=="2"||serviceStatus=="9"||serviceStatus=="10")&&authUtlCfgFlag=="true"){%>
			 <a  href = "#" class = "myhand">配置</a>
		<%}else{%>
			<span class = "text-info"> 配置</span>
		<%}%>
	</td>
	<td class = "serviceMonitorTd" >
		<%if((serviceStatus=="1"||serviceStatus=="10")&&authUtlMoniFlag=="true"){%>
			  <a  href = "#" class = "myhand">查看</a><%
		}else{%>
			 <span class = "text-info"> 查看</span>
		<%}%>
	</td>
<%
}%>