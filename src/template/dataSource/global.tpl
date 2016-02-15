<div id="<%if (flag == true){%>success<%}else{%>failure<%}%>">
	<div style="display:inline-block">
		<%for (var i = 0; i < messageList.length; i++){%>
			<%=messageList[i]%>
		<%}%>
	</div>
	<a class="close-btn"></a>
</div>