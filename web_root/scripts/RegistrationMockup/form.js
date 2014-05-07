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
        bindSubmit: function () {
            $('#submit-btn').on('click', function () {
                $('form').trigger('submit');
            });
        },

        main: function () {
            this.bindSubmit();
        }
    };
});