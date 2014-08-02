/*global $j,define*/

define(['underscore'], function (_) {
    'use strict';
    return {
        main: function () {
            this.populateHandler();
        },

        parseQueryString: function () {
            var urlParams;
            var match,
                pl = /\+/g,  // Regex for replacing addition symbol with a space
                search = /([^&=]+)=?([^&]*)/g,
                decode = function (s) {
                    return decodeURIComponent(s.replace(pl, " "));
                },
                query = window.location.search.substring(1);

            urlParams = {};
            while (match = search.exec(query))
                urlParams[decode(match[1])] = decode(match[2]);
            return urlParams;
        },

        populateHandler: function () {
            var queryStringParams = this.parseQueryString();
            var stagingId = queryStringParams.id;
            this.getStagingData(stagingId);

            this.getSiblingData(stagingId);

            this.getEmergContsData(stagingId);
        },

        getSiblingData: function (stagingId) {
            var _this = this;
            $j.ajax({
                url: '/admin/tlist/reg-admin/siblings.html?staging_id=' + stagingId,
                dataType: 'json',
                success: function (resp) {
                    //_this.populateSiblings(resp);

                    // Mockup testing code
                    var testSiblingData = [
                        {
                            name: 'name1',
                            gender: 'M',
                            birthdate: '09-30-1990',
                            grade: 12
                        },
                        {
                            name: 'name2',
                            gender: 'F',
                            birthdate: '08-30-1994',
                            grade: 10
                        }
                    ];
                    _this.populateSiblings(testSiblingData);
                }
            });
        },

        getEmergContsData: function (stagingId) {
            var _this = this;
            $j.ajax({
                url: '/admin/tlist/reg-admin/emerg_conts.html?staging_id=' + stagingId,
                dataType: 'json',
                success: function (resp) {
                    //_this.populateSiblings(resp);

                    // Mockup testing code
                    var testEmergContsData = [
                        {
                            "addressCity": "City",
                            "addressState": "State",
                            "addressStreet": "1234 Fake Street",
                            "addressZip": "12345",
                            "cellPhone": "1234567890",
                            "email": "blah@blah.com",
                            "employer": "Employer",
                            "homePhone": "123456789",
                            "isLegGuar": "Yes",
                            "firstName": "John",
                            "lastName": "Doe",
                            "priority": "1",
                            "relationship": "Father"
                        },
                        {
                            "addressCity": "City",
                            "addressState": "State",
                            "addressStreet": "1234 Fake Street",
                            "addressZip": "12345",
                            "cellPhone": "1234567890",
                            "email": "blah@blah.com",
                            "employer": "Employer",
                            "homePhone": "123456789",
                            "isLegGuar": "Yes",
                            "firstName": "John",
                            "lastName": "Doe",
                            "priority": "1",
                            "relationship": "Father"
                        },
                        {
                            "addressCity": "City",
                            "addressState": "State",
                            "addressStreet": "1234 Fake Street",
                            "addressZip": "12345",
                            "cellPhone": "1234567890",
                            "email": "blah@blah.com",
                            "employer": "Employer",
                            "homePhone": "123456789",
                            "isLegGuar": "Yes",
                            "firstName": "John",
                            "lastName": "Doe",
                            "priority": "1",
                            "relationship": "Father"
                        }
                    ];
                    _this.populateEmergConts(testEmergContsData);
                },
                error: function(resp) {
                    // Mockup testing code
                    var testEmergContsData = [
                        {
                            "addressCity": "City",
                            "addressState": "UT",
                            "addressStreet": "1234 Fake Street",
                            "addressZip": "12345",
                            "cellPhone": "1234567890",
                            "email": "blah@blah.com",
                            "employer": "Employer",
                            "homePhone": "123456789",
                            "isLegGuar": "Yes",
                            "firstName": "John",
                            "lastName": "Doe",
                            "priority": "1",
                            "relationship": "Father",
                            "workPhone": "123456789"
                        },
                        {
                            "addressCity": "City",
                            "addressState": "UT",
                            "addressStreet": "1234 Fake Street",
                            "addressZip": "12345",
                            "cellPhone": "1234567890",
                            "email": "blah@blah.com",
                            "employer": "Employer",
                            "homePhone": "123456789",
                            "isLegGuar": "Yes",
                            "firstName": "John",
                            "lastName": "Doe",
                            "priority": "1",
                            "relationship": "Father",
                            "workPhone": "123456789"
                        },
                        {
                            "addressCity": "City",
                            "addressState": "UT",
                            "addressStreet": "1234 Fake Street",
                            "addressZip": "12345",
                            "cellPhone": "1234567890",
                            "email": "blah@blah.com",
                            "employer": "Employer",
                            "homePhone": "123456789",
                            "isLegGuar": "Yes",
                            "firstName": "John",
                            "lastName": "Doe",
                            "priority": "1",
                            "relationship": "Father",
                            "workPhone": "123456789"
                        }
                    ];
                    _this.populateEmergConts(testEmergContsData);
                }
            });
        },

        getStagingData: function (id) {
            var _this = this;
            $j.ajax({
                url: '/admin/tlist/reg-admin/staging.html?id=' + id,
                dataType: 'json',
                success: function (resp) {
                    _this.populateStaging(resp);
                }
            });
        },

        /**
         * Populate siblings data into field values
         * @param siblingsData {Object[]}
         */
        populateSiblings: function (siblingsData) {
            var siblingRowTemplate = $j('#sibling-row-template').html();
            var appendSelector = $j('#siblings-table tbody');
            _.each(siblingsData, function (elem, index) {
                var context = {
                    index: index + 1,
                    name: elem.name,
                    gender: elem.gender,
                    birthdate: elem.birthdate,
                    grade: elem.grade
                };

                var renderedTemplate = _.template(siblingRowTemplate, context);
                $j(appendSelector).append(renderedTemplate);
            });
        },

        populateEmergConts: function (siblingsData) {
            var emergContsRowTemplate = $j('#emerg-conts-row-template').html();
            var appendSelector = $j('#contacts-table tbody');
            _.each(siblingsData, function (elem, index) {
                var oneBasedIndex = index + 1;
                var context = {
                    index: oneBasedIndex,
                    "addressCity": elem.addressCity,
                    "addressState": elem.addressState,
                    "addressStreet": elem.addressStreet,
                    "addressZip": elem.addressZip,
                    "cellPhone": elem.cellPhone,
                    "email": elem.email,
                    "employer": elem.employer,
                    "homePhone": elem.homePhone,
                    "isLegGuar": elem.isLegGuar,
                    "firstName": elem.firstName,
                    "lastName": elem.lastName,
                    "priority": elem.priority,
                    "relationship": elem.relationship,
                    "workPhone": elem.workPhone
                };

                var renderedTemplate = _.template(emergContsRowTemplate, {index: oneBasedIndex});
                $j(appendSelector).append(renderedTemplate);

                $j('#emerg-cont-first-name' + oneBasedIndex + '-field-value').html(elem.firstName);
                $j('#emerg-cont-last-name' + oneBasedIndex + '-field-value').html(elem.lastName);
                $j('#is-leg-guar' + oneBasedIndex + '-field-value').html(elem.isLegGuar ? "Yes" : "No");

                $j('#emerg-cont-email' + oneBasedIndex + '-field-value').html(elem.email);
                $j('#emerg-cont-address-street' + oneBasedIndex + '-field-value').html(elem.addressStreet);
                $j('#emerg-cont-address-city' + oneBasedIndex + '-field-value').html(elem.addressCity);

                // Find the state option that matches the value stored in the staging table
                //TODO: Move this over to enroll.js, when user clicks edit for this field-value.
                /*
                var stagingAddressState = _.filter($j('#emerg-cont-address-state' + oneBasedIndex).find('option'), function(stateOption) {
                    return elem.addressState === $j(stateOption).attr('value');
                });

                $j(stagingAddressState).attr('selected', 'selected');
                */

                $j('#emerg-cont-address-state' + oneBasedIndex + '-field-value').html(elem.addressState);
                $j('#emerg-cont-address-zip' + oneBasedIndex + '-field-value').html(elem.addressZip);

                $j('#emerg-cont-home-phone' + oneBasedIndex + '-field-value').html(elem.homePhone);
                $j('#emerg-cont-cell-phone' + oneBasedIndex + '-field-value').html(elem.cellPhone);
                $j('#emerg-cont-work-phone' + oneBasedIndex + '-field-value').html(elem.workPhone);
            });
        },

        /**
         * Populate staging data into page (excluding emergency contacts and siblings data)
         *
         * @param stagingData {Object} - Data that came from the staging table
         * that will be populated in this form (does not include emergency
         * contacts or siblings data)
         */
        populateStaging: function (stagingData) {
            $j('#first-name-field-value').html(stagingData.firstName);
            $j('#first-name').val(stagingData.firstName);

            $j('#middle-name-field-value').html(stagingData.middleName);
            $j('#middle-name').val(stagingData.middleName);

            $j('#last-name-field-value').html(stagingData.lastName);
            $j('#last-name').val(stagingData.lastName);

            $j('#nickname-field-value').html(stagingData.nickname);

            $j('#ssn-field-value').html(stagingData.ssn);
            $j('#ssn').val(stagingData.ssn);

            $j('#gender-field-value').html(stagingData.gender);
            $j('#gender').val(stagingData.gender);

            $j('#email-address-field-value').html(stagingData.emailAddress);
            $j('#email-address').val(stagingData.emailAddress);

            $j('#last-attended-grade-field-value').html(stagingData.lastAttendedGrade);

            $j('#current-grade-field-value').html(stagingData.currentGrade);
            _.each($j('#current-grade').find('option'), function(grade) {
                if ($j(grade).attr('value') === stagingData.currentGrade) {
                    $j(grade).attr('selected', true);
                }
            });
            $j('#current-grade-').val(stagingData.currentGrade);

            $j('#birthdate-field-value').html(stagingData.birthdate);
            $j('#birthdate').val(stagingData.birthdate);

            $j('#home-phone-number-field-value').html(stagingData.homePhoneNumber);
            $j('#home-phone-number').val(stagingData.homePhoneNumber);

            $j('#student-cell-number-field-value').html(stagingData.studentCellNumber);

            $j('#mailing-address-field-value').html(stagingData.mailingAddress + ' ' +
                stagingData.mailingCity + ' ' +
                stagingData.mailingState + ' ' +
                stagingData.mailingZip);

            $j('#mailing-address').val(stagingData.mailingAddress);
            $j('#mailing-city').val(stagingData.mailingCity);
            $j('#mailing-state').val(stagingData.mailingState);
            $j('#mailing-zip').val(stagingData.mailingZip);


            $j('#residence-address-field-value').html(stagingData.residenceAddress + ' ' +
                stagingData.residenceCity + ' ' +
                stagingData.residenceState + ' ' +
                stagingData.residenceZip);

            $j('#residence-address').val(stagingData.residenceAddress);
            $j('#residence-city').val(stagingData.residenceCity);
            $j('#residence-state').val(stagingData.residenceState);
            $j('#residence-zip').val(stagingData.residenceZip);

            $j('#school-city-field-value').html(stagingData.schoolCity);
            $j('#school-state-field-value').html(stagingData.schoolState);
            $j('#school-phone-field-value').html(stagingData.schoolPhone);
            $j('#school-fax-field-value').html(stagingData.schoolFax);
            $j('#prev-icsd-field-value').html(stagingData.prevIcsd ? "Yes" : "No");
            $j('#prev-utah-field-value').html(stagingData.prevUtah ? "Yes" : "No");
            $j('#outside-us-field-value').html(stagingData.outsideUs ? "Yes" : "No");
            $j('#count-terr-birth-field-value').html(stagingData.countTerrBirth);
            $j('#date-first-enrolled-field-value').html(stagingData.dateFirstEnrolled);
            $j('#three-ac-yrs-field-value').html(stagingData.threeAcYrs ? "Yes" : "No");
            $j('#completed-grades-field-value').html(stagingData.completedGrades);
            $j('#prim-lang-field-value').html(stagingData.primLang);
            $j('#home-lang-field-value').html(stagingData.homeLang);
            $j('#corres-lang-field-value').html(stagingData.corresLang);
            $j('#bilingual-field-value').html(stagingData.bilingual);

            $j('#utah-resident-field-value').html(stagingData.utahResident ? "Yes" : "No");
            $j('#district-resident-field-value').html(stagingData.districtResident ? "Yes" : "No");
            $j('#immunizations-complete-field-value').html(stagingData.immunizationsComplete ? "Yes" : "No");
            $j('#part-time-field-value').html(stagingData.partTime ? "Yes" : "No");
            $j('#refugee-student-field-value').html(stagingData.refugee ? "Yes" : "No");

            $j('#hisp-latino-field-value').html(stagingData.hispLatino ? "Yes" : "No");
            if (stagingData.hispLatino) {
                $j('#hisp-latino-yes').attr('checked', true);
            } else {
                $j('#hisp-latino-no').attr('checked', true);
            }
            $j('#race-field-value').html(stagingData.race);
            $j('#race').val(stagingData.race);

            $j('#special-ed-services-field-value').html(stagingData.specialEdServices ? "Yes" : "No");
            $j('#speech-lang-services-field-value').html(stagingData.speechLangServices ? "Yes" : "No");
            $j('#services-504-field-value').html(stagingData.services504 ? "Yes" : "No");
            $j('#foster-ward-student-field-value').html(stagingData.fosterWardStudent ? "Yes" : "No");
            $j('#other-info-field-value').html(stagingData.otherInfo);
            $j('#med-diabetes-field-value').html(stagingData.outsideUs);
            $j('#med-heart-field-value').html(stagingData.outsideUs);
            $j('#med-seizures-field-value').html(stagingData.outsideUs);
            $j('#med-add-adhd-field-value').html(stagingData.outsideUs);
            $j('#med-hearing-field-value').html(stagingData.outsideUs);
            $j('#med-vision-field-value').html(stagingData.outsideUs);
            $j('#med-glasses-field-value').html(stagingData.outsideUs);
            $j('#med-asthma-field-value').html(stagingData.outsideUs);
            $j('#med-allergies-field-value').html(stagingData.outsideUs);
            $j('#med-require-meds-field-value').html(stagingData.outsideUs);
            $j('#medications-field-value').html(stagingData.outsideUs);
            $j('#med-other-field-value').html(stagingData.outsideUs);
            $j('#add-med-services-field-value').html(stagingData.outsideUs);

            $j('#physicians-name-field-value').html(stagingData.hispLatino);
            $j('#physicians-phone-field-value').html(stagingData.hispLatino);
            $j('#dentists-name-field-value').html(stagingData.hispLatino);
            $j('#dentists-phone-field-value').html(stagingData.hispLatino);
            $j('#medical-release-field-value').html(stagingData.hispLatino);
            $j('#field-trips-field-value').html(stagingData.hispLatino);
            $j('#student-directory-field-value').html(stagingData.hispLatino);
            $j('#media-full-name-field-value').html(stagingData.hispLatino);
            $j('#policy-aup-field-value').html(stagingData.hispLatino);
            $j('#policy-safe-schools-field-value').html(stagingData.hispLatino);
        }
    }
});