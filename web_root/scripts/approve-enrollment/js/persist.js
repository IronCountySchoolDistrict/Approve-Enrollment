/*global define*/

define(['jquery', 'underscore'], function ($, _) {
    return {
        main: function () {
            //this.bindPostApi();
            this.bindStudentApiUpdate();
        },

        bindPostApi: function () {
            var self = this;
            $('#submit').one('click', function (e) {
                self.postApiFields();
            });
        },

        bindStudentApiUpdate: function () {
            var self = this;

            $('#submit').one('click', function (e) {
                e.preventDefault();
                var studentEntity = self._formToStudentEntity();
                console.dir(studentEntity);
            });
        },

        /**
         * Take the data from the #enroll-form and create a Student Entity object
         * @return {object} student entity (See: REST API -> Data Dictionary -> Student)
         * return object format:
         * {
                "students": {
                    "student": [
                        // student obj
                        {...}
                     ]
                }
            }
         */
        _formToStudentEntity: function () {
            var apiPayload = {};
            var studentsArray = [];

            var studentEntityObject = {};
            studentEntityObject.action = 'UPDATE';
            studentEntityObject.client_uid = '1';

            // Personal Info
            studentEntityObject.demographics = {};
            studentEntityObject.demographics.ssn = $('#ssn').val();


            studentEntityObject.addresses = {};
            if ($('#mailing-address').val() &&
                $('#mailing-city').val() &&
                $('#mailing-state').val() &&
                $('#mailing-zip').val()) {

                studentEntityObject.addresses.mailing = {};
                studentEntityObject.addresses.mailing.street = $('#mailing-address').val();
                studentEntityObject.addresses.mailing.city = $('#mailing-city').val();
                studentEntityObject.addresses.mailing.state_province = $('#mailing-state').val();
                studentEntityObject.addresses.mailing.postal_code = $('#mailing-zip').val();
            }

            if ($('#residence-address').val() &&
                $('#residence-city').val() &&
                $('#residence-state').val() &&
                $('#residence-zip').val()) {

                studentEntityObject.addresses.physical = {};
                studentEntityObject.addresses.physical.street = $('#residence-address').val();
                studentEntityObject.addresses.physical.city = $('#residence-city').val();
                studentEntityObject.addresses.physical.state_province = $('#residence-state').val();
                studentEntityObject.addresses.physical.postal_code = $('#residence-zip').val();
            }

            studentEntityObject.ethnicity_race = {};
            studentEntityObject.ethnicity_race.federal_ethnicity = $('[name=hisp-latino]:checked').val();

            // Create an array of objects that matches the format:
            // {district_race_code": "{race_code}"
            var races = $('[name=race]:checked').serializeArray();
            studentEntityObject.ethnicity_race.races = _.map(races, function (elem) {
                return {"district_race_code": elem.value}
            });

            studentEntityObject.contact = {};
            studentEntityObject.contact.doctor_name = $('#dentists-name').val();


            studentsArray.push(studentEntityObject);

            // Create the top-level object (apiPayload)
            apiPayload.students = {};
            apiPayload.students.student = studentsArray;

            return apiPayload;

        },

        /**
         * Make the request that handles the enroll student REST call
         */
        postApiFields: function () {

        }
    };
});