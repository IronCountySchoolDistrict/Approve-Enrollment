/*global define*/

define(function () {
    return {
        main: function() {
            this.bindPostApi();
        },

        bindPostApi: function() {
            var _this = this;
            $j('#enroll-form').on('submit', function(e) {
                _this.postApiFields();
            });
        },

        /**
         * Make the request to the ps-reg-php server that handles the enroll student REST call
         */
        postApiFields: function() {
            var apiFields = {
                first_name: $j('#first-name').val(),
                last_name: $j('#last-name').val()
            };

            $j.ajax({
                url: '205.125.100.99/enroll',
                type: 'POST',
                dataType: 'json',
                data: apiFields,
                sucesss: function(resp) {
                    console.dir(resp);
                }
            });
        }
    };
});