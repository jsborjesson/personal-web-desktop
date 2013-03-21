(function () {
"use strict";
/*global JAWM */


/**
 * Initialize all of the page's functionality.
 * Gentlement, start your engines.
 */
window.onload = function () {

    // Declare dependencies
    var gui = JAWM.gui,
        apps = JAWM.apps,
        launcher = gui.launcher;

    // Set default background
    document.body.background = "pics/764208.jpg";

    // Make windows movable and resizable
    gui.draggable.enable();
    gui.resizable.enable();

    // Fire up the taskbar
    launcher.create();

    // Add icons to the taskbar
    launcher.addApp("css/apps/ImageViewer.png", function () {
        return new apps.ImageViewer();
    });

    launcher.addApp("css/apps/RSSReader.png", function () {
        return new apps.RSSReader("http://feeds.bbci.co.uk/news/world/europe/rss.xml");
    });

    launcher.addApp("css/apps/Memery.png", function () {
        return new apps.Memery(4, 4);
    });

};

/**
 * Known bugs
 * chrome vägrar ta bort text-markör-cursorn
 * firefox renderar mac-scroll-bars igenom fönter ovanför
 */


}());