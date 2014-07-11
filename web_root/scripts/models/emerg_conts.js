/*global define, $*/

define(function() {

    return {
        /**
         *
         * @param formData {Object} Object that maps field name -> field value.
         */
        save: function (formData) {
            var encodedPostData = $.param(formData);
            $.get('/admin/tlist/ps-registration/emerg_conts.html', function() {
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