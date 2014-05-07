/*global define, $*/

define(function () {
    'use strict';
    return {
        main: function () {
            this.bindTokenfield();
        },
        bindTokenfield: function () {
            $('#completed-grades').tokenfield({
                showAutocompleteOnFocus: true
            });
        }
    };
});