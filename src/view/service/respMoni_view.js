/**
 * Created with eclipse.
 * User: yichengjie
 * Date: 2015-4-7
 * Time: 上午11:15:12
 * To change this template use File | Settings | File Templates.
 */
define(function(require, exports, module) {
	var $ = jQuery = require('jquery');
	var Backbone = require('backbone');
	var _ = require('underscore');
	var Marionette = require("marionette");
	var util = require("../../util/CommonUtil") ;
	var sidbarUtil = require("../../util/SidebarUtil") ;
	var my97Date = require('my97Date');
	var QueryString = require('querystring');
	require("bs-modal")($) ;

	var viewTemplateStr = require('../../template/service/serviceChartOpt.tpl');
	var GroupAddView = Marionette.LayoutView.extend({
		initialize: function() {
	    	this.listenTo(this.model, "change", this.render);
	    },
	    regions: {
	    	errInfoShowRegion: "#errInfoShowRegion",
	    	singleErrInfoShowRegion:"#singleErrInfoShowRegion"//单个错误提示信息
	    },
		template : _.template(viewTemplateStr),
		events:{
	  	   "change #dataType" :"changeGroupCategory",
	  	   "click #queryDataBtn" : "queryData",
	  	   "click #startDate" : "startDate",
	  	   "click #endDate" : "endDate"

	    },
	    changeGroupCategory : function(){
	    	 var selectGC = this.$el.find("#dataType").val() ;
	    	 this.model.set("checkGroupCategory",selectGC) ;
	    	 $('#queryDataModal').modal('show');
	    },
	    startDate : function(){
	    	WdatePicker({el:$dp.$('startTime'),dateFmt:'yyyy-MM-dd HH:mm:ss'});
	    },
	    endDate : function(){
	    	
	    	WdatePicker({el:$dp.$('endTime'),dateFmt:'yyyy-MM-dd HH:mm:ss'});
	    },
	    getCacheConfigFormInputParam:function(){
	    	var ids = ["dataType","disposeType"] ;
	    	var jsParam = util.getFormInputObj(ids) ;
			return jsParam ;
	    },
	    checkCacheGroupCfgInfo:function(){
	    	if(this.checkGroupName()&&this.checkGroupPassword()&&this.checkBroadcastURL()
	    		&&this.checkMaxSize4Store()&&this.checkSingleDataMaxLength()&&this.checkCacheNodeAlert()
	    		&&this.checkJvmMemory()&&this.checkJvmHeapAlert()&&this.checkDataBackupNum()
	    		&&this.checkStatisticsPath()&&this.checkStatisticsSyncTime()&&this.checkJvmHeapBlock()
	    		&&this.checkMaxSize4Cache()&&this.checkaNetworkPort()&&this.checkaddTcpIPMember()){
	    		return true ;
	    	}
	    	return false ;
	    },
	    queryData:function(e){	 	    	
			 var jsParam = {} ;
			 var modelName = sidbarUtil.getModuleName() ;
			 var serverURL = "/"+jcfManager.appName+"/service/chartSearch.action" ;
			 jsParam = this.getCacheConfigFormInputParam();
			 jsParam.serviceName = this.model.get('serviceName');
			 jsParam.serverName = this.model.get('serverName');
			 jsParam.appVersion = this.model.get('appVersion');
			 var ajaxing = util.dealAjaxRequest4JSObj(serverURL,jsParam) ;
			 var self = this ;
			 self.remove() ;
			 appRouter.navigate(modelName +"/server/MoniOption/param/" + QueryString.stringify(jsParam)) ;
			 $.when(ajaxing).done(function(data){
				 if(data.flag != 'error'){
					 var model1 = new Backbone.Model(data) ;
					 model1.set('serverId',self.model.get('serverId'));
					 model1.set('appVersion',self.model.get('appVersion'));
					 var serverServiceChart_view = require("./serverServiceChart_view");
					 var sc_view = new serverServiceChart_view({model:model1}) ;
					 jcfManager.contentRegion.show(sc_view) ;
				 }else{
					 alert('度量数据加载失败');
				 }
				 
			 }) ;	 
	    }
	}) ;
	return GroupAddView ;
});
