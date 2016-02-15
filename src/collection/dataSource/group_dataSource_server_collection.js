define(function(require, exports, module) {
	var $ = jQuery = require('jquery');
	var Backbone = require('backbone');
	var _ = require('underscore');
	
	var util = require("../../util/CommonUtil");
	
	var appName = util.getAppName();
	
	var GroupDataSourceModel = require("../../model/dataSource/group_dataSource_server_model");
	
	var GroupDataSourceCollection = Backbone.Collection.extend({
		
		model:GroupDataSourceModel,
		
		url:'/'+appName+'/dataSource/searchAllServerByGroup.action',
		
		parse : function(response){
			this.flag = response.flag;
			this.serverList = response.serverList;
			return _.extend(response.serverList);
        },
        selectAll: function(){
            this.each(function(server){
            	server.set('selected', true);
            });
        },
        clearSelectAll: function(){
            this.each(function(server){
            	server.set('selected', false);
            });
        },
        selectedServer: function(){
            return this.filter(function(server){
                return server.isSelected();
            });
        },
        isAllSelected: function(){
            if (this.selectedServer().length == 0 ){
                return false;
            }
            return this.selectedServer().length == this.length;
        }
	});
	return GroupDataSourceCollection;
});
