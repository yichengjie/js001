define(function(require, exports, module) {
	var $ = jQuery = require('jquery');
	var Backbone = require('backbone');
	var _ = require('underscore');
	var userAddTpl = require("../../template/auth/userModify.tpl") ;
	var util = require("../../util/CommonUtil") ;
	var Marionette = require("marionette");
	var queryCondition = null ;
	var inputUtil = require("../../util/SpecialPatternInputCheckUtil2") ;
	
    var UserModifyView = Marionette.ItemView.extend({
        template: _.template(userAddTpl),
        initialize: function (options) {
    		this.roleList = options.roleList ;
    		//this.curItemView = options.curItemView ;
        },
        events: {
            "blur #name" : "checkName",
        	"blur #password" : "checkPassword",
            "blur #confirmpassword" : "checkConfirmpassword",
            "blur #deptId" : "checkDeptId",
            "blur #post" : "checkPost",
            "blur #tel" : "checkTel",
            "blur #email" : "checkEmail",
            "click #modifyUser":  "updateUser",
            "click #back": "back"
        },
		check2password:function(){//检验两个密码
			var id = "confirmpassword" ;
			var p1 = $.trim($("#password").val()) ;
			if(p1.length>0){
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
			}else{
				return true;
			}
			
		},
        checkPassword:function(){
        	var id = "password" ;
        	var value = $.trim($("#"+id).val()) ;
        	if(value.length==0){
        		return true ;
        	}else{
        		return inputUtil.checkStrongPassword(id);
        	}
        },
        checkConfirmpassword:function(){
        	var id = "confirmpassword" ;
        	var value = $.trim($("#"+id).val()) ;
        	if(value.length==0){
        		return true ;
        	}else{
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
        	}
        },
        checkName:function(){
        	return inputUtil.checkInputMatchMaxLength("name",20) ;
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
        checkModifyUserForm:function(){//检查表单是否合法
        	if(this.checkName()&&this.checkPassword()&&this.checkConfirmpassword()
        	  &&this.checkDeptId()&&this.checkPost()&&this.checkTel()&&this.checkEmail()
			  &&this.check2password()){
        		return true ;
        	}
        	return false;
        },
        updateUser : function(){
        	var flag = this.checkModifyUserForm() ;
        	var formIds = ["id","loginID","name","password",
        	               "confirmpassword","deptId","post","tel",
        	               "roleId","email"] ;
        	if(flag){
        		var jsObj = util.getFormInputObj(formIds) ;
            	var appName = util.getAppName() ;
            	var url = "/" + appName +"/user/updateUser.action" ;
            	//将数据保存到数据库中
            	$.when(util.dealAjaxRequest4JSObj(url,jsObj))
            	 .done(function(data){
            		var rflag = data.flag ;
            		if(rflag=="true"){
            			window.history.back() ;
            		}else{
            			//alert("修改用户信息出错!") ;
						util.alertEsg("修改用户信息出错!") ;
            		}
            	 }) ;
        	}
        },
        back : function (){
        	window.history.back() ;
        	//this.remove() ;
        },
        render: function () {
            this.$el.html(this.template({model:this.model.toJSON(),roleList:this.roleList}));
            return this;
        },
        onShow:function(){
        	/*this.$el.dialog({
   			 modal: true,
   			 width: "auto"
   		   });*/
        }
    });
    return UserModifyView;
});