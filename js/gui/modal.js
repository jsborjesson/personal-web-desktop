(function () {
"use strict";
/*global JAWM */

// Handles the modal pop-up
JAWM.extend("gui").modal = (function () {

    // The containing div
    var modal, overlay;

    /**
     * Display a modal popup
     * @param  {String} title       The title of the modal
     * @param  {Element} contentNode The DOM-element to be appended to the content-area
     * @param  {Function} applyFn     The function to call when apply is pressed
     */
    var createModal = function (title, contentNode, applyFn) {
        var header, body, footer, h3, abort_btn, confirm_btn, // Elements
            that = this;

        /*
         * Darken screen
         */
        overlay = document.createElement("div");
        overlay.className = "darken";
        document.body.appendChild(overlay);

        /*
         * Container
         */
        modal = document.createElement("div");
        modal.className = "modal";

        /*
         * Header
         */
        header = document.createElement("div");
        header.className = "modal-header";
        h3 = document.createElement("h3");
        h3.appendChild(document.createTextNode(title));
        header.appendChild(h3);
        modal.appendChild(header);

        /*
         * Body
         */
        body = document.createElement("div");
        body.className = "modal-body";
        body.appendChild(contentNode);
        modal.appendChild(body);

        /*
         * Footer
         */
        footer = document.createElement("div");
        // Abort button
        abort_btn = document.createElement("button");
        abort_btn.className = "btn";
        abort_btn.appendChild(document.createTextNode("Cancel"));
        abort_btn.onclick = function () {
            that.hide();
        };
        footer.appendChild(abort_btn);

        // Confirm-button
        confirm_btn = document.createElement("button");
        confirm_btn.className = "btn btn-custom";
        confirm_btn.appendChild(document.createTextNode("Apply"));
        // Call the parameter function, then close
        confirm_btn.onclick = function () {
            applyFn();
            that.hide();
        };
        footer.appendChild(confirm_btn);

        footer.className = "modal-footer";
        modal.appendChild(footer);

        /*
         * Add to DOM
         */
        document.body.appendChild(modal);
    };

    var removeModal = function () {
        modal.parentNode.removeChild(modal);
        overlay.parentNode.removeChild(overlay);
    };

    // Return the functions
    return {
        show: createModal,
        hide: removeModal
    };

}());



}());
