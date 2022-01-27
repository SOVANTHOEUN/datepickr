
$(document).ready(function(){
	'use strict';

	/*show layer
	$(".js_click").click(function(e) {
		$(".js_click").not(this).removeClass("on");
		$(".js_click").not(this).next(".js_show").slideUp(300);
		$(this).toggleClass("on");
		$(this).next(".js_show").slideToggle(300);
	});
	//show layer

	/* get text in show layer
	$('.js_show').find('ul > li > a').click(function(){
		var select_text;
		var $this_elem = $(this);
		select_text = $this_elem.text();

		$this_elem.parents('.js_show').siblings('.js_click').text(select_text);
		$this_elem.parents('.js_show').slideUp(300);
		$this_elem.parents('.js_show').siblings('.js_click').removeClass('on');

	});

	$(document).click(function(e) {
		var getThisClass = e.target.className;
		var splitClass = getThisClass.split(' ')[0];


		//hide/show layer
		if(splitClass !="js_click"){
			$(".js_click").removeClass("on");
			$(".js_click").next(".js_show").slideUp(300);
		}

		//hide/show layer
	});*/

});


(function ($){
	/* tabs */
	$.fn.tabs = function( options ) {
		var getthisID = $(this).attr("id");
		$(this).css({"margin-right":"auto","margin-left":"auto"});
		var tablength = $("#"+getthisID+" > .tabs_header > ul > li").length;
		var tabsWidth = $("#"+getthisID+" > .tabs_header").outerWidth()/tablength;

		var slideWidth = $("#"+getthisID+" > .tabs_header").outerWidth();
		var tabbodyWrapWidth = $("#"+getthisID+" > .tabs_body_wrap").outerWidth();
		/* tab = true this function use for tab but if tab = false this function is not use for tab and tab content have only one content */
		var defaults = $.extend({tab:true,animate:true,tabBorderFix:false,tabsWidth:tabsWidth,speed:1000,tabMGT:(tabbodyWrapWidth-slideWidth)/2,fixContent:false}, options );
		if(!defaults.animate){
			$("#"+getthisID+" > .tabs_body_wrap > .tabs_body > div").css("display","none");
			$("#"+getthisID+" > .tabs_body_wrap >.tabs_body > div").eq(0).css("display","block");
		}
		/* resize screen */
		$(window).resize(function(e) {
			slideWidth = $("#"+getthisID+" > .tabs_header").outerWidth();
			tabbodyWrapWidth = $("#"+getthisID+" > .tabs_body_wrap").outerWidth();
			var checkIdexbefore = $("#"+getthisID+" > .tabs_header > ul > li.on").index();
			if(defaults.animate){
				if(defaults.fixContent==false){
					defaults = $.extend({speed:1000,tabMGT:(tabbodyWrapWidth-slideWidth)/2,fixContent:false}, options );
					$("#"+getthisID+" > .tabs_body_wrap > .tabs_body").css({"width":tabbodyInnerWith,"margin-left":-(slideWidth*checkIdexbefore)+defaults.tabMGT});
				}
			}
		});
		/* //resize screen */
		var tabbodyInnerWith = slideWidth*tablength;
		$("#"+getthisID+" > .tabs_body_wrap > .tabs_body").css({"width":defaults.tabsWidth,"margin-left":defaults.tabMGT});
		/* tab header */
		$("#"+getthisID+" > .tabs_header > ul > li").eq(0).addClass("on");
		$("#"+getthisID+" > .tabs_header > ul > li").css("width",defaults.tabsWidth);
		$("#"+getthisID+" > .tabs_header").append("<span class='tab_on_border'></span>");
		//$("#"+getthisID+" .tabs_header .tab_on_border").css("width",tabsWidth);

		var borderPosition = $("#"+getthisID+" > .tabs_header > ul").offset().left - $("#"+getthisID+" .tabs_header").offset().left;
		var borderPosition2 = $("#"+getthisID+" > .tabs_header > ul").offset().left - $("#"+getthisID+" .tabs_header").offset().left;
		$("#"+getthisID).find(".tab_on_border").animate({marginLeft:borderPosition},defaults.speed, function() {});

		$("#"+getthisID+" > .tabs_header > ul > li").click(function(e) {
			var thisIndex = $(this).index();

			//var borderPosition = tabsWidth * thisIndex;
			//alert(defaults.tabBorderFix);
			if(defaults.tabBorderFix){
					var borderPosition = $(this).offset().left - $("#"+getthisID+" > .tabs_header").offset().left;
					$("#"+getthisID+" > .tabs_header .tab_on_border").css("width",$(this).outerWidth() + borderPosition-borderPosition2);
					console.log($(this).outerWidth() + borderPosition-borderPosition2);
				}else{
					$("#"+getthisID+" > .tabs_header .tab_on_border").css("width",$(this).outerWidth());
					var borderPosition = $(this).offset().left - $("#"+getthisID+" > .tabs_header").offset().left;
					$("#"+getthisID).find(".tab_on_border").animate({marginLeft:borderPosition},defaults.speed, function() {});
			}

		});
		/* //tab header */

		/* tab body */
		$("#"+getthisID+" > .tabs_body_wrap > .tabs_body").css({"width":defaults.tabsWidth,"margin-left":defaults.tabMGT});
		if(defaults.fixContent == true){
			$("#"+getthisID+" > .tabs_body_wrap").css({"width":slideWidth});
			$("#"+getthisID+" > .tabs_body_wrap > .tabs_body").css({"margin-left":"0"});
		}
		$("#"+getthisID+" > .tabs_body_wrap > .tabs_body > div").css({"opacity":"0.2",/*"width":slideWidth*/});
		$("#"+getthisID+" > .tabs_body_wrap > .tabs_body > div").eq(0).css("opacity","1");

		$("#"+getthisID+" > .tabs_header > ul > li").click(function(e) {
			$("#"+getthisID+" > .tabs_header > ul > li").removeClass("on");
			$(this).addClass("on");
			var indexOfclik = $(this).index();
			$("#"+getthisID+" > .tabs_body_wrap > .tabs_body > div").css("opacity","0.2");
			$("#"+getthisID+" > .tabs_body_wrap > .tabs_body > div").eq(indexOfclik).css("opacity","1");

			if(defaults.animate){
				if(indexOfclik == 0){
					if(defaults.fixContent == true){
						return $("#"+getthisID).find("> .tabs_body_wrap > .tabs_body").animate({marginLeft:0},defaults.speed, function() {});
					}else{
						return $("#"+getthisID).find("> .tabs_body_wrap > .tabs_body").animate({marginLeft:defaults.tabMGT},defaults.speed, function() {});
					}
				}else{
					if(defaults.fixContent == true){
						return $("#"+getthisID).find("> .tabs_body_wrap > .tabs_body").animate({marginLeft:-((indexOfclik * slideWidth))},defaults.speed, function() {});
					}else{
						return $("#"+getthisID).find("> .tabs_body_wrap > .tabs_body").animate({marginLeft:-((indexOfclik * slideWidth) - defaults.tabMGT)},defaults.speed, function() {});
					}
				}
			}else{
				if(defaults.tab){
					$("#"+getthisID+" > .tabs_body_wrap > .tabs_body > div").css("display","none");
					$("#"+getthisID+" > .tabs_body_wrap > .tabs_body > div").eq(indexOfclik).css("display","block");
				}else{
					$("#"+getthisID+" > .tabs_body_wrap > .tabs_body > div").css("opacity","1");
				}
			}
		});
	};
	/* tabs */
}( jQuery ));
