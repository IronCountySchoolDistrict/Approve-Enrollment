/*global define, $*/

define(function() {

    return {
        /**
         *
         * @param formData {Object} Object that maps field name -> field value. Do not pass in CF- formatted field names,
         * this function will generate those automatically.
         */
        save: function (formData) {
            var encodedPostData = $.param(formData);
            $.get('/admin/emerg_conts.html', function() {
                $.ajax({
                    data: encodedPostData,
                    type: 'POST',
                    url: '/admin/changesrecorded.white.html',
                    success: function(resp) {
                        //console.log(resp);
                    }
                });
            });
        }
    };
});