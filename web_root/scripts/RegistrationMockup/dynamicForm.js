/*global $, define*/

define(['validate'], function (validate) {
    'use strict';
    return {
        main: function () {
            this.bindHideShow();
            this.bindDisableOtherCheckboxes();
        },

        /**
         * Make needed calls to hideShowFormElements.
         *
         * @returns {undefined}
         * @see hideShowFormElements
         */
        bindHideShow: function () {

            // Suspended/expelled explanation box.
            this._hideShowFormElementRadio(
                $('#safe-school-violation-no'),
                $('#safe-school-violation-yes'),
                $('#safe-school-violation-explanation-label, #safe-school-violation-explanation'),
                400
            );

            // Language of correspondence
            this._hideShowFormElementRadio(
                $('#corres-lang-eng'),
                $('#corres-lang-other'),
                $('#corres-lang-other-text'),
                400
            );

            // Medications
            this._hideShowFormElementRadio(
                $('#med-require-meds-no'),
                $('#med-require-meds-yes'),
                $('#medications-label, #medications'),
                400
            );

            // Additional medical conditions or needed services
            this._hideShowFormElementRadio(
                $('#med-other-no'),
                $('#med-other-yes'),
                $('#add-med-services-label, #add-med-services'),
                400
            );

            this._hideShowFormElementCheckbox(
                $('#american-ind-alaska'),
                $('#tribal-affil-label, #tribal-affil'),
                400
            );

            this._hideShowFormElementRadio(
                $('#part-time-no'),
                $('#part-time-yes'),
                $('#part-time-student-label, #part-time-options-div'),
                400
            );

            this._hideShowFormElementRadioDelegate(
                '#three-ac-yrs-no',
                '#three-ac-yrs-yes',
                '#completed-grades-label, #completed-grades-multi, #parsley-id-multiple-completed-grades',
                400,
                $('#completed-grades')
            );
        },

        /**
         * Bind event that monitors what checkboxes are selected.
         * @returns {undefined}
         */
        bindDisableOtherCheckboxes: function () {
            this._disableOtherCheckboxes(
                $('#bilingual-neither'),
                $('#bilingual-esl, #bilingual-bilingual')
            );
        },

        /**
         * If a Neither checkbox is selected, don't allow the other checkboxes to be selected,
         * and if other checkboxes are selected when Neither is selected, clear the other selections.
         * @param {jQuery} exclusiveBox - checkbox element that disables other checkboxes when checked.
         * @param {jQuery} otherBoxes - 1 or more check boxes that should be disabled when exclusiveBox is checked.
         * @private
         * @returns {undefined}
         */
        _disableOtherCheckboxes: function (exclusiveBox, otherBoxes) {
            otherBoxes.on('click', function () {
                if (exclusiveBox.is(':checked')) {
                    exclusiveBox.prop('checked', false);
                }
            });
            exclusiveBox.on('click', function () {
                if (otherBoxes.is(':checked')) {
                    otherBoxes.prop('checked', false);
                }
            });
        },

        /**
         * Pass in show and hide DOM elements, and this function will bind fadeIn and fadeOut jQuery function calls
         * to targetElem when they are selected.
         * Use this function for Yes and No Radio elements.
         * @param {Object} hideElem - DOM element that will hide the targetElem when selected.
         * @param {Object} showElem - DOM element that will show the targetElem when selected.
         * @param {Object|Array|jQuery} targetElem - DOM element(s) that will be hidden or shown when hideElem or showElem is selected, respectively.
         * @param {Number} [duration=400] - Length of fadeIn and fadeOut animation duration.
         * @private
         * @returns {undefined}
         */
        _hideShowFormElementRadio: function (hideElem, showElem, targetElem, duration) {
            hideElem.on('click', function (event) {
                event.stopPropagation();
                if (duration) {
                    $(targetElem).fadeOut(duration);
                } else {
                    $(targetElem).fadeOut();
                }
            });

            showElem.on('click', function (event) {
                event.stopPropagation();
                if (duration) {
                    $(targetElem).fadeIn(duration);
                } else {
                    $(targetElem).fadeIn();
                }
            });
        },

        /**
         * This method assumes that at the time when the 'click' callback function is bound to hideElem/showElem,
         * some or all of the targetElem elements will not have been inserted into the DOM yet.
         * So, delay the selection until the callback is fired, and the elements will have been inserted.
         * One example of this is the multiselect plugin, which inserts the multiselect button after these events
         * have been bound.
         * @param {String} hideElem - DOM element selector that will hide the targetElem when selected.
         * @param {String} showElem - DOM element selector that will show the targetElem when selected.
         * @param targetElem {String} - selector that will contain the elements that will be hidden or shown when hideElem or showElem is selected, respectively.
         * @param duration {Number} [duration=400] - Length of fadeIn and fadeOut animation duration.
         * @param [requiredField] {jQuery} - a form field that is required when shown, but optional when hidden.
         *   If field is shown, make it required by calling validate.addRequiredField. If field is hidden, remove it from required fields by calling validate.removeRequiredField.
         * @private
         */
        _hideShowFormElementRadioDelegate: function (hideElem, showElem, targetElem, duration, requiredField) {
            $(document).on('click', hideElem, function (event) {
                event.stopPropagation();
                if (duration) {
                    $(document).find(targetElem).fadeOut(duration);
                } else {
                    $(document).find(targetElem).fadeOut();
                }

                // Field is hidden, so make it an optional field
                validate.removeRequiredField(requiredField);
            });

            $(document).on('click', showElem, function (event) {
                event.stopPropagation();
                if (duration) {
                    $(document).find(targetElem).fadeIn(duration);
                } else {
                    $(document).find(targetElem).fadeIn();
                }
                // Field is shown, so make it a required field
                validate.addRequiredField(requiredField);
            });

        },

        /**
         * Pass in a checkbox DOM element, and this function will toggle fadeIn/fadeOut jQuery function calls
         * to targetElem when they are selected.
         * Use this function for checkbox element that will toggle hide and show.
         * @param {Object} toggleElem - DOM element that will toggle the targetElem.
         * @param {Object} targetElem - DOM element(s) that will be hidden or shown when toggleElem is clicked.
         * @param {Number} [duration=400] - Length of fadeIn and fadeOut animation duration.
         * @private
         * @returns {undefined}
         */
        _hideShowFormElementCheckbox: function (toggleElem, targetElem, duration) {
            toggleElem.on('click', function () {
                if (duration) {
                    $(targetElem).fadeToggle(duration);
                } else {
                    $(targetElem).fadeToggle();
                }
            });
        }
    };
});