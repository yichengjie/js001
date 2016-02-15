define(function(require, exports, module) {

	var $ = jQuery = require('jquery');
	var Backbone = require('backbone');
	var _ = require('underscore');
	
	var DataSourceAuthCheckUtil = require('../../util/DataSourceAuthCheckUtil');
	
	var groupDataSourceTabbarViewTemplate = require('../../template/dataSource/groupDataSourceTabbar.tpl');
	
    var GroupDataSourceTabbarView = Backbone.View.extend({
    	el : "#tabbar",
    	
        template: _.template(groupDataSourceTabbarViewTemplate),
        
        events: {
        	
	    },
        initialize: function (options) {
        	this.options = options || {};
        	this.queryString = options.queryString;
        	this.groupId = options.queryString.groupId;
        	this.labels = this.getLabels();
            this.current = options.queryString.selectTab || "groupDataSource";
            this.dataSourceListAuth = DataSourceAuthCheckUtil.getGroupDataSourceListAuth();//组数据源列表
            this.dataSourceDeployAuth = DataSourceAuthCheckUtil.getGroupDataSourceDeployAuth();//组数据源部署
            this.dataSourceConfigAuth = DataSourceAuthCheckUtil.getGroupDataSourceConfigAuth();//组数据源配置
            
        },
        render: function () {
            this.$el.html(this.template({"labels": this.labels, "current": this.current, "groupId": this.groupId, "dataSourceDeployAuth": this.dataSourceDeployAuth,
            	"dataSourceConfigAuth": this.dataSourceConfigAuth, "dataSourceListAuth": this.dataSourceListAuth}));
            return this;
        },
        select: function(current){
        	this.current = current;
            this.$el.find('li').removeClass('active');
            if(current != ""){
            	this.$el.find('#'+current).addClass('active');
            }
        },
        getLabels: function(){
        	return [{"id" : "groupDataSource","name" : "组数据源列表"},
				    {"id" : "groupDeployDataSource","name" : "组数据源部署"},
				    {"id" : "groupDataSourceConfig","name" : "组数据源配置"}
				   ];
        }
    });
    return GroupDataSourceTabbarView;
});
