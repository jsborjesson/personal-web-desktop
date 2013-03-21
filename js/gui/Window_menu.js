(function () {
"use strict";
/*global JAWM */

// Dependencies
var Window = JAWM.gui.Window;

// Close all dropdowns
document.addEventListener("click", function (e) {
    // Get all menus
    var menus = document.getElementsByClassName("window-sub-menu");
    
    // Make sure they are closed
    for (var i = 0; i < menus.length; i++) {
        menus[i].style.display = "none";
    }
}, false);

Window.prototype.createMenuDropdown = (function () {

    // Create the outer li (the button always visible)
    function createTopMenuList(name) {
        var wrapper = document.createElement("li");
        var link = document.createElement("a");
            
        wrapper.className = "window-top-menu";

        // Stop propagation to the close-event
        wrapper.addEventListener("click", function (e) {
            e.stopPropagation();
        }, false);

        link.appendChild(document.createTextNode(name));
        link.href = "#";
        wrapper.appendChild(link);

        // Make the list collaplsable
        link.addEventListener("click", function (e) {
            var menu = this.nextSibling; // TODO check this

            // Show or hide the menu
            if(menu.style.display === "none") {
                menu.style.display = "";
            } else {
                menu.style.display = "none";
            }

            // Stop the event from bubbling to the closing-function
            e.stopPropagation();
        }, false);
        
        return wrapper;
    }

    // Create a menu-option
    function createMenuOption(option) {
        var li = document.createElement("li"),
            a = document.createElement("a");

        a.href = "#";
        a.appendChild(document.createTextNode(option.name));
        a.addEventListener("click", option.fn, false);
        li.appendChild(a);

        return li;
    }

    // Create a list of menu-options
    function createMenuList(options) {
        var option,
            element,
            list = document.createElement("ul");

        list.className = "window-sub-menu";
        list.style.display = "none"; // hidden by default

        // Append all options to the ul-tag
        for (var i = 0; i < options.length; i++) {
            option = options[i];
            element = createMenuOption(option);

            list.appendChild(element);
        }
        return list;
    }


    /**
     * Creates a dropdown-menu on a window
     * Can be called with for example ("title", [{}, {}]) or ("title", {}, {}, {})
     * @param  {String} title   The title of the menu
     * @param  {Array} options Array of objects, or just objects
     * Each object must be constructed like this:
     * {
     *     name: {String}, // Name of the option
     *     fn: {Function} // Function called when the option is selected
     * }
     */
    return function (title, options) {
        var top, list;

        // If options are not enclosed in []
        // Make all arguments after the title into an array.
        // Now you can call the function with both ("title", [{},{}]) and ("title", {}, {})
        if (!(options instanceof Array)) {
            // Convert arguments to proper array
            options = Array.prototype.slice.apply(arguments);

            // "pop" the title
            title = options.shift();
        }
        
        // Create the menu
        top = createTopMenuList(title);
        list = createMenuList(options);

        top.appendChild(list);

        this.elem.menuList.appendChild(top);
    };



}()); // End Window.menu




}()); // End local scope
