/*global $j*/
(function () {
    'use strict';
    var searches = $j('.searchButtons');
    var lastSearch = searches[searches.length - 1];
    var regBtnTemplate = $j($j('#reg-btn-template').html());
    regBtnTemplate.insertAfter(lastSearch);
    regBtnTemplate.css('padding-left', '10px');
}());