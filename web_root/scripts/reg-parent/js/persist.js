/*global define, $, _*/

define(['emergConts', 'siblings', 'underscore'], function (emergConts, siblings, _) {
    'use strict';
    return {
        config: {
            extGroup: 'U_REGISTRATION2',
            extEmergContTable: 'U_DEF_EMERG_CONTS2',
            extSiblingTable: 'U_DEF_SIBLINGS2',
            extStagingTable: 'U_DEF_STAGING2'
        },

        bindFormSubmit: function () {
            var regForm = $('#reg-form');
            var _this = this;
            regForm.on('submit', function (event) {
                event.preventDefault();

                // Load emerg. contact data and save each row individually.
                var emergContactsRows = $('#emerg-cont-table tr[data-index]');
                _.each(emergContactsRows, function (row, index) {
                    var contactFormData = _this.getEmergContFromTable(_this.config.extGroup, _this.config.extEmergContTable, index + 1);

                    //emergConts.save(contactFormData);
                });

                var siblingsRows = $('#siblings-table tr[data-index]');
                _.each(siblingsRows, function (row, index) {
                    var siblingFormData = _this.getSiblingFromTable(_this.config.extGroup, _this.config.extSiblingTable, index + 1);
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
        getEmergContFromTable: function (extGroup, extTable, contactIndex) {
            var emergContsDbeFields = [
                    'CF-[:0.' + extGroup + '.' + extTable + ':-1]address_state',
                    'CF-[:0.' + extGroup + '.' + extTable + ':-1]cell_phone',
                    'CF-[:0.' + extGroup + '.' + extTable + ':-1]address_zip',
                    'CF-[:0.' + extGroup + '.' + extTable + ':-1]email',
                    'CF-[:0.' + extGroup + '.' + extTable + ':-1]work_phone',
                    'CF-[:0.' + extGroup + '.' + extTable + ':-1]employer',
                    'CF-[:0.' + extGroup + '.' + extTable + ':-1]address_street',
                    'CF-[:0.' + extGroup + '.' + extTable + ':-1]name',
                    'CF-[:0.' + extGroup + '.' + extTable + ':-1]home_phone',
                    'CF-[:0.' + extGroup + '.' + extTable + ':-1]address_city',
                    'CF-[:0.' + extGroup + '.' + extTable + ':-1]relationship',
                    'CF-[:0.' + extGroup + '.' + extTable + ':-1]priority',
                    'CF-[:0.' + extGroup + '.' + extTable + ':-1]staging_id'
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
                    'CF-[:0.' + extGroup + '.' + extTable + ':-1]birthdate',
                    'CF-[:0.' + extGroup + '.' + extTable + ':-1]gender',
                    'CF-[:0.' + extGroup + '.' + extTable + ':-1]grade',
                    'CF-[:0.' + extGroup + '.' + extTable + ':-1]name',
                    'CF-[:0.' + extGroup + '.' + extTable + ':-1]school',
                    'CF-[:0.' + extGroup + '.' + extTable + ':-1]staging_id',
            ];

            var siblingsData = [];

            siblingsData.push($('#sibling-birthdate' + contactIndex).val());

            var siblingGenderSelector = '[name="sibling-gender' + contactIndex + '"]';
            var selectedSiblingGender = _.filter($(siblingGenderSelector).find('option'), function (elem) {
                if ($(elem).is(':selected')) {
                    return elem;
                }
            });
            siblingsData.push($(selectedSiblingGender).val());

            var siblingGradeSelector = '[name="sibling-grade' + contactIndex + '"]';
            var selectedSiblingGrade = _.filter($(siblingGradeSelector).find('option'), function (elem) {
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

        getStagingDataFromTable: function (extGroup, extTable) {
            var emergContsDbeFields = [
                    'CF-[:0.' + extGroup + '.' + extTable + ':-1]RESIDENCE_STATE',
                    'CF-[:0.' + extGroup + '.' + extTable + ':-1]PHYSICIANS_PHONE',
                    'CF-[:0.' + extGroup + '.' + extTable + ':-1]PREV_UTAH',
                    'CF-[:0.' + extGroup + '.' + extTable + ':-1]SCHOOL_FAX',
                    'CF-[:0.' + extGroup + '.' + extTable + ':-1]MED_HEARING',
                    'CF-[:0.' + extGroup + '.' + extTable + ':-1]MEDICAL_INFO',
                    'CF-[:0.' + extGroup + '.' + extTable + ':-1]SPEECH_LANG_SERVICES',
                    'CF-[:0.' + extGroup + '.' + extTable + ':-1]SPECIAL_ED_SERVICES',
                    'CF-[:0.' + extGroup + '.' + extTable + ':-1]SERVICES_504',
                    'CF-[:0.' + extGroup + '.' + extTable + ':-1]HOME_PHONE_NUMBER',
                    'CF-[:0.' + extGroup + '.' + extTable + ':-1]OTHER_INFO',
                    'CF-[:0.' + extGroup + '.' + extTable + ':-1]FIRST_NAME',
                    'CF-[:0.' + extGroup + '.' + extTable + ':-1]JUVENILE_PROBATION',
                    'CF-[:0.' + extGroup + '.' + extTable + ':-1]GENDER',
                    'CF-[:0.' + extGroup + '.' + extTable + ':-1]MEDICATION',
                    'CF-[:0.' + extGroup + '.' + extTable + ':-1]LAST_NAME',
                    'CF-[:0.' + extGroup + '.' + extTable + ':-1]CORRES_LANG',
                    'CF-[:0.' + extGroup + '.' + extTable + ':-1]MAILING_CITY',
                    'CF-[:0.' + extGroup + '.' + extTable + ':-1]RESIDENCE_CITY',
                    'CF-[:0.' + extGroup + '.' + extTable + ':-1]PRIM_LANG',
                    'CF-[:0.' + extGroup + '.' + extTable + ':-1]FOSTER_WARD_STUDENT',
                    'CF-[:0.' + extGroup + '.' + extTable + ':-1]POLICY_SAFE_SCHOOLS',
                    'CF-[:0.' + extGroup + '.' + extTable + ':-1]THREE_AC_YRS',
                    'CF-[:0.' + extGroup + '.' + extTable + ':-1]MAILING_ADDRESS',
                    'CF-[:0.' + extGroup + '.' + extTable + ':-1]BILINGUAL',
                    'CF-[:0.' + extGroup + '.' + extTable + ':-1]MAILING_ADDRESS',
                    'CF-[:0.' + extGroup + '.' + extTable + ':-1]PART_TIME',
                    'CF-[:0.' + extGroup + '.' + extTable + ':-1]MAILING_ZIP',
                    'CF-[:0.' + extGroup + '.' + extTable + ':-1]STUDENT_DIRECTORY',
                    'CF-[:0.' + extGroup + '.' + extTable + ':-1]MED_ADD_ADHD',
                    'CF-[:0.' + extGroup + '.' + extTable + ':-1]HOME_LANG',
                    'CF-[:0.' + extGroup + '.' + extTable + ':-1]BIRTHDATE',
                    'CF-[:0.' + extGroup + '.' + extTable + ':-1]MIDDLE_NAME',
                    'CF-[:0.' + extGroup + '.' + extTable + ':-1]STUDENT_CELL_NUMBER',
                    'CF-[:0.' + extGroup + '.' + extTable + ':-1]MED_SEIZURES',
                    'CF-[:0.' + extGroup + '.' + extTable + ':-1]COMPLETED_GRADES',
                    'CF-[:0.' + extGroup + '.' + extTable + ':-1]MED_VISION',
                    'CF-[:0.' + extGroup + '.' + extTable + ':-1]RESIDENCE_ADDRESS',
                    'CF-[:0.' + extGroup + '.' + extTable + ':-1]EMAIL_ADDRESS',
                    'CF-[:0.' + extGroup + '.' + extTable + ':-1]MED_ASTHMA',
                    'CF-[:0.' + extGroup + '.' + extTable + ':-1]SCHOOL_ZIP',
                    'CF-[:0.' + extGroup + '.' + extTable + ':-1]MEDIA_FULL_NAME',
                    'CF-[:0.' + extGroup + '.' + extTable + ':-1]HISP_LATINO',
                    'CF-[:0.' + extGroup + '.' + extTable + ':-1]MED_GLASSES',
                    'CF-[:0.' + extGroup + '.' + extTable + ':-1]CURRENT_GRADE',
                    'CF-[:0.' + extGroup + '.' + extTable + ':-1]SCHOOL_PHONE',
                    'CF-[:0.' + extGroup + '.' + extTable + ':-1]MED_REQUIRE_MEDS',
                    'CF-[:0.' + extGroup + '.' + extTable + ':-1]MED_HEART',
                    'CF-[:0.' + extGroup + '.' + extTable + ':-1]FIELD_TRIPS',
                    'CF-[:0.' + extGroup + '.' + extTable + ':-1]IMMUNIZATIONS_COMPLETE',
                    'CF-[:0.' + extGroup + '.' + extTable + ':-1]MED_ALLERGIES',
                    'CF-[:0.' + extGroup + '.' + extTable + ':-1]REFUGEE',
                    'CF-[:0.' + extGroup + '.' + extTable + ':-1]SSN',
                    'CF-[:0.' + extGroup + '.' + extTable + ':-1]ADD_MED_SERVICES',
                    'CF-[:0.' + extGroup + '.' + extTable + ':-1]LAST_ATTENDED_GRADE',
                    'CF-[:0.' + extGroup + '.' + extTable + ':-1]SAFE_SCHOOL_VIOLATION',
                    'CF-[:0.' + extGroup + '.' + extTable + ':-1]RESIDENCE_ZIP',
                    'CF-[:0.' + extGroup + '.' + extTable + ':-1]MAILING_STATE',
                    'CF-[:0.' + extGroup + '.' + extTable + ':-1]SCHOOL_CITY',
                    'CF-[:0.' + extGroup + '.' + extTable + ':-1]PART_TIME_DETAIL',
                    'CF-[:0.' + extGroup + '.' + extTable + ':-1]CUR_LANG',
                    'CF-[:0.' + extGroup + '.' + extTable + ':-1]PART_TIME_OTHER_DESC',
                    'CF-[:0.' + extGroup + '.' + extTable + ':-1]DATE_FIRST_ENROLLED',
                    'CF-[:0.' + extGroup + '.' + extTable + ':-1]PHYSICANS_NAME',
                    'CF-[:0.' + extGroup + '.' + extTable + ':-1]PREV_ICSD',
                    'CF-[:0.' + extGroup + '.' + extTable + ':-1]POLICY_AUP',
                    'CF-[:0.' + extGroup + '.' + extTable + ':-1]MED_DIABETES',
                    'CF-[:0.' + extGroup + '.' + extTable + ':-1]DENTISTS_PHONE',
                    'CF-[:0.' + extGroup + '.' + extTable + ':-1]RACE',
                    'CF-[:0.' + extGroup + '.' + extTable + ':-1]NICKNAME',
                    'CF-[:0.' + extGroup + '.' + extTable + ':-1]COUNT_TERR_BIRTH',
                    'CF-[:0.' + extGroup + '.' + extTable + ':-1]DENTISTS_NAME'
            ];
        },

        main: function () {
            this.bindFormSubmit();
        }
    };
});