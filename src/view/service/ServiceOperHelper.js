/**
 * Created with eclipse.
 * User: yichengjie
 * Date: 2015-5-14
 * Time: 上午11:19:24
 * To change this template use File | Settings | File Templates.
 */
define(function(require, exports, module) {

	var util = require("../../util/CommonUtil") ;
	var ConfirmModel = require("../../model/confirm_model") ;
    var ConfirmView = require("../confirm_view") ;
	
	var ListTipModel = require("../../model/listTip_model") ;
	var ListTipView = require("../listTip_view") ;

	var ServerOperHelper = function(){
		
		this.getSgStr = function(serverOrGroup){
			var sgStr = "0" ;//单个服务器 为:2,group为:1
			if(serverOrGroup=="group"){
				sgStr = "1" ;
			}else if ("server"){
				sgStr = "2" ;
			}
			return sgStr ;
		}
		//--------------------但服务器操作开始-------------------------------------------//
		this.startService = function(viewModel,serverOrGroup){//启动服务
			 var sgStr = this.getSgStr(serverOrGroup);//表示单个服务器或则组服务器
			 var toStatus = "" ;//执行成功以后要显示的状态吗
			 var operationType = "0" ;//1:表示不操作补偿服务
			 var operStr = "" ;
			 var curServiceStatus = viewModel.get("serviceStatus") ;//当前服务状态
			 var hasCompensate = viewModel.get('hasCompensateService');
	  	 	 viewModel.set("serviceStatus","3") ;
			 operStr = "1_"+sgStr+"_";
			 toStatus = "1" ;
			 if (hasCompensate == "1"){//是否有补偿业务
				//存在补偿服务的话只有一种情况[服务已经停止，补偿服务仍在运行中]
				if(curServiceStatus=="9"){//表示启动服务但不启动补偿服务
					operStr +=  "1";
					operationType = "1" ;
				}else{//其他情况，连带补偿服务一起启动
					operStr +=  "2";
				}
	         }else{
			 	operStr += "1";
				operationType = "0" ;
			 }
			 this.serviceOperation(operStr,operationType ,toStatus ,curServiceStatus,viewModel ,serverOrGroup) ;
		}
		
		this.stopService = function(viewModel,serverOrGroup){
			var sgStr = this.getSgStr(serverOrGroup);//表示单个服务器或则组服务器
			var toStatus = "" ;//执行成功以后要显示的状态吗
			var operationType = "0" ;//1:表示不操作补偿服务
			var operStr = "" ;
			var curServiceStatus = viewModel.get("serviceStatus") ;//当前服务状态
			var hasCompensate = viewModel.get('hasCompensateService');
		    operStr = "2_"+sgStr+"_";
		    toStatus = "2" ;
		    var confirmModel = new ConfirmModel() ;
	        confirmModel.set({"title":"停止服务确认","msg":"是否停止补偿服务?","btnok":"停止","btncl":"不停止"}) ;
	        var confirmView = new ConfirmView({model:confirmModel}) ;
		    var self = this ;
		    if(hasCompensate == "1"){
			  jcfManager.dialogRegion.show(confirmView) ;
		      confirmView.confirm(function(myFlag){
			  	  viewModel.set("serviceStatus","4") ;
				  if(myFlag){
					operStr += "2";
				 	operationType = "0" ;
				  }else{
					toStatus = "9" ;//如果不停止补偿服务
				 	operStr += "1";
				 	operationType = "1" ;
				  }
				  self.serviceOperation(operStr,operationType ,toStatus ,curServiceStatus,viewModel ,serverOrGroup) ;
		       }) ;
		    }else{
			    viewModel.set("serviceStatus","4") ;
		 	    operStr += "1";
			    operationType = "0" ;
			    this.serviceOperation(operStr,operationType ,toStatus ,curServiceStatus,viewModel ,serverOrGroup) ;
		    }
		}
		
		this.forceStopService = function(viewModel,serverOrGroup){
			 var sgStr = this.getSgStr(serverOrGroup);//表示单个服务器或则组服务器
			 var toStatus = "" ;//执行成功以后要显示的状态吗
			 var operationType = "0" ;//1:表示不操作补偿服务
			 var operStr = "" ;
			 var curServiceStatus = viewModel.get("serviceStatus") ;//当前服务状态
			 var hasCompensate = viewModel.get('hasCompensateService');
			 operStr = "3_"+sgStr+"_";
			 toStatus = "2" ;
			 var confirmModel = new ConfirmModel() ;
		     confirmModel.set({"title":"停止服务确认","msg":"是否停止补偿服务?","btnok":"停止","btncl":"不停止"}) ;
		     var confirmView = new ConfirmView({model:confirmModel}) ;
			 var self = this ;
			 if(hasCompensate == "1"){
			 	 jcfManager.dialogRegion.show(confirmView) ;
			     confirmView.confirm(function(myFlag){
				 	viewModel.set("serviceStatus","4") ;
					if(myFlag){
						operStr += "2";
					 operationType = "0" ;
					}else{
						toStatus = "9" ;//如果不停止补偿服务
					 operStr += "1";
					 operationType = "1" ;
					}
					self.serviceOperation(operStr,operationType ,toStatus ,curServiceStatus,viewModel ,serverOrGroup) ;
			     }) ;
			 }else{
			 	 viewModel.set("serviceStatus","4") ;
			 	 operStr += "1";
				 operationType = "0" ;
				 this.serviceOperation(operStr,operationType ,toStatus ,curServiceStatus,viewModel ,serverOrGroup) ;
			 }
		}
		
		this.serviceOperation = function(operStr,operationType,toStatus,oldServiceStatus,viewModel ,serverOrGroup){
		     var url = "/"+jcfManager.appName+"/service/serviceOperation.action";
			 var serviceId = viewModel.get('serviceId');
		     var jsonObj = {"serviceId": serviceId,"operationType": operationType,"serviceOperation" : operStr};
			 if(serverOrGroup=="group"){
			 	 var groupId = viewModel.get('groupId');
				 jsonObj.groupId = groupId ;
			 }else if (serverOrGroup=="server"){
			 	 var serverId =  viewModel.get('serverId');	
				 jsonObj.serverId = serverId ;
			 }else{
			 	alert("无效操作，请检查!") ;
			 	return ;
			 }			
			 
		     $.when(util.dealAjaxRequest4SimpleParam(url, jsonObj))
			  .done(function(data){
			  	 if(data.flag=="true"){
				 	 if(data.status == 1){
						viewModel.set('serviceStatus',toStatus);
					 }else{
					 	
						var errList = data.errMsgList ;
						var lm = new ListTipModel() ;
						lm.set("errList",errList) ;
						var lv = new ListTipView({model:lm}) ;
						jcfManager.tipInfoRegion.show(lv) ;
						
					 	var confirmModel = new ConfirmModel() ;
					    confirmModel.set({"btnok":"确定","btncl":"关闭"}) ;
					    var confirmView = new ConfirmView({model:confirmModel}) ;
					 	confirmModel.set("msg","启停操作未成功!") ;
					 	jcfManager.dialogRegion.show(confirmView) ;
						confirmView.confirm() ;
						viewModel.set('serviceStatus',oldServiceStatus);
					 }
				 }else{
				 	var confirmModel = new ConfirmModel() ;
				    confirmModel.set({"btnok":"确定","btncl":"关闭"}) ;
				    var confirmView = new ConfirmView({model:confirmModel}) ;
			 		confirmModel.set("msg","操作出错!") ;
				 	jcfManager.dialogRegion.show(confirmView) ;
					confirmView.confirm() ;
				 	viewModel.set('serviceStatus',oldServiceStatus);
				 }
			 });
		}
		//--------------------但服务器操作结束-------------------------------------------//
		//--------------------组操作开始-------------------------------------------//
		
		//--------------------组操作结束-------------------------------------------//
		
	} ;
	
	return ServerOperHelper ;

});
