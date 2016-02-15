<%
   if(serverCategory==3){//上下文
%>
	 上下分服务器参数配置
<%
   }else if (serverCategory==4){//服务库
%>
	注册库服务器参数配置
<%   
   }else if(serverCategory==1||serverCategory==2){//jcf与adapter服务器
%>
	jcf与adapter服务器参数配置
<%   
   }
%>