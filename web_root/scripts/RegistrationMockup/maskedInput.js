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
        },

        main: function () {
            this.bindMaskedInput();
        }
    };
});