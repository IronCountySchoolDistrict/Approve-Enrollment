/*global define, $*/

define(['underscore', 'validate'], function (_, validate) {
    'use strict';
    return {
        main: function () {
            this.bindAddTableRow();
            this.bindFlipPriority();
            this.bindSetSelectColor();
        },

        _slideInsertTableRow: function (tableRow) {
            var rowTds = tableRow.find('td');
            rowTds.wrapInner('<div style="display: none;" />');
            var rowDivs = rowTds.find('> div');
            rowDivs.slideDown(200).promise().done(function () {
                $('body').animate({
                    scrollTop: tableRow.offset().top
                }, 500);

                // Here, this is set to the set of rowDivs.
                var $set = $(this);

                _.each($set, function (elem) {
                    $(elem).replaceWith($(elem).contents());
                });
                validate.refreshParsley();
            });

        },

        /**
         *
         * @param tableRow {jQuery} - row that will be removed
         * @param setPriority {boolean} - Determines if priorities need to be changed after the row is removed
         * @param removeRowPriority {Number} - The priority of the row that was deleted
         * @private
         */
        _slideRemoveTableRow: function (tableRow, setPriority, removeRowPriority) {
            var rowTds = tableRow.find('td');
            rowTds.wrapInner('<div style="display: block;" />');
            var rowDivs = rowTds.find('> div');
            var obj = this;
            rowDivs.slideUp(200).promise().done(function () {
                tableRow.remove();

                if (setPriority) {
                    obj.setPriorityOptions(removeRowPriority);
                }
                //$(this).parent().parent().remove();
            });
        },

        /**
         * @param table {jQuery} - table that will have the row added to it
         * @param rowTemplate {String} - contains the HTML string of the row that will be appended to the table.
         * @returns {undefined}
         */
        _addTableRow: function (table, rowTemplate) {
            var lastRow = $(table).find('tr').last();

            /**
             *
             * @type {Number} - 1-based index of the last row in the table
             */
            var lastRowIndex = lastRow.data().index;

            var renderedTemplate = _.template(rowTemplate, {index: lastRowIndex + 1});
            $(renderedTemplate).insertAfter(lastRow);
            var newRow = $(table).find('tr').last();
            this._slideInsertTableRow(newRow);
            this.bindFlipPriority();
        },

        /**
         * Adds the remove row button to the last row in the table.
         * Also calls the function that binds the event handler to the remove button.
         * @param table {jQuery} - table that will have the button added to
         * the previous remove row button and the remove row that being added.
         * @param setPriority {Boolean} - whether setPriorityOptions should be called (for emergency contacts table only)
         * @returns {undefined}
         * @see bindAddTableRow
         */
        _bindRemoveRowHandler: function (table, setPriority) {
            /**
             * Save the value of "this" here so inside the event callback function we still have a reference to this
             * object of functions.
             * @type {Object}
             */
            var obj = this;

            var newRow = table.find('tr').last();
            var addedButton = newRow.find('td').last().find('span');
            addedButton.on('click', function () {
                var removeButtonIndex = $(this).data().index;

                // table row that will be removed
                var removeRow = table.find('tr[data-index="' + removeButtonIndex + '"]');
                var removeRowPriority = removeRow.find('select').val();

                obj._slideRemoveTableRow(removeRow, setPriority, removeRowPriority);
            });
        },

        /**
         * @param select {jQuery} - select tag that will recieve the color CSS attribute
         * @private
         * Once this option is deselected, the select tag is set to normal color.
         */
        _setSelectColor: function (select) {
            select.one('change', function () {
                select.css({color: '#555'});
            });
        },


        bindSetSelectColor: function () {
            this._setSelectColor($('#emerg-cont-address-state1'));
            this._setSelectColor($('#emerg-cont-address-state2'));
            this._setSelectColor($('#emerg-cont-address-state3'));
        },

        /**
         * Bind 'click' event handlers for the "green plus" add row buttons
         * for the Emergency Contact and Sibling tables
         * @returns {undefined}
         */
        bindAddTableRow: function () {

            /**
             * Save the value of "this" here so inside the event callback function we still have a reference to this
             * object of functions.
             * @type {Object}
             */
            var obj = this;

            //Emergency contacts table
            var addEmergContSpan = $('#add-emerg-cont-span');
            var emergContRowTemplate = $('#emerg-cont-row-template').html();

            addEmergContSpan.on('click', function () {
                var emergContTable = $('#emerg-cont-table');
                obj._addTableRow(
                    emergContTable,
                    emergContRowTemplate
                );
                obj._bindRemoveRowHandler(
                    emergContTable,
                    true
                );

                obj.setPriorityOptions();
            });

            // Siblings table
            var addSiblingButton = $('#add-sibling-span');
            var siblingTableRowTemplate = $('#sibling-row-template').html();

            addSiblingButton.on('click', function () {
                var siblingTable = $('#siblings-table');
                obj._addTableRow(
                    siblingTable,
                    siblingTableRowTemplate
                );
                obj._bindRemoveRowHandler(
                    siblingTable,
                    false
                );

                // This function call was causing problems with the slideDown code,
                // So wait a little bit before refreshing Parsley.
                // TODO: Refactor this so this delay isn't needed.
                /*
                 setTimeout(function () {
                 validate.refreshParsley();
                 }, 200);
                 */
            });
        },

        /**
         * @param [removeRowPriority] {Number} - Priority of the row that will be removed.
         * Not passed in when this is called after adding a row.
         */
        setPriorityOptions: function (removeRowPriority) {
            var prioritySelects = $('.priority');
            var numOfRows = prioritySelects.eq(0).parents('table').find('tr[data-index]').length;
            _.each(prioritySelects, function (select, index, list) {
                // Current priority of the row
                var selectedOptionValue = $(select).find(':selected').text();

                $(select).children().remove();

                var optionsRange;

                optionsRange = _.range(1, numOfRows + 1);

                // Iterate over a list with an extra element so there is a
                // 0 element that can be used for a blank option tag
                _.each(optionsRange, function (option) {
                    var context = {index: option};
                    var optionTemplate = $('#priority-option-template').html();
                    var renderedTemplate = _.template(optionTemplate, context);
                    $(select).append(renderedTemplate);
                });

                var newOptionMatchingOldVal;

                // This is the last row, so always make the priority the highest possible value
                // Only use this if ADDing a row, not removing one
                if (index === list.length - 1 && !removeRowPriority) {
                    newOptionMatchingOldVal = $(select).find('option:contains(' + (index + 1) + ')');
                } else if (removeRowPriority && (selectedOptionValue > removeRowPriority)) {
                    // If a row was removed that had a lower priority than the current row,
                    // decrement the priority by 1 so there isn't a missing priority in the table.
                    var newOptionValue = selectedOptionValue - 1;
                    newOptionMatchingOldVal = $(select).find('option:contains(' + newOptionValue + ')');

                    // removeRowPriority wasn't passed in, so this call must be after adding a row, not removing it.
                } else {
                    // If a row was removed and the current row had a lower priority than that of the removed row,
                    // the priority doesn't need to be decremented.
                    newOptionMatchingOldVal = $(select).find('option:contains(' + selectedOptionValue + ')');
                }

                newOptionMatchingOldVal.attr('selected', 'selected');
            });
        },

        /**
         * If the user changes priority, the new value will be a duplicate of one of the other priority values.
         * This function takes the previous value of the priority that was changed and assigns it to the dropdown
         * with the duplicate value.
         * For example, say if the user has two emergency contacts and the user changes cont. w/ priority 1 to 2,
         * the contact that had priority 2 becomes priority 1.
         */
        bindFlipPriority: function () {

            var priority = $('.priority');

            priority.one('focus', function (e) {
                var target = $(e.target);
                target.data({previous: target.val()});
            });

            priority.off('change').on('change', function (e) {
                // Contains current value of the select box
                var changedSelect = e.target;

                // Find the select that shares the new value of the changed select box.
                // This will also return the changed select box
                var matchingPrevious = $('.priority').filter(function (index, obj) {
                    return $(obj).val() === $(changedSelect).val();
                });

                matchingPrevious = matchingPrevious.not($(changedSelect));
                var matchingOption = matchingPrevious.find(':contains("' + $(changedSelect).data('previous') + '")');
                matchingOption.attr('selected', 'selected');

                $(changedSelect).data({previous: $(changedSelect).val()});
            });
        }
    };
});