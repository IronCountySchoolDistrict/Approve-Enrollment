/*global require*/
require.config({
    baseUrl: '/scripts',
    paths: {
        // app modules
        enroll: 'reg-admin/js/enroll',
        datepicker: 'reg-admin/js/datepicker',
        populate: 'reg-admin/js/populate',
        b64: 'reg-admin/js/b64',
        api: 'reg-admin/js/api',

        // external dependencies
        underscore: 'underscore/underscore'
    }
});

require(['enroll', 'datepicker', 'populate'],
    function (enroll, datepicker, populate) {
        'use strict';
        enroll.main();
        datepicker.main();
        populate.main();
    });