define(function(require, exports, module) {
	var $ = jQuery = require('jquery');
	var Backbone = require('backbone');
	var _ = require('underscore');
	
	var util = require("../../util/CommonUtil");
	
	var appName = util.getAppName();
	
	var GroupDataSourceModel = require("../../model/dataSource/group_dataSource_model");
	
	var GroupDataSourceCollection = Backbone.Collection.extend({
		
		model:GroupDataSourceModel,
		
		url:'/'+appName+'/dataSource/groupDataSourceList.action',
		
		parse : function(response){
			return _.extend(response);
        },
        selectAll: function(){
            this.each(function(dataSource){
            	dataSource.set('selected', true);
            });
        },
        clearSelectAll: function(){
            this.each(function(dataSource){
            	dataSource.set('selected', false);
            });
        },
        selectedDataSource: function(){
            return this.filter(function(dataSource){
                return dataSource.isSelected();
            });
        },
        isAllSelected: function(){
            if (this.selectedDataSource().length == 0 ){
                return false;
            }
            return this.selectedDataSource().length == this.length;
        },
        refresh: function(data){
        	this.fetch({data:data, reset: true});
        }
	});
	return GroupDataSourceCollection;
});
