<table class="table">
   <tbody>
      <tr>
         <td width = "12%" class = "text-right">回滚到版本：</td>
         <td width = "20%"><input type="text" id="rollback2Version"  readonly = "readonly"
         	  	<%for(var i = 0 ; i < appVersionList.length ; i ++){
         	  		if(appVersionList[i]==prevVersion){//如果和之前版本相同，则显示
         	  			%> value = "<%=prevVersion%>"  <%
         	  		}
         	  	}%>
            class="form-control input-sm"  /></td>
         <td width = "10%"><button class = "btn primary" id = "rollbackSubmitBtn">回滚</button></td>
         <td width = "15%">当前版本  :&nbsp;<%=appVersion%></td>
         <td width = "30%">应用名称  :&nbsp;<%=appName%></td>
         <td width = "*%"><input  type = "hidden" id = "hiddenAppVersion" value = "<%=appVersion%>"/></td>
      </tr>
      <tr>
         <td class = "text-right">回滚版本：</td>
         <td class = "selectVersionTd" colspan = "3">
         	 <%
         	 	for(var i = 0 ; i < appVersionList.length ; i ++){
         	 	    if(appVersionList[i]!=appVersion){
	         	 	    if(prevVersion==appVersionList[i]){
	         	 			%>
	         	 			<input type = "radio" name = "ccc"  checked = "checked" value = "<%=appVersionList[i]%>"/><%=appVersionList[i]%>
	         	 			<%
	         	 		}else{
	         	 			%>
	         	 			<input type = "radio" name = "ccc" value = "<%=appVersionList[i]%>"/><%=appVersionList[i]%>
	         	 			<%
	         	 		}
         	 	    }
         	 	}
         	 %>
		 </td>
      </tr>
   </tbody>
</table>