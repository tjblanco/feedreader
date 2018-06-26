/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });
        // each object in allFeed has url property and it is not empty
        it('has url property', function() {
            allFeeds.forEach(function(feed){
                expect(feed.url).toBeDefined();
                expect(feed.url.length).not.toBe(0);
            });
        });
        // each object in allFeed has name property and it is not empty
        it('has name property', function() {
            allFeeds.forEach(function(feed){
                expect(feed.name).toBeDefined();
                expect(feed.name.length).not.toBe(0);
            });
        });
    });

    describe('The menu', function() {
        // Check whether the menu is hidden by default
        it('is hidden by default', function() {
            expect(document.querySelector('.menu-hidden')).toBeDefined();
        });
        // Check whether the menu change the visibility status on click
        it('changes visibility when the menu icon is clicked', function() {
            $('.menu-icon-link').trigger('click');
            expect(document.querySelector('.menu-hidden')).toBe(null);
            $('.menu-icon-link').trigger('click');
            expect(document.querySelector('.menu-hidden')).toBeDefined();
        });
    });

    describe('Initial Entries', function() {
        // Execute asynch function
        beforeEach(function(done){
            loadFeed(1,done)
        });
        // Check whether the feed are loaded properly
        it('at least a single .entry element exist in the .feed container', function(done) {
            expect($('.feed >> .entry').length > 0).toBe(true);
            done();
        });
    });

    describe('New Feed Selection', () => {
        // Execute nested asynch function
        beforeEach(done => {
            loadFeed(1, () => {
                window.firstFeed = document.querySelector('.feed').innerHTML;
                loadFeed(2, () => {
                    window.secondFeed = document.querySelector('.feed').innerHTML;
                    done();
                });
            });
        });
        // Check whether the entries change after clicking in a entry link
        it('when a new feed is loaded', function(done) {
            expect(window.firstFeed === window.secondFeed).toBe(false);
            done();
        });
    });
}());
