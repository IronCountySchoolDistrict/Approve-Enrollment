/*global $, define*/

/**
 * All code that has to do with navbar tabs
 */
define(['validate'], function (validate) {
    'use strict';
    return {
        main: function () {
            this.setActiveTabFromHash();
            this.setDisplayPrevNextButtons();
            this.bindPrevNextHandlers();
        },

        /**
         * Display the tab that matches the hash passed in through the URL
         */
        setActiveTabFromHash: function () {
            var hash = window.location.hash;

            // If hash is falsey, this is the first visit to this page
            if (hash) {
                var selectedTab = $('.nav li a[href="' + hash + '"]').parent();
                var selectedPane = $(hash);
                selectedTab.addClass('active');
                selectedPane.addClass('active');
                //selectedTab.trigger('click', true);
            } else {
                // No hash was passed in, so set first tab and tab-pane to active.
                var firstTab = $('.nav li').first();
                var firstPane = $('.tab-pane').first();
                firstTab.addClass('active');
                firstPane.addClass('active');
            }
            this.setDisplayPrevNextButtons();
        },


        /**
         * Add the glyphicon-ok icon to a tab
         * @param navTab {jQuery} - 'a' tag of the nav tab that will have the icon appended
         * @param status {String} - possible values are 'success' and 'error'
         */
        setTabStatus: function (navTab, status) {
            var badges = navTab.find('.badge');
            var alreadyHasIcon = badges.length > 0;
            if (alreadyHasIcon) {
                badges.remove();
            }
            var badge;
            if (status === 'success') {
                badge = $('<span style=\"margin-left: 7px;\" class=\"badge\"><span class=\"glyphicon glyphicon-ok\"></span>');
            } else if (status === 'error') {
                badge = $('<span style=\"margin-left: 7px;\" class=\"badge\"><span class=\"glyphicon glyphicon-remove\"></span>');
            } else {
                badge = '';
                console.error('status parameter value is something other than "success" or "error"');
            }

            navTab.append(badge);

        },

        /**
         * Bind click events to Next and Previous buttons.
         * @returns {undefined}
         */
        bindPrevNextHandlers: function () {
            var prevButton = $('#prev-btn');
            var nextButton = $('#next-btn');

            var tabLinks = $('li').find('a');

            /**
             * Save the value of "this" here so inside the event callback function we still have a reference to this
             * object of functions.
             * @type {Object}
             */
            var _this = this;

            prevButton.on('click', function (e) {
                e.preventDefault();
                $('html, body').animate({scrollTop: 0}, 'fast');
                _this._changeTab('previous');
            });
            nextButton.on('click', function (e) {
                e.preventDefault();

                //Validate the current tab's fields.
                var activeTabPane = $('.tab-pane.active');
                //var activeTabNav = $('.nav .active a');
                var currentBlock = activeTabPane.data().block;
                var validationPassed = validate.validateBlock(currentBlock);
                if (validationPassed) {
                    //_this.setTabStatus(activeTabNav);
                    $('html, body').animate({scrollTop: 0}, 'fast');
                    _this._changeTab('next');
                }
            });

            /**
             * When the prev and next buttons are clicked, the click event for a tab link is triggered.
             * This shouldn't happen, since the animate function will be called more than once (once in either of the callbacks above,
             * and once in the callback defined here)
             * If the tab link was clicked by the user, the ignore variable will not have been defined, and will be falsy.
             * If the prev/next button was pressed, true will be passed to the callback function, and the callback function will
             * effectively be ignored.
             * @param {Event} e - jQuery event object
             * @param {Boolean} ignore - Should the callback function be ignored? Run if false, ignored if true.
             */
            tabLinks.on('click', function (e, ignore) {
                var tabs = $('.nav');
                // When this event is triggered, the previously selected tab still has the .active class.
                var previouslyOpenTab = tabs.find('.active');

                // Tab (li element) that the user clicked on
                var clickedTab = $(e.target).parent();
                var previouslyOpenTabIndex = tabs.children().index(previouslyOpenTab);
                var currentlyOpenTabIndex = tabs.children().index(clickedTab);
                if (currentlyOpenTabIndex > previouslyOpenTabIndex) {
                    var activeTabPane = $('.tab-pane.active');
                    var currentBlock = activeTabPane.data().block;
                    var validationPassed = validate.validateBlock(currentBlock);
                    if (!validationPassed) {
                        clickedTab.find('a').removeAttr('data-toggle');
                        e.preventDefault();
                    } else {
                        // Current form block is valid, so make sure the selected tab will
                        // act like a tab by adding the data-toggle attribute.

                        // Go the the next tab
                        // TODO: Refactor some of this so tab click and prev/next button logic can be shared
                        if (!ignore) {
                            $('html, body').animate({scrollTop: 0}, 'fast');
                            _this.setDisplayPrevNextButtons(e);
                            _this._replaceWindowLocation(clickedTab);
                        }
                        var currentlyOpenTabHasToggle = clickedTab.find('a').attr('data-toggle') ? true : false;
                        if (!currentlyOpenTabHasToggle) {
                            clickedTab.attr({'data-toggle': 'tab'});
                        }
                    }
                }
            });
        },

        /**
         * Set "display: none" CSS on prev/next buttons when the first or last tab is selected, respectively.
         * Show submit button div if on the last tab, set "display: none" CSS to hide submit button correctly.
         * @param {Object} [e] - jQuery event object.
         * @returns {undefined} - Modifies CSS for prev and next buttons.
         */
        setDisplayPrevNextButtons: function (e) {
            // Hide the button's parent div so the justification is only calculated for the
            // submit and previous buttons. When hiding the button itself,
            // justification calculates all three buttons.
            var prevButton = $('#prev-btn');
            var nextButton = $('#next-btn');
            var nextButtonDiv = nextButton.parent();
            var submitButtonDiv = $('#submit-btn').parent();
            var activeTab;
            if (e) {
                activeTab = $(e.target).parent();
            } else {
                activeTab = $('li.active');
            }

            // First tab is the active tab.
            // Make sure submitButtonDiv is hidden, prevButton is hidden, and show nextButton.
            if (activeTab.prev().length === 0) {
                prevButton.css({display: 'none'});
                nextButton.css({display: 'inline'});
                nextButtonDiv.css({display: 'table-cell'});
                submitButtonDiv.css({display: 'none'});

                // Last tab is the active tab
                // Hide nextButtonDiv, display Previous and Submit buttons
            } else if (activeTab.next().length === 0) {
                prevButton.css({display: 'inline'});
                nextButtonDiv.css({display: 'none'});
                submitButtonDiv.css({display: 'table-cell'});

                // Active tab is not first or last.
                // Make sure submitButtonDiv is hidden, show prevButton and nextButton
            } else {
                prevButton.css({display: 'inline'});
                nextButton.css({display: 'inline'});
                nextButtonDiv.css({display: 'table-cell'});
                submitButtonDiv.css({display: 'none'});
            }
        },

        /**
         * Change the active tab to either the previous or next tab in the list.
         *
         * @param {String} direction - show the previous or next tab? valid values are 'previous' and 'next'
         * @returns {boolean} - return false if user is viewing first or last tab and there are no prev/next tabs to show
         *  true if prev/next tab exists and click event was triggered.
         */
        _changeTab: function (direction) {
            var activeTab = $('li.active');
            if (direction === 'previous') {
                var prevTab = activeTab.prev();
                if (prevTab.length === 0) {
                    return false;
                }
                prevTab.find('a').trigger('click', true);
                this.setDisplayPrevNextButtons();
                this._replaceWindowLocation(activeTab.prev());
                return true;
            }
            if (direction === 'next') {
                var nextTab = activeTab.next();
                if (nextTab.length === 0) {
                    return false;
                }
                var nextTabA = nextTab.find('a');
                if (nextTabA.hasClass('disabled-nav')) {
                    nextTabA.removeClass('disabled-nav');
                    nextTabA.addClass('enabled-nav');
                }
                nextTab.find('a').trigger('click', true);
                this.setDisplayPrevNextButtons();
                this._replaceWindowLocation(activeTab.next());
                return true;
            }

            return false;
        },

        /**
         *
         * @param tab {jQuery} - li tab element
         */
        _replaceWindowLocation: function (tab) {
            window.location.replace(window.location.pathname + tab.find('a').attr('href'));
        }
    };
});
