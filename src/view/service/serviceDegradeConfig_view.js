define(function(require, exports, module){
    var $ = jQuery = require('jquery');
    var Backbone = require('backbone');
    var _ = require('underscore');
	var Marionette = require("marionette");
    var CheckUtil = require("../../util/SpecialPatternInputCheckUtil2");
    var ServiceDegradeConfigTemplate = require("../../template/service/serviceDegradeConfig.tpl");
    var util = require("../../util/CommonUtil") ;
	var ConfirmModel = require("../../model/confirm_model");
	var ConfirmView = require("../confirm_view");
	var QueryString = require('querystring');
    require("bs-modal")($) ;
    
    var ServiceDegradeConfigView = Marionette.LayoutView.extend({
        
        template: _.template(ServiceDegradeConfigTemplate),
        events: {
            "click .select": "toggleSelect",
            "click .config": "configDegrade",
            "blur #degradeTPU": "checkTPU",
            "blur #degradeTimeUnit": "checkTimeUnit",
            "blur #degradePercent": "checkPercent"
        },
        toggleSelect: function(e){
            var tpsSelected = $("#tpsSelected").is(":checked");
            var queueSelected = $("#queueSelected").is(":checked");
			
            if(tpsSelected){
            	$("#degradeTPU").removeAttr("readonly");
            	$("#degradeTimeUnit").removeAttr("readonly");
            }else{
            	$("#degradeTPU").attr("readonly","readonly");
            	$("#degradeTimeUnit").attr("readonly","readonly");
            }
            
            if(queueSelected){
            	$("#degradePercent").removeAttr("readonly");
            }else{
            	$("#degradePercent").attr("readonly","readonly");
            }
        },
        configDegrade: function(){
            if (this.checkForm()) {
            	var tpsSelected= $("#tpsSelected").is(":checked");
            	var queueSelected=$("#queueSelected").is(":checked");
                var degradeServiceName = $('#degradeServiceName').val();
                var degradeTPU = $('#degradeTPU').val();
                var degradeTimeUnit = $('#degradeTimeUnit').val();
                var degradePercent = this.$el.find("#degradePercent").val();
                
                var serviceName =this.model.get("serviceName");
                var appVersion = this.model.get("appVersion");
                var serviceCategory = this.model.get("serviceCategory");
                var groupId = this.model.get("groupId");
                var serviceId =this.model.get("serviceId");
                
                var url="/"+jcfManager.appName+"/service/setServiceDegradeConfig.action";
                var jsonParam={
                		"serviceName":serviceName,
                		"appVersion":appVersion,
                		"serviceCategory":serviceCategory,
                		"groupId":groupId,
                		"serviceId":serviceId,
                		"tpsSelected":tpsSelected,
                		"queueSelected":queueSelected,
                		"degradeServiceName":degradeServiceName,
                		"degradeTPU":degradeTPU,
                		"degradeTimeUnit":degradeTimeUnit,
                		"degradePercent":degradePercent,
                };
                
                var ajaxing = util.dealAjaxRequest4SimpleParam(url, jsonParam);
                var self=this;
    			$.when(ajaxing).done(function(data) {
    				var errorMsg = data.errorMsg;
    				var flag=data.flag;
    				 var t = new Date().getTime() ;
    				 var groupId = self.model.get("groupId");
    				 var queryString = {"groupId":groupId,"t":t} ;
    				if (flag) {
    					var confirmModel = new ConfirmModel();
    					confirmModel.set({
    						"btnok" : "确定",
    						"btncl" : "关闭"
    					});
    					var confirmView = new ConfirmView({
    						model : confirmModel
    					});
    					confirmModel.set("msg", "配置成功!");
    					jcfManager.dialogRegion.show(confirmView);
    					confirmView.confirm();
    					$("#submitFormBtn").removeClass("disabled");
    				//	alert("serviceDegradeConfig_view.js   "+"/serviceMgr/group/param");
    					appRouter.navigate("/serviceMgr/group/param/" + QueryString.stringify(queryString),{trigger:true}) ; 
    				} else {
    					var confirmModel = new ConfirmModel();
    					confirmModel.set({
    						"btnok" : "确定",
    						"btncl" : "关闭"
    					});
    					var confirmView = new ConfirmView({
    						model : confirmModel
    					});
    					confirmModel.set("msg", errorMsg);
    					jcfManager.dialogRegion.show(confirmView);
    					confirmView.confirm();
    				}
    			});

            }
        },
        checkDegradeServiceName:function(){
        	 return CheckUtil.checkNotNull("degradeServiceName");
        },
        checkTPU: function(){
        	var tpsSelected= $("#tpsSelected").is(":checked");
        	if(tpsSelected){
        		return CheckUtil.checkInputMatchPositiveIntegerAndMaxLength("degradeTPU", 10);
			}
        	return false;
        },
        
        checkTimeUnit: function(){
        	var tpsSelected= $("#tpsSelected").is(":checked");
        	if(tpsSelected){
        		return CheckUtil.checkInputMatchPositiveIntegerAndMaxLength("degradeTimeUnit", 10);
        	}
        	return false;
        },
        checkPercent: function(){
        	var queueSelected=$("#queueSelected").is(":checked");
        	if(queueSelected){
        		return CheckUtil.checkInputMatchInt_MinNum__MaxNum("degradePercent",0, 100);
        	}
        	return false;
        },
        
        checkForm: function(){
			var f1= false; 
			var f2 = false; 
			var flag = true; 
			
			var tpsSelected = $("#tpsSelected").is(":checked");
	        var queueSelected = $("#queueSelected").is(":checked");
			
			if(tpsSelected){
				f1 = true  ;
				if(this.checkTPU() && this.checkTimeUnit()){
					flag = true ;
				}else{
					flag = false; 
				}
			}
			if(queueSelected){
				f2 = true ;
				if (this.checkPercent()&&flag) {
               		 flag =  true;
            	}else{
					flag = false ;
				}
			}
			if(f2||f1){
				return flag;
			}else{
				alert("降级规则必须选一项！");
			}
        },

    });
    return ServiceDegradeConfigView;
});
