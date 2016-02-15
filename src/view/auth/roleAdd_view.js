/**
 * Created with eclipse.
 * User: yichengjie
 * Date: 2015-3-26
 * Time: 上午10:50:36
 * To change this template use File | Settings | File Templates.
 */
define(function(require, exports, module) {

	var $ = jQuery = require('jquery');
	var Backbone = require('backbone');
	var _ = require('underscore');
	var Marionette = require("marionette");
	var viewTemplateStr = require('../../template/auth/roleAdd.tpl');
	var util = require("../../util/CommonUtil") ;
	var inputCheck = require("../../util/SpecialPatternInputCheckUtil2") ;
	require('ztree-core')($);
	require('ztree-excheck')($);
	
	var RoleAddView = Marionette.ItemView.extend({
		template: _.template(viewTemplateStr),
		initialize: function(options) { 
			 this.on("showPageInfo",this.showPageInfo) ;
		},
		events:{
			"click #addRoleBtn" : "addRole",
			"click #backLastPageBtn" :"backLastPage",
			"blur #name" : "checkName" ,
			"blur #description" : "checkDescription",
		},
		backLastPage:function(){
			window.history.back() ;
		},
		checkName:function(){
			var id = "name" ;
			var flag = inputCheck.checkInputMatchMaxLength(id,30) ;
			if(flag){
				flag = this.checkNameExist() ;
			}
			return flag ;
		},
		checkDescription:function(){
			var id = "description" ;
			var flag = inputCheck.checkInputMatchMaxLength(id,30) ;
			return flag ;
		},
		addRole:function(){
			var flag = this.checkName() ;
			if(flag){
				flag = this.checkDescription() ;
			}
			if(flag){
				var zTree = $.fn.zTree.getZTreeObj("roleTree1");
				var nodes = zTree.getCheckedNodes(true);
				var zTree2 = $.fn.zTree.getZTreeObj("roleTree2");
				var nodes2 = zTree2.getCheckedNodes(true);
				//拼凑选中的串
				var idall = "";
				for(var i = 0; i < nodes.length; i++){
					idall += "," + nodes[i].id ;
				}
				for(var i = 0; i < nodes2.length; i++){
					idall += "," + nodes2[i].id ;
				}
				//角色权限非空校验
				if(idall.length > 0){
					$('#powerTip').html("");
					idall = idall.substring(1);
					flag = this.checkRoleDouble(idall) ;
					if(flag){//准备提交表单
						var roleName = $.trim($("#name").val());
						var roleDescr = $.trim($("#description").val()) ;
						var roleAtri = $.trim($("#menuIds").val()) ;
						var jsParam = {} ;
						jsParam.name = roleName ;
						jsParam.description = roleDescr ;
						jsParam.menuIds = roleAtri ;
						this.submitForm(jsParam) ;
					}
				}else{
					$('#powerTip').html("角色权限不能为空");
					return ;
				}
			}
		},
		submitForm:function(jsParam){
			var serverURL = "/"+jcfManager.appName+"/auth/addRole.action" ;
			var ajaxing = util.dealAjaxRequest4JSObj(serverURL,jsParam) ;
			$.when(ajaxing).done(function(data){
				if(data.flag=="true"){
					appRouter.navigate("authMgr/roleMgr",{trigger:true}) ;
				}else{
					alert("添加失败！") ;
				}
			});
			
		},
		checkRoleDouble:function(idall){
			var serverURL = "/"+jcfManager.appName+"/auth/isRepower.action" ;
			var jsonParam = {"idall":idall} ;
			var ajaxing = util.dealSYNCHAjaxRequest4SimpleParam(serverURL,jsonParam) ;
			var flag = false ;
			$.when(ajaxing).done(function(data){
				if(data.result=="prosave"){
					$('#powerTip').html('所选权限组合已存在');	
					flag = false;
				}else if (data.result=="bnfp"){
					$('#powerTip').html('你不能分配大于你的权限的权限！');
					flag = false; 
				}else{
					flag = true ;
					$('#powerTip').html('');
					$("#menuIds").val(idall);	
				}
			}) ;
			return flag ;
		},
		checkNameExist:function(){
			var id = "name" ;
			var value = $.trim($("#"+id).val()) ;
			var flag = true ;
			var serverURL = "/"+jcfManager.appName+"/auth/checkRoleNameExist.action" ;
			var jsonParam = {"name":value} ;
			var ajaxing = util.dealSYNCHAjaxRequest4SimpleParam(serverURL,jsonParam) ;
			$.when(ajaxing).done(function(data){
				if(data.flag=="true"){
					inputCheck.errInput(id,"角色名称已存在!") ;
					flag = false;
				}else if(data.flag=="false"){
					inputCheck.successInput(id) ;
					flag = true ;
				}else{
					flag = false;
					alert("检查出错!") ;
				}
			}) ;
			return flag ;
		},
		showPageInfo:function(){
			var setting = {
					check: {enable: true,chkboxType:{"Y" : "ps", "N" : "ps"}},
					data: {simpleData: {enable: true}}
			};
			var serverURL = "/"+jcfManager.appName+"/auth/addRoleForward.action" ;
			var ajaxing = util.dealAjaxRequestWithoutParam(serverURL) ;
			$.when(ajaxing).done(function(data){
				if(data.flag=="true"){
					var resultStr1 = data.resultStr1 ;
					var resultStr2 = data.resultStr2 ;
					$.fn.zTree.init($("#roleTree1"), setting, resultStr1);
					$.fn.zTree.init($("#roleTree2"), setting, resultStr2);
				}else{
					alert("查询角色出错!") ;
				}
			}) ;
		}
	});
	
	return RoleAddView;

});
