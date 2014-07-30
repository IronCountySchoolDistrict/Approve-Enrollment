/*global j, define*/

define(['b64'], function(b64) {
    return {
        main: function () {

        },

        generateAuthRequestToken: function () {
            var clientId = 'b403a36f-9add-4c34-bcce-cc6ac519b98d';
            var clientSecret = 'cc1515fa-c1a8-4e69-a2ce-4705aa872221';
            var encodedString = b64.encode(clientId + ':' + clientSecret);

            $j.ajax({
                url: 'pstest.irondistrict.org:7443/oauth/access_token',
                dataType: 'json',
                data: {
                    'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
                    'Authorization': 'Basic ' + encodedString
                }
            });

        }
    };
});