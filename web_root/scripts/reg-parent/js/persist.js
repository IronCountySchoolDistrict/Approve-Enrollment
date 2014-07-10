/*global define, $, _*/

define(['emergConts', 'siblings', 'underscore'], function(emergConts, siblings, _) {
    'use strict';
    return {
        config: {
            extGroup: 'U_REGISTRATION',
            extEmergContTable: 'U_DEF_EMERG_CONTS',
            extSiblingTable: 'U_DEF_SIBLINGS'
        },

        bindFormSubmit: function () {
            var regForm = $('#reg-form');
            var _this = this;
            regForm.on('submit', function(event) {
                event.preventDefault();

                // Load emerg. contact data and save each row individually.
                var emergContactsRows = $('#emerg-cont-table tr[data-index]');
                _.each(emergContactsRows, function(row, index) {
                    var contactFormData = _this.getEmergContFromTable(_this.config.extGroup, _this.config.extEmergContTable, index + 1);

                    //emergConts.save(contactFormData);
                });

                var siblingsRows = $('#siblings-table tr[data-index]');
                _.each(siblingsRows, function(row, index) {
                    var siblingFormData = _this.getSiblingFromTable(_this.config.extGroup, _this.config.extSiblingTable, index+1);
                    siblings.save(siblingFormData);
                });
            });
        },

        /**
         * Create the form data object from the table row HTML.
         * @param extGroup database extension group
         * @param extTable database extension table
         * @returns {Object}
         */
        getEmergContFromTable: function(extGroup, extTable, contactIndex) {
            var emergContsDbeFields = [
                'CF-[:0.' + extGroup + '.' + extTable + ':-1]emerg_cont_address_state',
                'CF-[:0.' + extGroup + '.' + extTable + ':-1]emerg_cont_cell_phone',
                'CF-[:0.' + extGroup + '.' + extTable + ':-1]emerg_cont_address_zip',
                'CF-[:0.' + extGroup + '.' + extTable + ':-1]emerg_cont_email',
                'CF-[:0.' + extGroup + '.' + extTable + ':-1]emerg_cont_work_phone',
                'CF-[:0.' + extGroup + '.' + extTable + ':-1]emerg_cont_employer',
                'CF-[:0.' + extGroup + '.' + extTable + ':-1]emerg_cont_address_street',
                'CF-[:0.' + extGroup + '.' + extTable + ':-1]emerg_cont_name',
                'CF-[:0.' + extGroup + '.' + extTable + ':-1]emerg_cont_home_phone',
                'CF-[:0.' + extGroup + '.' + extTable + ':-1]emerg_cont_address_city',
                'CF-[:0.' + extGroup + '.' + extTable + ':-1]emerg_cont_relationship',
                'CF-[:0.' + extGroup + '.' + extTable + ':-1]emerg_cont_priority',
            ];

            var emergContData = [];

            emergContData.push($('#emerg-cont-address-state' + contactIndex).val());
            emergContData.push($('#emerg-cont-cell-phone' + contactIndex).val());
            emergContData.push($('#emerg-cont-address-zip' + contactIndex).val());
            emergContData.push($('#emerg-cont-email' + contactIndex).val());
            emergContData.push($('#emerg-cont-work-phone' + contactIndex).val());
            emergContData.push($('#emerg-cont-employer' + contactIndex).val());
            emergContData.push($('#emerg-cont-address-state' + contactIndex).val());
            emergContData.push($('#emerg-cont-name' + contactIndex).val());
            emergContData.push($('#emerg-cont-home-phone' + contactIndex).val());
            emergContData.push($('#emerg-cont-address-city' + contactIndex).val());
            emergContData.push($('#emerg-cont-relationship' + contactIndex).val());
            emergContData.push($('#emerg-cont-priority' + contactIndex).val());

            // Checkboxes/Radios (booleans) are excluded from the form if they are blank/"no" value.
            if ($('#is-leg-guar' + contactIndex + '-yes').is(':checked')) {
                emergContsDbeFields.push('CF-[:0.' + extGroup + '.' + extTable + ':-1]is_leg_guar');
                emergContData.push('1');
            }

            var formData = _.object(emergContsDbeFields, emergContData);
            formData['ac'] = 'prim';

            return formData;
        },

        getSiblingFromTable: function (extGroup, extTable, contactIndex) {
            var siblingsDbeFields = [
                'CF-[:0.' + extGroup + '.' + extTable + ':-1]sibling_birthdate',
                'CF-[:0.' + extGroup + '.' + extTable + ':-1]sibling_gender',
                'CF-[:0.' + extGroup + '.' + extTable + ':-1]sibling_grade',
                'CF-[:0.' + extGroup + '.' + extTable + ':-1]sibling_name',
                'CF-[:0.' + extGroup + '.' + extTable + ':-1]sibling_school',
                'CF-[:0.' + extGroup + '.' + extTable + ':-1]staging_id',
            ];

            var siblingsData = [];

            siblingsData.push($('#sibling-birthdate' + contactIndex).val());

            var siblingGenderSelector = '[name="sibling-gender' + contactIndex + '"]';
            var selectedSiblingGender = _.filter($(siblingGenderSelector).find('option'), function(elem) {
                if ($(elem).is(':selected')) {
                    return elem;
                }
            });
            siblingsData.push($(selectedSiblingGender).val());

            var siblingGradeSelector = '[name="sibling-grade' + contactIndex + '"]';
            var selectedSiblingGrade = _.filter($(siblingGradeSelector).find('option'), function(elem) {
                if ($(elem).is(':selected')) {
                    return elem;
                }
            });
            siblingsData.push($(selectedSiblingGrade).val());

            siblingsData.push($('#sibling-name' + contactIndex).val());
            siblingsData.push($('#sibling-school' + contactIndex).val());

            var formData = _.object(siblingsDbeFields, siblingsData);
            formData['ac'] = 'prim';

            return formData;
        },

        main: function() {
            this.bindFormSubmit();
        }
    };
});