
define(function(require, exports, module) {
	var $ = jQuery = require('jquery');
	var Backbone = require('backbone');
	var _ = require('underscore');
	
	var util = require("../../util/CommonUtil");
	
	var appName = util.getAppName();
	
	var GroupDataSourceNameModel = require("../../model/dataSource/group_dataSource_name_model");
	
	var GroupDataSourceNameCollection = Backbone.Collection.extend({
		
		model:GroupDataSourceNameModel,
		
		url:'/'+appName+'/dataSource/getGroupDataSourceNameList.action',
		
		parse : function(response){
			return _.extend(response);
        }
	});
	return GroupDataSourceNameCollection;
});
