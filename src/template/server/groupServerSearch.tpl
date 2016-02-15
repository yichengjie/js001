<br/>
<table width = "100%" id = "searchServerFrom">
      <tr>
 		<td width = "20%">
         	<button id = "batchStartBtn" class = "btn btn-success <%if(batchOperFlag!='true'){%>disabled<%}%>">启动</button>
			<button id = "batchStopBtn" class = "btn btn-warning <%if(batchOperFlag!='true'){%>disabled<%}%>">停止</button>
			<button id = "batchForceStopBtn" class = "btn btn-danger <%if(batchOperFlag!='true'){%>disabled<%}%>">强制停止</button>
        </td>
         <td width = "10%"></td>
         <td width = "10%" align = "right">运行状态&nbsp;:&nbsp;</td>
         <td width = "20%">
         	<select id = "processStatus"  class  = "form-control input-sm">
         		<option value="0" selected="selected">全部</option>
         		<option value="1">启动</option>
         		<option value="2">停止</option>
         	</select>
         </td>
         <td width = "10%" align = "right">
         	<button type="button" id = "searchGroupServer"  class="btn btn-primary <%if(queryOperFlag!='true'){%>disabled<%}%>">查询</button>
         </td>
         <td width = "10%" align = "right">
         	<button type="button" id = "deleteGroupBtn"  class="btn <%if(delOperFlag!='true'){%>disabled<%}%> ">删除分组</button>
         </td>
         <td width = "*%"></td>
      </tr>
</table>