define(function(require, exports, module) {

	var $ = jQuery = require('jquery');
	var Backbone = require('backbone');
	var _ = require('underscore');
	var QueryString = require('querystring');
	var GroupCollection = require("../../collection/group_collection") ;
	var sidebarViewTemplate = require('../../template/service/sidebar.tpl');
	
    var SidebarView = Backbone.View.extend({
        template: _.template(sidebarViewTemplate),
        events: {
        	"click ul li.group span.open_or_closeGroup" : "toggleGroup",
	    },
        initialize: function (options) {
        	this.options = options || {};
        	this.groups = this.getGroups();
            this.current = "";
            this.groups.bind('reset', this.render, this);
        },
        render: function () {
            this.$el.html(this.template({"groups": this.groups.toJSON(), "current": this.current}));
            return this;
        },
        select: function(current){
        	this.current = current;
            this.$el.find('li').removeClass('select');
            if(current != ""){
            	this.$el.find('#'+current).addClass('select');
            }
        },
        getGroups: function(){
        	var gc = new GroupCollection();
        	gc.fetch({reset: true,data:{selectItem:'serviceMgr'}});
        	return gc;
        },
        toggleGroup: function(e){
        	this.$el.find(e.target).toggleClass("groupOpen");
        	this.$el.find(e.target).toggleClass("groupClose");
        	this.$el.find(e.target).parent().siblings().toggleClass("hide");
        }
    });
    return SidebarView;
});
