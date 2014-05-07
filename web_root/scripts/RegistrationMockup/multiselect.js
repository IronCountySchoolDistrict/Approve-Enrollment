/*global define, $*/

define(function () {
    'use strict';
    return {
        main: function () {
            this.bindMultiselect();
        },
        bindMultiselect: function () {
            $('#completed-grades').multiselect({
                numberDisplayed: 20,
                templates: {
                    button: '<button type="button" class="multiselect dropdown-toggle btn btn-default" data-toggle="dropdown" id="completed-grades-multi"></button>'
                }
            });
        }
    };
});