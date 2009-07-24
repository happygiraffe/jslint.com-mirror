#!/bin/sh
#
# Update the mirror of jslint.com.
#

me=`basename $0`
tmpf=`mktemp -t $me`
trap "rm -f $tmpf" EXIT HUP INT QUIT TERM

wget --quiet --mirror http://www.jslint.com/

cd www.jslint.com
git ls-files --others --modified >$tmpf
if [ -s $tmpf ] ; then
    xargs git add <$tmpf
    xargs git commit -m 'Import latest www.jslint.com.' <$tmpf
fi
