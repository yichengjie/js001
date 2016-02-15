define(function(require, exports, module) {
	var $ = jQuery = require('jquery');
	var Backbone = require('backbone');
	var _ = require('underscore');
	var highcharts = require('highcharts');
	var exporting = require('exporting');
	
	var ContainerTemplate = require("../../template/context/highchart.tpl");
	
	var ContainerView = Backbone.View.extend({
		el: "#content-body",
		
		template: _.template(ContainerTemplate),
		
		initialize: function(){
			this.render();
		},
		
		render : function(){
			this.$el.html(this.template());
			var chart; 
			$(function() {     
				chart = new Highcharts.Chart({
			         chart: {             
			         		renderTo: 'content-body', //图表放置的容器，DIV             
			         		defaultSeriesType: 'spline', //图表类型为曲线图             
			         		events: {                 
			         			load: function() {                      
			         				var series = this.series[0];                     
			         				//每隔5秒钟，图表更新一次，y数据值在0-100之间的随机数                     
			         				setInterval(function() {                         
			         					var x = (new Date()).getTime(), // 当前时间                         
			         					y = Math.random()*100;                          
			         					series.addPoint([x, y], true, true);                     
			         				},5000);                 
			         			}             
			         		}         
			         	},         
			         	title: {             
			         		text: 'CPU使用记录走势图'  //图表标题         
			         	},         
			         	xAxis: { //设置X轴             
			         		type: 'datetime',  //X轴为日期时间类型             
			         		tickPixelInterval: 150  //X轴标签间隔         
			         	},         
			         	yAxis: { //设置Y轴             
			         		title: '',             
			         		max: 100, //Y轴最大值             
			         		min: 0  //Y轴最小值         
			         	},         
			         	tooltip: {//当鼠标悬置数据点时的提示框             
			         		formatter: function() { //格式化提示信息                 
			         			return 'CPU使用率'+ Highcharts.dateFormat('%H:%M:%S', this.x) +''+ Highcharts.numberFormat(this.y, 2)+'%';             
			         		}         
			         	},         
			         	legend: {             
			         		enabled: false  //设置图例不可见         
			         	},         
			         	exporting: {             
			         		enabled: false  //设置导出按钮不可用         
			         	},         
			         	credits: {             
			         		text: 'JCF Domain Info', //设置LOGO区文字             
			         		url: '#' //设置LOGO链接地址         
			         	},         
			         	series: [{             
			         		data: (function() { //设置默认数据，                 
			         		var data = [],                 
			         		time = (new Date()).getTime(),                 
			         		i;                  
			         		for (i = -19; i <= 0; i++) {                     
			         			data.push({                         
			         				x: time + i * 5000,                          
			         				y: Math.random()*100                     
			         			});                 
			         		}   
			         		return data;             
			         	})()         
			        }]     
			     }); 
			  }); 
			return this;
		}
	});
	return ContainerView;
});