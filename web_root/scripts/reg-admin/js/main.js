/*global require*/
require.config({
    baseUrl: '/scripts',
    paths: {
        // app modules
        enroll: 'reg-admin/js/enroll',
        datepicker: 'reg-admin/js/datepicker',
        populate: 'reg-admin/js/populate',
        persist: 'reg-admin/js/persist',
        b64: 'reg-admin/js/b64',
        api: 'reg-admin/js/api',

        // external dependencies
        underscore: 'underscore/underscore'
    }
});

require(['enroll', 'datepicker', 'populate', 'persist'],
    function (enroll, datepicker, populate, persist) {
        'use strict';
        enroll.main();
        datepicker.main();
        populate.main();
        persist.main();
    });