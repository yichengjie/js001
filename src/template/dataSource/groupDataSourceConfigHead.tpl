<div class="dataSourceConfig">
	<div class="line">
		<div class="content">
			<label>组数据源名称</label>
		</div>
		<div class="value">
			<select id="groupDataSourceName" name="groupDataSourceName" class="length" autocomplete="off">
				<option></option>
				<%for (var i = 0; i < dataSourceNameList.length; i++){%>
					<option><%=dataSourceNameList[i].dataSourceName%></option>
				<%}%> 
			</select>
		</div>
	</div>
</div>