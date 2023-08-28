import {toast} from 'vue3-toastify'

export default {
    hideAllModal() {
        // eslint-disable-next-line no-undef
        $('#mdLoading').modal('hide')
    },

    showLoading(state) {
        this.hideAllModal()
        if (state === undefined || state === null) {
            state = false
        }
        if (state) {
            // eslint-disable-next-line no-undef
            $('#mdLoading').modal('show')
        } else {
            // eslint-disable-next-line no-undef
            $('#mdLoading').modal('hide')
        }
    },

    notifySuccess(msg) {
        // eslint-disable-next-line no-undef
        // $.notify(msg, 'success')
        toast.success(msg)
    },

    notifyError(msg) {
        // eslint-disable-next-line no-undef
        // $.notify(msg, 'error')
        toast.error(msg)
    },

    confirmDialog(content, btnOkTitle, fn) {
        // eslint-disable-next-line no-undef
        BootstrapDialog.show({
            title: 'Warning',
            // eslint-disable-next-line no-undef
            type: BootstrapDialog.TYPE_DEFAULT,
            // eslint-disable-next-line no-undef
            size: BootstrapDialog.SIZE_SMALL,
            message: content,
            buttons: [
                {
                    label: 'Close',
                    action: (dialog) => {
                        dialog.close()
                    }
                },
                {
                    label: btnOkTitle,
                    cssClass: 'btn-primary',
                    action: (dialog) => {
                        dialog.close()
                        if (typeof fn === 'function') {
                            fn()
                        }
                    }
                }
            ]
        })
    },

    showDialog(title, content, data, fnOnHide, size) {
        if (size === undefined || size === null) {
            // eslint-disable-next-line no-undef
            size = BootstrapDialog.SIZE_SMALL
        }

        // eslint-disable-next-line no-undef
        BootstrapDialog.show({
            title: title,
            // eslint-disable-next-line no-undef
            type: BootstrapDialog.TYPE_DEFAULT,
            size: size,
            data: data, //data 0 : 1
            message: content,
            buttons: [
                {
                    hotkey: 13, // Enter.
                    label: 'Đóng',
                    action: (dialog) => {
                        dialog.close()
                    }
                }
            ],
            onhide: (dialogRef) => {
                if (typeof fnOnHide === 'function') {
                    let rc = 0
                    if (data !== null && data !== undefined) {
                        rc = dialogRef.getData('rc')
                    }
                    fnOnHide(rc)
                }
            }
        })
    },

    getFileType(file) {
        if (file.type.match('image.*'))
            return 'image';
        if (file.type.match('video.*'))
            return 'video';
        if (file.type.match('audio.*'))
            return 'audio';
        return 'other';
    },

    checkMediaState(voice, video) {
        return new Promise((resolve, reject) => {
            const constraints = {
                audio: voice,
                video: video
            }
            navigator.mediaDevices
                .getUserMedia(constraints)
                .then((stream) => {
                    resolve({rc: 0, rd: "OK", stream: stream})
                })
                .catch((err) => {
                    console.error(err)
                    reject({rc: -1, rd: "Get media stream failed"});
                });
        });
    },

}
