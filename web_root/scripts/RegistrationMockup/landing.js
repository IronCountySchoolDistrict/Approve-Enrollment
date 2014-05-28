/*global $*/

(function () {
    'use strict';

    var spanish = {
        '#language-english': 'Ingles',
        '#language-spanish': 'Espanol',
        '#welcome': 'Bienvenido al registro!'
    };

    var english = {
        '#language-english': 'English',
        '#language-spanish': 'Spanish'
    };

    $('#returning-student').on('click', function () {
        $('#returning-steps').slideDown();
    });

    $('#language-spanish').on('click', function () {
        $.each(spanish, function (key, value) {
            $(key).text(value);
        });
    });

    $('#language-english').on('click', function () {
        $.each(english, function (key, value) {
            $(key).text(value);
        });
    });
}());