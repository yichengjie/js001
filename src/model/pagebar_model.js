/**
 * Created with eclipse.
 * User: yichengjie
 * Date: 2014-11-29
 * Time: 下午03:31:47
 * To change this template use File | Settings | File Templates.
 */
define(function(require, exports, module) {
	var $ = jQuery = require('jquery');
	var Backbone = require('backbone');
	var _ = require('underscore');
	
	var PagebarModel = Backbone.Model.extend({
		defaults: function(){
	        return {
	        	'prePage' :"1",
	        	'nextPage':"1" ,
	            'currentPage': "1",
	            'pageSize': jcfManager.defaultPageSize,
	            'recordCount':"0",
	            'pageCount':"1",
	            'beginPageIndex':'1',
	            'endPageIndex':"1"
	        };
    	},
    	
    	hasNext: function(){
    		return this.get('pageCount') > this.get('currentPage');
    	},
    	
    	hasPrevious: function(){
    		return this.get('currentPage') > 1;
    	}
	});
	return PagebarModel;
});
