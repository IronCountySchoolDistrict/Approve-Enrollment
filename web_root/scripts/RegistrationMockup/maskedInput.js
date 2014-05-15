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
            $('#home-phone-number').mask('999-999-9999');
        },

        main: function () {
            this.bindSubmit();
        }
    };
});