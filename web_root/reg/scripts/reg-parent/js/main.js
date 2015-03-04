/*global require*/
require.config({
    baseUrl: '/scripts',
    paths: {
        // app modules
        form: 'reg/reg/js/form',
        validate: 'reg/js/validate',
        tabs: 'reg/js/tabs',
        dynamicForm: 'reg/js/dynamicForm',
        dynamicTable: 'reg/js/dynamicTable',
        datepicker: 'reg/js/datepicker',
        multiselect: 'reg/js/multiselect',
        maskedInput: 'reg/js/maskedInput',
        persist: 'reg/js/persist',
        tooltip: 'reg/js/tooltip',
        remChars: 'reg/js/remChars',

        // external dependencies
        underscore: 'underscore/underscore'
    }
});

require(['form', 'validate', 'tabs', 'dynamicForm', 'dynamicTable', 'datepicker', 'multiselect', 'maskedInput', 'persist', 'tooltip', 'remChars'],
    function(form, validate, tabs, dynamicForm, dynamicTable, datepicker, multiselect, maskedInput, persist, tooltip, remChars) {
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