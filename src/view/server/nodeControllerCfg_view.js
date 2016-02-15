/**
 * Created with eclipse.
 * User: yichengjie
 * Date: 2014-12-23
 * Time: 下午02:52:56
 * To change this template use File | Settings | File Templates.
 */
define(function(require, exports, module) {

	var $ = jQuery = require('jquery');
	var Backbone = require('backbone');
	var _ = require('underscore');
	var Marionette = require("marionette");
	var util = require("../../util/CommonUtil") ;
	var InputUtil = require("../../util/SpecialPatternInputCheckUtil2") ;

	var viewTemplateStr = require('../../template/server/nodeControllerCfg.tpl');
	var NodeControllerCfgView = Marionette.ItemView.extend({
		  template: _.template(viewTemplateStr) ,
		  events:{
			"change #nodeControllerIp":"changeNodeControllerIp",
			"blur #queuecapacity" :"checkQueuecapacity",
			"blur #mqHostIp" :"checkMqHostIp",
			"blur #mqPort" : "checkMqPort",
			"blur #ccsid" :"checkCcsid",
			"blur #mqManager" :"checkMqManager",
			"blur #mqChannel" :"checkMqChannel",
			"blur #mqName" :"checkMqName",
			"click #cfgSubmit" : "setNodeConfig"
		  },
		  onShow:function(){
			  this.changeNodeControllerIp() ;
		  },
		  changeNodeControllerIp:function(){
			  var nodeControllerIp = $("#nodeControllerIp").val();
			  var serverURL = "/"+jcfManager.appName+"/server/getNodeConfig.action" ;
			  var simpleQData = {'nodeControllerIp':nodeControllerIp} ;
			  $.when(util.dealAjaxRequest4SimpleParam(serverURL,simpleQData))
			   .done(function(result){
				    $("#nodeLevel").val(result.loglevel);
					$("#queuecapacity").val(result.queuecapacity);
					$("#mqHostIp").val(result.mqHostIP);//
					$("#mqPort").val(result.mqPort);
					$("#ccsid").val(result.ccsid);
					$("#mqManager").val(result.mqManager);
					$("#mqChannel").val(result.mqChannel);
					$("#mqName").val(result.mqName);
			   }) ;
		  },
		  setNodeConfig:function(){//点击提交按钮，1.检查表单数据合法性,2.提交表单
			    //检查表单数据合法性
				var flag1 = this.checkQueuecapacity() ;
				var flag2 = this.checkMqName() ;
				var flag3 = this.checkMqChannel() ;
				var flag4 = this.checkMqManager() ;
				var flag5 = this.checkMqPort() ;
				var flag6 = this.checkCcsid() ;
				var flag7  = this.checkMqHostIp() ;//mqHostIp
				//提交表单
				if(flag1&&flag2&&flag3&&flag4&&flag5&&flag6&&flag7){
					this.submitMyNodecontrollerForm() ;
				}
		  },
		  submitMyNodecontrollerForm:function(){
			  var inputObj = this.getInputObj() ;
			  var serverURL = "/"+jcfManager.appName+"/server/setNodeConfig.action" ;
			  $.when(util.dealAjaxRequest4JSObj(serverURL,inputObj))
			   .done(function(data){
				   if(!data.flag){
					   alert("配置失败!") ;
				   }else{
					   alert("配置成功!") ;
				   }
			   }) ;
		  },
		  getInputObj:function(){
			  var formIds = ["nodeControllerIp","nodeLevel","queuecapacity","mqHostIp",
			                 "mqPort","ccsid","mqManager","mqChannel","mqName"] ;
			  var inputObj = util.getFormInputObj(formIds) ;
			  return inputObj ;
		  },
		  checkQueuecapacity:function(){
			  var id = "queuecapacity" ;
			  var maxLength = 10 ;
			  return InputUtil.checkInputMatchPositiveIntegerAndMaxLength(id,maxLength) ;
		  },
		  checkMqHostIp:function(){
			  var id = "mqHostIp" ;
			  return InputUtil.checkInputMatchIP(id) ;
		  },
		  checkMqPort:function(){
			  var id = "mqPort" ;
			  return InputUtil.checkInputMatchPort(id) ;
		  },
		  checkCcsid:function(){
			  var id = "ccsid" ;
			  var maxLength = 10 ;
			  return InputUtil.checkInputMatchPositiveIntegerAndMaxLength(id,maxLength) ;
		  },
		  checkMqManager:function(){
			  var id = "mqManager" ;
			  return InputUtil.checkNotNull(id) ;
		  },
		  checkMqChannel:function(){
			  var id = "mqChannel" ;
			  return InputUtil.checkNotNull(id) ;
		  },
		  checkMqName:function(){
			  var id = "mqName" ; 
			  return InputUtil.checkNotNull(id) ;
		  },
		  render: function(){
			this.$el.html(this.template(this.model.attributes));
		    return this;
		  }
	});
	
	return NodeControllerCfgView ;

});
