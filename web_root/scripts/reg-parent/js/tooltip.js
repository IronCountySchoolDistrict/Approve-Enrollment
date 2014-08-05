/*global define, $*/

define(function () {
    'use strict';
    return {
        main: function () {
            this.bindTooltip();
        },
        bindTooltip: function () {
            $('.bind-tooltip').tooltip();
        }
    };
});