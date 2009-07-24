#!/bin/sh
#
# Update the mirror of jslint.com.
#

me=`basename $0`
# The X's aren't needed on BSD/OSX, but Linux wants them.  Go figure.
tmpf=`mktemp -t $me.XXXXXX`
trap "rm -f $tmpf" EXIT HUP INT QUIT TERM

cd `dirname $0`

wget --quiet --mirror http://www.jslint.com/

cd www.jslint.com
git ls-files --others --modified >$tmpf
if [ -s $tmpf ] ; then
    xargs git add <$tmpf
    xargs git commit -m 'Import latest www.jslint.com.' <$tmpf
    # NB: If you're running this from cron, you'll probably need to
    # specify the GIT_SSH environment variable to allow pushing without
    # a password.
    git push origin master
fi
