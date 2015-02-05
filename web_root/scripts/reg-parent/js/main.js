/*global require*/
require.config({
    baseUrl: '/scripts',
    paths: {
        // app modules
        form: 'reg-parent/js/form',
        validate: 'reg-parent/js/validate',
        tabs: 'reg-parent/js/tabs',
        dynamicForm: 'reg-parent/js/dynamicForm',
        dynamicTable: 'reg-parent/js/dynamicTable',
        datepicker: 'reg-parent/js/datepicker',
        multiselect: 'reg-parent/js/multiselect',
        maskedInput: 'reg-parent/js/maskedInput',
        persist: 'reg-parent/js/persist',
        tooltip: 'reg-parent/js/tooltip',
        remChars: 'reg-parent/js/remChars',

        // external dependencies
        underscore: 'underscore/underscore'
    }
});

require(['form', 'validate', 'tabs', 'dynamicForm', 'dynamicTable', 'datepicker', 'multiselect', 'maskedInput', 'persist', 'tooltip', 'remChars'],
    function (form, validate, tabs, dynamicForm, dynamicTable, datepicker, multiselect, maskedInput, persist, tooltip, remChars) {
        'use strict';
        form.main();
        tabs.main();
        validate.main();
        dynamicForm.main();
        dynamicTable.main();
        datepicker.main();
        multiselect.main();
        maskedInput.main();
        persist.main();
        tooltip.main();
        remChars.main();
    });