/*global require*/
require.config({
    baseUrl: '/scripts',
    paths: {
        // app modules
        form: 'RegistrationMockup/form',
        validate: 'RegistrationMockup/validate',
        tabs: 'RegistrationMockup/tabs',
        dynamicForm: 'RegistrationMockup/dynamicForm',
        dynamicTable: 'RegistrationMockup/dynamicTable',
        datepicker: 'RegistrationMockup/datepicker',
        multiselect: 'RegistrationMockup/multiselect',
        maskedInput: 'RegistrationMockup/maskedInput',

        // external dependencies
        underscore: 'underscore/underscore'
    }
});

require(['form', 'validate', 'tabs', 'dynamicForm', 'dynamicTable', 'datepicker', 'multiselect', 'maskedInput'],
    function (form, validate, tabs, dynamicForm, dynamicTable, datepicker, multiselect, maskedInput) {
        'use strict';
        form.main();
        validate.main();
        tabs.main();
        dynamicForm.main();
        dynamicTable.main();
        datepicker.main();
        multiselect.main();
        maskedInput.main();
    });