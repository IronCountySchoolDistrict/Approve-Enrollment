require(['underscore'], function(_) {
    var template = $j('#reg-pending-template').html();
    $j.getJSON('/admin/tlist/reg-admin/pending_count.html', function(resp) {
        var count = resp.count;
        var renderedTemplate = _.template(template, {"pending_count": count});
        var insertSelector = $j('#whats-new');
        $j(renderedTemplate).insertBefore(insertSelector);
    });
});