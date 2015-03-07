/*global define*/

define(function() {
    return {
        main: function() {
            this.bindPostApi();
        },

        bindPostApi: function() {
            var _this = this;
            $j('#btnSubmit').on('click', function(e) {
                _this.postApiFields();
            });
        },

        /**
         * Take the data from the #enroll-form and create a Student Entity object
         * @return {object} student entity (See: REST API -> Data Dictionary -> Student)
         */
        _formToStudentEntity: function() {
            var studentEntity = {};
            studentEntity.client_uid = '1';
            studentEntity.action = 'INSERT';

            // Personal Info
            studentEntity.name = {};
            studentEntity.name.first_name = $('#first-name-field-value').val();
            studentEntity.name.middle_name = $('#middle-name-field-value').val();
            studentEntity.name.last_name = $('#last-name-field-value').val();

            studentEntity.demographics = {};
            studentEntity.demographics.ssn = $('#ssn-field-value').val();
            studentEntity.demographics.gender = $('#gender-field-value').val();

            studentEntity.contact_info = {};
            studentEntity.contact_info.email = $('#email-address-field-value').val();

            studentEntity.school_enrollment = {};
            studentEntity.grade_level = $('#current-grade-field-value').val();

            studentEntity.demographics.birth_date = $('#birthdate-field-value').val();

            studentEntity.phones = {};
            studentEntity.phones.main = {};
            studentEntity.phones.main.number = $('#home-phone-number-field-value').val();



            

            


            if ($('#student-is-homeless-no').is(':checked')) {
                studentEntity.addresses = {};
                if ($j('#mailing-address-field-value').val() &&
                    $j('#mailing-city-field-value').val() &&
                    $j('#mailing-state-field-value').val() &&
                    $j('#mailing-zip-field-value').val()) {

                    studentEntity.addresses.mailing = {};
                    studentEntity.address.mailing.street = $j('#mailing-address-field-value').val();
                    studentEntity.address.mailing.city = $j('#mailing-city-field-value').val();
                    studentEntity.address.mailing.state_province = $j('#mailing-state-field-value').val();
                    studentEntity.address.mailing.postal_code = $j('#mailing-zip-field-value').val();
                }

                if ($j('#residence-address-field-value').val() &&
                    $j('#residence-city-field-value').val() &&
                    $j('#residence-state-field-value').val() &&
                    $j('#residence-zip-field-value').val()) {

                    studentEntity.addresses.physical = {};
                    studentEntity.address.physical.street = $j('#mailing-address-field-value').val();
                    studentEntity.address.physical.city = $j('#mailing-city-field-value').val();
                    studentEntity.address.physical.state_province = $j('#mailing-state-field-value').val();
                    studentEntity.address.physical.postal_code = $j('#mailing-zip-field-value').val();
                }
            }

        },

        /**
         * Make the request that handles the enroll student REST call
         */
        postApiFields: function() {
            


        }
    };
});