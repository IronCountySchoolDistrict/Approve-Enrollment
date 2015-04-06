/*global define*/

define(['jquery', 'underscore', 'reg/data'], function ($, _, data) {
    return {
        main: function () {
            //this.bindPostApi();
            this.bindSubmitAction();
        },

        gotoChangesRecorded: function () {
            window.location.href = '/admin/changesrecorded.white.html'
        },

        updateStateFields: function () {
            var studentFieldsData = {};
            studentFieldsData['UF-'] = $('').val();
            studentFieldsData['UF-'] = $('').val();
            studentFieldsData['UF-'] = $('').val();
            studentFieldsData['UF-'] = $('').val();

            studentFieldsData = $.param(studentFieldsData);

            return $.ajax({
                type: 'POST',
                url: '/admin/changesrecorded.white.html',
                data: studentFieldsData
            });
        },

        updateMedicalAlert: function() {
            // Concatenate allergies, interventions and medications strings.
            var medicalAlertString = '';

            // Allergies
            if ($('#').val() !== '') {
                medicalAlertString += 'ALERGIES: ' + $('#').val();
            }

            //Interventions
            if ($('#val').val() !== '') {
                // If medicalAlertString is not empty at this point,
                // add a line break tag to separate this text from the previous text
                if (medicalAlertString !== '') {
                    medicalAlertString += '<br>';
                }

                //
                if ($('#').val() !== '') {
                    medicalAlertString += 'INTERVENTIONS: ' + $('#').val();
                }
            }

            //Medications
            if ($('#val').val() !== '') {
                // If medicalAlertString is not empty at this point,
                // add a line break tag to separate this text from the previous text
                if (medicalAlertString !== '') {
                    medicalAlertString += '<br>';
                }

                //
                if ($('#').val() !== '') {
                    medicalAlertString += 'MEDICATIONS: ' + $('#').val();
                }
            }

            var medicalAlertData = $.param({'Alert_Medical': medicalAlertString});

            return $.ajax({
                type: 'POST',
                url: '/admin/changesrecorded.white.html',
                data: medicalAlertData
            });
        },

        updateApiFields: function (studentIds) {

            var studentEntity = this._formToStudentEntity(studentIds);
            console.dir(studentEntity);
            return $.ajax({
                type: 'POST',
                contentType: 'application/json',
                url: 'https://pats.irondistrict.org/api/student',
                data: JSON.stringify(studentEntity),
                dataType: 'json'
            });
        },

        getStudentIds: function() {
            return $j.getJSON("/admin/students/approve-enrollment/json/enrollment.json.html?action=get.studentids");
        },

        updateEnrollRespId: function (studentIds) {
            var keyName = 'EF-' + studentIds.frn + '-U_KIND_REG.FB_ENROLL_RESP_ID';
            var data = {};
            data.ac = 'prim';
            data[keyName] = window.fbResponseId;

            keyName = 'UF-00103172560';
            data[keyName] = $('#ssn').val();

            return $.ajax({
                type: 'POST',
                url: '/admin/changesrecorded.white.html',
                data: data
            });
        },

        bindSubmitAction: function () {
            var self = this;

            $('#submit').one('click', function (e) {
                e.preventDefault();
                var ajaxPromises = [];
                self.getStudentIds().then(function(studentIds) {
                    ajaxPromises.push(self.updateApiFields(studentIds));
                    //ajaxPromises.push(self.updateStateFields());
                    //ajaxPromises.push(self.updateMedicalAlert());
                    ajaxPromises.push(self.updateEnrollRespId(studentIds));

                    //$.when.apply($, ajaxPromises).done(function(updateApiResp, updateStateResp, updateMedicalResp, updateEnrollRespId) {
                    $.when.apply($, ajaxPromises).done(function(updateApiResp, updateEnrollRespId) {
                        self.gotoChangesRecorded();
                    });
                });
            });
        },

        /**
         * Take the data from the #enroll-form and create a Student Entity object
         * @return {object} student entity (See: REST API -> Data Dictionary -> Student)
         * return object format:
         * {
                "students": {
                    "student": [
                        // student obj
                        {...}
                     ]
                }
            }
         */
        _formToStudentEntity: function (studentIds) {
            var apiPayload = {};
            var studentsArray = [];

            var studentEntityObject = {};
            studentEntityObject.action = 'UPDATE';
            studentEntityObject.client_uid = '1';
            studentEntityObject.id = studentIds.dcid;

            studentEntityObject.addresses = {};
            if ($('#mailing-address').val() &&
                $('#mailing-city').val() &&
                $('#mailing-state').val() &&
                $('#mailing-zip').val()) {

                studentEntityObject.addresses.mailing = {};
                studentEntityObject.addresses.mailing.street = $('#mailing-address').val();
                studentEntityObject.addresses.mailing.city = $('#mailing-city').val();
                studentEntityObject.addresses.mailing.state_province = $('#mailing-state').val();
                studentEntityObject.addresses.mailing.postal_code = $('#mailing-zip').val();
            }

            if ($('#residence-address').val() &&
                $('#residence-city').val() &&
                $('#residence-state').val() &&
                $('#residence-zip').val()) {

                studentEntityObject.addresses.physical = {};
                studentEntityObject.addresses.physical.street = $('#residence-address').val();
                studentEntityObject.addresses.physical.city = $('#residence-city').val();
                studentEntityObject.addresses.physical.state_province = $('#residence-state').val();
                studentEntityObject.addresses.physical.postal_code = $('#residence-zip').val();
            }

            studentEntityObject.ethnicity_race = {};
            studentEntityObject.ethnicity_race.federal_ethnicity = $('[name=hisp-latino]:checked').val();

            // Create an array of objects that matches the format:
            // {district_race_code": "{race_code}"
            var races = $('[name=race]:checked').serializeArray();
            studentEntityObject.ethnicity_race.races = _.map(races, function (elem) {
                return {"district_race_code": elem.value}
            });

            studentEntityObject.contact = {};
            studentEntityObject.contact.doctor_name = $('#dentists-name').val();


            studentsArray.push(studentEntityObject);

            // Create the top-level object (apiPayload)
            apiPayload.students = {};
            apiPayload.students.student = studentsArray;

            return apiPayload;
        }
    };
});