/*global define*/

define(["jquery", "underscore"], function($, _) {
    return {
        main: function() {
            //this.bindPostApi();
            this.bindSubmitAction();
        },

        bindSubmitAction: function() {
            var self = this;

            $("#submit").one("click", function(e) {
                e.preventDefault();
                var ajaxPromises = [];
                self.getStudentIds().then(function(studentIds) {
                    self.enableEf(studentIds).then(function() {

                        //ajaxPromises.push(self.updateApiFields(studentIds));
                        //ajaxPromises.push(self.updateStateFields(studentIds));
                        ajaxPromises.push(self.updateMedicalAlert(studentIds));
                        //ajaxPromises.push(self.updateMiscFields(studentIds));

                        //$.when.apply($, ajaxPromises).done(function(updateApiResp, updateStateResp, updateMedicalResp, updateMiscFieldsResp) {
                        $.when.apply($, ajaxPromises).done(function(updateApiResp, updateStateFieldsResp, updateMiscFieldsResp) {
                            self.gotoChangesRecorded();
                        });
                    });
                });
            });
        },

        gotoChangesRecorded: function() {
            window.location.href = "/admin/changesrecorded.white.html";
        },

        updateStateFields: function(studentIds) {
            var studentFieldsData = {};
            var keyName;

            // If none of the fields below need to be saved, this var will remain false.
            var makeRequest = false;

            // Country or Territory of Student"s Birth
            if ($("[name=outside-us]:checked").val() === "Other") {
                makeRequest = true;
                keyName = "UF-001783" + studentIds.dcid;
                studentFieldsData[keyName] = "1";
            }

            // If born outside the U.S., when was the first date of enrollment in a U.S. school?
            var dateFirstEnrolled = $("#date-first-enrolled").val();
            if (dateFirstEnrolled !== "") {
                makeRequest = true;
                var dateObj = new Date(dateFirstEnrolled);

                keyName = "EF-" + studentIds.frn + "-StudentCoreFields.dateofentryintousa";
                studentFieldsData[keyName] = dateObj.toLocaleDateString();
            }

            if (makeRequest) {
                studentFieldsData.ac = "prim";

                return $.ajax({
                    type: "POST",
                    url: "/admin/changesrecorded.white.html",
                    data: studentFieldsData
                });    
            }
        },

        updateMedicalAlert: function(studentIds) {
            // Concatenate allergies, interventions and medications strings.
            var medicalAlertString = "";

            // Allergies
            if ($("#allergies-list").val() !== "") {
                medicalAlertString += "ALERGIES: " + $("#allergies-list").val();
            }

            //Interventions
            if ($("#interventions").val() !== "") {
                // If medicalAlertString is not empty at this point,
                // add a line break tag to separate this text from the previous text
                if (medicalAlertString !== "") {
                    medicalAlertString += "<br>";
                }

                //
                if ($("#interventions").val() !== "") {
                    medicalAlertString += "INTERVENTIONS: " + $("#interventions").val();
                }
            }

            //Medications
            if ($("#medications").val() !== "") {
                // If medicalAlertString is not empty at this point,
                // add a line break tag to separate this text from the previous text
                if (medicalAlertString !== "") {
                    medicalAlertString += "<br>";
                }

                //
                if ($("#medications").val() !== "") {
                    medicalAlertString += "MEDICATIONS: " + $("#medications").val();
                }
            }

            var keyName = "UF-001108" + studentIds.dcid;

            var data = {};
            data[keyName] = medicalAlertString;
            data.ac = "prim";

            return $.ajax({
                type: "POST",
                url: "/admin/changesrecorded.white.html",
                data: data
            });
        },

        updateApiFields: function(studentIds) {

            var studentEntity = this._formToStudentEntity(studentIds);

            return $.ajax({
                type: "POST",
                contentType: "application/json",
                url: "https://pats.irondistrict.org/api/student",
                data: JSON.stringify(studentEntity),
                dataType: "json"
            });
        },

        getStudentIds: function() {
            return $.getJSON("/admin/students/approve-enrollment/json/enrollment.json.html?action=get.studentids");
        },

        enableEf: function(studentIds) {
            var gpvParams = {
                frn: studentIds.frn
            };

            gpvParams = $.param(gpvParams);

            return $.get("/admin/students/approve-enrollment/enable-ef.html?" + gpvParams);
        },

        updateMiscFields: function(studentIds) {
            // Enroll resp id
            var data = {};

            var keyName = "EF-" + studentIds.frn + "-U_KIND_REG.FB_ENROLL_RESP_ID";
            data[keyName] = window.fbResponseId;

            // ssn
            keyName = "UF-001031" + studentIds.dcid;
            data[keyName] = $("#ssn").val();

            // doctor name
            keyName = "UF-001062" + studentIds.dcid;
            data[keyName] = $("#physicians-name").val();

            data.ac = "prim";

            return $.ajax({
                type: "POST",
                url: "/admin/changesrecorded.white.html",
                data: data
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
        _formToStudentEntity: function(studentIds) {
            var apiPayload = {};
            var studentsArray = [];

            var studentEntityObject = {};
            studentEntityObject.action = "UPDATE";
            studentEntityObject.client_uid = "1";
            studentEntityObject.id = studentIds.dcid;

            studentEntityObject.addresses = {};
            if ($("#mailing-address").val() &&
                $("#mailing-city").val() &&
                $("#mailing-state").val() &&
                $("#mailing-zip").val()) {

                studentEntityObject.addresses.mailing = {};
                studentEntityObject.addresses.mailing.street = $("#mailing-address").val();
                studentEntityObject.addresses.mailing.city = $("#mailing-city").val();
                studentEntityObject.addresses.mailing.state_province = $("#mailing-state").val();
                studentEntityObject.addresses.mailing.postal_code = $("#mailing-zip").val();
            }

            if ($("#residence-address").val() &&
                $("#residence-city").val() &&
                $("#residence-state").val() &&
                $("#residence-zip").val()) {

                studentEntityObject.addresses.physical = {};
                studentEntityObject.addresses.physical.street = $("#residence-address").val();
                studentEntityObject.addresses.physical.city = $("#residence-city").val();
                studentEntityObject.addresses.physical.state_province = $("#residence-state").val();
                studentEntityObject.addresses.physical.postal_code = $("#residence-zip").val();
            }

            studentEntityObject.ethnicity_race = {};
            studentEntityObject.ethnicity_race.federal_ethnicity = $("[name=hisp-latino]:checked").val();

            // Create an array of objects that matches the format:
            // {district_race_code": "{race_code}"
            var races = $("[name=race]:checked, [name=trib-affil]:checked").serializeArray();
            studentEntityObject.ethnicity_race.races = _.map(races, function(elem) {
                return {
                    "district_race_code": elem.value
                };
            });

            studentsArray.push(studentEntityObject);

            // Create the top-level object (apiPayload)
            apiPayload.students = {};
            apiPayload.students.student = studentsArray;

            return apiPayload;
        }
    };
});