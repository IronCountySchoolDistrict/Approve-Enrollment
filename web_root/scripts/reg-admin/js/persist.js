/*global define*/

define(function () {
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
         * Make the request to the ps-reg-php server that handles the enroll student REST call
         */
        postApiFields: function() {
            var apiFields = {
                first_name: $j('#first-name').val(),
                middle_name: $j('#middle-name').val(),
                last_name: $j('#last-name').val(),
                ssn: $j('#ssn').val(),
                email: $j('#email-address').val(),
                gender: $j('#gender').val(),
                grade_level: $j('#current-grade').val(),
                number: $j('#home-phone-number').val(),
                mailing_street: $j('#mailing-address').val(),
                mailing_city: $j('#mailing-city').val(),
                mailing_state: $j('#mailing-state').val(),
                mailing_zip: $j('#mailing-zip').val(),
                residence_street: $j('#residence-address').val(),
                residence_city: $j('#residence-city').val(),
                residence_state: $j('#residence-state').val(),
                residence_zip: $j('#residence-zip').val(),
                scheduling_reporting_ethnicity: $j('#race').val()
            };

            if ($j('#hisp-latino-yes').is(':checked')) {
                apiFields['federal_ethnicity'] = 'YES'
            } else {
                apiFields['federal_ethnicity'] = 'NO'
            }


            $j.ajax({
                url: 'http://205.125.100.99/enroll',
                type: 'POST',
                crossDomain: true,
                dataType: 'json',
                data: apiFields
            }).done(function(resp) {
                console.dir(resp);
            });
        }
    };
});