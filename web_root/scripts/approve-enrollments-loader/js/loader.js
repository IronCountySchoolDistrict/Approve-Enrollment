$j(function() {
    var loadingTemplate = $j($j('#approve-enrollments-loading-template').html());
    var loadingSelector = $j('[href^="/admin/storedselections"]');
    loadingTemplate.insertAfter(loadingSelector);

    $j.getJSON('/admin/approve-enrollment-loader/loader.json.html?action=get.approve.count', function(loader) {
        var insertSelector = $j('[href^="/admin/storedselections"]');
        if (loader.count !== '0') {

            var enrollmentsCount = loader.count;

            var enrollmentsLink = $j($j('#approve-enrollments-template').html());
            enrollmentsLink.insertAfter(insertSelector);

            var enrollmentsLinkText = enrollmentsLink.text();
            enrollmentsLink.text(enrollmentsLinkText + ' (' + enrollmentsCount + ')');

            loadingTemplate.remove();

            $j('#approve-enrollments-link').on('click', function(event) {
                event.preventDefault();
                $j.getJSON('/admin/approve-enrollment-loader/loader.json.html?action=get.student.dcids', function(studentDcids) {
                    
                    // Set the current select to all students with enrollments that need to be approved

                    // The allStudentIds array must be surrounded by quotes
                    var postData = {
                        ids: JSON.stringify(studentDcids),
                        mode: 'set',
                        page: 1,
                        pageSize: 100
                    };
                    var jsonData = JSON.stringify(postData);
                    $j.ajax({
                        type: 'POST',
                        url: '/ws/selectionservice/currentselection/student',
                        data: jsonData,
                        dataType: 'json',
                        contentType: 'application/json; charset=utf-8'
                    }).done(function(studentSelResp) {
                        // Set the studentpage that will show up next
                        $j.get('/admin/students/approve.html?frn=001' + studentSelResp.students[0].dcid, function() {
                            window.location = '/admin/students/home.html';
                        });
                    });
                });
            });
        } else {
            loadingTemplate.remove();
            $j('<span>Approve Enrollments (0)</span>').insertAfter(insertSelector);
        }
    });
});