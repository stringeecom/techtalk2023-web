<template>
    <div class="container">
        <!-- Outer Row -->
        <div class="row justify-content-center">
            <div class="col-xl-10 col-lg-12 col-md-9">
                <div class="card o-hidden border-0 shadow-lg my-5">
                    <div class="card-body p-0">
                        <!-- Nested Row within Card Body -->
                        <div class="row">
                            <div class="col-lg-6 d-none d-lg-block bg-login-image"></div>
                            <div class="col-lg-6">
                                <div class="p-5">
                                    <div class="text-center">
                                        <h1 class="h4 text-gray-900 mb-4">Welcome !</h1>
                                    </div>
                                    <form class="user" method="post" @submit.prevent="onBtnLoginClick">
                                        <div class="form-group">
                                            <input
                                                    id="edUsername"
                                                    type="text"
                                                    ref="email"
                                                    v-model="email"
                                                    class="form-control form-control-user"
                                                    aria-describedby="emailHelp"
                                                    placeholder="Enter username ..."
                                            />
                                            <em class="required_t">{{ errors.email }}</em>
                                        </div>
                                        <div class="form-group">
                                            <input
                                                    id="edPassword"
                                                    type="password"
                                                    ref="password"
                                                    v-model="password"
                                                    class="form-control form-control-user"
                                                    placeholder="Password"
                                            />
                                            <em class="required_t">{{ errors.password }}</em>
                                        </div>
                                        <div class="form-group">
                                            <div class="custom-control custom-checkbox small">
                                                <input type="checkbox" v-model="rememberPass"
                                                       class="custom-control-input" id="customCheck"/>
                                                <label class="custom-control-label" for="customCheck">Remember
                                                    Me</label>
                                            </div>
                                        </div>
                                        <button id="btnLogin" type="submit" class="btn btn-primary btn-user btn-block">Login</button>
                                        <button id="btnRegister" type="button" @click.prevent="onBtnRegisterClicked"
                                                class="btn btn-default btn-user btn-block">Register
                                        </button>
                                    </form>
                                    <hr/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <Register :open="showRegister" :onCancel="()=>{showRegister=false}" :callbackFn="onRegisterSuccess"/>
    </div>
</template>

<script>
import m_utils from "@src/utils/m_utils.js";
import helper from "@src/utils/helper";
import {mapMutations} from "vuex";
import Register from "@src/views/LoginView/Register.vue";
import api from "@src/utils/api";

export default {

    components: {
        Register
    },

    data() {

        return {

            showRegister: false,
            email: "",
            password: "",
            rememberPass: false,

            errors: {
                email: "",
                password: ""
            }

        };

    },

    beforeMount() {
        document.title = "Login";
        const u = localStorage.getItem("remember");
        if (u !== undefined && u !== null) {
            const user = JSON.parse(u);
            if (user.u) {
                this.email = user.u;
                this.rememberPass = true;
            }
            if (user.p) {
                this.password = user.p;
                this.rememberPass = true;
            }
        }
    },

    methods: {

        ...mapMutations([
            "login",
            "logout",
            "setUser",
            "resetAllChat",
        ]),

        onBtnRegisterClicked() {
            this.showRegister = true;
        },

        onRegisterSuccess(data) {
            this.showRegister = false;
            console.log("onRegisterSuccess: ", data)
        },

        onBtnLoginClick() {

            this.resetError();

            if (!m_utils.checkString(this.email)) {
                this.errors.email = "Please enter email";
                this.$refs.email.focus();
                return;
            }

            if (!m_utils.checkString(this.password)) {
                this.errors.password = "Please enter password";
                this.$refs.password.focus();
                return;
            }

            const params = {
                username: this.email,
                password: this.password
            };

            api.postNoToken(this, "/auth/login", params, (response) => {
                console.log("data: " + JSON.stringify(response));
                let mResp = m_utils.getMessageResponse2(response,
                    "Login successfully",
                    "Login failure");
                let rc = response.data.rc;
                const data = response.data;

                if (rc === 0) {
                    const user = data;
                    user.email = this.email;
                    localStorage.setItem("user", JSON.stringify(user));
                    this.setUser(JSON.stringify(user));
                    this.login();
                    helper.notifySuccess(mResp.notify);
                    this.$router.push("/");

                    if (this.rememberPass) {
                        let u = {u: this.email, p: this.password};
                        localStorage.setItem("remember", JSON.stringify(u));
                    } else {
                        localStorage.removeItem("remember");
                    }

                } else {
                    helper.notifyError(mResp.notify);
                    helper.showDialog("Thông báo", mResp.dialog);
                }
            }, null, true);
        },

        resetError() {
            this.errors = {
                email: "",
                password: ""
            };
        }

    }
};
</script>

<style scoped>
.required_t {
    color: red;
}

.bg-login-image {
    background: url("@src/assets/images/login-backgroup-image.jpg") center;
    background-size: cover;
}
</style>
