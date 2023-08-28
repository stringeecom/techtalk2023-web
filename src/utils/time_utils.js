import m_utils from './m_utils';
// import moment from 'moment';
import moment from 'moment/moment'

export default {

    isDateUnixTimeStamp(time) {
        try {
            let d = new Date(time);
            return this.isDate(d);
        } catch (e) {
        }
        return false;
    },

    isDate(date) {
        return Object.prototype.toString.call(date) === '[object Date]';
    },

    checkDayIsCurrentDay(day) {
        let currentDate = new Date();
        currentDate.setHours(0, 0, 0, 0);
        day.setHours(0, 0, 0, 0);
        if (currentDate.getTime() == day.getTime()) {
            return true;
        }
        return false;
    },

    stringToDateTheLV(string) {
        console.log("date is " + string);
        if (!m_utils.checkString(string)) {
            return '';
        }
        let parts = string.split('-');
        console.log(parts);
        let date = new Date(parts[0], parts[1] - 1, parts[2]);
        date = this.resetTime(date);
        return date;
    },

    stringToDate_mm_yyyy(string) {
        if (this.isDate(string)) {
            return string;
        }
        if (string == '') {
            return '';
        }
        let parts = string.split('/');
        let date = new Date(parts[1], parts[0] - 1, 1);
        return date;
    },

    dateToString_mm_yyyy(date) {
        if (!this.isDate(date)) {
            return '';
        }
        let year = date.getFullYear();
        let month = date.getMonth() + 1;
        return ((month >= 10 ? month : "0" + month) + '/' + year);
    },

    stringToDate(string) {
        if (!m_utils.checkString()) {
        }
        let parts = string.split('/');
        let date = new Date(parts[2], parts[1] - 1, parts[0]);
        date = this.resetTime(date);
        return date;
    },
    stringToDateTime(string) {
        if (!m_utils.checkString()) {
        }
        let parts = string.split(',')[0].split('/');
        let time = string.split(',')[1].split(' ')[1].split(':');
        let date = new Date(parts[2], parts[1] - 1, parts[0], time[0], time[1]);
        //date = this.resetTime(date);
        return date;
    },

    stringToTimeStamp(time) {
        if (time === "") {
            return "";
        }
        let date = this.stringToDate(time);
        return date.getTime();
    },

    dateToString(date) {
        if (!this.isDate(date)) {
            return '';
        }
        let year = date.getFullYear();
        let month = date.getMonth() + 1;
        let day = date.getDate();
        return ((day >= 10 ? day : "0" + day) + '/' + (month >= 10 ? month : "0" + month) + '/' + year);
    },

    timeStampToShow(time) {
        let date = new Date(time);
        return this.dateToString(date);
    },

    dateToStringSent(date) {
        let year = date.getFullYear();
        let month = date.getMonth() + 1;
        let day = date.getDate();
        return year + "-" + (month + 1) + "-" + day;
    },

    remainDay(unix_timestamp) {
        let now = new Date();
        let a = new Date(unix_timestamp);
        now = this.resetTime(now);
        a = this.setToEndDay(a);
        return this.datediff(now, a);
    },

    setToEndDay(date) {
        date.setHours(23);
        date.setMinutes(59);
        date.setSeconds(59);
        date.setMilliseconds(0);
        return date;
    },

    dateToStringPlus(date) {
        if (!this.isDate(date)) {
            date = this.stringToDate(date);
        }
        let year = date.getFullYear();
        let month = date.getMonth() + 1;
        let day = date.getDate();
        return (year + '-' + (month >= 10 ? month : "0" + month) + '-' + (day >= 10 ? day : "0" + day));
    },

    resetTime(date) {
        date.setHours(0);
        date.setMinutes(0);
        date.setSeconds(0);
        date.setMilliseconds(0);
        return date;
    },

    convertTime(time) {
        if (isNaN(time)) {
            return "";
        }
        let a = new Date(time);
        let year = a.getFullYear();
        let month = a.getMonth() + 1;
        let date = a.getDate();
        let hour = a.getHours();
        let min = a.getMinutes();
        let sec = a.getSeconds();
        return ((date >= 10 ? date : "0" + date) + '/' + (month >= 10 ? month : "0" + month) + '/' + year + ' ' + (hour >= 10 ? hour : "0" + hour) + ':' + (min >= 10 ? min : "0" + min) + ':' + (sec >= 10 ? sec : "0" + sec));
    },

    getPartName(date) {
        let year = date.getFullYear();
        let month = date.getMonth() + 1;
        let day = date.getDate();
        return parseInt(year + (month >= 10 ? month : "0" + month) + (day >= 10 ? day : "0" + day));
    },

    convertDate(time) {
        if (isNaN(time)) {
            return "";
        }
        let a = new Date(time);
        return this.dateToString(a);
    },

    getTimeString(time) {

        if (!m_utils.checkString(time)) {
            return time;
        }

        if (time.indexOf("-") !== -1) {
            let arr = time.split("-");
            if (arr.length >= 3) {
                return this._getTimeString(arr);
            }
        }

        if (time.indexOf("/") !== -1) {
            let arr = time.split("/");
            if (arr.length >= 3) {
                return this._getTimeString(arr);
            }
        }

        return time;
    },

    datediff(first, second) {
        let d1 = new Date(first);
        let d2 = new Date(second);
        d1 = this.resetTime(d1);
        d2 = this.setToEndDay(d2);
        return Math.round((d2 - d1) / (1000 * 60 * 60 * 24));
    },

    _getTimeString(arr) {
        let day = parseInt(arr[2]);
        if (isNaN(day)) {
            day = 0;
        }
        let month = parseInt(arr[1]);
        if (isNaN(month)) {
            month = 0;
        }
        let year = parseInt(arr[0]);
        if (isNaN(year)) {
            year = 0;
        }
        if (day > 1000) {
            let tmp = day;
            day = year;
            year = tmp;
        }
        return (day >= 10 ? day : "0" + day) + "/" + (month >= 10 ? month : "0" + month) + "/" + (year > 0 ? year : "0000");
    },

    getStartTime(start) {
        if (!this.isDate(start)) {
            start = this.stringToDate(start);
        }
        if (!this.isDate(start)) {
            start = new Date();
        }
        start.setHours(0, 0, 0, 0);
        return start;
    },

    getStartDateTime(start) {
        if (!this.isDate(start)) {
            start = this.stringToDateTime(start);
        }
        if (!this.isDate(start)) {
            start = new Date();
        }
        return start;
    },

    /**
     *
     * @param date (HH:mm) or Date
     * @returns {*|number|number}
     */
    getHours(date) {
        if (!this.isDate(date)) {
            let a = date.split(":");
            return parseInt(a[0]);
        }
        return date.getHours();
    },

    /**
     *
     * @param date (HH:mm) or Date
     * @returns {*|number|number}
     */
    getMinutes(date) {
        if (!this.isDate(date)) {
            let a = date.split(":");
            return parseInt(a[1]);
        }
        return date.getMinutes();
    },

    validateOnlyTime(time) {
        if (time === undefined || time === null) {
            return false;
        }
        if (this.isDate(time)) {
            return true;
        }
        let a = time.split(":");
        return a.length >= 2 && !isNaN(a[0]) && !isNaN(a[1]);
    },

    getEndTime(end) {
        if (!this.isDate(end)) {
            end = this.stringToDate(end);
        }
        if (!this.isDate(end)) {
            end = new Date();
        }
        end.setHours(23, 59, 59, 0);
        return end;
    },

    getEndDateTime(end) {
        if (!this.isDate(end)) {
            end = this.stringToDateTime(end);
        }
        if (!this.isDate(end)) {
            end = new Date();
        }
        return end;
    },

    compareDate(date1, date2) {
        let d1 = moment(date1);
        let d2 = moment(date2);
        if (d1 > d2) {
            return 1;
        } else if (d1 === d2) {
            return 0;
        } else {
            return -1;
        }
    },

    formatDate2String(date) {
        if (this.isDate(date)) {
            return this.convertDate(date);
        }
        return date;
    },

    formatTime2String(date) {
        if (this.isDate(date)) {
            return this.getOnlyHourMinute(date);
        }
        return date;
    },

    getOnlyHourMinute(time) {
        if (isNaN(time)) {
            return "";
        }
        let a = new Date(time);
        let hour = a.getHours();
        let min = a.getMinutes();
        return (hour >= 10 ? hour : "0" + hour) + ':' + (min >= 10 ? min : "0" + min);
    },

    convertDateForDoNV(date) {
        let s_date = "";
        if (this.isDate(date)) {
            s_date = this.convertDate(date);
        } else {
            s_date = date;
        }

        return s_date.replace(/\//g, "-");
    },

    addDate(curDate, days) {
        return new Date(curDate.getTime() + days * 24 * 60 * 60 * 1000);
    },

    addMinute(curDate, minute) {
        return new Date(curDate.getTime() + minute * 60 * 1000);
    },

    //Tổng số tuần trên tháng
    weekCount(year, month_number) {
        // month_number is in the range 1..12
        let firstOfMonth = new Date(year, month_number - 1, 1);
        let lastOfMonth = new Date(year, month_number, 0);
        console.log(firstOfMonth);
        if (firstOfMonth.getDay() == 0) {
            return Math.ceil((6 + lastOfMonth.getDate()) / 7);
        }
        let used = (firstOfMonth.getDay() - 1) + lastOfMonth.getDate();
        return Math.ceil(used / 7);
    },

    getDayInWeekLoop(indexWeek, firstOfMonth, lastOfMonth) {
        let startOfFirstWeek = new Date(firstOfMonth.getTime());
        while (startOfFirstWeek.getDay() != 1) {
            startOfFirstWeek.setDate(startOfFirstWeek.getDate() - 1);
        }
        let firstOfWeek;

        if (indexWeek == 1) {
            firstOfWeek = startOfFirstWeek;
        } else {
            firstOfWeek = new Date(startOfFirstWeek.getTime());
            firstOfWeek.setDate(startOfFirstWeek.getDate() + 7 * (indexWeek - 1))
        }
        console.log(firstOfWeek);
        console.log(startOfFirstWeek);
        let listDayInWeek = [];
        listDayInWeek.push(firstOfWeek);
        //Dựa vào ngày đầu tiên của tuần
        for (let i = 1; i < 7; i++) {
            let nextDate = new Date(listDayInWeek[i - 1].getTime());
            // if (nextDate>lastOfMonth){
            //     break;
            // }
            nextDate.setDate(nextDate.getDate() + 1);
            if (nextDate.getDay() == 1) {
                break;
            }
            listDayInWeek.push(nextDate);
        }
        ;
        // if (listDayInWeek.length<7) {
        //     for (let j = 1; j < 7; j++) {
        //         let beforeDate = new Date(listDayInWeek[j - 1].getTime());
        //         beforeDate.setDate(beforeDate.getDate() - 1);
        //         if (beforeDate.getDay() == 0) {
        //             break;
        //         }
        //         beforeDate.setDate(beforeDate.getDate() - 1);
        //         listDayInWeek.push(beforeDate);
        //     }
        // };
        console.log(listDayInWeek);
        return listDayInWeek;
    },

    getDayOfWeek(indexWeek, month_number, year) {
        let firstOfMonth = new Date(year, month_number - 1, 1);
        let lastOfMonth = new Date(year, month_number, 0);
        return this.getDayInWeekLoop(indexWeek, firstOfMonth, lastOfMonth);
        // if (indexWeek == 4){
        //     return this.getDayInWeekLoop(this.getNextDay(this.getDayOfWeek(3,month_number,year)[this.getDayOfWeek(3,month_number,year).length-1]))
        // }
        // if (indexWeek == 5){
        //     return this.getDayInWeekLoop(this.getNextDay(this.getDayOfWeek(4,month_number,year)[this.getDayOfWeek(4,month_number,year).length-1]),lastOfMonth)
        // }
        // if (indexWeek == 6){
        //     return this.getDayInWeekLoop(this.getNextDay(this.getDayOfWeek(5,month_number,year)[this.getDayOfWeek(5,month_number,year).length-1]),lastOfMonth)
        // }
    },
    //Lấy thứ tự tuần từ 1 ngày cụ thể truyền null nếu là ngày hiện tại
    getSttWeekFromDay(day) {
        let currentDay;
        if (day == null) {
            currentDay = new Date();
        } else {
            currentDay = day;
        }
        let firstOfMonth = new Date(currentDay.getFullYear(), currentDay.getMonth(), 1);
        return this.getTotalWekFromTo(firstOfMonth, currentDay);
    },
    //Lấy tổng số tuần từ ngày đến ngày
    getTotalWekFromTo(fromDate, toDate) {
        if (!this.isDate(fromDate)) {
            return 0;
        }
        if (!this.isDate(toDate)) {
            return 0;
        }
        let t_fromDate = new Date(fromDate.getTime());
        let t_ToDate = new Date(toDate.getTime());
        t_fromDate.setHours(0, 0, 0, 0);
        t_ToDate.setHours(0, 0, 0, 0);
        let nDayFrom = t_fromDate.getDay();
        if (nDayFrom == 0) {
            nDayFrom = 7;
        }
        let nDayTo = t_ToDate.getDay();
        if (nDayTo == 0) {
            nDayTo = 7;
        }
        let totalDate = ((t_ToDate.getTime() - t_fromDate.getTime()) / (1000 * 24 * 60 * 60)) + 1;//Lấy tổng số ngày
        let used = totalDate - ((8 - nDayFrom) + (nDayTo));//Số ngày có số tuần hoàn chỉnh
        let total_week = used / 7;
        console.log("Total weed " + used);
        return total_week + 2 //Cộng tuần đầu và tuần cuối
    },
    getNextDay(day) {
        let rs = new Date(day.getTime());
        rs.setDate(rs.getDate() + 1);
        return rs;
    },

    //Lấy danh sách ngày của 1 tuần cụ thể
    getDatesFromDayOfWeek(stt_week, from, to) {
        let fromDate = new Date(from.getTime());
        let toDate = new Date(to.getTime());
        let listDates = [];
        fromDate.setHours(0, 0, 0, 0);
        toDate.setHours(0, 0, 0, 0);
        let firstDay = new Date(fromDate.getTime());
        console.log("Ngày đầu tiên");
        console.log(firstDay);
        if (stt_week > 1) {
            if (firstDay.getDay() == 0) {
                firstDay.setDate(firstDay.getDate() + (1 + (stt_week - 2) * 7));
            } else {
                firstDay.setDate(firstDay.getDate() + ((8 - firstDay.getDay()) + 7 * (stt_week - 2)));
            }
        }
        listDates.push(firstDay);
        if (firstDay.getTime() == toDate.getTime()) {
            console.log("run here");
            return listDates;
        }
        for (let i = 1; i < 7; i++) {
            let date = new Date(firstDay.getTime());
            date.setDate(date.getDate() + i);
            if (date.getTime() == toDate.getTime()) {
                listDates.push(date);
                break;
            }
            if (date.getDay() == 1) {
                break;
            }
            listDates.push(date);
        }
        return listDates;
    },

    getDatesFromDayOfWeekForContract(days, from, to) {
        let fromDate = new Date(from.getTime());
        let toDate = new Date(to.getTime());
        let listDates = [];
        fromDate.setHours(0, 0, 0, 0);
        toDate.setHours(0, 0, 0, 0);
        let totalDate = (toDate - fromDate) / (1000 * 60 * 60 * 24) + 1;
        for (let j = 0; j < days.length; j++) {
            for (let i = 0; i < totalDate; i++) {
                let date = new Date(fromDate.getTime());
                date.setDate(date.getDate() + i);
                if (date.getDay() == days[j]) {
                    listDates.push(new Date(date.getTime()));
                }
            }
        }
        return listDates;
    },
    convertFrameTimeToString(frame_time) {
        if (frame_time.length == 1) {
            frame_time = "0" + frame_time;
        }
        frame_time = frame_time + ":00";
        return frame_time;
    },
    checkDayThanFromCurrentHour(date, hour) {
        if (date == '') {
            return true;
        }
        if (!this.isDate(date)) {
            return true;
        }
        let currentDate = new Date();
        let date_clone = new Date(date.getTime());
        date_clone.setHours((hour + 1), 0, 0, 0);
        if ((date_clone.getTime() - currentDate.getTime()) > 0) {
            return false;
        }
        return true;
    },
    checkDayThanFromCurent(date, date_1) {
        if (date == '') {
            return true;
        }
        if (!this.isDate(date)) {
            return true;
        }
        let currentDate;
        if (date_1 == null) {
            currentDate = new Date();
        } else {
            currentDate = date_1;
        }
        currentDate.setHours(0, 0, 0, 0);
        let tDate = new Date(date.getTime());
        tDate.setHours(0, 0, 0, 0);
        if ((tDate - currentDate) >= 0) {
            return false;
        }
        return true;
    }
}
