<td class = "fileNameTd">
<%if("文件夹"==category){
		%>
			<span class = "file_dir_icon myhand" ><%=name%><span>
		<%
	 }else if ("文件"==category){
	 	%>
			<span class = "file_file_icon"><%=name%><span>
		<%
}%>
</td>
<td><%=category%></td>
<td class = "downloadAppCfgTd" >
<%if("文件夹"==category||downloadCfgAuthFlag!="true"){
   %>下载<%
}else if ("文件"==category){
   %><a href = "<%=name%>" >下载</a><%
}%>
</td>