<template>
    <ModalComponent :open="open" :onCancel="onCancel" :onOk="handleAddNew" okText="Register" title="Register account"
                    :styleModal="{width: '600px' }">
        <div class="row" style="margin-top: 10px">
            <div class="col-lg-4">
                <label style="line-height: 34px" class="pull-right">Username<span
                        class="required_t icon_t">*</span></label>
            </div>
            <div class="col-lg-8">
                <input id="edRUserName" ref="username" v-model="input.username" class="form-control" type="text" placeholder="Username"/>
                <em class="required_t">{{ errors.username }}</em>
            </div>
        </div>

        <div class="row" style="margin-top: 10px">
            <div class="col-lg-4">
                <label style="line-height: 34px" class="pull-right">Password<span
                        class="required_t icon_t">*</span></label>
            </div>
            <div class="col-lg-8">
                <input id="edRPassword" ref="password" v-model="input.password" class="form-control" type="password"
                       placeholder="Password"/>
                <em class="required_t">{{ errors.password }}</em>
            </div>
        </div>

        <div class="row" style="margin-top: 10px">
            <div class="col-lg-4">
                <label style="line-height: 34px" class="pull-right">Re Password<span class="required_t icon_t">*</span></label>
            </div>
            <div class="col-lg-8">
                <input id="edRRePassword" ref="re_password" v-model="input.re_password" class="form-control" type="password"
                       placeholder="Password"/>
                <em class="required_t">{{ errors.re_password }}</em>
            </div>
        </div>

    </ModalComponent>
</template>
<script>

import ModalComponent from "@src/components/ModalComponent.vue";
import api from "@src/utils/api";
import dialog from "@src/utils/dialog";
import helper from "@src/utils/helper";
import m_utils from "@src/utils/m_utils";

export default {
    name: "ModalRegister",
    components: {ModalComponent},
    props: {
        open: {
            type: Boolean,
            default: false
        },
        onCancel: {
            type: Function,
            default: () => {
            },
        },
        callbackFn: {
            type: Function,
            default: () => {
            },
        }
    },

    data() {
        return {
            input: {
                username: "",
                password: "",
                re_password: "",
            },
            errors: {
                username: "",
                password: "",
                re_password: "",
            },
        }
    },

    watch: {
        open: function () {
            this.reset();
        }
    },

    methods: {
        handleAddNew() {
            this.resetErrors();

            if (!m_utils.checkString(this.input.username)) {
                this.errors.username = "Please enter username";
                this.$refs.username.focus();
                return;
            }

            if (!m_utils.checkString(this.input.password)) {
                this.errors.password = "Please enter password";
                this.$refs.password.focus();
                return;
            }

            if (!m_utils.checkString(this.input.re_password)) {
                this.errors.re_password = "Please confirm password";
                this.$refs.re_password.focus();
                return;
            }

            if (this.input.password !== this.input.re_password) {
                this.errors.re_password = "Password is incorrect";
                this.$refs.re_password.focus();
                return;
            }

            dialog.confirmDialog("Do you want to register this account", "Register", () => {
                let params = {
                    username: this.input.username,
                    password: this.input.password,
                    re_password: this.input.re_password,
                    first_name: this.input.username,
                    last_name: "",
                    phone_number: "",
                };
                api.postNoToken(this, "/auth/register", params, (data) => {
                    let rc = data.data.rc;
                    let mResp = m_utils.getMessageResponse2(data,
                        "Register success !",
                        "Register failure !");
                    if (rc === 0) {
                        helper.notifySuccess(mResp.notify, "success");
                        this.callbackFn()
                        this.onCancel()
                    } else {
                        dialog.showDialog("Warning", mResp.dialog);
                        helper.notifyError(mResp.notify, "error");
                    }
                }, null, true);
            });
        },

        resetErrors() {
            this.errors = {
                username: "",
                password: "",
                re_password: "",
            }
        },

        reset() {
            this.input = {
                username: "",
                password: "",
                re_password: "",
            };
            this.resetErrors();
        },

    }
}
</script>
<style scoped>
.required_t {
    color: red;
}
</style>
