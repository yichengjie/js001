define(function(require, exports, module) {

	var $ = jQuery = require('jquery');
	var Backbone = require('backbone');
	var _ = require('underscore');
	var Marionette = require("marionette");
	var layoutTmpStr = require('../../template/service/serviceTab4ConfigLayout.tpl');
	var util = require("../../util/CommonUtil") ;
	var ServiceConfigView = require("./serviceConfig_view") ;
	var ListTipModel = require("../../model/listTip_model") ;
	var ListTipView = require("../listTip_view") ;
	
	var ServiceTab4ConfigLayout = Marionette.LayoutView.extend({
		  initialize:function(){
			 this.on("showPageInfo",this.showPageInfo) ;
		  },
		  template: _.template(layoutTmpStr),
		  regions: {
		    downContentRegion: "#downContentRegion" ,
		    showTipRegion:"#showTipRegion"
		  },
		  events:{
			  "change #serviceGroupName" :"changeServiceGroupName",
			  "change #serviceName" :"changeServiceName"
		  },
		  changeServiceName:function(){//选择组
			  var self = this ;
			  var groupId = $.trim($("#serviceGroupName").val()) ;
			  var serviceId = $.trim($("#serviceName").val()) ;
			  if(serviceId.length>0){
				  var serverURL = "/"+jcfManager.appName+"/service/getServiceCategory.action" ;
				  var jsonParam = {"groupId":groupId,"serviceId":serviceId} ;
				  var ajaxing = util.dealAjaxRequest4SimpleParam(serverURL,jsonParam) ;
				  $.when(ajaxing).done(function(data){
					  var tipModel = new ListTipModel() ;
					  var serverName = data.serverName ;
					  tipModel.set("succList",["配置是从"+serverName+"中获取的"]) ;
					  var tipView = new ListTipView({model:tipModel}) ;
					  self.showTipRegion.show(tipView) ;
						
					  var model = new Backbone.Model(data.serviceParameter) ;
					  model.set("flag",data.flag) ;
					  model.set("serviceId",data.serviceId) ;
					  model.set("serviceCategory",data.serviceCategory) ;
					  model.set("serverName",data.serverName) ;
					  model.set("configError",data.configError) ;
					  
					  var scView = new ServiceConfigView({model:model}) ;
					  self.downContentRegion.show(scView) ;
				  }) ;
			  }else{
				  this.downContentRegion.empty() ;
				  this.showTipRegion.empty() ;
			  }
			  
		  },
		  changeServiceGroupName:function(){
			  var groupId = $.trim($("#serviceGroupName").val()) ;
			  var $serviceName = $("#serviceName") ;
			  this.downContentRegion.empty() ;
			  if(groupId.length > 0){
				  var serverURL = "/"+jcfManager.appName+"/service/getSericeNameList.action" ;
				  var jsonParam = {"groupId":groupId} ;
				  var ajaxing = util.dealAjaxRequest4SimpleParam(serverURL,jsonParam) ;
				  $.when(ajaxing).done(function(data){
					  var list = data.serviceInfoList ;
					  $serviceName.html("<option selected = 'selected'></option>") ;
					  for(var i = 0 ; i < list.length ; i ++){
						  var id = list[i].serviceId ;
						  var name = list[i].serviceName ;
						  var version = list[i].appVersion ;
						  var sss = name+"_"+version ;
						  var $option = "<option value = '"+id+"'>"+sss+"</option>" ;
						  $serviceName.append($option) ;
					  }
				  }) ;
			  }else{
				  $serviceName.html("<option selected = 'selected'></option>") ;
				  this.showTipRegion.empty() ;
			  }
		  }
	});
	
	return ServiceTab4ConfigLayout ;

});
