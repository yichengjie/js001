<div id = "tipInfoRegion"></div>
<div id = "baseInfoRegion"></div>
<div  id = "listRegion"></div>
<div>
	<button id = "batchReDeployBtn" class = "btn btn-sm btn-primary <%if(deployAuthFlag!='true'){%>disabled<%}%>">重新部署</button>
	&nbsp;&nbsp;
	<button id = "batchReundeployBtn" class = "btn btn-sm btn-primary <%if(undeployAuthFlag!='true'){%>disabled<%}%>">重新反部署</button>
</div>
<div id = "pagebarRegion"></div>
<input type = "hidden" id = "groupIdHiddenOnPage" value = "<%=groupId%>" />
<input type = "hidden" id = "appIdHiddenOnPage" value = "<%=appId%>" />
<input id = "freshPage4GroupAppUrl" type = "hidden" />
<input id = "freshPage4GroupAppFlag" type = "hidden" />
<input id = "serverId4deployApp" type = "hidden" />
<input id = "appId4deployApp" type = "hidden" />
