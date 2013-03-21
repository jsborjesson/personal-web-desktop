(function () {
"use strict";
/*global JAWM */

// Dependencies
var Window = JAWM.gui.Window,
    AjaxCon = JAWM.util.AjaxCon,
    getClockString = JAWM.util.getClockString;

/**
 * [RSSReader description]
 */
var RSSReader = JAWM.extend("apps").RSSReader = function (feed) {
    var that = this;

    Window.call(this, "RSSReader", 350, 500, "css/apps/RSSReader.png");

    // Setup the menu-options
    this.createMenu();

    // Load the feed
    feed = feed || "http://feeds.bbci.co.uk/news/world/europe/rss.xml";
    this.loadFeed(feed);

    // Refresh the feed
    this.refreshRate = 5000; // ms between calls
    this.interval = null; // reference to interval
    this.setRefreshInterval(this.refreshRate);

    // Clear the updating
    this.onclose = function () {
        that.clearRefreshInterval();
    };

    this.resizable(true);
    this.show();
};

RSSReader.prototype = Object.create(Window.prototype);

/**
 * Creates the menu-options
 */
RSSReader.prototype.createMenu = function() {
    var modal = JAWM.gui.modal,
        that = this;

    this.createMenuDropdown("Settings", {
        name: "Update Frequency",
        fn: function () {
            // Declare options
            var select = document.createElement("select"),
                one = document.createElement("option"),
                five = document.createElement("option"),
                thirty = document.createElement("option");

            // Set values
            one.value = 1000;
            five.value = 5000;
            thirty.value = 30000;

            // Set texts
            one.appendChild(document.createTextNode("1s"));
            five.appendChild(document.createTextNode("5s"));
            thirty.appendChild(document.createTextNode("30s"));

            // Puzzle
            select.appendChild(one);
            select.appendChild(five);
            select.appendChild(thirty);
            select.className = "select-interval";

            // Display a modal with the setting
            // The function is called when pressing apply,
            // and gets access to the created dom-elements
            // in the closure.
            modal.show("Update Frequency", select, function () {
                that.setRefreshInterval(select.value);
            });
        }
    }, {
        name: "Source",
        fn: function () {
            // Create input-field
            var input = document.createElement("input");
            input.type = "text";

            // Show settings dialog
            modal.show("Source", input, function () {
                that.loadFeed(input.value);
            });
        }
    }, {
        name: "Refresh",
        fn: function () {
            that.refresh();
        }
    });

    this.showMenu();
};

/**
 * Loads a new feed.
 * @param  {String} url The new feed.
 */
RSSReader.prototype.loadFeed = function(url) {
    this.feed = url;
    this.refresh();
};

/**
 * Refreshes the current feed;
 */
RSSReader.prototype.refresh = function() {
    var that = this;
    this.getFeed(this.feed, function (data) {
        that.render(data);
        that.setStatusText("Last updated " + getClockString());
    });
};

/**
 * Takes a url and displays the RSS-feed
 * @param  {String} feed URL of the feed
 */
RSSReader.prototype.getFeed = function (feed, callback) {
    var url = "php/rss.php?url=" + escape(feed),
        that = this;

    // Load in the data
    this.setLoadingState(true);
    new AjaxCon(url, function (data) {
        callback(data);
        that.setLoadingState(false);
    });
};

/**
 * Set the update-interval
 * @param {Number} rate The interval in ms
 */
RSSReader.prototype.setRefreshInterval = function (rate) {
    var that = this;

    // Clear original interval
    this.clearRefreshInterval();

    if (rate > 0) {
        // Set the refresh
        // TODO setTimeout instead
        this.interval = setInterval(function () {
            that.refresh();
        }, rate);
    }
        
};

/**
 * Cancels the interval
 */
RSSReader.prototype.clearRefreshInterval = function() {
    clearInterval(this.interval);
};

/**
 * Render data in the content-area
 * @param  {String} data HTML
 */
RSSReader.prototype.render = function (data) {
    this.content.innerHTML = data;
};



}());