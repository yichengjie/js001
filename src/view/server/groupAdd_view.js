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
	var QueryString = require('querystring');
	var InputCheck = require("./checkCacheGroup") ;
	var GlobalView =require("./global_view") ;
	require("bs-modal")($) ;
	var viewTemplateStr = require('../../template/server/groupAdd.tpl');
	var GroupAddView = Marionette.LayoutView.extend({
		initialize: function() {
	    	this.listenTo(this.model, "change", this.render);
	    	$.extend(this,new InputCheck()) ;
	    },
	    regions: {
	    	errInfoShowRegion: "#errInfoShowRegion",
	    	singleErrInfoShowRegion:"#singleErrInfoShowRegion"//单个错误提示信息
	    },
		template : _.template(viewTemplateStr),
		events:{
	  	   "change #addGroup_groupCategory" :"changeGroupCategory",
	  	   "click #addGroupBtn" : "addGroup",
	  	   "blur #addGroup_groupName":"checkGroupName",
	  	   
	  	   "blur #addGroup_maxSize4Store" :"checkMaxSize4Store",//存储最大个数//checkStoreNodeMaxCount
	  	   "blur #addGroup_singleDataMaxLength" :"checkSingleDataMaxLength",//已存在//单个数据最大长度
	  	   "blur #addGroup_cacheNodeAlert" :"checkCacheNodeAlert" ,//存储报警阀值
	  	   
	  	   "blur  #addGroup_jvmMemory" : "checkJvmMemory" ,
	  	   "blur #addGroup_jvmHeapAlert" : "checkJvmHeapAlert" ,
	  	   "blur #addGroup_dataBackupNum" : "checkDataBackupNum" ,//已存在
	  	   "blur #addGroup_statisticsPath" : "checkStatisticsPath" ,
	  	   "blur #addGroup_statisticsSyncTime" : "checkStatisticsSyncTime" ,
	  	   "blur #addGroup_jvmHeapBlock" : "checkJvmHeapBlock" ,
	  	   
	  	   "blur #addGroup_groupPassword" :"checkGroupPassword" ,//已存在
	  	   "blur #addGroup_broadcastURL" :"checkBroadcastURL",//已存在
	  	   "blur #addGroup_maxSize4Cache" : "checkMaxSize4Cache" ,
	  	   "blur #addGroup_networkPort" :"checkaNetworkPort",
	  	   "blur #addGroup_tcpIPMember" :"checkaddTcpIPMember"
	    },
	    changeGroupCategory : function(){
	    	 var selectGC = this.$el.find("#addGroup_groupCategory").val() ;
	    	 this.model.set("checkGroupCategory",selectGC) ;
	    	 $('#addGroupModal').modal('show');
	    },
	    getCacheConfigFormInputParam:function(){
	    	var ids = ["addGroup_groupPassword",
	    	           "addGroup_broadcastURL","addGroup_maxSize4Store","addGroup_singleDataMaxLength",
	    	           "addGroup_cacheNodeAlert","addGroup_jvmMemory",
	    	           "addGroup_jvmHeapAlert","addGroup_dataBackupNum","addGroup_statisticsPath",
	    	           "addGroup_statisticsSyncTime","addGroup_jvmHeapBlock",
	    	           "addGroup_maxSize4Cache","addGroup_networkPort","addGroup_tcpIPMember"] ;
	    	var jsParam = util.getFormInputObj(ids) ;
	    	jsParam.addGroup_broadcastURL = "127.0.0.1:8888" ;
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
	    addGroup:function(){
	    	 var groupCategory = this.$el.find("#addGroup_groupCategory").val() ;
			 var groupName = this.$el.find("#addGroup_groupName").val() ;
			 var jsParam = {} ;
			 var serverURL = "/"+jcfManager.appName+"/server/addNewGroup.action" ;
			 var t = new Date().getTime() ;
			 var jString = {"selectedPageUI":"serverAddUI","t":t} ;
			 var flag = this.checkGroupName() ;
			 var selectGroupCategory = this.model.get("checkGroupCategory") ;
			 if(flag &&selectGroupCategory=="7"){//dataCount-- singleDataMaxLength -- dataBackupNum
				 var value = $.trim($(":radio[name='addGroup_cacheModel']:checked").val()) ;//addGroup_cacheModel单独处理
				 flag = this.checkCacheGroupCfgInfo() ;
				 var jsParam2 = this.getCacheConfigFormInputParam() ;
				 jsParam2.addGroup_cacheModel = value ;
				 jsParam2.groupCategory = groupCategory ;
				 jsParam2.groupName  = groupName ;
				 jsParam = jsParam2 ;
			 }else{
				 var jsParam1 = {} ;
				 jsParam1.groupCategory = groupCategory ;
				 jsParam1.groupName  = groupName ;
				 jsParam = jsParam1 ;
			 }
			 if(flag){
				 var ajaxing = util.dealAjaxRequest4JSObj(serverURL,jsParam) ;
				 var self = this ;
				 $.when(ajaxing).done(function(data){
					 if(data.flag=="true"){
						 self.remove();
						 appRouter.navigate("serverMgr/param/" + QueryString.stringify(jString),{trigger:true}) ;
					 }else{
						 self.remove() ;
						 alert("失败") ;
					 }
				 }) ;
			 }
	    }
	}) ;
	return GroupAddView ;
});
