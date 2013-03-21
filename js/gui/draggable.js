(function () {
"use strict";
/*global JAWM */


/**
 * Provides drag-and-drop functionality for all of the windows on the page.
 * Use dragDrop.enable or dragDrop.disable to toggle the functionality.
 *
 * This is mostly taken from 'Professional JavaScript for Web Developers' by Zakas,
 * but with no dependencies and less backward-compatibility.
 * - because fuck you IE, that's why.
 */
JAWM.extend("gui").draggable = (function () {

    var dragging = null, // The element that is being dragged
        offsetX = 0, // Coordinates inside the draggable object
        offsetY = 0,
        lastTarget; // used for resetting cursor

    function drag(e) {
        var target = e.target;  // The element being dragged (titlebar)

        switch (e.type) {

            // Check if dragging should be performed
            case "mousedown":

                // Make title-text draggable too
                if (target.className.indexOf("window-title-text") > -1) {
                    target = target.parentNode; // move up one step
                }

                // If the element has the draggable-class, or is inside that element
                if (target.className.indexOf("window-titlebar") > -1) {

                    // Drag the parent-node
                    // TODO make this more robust
                    dragging = target.parentNode;

                    // Don't rely on the CSS to be correct
                    dragging.style.position = "absolute";

                    // Change the cursor
                    target.style.cursor = "move";
                    lastTarget = target;

                    // Compensate for mouse offset
                    offsetX = e.clientX - dragging.offsetLeft;
                    offsetY = e.clientY - dragging.offsetTop;

                }
                break;

            // Move the window if dragging
            case "mousemove":
                // While dragging something...
                if (dragging !== null) {

                    // ...set the elements coordinates to the mouse's
                    dragging.style.left = (e.clientX - offsetX) + "px";
                    dragging.style.top = (e.clientY - offsetY) + "px";

                    
                }
                break;

            // Drop everything
            case "mouseup":
                // If something is dragging
                if (dragging !== null) {

                    // Drop it
                    lastTarget.style.cursor = "default";
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
