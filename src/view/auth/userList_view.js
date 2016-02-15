define(function(require, exports, module) {
	var $ = jQuery = require('jquery');
	var Backbone = require('backbone');
	var _ = require('underscore');
	var userListTemplate = require('../../template/auth/userList.tpl');
	var UserCollection = require("../../collection/auth/user_collection") ;
	var util = require("../../util/CommonUtil") ;
	var Marionette = require("marionette");
	var UserMgrApi = require("../../api/auth/UserMgrApi") ;
	var UserModifyView = require("./userModify_view") ;
	var UserModel = require("../../model/auth/user_model") ;
	var UserDetailView = require("./userDetail_view") ;
	
	var userItemTplStr = require("../../template/auth/userItem.tpl") ;	
	var UserItemView  = Marionette.ItemView.extend({
		 tagName: "tr" ,
		 initialize  : function(){
			this.listenTo(this.model, 'change', this.render);
	 	 },
		 template: _.template(userItemTplStr) ,
		 events: {
	 		"click" : "highlightName",
	 		"click a.oper" : "oper"
		 },
		 oper :function(e){
			e.preventDefault();
			e.stopPropagation();
			var $curA = $(e.target) ;
			var curID = $.trim($curA.attr("value")) ;
			var loginID = $curA.attr("loginID") ;
			if($curA.hasClass("detail")){
				appRouter.navigate("authMgr/userMgr/detail/param/userId="+curID);
				$.when(UserMgrApi.getUserByID(curID)).done(function(data){
					if(data.flag=="true"){
						var model = new UserModel(data) ;
		    			var userDetailView = new UserDetailView({model:model}) ;
		    			jcfManager.contentRegion.show(userDetailView) ;
					}else{
						util.alertEsg("操作出现异常!") ;
					}
				}) ;
			}else if ($curA.hasClass("modify")){
				var searchURL = "/"+util.getAppName()+"/user/toModifyUserUI.action" ;
				var loginId = $("#indexHiddenLoginId").val();
				appRouter.navigate("authMgr/userMgr/modify/param/userId="+curID+"&loginId="+loginId);
				var qdata = {"userID":curID , "loginId":loginId} ;
				var self = this ;
				$.when(util.dealAjaxRequest4SimpleParam(searchURL,qdata)).done(function(data){
					if(data.flag=="true"){
						var model = new Backbone.Model(data.userInfo) ;
		    			model.set("canMod",data.canMod) ;
		    			var userModifyView = new UserModifyView({model:model,roleList:data.roleList}) ;
		    			jcfManager.contentRegion.show(userModifyView) ;
					}else{
						util.alertEsg("操作出现异常!") ;
					}
		    	}) ;
			}else if($curA.hasClass("delete")){
				if(loginID == $("#indexHiddenLoginId").val()){
					alert("当前登录用户不能被删除！");
				}else if(confirm("确认删除?")){
					var delData = {userID:curID} ;
					var serverURL = "/" + util.getAppName()+"/user/deleteUserByID.action" ;
					var self = this ;
					var ajaxing = util.dealAjaxRequest4SimpleParam(serverURL,delData) ;
					$.when(ajaxing).done(function(data){
						if(data.flag=="true"){
							self.trigger("UserMgr:userDel",self.model);
						}else{
							util.alertEsg("删除信息失败!") ;
						}
					});
				}
			}
		 },
	     highlightName: function(e){
			 e.preventDefault();
			 this.$el.toggleClass("warning");
	     }
	});
	
    var UserListView = Marionette.CompositeView.extend({
    	initialize:function(){
    	},
        template: _.template(userListTemplate),
    	childView: UserItemView,
    	childViewContainer: "tbody",
    	childEvents: {
    	    'UserMgr:userDel': function (childView,model) {
    			this.collection.remove(model) ;
    			this.render();
    	    }
    	}
    });

    return UserListView;
});