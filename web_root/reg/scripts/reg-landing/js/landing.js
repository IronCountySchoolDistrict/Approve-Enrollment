/*global $*/

$(document).ready(function () {
    'use strict';

    var lang = {
        '#language-english': {
            'english': 'English',
            'spanish': 'Ingles'
        },

        '#language-spanish': {
            'english': 'Spanish',
            'spanish': 'Espanol'
        },

        '#welcome': {
            'english': 'Welcome to Registration!',
            'spanish': 'Bienvenido al registro!'
        }
    };

    $('#returning-student').on('click', function () {
        $('#returning-steps').parent().slideDown();
    });

    $('#language-spanish').on('click', function () {
        $.each(lang, function (key, value) {
            $(key).text(value.spanish);
        });
    });

    $('#language-english').on('click', function () {
        $.each(lang, function (key, value) {
            $(key).text(value.english);
        });
    });
});