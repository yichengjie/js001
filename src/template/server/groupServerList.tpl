<table class="table table-bordered">
	<thead>
		<tr>
	      	<th>
	      		<input type="checkbox" id="groupCheckAll"/>
	      	</th>
	        <th>所属分组</th>
	        <th>服务器名称</th>
	        <th>服务器IP</th>
	        <th>服务器类型</th>
	        <th>当前状态</th>
	        <th>操作</th>
	        <%if(groupCategory!=3&&groupCategory!=7){%>
	        	<th>配置</th>
	        <%}%>
	        <th>删除</th>
	        <%if(groupCategory==1||groupCategory==6){%>
	        	<th>内存查看</th>
	        	<th>节点控制器Port</th>
	        <%}%>
	        <%if(groupCategory==4){%>
	        	<th>切换</th>
	        <%}%>
		</tr>
	</thead>
	<tbody></tbody>
</table>