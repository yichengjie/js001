<div>
	<ul class="nav nav-tabs" id = "serverMgrNav">    
		<li  <%if("detailInfo"==selectNavItem){%>class = "active"<%}%>  ><a href = "detailInfo" >详细信息</a></li> 
		
		<%
			if(serverCategory=="1"||serverCategory=="7"){//jcf和适配服务器
				if(jcfCfgFlag=="true"){
				  %><li <%if("paramCfg"==selectNavItem){%>class = "active"<%}%> ><a href = "paramCfg" >参数配置</a></li><%
				}
				if(jcfUpdateFlag=="true"){
				  %><li <%if("serverUpdate"==selectNavItem){%>class = "active"<%}%> ><a href = "serverUpdate" >服务器更新</a></li><%
				}
			}else if (serverCategory=="3"){//上下文服务器
				if(contextUpdateFlag=="true"){
				  %><li <%if("serverUpdate"==selectNavItem){%>class = "active"<%}%> ><a href = "serverUpdate" >服务器更新</a></li><%
				}
			}else if (serverCategory=="4"){//注册库服务器
				if(registryCfgFlag=="true"){
				   %><li <%if("paramCfg"==selectNavItem){%>class = "active"<%}%> ><a href = "paramCfg" >参数配置</a></li><%
				}
				if(registryUpdateFlag=="true"){
				   %><li <%if("serverUpdate"==selectNavItem){%>class = "active"<%}%> ><a href = "serverUpdate" >服务器更新</a></li><%
				}
			}
		%>
	</ul>
	<input type = "hidden" id = "hiddenServerId" value = "<%=serverId%>">
</div>
<div id = "downContentRegion"></div>

