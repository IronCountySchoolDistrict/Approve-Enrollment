/*global define, $ */

define(function () {
    'use strict';
    /**
     * @type {Object}
     */
    return {
        /**
         * Bind submit event to submit button
         * @returns {undefined}
         */
        bindMaskedInput: function () {
            $('#home-phone-number,' +
                '#parent-cell-number,' +
                '#student-cell-number,' +
                '#school-phone,' +
                '#school-fax,' +
                '#physicians-phone,' +
                '#dentists-phone').mask('999-999-9999');

            $('#date-first-enrolled').mask('99-99-9999');

            $('[id^=emerg-cont-home-phone], ' +
                '[id^=emerg-cont-cell-phone], ' +
                '[id^=emerg-cont-work-phone]').mask('999-999-9999');

            $('[id^=sibling-birthdate]').mask('99-99-9999');

            $('#ssn').mask('999-99-9999');
        },

        /**
         * Rebind the .mask() call to all fields that are part of dynamic field tables.
         * This ensures that dynamically added rows (on the Contacts/Siblings page) get
         * the maskedInput behavior.
         */
        rebindDynamicMaskedInput: function () {
            $('[id^=emerg-cont-home-phone], ' +
                '[id^=emerg-cont-cell-phone], ' +
                '[id^=emerg-cont-work-phone]').mask('999-999-9999');

            $('[id^=sibling-birthdate]').mask('99-99-9999');
        },

        main: function () {
            this.bindMaskedInput();
        }
    };
});