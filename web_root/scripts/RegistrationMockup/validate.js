/*global define, $, require*/

/**
 * Everything pertaining to form validation with Parsley
 */
define(function () {
    'use strict';
    return {
        main: function () {
            this.parsleyValidate();
            this.activateParsley();
        },
        parsleyValidate: function () {
            window.ParsleyValidator
                .addValidator('danglingspaces', function (value) {
                    // any string that doesn't start with a space, but can contain spaces elsewhere
                    var pattern = /^(?!\s)(.*)$/;
                    var noBeginSpace = pattern.test(value);
                    // Check if the last character is a space character.
                    var noEndSpace = value.charAt(value.length - 1) !== ' ';
                    return noBeginSpace && noEndSpace;
                }, 65)
                .addMessage('en', 'danglingspaces', 'This field cannot contain spaces at the start or end of the field');
            window.ParsleyValidator
                .addValidator('nospaces', function (value) {
                    // match any string of characters that does not contain a space
                    var pattern = /^(.(?!\s))*$/;
                    return pattern.test(value);
                }, 64)
                .addMessage('en', 'nospaces', 'This field cannot contain spaces');
            window.ParsleyValidator
                .addValidator('alpha', function (value) {
                    // one more alpha character
                    var pattern = /^[A-Za-z]+$|^$/;
                    return pattern.test(value);
                }, 63)
                .addMessage('en', 'alpha', 'This field can only contain alphabetic characters.');
            window.ParsleyValidator
                .addValidator('date', function (value) {
                    var pattern = /^[0-9]{2}\-[0-9]{2}-[0-9]{4}$/;
                    return pattern.test(value);
                }, 62)
                .addMessage('en', 'date', 'This field must match the format: mm-dd-yyyy');
            window.ParsleyValidator
                .addValidator('ssn', function (value) {
                    var pattern = /^[0-9]{3}\-[0-9]{2}\-[0-9]{4}$/;
                    return pattern.test(value);
                }, 61)
                .addMessage('en', 'ssn', 'This field must match the form: ###-##-####.');
            window.ParsleyValidator
                .addValidator('phonenum', function (value) {
                    var pattern = /^[0-9]{3}\-[0-9]{3}\-[0-9]{4}$/;
                    return pattern.test(value);
                }, 60)
                .addMessage('en', 'phonenum', 'This field must match the form: ###-###-####.');
            window.ParsleyValidator
                .addValidator('completedgrades', function (value) {
                    var childAttendedSchool = $('#three-ac-yrs-yes').val();
                    return !(childAttendedSchool === 'on' && value.length === 0);
                }, 59)
                .addMessage('en', 'completedgrades', 'At least one grade must be selected.');
            window.ParsleyValidator
                .addValidator('bilingual', function (value) {

                    // Return false if user has marked zero checkboxes.
                    // 3 checkboxes marked is technically an invalid input, since if the Neither checkbox is checked,
                    // the other two checkboxes shouldn't also be checked.
                    // However, the other two checkboxes will be unchecked by the dynamicForm._disableOtherCheckboxes function,
                    // which is called after this validator.
                    // So, this function sees 3 marked checkboxes, but they will be unchecked at a later time by _disabledOtherCheckboxes.
                    return value.length > 0;
                }, 58)
                .addMessage('en', 'bilingual', 'You must select 1 or 2 of the above choices.');
        },

        activateParsley: function () {
            $('#reg-form').parsley({
                classHandler: function (ParsleyField) {
                    return ParsleyField.$element.parents('.field-container');
                },
                errorsContainer: function (fieldInstance) {
                    return fieldInstance.$element.parents('.field-container');
                },
                // bootstrap form classes
                successClass: 'has-success has-feedback',
                errorClass: 'has-error has-feedback',
                errorsWrapper: '<span class=\"help-block\"></span>',
                errorTemplate: '<span></span>'
            }).subscribe('parsley:form:validated', function (ParsleyForm) {
                var activeTab = $('li.active a');
                require(['tabs'], function (tabs) {
                    if (ParsleyForm.validationResult) {
                        tabs.setTabStatus(activeTab, 'success');
                    } else {
                        tabs.setTabStatus(activeTab, 'error');
                    }
                });

            });
        },

        refreshParsley: function () {
            $('#reg-form').parsley().destroy();
            this.activateParsley();
        },

        addRequiredField: function (field) {

            // Make field required
            field.attr({'required': ''});

            // Refresh parsley validation
            this.refreshParsley();
        },
        removeRequiredField: function (field) {

            // Make field not required
            field.removeAttr('required');

            // Refresh parsley validation
            this.refreshParsley();
        },

        /**
         * Call parsley on a form block.
         * @param blockNum {Number} - Block number in the form.
         */
        validateBlock: function (blockNum) {
            return $('#reg-form').parsley().validate('block' + blockNum);
        }
    };
});
