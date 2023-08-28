export default {

    formatNumberEx(n) {
        var c = 0,
            d = ".",
            t = ",",
            s = n < 0 ? "-" : "",
            i = parseInt(n = Math.abs(+n || 0).toFixed(c)) + "",
            j = (j = i.length) > 3 ? j % 3 : 0;
        return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
    },

    isNumber(num) {
        return !(num === null || num === undefined || isNaN(num) || num.toString().trim().length === 0);
    },

    formatNumberExFloat(n) {
        if (!this.isNumber(n)) {
            return n;
        }
        let num = parseFloat(n).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
        let s = num.split(".");
        if (s[1] === "00") {
            return s[0];
        } else {
            return num;
        }
    }
}