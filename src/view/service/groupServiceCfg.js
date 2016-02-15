/**
 * Created with eclipse. User: yichengjie Date: 2015-2-2 Time: 上午09:42:57 To
 * change this template use File | Settings | File Templates.
 */
define(function(require, exports, module) {
	var $ = jQuery = require('jquery');
	var Backbone = require('backbone');
	var _ = require('underscore');
	var Marionette = require("marionette");
	var viewTemplateStr = require('../../template/service/groupServiceCfg.tpl');
	var util = require("../../util/CommonUtil");
	var inputCheckUtil = require("../../util/SpecialPatternInputCheckUtil2");
	var QueryString = require('querystring');
	
	var ConfirmModel = require("../../model/confirm_model") ;
    var ConfirmView = require("../confirm_view") ;
 //   var StickyHeaderHelp=require("./stickyHeaderLayout");
	require("bs-modal")($) ;
    
	var groupServiceCfgView = Marionette.LayoutView.extend({
				template : _.template(viewTemplateStr),
				events : {
					"click #submitFormBtn" : "submitForm",
					"click #backBtn" : "toBackPage",
					"click #help" : "help",
					"blur #inputQueue" : "checkInputQueue",
					"blur #outputQueue" : "checkOutputQueue",
					"blur #inMpeNum" : "checkInMpeNum",
					"blur #outMpeNum" : "checkOutMpeNum",
					"blur #requestQueueSize" : "checkRequestQueueSize",
					"blur #invokeContextSize" : "checkInvokeContextSize",
					"blur #threadPoolSize" : "checkThreadPoolSize",
					"blur #upperLimit" : "checkUpperLimit",
					"blur #invokeTimeout" : "checkInvokeTimeout",
					"blur #stickyHeader" : "checkStickyHeader",
					"change #messageMode" :"changeMessageMode"
				},
				
				initialize : function(options) {
				//	alert("===="+options.aa);
				//	alert("===="+options.model);
					this.preModel=options.preModel;
					this.listenTo(this.model, 'change:messageMode', this.render);
				},
				
				toBackPage : function() {
				//window.history.back();
					this.remove();
				},

				help: function(){
					window.open("help.html#stickyHeaderTips");
				},
				
				submitForm : function() {// 提交表单
					$("#submitFormBtn").addClass("disabled");
					var hiddenPageFlag=$("#hiddenPageFlag").val();
					var serviceId=this.model.get("serviceId");
					var groupId=this.model.get("groupId");
					var appName = this.model.get("appName");
					var appVersion =this.model.get("appVersion");
					var groupName = this.model.get("groupName");
					
				//	alert("groupServiceCfg.js    "+groupName);
					var serviceName = this.model.get("serviceName");
					var serviceCategory = this.model.get("serviceCategory");
					var formObj = null;

					if ("page2" == hiddenPageFlag) {
						var flag = this.checkBusinessServiceForm();// 校验表单是否合法
						if (flag) {
							var formIds = [ "requestQueueSize",
									"invokeContextSize", "threadPoolSize",
									"messageMode", "upperLimit", "queueType",
									"stickyHeader" ,"sticky"];
							formObj = util.getFormInputObj(formIds);
							formObj.serviceId = serviceId;
							formObj.groupId = groupId;
							formObj.appName = appName;
							formObj.appVersion = appVersion;
							formObj.groupName = groupName;
							formObj.serviceName = serviceName;
							formObj.serviceCategory = serviceCategory;
							

							var serverURL = "/" + jcfManager.appName
									+ "/service/updateGroupServiceCfg.action";
							var ajaxing = util
									.dealAjaxRequest4JSObj(serverURL, formObj);
							var self = this;
							$.when(ajaxing).done(function(data) {
								self.dealReturnInfo(data,formObj.messageMode);
							});
						}
					} else if ("page1" == hiddenPageFlag) {
						var flag = this.checkAdapterServiceForm();
						if (flag) {
							var formIds = [ "inputQueue", "outputQueue",
									"inMpeNum", "outMpeNum", "mqServerInfo",
									"requestQueueSize","upperLimit", "invokeContextSize","threadPoolSize","messageMode"];
							formObj = util.getFormInputObj(formIds);
							formObj.serviceId = serviceId;
							formObj.groupId = groupId;
							formObj.appName = appName;
							formObj.appVersion = appVersion;
							formObj.groupName = groupName;
							formObj.serviceName = serviceName;
							formObj.serviceCategory = serviceCategory;
							

							var serverURL = "/" + jcfManager.appName
									+ "/service/updateGroupServiceCfg.action";
							var ajaxing = util
									.dealAjaxRequest4JSObj(serverURL, formObj);
							var self = this;
							$.when(ajaxing).done(function(data) {
								self.dealReturnInfo(data,formObj.messageMode);
							});
							
						}
					} else if ("page3" == hiddenPageFlag) {
						var flag = this.checkHttpServiceForm();
						if (flag) {
							var formIds = [ "invokeServiceName",
									"invokeTimeout" ];
							formObj = util.getFormInputObj(formIds);
							formObj.serviceId = serviceId;
							formObj.groupId = groupId;
							formObj.appName = appName;
							formObj.appVersion = appVersion;
							formObj.groupName = groupName;
							formObj.serviceName = serviceName;
							formObj.serviceCategory = serviceCategory;
							

							var serverURL = "/" + jcfManager.appName
									+ "/service/updateGroupServiceCfg.action";
							var ajaxing = util
									.dealAjaxRequest4JSObj(serverURL, formObj);
							var self = this;
							$.when(ajaxing).done(function(data) {
								self.dealReturnInfo(data,formObj.messageMode);
							});
						}
					}
					$("#submitFormBtn").removeClass("disabled");
				},
				dealReturnInfo : function(data,messageMode) {
					if (data.status == "1") {
						//alert("组配置成功");
						var confirmModel = new ConfirmModel() ;
						confirmModel.set({"btnok":"确定","btncl":"关闭"}) ;
						var confirmView = new ConfirmView({model:confirmModel}) ;
						confirmModel.set("msg","组配置成功!") ;
						jcfManager.dialogRegion.show(confirmView) ;
						confirmView.confirm() ;
						
                        this.preModel.set("messageMode",messageMode);
						
						$("#submitFormBtn").removeClass("disabled");
						this.remove();
					} else {
						$("#submitFormBtn").removeClass("disabled");
						var errorinfo = "";
						for ( var element in data.serviceUpdateConfigList) {
							if (data.serviceUpdateConfigList[element].serviceConfigUpdateStatus === 0) {
								if (data.serviceUpdateConfigList[element].JMXConnectError === 1) {
									errorinfo = errorinfo
											+ data.serviceUpdateConfigList[element].serverName
											+ " 配置时连接被拒绝!";
								}
								if (data.serviceUpdateConfigList[element].illegalArgument === 1) {
									errorinfo = errorinfo
											+ data.serviceUpdateConfigList[element].serverName
											+ " 配置时出现非法参数!";
								}
								if (data.serviceUpdateConfigList[element].malformedObjectName === 1) {
									errorinfo = errorinfo
											+ data.serviceUpdateConfigList[element].serverName
											+ " 配置时出现非法的对象名!";
								}
								if (data.serviceUpdateConfigList[element].nullPointer === 1) {
									errorinfo = errorinfo
											+ data.serviceUpdateConfigList[element].serverName
											+ " 配置时出现空指针!";
								}
								if (data.serviceUpdateConfigList[element].loginException === 1) {
									errorinfo = errorinfo
											+ data.serviceUpdateConfigList[element].serverName
											+ " 登录异常!";
								}
								if (data.serviceUpdateConfigList[element].errorServiceConfigException === 1) {
									errorinfo = errorinfo
											+ data.serviceUpdateConfigList[element].serverName
											+ " 找不到对应的配置文件!";
								}
								if (data.serviceUpdateConfigList[element].exception === 1) {
									errorinfo = errorinfo
											+ data.serviceUpdateConfigList[element].serverName
											+ " 配置时出现未知异常,建议查看karaf log!";
								}
							}
						}
						var confirmModel = new ConfirmModel() ;
						confirmModel.set({"btnok":"确定","btncl":"关闭"}) ;
						var confirmView = new ConfirmView({model:confirmModel}) ;
						confirmModel.set("msg",errorinfo) ;
						jcfManager.dialogRegion.show(confirmView) ;
						confirmView.confirm() ;
					}
				},
				changeMessageMode:function(){
					var val = $.trim($("#messageMode").val()) ;
					this.model.set("messageMode",val) ;
					$('#groupServiceConfigModal').modal('show');
				},
				checkRequestQueueSize : function() {
					var id = "requestQueueSize";
					var minNum = 1;
					var maxNum = 1000 * 10000;
					var flag = inputCheckUtil
							.checkInputMatchInt_MinNum__MaxNum(id, minNum,
									maxNum);
					return flag;
				},
				checkInvokeContextSize : function() {
					var id = "invokeContextSize";
					var minNum = 1;
					var maxNum = 1000 * 10000;
					var flag = inputCheckUtil
							.checkInputMatchInt_MinNum__MaxNum(id, minNum,
									maxNum);
					return flag;
				},
				checkThreadPoolSize : function() {
					var id = "threadPoolSize";
					var minNum = 1;
					var maxNum = 10000;
					var flag = inputCheckUtil
							.checkInputMatchInt_MinNum__MaxNum(id, minNum,
									maxNum);
					return flag;
				},
				checkUpperLimit : function() {
					var id = "upperLimit";
					var minNum = 1;
					var maxNum = 99;
					var flag = inputCheckUtil
							.checkInputMatchInt_MinNum__MaxNum(id, minNum,
									maxNum);
					return flag;
				},
				checkInputQueue : function() {
					var id = "inputQueue";
					var value = $.trim($("#" + id).val());
					if (value == "") {
						inputCheckUtil.clearInput(id);
					} else {
						inputCheckUtil.successInput(id);
					}
					return true;
				},
				checkOutputQueue : function() {
					var id = "outputQueue";
					var value = $.trim($("#" + id).val());
					if (value == "") {
						inputCheckUtil.clearInput(id);
					} else {
						inputCheckUtil.successInput(id);
					}
					return true;
				},
				checkInMpeNum : function() {
					var id = "inMpeNum";
					var value = $.trim($("#" + id).val());
					var flag = true;
					if (value.length > 0) {
						var minNum = 1;
						var maxNum = 10000;
						flag = inputCheckUtil
								.checkInputMatchInt_MinNum__MaxNum(id, minNum,
										maxNum);
					} else {
						inputCheckUtil.clearInput(id);
					}
					return flag;
				},
				checkOutMpeNum : function() {
					var id = "outMpeNum";
					var value = $.trim($("#" + id).val());
					var flag = true;
					if (value.length > 0) {
						var minNum = 1;
						var maxNum = 10000;
						flag = inputCheckUtil
								.checkInputMatchInt_MinNum__MaxNum(id, minNum,
										maxNum);
					} else {
						inputCheckUtil.clearInput(id);
					}
					return flag;
				},
				checkInvokeTimeout : function() {
					var id = "invokeTimeout";
					var minNum = 1;
					var maxNum = 1000;
					var flag = inputCheckUtil
							.checkInputMatchInt_MinNum__MaxNum(id, minNum,
									maxNum);
					return flag;
				},
				checkBusinessServiceForm : function() {
					if (this.checkRequestQueueSize()
							&& this.checkInvokeContextSize()
							&& this.checkThreadPoolSize()
							&& this.checkUpperLimit()
							&& this.checkStickyHeader()) {
						return true;
					}
					return false;
				},
				checkAdapterServiceForm : function() {
					if (this.checkValidateQueueNameAndNum()
							&& this.checkInputQueue()
							&& this.checkOutputQueue()
							&& this.checkThreadPoolSize()
							&& this.checkUpperLimit()) {
						return true;
					}
					return false;
				},
				
				checkStickyHeader: function(){
					var id="stickyHeader";
					var sticky=this.model.get("sticky");
					if(sticky== "true" || sticky =="TRUE"){
						return  inputCheckUtil.checkNotNull(id);
						
					}
					return true;
				},
				
				checkHttpServiceForm : function() {
					return this.checkInvokeTimeout();
				},
				checkWebServiceForm : function() {
					return this.checkInvokeTimeout();
				},
				checkValidateQueueNameAndNum : function() {//
					var flag = false;
					var id1 = "inputQueue";
					var id2 = "outputQueue";
					var flag1 = inputCheckUtil.checkNotNull(id1);
					var flag2 = inputCheckUtil.checkNotNull(id2);
					if (!flag1 && !flag2) {// 如果都为空,则提示至少一个不为空
						// $("#"+id1+"Tip").html("接入队列和接出队列至少需要配置一个") ;
						flag = inputCheckUtil
								.errInput(id1, "接入队列和接出队列至少需要配置一个");
					} else {// 有不为空的
						inputCheckUtil.successInput(id1);
						inputCheckUtil.successInput(id2);
						// 接入mq队列---接入mq个数//接出mq队列---接出mq个数
						var val1 = $.trim($("#" + id1).val());
						if (val1 == "") {// 接入mq为空//判断接入mq是否为空
							if ($.trim($("#inMpeNum").val()) == "") {
								flag = inputCheckUtil.successInput(id1);
							} else {//
								flag = inputCheckUtil.errInput(id1,
										"接入MQ队列名称不能为空");
							}
						} else {// 接入mq不为空
							if ($.trim($("#inMpeNum").val()) == "") {// 接入mq个数为空
								flag = inputCheckUtil.errInput("inMpeNum",
										"接入MQ连接数不能为空");
							} else {
								flag = inputCheckUtil.successInput("inMpeNum");
							}
						}
						// //////////////////////////////////////////////////////////
						if (flag) {
							var val2 = $.trim($("#" + id2).val());
							if (val2 == "") {// 接出mq为空//判断接出mq是否为空
								if ($.trim($("#outMpeNum").val()) == "") {
									flag = inputCheckUtil.successInput(id2);
								} else {//
									flag = inputCheckUtil.errInput(id2,
											"接出MQ队列名称不能为空");
								}
							} else {// 接入mq不为空
								if ($.trim($("#outMpeNum").val()) == "") {// 接入mq个数为空
									flag = inputCheckUtil.errInput("outMpeNum",
											"接出MQ连接数不能为空");
								} else {
									flag = inputCheckUtil
											.successInput("outMpeNum");
								}
							}
						}
					}
					return flag;
				}

			});

	return groupServiceCfgView;
});
