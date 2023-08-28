import m_tils from './m_utils';
import local_storage_util from './local_storage_util';

export default {

    stringToArray(string, delim) {
        let result = [];
        if (!m_tils.checkString(string)) {
            return result;
        }
        if (!m_tils.checkString(delim)) {
            delim = ",";
        }
        let arr = string.split(delim);
        for (let i = 0; i < arr.length; i++) {
            if (arr[i].trim() !== "") {
                result.push(arr[i]);
            }
        }
        return result;
    },

    arrayToString(arr, delim) {

        if (!this.isArray(arr)) {
            return "";
        }

        if (!m_tils.checkString(delim)) {
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

    isArray(what) {
        return Object.prototype.toString.call(what) === '[object Array]';
    },

    removeElement(value, array) {
        let index = array.indexOf(value);
        if (index > -1) {
            array.splice(index, 1);
        }
    },

    clearArrays(arrs) {
        if (!this.isArray(arrs)) {
            return;
        }
        arrs.splice(0, arrs.length);
        return arrs;
    },

    setAndSaveToLocalStorage(array, source, keyStore) {
        this.clearArrays(array);
        array = source;
        local_storage_util.setItem(keyStore, array);
        return array;
    },

    setArrays(array, source) {
        this.clearArrays(array);
        array = source;
        return array;
    },

    removeOneElement(array, key, value) {
        if (!this.isArray(array) || array.length === 0) {
            return null;
        }
        for (let i = 0; i < array.length; i++) {
            if (array[i][key] === value) {
                let o = array[i];
                array.splice(i, 1);
                return o;
            }
        }
        return null;
    },

    // sort
    sortDevice(arr) {
        arr.sort(function (a, b) {
            if (parseInt(b.ntf_code) === parseInt(a.ntf_code)) {
                return parseInt(a.port) - parseInt(b.port);
            } else {
                return parseInt(b.ntf_code) - parseInt(a.ntf_code);
            }
        });
    }

}