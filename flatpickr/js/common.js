var common;
if (!common) common = {};

if (!common.app) {
    common.app = {};
    // open pop
    common.app.open_popup = function (formId, options) {
        var sizeW = parseInt(options.sizeW, 10);
        var sizeH = parseInt(options.sizeH, 10);
        var nLeft = screen.width / 2 - sizeW / 2;
        var nTop = screen.height / 2 - sizeH / 2;
        var option = ",toolbar=no,menubar=no,location=no,scrollbars=yes,status=no,resizable=no";
        var option = '';
        var winObj = window.open('', options.target, "left=" + nLeft + ",top=" + nTop + ",width=" + sizeW + ",height=" + sizeH + option);
        winObj.blur();// 크롭에서 focus()만 호출할경우 작동하지 않아서 blur()를 먼저 호출한후
        // focus()호출하도록 수정함.
        winObj.focus();// 팝업이 이미 열려있는경우 앞으로 나오도록 한다.

        var frm = document.getElementById(formId);
        if (!!frm) {
            frm.method = "post";
            frm.target = options.target;

            if (!!options.action) frm.action = options.action;

            if (!!options.title) frm.find("#title_pop").text(options.title);

            if (!!options.message) frm.find("#message_pop").text(options.message);

            frm.show();

            frm.submit();
        }

        frm.target = "";

        return winObj;
    };
    // 새창 여는 함수
    common.app.jexNewWin = function (url, winName, sizeW, sizeH, jsonValue) {
        var winObj;
        var nLeft = screen.width / 2 - sizeW / 2;
        var nTop = screen.height / 2 - sizeH / 2;

        tms.ui.createFormObj("generatedSubmitForm", "post", jsonValue);

        var opt = ",toolbar=no,menubar=no,location=no,scrollbars=yes,status=no, resizable=yes, left=" + nLeft + ",top=" + nTop;

        try {
            winObj = window.open("", winName, "width=" + sizeW + ",height=" + sizeH + opt);
            common.app.win = winObj;
        }
        catch (e) {

        }

        if (winObj == null) {
            alert("팝업차단 기능을 해지 하시기 바랍니다..\n\n[ 도구->인터넷옵션->개인 정보->팝업차단] 체크해지");
            return;
        }

        var userFrm = document.getElementById("generatedSubmitForm");
        userFrm.target = winName;
        var parameter = "";
        try {
            if (jexjs.null2Void(parent.CNTS_ID) != "") parameter = "?CNTS_ID=" + parent.CNTS_ID;
        }
        catch (e) {

        }

        userFrm.action = url + parameter;
        userFrm.submit();

        tms.ui.removeFormObj("generatedSubmitForm");
    };

    // 새창 여는 함수(팝업 창 크기 고정) - 결재선 요청 팝업일 경우 팝업창 크기를 고정시킨다.
    common.app.jexNewWin2 = function (url, winName, sizeW, sizeH, jsonValue) {
        var winObj;
        var nLeft = screen.width / 2 - sizeW / 2;
        var nTop = screen.height / 2 - sizeH / 2;

        tms.ui.createFormObj("generatedSubmitForm", "post", jsonValue);

        var opt = ",toolbar=no,menubar=no,location=no,scrollbars=yes,status=no, resizable=no, left=" + nLeft + ",top=" + nTop;

        try {
            winObj = window.open("", winName, "width=" + sizeW + ",height=" + sizeH + opt);
            common.app.win = winObj;
            /*
             * common.app.win.onbeforeunload = function(){ alert("등록되었습니다.22"); }
             */
        }
        catch (e) {

        }

        if (winObj == null) {
            alert("팝업차단 기능을 해지 하시기 바랍니다..\n\n[ 도구->인터넷옵션->개인 정보->팝업차단] 체크해지");
            return;
        }

        var userFrm = document.getElementById("generatedSubmitForm");
        userFrm.target = winName;
        var parameter = "";
        try {
            if (jexjs.null2Void(parent.CNTS_ID) != "") parameter = "?CNTS_ID=" + parent.CNTS_ID;
        }
        catch (e) {

        }

        userFrm.action = url + parameter;
        userFrm.submit();

        tms.ui.removeFormObj("generatedSubmitForm");
    };

    // Business Number format
    common.app.bus_format = function (str) {
        return str.replace(/(\d{3})(\d{2})(\d{5})/, "$1-$2-$3");
    };


    // 날짜형식 (YYYY-MM-DD)
    common.app.date_format = function (str) {
        if (common.app.null2void(str) == "") return str;
        return str.replace(/(\d{4})(\d{2})(\d{2})/, "$1-$2-$3");
    };

    // 날짜형식 (YYYY-MM)
    common.app.formatYYYYMM = function (str) {
        if (common.app.null2void(str) == "") return str;
        return str.replace(/(\d{4})(\d{2})/, "$1-$2");
    };

    // 시간형식 (HH : MM)
    common.app.time_format = function (str) {
        return str.substring(0, 4).replace(/(\d{2})(\d{2})/, "$1:$2");
    };
    // 시간형식 (HH : MM : SS)
    common.app.time_format2 = function (str) {
        return str.substring(0, 6).replace(/(\d{2})(\d{2})(\d{2})/, "$1:$2:$3");
    };
    // 날짜 + 시간 형식 (YYYY-MM-DD HH:mm)
    common.app.datetime_format = function (str) {
        if (common.app.null2void(str) == "") return str;
        if (str.length == 8) str = str.replace(/(\d{4})(\d{2})(\d{2})/, "$1-$2-$3");										// 날짜형식 (YYYY-MM-DD)
        else if (str.length == 12) str = str.replace(/(\d{4})(\d{2})(\d{2})(\d{2})(\d{2})/, "$1-$2-$3 $4:$5");				// 날짜 + 시간 형식 (YYYY-MM-DD HH:mm)
        else if (str.length == 14) str = str.replace(/(\d{4})(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})/, "$1-$2-$3 $4:$5:$6");	// 날짜 + 시간 형식 (YYYY-MM-DD HH:mm:ss)
        else if (str.length == 15) str = str.replace(/(\d{4})(\d{2})(\d{2})(\d{2})(\d{2})(\d{3})/, "$1-$2-$3 $4:$5:$6");	// 날짜 + 시간 형식 (YYYY-MM-DD HH:mm:sss)
        return str
    };
    // 날짜 + 시간 형식 (YYYY-MM-DD HH:mm)
    common.app.datetimes_format = function (str) {
        if (common.app.null2void(str) == "") return str;
        return str.replace(/(\d{4})(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})/, "$1-$2-$3 $4:$5");
    };
    // 날짜 + 시간 형식 (YYYY-MM-DD HH:mm:ss)
    common.app.datetimess_format = function (str) {
        if (common.app.null2void(str) == "") return str;
        return str.replace(/(\d{4})(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})/, "$1-$2-$3 $4:$5:$6");
    };
    // 사업자번호형식
    common.app.corpno_format = function (str) {
        return str.replace(/(\d{3})(\d{2})(\d{5})/, "$1-$2-$3");
    };

    // 법인등록번호
    common.app.crno_format = function (str) {
        return str.replace(/(\d{6})(\d{7})/, "$1-$2");    // Xxxxxx-xxxxxxx 13자리 형식
    };
    //사업자등록번호
    common.app.prevBsnnNo = function (num) {
        return num.replace(/(\d{3})(\d{2})(\d{5})/, '$1-$2-$3');    // Xxx-xx-xxxxx 
    };
    // 핸드폰형식
    common.app.phoneFomatter = function (num, type) {
        var formatNum = '';

        if (num.length == 11) {
            if (type == 0) {
                formatNum = num.replace(/(\d{3})(\d{4})(\d{4})/, '$1-****-$3');
            } else {
                formatNum = num.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3');
            }
        } else if (num.length == 8) {
            formatNum = num.replace(/(\d{4})(\d{4})/, '$1-$2');
        } else if (num.length == 9) {
            formatNum = num.replace(/(\d{3})(\d{3})(\d{3})/, '$1-$2-$3');
        } else if (num.length == 10) {
            formatNum = num.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3');
        } else {
            if (num.indexOf('02') == 0) {
                if (type == 0) {
                    formatNum = num.replace(/(\d{2})(\d{4})(\d{4})/, '$1-****-$3');
                } else {
                    formatNum = num.replace(/(\d{2})(\d{4})(\d{4})/, '$1-$2-$3');
                }
            } else {
                if (type == 0) {
                    formatNum = num.replace(/(\d{3})(\d{3})(\d{4})/, '$1-***-$3');
                } else {
                    formatNum = num.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3');
                }
            }
        }
        return formatNum;
    };
    // 카드 MASK 형식
    common.app.formatCardNumberStar = function (foo) {
        var bar;

        if (foo.length == 16) {
            bar = foo.substr(0, 4) + "-" + foo.substr(4, 4) + "-" + "****" + "-" + foo.substr(12, 4);
        }
        else if (foo.length == 15) {
            bar = foo.substr(0, 4) + "-" + foo.substr(4, 4) + "-" + "****" + "-" + foo.substr(12, 3);
        }
        else if (foo.length == 14) {
            bar = foo.substr(0, 4) + "-" + foo.substr(4, 6) + "-" + "****";
        } else {
            bar = foo;
        }

        return bar;
    };

    common.app.formatCardNumber = function (foo) {
        // 9430030192869921 카드번호로 parseInt 버그 있음...
        // return gw.number.format(str, "####-####-####-####");
        var bar;

        if (foo.length == 16) {
            bar = foo.substr(0, 4) + "-" + foo.substr(4, 4) + "-" + foo.substr(8, 4) + "-" + foo.substr(12, 4);
        }
        else if (foo.length == 15) {
            bar = foo.substr(0, 4) + "-" + foo.substr(4, 6) + "-" + foo.substr(10, 5);
        }
        else if (foo.length == 14) {
            bar = foo.substr(0, 4) + "-" + foo.substr(4, 6) + "-" + foo.substr(10, 4);
        } else {
            bar = foo;
        }

        return bar;
    };

    common.app.mestTaxtTyp = function (code) {

        var type = {
            "00": "미등록"
            , "01": "일반"
            , "02": "간이"
            , "03": "면세"
            , "04": "비영리"
            , "09": "휴업"
            , "10": "폐업"
        };

        if (common.app.null2void(code, "") == "") {
            return "";
        } else {
            if (type[code] == undefined) {
                return code;
            } else {
                return type[code];
            }
        }
    };


    // 콤마찍기
    common.app.comma = function (str) {
        str = String(str);
        return str.replace(/(\d)(?=(?:\d{3})+(?!\d))/g, '$1,');
    };
    // 콤마풀기
    common.app.uncomma = function (str) {
        str = String(str);
        if (str.substr(0) === "-") {															// 음수이면
            // 음수값으로
            // 반환
            return "-" + str.replace(/[^\d]+/g, '').replace(/^0/g, '');
        } else {
            return str.replace(/[^\d]+/g, '').replace(/^0/g, '');
        }
    };
    // 콤마풀기
    common.app.uncomma2 = function (str) {
        str = String(str);
        if (str.substring(0, 1) == "-") {															// 음수이면
            // 음수값으로
            // 반환
            return "-" + str.replace(/[^\d]+/g, '').replace(/^0/g, '');
        } else {
            return str.replace(/[^\d]+/g, '').replace(/^0/g, '');
        }
    };
    // 달러 콤마찍기 (미국 달러)
    common.app.formatDollar = function (str) {
        str = String(str);
        var amt = str.substring(0, str.length - 2);
        var deci = str.substring(str.length - 2, str.length);

        amt = common.app.comma(amt);
        return amt + "." + deci;
    };
    // null to void
    common.app.null2void = function (str) {
        if (str == null || str == "null" || str == undefined || typeof (str) == "undefined" || str == "undefined") str = '';
        return str;
    };

    // null to zero
    common.app.null2zero = function (value) {
        if (value == null || value == "" || typeof (value) == undefined || typeof (value) == "undefined" || value == "null" || value == undefined || value == "undefined") {
            return 0;
        } else {
            return value;
        }
    };
    // null to default value
    common.app.null2def = function (value, def) {
        if (!value)
            return !def ? "" : def;
        else
            return $.trim(value);
    };
    // null to zero
    common.app.null2zero = function (str) {
        if (str == null) str = '0';
        if (str == "") str = '0';
        if (isNaN(str.toString().replace(/,/g, ""))) str = '0';
        return str;
    };
    // 파일다운
    common.app.filedown = function () {
        _WE_DRIVER.download($(event.target).closest("tr").find("input").val());
    };

    // datepicker
    common.app.datepicker = function (from_Id, end_Id) {
        // 시작일자 SETTING
        $(from_Id).datepicker({
            dateFormat: 'yy-mm-dd', // 데이터는 yyyy-MM-dd로 나옴
            closeText: '닫기',
            prevText: '이전달',
            nextText: '다음달',
            currentText: '오늘',
            monthNames: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
            monthNamesShort: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
            dayNames: ['일', '월', '화', '수', '목', '금', '토'],
            dayNamesShort: ['일', '월', '화', '수', '목', '금', '토'],
            dayNamesMin: ['일', '월', '화', '수', '목', '금', '토'],
            weekHeader: 'Wk',
            firstDay: 0,
            isRTL: false,
            duration: 200,
            showAnim: 'show',   // 애니메이션
            changeMonth: true,
            changeYear: true,
            // yearRange: 'c-10:c',
            showMonthAfterYear: true,
            // yearSuffix: '년',
            showOtherMonths: true, // 나머지 날짜도 화면에 표시
            selectOtherMonths: true, // 나머지 날짜에도 선택을 하려면 true
            showButtonPanel: true,
            showOn: "both", // 버튼과 텍스트 필드 모두 캘린더를 보여준다.

            onChangeMonthYear: function (year, month, inst) {
                // 년 또는 월이 변경시 이벤트 발생
            },
            beforeShow: function (input, inst) {
                // 일자 선택되기전 이벤트 발생
            },
            onSelect: function (dateText, inst) {
                // 일자 선택된 후 이벤트 발생
            },
            onClose: function (selectedDate) {
                $(end_Id).datepicker("option", "minDate", selectedDate);
            }, yearRange: "-10:+1"
        });
        // 종료일자 SETTING
        $(end_Id).datepicker({
            dateFormat: 'yy-mm-dd', // 데이터는 yyyy-MM-dd로 나옴
            closeText: '닫기',
            prevText: '이전달',
            nextText: '다음달',
            currentText: '오늘',
            monthNames: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
            monthNamesShort: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
            dayNames: ['일', '월', '화', '수', '목', '금', '토'],
            dayNamesShort: ['일', '월', '화', '수', '목', '금', '토'],
            dayNamesMin: ['일', '월', '화', '수', '목', '금', '토'],
            weekHeader: 'Wk',
            firstDay: 0,
            isRTL: false,
            duration: 200,
            showAnim: 'show',   // 애니메이션
            changeMonth: true,
            changeYear: true,
            // yearRange: 'c-10:c',
            showMonthAfterYear: true,
            // yearSuffix: '년',
            showOtherMonths: true, // 나머지 날짜도 화면에 표시
            selectOtherMonths: true, // 나머지 날짜에도 선택을 하려면 true
            showButtonPanel: true,
            showOn: "both", // 버튼과 텍스트 필드 모두 캘린더를 보여준다.

            onChangeMonthYear: function (year, month, inst) {
                // 년 또는 월이 변경시 이벤트 발생
            },
            beforeShow: function (input, inst) {
                // 일자 선택되기전 이벤트 발생
            },
            onSelect: function (dateText, inst) {
                // 일자 선택된 후 이벤트 발생
            },
            onClose: function (selectedDate) {
                $(from_Id).datepicker("option", "maxDate", selectedDate);
            }, yearRange: "-10:+1"
        });
    };


    // datepicker
    common.app.dateSinglePicker = function (dateId) {

        $(dateId).val(dateUtil.month_minus(moment().format("YYYYMMDD"), 1)); // 기본값
        // : 전월
        $(dateId).datepicker({
            changeMonth: true
            , dateFormat: 'yymmdd'
            , beforeShow: function () {
                var today = new Date();
                var startYear = today.getFullYear();

                $.datepicker.regional['ko'] = {
                    closeText: '닫기',
                    prevText: '이전달',
                    nextText: '다음달',
                    currentText: '오늘',
                    monthNames: ['1월', '2월', '3월', '4월', '5월', '6월',
                        '7월', '8월', '9월', '10월', '11월', '12월'],
                    monthNamesShort: ['1월', '2월', '3월', '4월', '5월', '6월',
                        '7월', '8월', '9월', '10월', '11월', '12월'],
                    dayNames: ['일', '월', '화', '수', '목', '금', '토'],
                    dayNamesShort: ['일', '월', '화', '수', '목', '금', '토'],
                    dayNamesMin: ['일', '월', '화', '수', '목', '금', '토'],
                    weekHeader: 'Wk',
                    dateFormat: 'yy-mm-dd',
                    firstDay: 0,
                    isRTL: false,
                    showMonthAfterYear: true,
                    // yearSuffix: suffix,
                    changeYear: true,
                    changeMonth: true,
                    yearRange: (startYear - 70) + ':' + (startYear + 10)
                };
                $.datepicker.setDefaults($.datepicker.regional['ko']);
            }
        });

        //        $(dateId).mask("99999999");
        $(dateId).inputmask("99999999");
    };


    /* jQuery Toast Message */
    common.app.getFullMsg = function (obj, msg) {
        var fullMsg = "";
        var code = "";

        if (typeof (obj) == "object") {
            code = obj.COMMON_HEAD["CODE"];
            msg = obj.COMMON_HEAD["MESSAGE"];

            fullMsg = msg;
        }
        else {
            code = obj;

            fullMsg = code;
        }

        return fullMsg;
    };
    common.app.error = function (obj, msg) {
        if (typeof (parent.toastr) != "undefined") {
            parent.toastr.error(common.app.getFullMsg(obj, msg));
        }
        else {
            toastr.error(common.app.getFullMsg(obj, msg));
        }

        $.unblockUI();
    };

    common.app.info = function (obj, msg) {
        if (typeof (parent.toastr) != "undefined") {
            parent.toastr.info(common.app.getFullMsg(obj, msg));
        }
        else {
            toastr.info(common.app.getFullMsg(obj, msg));
        }

        $.unblockUI();
    };

    common.app.warning = function (obj, msg) {
        if (typeof (parent.toastr) != "undefined") {
            parent.toastr.warning(common.app.getFullMsg(obj, msg));
        }
        else {
            toastr.warning(common.app.getFullMsg(obj, msg));
        }

        $.unblockUI();
    };

    common.app.success = function (obj, msg) {
        if (typeof (parent.toastr) != "undefined") {
            parent.toastr.success(common.app.getFullMsg(obj, msg));
        }
        else {
            toastr.success(common.app.getFullMsg(obj, msg));
        }

        $.unblockUI();
    };

    common.app.getToday = function () {
        var _date = new Date();
        var d = _date.getDate();
        var day = (d < 10) ? '0' + d : d;
        var m = _date.getMonth() + 1;
        var month = (m < 10) ? '0' + m : m;
        var yy = _date.getYear();
        var year = (yy < 1000) ? yy + 1900 : yy;

        var hh0 = _date.getHours();
        var hh = (hh0 < 10) ? '0' + hh0 : hh0;
        var mi0 = _date.getMinutes();
        var mi = (mi0 < 10) ? '0' + mi0 : mi0;
        var ss0 = _date.getSeconds();
        var ss = (ss0 < 10) ? '0' + ss0 : ss0;

        var ms0 = _date.getMilliseconds();
        var ms = (ms0 < 10) ? '000' + ms0 : (ms0 < 100) ? '00' + ms0 : (ms0 < 100) ? '0' + ms0 : ms0;

        return year + "-" + month + "-" + day;
    };

    common.app.getNextday = function (addDay) {
        var _date = new Date();

        if (addDay == null || addDay == "undefined" || addDay == "" || addDay == "null") {
            _date.setDate(_date.getDate() + 1);
        } else {
            _date.setDate(_date.getDate() + Number(addDay));
        }

        var d = _date.getDate();
        var day = (d < 10) ? '0' + d : d;
        var m = _date.getMonth() + 1;
        var month = (m < 10) ? '0' + m : m;
        var yy = _date.getYear();
        var year = (yy < 1000) ? yy + 1900 : yy;

        var hh0 = _date.getHours();
        var hh = (hh0 < 10) ? '0' + hh0 : hh0;
        var mi0 = _date.getMinutes();
        var mi = (mi0 < 10) ? '0' + mi0 : mi0;
        var ss0 = _date.getSeconds();
        var ss = (ss0 < 10) ? '0' + ss0 : ss0;

        var ms0 = _date.getMilliseconds();
        var ms = (ms0 < 10) ? '000' + ms0 : (ms0 < 100) ? '00' + ms0 : (ms0 < 100) ? '0' + ms0 : ms0;

        return year + "-" + month + "-" + day;
    };

    common.app.setAll = function (selector, dat) {
        $.each($(selector).find("[id]"), function () {
            var o = $(this).attr("id");
            if (jexjs.isNull(o)) return true;
            var d = dat[o];
            if (d != undefined) $(this).setTagValue(d);
        });
        return this;
    };

    // 이메일 유효성 검사
    common.app.emailChk = function (email) {
        var regex = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/;
        if (regex.test(email) == false) {
            return false;
        } else {
            return true;
        }
    };

    // 사업자번호 유효성 검사
    common.app.busChk = function (corpNo) {
        var reg = /([0-9]{3})-?([0-9]{2})-?([0-9]{5})/;
        if (!reg.test(corpNo)) return false;
        corpNo = RegExp.$1 + RegExp.$2 + RegExp.$3;
        var cVal = 0;
        for (var i = 0; i < 8; i++) {
            var cKeyNum = parseInt(((_tmp = i % 3) == 0) ? 1 : (_tmp == 1) ? 3 : 7);
            cVal += (parseFloat(corpNo.substring(i, i + 1)) * cKeyNum) % 10;
        }
        var li_temp = parseFloat(corpNo.substring(i, i + 1)) * 5 + '0';
        cVal += parseFloat(li_temp.substring(0, 1)) + parseFloat(li_temp.substring(1, 2));
        return (parseInt(corpNo.substring(9, 10)) == 10 - (cVal % 10) % 10);
    };

    // 자식 창 닫기
    common.app.closeChildWindow = function (msg, tempApprYn) {
        if (tempApprYn) {	 		// 임시저장시에는 전자결재 팝업이 없기 때문에 바로 closeSmartPopup
            close_smartPop("fn_search", msg);
        } else {					// 결재요청 시에는 전자결재 팝업 창을 닫은 후 0.5초 후에 등록되었다는
            // alert와 함께 테이블 reload
            common.app.win.close();
            setTimeout("closeApprPopup('" + msg + "')", 500);
        }
    };

    // 자동콤마
    common.app.numberWithCommas = function (str) {
        return str ? str.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : 0;
    };

    common.app.formatNumber = function (elem) {
        var num;
        var $this = $(elem);

        // Remove comma
        num = $this.val().replace(/,/g, "");

        // If It is not an illegal number
        // not .(dot) but 123
        if (isNaN(num)) {
            // Prevent begin with dot(.)
            if (num.indexOf('.') == 0) {
                $this.val('0.');
            }
            else if (num.indexOf('-') >= 0) {
                $this.val('-');
            }
            /*
             * else{ num = num.substring(0, num.length-1);
             * $this.val(common.comm.numberWithCommas(num)); }
             */
        } else {
            // Not allow 00 after dot(decimal)
            // 12.00 -> 12
            if (num.lastIndexOf("00") == 0) {
                num = num.substring(0, num.length - 1);
                $this.val(common.app.numberWithCommas(num));
            } else

                // Prevent multi zero
                if (parseFloat(num) == 0 && num.lastIndexOf(".") == -1) {
                    $this.val('0');
                } else

                    // Prevent leading by zero
                    // 0123 -> 123
                    if (num.substring(0, 1) == 0 && num.length > 1 && num.lastIndexOf(".") == -1) {
                        num = num.substring(1);
                        $this.val(common.app.numberWithCommas(num));
                    } else

                        // If exist dot(.)
                        if (num.lastIndexOf(".") != -1) {

                            // / split number
                            var nsp = num.split(".");
                            var num2 = nsp[0].split(/(?=(?:\d{3})+$)/).join(",");
                            if (nsp[1] == "00") {
                                $this.val(num2);
                            } else {
                                $this.val(num2 + "." + nsp[1]);
                            }

                            // Allow maximum 2digits after dot(decimal)
                            // 12.23
                            if ((num.substring(num.lastIndexOf("."), num.length)).length > 3) {
                                num = num.substring(0, num.indexOf('.') + 3);
                                $this.val(common.app.numberWithCommas(num));
                            }
                        } else {
                            // Set to inputbox
                            $this.val(common.app.numberWithCommas(num));
                        }
        }
    };

    common.app.getPopsCode = function (dat) {
        if (dat === "01")
            return "영수";
        else if (dat === "02")
            return "청구";
    };

    // zero to void
    common.app.zero2void = function (str) {
        if (str == 0) str = '';
        return str;
    };
    // corpNo or Not
    common.app.isCorpNo = function (corpNo) {
        // corpNo 숫자만 10자리로 해서 문자열로 넘긴다.
        var checkID = new Array(1, 3, 7, 1, 3, 7, 1, 3, 5, 1);
        var tmpCorpNo, i, chkSum = 0, c2, remander;
        corpNo = corpNo.replace(/-/gi, '');

        for (i = 0; i <= 7; i++) chkSum += checkID[i] * corpNo.charAt(i);
        c2 = "0" + (checkID[8] * corpNo.charAt(8));
        c2 = c2.substring(c2.length - 2, c2.length);
        chkSum += Math.floor(c2.charAt(0)) + Math.floor(c2.charAt(1));
        remander = (10 - (chkSum % 10)) % 10;

        if (Math.floor(corpNo.charAt(9)) == remander) return true; // OK!
        return false;
    };
    /**get label of work type by workTypeCd
     * param : WORK_TYPE 
     */
    common.app.getCertTypeLabel = function (certType) {
        switch (certType) {
            case '1':
                return "재직증명서";
            case '2':
                return "경력증명서";
            default:
                return "0";
        }
    };
    common.app.getScreenShowYn = function () {
        if (jexjs.isNull(localStorage.getItem("RR_MASK_SCR_YN"))) {
            var d = tmsComm.callWebService1("penv_0001_01_r001", {});
            if (d) { localStorage.setItem("RR_MASK_SCR_YN", d.RR_MASK_SCR_YN); }
        }
        return localStorage.getItem("RR_MASK_SCR_YN");
    };

    common.app.getPaymentWay = function () {
        if (jexjs.isNull(localStorage.getItem("PAYMENT_WAY"))) {
            var d = tmsComm.callWebService1("penv_0001_01_r001", {});
            if (d) { localStorage.setItem("PAYMENT_WAY", d.PAYMENT_WAY); }
        }
        return localStorage.getItem("PAYMENT_WAY");
    };
    common.app.getNaraYn = function () {
        if (jexjs.isNull(localStorage.getItem("NARA_YN"))) {
            var d = tmsComm.callWebService1("penv_0001_01_r001", {});
            if (d) { localStorage.setItem("NARA_YN", d.NARA_YN); }
        }
        return localStorage.getItem("NARA_YN");
    };
    /**get label of work type by workTypeCd
     * param : WORK_TYPE 
     */
    common.app.getWorkTypeLabel = function (workCd) {
        switch (workCd) {
            case '01':
                return "정규직";
            case '02':
                return "계약직";
            case '03':
                return "임시직";
            case '04':
                return "일용직";
            case '05':
                return "임원";
            case '06':
                return "일반정규직";
            case '07':
                return "전문계약직";
            case '08':
                return "무기계약직";
            case '09':
                return "인턴";
            case '10':
                return "외주";
            case '11':
                return "프리랜서";
            case '12':
                return "기타";
            default:
                return "";
        }
    };
    /**get value of work type by workType
     * param : WORK_TYPE 
     */
    common.app.getWorkTypeVal = function (workType) {
        switch (workType) {
            case '정규직':
                return "01";
            case '계약직':
                return "02";
            case '임시직':
                return "03";
            case '일용직':
                return "04";
            case '임원':
                return "05";
            case '일반정규직':
                return "06";
            case '전문계약직':
                return "07";
            case '무기계약직':
                return "08";
            case '인턴':
                return "09";
            case '외주':
                return "10";
            case '프리랜서':
                return "11";
            case '정규직':
                return "12";

            default:
                return "";
        }
    };

    common.app._envRec = {
        "PROFILE_EMP_YN": "프로필",
        "WORK_HIS_V_YN": "경력",
        "HD_TECH_V_YN": "보유기술",
        "SCHOOLING_V_YN": "학력",
        "MILITARY_V_YN": "병역",
        "CERTIFICATE_V_YN": "자격 및 면허",
        "LANGUAGE_V_YN": "어학능력",
        "EDUCATION_V_YN": "교육훈련",
        "FAMILY_V_YN": "가족",
        "ETC_V_YN": "기타",
        "JUSTICE_V_YN": "상벌",
        "OFFICIALORDER_V_YN": "발령",
        "JOBOFF_V_YN": "휴직"
    };

    common.app._envSort = {
        "01": "PROFILE_EMP_YN",
        "02": "WORK_HIS_V_YN",
        "03": "HD_TECH_V_YN",
        "04": "SCHOOLING_V_YN",
        "05": "MILITARY_V_YN",
        "06": "CERTIFICATE_V_YN",
        "07": "LANGUAGE_V_YN",
        "08": "EDUCATION_V_YN",
        "09": "FAMILY_V_YN",
        "10": "ETC_V_YN",
        "11": "JUSTICE_V_YN",
        "12": "OFFICIALORDER_V_YN",
        "13": "JOBOFF_V_YN"
    };
    common.app.excelDownload = function (title, tableId) {
        var table = "", date = "";

        table = $(tableId).clone();
        table.find('colgroup').remove();

        table.find('table thead tr').css({ 'background-color': '#788496' });
        table.find('table').attr("border", "1");
        table.find('table tfoot').remove();

        $.each(table.find('table tbody tr:first td'), function (i, v) {
            var _width = $(tableId).find("tr td:eq(" + i + ")").width();
            table.find("tr td:eq(" + i + ")").css({ 'width': _width + 'px' })
        });
        //    	$.each(table.find('table tbody tr'), function(i, v){
        //    		$("#tableList tr:eq("+i+")").css("background-color", $("#tableList tr:eq("+i+")").css("background-color"));
        //    	});

        if (title != "") {
            var totColumns = table.find('table tbody tr:nth-child(1) td').length;
            var newTr = '<tr><td colspan=' + totColumns + ' style="font-size: 18px;height:40px; vertical-align: top;text-align:center; font-weight:bold">' + title + '</td></tr>'
            table.find('table thead').prepend(newTr);
        }
        table = table.html();
        var template = '\uFEFF' + table;

        var blob = new Blob([template], {
            type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8"
        });
        saveAs(blob, title + ".xls");
    };
    // format byte
    common.app.formatBytes = function (bytes, decimals) {
        if (bytes == "" || bytes == undefined || isNaN(bytes)) bytes = "";
        if (bytes == 0) return '0 Bytes';
        var k = 1024,
            dm = decimals <= 0 ? 0 : decimals || 2,
            sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
            i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + '' + sizes[i];
    };

    $.fn.setTagValue = function (dat) {
        var tag = $(this).get(0).tagName;
        var type = $(this).attr("type");
        switch (tag.toLowerCase()) {
            case "textarea":
            case "input":
                if (type == "radio" || type == "checkbox" && !_jex.getInstance().isNull(dat)) $(this).attr("checked", true);
                else $(this).val(dat);
                break;
            case "select":
                $(this).val(dat);
                break;
            case "img":
                if (!jexjs.isNull(dat)) $(this).attr("src", dat);
                else if (jexjs($(this).attr("src"))) $(this).remove();
                break;
            case "table":
                if (dat = "") $(this).find("tr").remove();
                break;
            default:
                $(this).html(dat);
                break;
        };
    };

    /* ie 8에서 Object.keys 안먹힘 [재정의 함수] */
    if (!Object.keys) Object.keys = function (o) {
        if (o !== Object(o))
            throw new TypeError('Object.keys called on a non-object');
        var k = [], p;
        for (p in o) if (Object.prototype.hasOwnProperty.call(o, p)) k.push(p);
        return k;
    };

    String.prototype.replaceAll = function (str1, str2) {
        var temp_str = this;
        if (temp_str == null || temp_str == "undefined" || temp_str == "") {
            return "";
        } else {
            temp_str = temp_str.replace(/(^\s*)|(\s*$)/gi, "");
            temp_str = temp_str.replace(eval("/" + str1 + "/gi"), str2);
            return temp_str;
        }
    };

    /* 가로 스크롤 바 존재 여부 */
    $.fn.hasHorizontalScrollBar = function () {
        return this.get(0) ? this.get(0).scrollWidth > this.innerWidth() : false;
    };

    /* 세로 스크롤 바 존재 여부 */
    $.fn.hasScrollBar = function () {
        return (this.prop("scrollHeight") == 0 && this.prop("clientHeight") == 0)
            || (this.prop("scrollHeight") > this.prop("clientHeight"));
    };



}
/**
 * smartPopup Open 함수
 * 
 * @param option
 * @return
 */
function open_smartPop(opt) {
    var doc;
    try {
        doc = window.parent;
        doc.smartOpenPop(opt);
    } catch (e) {
        smartOpenPop(opt);
    }
}
function resize_smartPop(opt) {
    var doc;
    try {
        doc = window.parent;
        doc.smartPopReSize(opt);
    } catch (e) {
        smartPopReSize(opt);
    }
}





/**
 * smartPopUp Close 함수
 * 
 * @param clllback
 *            리턴받을 함수
 * @param data
 *            리턴함수에 전달한 JSON DATA
 */
function close_smartPop(callbackFn, data) {
    var doc;
    try {
        doc = window.parent;
        doc.smartClosePop(callbackFn, data);
    } catch (e) {

        // window.close();
        smartClosePop(callbackFn, data); // smartClosePop
    }
}

/**
 * IEVersionCheck 함수
 * 
 * @param
 * @param
 */
function IEVersionCheck() {

    var word;
    var version = "N/A";

    var agent = navigator.userAgent.toLowerCase();
    var name = navigator.appName;

    // IE old version ( IE 10 or Lower )
    if (name == "Microsoft Internet Explorer") word = "msie ";

    else {
        // IE 11
        if (agent.search("trident") > -1) word = "trident/.*rv:";

        // IE 12 ( Microsoft Edge )
        else if (agent.search("edge/") > -1) word = "edge/";
    }

    var reg = new RegExp(word + "([0-9]{1,})(\\.{0,}[0-9]{0,1})");
    if (reg.exec(agent) != null)
        version = RegExp.$1 + RegExp.$2;

    return parseInt(version);
}

/**
 * @title 금액을 한글로 반환
 * @since 2015-04-07
 * @author y2twind@gmail.com
 * @version 0.1
 * @param amt
 *            금액
 * @returns {String}
 */
function getAmountKorean() {
    var args = arguments;
    var arrDigit1 = Array('', '일', '이', '삼', '사', '오', '육', '칠', '팔', '구');
    var arrDigit3 = Array('', '십', '백', '천');
    var arrDigit4 = Array('', '만', '억', '조', '경', '해', '자', '양', '구', '간', '정', '재', '극');
    var digitIdx = 0;  // 자릿수
    var digit4Idx = 0;  // arrDigit4의 index
    var digit4Rest = 0;  // 4로 나눈 나머지
    var digit4Used = false;  // arrDigit4 사용여부
    var rslt = '';  // 결과
    var amt = args[0];
    amt = amt.toString().replace(/[^\d\.]/g, '').replace(/\.\d+$/g, '');

    for (var idx = amt.length - 1; idx >= 0; idx--) {
        digit4Rest = digitIdx % 4;

        if (digitIdx && !digit4Rest) {
            digit4Idx++;
            digit4Used = false;
        }

        if (amt[idx] > 0) {
            if (!digit4Used) {
                rslt = arrDigit4[digit4Idx] + rslt;
                digit4Used = true;
            }
            rslt = arrDigit3[digit4Rest] + rslt;
            rslt = arrDigit1[amt[idx]] + rslt;
        }
        digitIdx++;
    }
    return rslt;
}


/**
 * 전자결재 팝업 종료 후 '등록되었습니다' 라는 메시지를 띄우고 테이블 reload하는 함수
 * 
 * @param msg
 */
function closeApprPopup(msg) {
    if (!common.app.win || typeof (common.app.win.closed) == 'undefined' || common.app.win.closed) {
        close_smartPop("fn_search", msg);
    }
}
/**
 * 사용법: data-inputmask="'alias': 'numeric'" [numeric, currency, onlyNumeric, email, date]
 */
var customInputmask = (function () {
    var config = {
        extendDefaults: {
            showMaskOnHover: false,
            showMaskOnFocus: false
        },
        extendDefinitions: {},
        extendAliases: {
            'numeric': {
                radixPoint: '.',
                groupSeparator: ',',
                autoGroup: true,
                placeholder: ''
            },
            'currency': {
                alias: 'numeric',
                digits: '*',
                digitsOptional: true,
                radixPoint: '.',
                groupSeparator: ',',
                suffix: '',
                prefix: '',
                autoGroup: true,
                placeholder: ''
            },
            'currencyOnlyPositive': {
                alias: 'numeric',
                digits: '*',
                allowMinus: false,
                digitsOptional: true,
                radixPoint: '.',
                groupSeparator: ',',
                suffix: '',
                prefix: '',
                autoGroup: true,
                placeholder: ''
            },
            'onlyNumeric': {
                mask: "9{*}",
                allowMinus: false,
                placeholder: ''
            },
            'numericZeroStart': {
                regex: "^[0]([0-9]{10})?$",
                allowMinus: false,
                placeholder: ''
            },
            'numericOnly': {
                regex: "^[0-9]?$",
                placeholder: ''
            },
            'percentge': {
                //					mask: "9{0,3}.9{0,2}",
                regex: "^[0-9]{1,3}([.][0-9]{1,2})?$",
                allowMinus: false,
                placeholder: ''
            },
            'percentge1': {
                radixPoint: ".",
                autoGroup: true,
                suffix: " %",
                clearMaskOnLostFocus: false
            },
            'time': {
                //					regex:   "^([0-9]|0[0-9]|[0-9]{1,3}):[0-9][0-9]?$",
                regex: "^([0-9]|[0-9]{0,3}):[0-9][0-9]?$",
                allowMinus: false,
                placeholder: ''
            },
            'time1': {
                //regex: "^([0-9]|0[0-9]|1[0-9]|2[0-3]):([0-9]|[0-5][0-9])?$",
                regex: "^(0[0-9]|1[0-9]|2[0-4]):([0-5][0-9])?$",
                allowMinus: false,
                placeholder: ''
            },
            'email': {
                placeholder: ''
            },
            'date': {
                alias: 'yyyy-mm-dd',
                placeholder: ''
            },
            'year': {
                alias: 'yyyy',
                placeholder: ''
            },
            'hp_no': {
                mask: '99-9999-9999'
                //					,placeholder: ''
            },
            'clph_no': {
                mask: '999-9999-9999'
                //					,placeholder: ''
            },
            'blood': {
                regex: '(A|B|AB|O)[+-]',
                placeholder: ''
            },
            'rate': {
                regex: "^[0]|[1-9][0-9]?$|^100$"
            },
            'rr_no': {
                mask: '999999-9999999'
            },
            'bsnn_no': {
                mask: '999-99-99999'
            },
            'alphabet_only': {
                regex: '^([A-Za-z]{30})?$'
                //			    	 regex: "^[0]([0-9]{10})?$",
            },
            'english_only': {
                regex: '^([A-Za-z0-9\\-\\s]{10000})?$'
            },
            'english_and_space': {
                regex: '^([A-Za-z\\-\\s]{100})?$'
            }
        }
    };

    var init = function () {
        Inputmask.extendDefaults(config.extendDefaults);
        Inputmask.extendDefinitions(config.extendDefinitions);
        Inputmask.extendAliases(config.extendAliases);
        $('[data-inputmask]').inputmask();
    };
    return {
        init: init
    };
}());
/* Overide Number function to prevent NaN error */
function Number(a) {
    return isNaN(a) ? 0 : isNaN(parseFloat(a)) ? 0 : parseFloat(a);
}

function lpad(str, strSize, cStr) {
    str = str + "";
    var strLength = str.length;
    var result = "";

    if (strLength < strSize) {
        for (var i = 0; i < strSize - strLength; i++) {
            result += cStr;
        }
        result += str;
    } else {
        result = str
    }
    return result
}

function fn_alert(msg, error) {
    var closeTf = false;
    if (error) {
        if (msg.indexOf("세션") < 0) {
            msg = "앱 실행 중 오류가 발생했습니다. 비즈플레이 관리자에게 문의하세요. \n(" + msg + ")";
        } else {
            closeTf = true;
        }
    }
    alert(msg);
    if (closeTf) {
        self.close();
    }
}

$(document).ready(function () {
    // Initialize
    //	if(toastr) {
    //		toastr.options = {
    //			//"closeButton": true,
    //			"debug": false,
    //			"preventDuplicates": true,
    //			//"positionClass": "toast-top-right",
    //			"positionClass": "toast-bottom-left",
    //			"onclick": null,
    //			"showDuration": "300",
    //			"hideDuration": "1000",
    //			"timeOut": "1500",
    //			"extendedTimeOut": "1000",
    //			"showEasing": "swing",
    //			"hideEasing": "linear",
    //			"showMethod": "fadeIn",
    //			"hideMethod": "fadeOut"
    //		};
    //	};	
    //	customInputmask.init();
});