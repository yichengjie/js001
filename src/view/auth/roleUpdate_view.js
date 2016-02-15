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
	var viewTemplateStr = require('../../template/auth/roleUpdate.tpl');
	var util = require("../../util/CommonUtil") ;
	var inputCheck = require("../../util/SpecialPatternInputCheckUtil2") ;
	
	//require('ztree-all')($);
	require('ztree-core')($);
	require('ztree-excheck')($);
	
	var ConfirmModel = require("../../model/confirm_model") ;
	var ConfirmView = require("../confirm_view") ;
	
	var RoleUpdateView = Marionette.ItemView.extend({
		template: _.template(viewTemplateStr),
		initialize: function(options) { 
			 this.on("showPageInfo",this.showPageInfo) ;
		},
		events:{
			"click #updateRoleBtn" : "updateRole",
			"blur #name" : "checkName" ,
			"blur #description" : "checkDescription",
			"click #backLastBtn" :"backLastPage"
		},
		backLastPage:function(){
			  window.history.back() ;
		},
		checkName:function(){
			if(this.model.get("operatorType")=="view"){
				return true ;
			}else{
				var id = "name" ;
				var flag = inputCheck.checkInputMatchMaxLength(id,30) ;
				if(flag){
					flag = this.checkNameExist() ;
				}
				return flag ;
			}
		},
		checkDescription:function(){
			if(this.model.get("operatorType")=="view"){
				return true ;
			}else{
				var id = "description" ;
				var flag = inputCheck.checkInputMatchMaxLength(id,30) ;
				return flag ;
			}
		},
		updateRole:function(){
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
				var roleId = $.trim($("#roleId").val())
				//角色权限非空校验
				if(idall.length > 0){
					$('#powerTip').html("");
					idall = idall.substring(1);
					flag = this.checkRoleDouble(idall,roleId) ;//22
					if(flag){//准备提交表单
						var roleName = $.trim($("#name").val());
						var roleDescr = $.trim($("#description").val()) ;
						var roleAtri = $.trim($("#menuIds").val()) ;//这个千万不可放在22前面，
						var jsParam = {} ;
						jsParam.id = roleId ;
						jsParam.name = roleName ;
						jsParam.description = roleDescr ;
						jsParam.menuIds = roleAtri ;
						this.submitForm(jsParam) ;
					}
				}else{
					var cmodel = new ConfirmModel({"btnok":"确认","btncl":"关闭"}) ;
					cmodel.set("msg","角色权限不能为空！") ;
					var cview = new ConfirmView({model:cmodel}) ;
					jcfManager.dialogRegion.show(cview) ;
					cview.confirm() ;
					return ;
				}
			}
		},
		submitForm:function(jsParam){
			var serverURL = "/"+jcfManager.appName+"/auth/updateRole.action" ;
			var ajaxing = util.dealAjaxRequest4JSObj(serverURL,jsParam) ;
			var cmodel = new ConfirmModel({"btnok":"确认","btncl":"关闭"}) ;
			
			$.when(ajaxing).done(function(data){
				if(data.flag=="true"){
					var name = $.trim($("#name").val());
					$("#orgRoleName").val(name);
					cmodel.set("msg","修改信息成功！") ;
					var cview = new ConfirmView({model:cmodel}) ;
					jcfManager.dialogRegion.show(cview) ;
					cview.confirm() ;
				}else{
					cmodel.set("msg","修改信息失败！") ;
					var cview = new ConfirmView({model:cmodel}) ;
					jcfManager.dialogRegion.show(cview) ;
					cview.confirm() ;
				}
			});
		},
		checkRoleDouble:function(idall,modifyRoleId){
			var serverURL = "/"+jcfManager.appName+"/auth/isRepower4Update.action" ;
			var jsonParam = {"idall":idall,"modifyRoleId":modifyRoleId} ;
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
			var orgRoleName = $.trim($("#orgRoleName").val()) ;
			var id = "name" ;
			var value = $.trim($("#"+id).val() );
			if(orgRoleName==value){
				return true ;
			}else{
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
			}
		},
		showPageInfo:function(){
			var setting = {
					check: {enable: true,chkboxType:{"Y" : "ps", "N" : "ps"}},
					data: {simpleData: {enable: true}}
			};
			var resultStr1 = this.model.get("resultStr1") ;
			var resultStr2 = this.model.get("resultStr2") ;
			$.fn.zTree.init($("#roleTree1"), setting, resultStr1);
			$.fn.zTree.init($("#roleTree2"), setting, resultStr2);
		}
	});
	
	return RoleUpdateView;

});
