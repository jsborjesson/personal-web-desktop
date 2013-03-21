(function () {
"use strict";
/*global JAWM */


/**
 * Window super-"class"
 * @param {String} title The title of the window
 * @param {Object} size  The width and height of the content-area.
 */
var Window = JAWM.extend("gui").Window = function (title, width, height, icon) {
    var that = this;


    // Create DOM-elements
    this.createElements();

    // Declare properties
    this.icon = icon;
    this.content = this.elem.content; // shorthand
    this.onclose = null; // Closing preparation set by children

    // Set listeners
    this.elem.closeButton.addEventListener("click", function () {
        that.close();
    }, false);

    this.elem.parent.addEventListener("mousedown", function () {
        that.gainFocus();
    }, false);

    // Set the properties of the window
    this.setLoadingState(false);
    this.resizable(false);
    this.showMenu(false);
    this.setSize(width, height);
    this.setTitle(title);
    this.setIcon(icon);
    this.gainFocus();
    
};

Window.prototype.setStartingPosition = (function () {

    // Pixels to offset the window
    var offset = 30;

    // The starting-position of the window
    var pos = {
        x: 0,
        y: 0
    };

    return function () {
        var size = this.getTotalSize();

        if (pos.y + size.height >= window.innerHeight ||
            pos.x + size.width >= window.innerWidth) {
            pos = {x: 0, y: 0};
        }

        // Set the position
        this.setPosition(pos);

        // Offset the values
        pos.x += 20;
        pos.y += 20;

    };
}());


/**
 * Show the window (add it to DOM)
 */
Window.prototype.show = function () {
    // Add the element to the page
    document.body.appendChild(this.elem.parent);

    // Position it
    this.setStartingPosition();
};

/**
 * Close the window (remove it from DOM)
 */
Window.prototype.close = function () {
    if (typeof(this.onclose) === "function") {
        this.onclose();
    }
    document.body.removeChild(this.elem.parent);
};

/**
 * Set the text in the status-bar.
 * @param {String} text The text to be set.
 */
Window.prototype.setStatusText = function (text) {
    this.elem.statusText.innerHTML = text;
};

/**
 * Shows or hides the loading-icon
 * @param {Boolean} isDisplaying Whether to display the icon
 */
Window.prototype.setLoadingState = function (isLoading) {
    // Status-bar
    this.elem.loadingIcon.style.display = isLoading ? "block" : "none";

    // Cursor
    this.elem.content.style.cursor = isLoading ? "wait" : "auto";
};

/**
 * Set the icon in the title-bar
 * @param {String} url Path to icon
 */
Window.prototype.setIcon = function (url) {
    this.elem.icon.style.backgroundImage = "url(" + url + ")";
};

/**
 * Set the size of the content-area of the window.
 * @param {Number} width  Width of the content-area.
 * @param {Number} height Height of the content-area.
 */
Window.prototype.setSize = function (width, height) {
    // TODO validation
    width = width || 300;
    height = height || 300;

    this.elem.content.style.width = width + "px";
    this.elem.content.style.height = height + "px";
};

Window.prototype.getSize = function () {
    return {
        width: parseInt(this.elem.content.style.width, 10),
        height: parseInt(this.elem.content.style.height, 10)
    };
};

Window.prototype.getTotalSize = function () {
    var style = getComputedStyle(this.elem.parent, null);
    return {
        width: parseInt(style.getPropertyValue("width"), 10),
        height: parseInt(style.getPropertyValue("height"), 10)
    };
};

/**
 * Set the position of the window
 * @param {Number} x coordinate
 * @param {Number} y coordinate
 * OR
 * @param {Object} containing x and y properties
 */
Window.prototype.setPosition = function () {

    // TODO Validation
    var x, y;

    // Called with (x, y)
    if (arguments.length === 2) {
        x = arguments[0];
        y = arguments[1];
    }

    // Calledd with ({x, y})
    else if (arguments.length === 1) {
        x = arguments[0].x;
        y = arguments[0].y;
    }

    // Called with 0 or >2 arguments
    else {
        return;
    }

    this.elem.parent.style.left = x + "px";
    this.elem.parent.style.top = y + "px";
};

/**
 * Returns position of the window
 * @return {Object} x and y-positions of the element
 */
Window.prototype.getPosition = function () {
    return {
        x: parseInt(this.elem.parent.style.left, 10),
        y: parseInt(this.elem.parent.style.top, 10)
    };
};

/**
 * Set the title of the window.
 * @param {String} title The title to be set.
 */
Window.prototype.setTitle = function (title) {
    this.elem.titleText.innerHtml = "";
    this.elem.titleText.appendChild(document.createTextNode(title));
};

/**
 * Sets the z-index
 * @param {Number} index The z-index to be set.
 */
Window.prototype.setZIndex = function (index) {
    index = parseInt(index, 10);
    if (!isNaN(index)) {
        this.elem.parent.style.zIndex = index;
    }
};

/**
 * Get the z-index of the window
 * @return {Number} Z-index-property, 0 if not present.
 */
Window.prototype.getZIndex = function () {
    var index = this.elem.parent.style.zIndex;
    return index ? index : 0;
};

/**
 * Makes the calling window the topmost window
 */
Window.prototype.gainFocus = (function () {
    var counter = 0;

    return function (that) {
        this.setZIndex(counter++);
    };
}());

/**
 * Show and hide the menu
 * @param  {Boolean} show False to hide, true or undefined to show.
 */
Window.prototype.showMenu = function (show) {
    if (show === undefined) {
        show = true;
    }

    this.elem.menu.style.display = show ? "block" : "none";
};

Window.prototype.resizable = function (resizable) {
    if (resizable === undefined) {
        resizable = true;
    }

    this.elem.resizeButton.style.display = resizable ? "block" : "none";
};

/**
 * Create all DOM-elements required to build the window
 * @return {Object} An object containing references to all the properties.
 */
Window.prototype.createElements = function () {

    // Container object for the elements
    this.elem = {};
    var e = this.elem;

    // Parent div
    e.parent = document.createElement("div");
    e.parent.className = "window-parent";

    // Titlebar
    e.titlebar = document.createElement("div");
    e.titlebar.className = "window-titlebar";

        // Icon
        e.icon = document.createElement("div");
        e.icon.className = "window-icon";
        e.titlebar.appendChild(e.icon);

        // Title-text
        e.titleText = document.createElement("span");
        e.titleText.className = "window-title-text";
        e.titlebar.appendChild(e.titleText);

        // Close-button
        e.closeButton = document.createElement("div");
        e.closeButton.className = "close-button";
        e.titlebar.appendChild(e.closeButton);

    e.parent.appendChild(e.titlebar);

    // Menu-bar
    e.menu = document.createElement("div");
    e.menu.className = "window-menu";
        e.menuList = document.createElement("ul");
        e.menuList.className = "window-menu-list";
        e.menu.appendChild(e.menuList);
    e.parent.appendChild(e.menu);
    
    // Content
    e.content = document.createElement("div");
    e.content.className = "window-content";
    e.parent.appendChild(e.content);

    // Footer
    e.footer = document.createElement("div");
        // Loading-icon
        e.loadingIcon = document.createElement("div");
        e.loadingIcon.className = "loading-icon";
        e.footer.appendChild(e.loadingIcon);

        // Status-text
        e.statusText = document.createElement("span");
        e.statusText.className = "status-text";
        e.footer.appendChild(e.statusText);

        // Resize-button
        e.resizeButton = document.createElement("div");
        e.resizeButton.className = "resize-button";
        e.footer.appendChild(e.resizeButton);
    e.footer.className = "window-footer";
    e.parent.appendChild(e.footer);

};



}()); // End local scope
