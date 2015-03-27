define(['Handlebars'], function (Handlebars) {
    return {
        bindHelpers: function () {
            Handlebars.registerHelper('ifCond', function (v1, v2, options) {
                if (v1 === v2) {
                    return options.fn(this);
                }
                return options.inverse(this);
            });

            Handlebars.registerHelper('ifContains', function (v1, v2, options) {
                if (v1.indexOf(v2) > -1) {
                    return options.fn(this);
                }
                return options.inverse(this);
            });
        }
    };
});