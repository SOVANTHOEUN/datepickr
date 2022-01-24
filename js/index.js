$(function () {
    var recItem = {};
    _index.onload();
});

var _index = {
    onload: function () {
        _index.event();
    }, event: function () {
        $("#btnCalendar, #btnCalendar1").on("click", function () {
            checkDate();
        });
    }
}

function checkDate() {
    var _dayNames = ['일', '월', '화', '수', '목', '금', '토'];
    setTimeout(function () {
        $(".cal_srch").css("border", "1px solid #0867c5");
        $(".cal_srch").flatpickr({
            mode: "range"
            , showMonths: 2
            , dateFormat: "Y-m-d"
            , locale: "ko"
            , minDate: "today"
            , defaultDate: [$("#checkin").html(), $("#checkout").html()] // [new Date(), new Date().fp_incr(1)]
            , onChange: [function (selectedDates) {
                var _this = this;
                var dateArr = selectedDates.map(function (date) {
                    return _this.formatDate(date, 'Y.m.d');
                });

                // $(".startRange").prevAll().addClass("flatpickr-disabled");
                $(".today").prevAll().addClass("flatpickr-disabled");
                $(".startRange").next().addClass("default-selected");
                $(".startRange").addClass("disabled"); //Make startRange can't click again

                var fstartDate = _dayNames[new Date(dateArr[0].replace(/[.]/g, "-")).getDay()];
                var fStartDate = dateArr[0].replace(/[.]/g, "-");
                $("#checkin").html(dateArr[0] + "(" + fstartDate + ")");
                $("#checkin").attr("data-value", fStartDate);
                $("#PLAN_START_DT").val(fStartDate);

                var fendDate = _dayNames[new Date(common.app.null2void(dateArr[1]).replace(/[.]/g, "-")).getDay()];
                var d = $("#checkin").attr("data-value");
                var currDate = new Date(d);
                var nmonth = currDate.getMonth() + 1;
                var nyear = currDate.getFullYear();
                var lastDayOfM = new Date(nyear, nmonth, 0);

                var nday = "";
                var nextDate = "";
                var dNextDate = "";
                var fEndDate = "";

                if (currDate.getDate() == lastDayOfM.getDaysInMonth()) {
                    if (nmonth == 12) {
                        nmonth = 1;
                    } else {
                        nmonth = currDate.getMonth() + 2;
                    }
                    nextDate = nyear + '.' + (('' + nmonth).length < 2 ? '0' : '') + nmonth + '.' + (('' + nday).length < 2 ? '0' : '') + 1;
                    dNextDate = nextDate.replace(/[.]/g, "-");
                    fEndDate = _dayNames[new Date(dNextDate).getDay()];
                } else {
                    nday = currDate.getDate() + 1;
                    nextDate = nyear + '.' + (('' + nmonth).length < 2 ? '0' : '') + nmonth + '.' + (('' + nday).length < 2 ? '0' : '') + nday;
                    dNextDate = nextDate.replace(/[.]/g, "-");
                    fEndDate = _dayNames[new Date(dNextDate).getDay()];
                }

                if (dateArr[1] == undefined) {
                    $("#checkout").html(nextDate + "(" + fEndDate + ")");
                    $("#checkout").attr("data-value", dNextDate);
                    $("#PLAN_END_DT").val(dNextDate);
                } else {
                    var fiEndDate = dateArr[1].replace(/[.]/g, "-");
                    $("#checkout").html(dateArr[1] + "(" + fendDate + ")");
                    $("#checkout").attr("data-value", fiEndDate);
                    $("#PLAN_END_DT").val(fiEndDate);
                }
                // if($(".FLATPICKR-DAYS .DAYCONTAINER").LAST().CHILDREN("SPAN").HASCLASS("STARTRANGE")){
                //		$(".FLATPICKR-DAYS .DAYCONTAINER").FIRST().CHILDREN("SPAN").ADDCLASS("FLATPICKR-DISABLED");
                // }
            }]
            , onClose: function (selectedDates) {
                var _this = this;
                var ndateArr = selectedDates.map(function (date) {
                    return _this.formatDate(date, 'Y.m.d');
                });
                $("#checkin").html($("#checkin").html());
                $("#checkout").html($("#checkout").html());
                $(".cal_srch").css("border", "1px solid #bacadb");
            }
        }).toggle();

        // var newTop = $(".cal_srch").offset().top + $(".cal_srch").height() + 4;
        // var newLeft = $(".cal_srch").offset().left;
        // $(".flatpickr-calendar.hasTime").css("top", newTop + "px");
        // $(".flatpickr-calendar.hasTime").css("left", newLeft + "px");
    }, 50);
}