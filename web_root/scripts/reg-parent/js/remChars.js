/*global define, $, jQuery*/

define(function () {
    'use strict';

    return {
        main: function () {
            this.bindCountChar();
        },

        /**
         *
         * @param eventTarget {jQuery} - element that user is typing in
         * @param charCountElem {jQuery} - element that will display the character count
         */
        countChar: function (eventTarget, charCountElem) {
            var length = eventTarget.val().length;
            if (length >= 400) {
                eventTarget.val(eventTarget.val().substring(0, 400));
                charCountElem.text("0 characters remaining");
            } else {
                charCountElem.text(400 - length + " characters remaining");
            }
        },

        bindCountChar: function () {
            var self = this;
            $('#safe-school-violation-expl').on('keyup paste', function (event) {
                self.countChar($(event.target), $('#safe-school-violation-expl-rem-chars'));
            });

            $('#other-info').on('keyup paste', function (event) {
                self.countChar($(event.target), $('#other-info-rem-chars'));
            });

            $('#medications').on('keyup paste', function (event) {
                self.countChar($(event.target), $('#safe-school-violation-expl-rem-chars'));
            });

            $('#add-med-services').on('keyup paste', function (event) {
                self.countChar($(event.target), $('#safe-school-violation-expl-rem-chars'));
            });
        }
    };
});