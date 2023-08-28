export default {

    confirmDialog(content, btnOkTitle, fn) {
        // eslint-disable-next-line no-undef
        BootstrapDialog.show({
            title: "Warning",
            // eslint-disable-next-line no-undef
            type: BootstrapDialog.TYPE_DEFAULT,
            // eslint-disable-next-line no-undef
            size: BootstrapDialog.SIZE_SMALL,
            message: content,
            buttons: [
                {
                    label: 'Close',
                    action: (dialog) => {
                        dialog.close();
                    }
                },
                {
                    label: btnOkTitle,
                    cssClass: 'btn-primary',
                    action: (dialog) => {
                        dialog.close();
                        if (typeof fn === "function") {
                            fn();
                        }
                    }
                }
            ]
        });
    },

    showDialog(title, content, data, fnOnHide, size) {
        if (size === undefined || size === null) {
            // eslint-disable-next-line no-undef
            size = BootstrapDialog.SIZE_SMALL;
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
                        dialog.close();
                    }
                }
            ],
            onhide: (dialogRef) => {
                if (typeof fnOnHide === "function") {
                    var rc = 0;
                    if (data !== null && data !== undefined) {
                        rc = dialogRef.getData("rc");
                    }
                    fnOnHide(rc);
                }
            }
        });
    },

}
