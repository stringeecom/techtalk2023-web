import axios from "axios";
import m_util from "./m_utils";

export default {
    DEFAULT_TIME_OUT: 300000,
    BASE_URL: "https://demo-api.stringeextest.com",

    postNoToken(context, url, params, fn, tm, loading) {
        if (tm === undefined || tm === null) {
            tm = this.DEFAULT_TIME_OUT;
        }
        if (loading !== undefined && loading) {
            m_util.showLoading(true);
        }
        const config = {
            timeout: tm
        };
        axios.post(this.BASE_URL + url, params, config).then((response) => {
            this._processResponse(context, response, fn);
        }).catch((error) => {
            this._processError(context, error);
        }).then(function () {
            if (loading !== undefined && loading) {
                m_util.hideAllModal();
            }
        });
    },

    post(context, url, params, fn, tm, loading) {
        if (tm === undefined || tm === null) {
            tm = this.DEFAULT_TIME_OUT;
        }
        if (loading !== undefined && loading) {
            m_util.showLoading(true);
        }
        const config = {
            headers: {Authorization: `${this._getToken()}`},
            timeout: tm
        };
        axios.post(this.BASE_URL + url, params, config).then((response) => {
            this._processResponse(context, response, fn);
        }).catch((error) => {
            this._processError(context, error);
        }).then(function () {
            if (loading !== undefined && loading) {
                m_util.hideAllModal();
            }
        });
    },
    get(context, url, params, fn, tm, loading) {
        if (tm === undefined || tm === null) {
            tm = this.DEFAULT_TIME_OUT;
        }
        if (loading !== undefined && loading) {
            m_util.showLoading(true);
        }
        const config = {
            headers: {Authorization: `${this._getToken()}`},
            timeout: tm,
            params: params
        };
        axios.get(this.BASE_URL + url, config).then((response) => {
            this._processResponse(context, response, fn);
        }).catch((error) => {
            this._processError(context, error);
        }).then(function () {
            if (loading !== undefined && loading) {
                m_util.hideAllModal();
            }
        });
    },
    postForm(context, url, formData, fn, tm, loading) {
        if (tm === undefined || tm === null) {
            tm = this.DEFAULT_TIME_OUT;
        }
        if (loading !== undefined && loading) {
            m_util.showLoading(true);
        }
        const config = {
            headers: {
                "Authorization": `${this._getToken()}`,
                "Content-Type": "multipart/form-data"
            },
            timeout: tm
        };
        axios.post(this.BASE_URL + url, formData, config).then((response) => {
            this._processResponse(context, response, fn);
        }).catch((error) => {
            this._processError(context, error);
        }).then(function () {
            if (loading !== undefined && loading) {
                m_util.hideAllModal();
            }
        });
    },
    _processError(context, err) {
        console.log(err);
        if (err.response.status === 401) {
            const {$router} = context;
            localStorage.removeItem("user");
            $router.push("/login");
        }
    },
    _processResponse(context, response, fnCallback) {
        if (response?.status === 401) {
            const {$router} = context;
            localStorage.removeItem("user");
            $router.push("/login");
            return;
        }
        fnCallback(response);
    },
    _getToken() {
        let userJson = localStorage.getItem("user");
        const user = JSON.parse(userJson);
        return user.token;
    }
};
