/*define, $j*/

define(function () {
    'use strict';
    return {
        main: function () {
            this.populateStaging();
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
            $j('#middle-name-field-value').html(stagingData.middleName);
            $j('#last-name-field-value').html(stagingData.lastName);

            $j('#nickname-field-value').html(stagingData.nickname);
            $j('#ssn-field-value').html(stagingData.ssn);
            $j('#gender-field-value').html(stagingData.gender);
            $j('#email-address-field-value').html(stagingData.emailAddress);
            $j('#last-attended-grade-field-value').html(stagingData.lastAttendedGrade);
            $j('#current-grade-field-value').html(stagingData.currentGrade);
            $j('#birthdate-field-value').html(stagingData.birthdate);
            $j('#home-phone-number-field-value').html(stagingData.homePhoneNumber);
            $j('#student-cell-number-field-value').html(stagingData.studentCellNumber);

            $j('#mailing-address-field-value').html(stagingData.mailingAddress + ' ' +
                stagingData.mailingCity + ' ' +
                stagingData.mailingState + ' ' +
                stagingData.mailingZip);

            $j('#residence-address-field-value').html(stagingData.residenceAddress + ' ' +
                stagingData.residenceAddress + ' ' +
                stagingData.residenceAddress + ' ' +
                stagingData.residenceAddress);

            $j('#school-city-field-value').html(stagingData.schoolCity);
            $j('#school-state-field-value').html(stagingData.schoolState);
            $j('#school-phone-field-value').html(stagingData.schoolPhone);
            $j('#school-fax-field-value').html(stagingData.schoolFax);

            $j('#prev-icsd-field-value').html(stagingData.prevIcsd ? "Yes" : "No");
            $j('#prev-utah-field-value').html(stagingData.prevUtah ? "Yes" : "No");
            $j('#outside-us-field-value').html(stagingData.outsideUs);
            $j('#count-terr-birth-field-value').html(stagingData.countTerrBirth);
            $j('#date-first-enrolled-field-value').html(stagingData.dateFirstEnrolled);
            $j('#three-ac-yrs-field-value').html(stagingData.threeAcYrs);
            $j('#completed-grades-field-value').html(stagingData.completedGrades);
            $j('#prim-lang-field-value').html(stagingData.outsideUs);
            $j('#home-lang-field-value').html(stagingData.outsideUs);
            $j('#corres-lang-field-value').html(stagingData.outsideUs);
            $j('#bilingual-field-value').html(stagingData.outsideUs);
            $j('#utah-resident-field-value').html(stagingData.outsideUs);
            $j('#district-resident-field-value').html(stagingData.outsideUs);
            $j('#immunizations-complete-field-value').html(stagingData.outsideUs);
            $j('#part-time-field-value').html(stagingData.outsideUs);
            $j('#refugee-student-field-value').html(stagingData.outsideUs);
            $j('#hisp-latino-field-value').html(stagingData.outsideUs);
            $j('#race-birth-field-value').html(stagingData.outsideUs);
            $j('#special-ed-services-field-value').html(stagingData.outsideUs);
            $j('#speech-lang-services-field-value').html(stagingData.outsideUs);
            $j('#hisp-latino-field-value').html(stagingData.outsideUs);
            $j('#hisp-latino-field-value').html(stagingData.outsideUs);
            $j('#hisp-latino-field-value').html(stagingData.outsideUs);
            $j('#hisp-latino-field-value').html(stagingData.outsideUs);
            $j('#hisp-latino-field-value').html(stagingData.outsideUs);

        }
    }
});