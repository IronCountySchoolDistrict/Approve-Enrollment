/*global define, $*/

define(function () {
    'use strict';
    return {
        main: function () {
            this.bindDatepickers();
        },

        bindDatepickers: function () {
            var nowTemp = new Date();
            var twoYearsAgo = new Date(nowTemp.getFullYear() - 2, nowTemp.getMonth(), nowTemp.getDate(), 0, 0, 0, 0);
            var twentyYearsAgo = new Date(nowTemp.getFullYear() - 20, nowTemp.getMonth(), nowTemp.getDate(), 0, 0, 0, 0);

            $('.dateinput').datepicker({
                autoclose: true,
                startView: 'decade',
                startDate: twentyYearsAgo,
                endDate: twoYearsAgo
            });
        }
    };
});
