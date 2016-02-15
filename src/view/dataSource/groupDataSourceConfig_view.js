define(function(require, exports, module) {
	
	var $ = jQuery = require('jquery');
	var Backbone = require('backbone');
	var _ = require('underscore');
	var QueryString = require('querystring');
	var DataSourceUtil = require("../../util/DataSourceUtil");
	
	var GroupDataSourceConfigTemplate = require("../../template/dataSource/groupDataSourceConfig.tpl");
	
	var GlobalView = require("./global_view");
	
	var GroupDataSourceConfigView = Backbone.View.extend({
		el: "#content-body",
		
        template:_.template(GroupDataSourceConfigTemplate),
        
        events: {
        	"blur #userName": "checkUserName",
			"blur #password":"checkPassword",
        	"blur #URL": "checkURL",
        	"blur #maxActive": "checkMaxActive",
        	"blur #maxWait": "checkMaxWait",
        	"blur #maxIdle": "checkMaxIdle",
        	"blur #minIdle": "checkMinIdle",
        	"blur #initialSize": "checkInitialSize",
        	"click #save": "saveConfig"
        },

        initialize: function(options){
        	this.options = options || {};
        	this.model = options.model;
        	this.groupId = options.queryString.groupId;
        	this.listenTo(this.model,'change',this.render);
        },

        render: function(){
        	this.$el.html(this.template(this.model.toJSON()));
    		return this;
        },
        saveConfig: function(){
        	if (this.checkForm()){
        		var self = this;
            	var userName = self.$el.find("#userName").val();
            	var password = self.$el.find("#password").val();
            	var URL = self.$el.find("#URL").val();
            	var driverClassName = self.$el.find("#driverClassName").val();
            	var maxActive = self.$el.find("#maxActive").val();
            	var maxWait = self.$el.find("#maxWait").val();
            	var maxIdle = self.$el.find("#maxIdle").val();
            	var minIdle = self.$el.find("#minIdle").val();
            	var initialSize = self.$el.find("#initialSize").val();
            	if (self.model.get('userName') != userName){
            		self.model.set('userName',userName);
            	}
            	if (password != ""){
            		self.model.set('password',password);
            		self.model.set('passwordChanged', true);
            	}
            	if (self.model.get('URL') != URL){
            		self.model.set('URL',URL);
            	}
            	if (self.model.get('driverClassName') != driverClassName){
            		self.model.set('driverClassName',driverClassName);
            	}
            	if (self.model.get('maxActive') != maxActive){
            		self.model.set('maxActive',maxActive);
            	}
            	if (self.model.get('maxWait') != maxWait){
            		self.model.set('maxWait',maxWait);
            	}
            	if (self.model.get('maxIdle') != maxIdle){
            		self.model.set('maxIdle',maxIdle);
            	}
            	if (self.model.get('minIdle') != minIdle){
            		self.model.set('minIdle',minIdle);
            	}
            	if (self.model.get('initialSize') != initialSize){
            		self.model.set('initialSize',initialSize);
            	}
            	self.model.save({groupId: self.groupId}, {'success':function(model, data){
            		if (data.flag){
            			self.model.set("maxActive", maxActive);
            			self.model.set("maxWait", maxWait);
            			self.model.set("maxIdle", maxIdle);
            			self.model.set("minIdle", minIdle);
            			self.model.set("initialSize", initialSize);
            			data.messageList = ["组数据源修改成功。***重启后生效***"];
            		}
            		var globar = new GlobalView({model: data});
    				globar.render();
            	}});
        	}
        	else{
        		var data = {"flag":"false","messageList":"页面参数验证失败"};
        		var global = new GlobalView({model: data});
				global.render();
        	}
        },
        checkUserName: function(){
        	var flag = DataSourceUtil.checkUserName("userName");
        	return flag;
        },
		checkPassword:function(){
			var flag = DataSourceUtil.checkPassWord("password") ;
			return flag;
		},
        checkURL: function(){
        	var flag = DataSourceUtil.checkURL("URL");
        	return flag;
        },
        checkMaxActive: function(){
        	var flag = DataSourceUtil.checkMaxActive("maxActive");
        	return flag;
        },
        checkMaxWait: function(){
        	var flag = DataSourceUtil.checkMaxWait("maxWait");
        	return flag;
        },
        checkMaxIdle: function(){
        	var flag = DataSourceUtil.checkMaxIdle("maxIdle");
        	return flag;
        },
        checkMinIdle: function(){
        	var flag = DataSourceUtil.checkMinIdle("minIdle");
        	return flag;
        },
        checkInitialSize: function(){
        	var flag = DataSourceUtil.checkInitialSize("initialSize");
        	return flag;
        },
        checkForm: function(){
        	if (this.checkUserName()&&this.checkPassword() && this.checkURL() && this.checkMaxActive() && this.checkMaxWait() && 
        			this.checkMaxIdle() && this.checkMinIdle() && this.checkInitialSize()){
        		return true;
        	}
        	return false;
        }
    });
	return GroupDataSourceConfigView;
});