/*global require*/
require.config({
    paths: {
        reg: 'registration/js'
    }
});

require(['reg/form'],
    function (form) {
        'use strict';
        form.populateForm();
    });