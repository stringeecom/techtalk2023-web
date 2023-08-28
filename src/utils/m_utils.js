import array_utils from "./array_utils";
import number_utils from "./number_utils";

export default {
  randomString(length = 5) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    return result;
  },

  isNumber(num) {
    return (num !== null && num !== undefined && !isNaN(num));
  },

  checkString(str) {
    if (typeof str === "string" || str instanceof String) {
      return (str !== undefined && str !== null && str.trim() !== "");
    }
    if (!isNaN(str)) {
      return true;
    }
    return false;
  },

  checkUserName(username) {
    if (!this.checkString(username)) {
      return false;
    }
    if (username.trim().length < 4) {
      return false;
    }
    return true;
  },

  checkAlpha(text) {
    let regex = /^([a-zA-Z0-9_-]+)$/;
    return regex.test(text);
  },

  checkEmail(email) {
    let re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  },

  checkPhoneNumber(phone) {
    if (!this.checkString(phone)) {
      return false;
    }
    let flag = false;
    phone = phone.replace("(+84)", "0");
    phone = phone.replace("+84", "0");
    phone = phone.replace("0084/g", "0");
    phone = phone.replace(/ /g, "");
    if (phone !== "") {
      let firstNumber = phone.substring(0, 2);
      console.log("phone: " + phone + ", firstNumber: " + firstNumber);
      if ((parseInt(firstNumber) < 10 && parseInt(firstNumber) > 0) && phone.length === 10) {
        if (phone.match(/^\d{10}/)) {
          flag = true;
        }
      } else if (firstNumber === "01" && phone.length === 11) {
        if (phone.match(/^\d{11}/)) {
          flag = true;
        }
      }
    }
    return flag;
  },

  checkIp(ipaddress) {
    if (/^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(ipaddress)) {
      return true;
    }
    return false;
  },

  checkData(data) {
    return (data !== undefined && data !== null);
  },

  getLowerString(str) {
    if (str === undefined || str === null) {
      return "";
    }
    return str.trim().toLowerCase();
  },

  arrayToString(arr, delim) {
    if (!array_utils.isArray(arr)) {
      return "";
    }
    if (!this.checkString(delim)) {
      delim = ",";
    }
    let ret = "";
    for (let i = 0; i < arr.length; i++) {
      if (i > 0) {
        ret += delim;
      }
      ret += arr[i];
    }
    return ret;
  },

  calcTotalPage(size, total) {
    let result = total;
    result = Math.floor(total / size);
    const a1 = total % size;
    if (a1 !== 0) {
      result++;
    }
    return result;
  },

  id: function() {
    return "_" + Math.random().toString(36).substr(2, 9);
  },

  get_type_school: function(type) {
    let v = parseInt(type);
    if (v === 6) {
      return "Trường chuyên";
    } else {
      return "Không chuyên";
    }
  },

  hideAllModal() {
    // eslint-disable-next-line no-undef
    $("#mdLoading").modal("hide");
  },

  showLoading(state) {
    this.hideAllModal();
    if (state === undefined || state === null) {
      state = false;
    }
    if (state) {
      // eslint-disable-next-line no-undef
      $("#mdLoading").modal("show");
    } else {
      // eslint-disable-next-line no-undef
      $("#mdLoading").modal("hide");
    }
  },

  getMessageResponse3(res, successCode, success, failure) {
    if (res === undefined || res === null || res.data === undefined || res.data === null) {
      return {
        "dialog": "<b>" + failure + "</b>",
        "notify": failure
      };
    }
    if (res.data.rc === undefined || res.data.rc === null) {
      return {
        "dialog": "<b>" + failure + "</b>",
        "notify": failure
      };
    }
    if (parseInt(res.data.rc) === successCode) {
      return {
        "dialog": "<b>" + success + "</b>",
        "notify": success
      };
    }
    if (!this.checkString(res.data.rd)) {
      return {
        "dialog": "<b>" + failure + "</b>",
        "notify": failure
      };
    }

    return {
      "dialog": "<b>" + res.data.rd + "</b>",
      "notify": res.data.rd
    };

  },

  getMessageResponse2(res, success, failure) {
    if (res === undefined || res === null || res.data === undefined || res.data === null) {
      return {
        "dialog": "<b>" + failure + "</b>",
        "notify": failure
      };
    }
    if (res.data.rc === undefined || res.data.rc === null) {
      return {
        "dialog": "<b>" + failure + "</b>",
        "notify": failure
      };
    }
    if (parseInt(res.data.rc) === 0) {
      return {
        "dialog": "<b>" + success + "</b>",
        "notify": success
      };
    }
    if (!this.checkString(res.data.rd)) {
      return {
        "dialog": "<b>" + failure + "</b>",
        "notify": failure
      };
    }

    return {
      "dialog": "<b>" + res.data.rd + "</b>",
      "notify": res.data.rd
    };

  },

  getMessageResponse(res, success, failure) {
    if (res === undefined || res === null || res.data === undefined || res.data === null) {
      return "<b>" + failure + "</b>";
    }
    if (res.data.rc === undefined || res.data.rc === null) {
      return "<b>" + failure + "</b>";
    }
    if (parseInt(res.data.rc) === 0) {
      return "<b>" + success + "</b>";
    }
    if (!this.checkString(res.data.rd)) {
      return "<b>" + failure + "</b>";
    }
    return "<b>" + res.data.rd + "</b>";
  },

  getUniqElems(arr) {
    return arr.filter(function(item, index) {
      return arr.indexOf(item) >= index;
    });
  },

  clearArrays(arr) {
    arr.splice(0, arr.length);
  },

  jsonToQueryString(json) {
    return "?" +
      Object.keys(json).map(function(key) {
        return encodeURIComponent(key) + "=" +
          encodeURIComponent(json[key]);
      }).join("&");
  },

  nFormatter(num) {
    if (num >= 1000000000) {
      return (num / 1000000000).toFixed(1).replace(/\.0$/, "") + "B";
    }
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1).replace(/\.0$/, "") + "M";
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(1).replace(/\.0$/, "") + "K";
    }
    return num;
  },

  formatNumber(number) {
    return number_utils.formatNumberEx((number));
  },

  checkMenhGia(price) {
    let val = parseInt(price);
    return val === 10000 || val === 20000 || val === 30000 || val === 50000 || val === 100000 || val === 200000 || val === 300000 || val === 500000 || val === 1000000;

  },

  checkUrl(myURL) {
    let pattern = new RegExp("^(https?:\\/\\/)?" + // protocol
      "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.?)+[a-z]{2,}|" + // domain name
      "((\\d{1,3}\\.){3}\\d{1,3}))" + // ip (v4) address
      "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + //port
      "(\\?[;&amp;a-z\\d%_.~+=-]*)?" + // query string
      "(\\#[-a-z\\d_]*)?$", "i");
    return pattern.test(myURL);
  },

  getParameterByName(name, url) {
    if (!url) url = window.location.href;
    // eslint-disable-next-line no-undef
    name = name.replace(/[[\]]/g, "\\$&");
    let regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
      results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return "";
    return decodeURIComponent(results[2].replace(/\+/g, " "));
  },

  isValidUrl(urlString) {
    try {
      return Boolean(new URL(urlString));
    } catch (e) {
      return false;
    }
  }

};
