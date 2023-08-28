<template>

    <section class="content">
        <div class="container-fluid">
            <div class="card card-default" style="margin-top: 20px">
                <div class="card-header">
                    <h3 class="card-title"><strong>Stringee Video Call Demo</strong></h3>
                </div>
                <div class="card-body">
                    <div class="row">
                        <div class="col-lg-12">
                            Logged in: <span id="loggedUserId"><strong style="color: red">{{ username }}</strong></span>
                            - SDK Version: <span
                                id="sdkVersion"><strong style="color: blue">{{ sdkVersion }}</strong></span> | <a
                                href="#" @click.prevent="onLogoutClicked">[Logout]</a>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-lg-12" style="margin-top: 20px">
                            Call status: <span id="txtStatus" style="color: red">{{ callStatus }}</span>
                        </div>
                    </div>

                    <div v-if="!incomingCall" class="row" style="margin-top: 20px">
                        <div class="col-lg-12">

                            <form class="form-inline">
                                <label class="sr-only" for="toNumberBtn">Call to:</label>
                                <input class="form-control mb-2 mr-sm-2" id="toNumberBtn" type="text" name="toNumberBtn"
                                       placeholder="Call to number" v-model="call_to"
                                >

                                <button class="btn btn-success mb-2 mr-sm-2" :disabled="!showBtnMakeCall" id="call2Btn"
                                        @click.prevent="onBtnMakeCallClicked">Make Call
                                </button>
                                <button class="btn btn-danger mb-2 mr-sm-2" :disabled="!showBtnHangup"
                                        id="call2HangupBtn"
                                        @click.prevent="onBtnHangupClicked">Hangup
                                </button>

                                <button class="btn btn-warning mb-2 mr-sm-2" :disabled="!showBtnMute" id="muteBtn"
                                        @click.prevent="onBtnMuteClicked">
                                    Mute
                                </button>
                                <button class="btn btn-primary mb-2 mr-sm-2" :disabled="!showBtnDisableVideo"
                                        id="enableVideoBtn"
                                        @click.prevent="onBtnEnableDisableVideo">Enable/Disable video
                                </button>
                            </form>

                        </div>

                    </div>

                    <div v-if="incomingCall" class="row" style="margin-top: 20px">
                        <div class="col-lg-6">
                            <div class="ring">
                                <div class="coccoc-alo-phone coccoc-alo-green coccoc-alo-show">
                                    <div class="coccoc-alo-ph-circle"></div>
                                    <div class="coccoc-alo-ph-circle-fill"></div>
                                    <div class="coccoc-alo-ph-img-circle"></div>
                                </div>
                                <label>Incoming call from: <span id="incomingCallFrom"
                                                                 style="color: blue">{{
                                    incomingCallFrom
                                    }}</span></label>
                                <button style="margin-left: 20px" class="btn btn-success mb-2 mr-sm-2"
                                        @click.prevent="onBtnAnswerClicked">
                                    Answer
                                </button>
                                <button class="btn btn-danger mb-2 mr-sm-2" @click.prevent="onBtnRejectClicked">Reject
                                </button>
                            </div>
                        </div>
                    </div>

                    <div class="row" style="margin-top: 20px">
                        <div class="col-sm-12 col-md-6 col-lg-3 col-xl-2">
                            <div id="local_videos" style="height: 150px">
                                Local videos <strong>{{ username }}</strong> (you):
                                <br/>
                            </div>
                        </div>
                        <div class="col-sm-12 col-md-6 col-lg-3 col-xl-2">
                            <div id="remote_videos">
                                Remote videos:
                                <br/>
                            </div>
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-lg-12">
                            <br/>
                            Audio sent: <span id="audioSent">{{ stats.audioSent }}</span>
                            <br/>
                            Video sent: <span id="videoSent">{{ stats.videoSent }}</span>

                            <br/><br/>
                            Audio received: <span id="audioReceived">{{ stats.audioReceived }}</span>
                            <br/>
                            Video received: <span id="videoReceived">{{ stats.videoReceived }}</span>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    </section>
</template>

<script>

import dialog from "@src/utils/dialog";

export default {

    mounted() {
        document.title = "Stringee Video Call Demo";
        // eslint-disable-next-line no-undef
        console.log(StringeeUtil.version().version + '_build_' + StringeeUtil.version().build + '_sample_1');
        // eslint-disable-next-line no-undef
        this.sdkVersion = StringeeUtil.version().version + '_build_' + StringeeUtil.version().build;
        let user = localStorage.getItem("user");
        let u = JSON.parse(user);
        this.username = u.email;
        this.startConnect();
    },

    data() {
        return {

            showBtnMakeCall: false,
            showBtnHangup: false,
            showBtnMute: false,
            showBtnDisableVideo: false,

            SERVER_ADDRESSES: ['wss://v1.stringee.com:6899/', 'wss://v2.stringee.com:6899/'],
            client: null,
            call: {},
            holdState: false,
            username: 'Not logged',
            sdkVersion: '',
            incomingCall: false,
            video_dimension: '720p',
            call_to: '',
            incomingCallFrom: '',
            callStatus: 'Not Started',
            timeout_stats: -1,
            stats: {
                videoSent: "",
                audioSent: "",
                videoReceived: "",
                audioReceived: ""
            }
        }
    },

    methods: {

        startConnect() {
            // eslint-disable-next-line no-undef
            this.client = new StringeeClient(this.SERVER_ADDRESSES);
            this.settingsClientEvents(this.client);
            let user = localStorage.getItem("user");
            let u = JSON.parse(user);
            let token = u.token;
            console.log("token: ", token);
            this.client.connect(token);
        },

        settingsClientEvents(client) {
            client.on('authen', (res) => {
                console.log('on auth: ', res);
                if (res.r === 0) {
                    this.username = res.userId;
                    this.showBtnMakeCall = true;
                }
            });
            client.on('connect', () => {
                console.log('++++++++++++++ connected');
            });
            client.on('disconnect', () => {
                console.log('++++++++++++++ disconnected');
            });
            client.on('requestnewtoken', () => {
                console.log('++++++++++++++ requestnewtoken+++++++++');
            });
            client.on('incomingcall2', (call2) => {
                this.call = call2;
                this.settingCallEvent(this.call);
                // show info
                this.incomingCall = true;
                this.incomingCallFrom = call2.fromNumber;
                this.setCallStatus("Ringing ...")
            });
        },

        settingCallEvent(call1) {

            call1.on('addlocaltrack', function (localtrack1) {
                console.log('addlocaltrack', localtrack1);
                let element = localtrack1.attach();
                document.getElementById("local_videos").appendChild(element);
                element.style.height = "200px";
                element.style.color = "red";
            });

            call1.on('addremotetrack', function (track) {
                let element = track.attach();
                document.getElementById("remote_videos").appendChild(element);
                element.style.height = "200px";
            });

            call1.on('removeremotetrack', function (track) {
                track.detachAndRemove();
            });

            call1.on('removelocaltrack', function (track) {
                track.detachAndRemove();
            });

            call1.on('signalingstate', (state) => {
                console.log('signalingstate ', state);
                if (state.code === 6) {
                    this.incomingCall = false;
                }

                if (state.code === 6) {
                    this.setCallStatus('Ended');
                    this.onStop();
                } else if (state.code === 3) {

                    this.enableMakeCallButton(false);

                    this.setCallStatus('Answered');
                    this.test_stats();
                } else if (state.code === 5) {
                    this.setCallStatus('User busy');
                    this.onStop();
                }
            });

            call1.on('mediastate', function (state) {
                console.log('mediastate ', state);
            });

            call1.on('otherdevice', (msg) => {
                console.log('otherdevice ', msg);
                if (msg.type === 'CALL2_STATE') {
                    if (msg.code === 200 || msg.code === 486) {
                        this.incomingCall = false;
                    }
                }
            });

            call1.on('info', function (info) {
                console.log('++++info ', info);
            });

        },

        onBtnMakeCallClicked() {

            if (this.call_to.trim().length === 0) {
                dialog.showDialog("Error", "<b>Please enter call to</b>");
                return;
            }

            console.log("callTo: " + this.call_to);
            let fromNumber = this.username;

            // eslint-disable-next-line no-undef
            this.call = new StringeeCall2(this.client, fromNumber, this.call_to, true);

            this.settingCallEvent(this.call);
            this.call.makeCall((res) => {
                if (res.r === 0) {
                    console.log('make call success');
                    this.setCallStatus('Calling...');
                    this.enableMakeCallButton(true);
                    this.showBtnHangup = true;
                } else {
                    console.log("makeCallResp: ", res);
                    this.setCallStatus('Not stared');

                }
            });

        },

        enableMakeCallButton(state) {
            this.showBtnMakeCall = state;
            this.showBtnMute = !state;
            this.showBtnDisableVideo = !state;
            this.showBtnHangup = !state;
        },

        setCallStatus(status) {
            this.callStatus = status;
        },

        onBtnHangupClicked() {
            this.call.hangup((res) => {
                console.log('hangup res', res);
            });
            this.onStop();
        },

        onStop() {
            console.log('=======onStop=====');
            this.setCallStatus('Not stared');
            if (this.timeout_stats) {
                clearTimeout(this.timeout_stats);
            }
            if (!this.call) {
                return;
            }
            this.call.subscribedTracks.forEach((track) => {
                track.detachAndRemove();
            });
            this.enableMakeCallButton(true);
        },

        onBtnMuteClicked() {
            if (this.call.muted) {
                this.call.mute(false);
                console.log('un muted');
            } else {
                this.call.mute(true);
                console.log('muted');
            }
        },

        onBtnEnableDisableVideo() {
            if (this.call.localVideoEnabled) {
                this.call.enableLocalVideo(false);
                console.log('disable Local Video');
            } else {
                this.call.enableLocalVideo(true);
                console.log('enable Local Video');
            }
        },

        onBtnAnswerClicked() {
            this.call.answer((res) => {
                console.log('answer res', res);
                if (res.r === 0) {
                    this.test_stats();
                    this.setCallStatus('Answered');
                    this.enableMakeCallButton(false);
                }
            });
            this.incomingCall = false;
        },

        onBtnRejectClicked() {
            console.log('onBtnRejectClicked');
            this.call.reject((res) => {
                console.log('reject res', res);
                this.enableMakeCallButton(true);
            });
            this.incomingCall = false;
        },

        onLogoutClicked() {
            dialog.confirmDialog("Do you want to logout ?", "Logout", () => {
                localStorage.removeItem('user')
                this.$router.push('/login')
            });
        },

        test_stats() {
            const time = 2000;
            console.log('stats...');
            if (this.call && this.call.localTracks.length > 0) {
                this.call.localTracks[0].getBW().then((res) => {
                    this.stats.audioSent = res.audioSent + ' kbits/s';
                    this.stats.videoSent = res.videoSent + ' kbits/s';
                });
            }
            if (this.call && this.call.subscribedTracks.length > 0) {
                this.call.subscribedTracks[0].getBW().then((res) => {
                    this.stats.audioReceived = res.audioReceived + ' kbits/s';
                    this.stats.videoReceived = res.videoReceived + ' kbits/s';
                });
            }
            this.timeout_stats = setTimeout(() => {
                this.test_stats();
            }, time);
        }

    }

}
</script>

<style scoped>
a:hover {
    text-decoration: underline;
}

.coccoc-alo-ph-circle {
    width: 160px;
    height: 160px;
    top: 20px;
    left: 20px;
    position: absolute;
    background-color: transparent;
    -webkit-border-radius: 100%;
    -moz-border-radius: 100%;
    border-radius: 100%;
    border: 2px solid rgba(30, 30, 30, 0.4);
    opacity: .1;
    -webkit-animation: coccoc-alo-circle-anim 1.2s infinite ease-in-out;
    -moz-animation: coccoc-alo-circle-anim 1.2s infinite ease-in-out;
    -ms-animation: coccoc-alo-circle-anim 1.2s infinite ease-in-out;
    -o-animation: coccoc-alo-circle-anim 1.2s infinite ease-in-out;
    animation: coccoc-alo-circle-anim 1.2s infinite ease-in-out;
    -webkit-transition: all .5s;
    -moz-transition: all .5s;
    -o-transition: all .5s;
    transition: all .5s;
}

.coccoc-alo-phone {
    background-color: transparent;
    width: 200px;
    height: 200px;
    cursor: pointer;
    z-index: 200000 !important;
    -webkit-backface-visibility: hidden;
    -webkit-transform: translateZ(0);
    -webkit-transition: visibility .5s;
    -moz-transition: visibility .5s;
    -o-transition: visibility .5s;
    transition: visibility .5s;
    right: 150px;
    top: 30px;
}

.coccoc-alo-phone.coccoc-alo-green .coccoc-alo-ph-circle-fill {
    background-color: rgba(0, 175, 242, 0.5);
    opacity: .75 !important;
}

.coccoc-alo-ph-circle-fill {
    width: 100px;
    height: 100px;
    top: 50px;
    left: 50px;
    position: absolute;
    background-color: #000;
    -webkit-border-radius: 100%;
    -moz-border-radius: 100%;
    border-radius: 100%;
    border: 2px solid transparent;
    opacity: .1;
    -webkit-animation: coccoc-alo-circle-fill-anim 2.3s infinite ease-in-out;
    -moz-animation: coccoc-alo-circle-fill-anim 2.3s infinite ease-in-out;
    -ms-animation: coccoc-alo-circle-fill-anim 2.3s infinite ease-in-out;
    -o-animation: coccoc-alo-circle-fill-anim 2.3s infinite ease-in-out;
    animation: coccoc-alo-circle-fill-anim 2.3s infinite ease-in-out;
    -webkit-transition: all .5s;
    -moz-transition: all .5s;
    -o-transition: all .5s;
    transition: all .5s;
}

.coccoc-alo-ph-img-circle {
    width: 60px;
    height: 60px;
    top: 70px;
    left: 70px;
    position: absolute;
    background: rgba(30, 30, 30, 0.1) url(https://drive.google.com/uc?id=1V3N2b79QjDWetC_ss9wI3c-xpWDymn9R) no-repeat center center;
    -webkit-border-radius: 100%;
    -moz-border-radius: 100%;
    border-radius: 100%;
    border: 2px solid transparent;
    opacity: .7;
    -webkit-animation: coccoc-alo-circle-img-anim 1s infinite ease-in-out;
    -moz-animation: coccoc-alo-circle-img-anim 1s infinite ease-in-out;
    -ms-animation: coccoc-alo-circle-img-anim 1s infinite ease-in-out;
    -o-animation: coccoc-alo-circle-img-anim 1s infinite ease-in-out;
    animation: coccoc-alo-circle-img-anim 1s infinite ease-in-out;
}

.coccoc-alo-phone.coccoc-alo-green .coccoc-alo-ph-img-circle {
    background-color: #00aff2;
}

.coccoc-alo-phone.coccoc-alo-green .coccoc-alo-ph-circle {
    border-color: #00aff2;
    opacity: .5;
}

.coccoc-alo-phone.coccoc-alo-green.coccoc-alo-hover .coccoc-alo-ph-circle,
.coccoc-alo-phone.coccoc-alo-green:hover .coccoc-alo-ph-circle {
    border-color: #75eb50;
    opacity: .5;
}

.coccoc-alo-phone.coccoc-alo-green.coccoc-alo-hover .coccoc-alo-ph-circle-fill,
.coccoc-alo-phone.coccoc-alo-green:hover .coccoc-alo-ph-circle-fill {
    background-color: rgba(117, 235, 80, 0.5);
    opacity: .75 !important;
}

.coccoc-alo-phone.coccoc-alo-green.coccoc-alo-hover .coccoc-alo-ph-img-circle,
.coccoc-alo-phone.coccoc-alo-green:hover .coccoc-alo-ph-img-circle {
    background-color: #75eb50;
}

@-moz-keyframes coccoc-alo-circle-anim {
    0% {
        transform: rotate(0) scale(.5) skew(1deg);
        opacity: .1
    }
    30% {
        transform: rotate(0) scale(.7) skew(1deg);
        opacity: .5
    }
    100% {
        transform: rotate(0) scale(1) skew(1deg);
        opacity: .1
    }
}

@-webkit-keyframes coccoc-alo-circle-anim {
    0% {
        transform: rotate(0) scale(.5) skew(1deg);
        opacity: .1
    }
    30% {
        transform: rotate(0) scale(.7) skew(1deg);
        opacity: .5
    }
    100% {
        transform: rotate(0) scale(1) skew(1deg);
        opacity: .1
    }
}

@-o-keyframes coccoc-alo-circle-anim {
    0% {
        transform: rotate(0) scale(.5) skew(1deg);
        opacity: .1
    }
    30% {
        transform: rotate(0) scale(.7) skew(1deg);
        opacity: .5
    }
    100% {
        transform: rotate(0) scale(1) skew(1deg);
        opacity: .1
    }
}

@keyframes coccoc-alo-circle-anim {
    0% {
        transform: rotate(0) scale(.5) skew(1deg);
        opacity: .1
    }
    30% {
        transform: rotate(0) scale(.7) skew(1deg);
        opacity: .5
    }
    100% {
        transform: rotate(0) scale(1) skew(1deg);
        opacity: .1
    }
}

@-moz-keyframes coccoc-alo-circle-fill-anim {
    0% {
        transform: rotate(0) scale(.7) skew(1deg);
        opacity: .2
    }
    50% {
        transform: rotate(0) scale(1) skew(1deg);
        opacity: .2
    }
    100% {
        transform: rotate(0) scale(.7) skew(1deg);
        opacity: .2
    }
}

@-webkit-keyframes coccoc-alo-circle-fill-anim {
    0% {
        transform: rotate(0) scale(.7) skew(1deg);
        opacity: .2
    }
    50% {
        transform: rotate(0) scale(1) skew(1deg);
        opacity: .2
    }
    100% {
        transform: rotate(0) scale(.7) skew(1deg);
        opacity: .2
    }
}

@-o-keyframes coccoc-alo-circle-fill-anim {
    0% {
        transform: rotate(0) scale(.7) skew(1deg);
        opacity: .2
    }
    50% {
        transform: rotate(0) scale(1) skew(1deg);
        opacity: .2
    }
    100% {
        transform: rotate(0) scale(.7) skew(1deg);
        opacity: .2
    }
}

@keyframes coccoc-alo-circle-fill-anim {
    0% {
        transform: rotate(0) scale(.7) skew(1deg);
        opacity: .2
    }
    50% {
        transform: rotate(0) scale(1) skew(1deg);
        opacity: .2
    }
    100% {
        transform: rotate(0) scale(.7) skew(1deg);
        opacity: .2
    }
}

@-moz-keyframes coccoc-alo-circle-img-anim {
    0% {
        transform: rotate(0) scale(1) skew(1deg)
    }
    10% {
        transform: rotate(-25deg) scale(1) skew(1deg)
    }
    20% {
        transform: rotate(25deg) scale(1) skew(1deg)
    }
    30% {
        transform: rotate(-25deg) scale(1) skew(1deg)
    }
    40% {
        transform: rotate(25deg) scale(1) skew(1deg)
    }
    50% {
        transform: rotate(0) scale(1) skew(1deg)
    }
    100% {
        transform: rotate(0) scale(1) skew(1deg)
    }
}

@-webkit-keyframes coccoc-alo-circle-img-anim {
    0% {
        transform: rotate(0) scale(1) skew(1deg)
    }
    10% {
        transform: rotate(-25deg) scale(1) skew(1deg)
    }
    20% {
        transform: rotate(25deg) scale(1) skew(1deg)
    }
    30% {
        transform: rotate(-25deg) scale(1) skew(1deg)
    }
    40% {
        transform: rotate(25deg) scale(1) skew(1deg)
    }
    50% {
        transform: rotate(0) scale(1) skew(1deg)
    }
    100% {
        transform: rotate(0) scale(1) skew(1deg)
    }
}

@-o-keyframes coccoc-alo-circle-img-anim {
    0% {
        transform: rotate(0) scale(1) skew(1deg)
    }
    10% {
        transform: rotate(-25deg) scale(1) skew(1deg)
    }
    20% {
        transform: rotate(25deg) scale(1) skew(1deg)
    }
    30% {
        transform: rotate(-25deg) scale(1) skew(1deg)
    }
    40% {
        transform: rotate(25deg) scale(1) skew(1deg)
    }
    50% {
        transform: rotate(0) scale(1) skew(1deg)
    }
    100% {
        transform: rotate(0) scale(1) skew(1deg)
    }
}

@keyframes coccoc-alo-circle-img-anim {
    0% {
        transform: rotate(0) scale(1) skew(1deg)
    }
    10% {
        transform: rotate(-25deg) scale(1) skew(1deg)
    }
    20% {
        transform: rotate(25deg) scale(1) skew(1deg)
    }
    30% {
        transform: rotate(-25deg) scale(1) skew(1deg)
    }
    40% {
        transform: rotate(25deg) scale(1) skew(1deg)
    }
    50% {
        transform: rotate(0) scale(1) skew(1deg)
    }
    100% {
        transform: rotate(0) scale(1) skew(1deg)
    }
}
</style>
