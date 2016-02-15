/**
 * Created with eclipse.
 * User: yichengjie
 * Date: 2015-3-24
 * Time: 下午04:53:12
 * To change this template use File | Settings | File Templates.
 */
define(function(require, exports, module) {

	var $ = jQuery = require('jquery');
	var Backbone = require('backbone');
	var _ = require('underscore');
	var Marionette = require("marionette");
	var util = require("../../util/CommonUtil") ;
	var viewTemplateStr = require('../../template/deploy/rollbackView.tpl');
	var QueryString = require('querystring');
	var sidbarUtil = require("../../util/SidebarUtil") ;
	
	var RollbackView = Marionette.ItemView.extend({
		initialize: function(options) { 
		   this.jsParam = options.jsParam ;
	    },
		template: _.template(viewTemplateStr),
		events:{
			"click #rollbackSubmitBtn" : "rollbackSubmit" ,
			"click td.selectVersionTd :radio" : "selectVersion"
		},
		rollbackSubmit:function(){
			//当前版本和将要回滚的版本不能相同
			var hiddenAppVersion = $("#hiddenAppVersion").val() ;
			var rollback2Version = $("#rollback2Version").val() ;
			if(rollback2Version==""){
				alert("请选择回滚版本!") ;
			}else{
				if(confirm("确认回滚?")){
					var rollbackParam  = {} ;
					rollbackParam.groupId = this.jsParam.groupId ;
					rollbackParam.groupName = this.jsParam.groupName ;
					rollbackParam.appName = this.jsParam.appName ;
					rollbackParam.appId = this.jsParam.appId ;
					rollbackParam.prevVersion = rollback2Version;//将要回滚的版本
					rollbackParam.mode = "group" ;
					//rollbackParam.operation = "8" ;
					var modelName = sidbarUtil.getModuleName() ;
					var serverURL = "/"+jcfManager.appName+"/deployMgr/mRollbackApp.action" ;
					var ajaxing = util.dealAjaxRequest4JSObj(serverURL,rollbackParam) ;
					var groupId = this.jsParam.groupId ;
					$.when(ajaxing).done(function(data){
						if(data.flag = "true"){
							if(data.msg=="success"){
								//回滚陈功后也要不断的刷新页面
								var toPageParam = {"groupId":groupId,"freshPage":"true"} ;
								appRouter.navigate(modelName +"/group/param/" + QueryString.stringify(toPageParam),{trigger:true}) ;
							}else{
								alert("回滚失败!" + data.msg) ;
							}
						}else{
							alert("回滚失败!") ;
						}
					}) ;
				}
			}
		},
		selectVersion:function(e){
			var $target = $(e.target) ;
			var value = $target.val() ;
			$("#rollback2Version").val(value) ;
			
		}
	});
	
	return RollbackView ;

});
