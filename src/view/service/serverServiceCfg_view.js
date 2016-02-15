/**
 * Created with eclipse.
 * User: yichengjie
 * Date: 2015-2-2
 * Time: 上午09:42:57
 * To change this template use File | Settings | File Templates.
 */
define(function(require, exports, module) {
	var $ = jQuery = require('jquery');
	var Backbone = require('backbone');
	var _ = require('underscore');
	var Marionette = require("marionette");
	var viewTemplateStr = require('../../template/service/serverServiceCfg.tpl');
	var util = require("../../util/CommonUtil") ;
	var inputCheckUtil = require("../../util/SpecialPatternInputCheckUtil2") ;
	
	var ServerServiceCfgView = Marionette.ItemView.extend({
	    template: _.template(viewTemplateStr),
		initialize:function(){
			 this.listenTo(this.model, "change:messageMode", this.render)
		},
	    events:{
		   "click #submitFormBtn" :"submitForm",
		   "click #backBtn" :"toBackPage",
		   "blur #inputQueue" : "checkInputQueue",
		   "blur #outputQueue" : "checkOutputQueue",
		   "blur #inMpeNum" : "checkInMpeNum",
		   "blur #outMpeNum" : "checkOutMpeNum",
		   "blur #requestQueueSize" : "checkRequestQueueSize",
		   "blur #invokeContextSize" : "checkInvokeContextSize",
		   "blur #threadPoolSize" : "checkThreadPoolSize",
		   "blur #upperLimit" : "checkUpperLimit",
		   "blur #invokeTimeout" : "checkInvokeTimeout",
		   "change #messageMode" : "changeMessageMode"
		},
		changeMessageMode:function(){
			var val = $.trim($("#messageMode").val()) ;
			this.model.set("messageMode",val) ;
		},
		toBackPage:function(){
			window.history.back() ;
		},
		checkInputQueue:function(){
			var id = "inputQueue" 
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
		checkInMpeNum:function(){
			var id = "inMpeNum" ;
			var value = $.trim($("#"+id).val()) ;
			var flag = true; 
			if(value==""){
				inputCheckUtil.clearInput(id) ;
			}else{
				var minNum = 1 ;
				var maxNum = 10000 ;
				flag = inputCheckUtil.checkInputMatchInt_MinNum__MaxNum(id,minNum,maxNum) ;
			}
			return flag; 
		},
		checkOutMpeNum:function(){
			var id = "outMpeNum" ;
			var value = $.trim($("#"+id).val()) ;
			var flag = true; 
			if(value==""){
				inputCheckUtil.clearInput(id) ;
			}else{
				var minNum = 1 ;
				var maxNum = 10000 ;
				flag = inputCheckUtil.checkInputMatchInt_MinNum__MaxNum(id,minNum,maxNum) ;
			}
			return flag; 
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
		checkInvokeTimeout:function(){
			var id = "invokeTimeout" ;
			var minNum = 1 ;
			var maxNum = 1000 ;
			var flag = inputCheckUtil.checkInputMatchInt_MinNum__MaxNum(id,minNum,maxNum) ;
			return flag; 
		},
		submitForm:function(){
			var pageFlag = $.trim($("#hiddenPageFlag").val()) ;
			var formObj = {} ;
			var flag = false;
			if("page1"==pageFlag){
				flag = this.checkForm1() ;
				if(flag){
					formObj = this.getFormObj1() ;
				}
			}else if ("page2"==pageFlag){
				flag = this.checkForm2() ;
				if(flag){
					formObj = this.getFormObj2() ;
				}
			}else if("page3"==pageFlag){
				flag = this.checkForm3() ;
				if(flag){
					formObj = this.getFormObj3() ;
				}
  		    }
			//如果表单验证合法这提交数据
			if(flag){
				var serverURL = "/"+jcfManager.appName+"/service/saveServiceConfig.action" ;
				var ajaxing = util.dealAjaxRequest4JSObj(serverURL,formObj) ;
				$.when(ajaxing)
				.done(function(data){
					if(data.flag=="true"){
						alert("成功!") ;
					}else{
						alert("失败!") ;
					}
				}) ;
			}
		},
		checkForm1:function(){
			if (this.checkValidateQueueNameAndNum()&&this.checkThreadPoolSize()&&this.checkUpperLimit()){
				return true;
			}
			return false;
		},
		checkForm2:function(){
			if (this.checkRequestQueueSize()&&this.checkInvokeContextSize()&&this.checkThreadPoolSize()&&this.checkUpperLimit()){
				return true;
			}
			return false;
		},
		checkForm3:function(){
			if(this.checkInvokeTimeout()&&this.checkThreadPoolSize()){
				return true ;
			}
			return true;
		},
		getFormObj1:function(){
			var formIds = ["serverId","serviceId","inputQueue","outputQueue",
			               "inMpeNum","outMpeNum","mqServerInfo","requestQueueSize",
			               "invokeContextSize","threadPoolSize","messageMode","upperLimit","queueType"] ;
			var formObj = util.getFormInputObj(formIds) ;
			return formObj ;
			
		},
		getFormObj2:function(){
			var formIds = ["serverId","serviceId","requestQueueSize","invokeContextSize",
			               "threadPoolSize","messageMode","upperLimit","queueType"] ;
			var formObj = util.getFormInputObj(formIds) ;
			return formObj ;
		},
		getFormObj3:function(){
			var formIds = ["serverId","serviceId","invokeServiceName","invokeTimeout","threadPoolSize"] ;
			var formObj = util.getFormInputObj(formIds) ;
			return formObj ;
		},
		checkValidateQueueNameAndNum:function(){//
		   var flag = false;
		   var id1 = "inputQueue" ;
		   var id2 = "outputQueue"  ;
		   var flag1 = inputCheckUtil.checkNotNull(id1) ;
		   var flag2 = inputCheckUtil.checkNotNull(id2) ;
		   if(!flag1&&!flag2){//如果都为空,则提示至少一个不为空
			   //$("#"+id1+"Tip").html("接入队列和接出队列至少需要配置一个") ;
			   inputCheckUtil.errInput(id1,"接入队列和接出队列至少需要配置一个") ;
			   flag = false;
		   }else{//有不为空的
			   inputCheckUtil.successInput(id1) ;
			   inputCheckUtil.successInput(id2) ;
			   //接入mq队列---接入mq个数//接出mq队列---接出mq个数
			   var val1 = $.trim($("#"+id1).val()) ;
			   if(val1==""){//接入mq为空//判断接入mq是否为空
				  if($.trim($("#inMpeNum").val())==""){
					  flag = inputCheckUtil.successInput(id1) ;
				  }else{//
					  flag = inputCheckUtil.errInput(id1,"接入MQ队列名称不能为空!") ;
				  }
			   }else{//接入mq不为空
				   if($.trim($("#inMpeNum").val())==""){//接入mq个数为空
					   flag = inputCheckUtil.errInput("inMpeNum","接入MQ连接数不能为空!") ;
				   }else{
					   flag = inputCheckUtil.successInput("inMpeNum") ;
				   }
			   }
			   ////////////////////////////////////////////////////////////
			   if(flag){
				   var val2 = $.trim($("#"+id2).val()) ;
				   if(val2==""){//接出mq为空//判断接出mq是否为空
					  if($("#outMpeNum").val()==""){
						  flag = inputCheckUtil.successInput(id2) ;
					  }else{//
						  flag = inputCheckUtil.errInput(id2,"接出MQ队列名称不能为空") ;
					  }
				   }else{//接入mq不为空
					   if($("#outMpeNum").val()==""){//接入mq个数为空
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
	
	return ServerServiceCfgView ;
});
