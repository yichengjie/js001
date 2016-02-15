<div class="container-fluid">
	<div class="navbar-header">
		<a class="navbar-brand" id = "indexLogoImg"  href="#">
    		<span class="brand" href="javascript:void(0)">
    			<img src="./static/imgs/logo.png" width="111" height="30" alt="w3cschool logo"/>
    		</span>
    		<%
    		if(loginInfo.jcfmanageType == 'error' || loginInfo.flag == "false"){
    			%>&nbsp;<span class="brand" id = "error_Type" style="color:red;font-size:12px">主备配置文件出现异常，请及时修改</span><%
    		}else{
    			if(loginInfo.jcfmanageType == 'master'){%>    		
    			&nbsp;<span class="brand" id = "jcfmanage_Type" >主管理中心</span><%
    			}else if(loginInfo.jcfmanageType == 'backup'){%>
    				&nbsp;<span class="brand" id = "jcfmanage_Type" >备份管理中心</span><%
    			}
    		}%>
    	</a>
	</div>
	<div id="navbar" class="navbar-collapse collapse">
		<p class="navbar-text pull-right">
			<%			
			if(loginInfo.jcfmanageType == 'master'){
			  %><a class = "myhand" id = "backup">备份</a>&nbsp;&nbsp;<%
			}
			%> 			
    		<a class = "myhand" id = "mylogout">退出</a>&nbsp;&nbsp;&nbsp;&nbsp;用户:<%=loginInfo.loginUserName%> 
    		>>&nbsp;<%=loginInfo.loginUserRole%>
    	</p>
    	<input type = "hidden" id = "indexHiddenLoginId" value = "<%=loginInfo.loginID%>"/>
    	<input type = "hidden" id = "indexHiddenLoginUserRole" value = "<%=loginInfo.loginUserRole%>"/>
    </div>
</div>