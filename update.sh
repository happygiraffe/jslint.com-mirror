#!/bin/sh
#
# Update the mirror of jslint.com.
#

wget --mirror http://www.jslint.com/
git add www.jslint.com
git commit -m 'Import latest www.jslint.com.' www.jslint.com
