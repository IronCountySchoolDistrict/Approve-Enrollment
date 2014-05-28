/*global $*/

(function () {
    'use strict';

    var lang = {
        '#language-english': {
            'english': 'English',
            'spanish': 'Ingles'
        },

        '#language-spanish': {
            'english': 'Spanish',
            'spanish': 'Espanol'
        }
    };

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
        $.each(lang, function (key, value) {
            $(key).text(value.spanish);
        });
    });

    $('#language-english').on('click', function () {
        $.each(english, function (key, value) {
            $(key).text(value);
        });
    });
}());