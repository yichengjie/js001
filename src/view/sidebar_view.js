/**
 * Created with eclipse.
 * User: yichengjie
 * Date: 2014-12-3
 * Time: 上午10:34:12
 * To change this template use File | Settings | File Templates.
 */
define(function(require, exports, module) {

	var $ = jQuery = require('jquery');
	var Backbone = require('backbone');
	var _ = require('underscore');
	var QueryString = require('querystring');
	var navbarViewTemplate = require('../template/sidebar.tpl');
	var GroupCollection = require("../collection/group_collection") ;
	
	var SidebarUitl = require("../util/SidebarUtil") ;
	
    var SidebarView = Backbone.View.extend({
        //el: $('#MySidebarIndexDiv'),
    	tagName:"div",
//    	className:"well sidebar-nav",
        template: _.template(navbarViewTemplate),
        initialize: function () {
    		//this.groupCollection = new GroupCollection() ;
    		//this.listenTo(this.groupCollection, 'reset', this.render);
        },
        render: function () {
            this.$el.html(this.template({"groups":this.collection.toJSON()}));
            return this;
        },
        events: {
	        "click ul li.group span.open_or_closeGroup" : "open_or_closeGroup",
	        "click ul li.group a.groupName" : "clickGroup",
	        "click ul li.server a" : "clickServer"
	    },
        open_or_closeGroup:function (event){
	    	event.stopPropagation();
			var $clickSpan = $(event.target) ;
			var $curli = $clickSpan.parent() ;
			var curIconIsOpen = $clickSpan.hasClass("groupOpen") ;
			var $ul = $curli.parent(".nav-list") ;
			var groupRemoveClass = "groupClose" ;
			var groupAddClass = "groupOpen" ;
			var liRemoveClass = "notShow" ;
			var liAddClass = "show" ;
			if(curIconIsOpen){
				groupRemoveClass = "groupOpen" ;
				groupAddClass = "groupClose" ;
				liRemoveClass = "show" ;
				liAddClass = "hide" ;
			}
			$clickSpan.removeClass(groupRemoveClass).addClass(groupAddClass) ;
			$ul.find("li").not(".nav-header").each(function(){
				$(this).removeClass(liRemoveClass).addClass(liAddClass) ;
			}) ;
			return false;
		},
		clickGroup :function(event){
			event.stopPropagation();
			var navItem = SidebarUitl.getModuleName() ;
			var groupId = $(event.target).attr("myid") ;
			if(navItem==null){
				alert("页面获取的hash值无效!") ;
			}else{
				if("authMgr"==navItem){
					window.appRouter.navigate("authMgr/"+groupId, {trigger: true});
				}
				else{//除了权限管理静态模块以外的其他模块
					window.appRouter.navigate(navItem+"/group/param/groupId="+groupId, {trigger: true});
				}
			}
		},
		clickServer :function (event){
			var serverId = $(event.target).attr("myid") ;
			var navItem = SidebarUitl.getModuleName() ;
			if(navItem==null){
				alert("页面获取的hash值无效!") ;
			}else{
				window.appRouter.navigate(navItem+"/server/param/serverId="+serverId, {trigger: true});
			}
			var $curLi = $(event.target).parent() ;
			var $uls = $curLi.parent("ul").parent("div").find("ul") ;
			$uls.find("li.server").removeClass("active") ;
			$curLi.addClass("active") ;
			window.appRouter.navigate(navItem+"/server/param/serverId="+serverId, {trigger: true});
		}
		
    });

    return SidebarView;

});
