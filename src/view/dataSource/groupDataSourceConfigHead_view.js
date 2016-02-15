define(function(require, exports, module) {
	
	var $ = jQuery = require('jquery');
	var Backbone = require('backbone');
	var _ = require('underscore');
	var QueryString = require('querystring');
	var util = require("../../util/CommonUtil");
	
	var GroupDataSourceNameCollection = require ("../../collection/dataSource/group_dataSource_name_collection");
	
	var GroupDataSourceConfigHeadTemplate = require("../../template/dataSource/groupDataSourceConfigHead.tpl");
	
	var GroupDataSourceConfigHeadView = Backbone.View.extend({
		el: "#content-header",
		
        template:_.template(GroupDataSourceConfigHeadTemplate),
        
        events: {
        	"change #groupDataSourceName": "getConfig"
        },

        initialize: function(options){
        	this.options = options || {};
        	this.model = options.model;
        	this.queryString = options.queryString;
        	this.groupId = options.queryString.groupId;
        	this.dataSourceList = this.getGroupDataSourceList();
        	this.dataSourceList.bind('reset', this.render, this);
        },
        render: function(){
        	this.$el.html(this.template({"dataSourceNameList": this.dataSourceList.toJSON()}));
    		return this;
        },
        getGroupDataSourceList: function(){
			var groupDataSourceNameCollection = new GroupDataSourceNameCollection();
        	groupDataSourceNameCollection.fetch({data: QueryString.stringify(this.options.queryString), reset: true});
			return groupDataSourceNameCollection;
        },
        getConfig: function(){
        	if ($("#groupDataSourceName").val() != ""){
        		this.model.fetch({data:{groupId: this.groupId, dsName: $("#groupDataSourceName").val()}});
        	}
        }
    });
	return GroupDataSourceConfigHeadView;
});