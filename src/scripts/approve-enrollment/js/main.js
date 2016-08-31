/*global require*/
require.config({
    paths: {
        reg: "/scripts/approve-enrollment/js"
    }
});

require(["reg/form", "reg/edit", "reg/persist"],
    function (form, edit, persist) {
        "use strict";
        form.populateForm();
        edit.bindEditHandler();
        persist.main();
    });
