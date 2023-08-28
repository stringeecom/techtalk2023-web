import {createApp} from "vue";
import App from "./App.vue";
import router from "./router";
import axios from "axios";
import TheAuthLayout from "@src/layouts/AuthLayout.vue";
import VideoCallLayout from "@src/layouts/VideoCallLayout.vue";
import store from "./store/store";
import Vue3Toastify from "vue3-toastify";

import "@src/assets/css/main.css";
import "@src/assets/css/m-custom.css";

const app = createApp(App);

app.component("dashboard-layout", VideoCallLayout);
app.component("auth-layout", TheAuthLayout);

app.use(store);
app.use(router);

app.use(Vue3Toastify, {
    autoClose: 3000,
    pauseOnHover: false,
    pauseOnFocusLoss: false,
    style: {
        opacity: "1",
        userSelect: "initial"
    }
});

app.config.globalProperties.$axios = axios;
app.mount("#app");
