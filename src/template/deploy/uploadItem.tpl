<td>
	<%
	 if("文件"==category){
	%>
		<input type="radio" name = "selectedAppName" title = "<%=name%>"  value = "<%=path%>" >
	<%
	 }
	%>
</td>
<td><%if("文件夹"==category){
		%>
			<span class = "file_dir_icon myhand" pathCode = "<%=pathCode%>"><%=name%><span>
		<%
	 }else if ("文件"==category){
	 	%>
			<span class = "file_file_icon"><%=name%><span>
		<%
	 }%>
</td>
<td><%=category%></td>