/*global $j*/

$j(document).ready(function () {
    'use strict';

    /**
     *
     * @param target save button
     */
    function saveHandler(target) {
        var $saveBtn = $j(target);
        var $fieldValue = $saveBtn.siblings('.field-value');
        var $edit = $saveBtn.siblings('.edit');
        var $editBtn = $saveBtn.siblings('.glyphicon-edit');
        $fieldValue.text($edit.val());

        $saveBtn.css({'display': 'none'});
        $edit.css({'display': 'none'});

        $fieldValue.css({'display': 'inline'});
        $editBtn.css({'display': 'inline'});

        $saveBtn.parents('tr').addClass('danger');
    }

    // Show edit stuff
    $j('.glyphicon-edit').on('click', function (e) {
        var $target = $j(e.target);
        var editElem = $target.data().edit;
        var $editElem = $j(editElem);
        var $fieldValue = $target.siblings('.field-value');

        var saveBtn = $target.siblings('.save');

        $editElem.val($fieldValue.text());
        $editElem.css({'display': 'inline'});
        saveBtn.css({'display': 'inline'});

        $target.css({'display': 'none'});
        $fieldValue.css({'display': 'none'});

        $j('.save').on('click', function (e) {
            saveHandler(e.target);
        });
    });
});