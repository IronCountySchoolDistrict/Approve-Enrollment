/**
 * Generate the approve form fields from the approve-fields.json field definition file.
 */

define(['Handlebars', 'reg/handlebars-helpers'], function(Handlebars, handlebarsHelpers) {
	'use strict';
	return {
		populateForm: function() {
			handlebarsHelpers.bindHelpers();
			$j.getJSON('/scripts/registration/json/approve-fields.json', function(fields) {
				$j.each(fields, function(index, field) {
					var templateId = field.template;
					var templateStr = $j(templateId).html();
					var template = Handlebars.compile(templateStr);
					var compiledTemplate = template(field);
					debugger;
				});
			});
		}
	};
});
