/*global require*/
require.config({
    paths: {
        reg: "approve-enrollment/js"
    },
    urlArgs: "_=" + (new Date()).getTime()
});

require(["reg/form", "reg/edit", "reg/persist"],
    function (form, edit, persist) {
        "use strict";
        form.populateForm();
        edit.bindEditHandler();
        persist.main();
    });