/**
 * This file needs to be included before all other files that use
 * the JAWM global object.
 */

// Create top-level namespace
var JAWM = JAWM || {};

/**
 * Creates a namespace within the parent object from a string.
 * Example: JAWM.extend("one.two.three").fn = function () {};
 *
 * @param  {String} namespace   Example: "JAWM.one.two.three", alternatively "one.two.three".
 * @param  {Object} obj         A function or object to assign to the namespace.
 * @return {Object}             The innermost object, in this example JAWM.one.two.three.
 */
JAWM.extend = function (namespace) {

    // Get all the levels of the namespace
    var libs = namespace.split("."),
        parent = JAWM,
        len, i;

    // Check if top-level namespace is included
    if (libs[0] === "JAWM") {
        libs.splice(0, 1); // Remove top-parent namespace
    }
    len = libs.length;

    // Create all necessary levels
    for (i = 0; i < len; ++i) {

        // Create a new level in the namespace, if needed
        parent[libs[i]] = parent[libs[i]] || {};

        // Travel down a level for the next iteration
        parent = parent[libs[i]];
        
    }

    return parent;
};
