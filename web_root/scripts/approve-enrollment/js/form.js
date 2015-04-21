define(["underscore", "Handlebars", "reg/handlebars-helpers", "reg/data"], function(_, Handlebars, handlebarsHelpers, data) {
    "use strict";
    return {
        populateForm: function() {
            loadingDialogInstance.open();
            handlebarsHelpers.bindHelpers();
            var self = this;


            data.getFormData().then(function(formData) {
                _.each(formData, function(field) {
                    var templateId = field.template;
                    var templateStr = $j('#' + templateId).html();
                    var template = Handlebars.compile(templateStr);
                    var compiledTemplate = template(field);
                    $j('#approve-table > tbody').append(compiledTemplate);
                });

                loadingDialogInstance.forceClose();
            });
        },
    };
});