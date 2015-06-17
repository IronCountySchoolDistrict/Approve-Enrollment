/*global require*/
require.config({
    paths: {
        reg: "/* @echo IMAGE_SERVER_URL */" + "/approve-enrollment/js"
    }
});

require(["reg/form", "reg/edit", "reg/persist"],
    function (form, edit, persist) {
        "use strict";
        form.populateForm();
        edit.bindEditHandler();
        persist.main();
    });