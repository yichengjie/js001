<td><%=appName%></td>
<td><%=appVersion%></td>
<td>
	<%if(status=="1"){
		%><span class = "text-success">已部署</span><%
	}else if (status=="2"){
	    %><span class = "text-danger">部署失败</span><%
	}else if (status=="3"){
	    %><span class = "text-success">已反部署</span><%
	}else if (status=="4"){
	    %><span class = "text-danger">反部署失败</span><%
	}else if (status=="5"){
	    %><span class = "text-success">已回滚</span><%
	}else if (status=="6"){
	    %><span class = "text-danger">回滚失败</span><%
	}else if(status=="7"){
	    %>正在部署..<%
	}else if (status=="8"){
	    %>正在反部署..<%
	}else if(status=="9"){
	    %>正在回滚..<%
	}else if(status=="0"){
	    %><span class = "text-danger">状态不一致</span><%
	}else{
	    %><%=status%><%
	}%>
</td>
<td><%=updateDate%></td>
<td class = "groupAppDetailTd">
	<a href = "<%=appId%>" >查看详情</a>
</td>
<td>
	<%
	   if(isDefaultVersion=="TRUE"){
		   %><span class = "text-success">默认版</span><%
	   }else if(isDefaultVersion=="FALSE"){
		   %><span class = "text-warning">非默认版</span><%
	   }else{
		  %><span class = "text-danger">状态不一致</span><%
	   }
	%>
</td>
<td>
	<%
		if(status==1){//已部署
		  if(containSihService=="true"){
		  	%><span class = "text-info">不支持切换</span><%
		  }else{
		  	%>
		  	<div class="btn-group" data-toggle="buttons">
			    <button type="button"  class="btn btn-success btn-xs change2Default  <%if(authChageVersionFlag!='true'){%>disabled<%}%>"  name = "toTRUE" >默认</button>
				<button type="button" class="btn btn-warning btn-xs change2NoDefault <%if(authChageVersionFlag!='true'){%>disabled<%}%>"   name = "toFALSE">非默认</button>
			</div>
		  	<%
		  }
		}else{//处于未部署状态
		  %><span class = "text-info">不可切换</span><%
		}
	%>
</td>
<td class = "undeployAppTd">
	<%
		if((status=="1"||status=="4")&&authUndeployFlag=="true"){
			%><a href = "#" appId = "<%=appId%>" appName = "<%=appName%>" >反部署</a><%
		}else{
			%>反部署<%
		}
	%>
</td>

<td class = "rollbackVersionTd" >
	<%if(rollbackLinkShow=="1"&&isDefaultVersion=="TRUE"&&authRollbackFlag=="true"&&containSihService!="true"){
		%><a href = "" class = "myhand">回滚</a><%
	}else{
		%>回滚<%
	}%>	
</td>

<td class = "showGroupCfgInfoTd">
	<%
	if(status==1||status==4||status==6){//已部署
		%><a href = "" class = "myhand">查看</a><%
	}else{
		%>查看<%
	}%>
</td>