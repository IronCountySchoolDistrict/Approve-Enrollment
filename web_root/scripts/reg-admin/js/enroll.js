/*global $j,_*/

$j(document).ready(function () {
    'use strict';

    /**
     * Return the text representation of the value of a form element.
     * Text boxes, select dropdowns, just return the text in the box.
     * Radio/Checkboxes return the label of the selected option.
     *
     * @param {jQuery} field
     * @return String
     */
    function fieldToString(field) {
        var nodeName = field.prop('nodeName').toLowerCase();
        var nodeType = field.prop('type');

        if (nodeName === 'select' ||
            (nodeName === 'input' && (nodeType === 'text' || !nodeType))) {
            return field.val();
        }

        if (nodeName === 'input' && (nodeType === 'radio' || nodeType === 'checkbox')) {
            // Since this is a radio or checkbox element, there are multiple DOM elements in the field var.
            // Find out which elements in "field" are selected.
            var selectedElems = _.filter(field, function (elem) {
                return $j(elem).prop('checked');
            });

            var textArray = [];

            $j.each(selectedElems, function (key, elem) {
                // Find the element's corresponding label by matching the for attribute of the label
                // with the field's id
                var label = $j('[for="' + $j(elem).prop('id') + '"]');
                textArray.push(label.text());
            });

            return textArray.toString();
        }
    }

    /**
     * Copies the value of the form input element to the .field-value (text span) element.
     * Hides the form element and Save button, and shows the text span and Edit button.
     *
     * @param target save button that was clicked by the user
     */
    function saveHandler(target) {
        var $saveBtn = $j(target);
        var $fieldValueElems = $saveBtn.siblings('.field-value');
        var $editElements = $saveBtn.siblings('.edit');
        var $editBtn = $saveBtn.siblings('.glyphicon-edit');

        $j.each($fieldValueElems, function (key, elem) {
            var corresEditSelector = $j(elem).data().editElem;

            $j(elem).text(fieldToString($j(corresEditSelector)));
        });

        $saveBtn.css({'display': 'none'});
        $editElements.css({'display': 'none'});

        $fieldValueElems.css({'display': 'inline'});
        $editBtn.css({'display': 'inline'});

        $saveBtn.parents('tr').addClass('danger');

        $saveBtn.siblings('.hide-on-edit').css({'display': 'inline'});
    }


    $j('.glyphicon-edit').on('click', function (e) {
        var $target = $j(e.target);
        var $editElements = $target.siblings('.edit');
        var $fieldValueElems = $target.siblings('.field-value');
        var saveBtn = $target.siblings('.save');


        $j.each($fieldValueElems, function (key, elem) {

            // Every span that shows the value of a field (.field-value elements)
            // has a corresponding element (input, checkbox, etc.) that will edit
            // the field value. The editElem data attribute attached the .field-value element
            // contains the selector f the corresponding edit form element.
            var corresEditSelector = $j(elem).data().editElem;

            var corresEditElems = $j(corresEditSelector);
            var editType = corresEditElems.eq(0).attr('type');


            if (editType === 'radio') {

                // Text value of the span label that displays the read-only value of the field
                var fieldValueText = elem.innerText;

                // Iterate through form elements, set the correct radio to checked
                $j.each(corresEditElems, function (index, editElem) {
                    var editLabelText = $j(editElem).next().text();

                    // Edit field label and read-only value span label must match for
                    // the element to be checked.
                    if (fieldValueText === editLabelText) {
                        $j(editElem).attr('checked', true);
                    }
                })
            } else {
                // Copy the value of the .field-value element to the edit element
                // so when the user clicks the edit button, the .field-value value is shown in
                // the edit element.
                $j(corresEditSelector).val($j(elem).text());
            }
        });

        $editElements.css({'display': 'inline'});
        saveBtn.css({'display': 'inline'});

        $target.css({'display': 'none'});
        $fieldValueElems.css({'display': 'none'});

        $target.siblings('.hide-on-edit').css({'display': 'none'});

        $j('.save').on('click', function (e) {
            saveHandler(e.target);
        });
    });


});