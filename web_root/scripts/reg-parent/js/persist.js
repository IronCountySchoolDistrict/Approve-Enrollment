/*global define, $, _*/

define(['emergConts', 'siblings', 'staging', 'underscore'], function (emergConts, siblings, staging, _) {
    'use strict';
    return {
        config: {
            extGroup: 'U_REGISTRATION5',
            extEmergContTable: 'U_DEF_EMERG_CONTS4',
            extSiblingTable: 'U_DEF_SIBLINGS4',
            extStagingTable: 'U_DEF_STAGING7'
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
                    //siblings.save(siblingFormData);
                });

                var stagingData = _this.getStagingDataFromTable(_this.config.extGroup, _this.config.extStagingTable);
                staging.save(stagingData);
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
                    'CF-[:0.' + extGroup + '.' + extTable + ':-1]staging_id'
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
            var stagingData = [];
            stagingData.push({
                name: 'CF-[:0.' + extGroup + '.' + extTable + ':-1]FIRST_NAME',
                value: $('#first-name').val()
            });
            stagingData.push({
                name: 'CF-[:0.' + extGroup + '.' + extTable + ':-1]MIDDLE_NAME',
                value: $('#middle-name').val()
            });
            stagingData.push({
                name: 'CF-[:0.' + extGroup + '.' + extTable + ':-1]LAST_NAME',
                value: $('#last-name').val()
            });
            stagingData.push({
                name: 'CF-[:0.' + extGroup + '.' + extTable + ':-1]NICKNAME',
                value: $('#nickname').val()
            });
            stagingData.push({
                name: 'CF-[:0.' + extGroup + '.' + extTable + ':-1]SSN',
                value: $('#ssn').val()
            });
            stagingData.push({
                name: 'CF-[:0.' + extGroup + '.' + extTable + ':-1]GENDER',
                value: $('#gender').val()
            });
            stagingData.push({
                name: 'CF-[:0.' + extGroup + '.' + extTable + ':-1]EMAIL_ADDRESS',
                value: $('#email-address').val()
            });
            stagingData.push({
                name: 'CF-[:0.' + extGroup + '.' + extTable + ':-1]LAST_ATTENDED_GRADE',
                value: $('#last-attended-grade').val()
            });
            stagingData.push({
                name: 'CF-[:0.' + extGroup + '.' + extTable + ':-1]CURRENT_GRADE',
                value: $('#current-grade').val()
            });
            stagingData.push({
                name: 'CF-[:0.' + extGroup + '.' + extTable + ':-1]BIRTHDATE',
                value: $('#birthdate').val()
            });
            stagingData.push({
                name: 'CF-[:0.' + extGroup + '.' + extTable + ':-1]HOME_PHONE_NUMBER',
                value: $('#home-phone-number').val()
            });
            stagingData.push({
                name: 'CF-[:0.' + extGroup + '.' + extTable + ':-1]STUDENT_CELL_NUMBER',
                value: $('#student-cell-number').val()
            });
            stagingData.push({
                name: 'CF-[:0.' + extGroup + '.' + extTable + ':-1]MAILING_ADDRESS',
                value: $('#mailing-address').val()
            });
            stagingData.push({
                name: 'CF-[:0.' + extGroup + '.' + extTable + ':-1]MAILING_CITY',
                value: $('#mailing-city').val()
            });
            stagingData.push({
                name: 'CF-[:0.' + extGroup + '.' + extTable + ':-1]MAILING_STATE',
                value: $('#mailing-state').val()
            });
            stagingData.push({
                name: 'CF-[:0.' + extGroup + '.' + extTable + ':-1]MAILING_ZIP',
                value: $('#mailing-zip').val()
            });
            stagingData.push({
                name: 'CF-[:0.' + extGroup + '.' + extTable + ':-1]RESIDENCE_ADDRESS',
                value: $('#residence-address').val()
            });
            stagingData.push({
                name: 'CF-[:0.' + extGroup + '.' + extTable + ':-1]RESIDENCE_CITY',
                value: $('#residence-city').val()
            });
            stagingData.push({
                name: 'CF-[:0.' + extGroup + '.' + extTable + ':-1]RESIDENCE_STATE',
                value: $('#residence-state').val()
            });
            stagingData.push({
                name: 'CF-[:0.' + extGroup + '.' + extTable + ':-1]RESIDENCE_ZIP',
                value: $('#residence-zip').val()
            });
            stagingData.push({
                name: 'CF-[:0.' + extGroup + '.' + extTable + ':-1]SCHOOL_CITY',
                value: $('#school-city').val()
            });
            stagingData.push({
                name: 'CF-[:0.' + extGroup + '.' + extTable + ':-1]SCHOOL_STATE',
                value: $('#school-state').val()
            });
            stagingData.push({
                name: 'CF-[:0.' + extGroup + '.' + extTable + ':-1]SCHOOL_PHONE',
                value: $('#school-phone').val()
            });

            if ($('#prev-icsd-yes').is(':checked')) {
                stagingData.push({
                    name: 'CF-[:0.' + extGroup + '.' + extTable + ':-1]PREV_ICSD',
                    value: 1
                });
            }

            if ($('#prev-utah-yes').is(':checked')) {
                stagingData.push({
                    name: 'CF-[:0.' + extGroup + '.' + extTable + ':-1]PREV_UTAH',
                    value: 1
                });
            }

            if ($('#outside-us-yes').is(':checked')) {
                stagingData.push({
                    name: 'CF-[:0.' + extGroup + '.' + extTable + ':-1]OUTSIDE_US',
                    value: 1
                });
                stagingData.push({
                    name: 'CF-[:0.' + extGroup + '.' + extTable + ':-1]COUNT_TERR_BIRTH',
                    value: $('#count-terr-birth').val()
                });
                stagingData.push({
                    name: 'CF-[:0.' + extGroup + '.' + extTable + ':-1]DATE_FIRST_ENROLLED',
                    value: $('#date-first-enrolled').val()
                });


                if ($('#three-ac-yrs-yes').is(':checked')) {
                    stagingData.push({
                        name: 'CF-[:0.' + extGroup + '.' + extTable + ':-1]THREE_AC_YRS',
                        value: 1
                    });

                    stagingData.push({
                        name: 'CF-[:0.' + extGroup + '.' + extTable + ':-1]COMPLETED_GRADES',
                        value: $('#completed-grades').val().join(',')
                    });
                }
            }

            stagingData.push({
                name: 'CF-[:0.' + extGroup + '.' + extTable + ':-1]PRIM_LANG',
                value: $('#prim-lang').val()
            });

            stagingData.push({
                name: 'CF-[:0.' + extGroup + '.' + extTable + ':-1]CUR_LANG',
                value: $('#cur-lang').val()
            });

            stagingData.push({
                name: 'CF-[:0.' + extGroup + '.' + extTable + ':-1]HOME_LANG',
                value: $('#home-lang').val()
            });

            stagingData.push({
                name: 'CF-[:0.' + extGroup + '.' + extTable + ':-1]CORRES_LANG',
                value: $('#corres-lang').val()
            });


            if ($('#bilingual-yes').is(':checked')) {
                stagingData.push({
                    name: 'CF-[:0.' + extGroup + '.' + extTable + ':-1]BILINGUAL',
                    value: 1
                });
            }

            if ($('#utah-resident-yes').is(':checked')) {
                stagingData.push({
                    name: 'CF-[:0.' + extGroup + '.' + extTable + ':-1]UTAH_RESIDENT',
                    value: 1
                });
            }

            if ($('#district-resident-yes').is(':checked')) {
                stagingData.push({
                    name: 'CF-[:0.' + extGroup + '.' + extTable + ':-1]DISTRICT_RESIDENT',
                    value: 1
                });
            }

            if ($('#immunizations-complete-yes').is(':checked')) {
                stagingData.push({
                    name: 'CF-[:0.' + extGroup + '.' + extTable + ':-1]IMMUNIZATIONS_COMPLETE',
                    value: 1
                });
            }

            if ($('#part-time-yes').is(':checked')) {
                stagingData.push({
                    name: 'CF-[:0.' + extGroup + '.' + extTable + ':-1]PART_TIME',
                    value: 1
                });

                var selectedPartTimeDetail = _.filter($('[name="part-time-detail"]'), function(elem) {
                    if ($(elem).is(':checked')) {
                        return elem;
                    }
                });

                var partTimeDetailVal;
                if (selectedPartTimeDetail.length > 1) {
                    partTimeDetailVal = _.map($(selectedPartTimeDetail), function (elem) {
                        return $(elem).val()
                    });
                    partTimeDetailVal = partTimeDetailVal.join(',');
                } else if (selectedPartTimeDetail.length === 1) {
                    partTimeDetailVal = $(selectedPartTimeDetail).val();
                }

                if (partTimeDetailVal) {
                    stagingData.push({
                        name: 'CF-[:0.' + extGroup + '.' + extTable + ':-1]PART_TIME_DETAIL',
                        value: partTimeDetailVal
                    });
                }

            }

            if ($('#refugee-student-yes').is(':checked')) {
                stagingData.push({
                    name: 'CF-[:0.' + extGroup + '.' + extTable + ':-1]REFUGEE',
                    value: $('#last-name').val()
                });
            }

            if ($('#hisp-latino-yes').is(':checked')) {
                stagingData.push({
                    name: 'CF-[:0.' + extGroup + '.' + extTable + ':-1]HISP_LATINO',
                    value: 1
                });
            }


            stagingData.push({
                name: 'CF-[:0.' + extGroup + '.' + extTable + ':-1]RACE',
                value: $('#last-name').val()
            });

            if ($('#special-ed-services-yes').is(':checked')) {
                stagingData.push({
                    name: 'CF-[:0.' + extGroup + '.' + extTable + ':-1]SPECIAL_ED_SERVICES',
                    value: 1
                });
            }

            if ($('#speech-lang-services-yes').is(':checked')) {
                stagingData.push({
                    name: 'CF-[:0.' + extGroup + '.' + extTable + ':-1]SPEECH_LANG_SERVICES',
                    value: 1
                });
            }

            if ($('#services-504-yes').is(':checked')) {
                stagingData.push({
                    name: 'CF-[:0.' + extGroup + '.' + extTable + ':-1]SERVICES_504',
                    value: 1
                });
            }

            if ($('#foster-ward-student-yes').is(':checked')) {
                stagingData.push({
                    name: 'CF-[:0.' + extGroup + '.' + extTable + ':-1]FOSTER_WARD_STUDENT',
                    value: 1
                });
            }

            if ($('#juvenile-probation-yes').is(':checked')) {
                stagingData.push({
                    name: 'CF-[:0.' + extGroup + '.' + extTable + ':-1]JUVENILE_PROBATION',
                    value: 1
                });
            }

            stagingData.push({
                name: 'CF-[:0.' + extGroup + '.' + extTable + ':-1]OTHER_INFO',
                value: $('#other-info').val()
            });

            if ($('#safe-school-violation-yes').is(':checked')) {
                stagingData.push({
                    name: 'CF-[:0.' + extGroup + '.' + extTable + ':-1]SAFE_SCHOOL_VIOLATION',
                    value: 1
                });

                stagingData.push({
                    name: 'CF-[:0.' + extGroup + '.' + extTable + ':-1]SAFE_SCHOOL_VIOLATION_EXPL',
                    value: $('#safe-school-violation-expl').val()
                });
            }


            if ($('#med-diabetes-yes').is(':checked')) {
                stagingData.push({
                    name: 'CF-[:0.' + extGroup + '.' + extTable + ':-1]MED_DIABETES',
                    value: 1
                });
            }

            if ($('#med-heart-yes').is(':checked')) {
                stagingData.push({
                    name: 'CF-[:0.' + extGroup + '.' + extTable + ':-1]MED_HEART',
                    value: 1
                });
            }

            if ($('#med-seizures-yes').is(':checked')) {
                stagingData.push({
                    name: 'CF-[:0.' + extGroup + '.' + extTable + ':-1]MED_SEIZURES',
                    value: 1
                });
            }

            if ($('#med-add-adhd-yes').is(':checked')) {
                stagingData.push({
                    name: 'CF-[:0.' + extGroup + '.' + extTable + ':-1]MED_ADD_ADHD',
                    value: 1
                });
            }

            if ($('#med-hearing-yes').is(':checked')) {
                stagingData.push({
                    name: 'CF-[:0.' + extGroup + '.' + extTable + ':-1]MED_HEARING',
                    value: 1
                });
            }

            if ($('#med-vision-yes').is(':checked')) {
                stagingData.push({
                    name: 'CF-[:0.' + extGroup + '.' + extTable + ':-1]MED_VISION',
                    value: 1
                });
            }

            if ($('#med-glasses-yes').is(':checked')) {
                stagingData.push({
                    name: 'CF-[:0.' + extGroup + '.' + extTable + ':-1]MED_GLASSES',
                    value: 1
                });
            }

            if ($('#med-asthma-yes').is(':checked')) {
                stagingData.push({
                    name: 'CF-[:0.' + extGroup + '.' + extTable + ':-1]MED_ASTHMA',
                    value: 1
                });
            }

            if ($('#med-allergies-yes').is(':checked')) {
                stagingData.push({
                    name: 'CF-[:0.' + extGroup + '.' + extTable + ':-1]MED_ALLERGIES',
                    value: 1
                });
            }

            if ($('#med-require-meds-yes').is(':checked')) {
                stagingData.push({
                    name: 'CF-[:0.' + extGroup + '.' + extTable + ':-1]MED_REQUIRE_MEDS',
                    value: 1
                });

                stagingData.push({
                    name: 'CF-[:0.' + extGroup + '.' + extTable + ':-1]MEDICATIONS',
                    value: $('#medications').val()
                });

            }

            if ($('#med-other-yes').is(':checked')) {
                stagingData.push({
                    name: 'CF-[:0.' + extGroup + '.' + extTable + ':-1]MED_OTHER',
                    value: 1
                });

                stagingData.push({
                    name: 'CF-[:0.' + extGroup + '.' + extTable + ':-1]ADD_MED_SERVICES',
                    value: $('#add-med-services').val()
                });
            }

            stagingData.push({
                name: 'CF-[:0.' + extGroup + '.' + extTable + ':-1]PHYSICIANS_NAME',
                value: $('#last-name').val()
            });
            stagingData.push({
                name: 'CF-[:0.' + extGroup + '.' + extTable + ':-1]PHYSICIANS_PHONE',
                value: $('#last-name').val()
            });
            stagingData.push({
                name: 'CF-[:0.' + extGroup + '.' + extTable + ':-1]DENTISTS_NAME',
                value: $('#last-name').val()
            });
            stagingData.push({
                name: 'CF-[:0.' + extGroup + '.' + extTable + ':-1]DENTISTS_PHONE',
                value: $('#last-name').val()
            });

            if ($('#medical-info-yes').is(':checked')) {
                stagingData.push({
                    name: 'CF-[:0.' + extGroup + '.' + extTable + ':-1]MEDICAL_INFO',
                    value: 1
                });
            }

            if ($('#field-trips-yes').is(':checked')) {
                stagingData.push({
                    name: 'CF-[:0.' + extGroup + '.' + extTable + ':-1]FIELD_TRIPS',
                    value: 1
                });
            }

            if ($('#student-directory-yes').is(':checked')) {
                stagingData.push({
                    name: 'CF-[:0.' + extGroup + '.' + extTable + ':-1]STUDENT_DIRECTORY',
                    value: 1
                });
            }

            if ($('#media-full-name-yes').is(':checked')) {
                stagingData.push({
                    name: 'CF-[:0.' + extGroup + '.' + extTable + ':-1]MEDIA_FULL_NAME',
                    value: 1
                });
            }

            if ($('#policy-aup-yes').is(':checked')) {
                stagingData.push({
                    name: 'CF-[:0.' + extGroup + '.' + extTable + ':-1]POLICY_AUP',
                    value: 1
                });
            }

            if ($('#policy-safe-schools-yes').is(':checked')) {
                stagingData.push({
                    name: 'CF-[:0.' + extGroup + '.' + extTable + ':-1]POLICY_SAFE_SCHOOLS',
                    value: 1
                });
            }

            stagingData.push({
                name: 'ac',
                value: 'prim'
            });

            return stagingData;
        },

        main: function () {
            this.bindFormSubmit();
        }
    };
});