// rhino.js
// 2009-06-04
/*
Copyright (c) 2002 Douglas Crockford  (www.JSLint.com) Rhino Edition
*/

// This is the Rhino companion to fulljslint.js.

/*extern JSLINT */
/*jslint rhino: true*/

(function (a) {
    if (!a[0]) {
        print("Usage: jslint.js file.js");
        quit(1);
    }
    var input = readFile(a[0]);
    if (!input) {
        print("jslint: Couldn't open file '" + a[0] + "'.");
        quit(1);
    }
    if (!JSLINT(input, {bitwise: true, eqeqeq: true, immed: true,
            newcap: true, nomen: true, onevar: true, plusplus: true,
            regexp: true, rhino: true, undef: true, white: true})) {
        for (var i = 0; i < JSLINT.errors.length; i += 1) {
            var e = JSLINT.errors[i];
            if (e) {
                print('Lint at line ' + (e.line + 1) + ' character ' +
                        (e.character + 1) + ': ' + e.reason);
                print((e.evidence || '').
                        replace(/^\s*(\S*(\s+\S+)*)\s*$/, "$1"));
                print('');
            }
        }
        quit(2);
    } else {
        print("jslint: No problems found in " + a[0]);
        quit();
    }
}(arguments));