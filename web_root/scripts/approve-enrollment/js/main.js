/*global require*/
require.config({
    paths: {
        reg: "approve-enrollment/js"
    }
});

require(["reg/form", "reg/edit"],
    function (form, edit) {
        "use strict";
        form.populateForm();
        edit.bindEditHandler();
    });