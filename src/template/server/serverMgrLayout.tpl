<div>
	<ul class="nav nav-tabs" id = "serverMgrNav">    
		<li  <%if("serverListUI"==selectedPageUI){%>class = "active"<%}%> ><a href="serverListUI">服务器列表</a></li>
	    <%if(serverAddFlag=="true"){
			%><li  <%if("serverAddUI"==selectedPageUI){%>class = "active"<%}%> ><a  href="serverAddUI" >服务器添加</a></li><%    
  	    }%>
	    <%if(nodeControllerFlag=="true"){
			%><li  <%if("nodeControllerUI"==selectedPageUI){%>class = "active"<%}%> ><a  href="nodeControllerUI" >节点控制器配置</a></li><%
  	    }%>
  	    <%if(domainParamCfgAuthFlag=="true"){%>
	    	<li <%if('domainParamCfgUI'==selectedPageUI){%>class = "active"<%}%>   ><a  href="domainParamCfgUI" >域参数配置</a></li>
  	    <%}%>
	</ul>
</div>
<div  id = "listRegion"></div>
<div id = "pagebarRegion"></div>
<input id = "freshPage4IndexServerFlag" type = "hidden" />
<input id = "freshPage4IndexServerUrl" type = "hidden" />




