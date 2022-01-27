function fnCreateElementWithClassAndAppend(selector, typeOfElement, className){
    return $(selector).append($(document.createElement(typeOfElement)).addClass(className));
}

var fromTo = ["From", "To"];

var datePicker = {

    type: 0,
    
	today : new Date(),
    fromDate: 0,
    toDate: 0,
    oneDayInMillisec: 1000 * 60 * 60 * 24,
    
    minDate: 0,
    maxDate: 0,
    startMonth: 0,
    startYear: 0,
    
    // 해당하는 달의 마지막 날을 얻어오는 함수.
    getLastDate: function(year, month){
        return new Date(year, month, 0).getDate();
    },
    
    // 자리수에 맞춰 앞에 0을 채우는 함수.
    fillZero: function(number){
        if (number < 10) {
            return "0" + number;
        }
        else {
            return number;
        }
    },
    
    _printFromDate: function(fromYear, fromMonth, fromDate){
        $("#yearFrom").text(fromYear);
        $("#dateFrom .month").text(fillZero((fromMonth)));
        $("#dateFrom .day").text(fillZero(fromDate));
    },
    
    printFromDate: function(){
        $("#yearFrom").text(datePicker.fromDate.getFullYear());
        $("#dateFrom .month").text(datePicker.fillZero((datePicker.fromDate.getMonth() + 1)));
        $("#dateFrom .day").text(datePicker.fillZero(datePicker.fromDate.getDate()));
    },
    
    
    _printToDate: function(toYear, toMonth, toDate){
        $("#yearTo").text(toYear);
        $("#dateTo .month").text(fillZero((toMonth)));
        $("#dateTo .day").text(fillZero(toDate));
    },
    
    printToDate: function(){
        $("#yearTo").text(datePicker.toDate.getFullYear());
        $("#dateTo .month").text(datePicker.fillZero((datePicker.toDate.getMonth() + 1)));
        $("#dateTo .day").text(datePicker.fillZero(datePicker.toDate.getDate()));
    },
    
    // datepicker의 날짜 부분에 날짜를 출력하는 함수.
    _printDate: function(fromYear, fromMonth, fromDate, toYear, toMonth, toDate){
        printFromDate(fromYear, fromMonth, fromDate);
        printToDate(toYear, toMonth, toDate);
        
    },
    
    printDate: function(){
        datePicker.printFromDate();
        datePicker.printToDate();
    },
    
    //datepicker의 전체적인 출력을 담당하는 함수.
    showDate: function(){
        var fromMonth = -1;
        var toMonth = -1;
        $(".monthSelector .msTable td").each(function(index){
            if ($(this).hasClass('ui-selecting') || $(this).hasClass('ui-selected')) {
                if (fromMonth == -1) {
                    fromMonth = datePicker.startMonth + index - 1;
                }
                toMonth = datePicker.startMonth + index - 1;
                
                // index는 무조건 순서대로 들어오기 때문에 from과 to가 바뀔 일은 없다.                
                //                if (fromMonth > toMonth) {
                //                    var temp = fromMonth;
                //                    fromMonth = toMonth;
                //                    toMonth = temp;
                //                }
            }
        });
        
        if (fromMonth != -1) {
            // 이전 선택 날짜에서 연도가 바뀌는 경우
            if ((datePicker.fromDate.getMonth() < datePicker.startMonth - 1) && fromMonth >= datePicker.startMonth - 1) {
                datePicker.fromDate.setFullYear(fromDate.getFullYear() - 1, fromMonth, 1);
            }
            else 
                if (datePicker.fromDate.getMonth() >= datePicker.startMonth - 1 && fromMonth < datePicker.startMonth - 1) {
                    datePicker.fromDate.setFullYear(datePicker.fromDate.getFullYear() + 1, fromMonth, 1);
                }
                else {
                    datePicker.fromDate.setFullYear(datePicker.fromDate.getFullYear(), fromMonth, 1);
                }
            
        }
        
        if (toMonth != -1) {
        
            if ((datePicker.toDate.getMonth() < datePicker.startMonth - 1) && toMonth >= datePicker.startMonth - 1) {
                datePicker.toDate.setFullYear(toDate.getFullYear() - 1, toMonth, datePicker.getLastDate(toDate.getYear() - 1, toMonth + 1));
            }
            else 
                if (datePicker.toDate.getMonth() >= datePicker.startMonth - 1 && toMonth < datePicker.startMonth - 1) {
                    datePicker.toDate.setFullYear(datePicker.toDate.getFullYear() + 1, toMonth, datePicker.getLastDate(datePicker.toDate.getYear() + 1, toMonth + 1));
                }
                else {
                    datePicker.toDate.setFullYear(datePicker.toDate.getFullYear(), toMonth, datePicker.getLastDate(datePicker.toDate.getYear(), toMonth + 1));
                }
            
        }
        
        datePicker.printDate();
        //printDate(fromDate.getYear(), fromMonth, 1, toYear, toMonth, getLastDate(toYear, toMonth));
    
    },
    
    setStartMonth: function(start){
    
        $("div.dpYearDisplay").addClass("type" + start);
        
        var curMonth = start;
        $(".monthSelector .msTable td").each(function(index){
            if (curMonth > 12) {
                curMonth = 1;
            }
            if (curMonth > 9) {
                $(this).addClass("long")
            }
            if (curMonth == 1) {
                $(this).addClass("first")
            }
            if (datePicker.type == 1) {
                $(this).text(curMonth++);
            }
            else 
                if (datePicker.type == 2) {
                    $(this).addClass('month_' + curMonth++);
                }
        });
    },
    
    fnShowCalendar: function(fromTo){
        if (fromTo == "To") {
            if ($("#dateFrom").hasClass('selected')) {
                datePicker.fnHideCalendar("From");
            }
            $("#dpCal" + fromTo).datepicker('setDate', datePicker.toDate);
            
        }
        else 
            if (fromTo == "From") {
                if ($("#dateTo").hasClass('selected')) {
                    datePicker.fnHideCalendar("To");
                }
                $("#dpCal" + fromTo).datepicker('setDate', datePicker.fromDate);
            }
        $("#date" + fromTo).addClass('selected');
        var position = $("#date" + fromTo).position();
        $("#dpCal" + fromTo).fadeIn(300);
        $("#dpCal" + fromTo).css("left", position.left - 50);
    },
    
    fnHideCalendar: function(fromTo){
        $("#date" + fromTo).removeClass('selected');
        $("#dpCal" + fromTo).fadeOut(300);
    },
    
    fnToggleCalendar: function(event){
        if ($("#date" + event.data.fromTo).hasClass('selected')) {
            datePicker.fnHideCalendar(event.data.fromTo);
        }
        else {
            datePicker.fnShowCalendar(event.data.fromTo);
        }
    },
    
    getFromDate: function(){
        return datePicker.fromDate;
        
    },
    getToDate: function(){
        return datePicker.toDate;
        
    },
    fnRequestData: function(){
        
    },
    
    fnSetMonthSelector: function(){
        var startSelected = datePicker.fromDate.getMonth() + 1 - datePicker.startMonth;
        var endSelected = datePicker.toDate.getMonth() + 1 - datePicker.startMonth;
        
        if (startSelected < 0) {
            startSelected += 12;
        }
        
        if (endSelected < 0) {
            endSelected += 12;
        }
        
        for (var i = 0; i < 12; i++) {
            if (startSelected <= i && i <= endSelected) {
                $('.monthSelector .msTable tr td:eq(' + i + ')').addClass('ui-selected');
            }
            else {
                $('.monthSelector .msTable tr td:eq(' + i + ')').removeClass('ui-selected');
            }
        }
    },
    
    /* 함수 선언 끝 */
    
    createHtml: function(type){
    
        datePicker.type = type;
        
        /* html 생성 */
        
        var datePickerDiv;
        
        switch (datePicker.type) {
            case 1:{
                datePickerDiv = "div.datePicker"
				break;
            }
            case 2:{
                datePickerDiv = "div.datePicker2"
				break;
            }
            
        }
        
        fnCreateElementWithClassAndAppend(datePickerDiv, 'div', "wrap");
        fnCreateElementWithClassAndAppend(datePickerDiv + " .wrap", "div", "datePickerWrap");
        
        if (datePicker.type == 2) {
            $("div.datePickerWrap").attr("id", "dp2_datePickerWrap");
        }
        fnCreateElementWithClassAndAppend("div.datePickerWrap", "div", "pickerWrap");
        fnCreateElementWithClassAndAppend("div.pickerWrap", "div", "dateWrap");
        $("div.dateWrap").addClass("group");
        fnCreateElementWithClassAndAppend("div .dateWrap", "div", "dateBoxWrap");
        fnCreateElementWithClassAndAppend("div.dateBoxWrap", "span", "dateYear");
        fnCreateElementWithClassAndAppend("div.dateBoxWrap", "div", "dateBox");
        fnCreateElementWithClassAndAppend("div.dateBox", "span", "month");
        fnCreateElementWithClassAndAppend("div.dateBox", "span", "day");
        fnCreateElementWithClassAndAppend("div .dateWrap", "span", "dbSeparator");
        $(".dbSeparator").html("&ndash;");
        $(".dateBoxWrap").clone().appendTo(".dateWrap");
        
        $(".dateBoxWrap").each(function(index){
            $(this).find("span.dateYear").attr("id", "year" + fromTo[index]);
            $(this).find("div.dateBox").attr("id", "date" + fromTo[index]);
        });
        
        
        fnCreateElementWithClassAndAppend("div.pickerWrap", "div", "monthSelector");
        fnCreateElementWithClassAndAppend("div.monthSelector", "table", "msTable");
        $("table.msTable").append($(document.createElement('tr')));
        for (var i = 0; i < 12; i++) {
            $(".msTable tr").append($(document.createElement('td')));
        }
        fnCreateElementWithClassAndAppend("div.pickerWrap", "div", "dpYearDisplay");
        switch (datePicker.type) {
            case 1:{
                fnCreateElementWithClassAndAppend("div.dpYearDisplay", "div", "yearDisplay");
                fnCreateElementWithClassAndAppend("div.yearDisplay", "span", "prev");
                fnCreateElementWithClassAndAppend("div.yearDisplay", "span", "next");
                fnCreateElementWithClassAndAppend("div.dpYearDisplay", "button", "toggleYearChanger");
                fnCreateElementWithClassAndAppend("div.datePickerWrap", "div", "yearChangerWrap");
                fnCreateElementWithClassAndAppend("div.yearChangerWrap", "div", "yearSelect");
                $("div.yearSelect").append($(document.createElement('ol')));
                
                for (var i = 0; i < 4; i++) {
                    $("div.yearSelect ol").append($(document.createElement('li')).html('<a href="#"><strong>제' + (i + 1) + '기</strong><span>2005/04/01 &ndash; 2006/03/31</span></a>'));
                }
                
                fnCreateElementWithClassAndAppend("div.yearChangerWrap", "div", "bottomBox");
                fnCreateElementWithClassAndAppend("div.bottomBox", "button", "backToDatePicker");
                $(".backToDatePicker").html("취소");
                break;
            }
            case 2:{
                fnCreateElementWithClassAndAppend("div.dpYearDisplay", "button", "toggleYearChanger");
                $("div.dpYearDisplay .toggleYearChanger").attr("id", "dp2_toggleYearChanger");
                
                fnCreateElementWithClassAndAppend("div.pickerWrap", "div", "quickChanger");
                $("div.quickChanger").append('<span>이번달</span><span>이번분기</span><span>전체</span>');
                
                
                fnCreateElementWithClassAndAppend("#dp2_datePickerWrap", "div", "yearChangerWrap");
                fnCreateElementWithClassAndAppend("#dp2_datePickerWrap .yearChangerWrap", "div", "yearSelect");
                $("#dp2_datePickerWrap .yearSelect").attr("id", "dp2_yearSelect");
                
                for (var i = 0; i < 20; i++) {
                    if (i % 5 == 0) {
                        $("#dp2_yearSelect").append('<ol></ol>');
                    }
                    $("#dp2_yearSelect ol:last").append('<li><a href="#"><strong>제' + (i + 1) + '기</strong><span>2005/04/01 &ndash; 2006/03/31</span></a></li>')
                }
                
				fnCreateElementWithClassAndAppend("div.yearChangerWrap","div","bottomBox");
				$("div.bottomBox").append('<span class=\"btnPrev\" id=\"dp2_btnPrev\"><button></button></span>');
				$("div.bottomBox").append('<span class=\"btnNext\" id=\"dp2_btnNext\"><button></button></span>');
				$("div.bottomBox").append('<button class=\"backToDatePicker\" id=\"dp2_backToDatePicker\">취소</button>');
                break;
            }
        }
        
        fnCreateElementWithClassAndAppend(datePickerDiv, "div", "dpCalendarOverlay");
        fnCreateElementWithClassAndAppend(datePickerDiv, "div", "dpCalendarOverlay");
        
        $(datePickerDiv + " .dpCalendarOverlay").each(function(index){
            $(this).attr("id", "dpCal" + fromTo[index]);
        });
        
        /* html 생성 끝*/
    },
    
    
    init: function(startYear, startMonth, onselectFunc /* , args */){
    
        datePicker.startYear = startYear;
        datePicker.startMonth = startMonth;
        
        datePicker.setStartMonth(datePicker.startMonth);
        
        // 맨 처음에는 기본값으로 이번달 선택.
        
//        datePicker.fromDate = new Date(datePicker.today.getFullYear(), datePicker.today.getMonth(), datePicker.today.getDate());
//        datePicker.toDate = new Date(datePicker.today.getFullYear(), datePicker.today.getMonth(), datePicker.getLastDate(datePicker.today.getYear(), datePicker.today.getMonth() + 1));
		
		// 기본 날짜는 일주일 전부터 오늘까지
        datePicker.fromDate = new Date(datePicker.today.getFullYear(), datePicker.today.getMonth(), datePicker.today.getDate()-6);
        datePicker.toDate = new Date(datePicker.today.getFullYear(), datePicker.today.getMonth(), datePicker.today.getDate());
        
        datePicker.printDate();
        
        // 하일라이트도 추가.
        var currentMonthIndex = datePicker.today.getMonth() + 1 - startMonth + (datePicker.today.getMonth() + 1 >= startMonth ? 0 : 12);
        
        $('.monthSelector .msTable tr td:eq(' + currentMonthIndex + ')').addClass('ui-selected');
        
        /*jQueryUI datepicker 생성*/
        
        if (datePicker.fromDate.getMonth() + 1 < startMonth) {
            datePicker.minDate = new Date(datePicker.fromDate.getFullYear() - 1, startMonth - 1, 1);
        }
        else {
            datePicker.minDate = new Date(datePicker.fromDate.getFullYear(), startMonth - 1, 1);
        }
        
        // 기본 옵션 셋팅    
        var dpDefaultSetting = {
            showOtherMonths: true,
            selectOtherMonths: true,
            changeYear: true,
            changeMonth: true,
            showOn: "button",
            buttonImage: "/smart/img/ico/ico_calendar.png",
            buttonImageOnly: true,
            dateFormat: "yy-mm-dd"
        };
        
        // 로케일 셋팅. jquery-ui.datepicker-ko.js파일 필요. http://jquery-ui.googlecode.com/svn/trunk/ui/i18n/
        $.datepicker.setDefaults(dpDefaultSetting, $.datepicker.regional["ko"]);
        
		var args = [], i; 

		i = arguments.length - 1;
		while (i >= 3 ) {
			args[i - 3] = arguments[i];
			i--;
		}
		
        $("#dpCalFrom").datepicker({
            onSelect: function(dateText, inst){
            
                //var dateDiff = ($(this).datepicker('getDate').getTime() - datePicker.fromDate.getTime()) / datePicker.oneDayInMillisec;
                
                datePicker.fnHideCalendar("From");
                datePicker.fromDate = $(this).datepicker('getDate');
                //datePicker.toDate.setDate(datePicker.toDate.getDate() + dateDiff);
                datePicker.printDate();
                datePicker.fnSetMonthSelector();
                //printFromDate();
                //			var d = new Date(dateText);
                //			printFromDate(d.getFullYear(), (d.getMonth()+1), d.getDate());
				
				if(onselectFunc)
				{
//					if(args)
//					{
						//onselectFunc(args);
						onselectFunc.apply(this, args);
//					}
//					else
//					{
//						onselectFunc();
//					}
				}
				
            }
        });
        $("#dpCalTo").datepicker({
            onSelect: function(dateText, inst){
                datePicker.fnHideCalendar("To");
                datePicker.toDate = $(this).datepicker('getDate');
                datePicker.printToDate();
                datePicker.fnSetMonthSelector();
                //			var d = new Date(dateText);
                //			printToDate(d.getFullYear(), (d.getMonth()+1), d.getDate());
				if(onselectFunc)
				{
					onselectFunc.apply(this, args);
				}				
            }
        });
        
        /*jQueryUI datepicker 생성*/
        /* 2011.12.02 #yearTo event 추가 */
        $("#dateTo, #yearTo").bind('click', {
            fromTo: "To"
        }, function(event){
            datePicker.fnToggleCalendar(event);
            event.stopPropagation();
        });
        /* 2011.12.02 #yearFrom event 추가 */
        $("#dateFrom, #yearFrom").bind('click', {
            fromTo: "From"
        }, function(event){
            datePicker.fnToggleCalendar(event);
            event.stopPropagation();
        });
        
        $(document).click(function(){
            if ($("#dateFrom").hasClass('selected')) {
                datePicker.fnHideCalendar("From");
            }
            else 
                if ($("#dateTo").hasClass('selected')) {
                    datePicker.fnHideCalendar("To");
                }
        });
        
        $("#dpCalTo").click(function(){
            return false;
        });
        $("#dpCalFrom").click(function(){
            return false;
        });
        
        $(".monthSelector .msTable tr").selectable();
        
        // datepicker의 상태가 변할 때 마다 showDate 호출.
        $(".monthSelector").bind("selectableselecting selectableunselecting", datePicker.showDate);
        $(".monthSelector").bind("selectablestop", function(){
            datePicker.showDate();
            datePicker.fnRequestData();
        });
        
        var animationAmount;
        
        switch (datePicker.type) {
            case 1:{
                animationAmount = 110;
                break;
            }
            case 2:{
                animationAmount = 90;
                break;
            }
        }
        
        
        // datepicker year changer 
        $("button.toggleYearChanger").click(function(){
            $("div.datePickerWrap").animate({
                "top": "-=" + animationAmount + "px"
            }, "fast");
        });
        $("button.backToDatePicker").click(function(){
            $("div.datePickerWrap").animate({
                "top": "+=" + animationAmount + "px"
            }, "fast");
        });
        
        // type b. cover up
        //	$("button.toggleYearChanger").click(function(){
        //		$("div.yearChangerWrap").animate({"top": "-=110px"}, "fast");
        //	});
        //	$("button.backToDatePicker").click(function(){
        //		$("div.yearChangerWrap").animate({"top": "+=110px"}, "fast");
        //	});
        
        $("div.yearSelect").click(function(){
            setTimeout('$("div.datePickerWrap").animate({"top": "+='+animationAmount+'px"}, "fast")', 300);
        });
        $("div.yearSelect ol li").click(function(){
            $(this).siblings().removeClass('selected');
            $(this).addClass('selected');
        });
        
        // datepicker year display
        //        var yearDisplayPos = $("table.msTable td.first").position();
        //        $("div.yearDisplay").css("left", yearDisplayPos.left - 34);
        //        
        // customizing scrollbar
        // 2012.12.02- 미구현으로 추정 실행중지
        //$("div.yearSelect").jScrollPane();
        
        
        // 아직 미구현
        $(".yearDisplay .prev").text(2010);
        $(".yearDisplay .next").text(2011);
        $(".toggleYearChanger").text(1);
        
        
        ////////////////////////////////////
        
        // datepicker2 year changer 
        //        $("#dp2_toggleYearChanger").click(function(){
        //            $("#dp2_datePickerWrap").animate({
        //                "top": "-=90px"
        //            }, "fast");
        //        });
        //        $("#dp2_backToDatePicker").click(function(){
        //            $("#dp2_datePickerWrap").animate({
        //                "top": "+=90px"
        //            }, "fast");
        //        });
        
//        $("#dp2_yearSelect").click(function(){
//            setTimeout('$("#dp2_datePickerWrap").animate({"top": "+=90px"}, "fast")', 300);
//        });
//        $("#dp2_yearSelect ol li").click(function(){
//            $(this).siblings().removeClass('selected');
//            $(this).addClass('selected');
//        });
        
        
        
        /* datepicker2 yearchanger page mover */
        var dp2MaxIndex = 4;
        var dp2Index = 2;
        setMoverPosition();
        setMoverDisplay();
        
        function setMoverPosition(){
            var endValue = "-=" + Math.abs((dp2Index - 1) * 548) + "px";
            $("#dp2_yearSelect").animate({
                "margin-left": endValue
            }, "fast");
        }
        
        function setMoverDisplay(){
            $("#dp2_btnPrev>button").css("display", "block");
            $("#dp2_btnNext>button").css("display", "block");
            if (dp2Index == 1) {
                $("#dp2_btnPrev>button").css("display", "none");
            }
            else 
                if (dp2Index == dp2MaxIndex) {
                    $("#dp2_btnNext>button").css("display", "none");
                }
        }
        
        $("#dp2_btnPrev>button").click(function(){
            if (dp2Index > 1) {
                dp2Index--;
                $("#dp2_yearSelect").animate({
                    "margin-left": "+=548px"
                }, "fast");
            }
            setMoverDisplay();
        });
        
        $("#dp2_btnNext>button").click(function(){
            if (dp2Index < dp2MaxIndex) {
                dp2Index++;
                $("#dp2_yearSelect").animate({
                    "margin-left": "-=548px"
                }, "fast");
            }
            setMoverDisplay();
        });
        /* end of datepicker yearchanger page mover  */
    
		// 이번달 버튼 
//		$("div.quickChanger span:eq(0)").click(function() {
//			
//			datePicker.setDate(new Date(datePicker.today.getFullYear(), datePicker.today.getMonth(), 1), 
//					new Date(datePicker.today.getFullYear(), datePicker.today.getMonth(), datePicker.getLastDate(datePicker.today.getYear(), datePicker.today.getMonth() + 1)));
//		});
		
    }
	,
	setDate : function(from, to) {
		
        datePicker.fromDate = from;
        datePicker.toDate = to;
        datePicker.printDate();
        datePicker.fnSetMonthSelector();

	}
	,
	setCalendar : function(selector, date){
		$(selector).datepicker({
			showOn: "button",
            buttonImage: "/img/ico/ico_calendar.png",
            buttonImageOnly: true,
            dateFormat: "yy-mm-dd"
        });
		if(!jex.isNull(date)){
			$(selector).val(date);
		}

	},
	setMonthpicker : function(selector, date){ 
		$(selector).datepicker({
			showOn: "button",
	        buttonImage: "/banknote/img/ico/ico_calendar.png",
	        buttonImageOnly: true,
	        showButtonPanel: true,
	        dateFormat: "yy-mm",
	        defaultDate : new Date(date.substring(0,4), date.substring(5,7)-1),
	        onClose: function() {
				var iMonth = $("#ui-datepicker-div .ui-datepicker-month :selected").val();
				var iYear = $("#ui-datepicker-div .ui-datepicker-year :selected").val();
				$(this).datepicker( "option", "defaultDate", new Date(iYear, iMonth, 1));
				var nMonth = (parseInt(iMonth)+1);
				$(selector).val(iYear +"-"+ (nMonth< 10 ?"0"+nMonth:nMonth));
			},
	    });
		if(!jex.isNull(date)){
			$(selector).val(date);
		}
	}
};
