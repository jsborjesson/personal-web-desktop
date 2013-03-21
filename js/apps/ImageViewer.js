(function () {
"use strict";
/*global JAWM */

// Dependencies
var Window = JAWM.gui.Window,
    AjaxCon = JAWM.util.AjaxCon,
    thumbURL = "pics/thumbs/",
    imageURL = "pics/";

/**
 * The ImageViewer class
 */
var ImageViewer = JAWM.extend("apps").ImageViewer = function (image) {
    var that = this;

    /**
     * Start the single-image-viewer
     */
    if (image) {
        Window.call(this, image.fileName, image.width, image.height, thumbURL + image.fileName);
        this.content.style.backgroundImage = "url(" + imageURL + image.fileName + ")";
        this.setStatusText(image.width + " x " + image.height + " px");
    }

    /**
     * Start the normal thumb-window
     */
    else {
        // Call super-constructor
        Window.call(this, "ImageViewer", 300, 250, "css/apps/ImageViewer.png");

        // Call the db for the images
        this.getThumbs("php/getJSONThumbs.php", function (data) {
            that.images = data;

            // Display it and remove the loading-icon
            that.ready();
        });
    }

    // Display the window
    this.resizable(true);
    this.show();
};

// Inherit from Window
ImageViewer.prototype = Object.create(Window.prototype);

/**
 * Sets up stuff when the images have been loaded.
 * Adds event-listeners for the thumbs
 */
ImageViewer.prototype.ready = function () {
    var that = this;

    // Render the thumbs
    this.displayThumbs(this.images);

    // Display info in statusbar on hover
    this.content.addEventListener("mouseover", function (event) {
        var index = that.getImageIndex(event.target),
            info, image;

        if (index >= 0) {
            image = that.images[index];
            info = image.fileName + " - " + image.width + " x " + image.height + " px";
            that.setStatusText(info);
        } else {
            that.setStatusText("");
        }
    }, false);

    // Set the background on right-click
    this.content.addEventListener("contextmenu", function (event) {
        that.setBackground(event);

        // Cancel the dropdown-menu
        event.preventDefault();
        event.stopPropagation();
        return false;
    }, false);

    // Open in new window when clicked
    this.content.addEventListener("click", function (event) {
        that.openSingleImage(event); // Note: Needs to be called by that, if passed as reference it has no access to the instance.
    }, false);
};

/**
 * Gets the JSON-data from the server and calls the callback with it
 * @param {Function} callback The function the data will be called with
 */
ImageViewer.prototype.getThumbs = function (url, callback) {
    var that = this;
    
    // Start the loading-indicator
    this.setLoadingState(true);
    this.setStatusText("Loading images...");
    
    // Get the data
    new AjaxCon(url, function (data) {
        var thumbs = JSON.parse(data);
        callback(thumbs);

        // Reset the loading-indicator
        that.setLoadingState(false);
        that.setStatusText("");
    });
};

/**
 * Displays the thumbs from a passed in array
 * @param  {Array} images  Array of image-objects
 */
ImageViewer.prototype.displayThumbs = function (images) {
    var div, img,
        size = this.getContainerSize(images);

    for (var i = images.length - 1; i >= 0; i--) {

        // Create the container-element
        div = document.createElement("div"),
        div.className = "thumb";
        div.style.height = size.height + "px";
        div.style.width = size.width + "px";

        // Create the image
        img = document.createElement("img");
        img.src = thumbURL + images[i].fileName;
        img.setAttribute("data-img-index", i);
        div.appendChild(img);

        // Add the thumb-element to the DOM
        this.content.appendChild(div);
    }
};

/**
 * Get the maximum height and width in the thumb-array
 * @param  {Array} thumbs The thumbnail-objects
 * @return {Object}        Contains width and height-properties
 */
ImageViewer.prototype.getContainerSize = function (thumbs) {
    var currentThumb,
        height = 0,
        width = 0;

    // Calculate the largest width and height
    for (var i = thumbs.length - 1; i >= 0; i--) {
        currentThumb = thumbs[i];

        if (currentThumb.thumbHeight > height) {
            height = currentThumb.thumbHeight;
        }
        if (currentThumb.thumbWidth > width) {
            width = currentThumb.thumbWidth;
        }
    }

    return {
        height: height,
        width: width
    };
};


/**
 * Click-handler for the thumbs
 */
ImageViewer.prototype.setBackground = function (event) {
    var target = event.target,
        index = this.getImageIndex(target),
        url;

    if (index >= 0) {
        // Set the background-image
        url = imageURL + this.images[index].fileName;
        document.body.style.backgroundImage = "url(" + url + ")";
    }

    
};

/**
 * Returns the index of the image when called with either the image or the thumb-container
 * @param  {Element} element The element, either the thumb-container or the image itself
 * @return {Number}         Returns the index, or -1 if failed
 */
ImageViewer.prototype.getImageIndex = function (target) {

    // If container is clicked, select the image inside
    if (target.className.indexOf("thumb") > -1) {
        target = target.firstChild;
    }

    // If the image is present, open a viewer-window
    var index = target.getAttribute("data-img-index");
    if (index !== null) {
        return index;
    }
    return -1;
};

/**
 * Opens an ImageViewer-window with the clicked image
 */
ImageViewer.prototype.openSingleImage = function (event) {
    var target = event.target,
        index = this.getImageIndex(target);

    if (index >= 0) {
        new ImageViewer(this.images[index]);
    }

};

}());




