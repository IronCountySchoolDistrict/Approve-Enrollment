/*global define, $j*/

define(function () {
    'use strict';
    return {
        main: function () {
            this.bindDatepicker();
        },

        bindDatepicker: function () {
            // Bind datepicker
            var nowTemp = new Date();
            var twoYearsAgo = new Date(nowTemp.getFullYear() - 2, nowTemp.getMonth(), nowTemp.getDate(), 0, 0, 0, 0);
            var twentyYearsAgo = new Date(nowTemp.getFullYear() - 20, nowTemp.getMonth(), nowTemp.getDate(), 0, 0, 0, 0);
            $j('.dateinput').datepicker({
                autoclose: true,
                startView: 'decade',
                startDate: twentyYearsAgo,
                endDate: twoYearsAgo,
                format: 'mm-dd-yyyy'
            });
        }
    };
});