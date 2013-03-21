(function () {
"use strict";
/*global JAWM */

// Dependencies
var Window = JAWM.gui.Window;


JAWM.extend("gui").launcher = (function () {
    var launcher,
        startPos = {x: 0, y: 0};
   
    function createIcon(url) {
        var div, img;
        div = document.createElement("div");
        div.className = "launcher-icon";

        img = document.createElement("img");
        img.src = url;
        div.appendChild(img);

        return div;
    }

    /**
     * Returns the coordinates to put a new window
     * @param  {Window} app The app to position
     * @return {Object}     x and y coordinates
     */
    function getStartPosition(app) {

        // Get size of window
        var size = app.getTotalSize();

        

        // Increment the starting position and return the old one
        var temp = startPos;
        startPos = {
            x: startPos.x + 30,
            y: startPos.y + 30
        };

        return temp;
    }

    /**
     * Public functions
     */
    return {

        /**
         * Create the launcher
         */
        create: function () {
            launcher = document.createElement("div");
            launcher.className = "launcher";

            document.body.appendChild(launcher);
        },

        /**
         * Adds a launcher-icon in the dashbar
         * @param {String} iconURL URL to the icon that will be used
         * @param {Function} open Opening-function, should return a Window-object.
         */
        addApp: function (iconURL, open) {

            var icon = createIcon(iconURL),
                app;

            // Make the icon clickable
            icon.addEventListener("click", function () {
                var start;

                app = open();
                
            }, false);

            launcher.appendChild(icon);
        }
    };


}());










}());

