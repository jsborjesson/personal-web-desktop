(function () {
"use strict";
/*global JAWM */

/**
 * Based on the draggable-file. It's painful to write so similar code,
 * but there were too many differences in this file that i did not see
 * another way. Maybe this will be changed in the future.
 */
JAWM.extend("gui").resizable = (function () {

    var dragging = null, // the element being dragged
        content, // content-area to be resized
        originX, // start of drag
        originY,
        width, // current size
        height;

    function drag(e) {
        var target = e.target; // The element being dragged (titlebar)
            
        switch (e.type) {

            // Check if dragging should be performed
            case "mousedown":

                // If the element has the draggable-class, or is inside that element
                if (target.className.indexOf("resize-button") > -1) {
                    // Enable the dragging
                    dragging = target;

                    // Set the starting-position
                    originX = e.clientX;
                    originY = e.clientY;

                    // Get the content-area
                    content = dragging;
                    while (content.className.indexOf("window-parent") === -1) {
                        content = content.parentNode;
                    }
                    content = content.querySelector(".window-content");

                    // Get the original size
                    width = parseInt(content.style.width, 10);
                    height = parseInt(content.style.height, 10);

                    // Set opacity
                    dragging.style.opacity = "0.7";
                }
                break;

            // Move the window if dragging
            case "mousemove":
                // While dragging something...
                if (dragging !== null) {
                    content.style.width = width + (e.clientX - originX) + "px";
                    content.style.height = height + (e.clientY - originY) + "px";
                }
                break;

            // Drop everything
            case "mouseup":
                if (dragging !== null) {
                    // Set opacity
                    dragging.style.opacity = "1";
                    
                    dragging = null;
                }
                break;
        }

    } // end drag

    // Public methods
    return {
        enable: function () {
            document.addEventListener("mousedown", drag, false);
            document.addEventListener("mousemove", drag, false);
            document.addEventListener("mouseup", drag, false);
        },

        disable: function () {
            document.removeEventListener("mousedown", drag, false);
            document.removeEventListener("mousemove", drag, false);
            document.removeEventListener("mouseup", drag, false);
        }
    };

}());



// END LOCAL SCOPE
}());
