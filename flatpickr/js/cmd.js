$(window).resize(function(e) {
	var offset = $(".container").offset().top;
	var containerHight = $(".container").outerHeight() + $(".footer").outerHeight();
	var totalTOp = containerHight + offset;
	var windowScropp = $(window).outerHeight();
	console.log(windowScropp);
	console.log(offset);
	if(windowScropp < totalTOp){
		$(".footer").addClass("rel_footer");
		$(".footer").removeClass("fix_footer");

	}else{
		$(".footer").addClass("fix_footer");
		$(".footer").removeClass("rel_footer");
		//console.log(1);
	}
});
$(document).ready(function(){
	'use strict';
	if($(window).outerHeight() < $(document).outerHeight()){
		$(".footer").addClass("rel_footer");
		$(".footer").removeClass("fix_footer");
	}else{
		$(".footer").addClass("fix_footer");
		$(".footer").removeClass("rel_footer");
	}


	$(window).scroll(function(){
		/* move fixed header */
		$('.header').css('left', -$(this).scrollLeft() + "px");
		$('.footer.fix_footer').css('left', -$(this).scrollLeft() + "px");
		$('.hotel_srch_wrap').css('left', -$(this).scrollLeft() + "px");

		$('.navi_control').css('left', -$(this).scrollLeft() + "px");
		$('.bookingProcess_footer').css('left', -$(this).scrollLeft() + "px");
		$('.modal2_footer').css('left', -$(this).scrollLeft() + "px");
		$('.modal_header_inner').css('left', -$(this).scrollLeft() + "px");

		/* go to section */
		var windowScrollTop = $(window).scrollTop()+5;
		var thisWith;
		var borderPosition;
		try{
			var cnt0,cnt1,cnt2,cnt3,cnt4,cnt5;
			cnt0 = $(".goTo_section_cnt").eq(0).offset().top;
			cnt1 = $(".goTo_section_cnt").eq(1).offset().top;
			cnt2 = $(".goTo_section_cnt").eq(2).offset().top;
			cnt3 = $(".goTo_section_cnt").eq(3).offset().top;
			cnt4 = $(".goTo_section_cnt").eq(4).offset().top;
			cnt5 = $(".goTo_section_cnt").eq(5).offset().top;
			if(windowScrollTop == cnt0 || windowScrollTop < cnt1){
				thisWith = $(".goTo_section_header ul li").eq(0).outerWidth();
				borderPosition = $(".goTo_section_header ul li").eq(0).offset().left - $(".goTo_section_header > ul").offset().left;
				$(".goTo_section_header ul li").removeClass("on");
				$(".goTo_section_header ul li").eq(0).addClass("on");
			}else if(windowScrollTop == cnt1 || windowScrollTop < cnt2){
				thisWith = $(".goTo_section_header ul li").eq(1).outerWidth();
				borderPosition = $(".goTo_section_header ul li").eq(1).offset().left - $(".goTo_section_header > ul").offset().left;
				$(".goTo_section_header ul li").removeClass("on");
				$(".goTo_section_header ul li").eq(1).addClass("on");
			}else if(windowScrollTop == cnt2 || windowScrollTop < cnt3){
				thisWith = $(".goTo_section_header ul li").eq(2).outerWidth();
				borderPosition = $(".goTo_section_header ul li").eq(2).offset().left - $(".goTo_section_header > ul").offset().left;
				$(".goTo_section_header ul li").removeClass("on");
				$(".goTo_section_header ul li").eq(2).addClass("on");
			}else if(windowScrollTop == cnt3 || windowScrollTop < cnt4){
				thisWith = $(".goTo_section_header ul li").eq(3).outerWidth();
				borderPosition = $(".goTo_section_header ul li").eq(3).offset().left - $(".goTo_section_header > ul").offset().left;
				$(".goTo_section_header ul li").removeClass("on");
				$(".goTo_section_header ul li").eq(3).addClass("on");
			}else if(windowScrollTop == cnt4|| windowScrollTop < cnt5){
				thisWith = $(".goTo_section_header ul li").eq(4).outerWidth();
				borderPosition = $(".goTo_section_header ul li").eq(4).offset().left - $(".goTo_section_header > ul").offset().left;
				$(".goTo_section_header ul li").removeClass("on");
				$(".goTo_section_header ul li").eq(4).addClass("on");
			}else if($(window).scrollTop() + $(window).height() == $(document).height()) {
				//$(".goTo_section_header ul li").removeClass("on");
				//$(".goTo_section_header ul li").eq(5).addClass("on");
			}if($(window).scrollTop() + $(window).height() == $(document).height()) {
				thisWith = $(".goTo_section_header ul li").eq(5).outerWidth();
				borderPosition = $(".goTo_section_header ul li").eq(5).offset().left - $(".goTo_section_header > ul").offset().left;
				$(".goTo_section_header ul li").removeClass("on");
				$(".goTo_section_header ul li").eq(5).addClass("on");
			}
			$(".tab_on_border").animate({marginLeft:borderPosition},0, function() {
				$(".tab_on_border").css("width",thisWith);
			});

		}catch(err){}
		/* //go to section */


		/* check and show gotoTop */
		var windowScrollTop1 = $(window).scrollTop();
		if(windowScrollTop1>0){
			$(".quick_link .ic_goTop").addClass("active");
		}else{
			$(".quick_link .ic_goTop").removeClass("active");
		}
		/* //check and show gotoTop */
	});

	$(document).click(function(e) {
		var getThisClass = e.target.className;
		var splitClass = getThisClass.split(' ')[0];

		/* srch_filter_ly */
		if(splitClass=="btn_filter"){
			$(".srch_filter_ly").slideToggle(300);
			$(".btn_filter").toggleClass("on");
		}else if(splitClass =="js_click_autoComplete_ipt"){
			$(".js_show_autoComplete").slideToggle(300)
		}else{
			$(".btn_filter").removeClass("on");
			$(".srch_filter_ly").slideUp(300);
		}
		/* //srch_filter_ly */

		/* hide/show layer */
		if(splitClass !="js_click"){
			$(".js_click").removeClass("on");
			$(".js_click").next(".js_show").slideUp(300);
		}
		if(splitClass !="js_click_autoComplete_ipt"){
			$(".js_show_autoComplete").slideUp(300);
		}

		if(splitClass =="mCSB_dragger_bar" || splitClass =="mCSB_draggerRail"){
			$('.countryCode_select .seclect_ly').slideDown(300);
		}

		/* (add)20200616 */
		if(splitClass !="js_click_type2" && splitClass !="js_click_type3"){
			$(".js_show_type3").slideUp(300);
		}
		/* //(add)20200616 */

		/* //hide/show layer */
	});

	/* show layer */
	$(".js_click").click(function(e) {
		$(".js_click").not(this).removeClass("on");
		$(".js_click").not(this).next(".js_show").slideUp(300);
		$(this).toggleClass("on");
		$(this).next(".js_show").slideToggle(300);
	});
	/* //show layer */

	/* show layer */
	$(".js_click_type2").click(function(e) {
		//$(".js_click_type2").not(this).removeClass("on");
		//$(".js_click_type2").not(this).next(".js_show_type2").slideUp(300);
		$(this).toggleClass("on");
		$(this).next(".js_show_type2").slideToggle(300);

		if($(this).hasClass('roomReserv_specRequest_trigger')){
			e.stopPropagation();
			var $textArea = $(this).next('.roomReserv_specRequest_bx').find('textarea');
			if($textArea.is(":hidden")){
				$textArea.show();
				$(this).text('숨기기');
			}else{
				$textArea.hide();
				$(this).text('선택/입력');
			}
		}
	});
	/* //show layer */

	$(".srch_filter_ly").click(function(e) {
		e.stopPropagation();
	});

	$('.countryCode_select .seclect_ly').click(function(e){
		e.stopPropagation();
	});

	/* hotel_gallery */
	$(".js_gallery_click, .js_gallery_click img").click(function(e) {
		$(".gallery_slide_wrap").css("display","block");
	});
	$(".btn_gallerySlide_close").click(function(e) {
		$(".gallery_slide_wrap").css("display","none");
	});
	/* //hotel_gallery */

	/* goTo_section */
	$(".goTo_section_header ul li").click(function(e) {
		var thisIndex = $(this).index();
		var thisWith = $(this).find("a").outerWidth();
		var borderPosition = $(this).offset().left - $(".goTo_section_header > ul").offset().left;
		$(".tab_on_border").animate({marginLeft:borderPosition},0, function() {
			$(".tab_on_border").css("width",thisWith);
		});
		$('html, body').animate({
			scrollTop: $(".goTo_section_cnt").eq(thisIndex).offset().top
		}, 500);
	});
	/* //goTo_section */

	/* go to top */
	$(".quick_link .ic_goTop").click(function() {
		$("html, body").animate({ scrollTop: 0 }, "slow");
		return false;
	});
	/* //go to top */

	/* get text in show layer */
	$('.js_show').find('ul > li > a').click(function(){
		var select_text;
		var $this_elem = $(this);
		select_text = $this_elem.text();

		if($this_elem.hasClass('ic_currency_sp')){
			var last_classname_this_elem;
			last_classname_this_elem = $this_elem.attr('class').split(' ')[1];
			$this_elem.parents('.js_show').siblings('.js_click').removeAttr('id');
			$this_elem.parents('.js_show').siblings('.js_click').attr('id',last_classname_this_elem);
			$this_elem.parents('.js_show').siblings('.js_click').text(select_text);
			$this_elem.parents('.js_show').slideUp(300);
		}else if($this_elem.hasClass('ic_lg_spr')){
			var last_classname_this_elem;
			last_classname_this_elem = $this_elem.attr('class').split(' ')[1];
			$this_elem.parents('.js_show').siblings('.js_click').removeAttr('id');
			$this_elem.parents('.js_show').siblings('.js_click').attr('id',last_classname_this_elem);
			$this_elem.parents('.js_show').siblings('.js_click').text(select_text);
			$this_elem.parents('.js_show').slideUp(300);
		}else{
			$this_elem.parents('.js_show').siblings('.js_click').text(select_text);
			$this_elem.parents('.js_show').slideUp(300);
		}
	});

	$('.js_show_autoComplete').find('ul > li > a').click(function(){
		var select_text;
		var $this_elem = $(this);
		select_text = $this_elem.text();

		$this_elem.parents('.js_show_autoComplete').siblings('.ipt_srch').find('.js_click_autoComplete_ipt').val(select_text);
		$this_elem.parents('.js_show_autoComplete').slideUp(300);
	});
	/* //get text in show layer */

	$('.goog-menu .goog-menuitem').click(function(){
		var $this_elem = $(this);
		var country_code = $this_elem.find('.i18n-phone-select-country-code').text();
		$this_elem.parents('.js_show').siblings('.js_click').text(country_code);
		$this_elem.parents('.js_show').slideUp(300);
	});


	/* (add)20200616 */
	$(".btn_showRoomReserv").click(function() {
		$(this).toggleClass("on");
		$(this).parents(".tit_wrap").next().toggle();
	});

	$(".js_click_type3").click(function() {
		$(".js_click_type3").not(this).removeClass("on");
		$(".js_click_type3").not(this).next(".js_show_type3").slideUp(200);
		$(this).toggleClass("on");
		$(this).next(".js_show_type3").slideToggle(200);
	});
	/* //(add)20200616 */

});

!function(a) {
	a.fn.freshslider = function(b){
	var c = this,
	d = "undefined" == typeof b.range ? !1 : b.range,
	e = !d,
	f = b.min || 0,
	g = b.max || 199,
	h = g - f,
	i = b.step || 1,
	j = b.unit || "",
	k = "undefined" == typeof b.enabled ? !0 : b.enabled,
	l = [0, 1],
	m = "undefined" == typeof b.text ? !0 : b.text,
	n = null;
	if (0 > h) throw new Error;
	var o = function(a) {
	return a && "[object Function]" == Object.prototype.toString.call(a)
	},
	p = null;
	o(b.onchange) === !0 && (p = b.onchange);
	var q = "" + i,
	r = 0;
	q.indexOf(".") >= 0 && (r = q.length - q.indexOf(".") - 1),
	b.hasOwnProperty("value") ? e ? l[1] = (b.value - f) / h : b.value.length && 2 == b.value.length && (l[0] = (b.value[0] - f) / h, l[1] = (b.value[1] - f) / h) : e && (l[1] = .5),
	n = d ? this.html("<div class='fsslider'><div class='fsfull_value'></div><div class='fssel_value'></div><div class='fscaret fss_start'></div><div class='fscaret fss_end'></div></div>").find(".fsslider") : this.html("<div class='fsslider'><div class='fsfull_value'></div><div class='fssel_value'></div><div class='fscaret'></div></div>").find(".fsslider");
	var s = a(this.find(".fscaret")[0]),
	t = e ? s : a(this.find(".fscaret")[1]),
	u = this.find(".fssel_value"),
	v = function(a) {
	return i * Math.round(a / i)
	},
	w = function() {
	m && (t.text((v(l[1] * h) + f).toFixed(r) + j), e || s.text((v(l[0] * h) + f).toFixed(r) + j));
	var a = c.width(),
	b = s.outerWidth(),
	d = t.outerWidth(),
	g = a - (b + d) / 2;
	u.css({
	left: l[0] * a,
	width: (l[1] - l[0]) * a
	}), s.css({
	left: l[0] * g + b / 2,
	"margin-left": -(b / 2),
	"z-index": x ? 0 : 1
	}), t.css({
	left: l[1] * g + d / 2,
	"margin-left": -(d / 2),
	"z-index": x ? 1 : 0
	}), p && (e ? p(v(l[1] * h) + f) : p(v(l[0] * h) + f, v(l[1] * h) + f,x))
	},
	x = !0,
	y = !1;
	this.mousedown(function(a) {
	if (k) {
	y = !0;
	var b = c.width(),
	d = s.outerWidth(),
	f = t.outerWidth(),
	g = b - (d + f) / 2,
	h = a.target,
	i = h.className,
	j = a.pageX - c.offset().left,
	m = j - d / 2;

	if (m = 0 > m ? 0 : m > g ? g : m, e) l[1] = m / g, x = !0;
	else switch (i) {
	case "fscaret fss_start":
	x = !1, l[0] = m / g;


	break;
	case "fscaret fss_end":
	x = !0, l[1] = m / g;


	break;
	default:
	m < (l[0] + l[1]) / 2 * g ? (x = !1, l[0] = m / g) : (x = !0, l[1] = m / g)
	}
	return w(), event.preventDefault ? void event.preventDefault() : !1
	}
	});
	var z = function() {
	k && (y = !1, l[1] = v(l[1] * h) / h, e || (l[0] = v(l[0] * h) / h), w())
	};
	return a(document).mouseup(function() {
	y && z()
	}), this.mousemove(function(a) {
	if (k) {
	if (y) {
	var b = c.width(),
	d = s.outerWidth(),
	f = t.outerWidth(),
	g = b - (d + f) / 2,
	h = a.target,
	i = (h.className, a.pageX - c.offset().left),
	j = i - d / 2;
	j = 0 > j ? 0 : j > g ? g : j, e ? (l[1] = j / g, x = !0) : x ? (l[1] = j / g, l[1] < l[0] && (l[1] = l[0])) : (l[0] = j / g, l[0] > l[1] && (l[0] = l[1])), w()
	}
	return event.preventDefault ? void event.preventDefault() : !1
	}
	}), this.getValue = function() {
	return e ? [l[1] * h + f] : [l[0] * h + f, l[1] * h + f]
	}, this.setValue = function() {
	e ? (l[1] = (arguments[0] - f) / h, w()) : arguments.length >= 2 && (l[0] = (arguments[0] - f) / h, l[1] = (arguments[1] - f) / h, w())
	}, this.setEnabled = function(a) {
	k = "undefined" == typeof a ? !0 : a, k ? n.removeClass("fsdisabled") : n.addClass("fsdisabled")
	}, this.setEnabled(k), w(), this
	}

}(jQuery);

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
		$("#"+getthisID+" > .tabs_body_wrap > .tabs_body").css({"width":tabbodyInnerWith,"margin-left":defaults.tabMGT});
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
		$("#"+getthisID+" > .tabs_body_wrap > .tabs_body").css({"width":tabbodyInnerWith,"margin-left":defaults.tabMGT});
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
