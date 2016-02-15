define(function(require, exports, module) {

	var $ = jQuery = require('jquery');
	var Backbone = require('backbone');
	var _ = require('underscore');
	var Marionette = require("marionette");
	var viewTemplateStr = require('../../template/service/serviceConfigView.tpl');
	var util = require("../../util/CommonUtil") ;
	var inputCheckUtil = require("../../util/SpecialPatternInputCheckUtil2") ;
	
	var ServiceConfigView = Marionette.ItemView.extend({
	   template: _.template(viewTemplateStr),
	   initialize:function(){
	   	   this.listenTo(this.model, "change:messageMode", this.render)
	   },
	   events:{
		 "click #submitFormBtn" : "submitForm",
		 "blur #requestQueueSize" : "checkRequestQueueSize",
		 "blur #invokeContextSize" : "checkInvokeContextSize",
		 "blur #threadPoolSize" : "checkThreadPoolSize",
		 "blur #upperLimit" : "checkUpperLimit",
		 "blur #inputQueue" : "checkInputQueue",
		 "blur #outputQueue": "checkOutputQueue",
		 "blur #inMpeNum" : "checkInMpeNum",
		 "blur #outMpeNum" : "checkOutMpeNum",
		 "blur #invokeTimeout" : "checkInvokeTimeout",
		 "change #messageMode" :"changeMessageMode"
	   },
	   changeMessageMode:function(){
	   		var  val = $.trim($("#messageMode").val()) ;
			this.model.set("messageMode",val) ;
	   },
	   submitBusiServiceForm:function(formObj){
		  var serverURL = "/"+jcfManager.appName+"/service/updateBusiServiceCfg.action" ;
		  var ajaxing = util.dealAjaxRequest4JSObj(serverURL,formObj) ;
		  var self = this ;
		  $.when(ajaxing).done(function(data){
			  self.dealReturnInfo(data) ;
		  }) ;
	   },
	   submitAdapterServiceForm:function(formObj){
		  var serverURL = "/"+jcfManager.appName+"/service/updateAdapterServiceCfg.action" ;
		  var ajaxing = util.dealAjaxRequest4JSObj(serverURL,formObj) ;
		  var self = this ;
		  $.when(ajaxing).done(function(data){
			  self.dealReturnInfo(data) ;
		  }) ;
	   },
	   submitHttpServiceForm:function(formObj){
		  var serverURL = "/"+jcfManager.appName+"/service/updateHttpServiceCfg.action" ;
		  var ajaxing = util.dealAjaxRequest4JSObj(serverURL,formObj) ;
		  var self = this; 
		  $.when(ajaxing).done(function(data){
			  self.dealReturnInfo(data) ;
		  }) ;
	   },
	   submitForm:function(){//提交表单
		  $("#submitFormBtn").addClass("disabled") ;
		  var href = $("#submitFormBtn").attr("name") ;
		  var serviceId = $("#serviceId").val() ;
		  var serverName = $("#serverName").val() ;
		  var groupId = $.trim($("#serviceGroupName").val()) ;
		  if("BusinessService"==href){
			  var flag = this.checkBusinessServiceForm() ;//校验表单是否合法
			  if(flag){
				  var formIds = ["requestQueueSize","invokeContextSize","threadPoolSize","messageMode",
				                 "upperLimit","queueType"] ;
				  var formObj = util.getFormInputObj(formIds) ;
				  formObj.serviceId = serviceId ;
				  formObj.groupId = groupId ;
				  //formObj.serverName = serverName ;
				  this.submitBusiServiceForm(formObj) ; 
			  }
		  }else if ("AdapterService"==href){
			  var flag = this.checkAdapterServiceForm() ;
			  if(flag){
				  var formIds = ["inputQueue","outputQueue","inMpeNum","outMpeNum",
				                 "threadPoolSize","mqServerInfo","requestQueueSize","invokeContextSize",
				                 "messageMode","upperLimit","queueType"] ;
				  var formObj = util.getFormInputObj(formIds) ;
				  formObj.serviceId = serviceId ;
				  formObj.groupId = groupId ;
				  //formObj.serverName = serverName ;
				  this.submitAdapterServiceForm(formObj) ;
			  }
			  
		  }else if ("http"==href){
			  var flag = this.checkHttpServiceForm() ;
			  if(flag){
				  var formIds = ["invokeServiceName","invokeTimeout","threadPoolSize"] ;
				  var formObj = util.getFormInputObj(formIds) ;
				  formObj.serviceId = serviceId ;
				  formObj.groupId = groupId ;
				  //formObj.serverName = serverName ;
				  this.submitHttpServiceForm(formObj) ;
			  }
		  }else if ("webservice"==href){
			  var flag = this.checkWebServiceForm() ;
			  if(flag){
				  var formIds = ["invokeServiceName","invokeTimeout","threadPoolSize"] ;
				  var formObj = util.getFormInputObj(formIds) ;
				  formObj.serviceId = serviceId ;
				  formObj.groupId = groupId ;
				  //formObj.serverName = serverName ;
				  this.submitWebServiceForm(formObj) ; 
			  }
		  }
	   },
	   submitWebServiceForm:function(formObj){
		  var serverURL = "/"+jcfManager.appName+"/service/updateWebServiceCfg.action" ;
		  var ajaxing = util.dealAjaxRequest4JSObj(serverURL,formObj) ;
		  var self = this; 
		  $.when(ajaxing).done(function(data){
			  self.dealReturnInfo(data) ;
		  }) ;
	   },
	   dealReturnInfo:function(data){
		   if(data.status == "1"){
			  alert("组配置成功") ;
			  $("#submitFormBtn").removeClass("disabled") ;
		   }else{
			   $("#submitFormBtn").removeClass("disabled") ;
			   var errorinfo = "";
			   for ( var element in data.serviceUpdateConfigList) {
				  if (data.serviceUpdateConfigList[element].serviceConfigUpdateStatus === 0) {
					 if (data.serviceUpdateConfigList[element].JMXConnectError === 1) {
						errorinfo = errorinfo+ data.serviceUpdateConfigList[element].serverName+ " 配置时连接被拒绝";
					 }
					 if (data.serviceUpdateConfigList[element].illegalArgument === 1) {
						errorinfo = errorinfo+ data.serviceUpdateConfigList[element].serverName+ " 配置时出现非法参数";
					 }
					 if (data.serviceUpdateConfigList[element].malformedObjectName === 1) {
						errorinfo = errorinfo+ data.serviceUpdateConfigList[element].serverName+ " 配置时出现非法的对象名";
					 }
					 if (data.serviceUpdateConfigList[element].nullPointer === 1) {
						errorinfo = errorinfo+ data.serviceUpdateConfigList[element].serverName+ " 配置时出现空指针";
					 }
					 if (data.serviceUpdateConfigList[element].loginException === 1) {
						errorinfo = errorinfo+ data.serviceUpdateConfigList[element].serverName+ " 登录异常";
					 }
					 if (data.serviceUpdateConfigList[element].errorServiceConfigException === 1) {
						errorinfo = errorinfo+ data.serviceUpdateConfigList[element].serverName+ " 找不到对应的配置文件";
					 }
					 if (data.serviceUpdateConfigList[element].exception === 1) {
						errorinfo = errorinfo+ data.serviceUpdateConfigList[element].serverName+ " 配置时出现未知异常,建议查看karaf log";
					 }
				  }
			  }
			  alert(errorinfo) ;
		    }
	   },
	   checkRequestQueueSize:function(){
		   var id = "requestQueueSize" ;
		   var minNum = 1 ;
		   var maxNum = 1000*10000 ;
		   var flag = inputCheckUtil.checkInputMatchInt_MinNum__MaxNum(id,minNum,maxNum) ;
		   return flag; 
	   },
	   checkInvokeContextSize:function(){
		   var id = "invokeContextSize" ;
		   var minNum = 1 ;
		   var maxNum = 1000*10000 ;
		   var flag = inputCheckUtil.checkInputMatchInt_MinNum__MaxNum(id,minNum,maxNum) ;
		   return flag; 
	   },
	   checkThreadPoolSize:function(){
		   var id = "threadPoolSize" ;
		   var minNum = 1 ;
		   var maxNum = 10000 ;
		   var flag = inputCheckUtil.checkInputMatchInt_MinNum__MaxNum(id,minNum,maxNum) ;
		   return flag; 
	   },
	   checkUpperLimit:function(){
		   var id = "upperLimit" ;
		   var minNum = 1 ;
			var maxNum = 99 ;
			var flag = inputCheckUtil.checkInputMatchInt_MinNum__MaxNum(id,minNum,maxNum) ;
			return flag; 
	   },
	   checkInputQueue:function(){
		  var id = "inputQueue" ;
		  var value = $.trim($("#"+id).val());
		  if (value == "") {
			  inputCheckUtil.clearInput(id) ;
		  }else{
			  inputCheckUtil.successInput(id) ;
		  }
		  return true;
	   },
	   checkOutputQueue:function(){
		  var id = "outputQueue" ;
		  var value = $.trim($("#"+id).val());
		  if (value == "") {
			  inputCheckUtil.clearInput(id) ;
		  }else{
			  inputCheckUtil.successInput(id) ;
		  }
		  return true;
	   },
	   checkInMpeNum :function(){
		   var id = "inMpeNum" ;
		   var value = $.trim($("#"+id).val());
		   var flag = true ;
		   if(value.length>0){
			   var minNum = 1 ;
			   var maxNum = 10000 ;
			   flag = inputCheckUtil.checkInputMatchInt_MinNum__MaxNum(id,minNum,maxNum) ;
		   }else{
			   inputCheckUtil.clearInput(id) ;
		   }
		   return flag; 
	   },
	   checkOutMpeNum:function(){
		   var id = "outMpeNum" ;
		   var value = $.trim($("#"+id).val());
		   var flag = true ;
		   if(value.length>0){
			   var minNum = 1 ;
			   var maxNum = 10000 ;
			   flag = inputCheckUtil.checkInputMatchInt_MinNum__MaxNum(id,minNum,maxNum) ;  
		   }else{
			   inputCheckUtil.clearInput(id) ;
		   }
		   return flag; 
	   },
	   checkInvokeTimeout:function(){
		   var id = "invokeTimeout" ;
		   var minNum = 1 ;
		   var maxNum = 1000 ;
		   var flag = inputCheckUtil.checkInputMatchInt_MinNum__MaxNum(id,minNum,maxNum) ;
		   return flag; 
	   },
	   checkBusinessServiceForm:function(){
		   if (this.checkRequestQueueSize()&&this.checkInvokeContextSize()&&this.checkThreadPoolSize()&&this.checkUpperLimit()){
				return true;
		   }
		   return false;
	   },
	   checkAdapterServiceForm:function(){
		   if (this.checkValidateQueueNameAndNum()&&this.checkInputQueue()&&this.checkOutputQueue()
			  &&this.checkThreadPoolSize()&&this.checkUpperLimit()){
				return true;
		   }
		   return false;
	   },
	   checkHttpServiceForm:function(){
	   	   var flag = false ;
		   if(this.checkInvokeTimeout()&&this.checkThreadPoolSize()){
		   	 flag = true;
		   }
		   return flag ;
	   },
	   checkWebServiceForm:function(){
	   	   var flag = false ;
		   if(this.checkInvokeTimeout()&&this.checkThreadPoolSize()){
		   	 flag = true;
		   }
		   return flag ;
	   },
	   checkValidateQueueNameAndNum:function(){//
		   var flag = false;
		   var id1 = "inputQueue" ;
		   var id2 = "outputQueue"  ;
		   var flag1 = inputCheckUtil.checkNotNull(id1) ;
		   var flag2 = inputCheckUtil.checkNotNull(id2) ;
		   if(!flag1&&!flag2){//如果都为空,则提示至少一个不为空
			   //$("#"+id1+"Tip").html("接入队列和接出队列至少需要配置一个") ;
			   flag = inputCheckUtil.errInput(id1,"接入队列和接出队列至少需要配置一个") ;
		   }else{//有不为空的
			   inputCheckUtil.successInput(id1) ;
			   inputCheckUtil.successInput(id2) ;
			   //接入mq队列---接入mq个数//接出mq队列---接出mq个数
			   var val1 = $.trim($("#"+id1).val()) ;
			   if(val1==""){//接入mq为空//判断接入mq是否为空
				  if($.trim($("#inMpeNum").val())==""){
					  flag = inputCheckUtil.successInput(id1) ;
				  }else{//
					  flag = inputCheckUtil.errInput(id1,"接入MQ队列名称不能为空") ;
				  }
			   }else{//接入mq不为空
				   if($.trim($("#inMpeNum").val())==""){//接入mq个数为空
					   flag = inputCheckUtil.errInput("inMpeNum","接入MQ连接数不能为空") ;
				   }else{
					   flag = inputCheckUtil.successInput("inMpeNum") ;
				   }
			   }
			   ////////////////////////////////////////////////////////////
			   if(flag){
				   var val2 = $.trim($("#"+id2).val()) ;
				   if(val2==""){//接出mq为空//判断接出mq是否为空
					  if($.trim($("#outMpeNum").val())==""){
						  flag = inputCheckUtil.successInput(id2) ;
					  }else{//
						  flag = inputCheckUtil.errInput(id2,"接出MQ队列名称不能为空") ;
					  }
				   }else{//接入mq不为空
					   if($.trim($("#outMpeNum").val())==""){//接入mq个数为空
						   flag = inputCheckUtil.errInput("outMpeNum","接出MQ连接数不能为空") ;
					   }else{
						   flag = inputCheckUtil.successInput("outMpeNum") ;
					   }
				   }  
			   }
		   }
		   return flag ;
	   }
	   
	});
	
	return ServiceConfigView;

});
