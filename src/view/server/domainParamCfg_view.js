/**
 * Created with eclipse.
 * User: yichengjie
 * Date: 2015-4-24
 * Time: 上午10:07:42
 * To change this template use File | Settings | File Templates.
 */
define(function(require, exports, module) {

	var $ = jQuery = require('jquery');
	var Backbone = require('backbone');
	var _ = require('underscore');
	var Marionette = require("marionette");
	var viewTemplateStr = require('../../template/server/domainParamCfg.tpl');
	var util = require("../../util/CommonUtil") ;
	var inputCheck = require("../../util/SpecialPatternInputCheckUtil2") ;
	require("icheck")($)  ;
	var GlobalView = require("./global_view") ;
	
	
	var DomainParamCfgView = Marionette.LayoutView.extend({
		  template: _.template(viewTemplateStr),
		  regions: {
			alertInfoRegion: "#alertInfoRegion"
		  },
		  events:{
			 "click #saveBtn" :"saveInfo"
		  },
		  saveInfo:function(){//保存信息
			  this.alertInfoRegion.empty() ;
			  var qhVal = "" ;//亲和值
			  var fqhVal = "" ;//非亲和值
			  qhVal =  $.trim($(":radio[name='affinityAlgorithm']:checked").val()) ;
			  fqhVal =  $.trim($(":radio[name='statelessAlgorithm']:checked").val()) ;
			  if(qhVal.length==0||fqhVal.length==0){
				  var model = new Backbone.Model() ;
				  model.set("succList",[]) ;
				  model.set("errList",["亲和非亲和都为必选项!"]) ;
				  this.alertInfoRegion.show(new GlobalView({model:model})) ;
			  }else{
				  var formObj = {} ;
				  var self = this ;
				  formObj.affinityAlgorithm = qhVal ;
				  formObj.statelessAlgorithm = fqhVal ;
				  var serverURL = "/"+jcfManager.appName+"/server/saveDomainParamCfgInfo.action" ;
				  var ajaxing = util.dealAjaxRequest4JSObj(serverURL,formObj) ;
				  $.when(ajaxing).done(function(data){
					  if(data.flag=="true"){
						  var model = new Backbone.Model(data) ;
						  self.alertInfoRegion.show(new GlobalView({model:model})) ;
					  }else{
						  var model = new Backbone.Model() ;
						  model.set("succList",[]) ;
						  model.set("errList",["保存域参数失败!"]) ;
						  self.alertInfoRegion.show(new GlobalView({model:model})) ;
					  }
				  }) ;
			  }
		  },
		  onShow:function(){
			  $('input').iCheck({
				  checkboxClass: 'icheckbox_flat-red',
				  radioClass: 'iradio_flat-red'
			  });
			  $('#qhcheckbox, #fqhcheckbox').iCheck('disable');
		  },
		 
	});
	
	return DomainParamCfgView ;
});
