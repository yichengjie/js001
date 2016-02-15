/**
 * Created with eclipse.
 * User: yichengjie
 * Date: 2014-12-4
 * Time: 下午03:11:31
 * To change this template use File | Settings | File Templates.
 */
define(function(require, exports, module) {
	var $ = jQuery = require('jquery');
	var Backbone = require('backbone');
	var _ = require('underscore');
	var Marionette = require("marionette");
	var pagebarViewTemplate = require('../template/pagebar2.tpl');
	var QueryString = require('querystring');
	var sidbarUtil = require("../util/SidebarUtil") ;
    var PagebarView = Marionette.ItemView.extend({
    	template: _.template(pagebarViewTemplate),
    	initialize:function(options){
    		this.options = options || {};
    		this.listenTo(this.model, 'change', this.render);
    	},
        events: {
	        "click ul.pagination li a.canClick" : "goToPage",
	        "change #pageSize" : "changePageSize" ,
	        "focus #pageSize" : "selectText"
	    },
	    tagName:"div",
	    className:"clearFloat",
	    selectText:function(e){
	    	$(e.target).select() ;
	    },
	    changePageSize:function(){//改变页面的显示条数
	    	var cPageSize  = $.trim($("#pageSize").val()) ;
	    	var reg1 =  /^[0-9]*[1-9][0-9]*$/;
		    if(reg1.test(cPageSize)){
		    	var pageSizeNum = parseInt(cPageSize) ;
		    	this.options.queryString.pageSize = cPageSize ;
		    	this.options.queryString.currentPage = "1" ;
		    	this.refresh(this.options.queryString);
		    }else{
		    	alert("只能输入正整数!") ;
		    }
	    },
        goToPage:function (event){//上一页,下一页,等
	    	var $a = $(event.target) ;
	    	this.options.queryString.pageSize = $("#pageSize").val() ;
	    	this.options.queryString.currentPage = $a.attr("pageNum") ;
	    	this.refresh(this.options.queryString);
        },
        refresh: function(queryString){
            var modelName = sidbarUtil.getModuleName() ;
            var uriSection = this.model.get("uriSection") ;
            var tmpStr = "" ;
            if(uriSection!=undefined&&uriSection!=null&&$.trim(uriSection).length>0){
            	tmpStr = "/" + uriSection;
            }
            appRouter.navigate(modelName +tmpStr+"/param/" + QueryString.stringify(queryString),{trigger:true}) ;
        },
        render:function(){
            this.$el.html(this.template(this.model.attributes));
            return this;
        }
        
    });
    return PagebarView;
});
