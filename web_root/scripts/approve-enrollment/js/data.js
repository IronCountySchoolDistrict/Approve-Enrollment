/*global define, $j, console*/
define(function() {
    "use strict";
    return {

        // Top-most function that returns form data to be
        getFormData: function() {

            var self = this;
            var requests = [];
            requests.push(this.getEnrollment());
            requests.push(self.getFieldMap());
            requests.push(self.getStudentIds());
            requests.push(self.insertTemplates());
            return $j.when.apply($j, requests).then(function(enrollment, fieldMap, studentIds) {
                studentIds = studentIds[0];
                return self.getCoreStudentData(studentIds).then(function(studentCoreData) {
                    var gpvObject = self.formToGpvObject(enrollment[0].form.elements, fieldMap[0]);

                    // Add coreStudentData fields to gpvObject
                    gpvObject.unshift({
                        name: "first-name",
                        value: studentCoreData.first_name
                    });
                    gpvObject.unshift({
                        name: "middle-name",
                        value: studentCoreData.middle_name
                    });
                    gpvObject.unshift({
                        name: "last-name",
                        value: studentCoreData.last_name
                    });
                    gpvObject.unshift({
                        name: "gender",
                        value: studentCoreData.gender
                    });
                    gpvObject.unshift({
                        name: "dob",
                        value: new Date(studentCoreData.dob).toLocaleDateString()
                    });
                    var gpvParam = $j.param(gpvObject);

                    return $j.getJSON("/admin/students/approve-enrollment/json/approve-fields.json?" + gpvParam, function(fields) {

                        var formData = [];
                        $j.each(fields, function(index, field) {

                            // Is the field an address field?
                            if (field.hasOwnProperty('addressFieldValue')) {
                                field = self.cleanAddressField(field);
                            }

                            if (field.fieldName === "race") {
                                field.fieldValue = self.cleanRaceFieldValue(field.fieldValue);
                            }

                            if (field.fieldName === "trib-affil") {
                                field.fieldValueMask = self.cleanTribAffilFieldValueMask(field.fieldValue);
                            }
                            formData.push(field);
                        });

                        return formData;
                    });
                });
            });
        },

        cleanTribAffilFieldValueMask: function(fieldValue) {
            var cleanValue = [];
            var goshuteValue = "Goshute|TG";
            var navajoValue = "Navajo|TN";
            var paiuteValue = "Paiute|TP";
            var shoshoneValue = "Shoshone NWB|TS";
            var uteValue = "Ute|TU";
            var otherValue = "Other|TO";
            var noneValue = "None";
            if (fieldValue.indexOf(goshuteValue) > -1) {
                cleanValue.push("Goshute");
            }
            if (fieldValue.indexOf(navajoValue) > -1) {
                cleanValue.push("Navajo");
            }
            if (fieldValue.indexOf(paiuteValue) > -1) {
                cleanValue.push("Paiute");
            }
            if (fieldValue.indexOf(shoshoneValue) > -1) {
                cleanValue.push("Shoshone NWB");
            }
            if (fieldValue.indexOf(uteValue) > -1) {
                cleanValue.push("Ute");
            }
            if (fieldValue.indexOf(otherValue) > -1) {
                cleanValue.push("Other");
            }
            if (fieldValue.indexOf(noneValue) > -1) {
                cleanValue.push("None");
            }
            
            return cleanValue.join(", ");
        },

        cleanRaceFieldValue: function(fieldValue) {
            var cleanValue = [];
            var whiteValue = "A person having origins in or ancestors from any of the original peoples of Europe, the Middle East, or North Africa.(White)";
            var aiValue = "A person having origins in or from any of the original peoples of North and South America (including Central America), and who maintains tribal affiliation or community attachment. (including American Indian)|I";
            var asianValue = "A person having origins in or ancestors from any of the original peoples of the Far East, Southeast Asia, or the Indian subcontinent including, for example, Cambodia, China, India, Japan, Korea, Malaysia, Pakistan, the Philippine Islands, Thailand, and Vietnam. (Asian)|A";
            var blackValue = "A person having origins in or ancestors from any of the black racial groups of Africa. (Black)|B";
            var piValue = "A person having origins in or ancestors from any of the original peoples of Hawaii, Guam, Samoa, Tonga, or other Pacific Islands. (Pacific Islander)|P";
            if (fieldValue.indexOf(whiteValue) > -1) {
                cleanValue.push("White");
            }
            if (fieldValue.indexOf(aiValue) > -1) {
                cleanValue.push("American Indian");
            }
            if (fieldValue.indexOf(asianValue) > -1) {
                cleanValue.push("Asian");
            }
            if (fieldValue.indexOf(blackValue) > -1) {
                cleanValue.push("Black");
            }
            if (fieldValue.indexOf(piValue) > -1) {
                cleanValue.push("Pacific Islander");
            }

            return cleanValue.join(", ");
        },

        // Make sure all four fields for this address are not blank
        cleanAddressField: function(field) {
            if (field.addressFieldValue === "" ||
                field.cityFieldValue === "" ||
                field.stateFieldValue === "" ||
                field.zipFieldValue === "") {

                // Blank out all address fields if all fields are not present.
                field.addressFieldValue = "";
                field.cityFieldValue = "";
                field.stateFieldValue = "";
                field.zipFieldValue = "";

                // Create a variable that will be used to hide the comma in the address template.
                field.hideComma = true;
            }
            return field;
        },

        getCoreStudentData: function(studentIds) {
            return $j.getJSON('/admin/students/approve-enrollment/json/enrollment.json.html?action=get.student.fields&student_id=' + studentIds.id);
        },

        insertTemplates: function() {
            $j.get('/scripts/approve-enrollment/templates/form-element-row.html', function(formElementRow) {
                $j('body').append(formElementRow);
            });
        },

        getFormObjectElemFromFieldMap: function(formObject, fieldMapElem) {
            var criteria = [];

            $j.each(fieldMapElem, function(propertyName, valueOfProperty) {
                if (propertyName !== "gpv_field_name") {
                    if (propertyName === "fb_title") {
                        criteria.push({
                            title: valueOfProperty
                        });
                    } else if (propertyName === "fb_description") {
                        criteria.push({
                            description: valueOfProperty
                        });
                    } else if (propertyName === "position") {
                        criteria.push({
                            position: valueOfProperty
                        });
                    }
                }
            });

            // Return the first match
            return $j.grep(formObject, function(formObjectElem, index) {
                var formObjectElemMatchFound = true;
                $j.each(criteria, function(index, criteriaElem) {
                    var keyName = Object.keys(criteriaElem)[0];
                    formObjectElemMatchFound = formObjectElemMatchFound && (formObjectElem[keyName] === criteriaElem[keyName]);
                });
                return formObjectElemMatchFound;
            })[0];
        },

        formToGpvObject: function(formObject, fieldMap) {
            var self = this;
            var gpvObjects = [];
            $j.each(fieldMap, function(index, element) {
                var formObjectMatchingElem = self.getFormObjectElemFromFieldMap(formObject, element);
                try {
                    var gpvObject = {
                        name: element.gpv_field_name,
                        value: formObjectMatchingElem.response
                    };
                    gpvObjects.push(gpvObject);
                } catch (e) {
                    if (formObjectMatchingElem.length === 0) {
                        console.log("formObjectMatchingElem did not return any matches.");
                    }
                }

            });
            return gpvObjects;
        },

        getFieldMap: function() {
            return $j.getJSON("/scripts/approve-enrollment/json/fb-field-map.json");
        },

        getEnrollment: function() {
            var requests = [],
                self = this;

            requests.push(this.getStudentIds());
            requests.push(this.getFormId());
            return $j.when.apply($j, requests).then(function(studentIds, formId) {
                return self.getEnrollmentData(studentIds[0], formId[0]);
            });
        },

        getStudentIds: function() {
            return $j.getJSON("/admin/students/approve-enrollment/json/enrollment.json.html?action=get.studentids");
        },

        getFormId: function() {
            return $j.getJSON("/admin/students/approve-enrollment/json/enrollment.json.html?action=get.form.id");
        },

        getEnrollmentData: function(studentIds, formId) {
            return $j.getJSON("/admin/formbuilder/scripts/json/form.json?subjectid=" + studentIds.id + "&frn=" + studentIds.frn + "&formid=" + formId.id + "&formtype=P&action=get");
        }
    };
});