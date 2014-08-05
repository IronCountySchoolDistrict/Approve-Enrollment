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
        emergConts: 'models/emerg_conts',
        siblings: 'models/siblings',
        staging: 'models/staging',

        // external dependencies
        underscore: 'underscore/underscore'
    }
});

require(['form', 'validate', 'tabs', 'dynamicForm', 'dynamicTable', 'datepicker', 'multiselect', 'maskedInput', 'persist', 'tooltip'],
    function (form, validate, tabs, dynamicForm, dynamicTable, datepicker, multiselect, maskedInput, persist, tooltip) {
        'use strict';
        form.main();
        validate.main();
        tabs.main();
        dynamicForm.main();
        dynamicTable.main();
        datepicker.main();
        multiselect.main();
        maskedInput.main();
        persist.main();
        tooltip.main();
    });