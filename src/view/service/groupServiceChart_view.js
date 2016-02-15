define(function(require, exports, module) {
	var $ = jQuery = require('jquery');
	var Backbone = require('backbone');
	var _ = require('underscore');
	var util = require("../../util/CommonUtil") ;
	var highcharts = require('highcharts');
	var Marionette = require("marionette");
	var QueryString = require('querystring');
	var ContainerTemplate = require("../../template/service/groupServiceChart_view.tpl");
	require("bs-modal")($) ;
	
	var ContainerView =  Marionette.ItemView.extend({
		template: _.template(ContainerTemplate),
		events:{
			   "click #backBtn" :"toBackPage"
			},
		initialize: function(){
		},
		onShow:function(){
			if(this.model.get('dataType') == '1'){
				this.showRealPageInfo() ;
			}else{
				this.showHistoryPageInfo() ;
			}
		},
		toBackPage:function(){		
//			var jString = {"groupId":this.model.get("groupId")};
//			appRouter.navigate("serviceMgr/group/param/" + QueryString.stringify(jString),{trigger:true}) ;
			window.history.back() ;
		},
		refreshChart:function(self){
			var ttt = self.autoFreshPageTTT ;
			var curHash = window.location.hash ;
			var oldUrl  = self.oldUrl ;
			if(oldUrl==curHash){//刷新页面
			   self.directUpdate(self) ;
			}else{//结束自动刷新
				window.clearInterval(ttt)  ;
			}
			
		},
		directUpdate:function(self){
			var series;
			var series1;
			var series2;
			var series3;
			var jsParam = {} ;
			var serverURL = "/"+jcfManager.appName+"/service/chartGroupCurrentData.action" ;
			jsParam.serviceName = self.model.get('serviceName');
			jsParam.serverNames = self.model.get('serverNames');
			jsParam.disposeType = self.model.get('disposeType');
			jsParam.appVersion = self.model.get('appVersion');
			jsParam.time = self.model.get('lastTime');
			var ajaxing = util.dealAjaxRequest4JSObj(serverURL,jsParam) ;
			if(self.model.get('disposeType') == '1'){
				series = self.series[0]; 
				series1 = self.series[1];
				$.when(ajaxing).done(function(data){
					if(data.flag != 'error' ){
						self.model.set('lastTime',data.lastTime);
						series.addPoint([data.averageBTime[0].x, data.averageBTime[0].y], true, true);
						series1.addPoint([data.maxBTime[0].x, data.maxBTime[0].y], true, true);
					}
				 }) ;
			}else{
				series = self.series[0]; 
				series1 = self.series[1];
				series2 = self.series[2]; 
				series3 = self.series[3];
				$.when(ajaxing).done(function(data){
					if(data.flag != 'error' ){
						self.model.set('lastTime',data.lastTime);
						series.addPoint([data.totalTPU[0].x, data.totalTPU[0].y], true, true);
						series1.addPoint([data.succTPU[0].x, data.succTPU[0].y], true, true);
						series2.addPoint([data.sysFailTPU[0].x, data.sysFailTPU[0].y], true, true);
						series3.addPoint([data.failTPU[0].x, data.failTPU[0].y], true, true);
					}
				 }) ;
				
			}
		},

		showRealPageInfo:function(){
			var chart; 
			var titles = this.model.get('serviceName') + '服务-实时数据记录';
			var text ;
			var self = this ;
			if(this.model.get('disposeType') == '1'){
				text = '处理时间';
			}else{
				text = '处理结果';
			}
				chart = new Highcharts.Chart({
			         chart: {
					//		backgroundColor:"#EAF7FF",//图表背景色            
							borderRadius:1,//图表边框圆角角度                   
							shadow:false,//是否设置阴影            
							zoomType : 'x', //x轴方向可以缩放 ,可以为x,y,xy之一
							reflow:true,//当窗口大小改变的时候，自适应div大小,默认为true(自适应)
			         		renderTo: 'charts', //图表放置的容器，DIV             
			         		defaultSeriesType: 'spline', //图表类型为曲线图 
			         		marginBottom: 35,
			         		events: {                 
			         			load: function() {
									self.series = this.series;
									var curHash = window.location.hash ;
									self.oldUrl = curHash;
				         			//每隔5秒钟，图表更新一次，y数据值在0-100之间的随机数                     
									var ttt = setInterval(self.refreshChart,5000,self);
									self.autoFreshPageTTT = ttt ;
			         			}             
			         		}         
			         	},         
			         	title: {             
			         		text: titles  //图表标题         
			         	},
			         	subtitle : {
							text : text //副标题 
						},
			         	xAxis: { //设置X轴             
			         		type: 'datetime',  //X轴为日期时间类型  
			         		dateTimeLabelFormats: {
								second: '%H:%M:%S'
			                },
			         		tickPixelInterval: 100  //X轴标签间隔         
			         	},         
			         	yAxis: { //设置Y轴             
			         		title: '',                        
			         		min: 0  //Y轴最小值         
			         	},         
			         	tooltip: {//当鼠标悬置数据点时的提示框             
			         		formatter: function() { //格式化提示信息                 
			         			return Highcharts.numberFormat(this.y, 2) + '   ' + Highcharts.dateFormat('%H:%M:%S', this.x);             
			         		}         
			         	},         
			         	legend : { //图例 
							enabled : true,//设置图例不可见 
							layout : 'horizontal', //图例显示的样式：水平（horizontal）/垂直（vertical） 
							backgroundColor : '#ffc', //图例背景色 
							align : 'left', //图例水平对齐方式 
							verticalAlign : 'top', //图例垂直对齐方式 
							x : 65, //相对X位移 
							y : 70, //相对Y位移 
							borderWidth:0,
							floating : true, //设置可浮动 
							shadow : true //设置阴影 
						},       
			         	exporting: {             
			         		enabled: false  //设置导出按钮不可用         
			         	},         
			         	credits: {             
			         		text: 'JCF Domain Info', //设置LOGO区文字             
			         		url: '#' //设置LOGO链接地址         
			         	},         
			         	series:   this.paraData() 
			     }); 
		},
		showHistoryPageInfo:function(){
			var chart;
			var titles = this.model.get('serviceName') + '服务-历史数据记录';
			var text ; 
			if(this.model.get('disposeType') == '1'){
				text = '处理时间';
			}else{
				text = '处理结果';
			}
			chart = new Highcharts.Chart( {
				chart : {
				//	backgroundColor:"#EAF7FF",//图表背景色            
					borderRadius:1,//图表边框圆角角度                    
					shadow:false,//是否设置阴影            
					zoomType : 'x', //x轴方向可以缩放 ,可以为x,y,xy之一
					renderTo : 'charts', //图表放置的容器，DIV 
					defaultSeriesType : 'spline', 
					//图表类型line(折线图), bar(柱状图),spline(曲线图), area(区域图), areaspline(区域曲线图), column(柱状图), 
					//scatter(散点图),pie(饼图),gauge(测量图，需要highcharts-more.js的支持)
					inverted:false,//是否倒置轴，使得x轴时垂直的y轴是水平的 true/false
					reflow:true,//当窗口大小改变的时候，自适应div大小,默认为true(自适应)
					marginBottom: 35
				},
				credits : {
					enabled : false,//右下角不显示LOGO
					text : 'JCF Domain Info', //设置LOGO区文字 
					url : '#' //设置LOGO链接地址 
				},
				title : {
					text : titles, //图表标题 
					x: 0, //标题位置定位
					y:10
				},
				subtitle : {
					text : text //副标题 
				},
				xAxis : { //x轴 
					categories : [ '2015.3.21 10:32:21', '2015.3.21 10:32:21', '2015.3.21 10:32:21', '2015.3.21 10:32:21', '2015.3.21 10:32:21',
					               '2015.3.21 10:32:21', '2015.3.21 10:32:21', '2015.3.21 10:32:21','2015.3.21 10:32:21', '2015.3.21 10:32:21', 
					               '2015.3.21 10:32:21', '2015.3.21 10:32:21' ], //x轴标签名称 
					gridLineWidth : 1, //设置网格宽度为1  
					labels : {
						y : 15
					}
				//x轴标签位置：距X轴下方26像素 
				},
				yAxis : { //y轴 
					title: '', 
					min:0//Y轴最小值
				},
				plotOptions : { //设置数据点 
					line : {
						dataLabels : {
							enabled : true
						//在数据点上显示对应的数据值 
						},
						enableMouseTracking : true
					//取消鼠标滑向触发提示框 
					}
				},
				tooltip : {//当鼠标悬置数据点时的提示框 
					formatter : function() { //格式化提示信息 
						return Highcharts.numberFormat(this.y, 2);
					}
				},
				legend : { //图例 
					enabled : true,//设置图例不可见 
					layout : 'horizontal', //图例显示的样式：水平（horizontal）/垂直（vertical） 
					backgroundColor : '#ffc', //图例背景色 
					align : 'left', //图例水平对齐方式 
					verticalAlign : 'top', //图例垂直对齐方式 
					x : 65, //相对X位移 
					y : 70, //相对Y位移 
					borderWidth:0,
					floating : true, //设置可浮动 
					shadow : true //设置阴影 
				},
				exporting : {
					enabled : false
				//设置导出按钮不可用 
				},				
				series : [
						{ //数据列 
							name : '总处理数',
							data : [ 21.3, 12.2, 4.5, 13.1, 19.8, 24.0, 25.8, 24.4,
									19.3, 12.4, 4.1, 18.2 ]
						},
						{
							name : '成功处理数',
							data : [ 13.3, 14.4, 17.7, 21.9, 24.6, 27.2, 30.8,
									32.1, 27.2, 23.7, 21.3, 15.6 ]
						},
						{
							name : '失败处理数',
							data : [ 10.3, 11.4, 13.7, 22.9, 24.6, 37.2, 35.8,
									32.1, 29.2, 21.7, 11.3, 5.6 ]
						},
						{
							name : '系统失败处理数',
							data : [ 12.3, 15.4, 17.7, 22.9, 23.6, 27.2, 35.8,
									32.1, 24.2, 21.7, 10.3, 9.6 ]
						} ]
			});
		},
		paraData:function(){
			var d = [];
			if(this.model.get('disposeType') == '1'){
				var d = [
				         {        
				        	name: '平均处理时间',
				        	data:  this.model.get('averageBTime')        
				        },
				        {   
				        	name: '最大处理时间',
			         		data: this.model.get('maxBTime')         
		        }];
			}else{
				var d = [
				         {        
				        	name: '单位时间内总的处理数',
				         	data:  this.model.get('totalTPU')        
				        },
				        {   
				        	name: '单位时间内成功的处理数',
			         		data: this.model.get('succTPU') 
				        },
			         	{        
				        	name: '单位时间内系统总的失败处理数',
				         	data:  this.model.get('sysFailTPU')        
				        },
				        {   
				        	name: '单位时间内失败的处理数',
			         		data: this.model.get('failTPU')
		        }];
			}
			
		
			return d;
		}
	});
	return ContainerView;
});