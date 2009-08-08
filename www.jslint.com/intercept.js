// intercept.html
// 2009-08-07

// This file makes it possible for JSLint to run as an ADsafe widget by
// adding lib features.

// It provides a JSON cookie facility. Each widget is allowed to create a single
// JSON cookie.

// It also provides a way for the widget to call JSLint. The widget cannot
// call JSLint directly because it is loaded as a global variable. I don't
// want to change that because other versions of JSLint depend on that.

/*jslint nomen: false */

/*global ADSAFE, document, JSLINT */

/*members ___nodes___, _intercept, cookie, edition, get, indexOf,
    innerHTML, jslint, length, parse, replace, report, set, slice,
    stringify
*/


"use strict";
ADSAFE._intercept(function (id, dom, lib, bunch) {

// Give every widget access to a cookie. The name of the cookie will be the
// same as the id of the widget.

    lib.cookie = {
        get: function () {

// Get the raw cookie. Extract this widget's cookie, and parse it.

            var v,
                c = ' ' + document.cookie + ';',
                s = c.indexOf((' ' + id + '='));
            if (s >= 0) {
                s += id.length + 2;
                v = JSON.parse(c.slice(s, c.indexOf(';', s)));
            }
            return v;
        },
        set: function (value) {

// Set a cookie. It must be under 2000 in length. Escapify equal sign
// and semicolon if necessary.

            var text = JSON.stringify(value)
                .replace(/[=]/g, '\\u003d')
                .replace(/[;]/g, '\\u003b');

            if (text.length < 2000) {
                document.cookie = id + "=" + text;
            }
        }
    };
});

ADSAFE._intercept(function (id, dom, lib, bunch) {
    if (id === 'JSLINT_') {
        lib.jslint = function (source, options, output) {
            JSLINT(source, options);
            output.___nodes___[0].innerHTML = JSLINT.report();
        };
        lib.edition = function () {
            return JSLINT.edition;
        };
    }
});
