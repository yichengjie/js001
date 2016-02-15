define(function(require, exports, module) {
	var $ = jQuery = require('jquery');
	var Backbone = require('backbone');
	var _ = require('underscore');
	var Marionette = require("marionette");
	var ServiceGrayConfigTemplate = require("../../template/service/serviceGrayConfig.tpl");
	var CheckUtil = require("../../util/SpecialPatternInputCheckUtil2");
	var util = require("../../util/CommonUtil");

	var ConfirmModel = require("../../model/confirm_model");
	var ConfirmView = require("../confirm_view");

	require("bs-modal")($) ;
	
	var ServiceGrayConfigView = Marionette.LayoutView.extend({

		template : _.template(ServiceGrayConfigTemplate),
		events : {
			"click .config" : "configGray",
			"click  .cancel" : "cancel",
			"click .helpClass" : "grayHelp",
			"click .grayConfig" :"toggleSelect",
			"blur #serviceTraffic" : "checkServiceTraffic"
		},

		grayHelp : function() {
			window.open("help.html#grayHelpTips");
		},

		toggleSelect:function(){
			var serviceTrafficSelected=$("#serviceTrafficSelected").is(":checked");
			if(serviceTrafficSelected){
				$("#serviceTraffic").removeAttr("readonly");
				$("#serviceHeader").attr("readonly","readonly");
			}else{
				$("#serviceHeader").removeAttr("readonly");
				$("#serviceTraffic").attr("readonly","readonly");
			}
		},
		configGray : function() {
			if (this.checkForm()) {
			$("#submitFormBtn").addClass("disabled");
			var appVersion = this.model.get("appVersion");
			var grayEnable = this.model.get("grayEnable");
			var serviceId = this.model.get("serviceId");
			var serviceName = this.model.get("serviceName");

			var url = "/" + jcfManager.appName
					+ "/service/setServiceGrayConfig.action";

			var jsonParam = {
				"serviceId" : serviceId,
				"serviceName" : serviceName,
				"appVersion" : appVersion,
				"grayEnable" : grayEnable
			};

			var self = this;
			var serviceTrafficSelected=$("#serviceTrafficSelected").is(":checked");
			var serviceHeaderSelected=$("#serviceHeaderSelected").is(":checked");
			jsonParam.serviceTrafficSelected = serviceTrafficSelected;
			jsonParam.serviceHeaderSelected = serviceHeaderSelected;
			
			if(serviceTrafficSelected){
				var serviceTraffic = $("#serviceTraffic").val();
				jsonParam.serviceTraffic = serviceTraffic;
			}else{
				var serviceHeader = $("#serviceHeader").val().replace(/\"/gm,
				'\'');
				jsonParam.serviceHeader = serviceHeader;
			}
			
			var ajaxing = util.dealAjaxRequest4SimpleParam(url, jsonParam);

			$.when(ajaxing).done(function(data) {
				var errorMsg = data.errorMsg;
				var msg = "";
				if (errorMsg == "") {
					msg = "配置成功";
					var confirmModel = new ConfirmModel();
					confirmModel.set({
						"btnok" : "确定",
						"btncl" : "关闭"
					});
					var confirmView = new ConfirmView({
						model : confirmModel
					});
					confirmModel.set("msg", msg);
					jcfManager.dialogRegion.show(confirmView);
					confirmView.confirm();
					$("#submitFormBtn").removeClass("disabled");
				} else {
					msg = "配置失败";
					var confirmModel = new ConfirmModel();
					confirmModel.set({
						"btnok" : "确定",
						"btncl" : "关闭"
					});
					var confirmView = new ConfirmView({
						model : confirmModel
					});
					confirmModel.set("msg", msg);
					jcfManager.dialogRegion.show(confirmView);
					confirmView.confirm();
				}
			});
		}
		},

		cancel : function() {
			this.remove();
		},

		checkServiceTraffic : function() {
			var id = "serviceTraffic";
			return CheckUtil.checkInputMatchInt_MinNum__MaxNum(id, 1, 99);
		},
		
		checkServiceHeader: function(){
			var id="serviceHeader";
			return CheckUtil.checkNotNull(id);
		},
		 render:function(){
			  this.$el.html(this.template(this.model.attributes));
			  return this;
		 },
		
        checkForm: function(){
        	var serviceTrafficSelected=$("#serviceTrafficSelected").is(":checked");
			var serviceHeaderSelected=$("#serviceHeaderSelected").is(":checked");
			
			if(serviceTrafficSelected){
				return this.checkServiceTraffic();
			}	
			else if(serviceHeaderSelected){
				return this.checkServiceHeader();
			}
			return false;
        },
	});
	return ServiceGrayConfigView;
});