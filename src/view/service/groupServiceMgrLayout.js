define(function(require, exports, module) {

	var $ = jQuery = require('jquery');
	var Backbone = require('backbone');
	var _ = require('underscore');
	var Marionette = require("marionette");

	var viewTemplateStr = require('../../template/service/groupServiceMgrLayout.tpl');
	var GroupServiceTabMgr = require("./groupServiceTabServiceMgr");
//	var GroupServiceTabConfig =require("./groupServiceTabConfig") ;

	var util = require("../../util/CommonUtil");
	var QueryString = require('querystring');

	var GroupServiceMgrLayout = Marionette.LayoutView.extend({
		initialize : function(options) {
			this.queryString = options.queryString;
			this.on("showPageInfo", this.showPageInfo);
		},
		template : _.template(viewTemplateStr),
		regions : {
			downContentRegion : "#downContentRegion"
		},
		events : {
			"click #groupServiceMgrNav li a" : "clickNavItem"
		},
		clickNavItem : function(e) {
			e.stopPropagation();
			e.preventDefault();
			var valStr = $(e.target).attr("href");
			var $curLi = $(e.target).parent();
			var $ul = $curLi.parent();
			if (!$curLi.hasClass("active")) {
				$ul.find("li").removeClass("active");
				$curLi.addClass("active");
				this.queryString.selectedPageUI = valStr;
				this.queryString.currentPage = "1";
				appRouter.navigate("serviceMgr/group/param/"+ QueryString.stringify(this.queryString));
				this.showPageInfo();
			}
		},
		showPageInfo : function() {
			var selectItem = this.queryString.selectedPageUI;
			if (selectItem == undefined) {
				selectItem = "showServiceMgrUI";
				this.queryString.selectedPageUI = selectItem;
			}
			var groupId = this.queryString.groupId;
			var paramCategory = this.queryString.category == undefined ? "": this.queryString.category;
			var paramStatus = this.queryString.status == undefined ? "": this.queryString.status;
			var paramAppName = this.queryString.appName == undefined ? "": this.queryString.appName;
			var serverURL = "/" + jcfManager.appName+ "/service/toSearchGroupServiceUI.action";
			var jsonParam = {"groupId" : groupId};
			if ("showServiceMgrUI" == selectItem) {// 服务管理
				var ajaxing = util.dealAjaxRequest4SimpleParam(serverURL,jsonParam);
				var self = this;
				$.when(ajaxing).done(function(data) {
					var model = new Backbone.Model(data);
					model.set("paramCategory", paramCategory);
					model.set("paramStatus", paramStatus);
					model.set("paramAppName", paramAppName);
					model.set("groupId", groupId);
					var layout = new GroupServiceTabMgr({model : model,queryString : self.queryString});
					self.downContentRegion.show(layout);
					layout.trigger("showPageInfo");
				});
			} else if ("configGroupServiceUI" == selectItem) {// 组服务配置
					var ajaxing = util.dealAjaxRequest4SimpleParam(serverURL,jsonParam);
					var self = this;
					$.when(ajaxing).done(function(data) {
						var model = new Backbone.Model(data);
						model.set("paramCategory", paramCategory);
						model.set("paramStatus", paramStatus);
						model.set("paramAppName", paramAppName);
						model.set("groupId", groupId);
						var layout = new GroupServiceTabConfig({
							model : model,
							queryString : self.queryString
						});
						self.downContentRegion.show(layout);
						layout.trigger("showPageInfo");
					});
			}
		}
	});
	return GroupServiceMgrLayout;
});
