/**
 * Created with eclipse.
 * User: yichengjie
 * Date: 2014-12-15
 * Time: 下午01:40:40
 * To change this template use File | Settings | File Templates.
 */
define(function(require, exports, module) {
	var $ = jQuery = require('jquery');
	var Backbone = require('backbone');
	var _ = require('underscore');
	var userAddTpl = require("../../template/auth/userAdd.tpl") ;
	var util = require("../../util/CommonUtil") ;
	var inputUtil = require("../../util/SpecialPatternInputCheckUtil2") ;
	var sidbarUtil = require("../../util/SidebarUtil") ;
	
    var UserAddView = Backbone.View.extend({
        template: _.template(userAddTpl),
        initialize: function () {
    	
        },
        events: {
            "click #addUser":  "addUser",
            "click #back": "back",
            "blur #loginID" : "checkLoginID",
            "blur #name" : "checkName",
            "blur #password" : "checkPassword",
            "blur #confirmpassword" : "checkConfirmpassword",
            "blur #deptId" : "checkDeptId",
            "blur #post" : "checkPost",
            "blur #tel" : "checkTel",
            "blur #email" : "checkEmail"
        },
        checkAddUserForm:function(){//检查表单是否合法
        	if(this.checkLoginID()&&this.checkName()&&this.checkPassword()&&this.checkConfirmpassword()
        	  &&this.checkDeptId()&&this.checkPost()&&this.checkTel()&&this.checkEmail()){
        		return true ;
        	}
        	return false;
        },
        addUser : function(){
        	var flag = this.checkAddUserForm() ;
        	var modelName = sidbarUtil.getModuleName() ;
        	if(flag){
    		   var formIds = ["loginID","name","password","confirmpassword","deptId","post","tel","roleId","email"] ;
        	   var jsObj = util.getFormInputObj(formIds) ;
        	   var serverURL = "/" + jcfManager.appName +"/user/addUser.action" ;
        	   $.when(util.dealAjaxRequest4JSObj(serverURL,jsObj))
        	    .done(function(data){
				   if(data.flag=="true"){
        	       	  appRouter.navigate(modelName +"/userMgr",{trigger:true}) ;
				   }else{
				   	  util.alertEsg("添加信息出错!") ;
				   }
        	    }).fail(function(data){
        		   //alert("添加信息出错!") ;
				   util.alertEsg("添加信息出错!") ;
        	    }) ; 
        	}
        },
        checkLoginIdExist:function(){//当且仅当，用户名存在时返回 ：false，其他情况全部返回：true
        	var id = "loginID" ;
        	var flag = true ;
        	var errTip = "用户ID重复!" ;
        	var loginID = $.trim($("#"+id).val());
        	var jsonParam = {"loginID":loginID} ;
        	var serverURL = "/"+jcfManager.appName+"/user/checkLoginIdExist.action" ;
        	var ajaxing = util.dealSYNCHAjaxRequest4SimpleParam(serverURL,jsonParam) ;
        	$.when(ajaxing).done(function(data){
        		if(data.flag=="true"){
        			inputUtil.errInput(id,errTip) ;
        		}else if (data.flag=="false"){
        			inputUtil.successInput(id) ;
        			flag = false;//这个地方一定要注意是返回:false
        		}else{
        			inputUtil.errInput(id,data.flag) ;
        		}
        	}) ;
        	return flag ;
        },
        checkLoginID:function(){
        	var flag = false;
        	flag = inputUtil.checkInputMatchMaxLength("loginID",10) ;
        	if(flag){
        		var existFlag = this.checkLoginIdExist() ;
        		if(!existFlag){//不存在
        			flag = true ;
        		}else{//存在
        			flag = false;
        		}
        	}
        	return flag;
        },
        checkName:function(){
        	return inputUtil.checkInputMatchMaxLength("name",20) ;
        },
        checkPassword:function(){
        	var id = "password" ;
        	return inputUtil.checkStrongPassword(id) ;
        },
        checkConfirmpassword:function(){
        	var id = "confirmpassword" ;
        	var flag = inputUtil.checkStrongPassword(id) ;
        	//如果密码不一样也需要提示错误信息
        	if(flag){
        		var pw1 = $("#password").val() ;
        		var pw2 = $("#confirmpassword").val() ;
        		if(pw1==pw2){
        			flag = inputUtil.successInput(id) ;
        		}else{
        			flag = inputUtil.errInput(id,"密码不一致！") ;
        		}
        	}
        	return flag ;
        },
        checkDeptId:function(){
        	return inputUtil.checkInputMatchMaxLengthCanNull("deptId",20) ;
        },
        checkPost:function(){
        	return inputUtil.checkInputMatchMaxLengthCanNull("post",20) ;
        },
        checkTel:function(){
        	var id = "tel" ;
        	var minLen = 6 ;
        	var maxLen = 20 ;
        	var value = $.trim($("#"+id).val()) ;
        	if(value.length>0){
        		var flag = inputUtil.checkInputMatchGoodLength(id,minLen,maxLen) ;
            	if(flag){
            		if($.isNumeric(value)){//
            			flag = inputUtil.successInput(id) ;
            		}else{
            			flag = inputUtil.errInput(id,"电话格式输入错误！") ;
            		}
            	}
            	return flag ;
        	}else{
        		return true
        	}
        },
        checkEmail:function(){
        	var id = "email";
        	var email = $("#"+id).val() ;
        	var flag = true;
        	if(email.length>0){
        		flag = inputUtil.checkEmail(id) ;
        	}
        	return flag ;
        },
        back : function (){
        	//window.appRouter.navigate("authMgr/userMgr", {trigger: true});
        	window.history.back() ;
        },
        render: function () {
            this.$el.html(this.template({list:this.collection.toJSON()}));
            return this;
        }
    });
    return UserAddView;
});