/**
 * Created with eclipse.
 * User: yichengjie
 * Date: 2014-12-26
 * Time: 下午05:59:26
 * To change this template use File | Settings | File Templates.
 */
define(function(require, exports, module) {
	var $ = jQuery = require('jquery');
	var InputUtil = {
			checkInputFileNameNotContainExt:function(id,maxLength){//文件名不能包含后缀
		    	var flag = this.checkInputMatchMaxLength(id,maxLength) ;
		    	var value = $.trim($("#"+id).val()) ;//
		    	if(flag){
		    		if(value.indexOf(".") > -1){
		    			var errTip = "日志保存路径不能含有后缀名" ;
		    			flag = this.errInput(id, errTip);
		    		}else{
		    			flag = this.successInput(id) ;
		    		}
		    	}
		    	return flag ;
			},
			checkInputMatchRegularCanNull:function(id,maxLength,regular,errTip){//输入框匹配正则，且可为空
				var value = $.trim($("#"+id).val());
				if (value.length==0) { 
					//return this.successInput(id) ;
					this.clearInput(id) ;//没有输入的直接不报错即可
					return true; 
				}else{
					var flag = this.checkMaxLengthValid(id, maxLength) ;
					if(flag){
						flag = this.checkMatchRegular(id, regular, errTip) ;
					}
					return flag ;
				}
			},
			checkInputMatchRegularAndNotNull:function(id,maxLength,regular,errTip){//输入框匹配正则，不能为空
				var flag = this.checkNotNull(id) ;
				if(flag){
					flag = this.checkMaxLengthValid(id, maxLength) ;
				}
				if(flag){
					flag = this.checkMatchRegular(id, regular, errTip) ;
				}
				return flag;
			},
			checkInputMatchPort:function(id){//输入框是否符合端口，且不为空
				var flag = this.checkNotNull(id) ;
				if(flag){
					flag = this.checkIsPositiveInteger(id) ;
				}
				if(flag){
					var $curObj = $("#"+id) ;
					var value = $.trim($curObj.val()) ;
					var portNum = parseInt(value) ;
					if(portNum<1024||portNum>65535){
						var errTip = "端口应为1024~65535之间的数字" ;
						flag = this.errInput(id, errTip) ;
					}else{
						flag = this.successInput(id) ;
					}
				}
				return flag;
			},
			checkInputMatchIP:function(id){//输入框是否满足IP格式，且不能为空
				var flag = this.checkNotNull(id) ;
				if(flag){
					flag = this.checkIsIP(id) ;
				}
				return flag;
			},
			checkInputNotChineseStr:function(id){
				var flag = this.checkNotNull(id) ;
				if(flag){
					var errTip = "不能含有中文字符!" ;
					if(this.checkInputContainChinese(id)){//如果含有中文字符
						flag = this.errInput(id, errTip) ;
					}else{
						this.successInput(id) ;
					}
				}
				return flag; 
			},
			checkStrContainChinese:function(valStr){//判断是否含有中文,如果含有返回:true,否则返回:false//本方法为
				for (var i=0;i<valStr.length ;i++ )
				{
					var temp=valStr.charAt(i);
					if (temp.charCodeAt()>16384 && temp.charCodeAt()<65024)
					{
						return true;
					}
				}
				return false;
			},
			checkInputMatchPositiveIntegerAndMaxLengthCanNull:function(id,maxLength){//正整数长度有限，可为空
				var val = $.trim($("#"+id).val()) ;
				if(val.length==0){
					this.clearInput(id) ;
					return true;
				}else{
					var	flag = this.checkMaxLengthValid(id, maxLength) ;
					if(flag){
						flag = this.checkIsPositiveInteger(id) ;
					}
					return flag;
				}
			},
			checkInputMatchPositiveIntegerAndMaxLength:function(id,maxLength){//正整数且长度有限，且不能为空
				var flag = this.checkNotNull(id) ;
				if(flag){
					flag = this.checkMaxLengthValid(id, maxLength) ;
				}
				if(flag){
					flag = this.checkIsPositiveInteger(id) ;
				}
				return flag;
			},
			checkInputMatchIntegerAndMaxLength:function(id,maxLength){//正数且长度有限，且不能为空
				var flag = this.checkNotNull(id) ;
				if(flag){
					flag = this.checkMaxLengthValid(id, maxLength) ;
				}
				if(flag){
					flag = this.checkInteger(id);
				}
				return flag;
			},
			checkInputMatchInt_MinNum__MaxNum:function(id,minNum,maxNum){//正整数且长度有限，且不能为空//且最大最小值范围
				var flag = this.checkNotNull(id) ;
				if(flag){
					flag = this.checkIsPositiveInteger(id) ;
				}
				if(flag){
					var $curObj = $("#"+id) ;
					var value = $.trim($curObj.val()) ;
					var num = parseInt(value) ;
					if(num>=minNum&&num<=maxNum){
						flag = this.successInput(id) ;
					}else{
						var errTip = "正整数范围["+minNum+"-"+maxNum+"]" ;
						flag = this.errInput(id, errTip) ;
					}
				}
				return flag;
			},
			checkInputMatchNumAndMaxLength:function(id,maxLength){//输入框符合数字，长度有限，且不为空
				var flag = this.checkNotNull(id) ;
				if(flag){
					flag = this.checkMaxLengthValid(id, maxLength) ;
				}
				if(flag){
					flag = this.checkIsNum(id) ;
				}
				return flag;
			},
			checkInputMatchMaxLengthCanNull:function(id,maxLength){//输入框符合最大长度，可为空
				var val = $.trim($("#"+id).val()) ;
				var flag = true;
				if(val.length>0){
					flag = this.checkMaxLengthValid(id, maxLength) ;
				}else{
					this.clearInput(id) ;
				}
				return flag;
			},
			checkInputMatchMaxLength:function(id,maxLength){//输入框符合最大长度，且不为空
				var flag = this.checkNotNull(id) ;
				if(flag){
					flag = this.checkMaxLengthValid(id, maxLength) ;
				}
				return flag;
			},
			checkInputMatchGoodLength:function(id,minLength,maxLength){//输入框符合长度，且不为空
				var flag = this.checkNotNull(id) ;
				if(flag){
					flag = this.checkGoodLengthValid(id, minLength, maxLength) ;
				}
				return flag;
			},
			checkInteger : function (id){//正数校验，可以为0
				var value = $.trim($("#"+id).val()) ;
				var reg1 =  /^\d+$/;
				var flag = reg1.test(value);
				if(flag){
					this.successInput(id) ;
				}else{
					var errTip = "只能输入正数" ;
					this.errInput(id, errTip) ;
				}
				return flag ;
			},
			checkIsPositiveInteger:function(id){
				var $curObj = $("#"+id) ;
				var value = $.trim($curObj.val()) ;
			    var reg1 =  /^[0-9]*[1-9][0-9]*$/;
			    if(!reg1.test(value)){
			    	var errTip = "只能输入正整数" ;
			    	return this.errInput(id, errTip) ;
			    }else{
			    	return this.successInput(id) ;
			    }
			},
			checkIsNum:function(id){
				var $curObj = $("#"+id) ;
				var value = $.trim($curObj.val()) ;
				if(isNaN(value) || value.indexOf(".") > -1){
					var errTip = "只能输入整数" ;
					return this.errInput(id, errTip) ;
				}else{
					return this.successInput(id) ;
				}
			},
			checkIsIP:function(id){
				var regular = /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/;
				var errTip = "IP格式不合法" ;
				var flag = this.checkMatchRegular(id, regular, errTip) ;
				return flag;
			},
			checkGoodString:function(id){
				var $curObj = $("#"+id) ;
				var val = $.trim($curObj.val()) ;
				var regular = "^\\w+$";
				if(!val.match(regular)){
				   var errTip = "含有非法字符(只能含有字母、整数、下划线)" ;
				   return this.errInput(id, errTip) ;
				}else{
					return this.successInput(id) ;
				}
			},
			checkMatchRegular:function(id,regular,errTip){
				var $curObj = $("#"+id) ;
				var val = $.trim($curObj.val()) ;
				if(!val.match(regular)){
				   var errTip = "格式不符合要求("+errTip+")" ;
				   return this.errInput(id, errTip) ;
				}else{
				   return this.successInput(id) ;
				}
			},
			checkGoodLengthValid:function(id,minLength,maxLength){//长度范围内检查,如:[5-10]位
				var $curObj = $("#"+id) ;
				var val = $.trim($curObj.val()) ;
				if(val.length>maxLength){
				   var errTip = "最大允许输入"+maxLength+"位" ;
				   return  this.errInput(id, errTip) ;
				}else if (val.length <minLength){
				   var errTip = "最小允许输入"+minLength+"位" ;
				   return this.errInput(id, errTip) ;
				}else{
					return this.successInput(id) ;
				}
			},
			checkMaxLengthValid:function(id,maxLength){
				var $curObj = $("#"+id) ;
				var val = $.trim($curObj.val()) ;
				if(val.length>maxLength){
				   var errTip = "最大允许输入"+maxLength+"位" ;
				   return this.errInput(id, errTip) ;
				}else{
					return this.successInput(id) ;
				}
			},
			checkNotNull:function (id){
				var $curObj = $("#"+id) ;
				var val = $.trim($curObj.val()) ;
				if(val.length==0){
				   this.errInput(id, "不能为空") ;
				}else{
					return this.successInput(id) ;
				}
			},
			checkStrongPassword:function (id){
				var $curObj = $("#"+id) ;
				var val = $.trim($curObj.val()) ;
				
				var result = false;
			    var str0 	= /[a-z]/g;//小写字母
				var str1 	= /[A-Z]/g;//大写字母
				var num 	= /[0-9]/g;//数字
				var other	= /[\x21-\x2f\x3a-\x40\x5b-\x60\x7b-\x7e]/g;//特殊字符
				var all		= /^[\x21-\x7e]{8,20}$/g;//强密码条件
				
				var i=4;
				if(all.test(val)){
					if(!str0.test(val)) i--;
					if(!str1.test(val)) i--;
					if(!num.test(val)) i--;
					if(!other.test(val)) i--;
					
					if(i>=3){
						return this.successInput(id) ;
					}else{
						return this.errInput(id, "密码应同时包含大小写字母、数字、特殊字符中的至少三种！");
					}
				}

				return this.errInput(id, "密码长度应该为8-20位");
			},
			checkIpAndPortInArray:function(id,array,errTip){
				var $curObj = $("#"+id) ;
				var flag=true;
				var regular= /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5]):([0-9]|[1-9]\d|[1-9]\d{2}|[1-9]\d{3}|[1-5]\d{4}|6[0-4]\d{3}|65[0-4]\d{2}|655[0-2]\d|6553[0-5])$/;
				for (i=0;i<array.length ;i++ ) {
				   if(!array[i].match(regular)){
					   var errTip = "格式不符合要求("+errTip+")" ;
					   return this.errInput(id, errTip) ;
				   }
				} 
				return this.successInput(id) ;
		   },
		   checkEmail:function(id){
			   var $obj = $("#"+id) ;
			   var patten = new RegExp(/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]+$/);
			   var email = $.trim($obj.val()) ;
			   var flag =  patten.test(email);
			   var errTip = "邮箱格式有误" ;
			   if(flag){
				   this.successInput(id) ;
			   }else{
				   this.errInput(id, errTip) ;
			   }
			   return flag ;
		   },
		   errInput:function(id,errTip){
			   var $obj = $("#"+id) ;
			   var $div = $("#"+id+"Div") ;
			   var $tip = $("#"+id+"Tip") ;
			   if($div.hasClass("has-success")){
				   $div.removeClass("has-success") ; 
				   $tip.removeClass("text-success") ;//text-success
			   }
			   if(!$div.hasClass("has-error")){
				   $div.addClass("has-error") ;
				   $tip.addClass("text-danger")
			   }
			   $tip.html(errTip) ;
			   $obj.focus();
			   return false;
		   },
		   successInput:function(id){
			  var $div = $("#"+id+"Div") ;
			  var $tip = $("#"+id+"Tip") ;
			  if($div.hasClass("has-error")){
				  $div.removeClass("has-error") ;
				  $tip.removeClass("text-danger")
			  }
			  if(!$div.hasClass("has-success")){
				  $div.addClass("has-success") ;
				  $tip.addClass("text-success") ;
			  }
			  //$tip.html("输入成功") ;
			  $tip.html("") ;
			  return true;
		   },
		   clearInput:function(id){
			  var $div = $("#"+id+"Div") ;
			  var $tip = $("#"+id+"Tip") ;
			  $div.removeClass("has-error").removeClass("has-success") ;
			  $tip.removeClass("text-danger").removeClass("text-success") ;
			  $tip.html("") ;
		   }
	};
	
	return InputUtil ;

});