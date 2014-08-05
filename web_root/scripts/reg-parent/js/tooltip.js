/*global define, $*/

define(function () {
    'use strict';
    return {
        main: function () {
            this.bindTooltip();
        },
        bindTooltip: function () {
            $('#504-tooltip').tooltip();
        }
    };
});