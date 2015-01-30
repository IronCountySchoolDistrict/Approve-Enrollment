/*global $, define, document, jQuery*/

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
            var args = {};
            args.yesElem = $('#safe-school-violation-yes');
            args.noElem = $('#safe-school-violation-no');
            args.yesTargetElem = $('#safe-school-violation-expl-label, #safe-school-violation-expl');
            args.duration = 400;
            args.yesRequiredField = $('#safe-school-violation-expl');
            this._hideShowFormElementRadio(args);
            args = {};


            // Medications
            args.yesElem = $('#med-require-meds-yes');
            args.noElem = $('#med-require-meds-no');
            args.yesTargetElem = $('#medications-label, #medications');
            args.duration = 400;
            args.requiredField = $('#medications');
            this._hideShowFormElementRadio(args);
            args = {};

            // Mailing/Residence/homeless address
            args.yesElem = $('#student-is-homeless-yes');
            args.noElem = $('#student-is-homeless-no');
            args.yesTargetElem = $('#homeless-student-message-row');
            args.noTargetElem = $('#mailing-address-row, #residence-address-row, #school-relocation-message-row');
            args.duration = 400;
            this._hideShowFormElementRadio(args);
            args = {};

            // Currently receiving special education services
            args.yesElem = $('#past-special-ed-services-yes');
            args.noElem = $('#past-special-ed-services-no');
            args.yesTargetElem = $('#current-special-ed-services-label, #current-special-ed-services-div');
            args.duration = 400;
            args.requiredField = $('#current-special-ed-services-yes');
            this._hideShowFormElementRadio(args);
            args = {};

            // Additional medical conditions or needed services
            args.yesElem = $('#med-other-yes');
            args.noElem = $('#med-other-no');
            args.yesTargetElem = $('#add-med-services-label, #add-med-services');
            args.duration = 400;
            args.requiredField = $('add-med-services');
            this._hideShowFormElementRadio(args);
            args = {};

            this._hideShowFormElementCheckbox(
                $('#american-ind-alaska'),
                $('#tribal-affil-label, #tribal-affil'),
                400,
                $('#tribal-affil')
            );

            // Full-Time Student
            args.yesElem = $('#full-time-yes');
            args.noElem = $('#full-time-no');
            args.noTargetElem = $('#part-time-student-label, #part-time-options-div');
            args.duration = 400;
            args.requiredField = $('#part-time-home-school');
            this._hideShowFormElementRadio(args);

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
         *
         * @param fieldElem {jQuery}
         * @param [duration] {number}
         * @param requiredField {jQuery}
         * @private
         */
        _hideField: function (fieldElem, duration, requiredField) {
            if (!duration) {
                duration = 400;
            }
            // Check if there is a help span that can also be hidden
            var helpBlock = fieldElem.next('.help-block');
            if (helpBlock.length) {
                fieldElem.add(helpBlock);
            }
            fieldElem.fadeOut(duration, function () {
                if (fieldElem.filter(':hidden') && requiredField) {
                    validate.removeRequiredField(requiredField);
                }
            });
        },

        /**
         *
         * @param fieldElem {jQuery}
         * @param [duration] {number}
         * @param requiredField {jQuery}
         * @private
         */
        _showField: function (fieldElem, duration, requiredField) {
            if (duration) {
                duration = 400;
            }

            fieldElem.fadeIn(duration, function () {
                if (fieldElem.filter(':not(:hidden)') && requiredField) {
                    validate.addRequiredField(requiredField);
                }
            });
        },

        /**
         * Pass in show and hide DOM elements, and this function will bind fadeIn and fadeOut jQuery function calls
         * to yesTargetElem when they are selected.
         * Use this function for Yes and No Radio elements.
         * @param {Object} context - Arguments object
         * @param {Object} context.yesElem - DOM element that will show the yesTargetElem when selected.
         * @param {Object} context.noElem - DOM element that will hide the noTargetElem when selected.
         * @param {Object|Array|jQuery} context.yesTargetElem - DOM element(s) that will be shown when yesElem is selected and hidden when yesElem is not selected.
         * @param {Object|Array|jQuery} [context.noTargetElem] - DOM element(s) that will be shown when nosElem is selected and hidden when yesElem is not selected.
         * @param {Number} [context.duration=400] - Length of fadeIn and fadeOut animation duration.
         * @param {jQuery} [context.yesRequiredField] - one or more form fields that is required when the yesElem is selected and yesTargetElem is shown, but optional when hidden.
         *   When field is shown, make it required by calling validate.addRequiredField. When field is hidden, remove it from required fields by calling validate.removeRequiredField.
         * @param {jQuery} [context.noRequiredField] - one or more form fields that is required when the noElem is selected and noTargetElem is shown. See also @param yesRequiredField.
         * @private
         * @return {null}
         */
        _hideShowFormElementRadio: function (context) {
            var _this = this;
            if (!context.duration) {
                context.duration = 400;
            }
            if (context.noElem) {
                context.noElem.on('click', function (event) {
                    event.stopPropagation();
                    if (context.noTargetElem) {
                        _this._showField(context.noTargetElem, context.duration, context.noRequiredField);
                    }
                    if (context.yesTargetElem) {
                        _this._hideField(context.yesTargetElem, context.duration, context.yesRequiredField);
                    }
                });
            }

            if (context.yesElem) {
                context.yesElem.on('click', function (event) {
                    event.stopPropagation();
                    if (context.noTargetElem) {
                        _this._hideField(context.noTargetElem, context.duration);
                    }
                    if (context.yesTargetElem) {
                        _this._showField(context.yesTargetElem, context.duration);
                    }
                });
            }
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
         *   When field is shown, make it required by calling validate.addRequiredField. When field is hidden, remove it from required fields by calling validate.removeRequiredField.
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

                if (requiredField) {
                    // Field is hidden, so make it an optional field
                    validate.removeRequiredField(requiredField);
                }
            });

            $(document).on('click', showElem, function (event) {
                event.stopPropagation();
                if (duration) {
                    $(document).find(targetElem).fadeIn(duration);
                } else {
                    $(document).find(targetElem).fadeIn();
                }

                if (requiredField) {
                    // Field is shown, so make it a required field
                    validate.addRequiredField(requiredField);
                }
            });

        },

        /**
         * Pass in a checkbox DOM element, and this function will toggle fadeIn/fadeOut jQuery function calls
         * to targetElem when they are selected.
         * Use this function for checkbox element that will toggle hide and show.
         * @param {Object} toggleElem - DOM element that will toggle the targetElem.
         * @param {Object} targetElem - DOM element(s) that will be hidden or shown when toggleElem is clicked.
         * @param {Number} [duration=400] - Length of fadeIn and fadeOut animation duration.
         * @param [requiredField] {jQuery} - a form field that is required when shown, but optional when hidden.
         *   When field is shown, make it required by calling validate.addRequiredField. When field is hidden, remove it from required fields by calling validate.removeRequiredField.
         * @private
         * @returns {undefined}
         */
        _hideShowFormElementCheckbox: function (toggleElem, targetElem, duration, requiredField) {
            toggleElem.on('click', function () {
                if (duration) {
                    $(targetElem).fadeToggle(duration, function () {
                        var targetElemDisplay = targetElem.css('display');
                        if (targetElemDisplay === 'none') {
                            validate.removeRequiredField(requiredField);
                        } else if (targetElemDisplay === 'inline-block') {
                            validate.addRequiredField(requiredField);
                        }
                    });
                } else {
                    $(targetElem).fadeToggle(function () {
                        var targetElemDisplay = targetElem.css('display');
                        if (targetElemDisplay === 'none') {
                            validate.removeRequiredField(requiredField);
                        } else if (targetElemDisplay === 'inline-block') {
                            validate.addRequiredField(requiredField);
                        }
                    });
                }
            });
        }
    };
});