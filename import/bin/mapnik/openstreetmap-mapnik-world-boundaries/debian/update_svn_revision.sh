svnrevision=`svnversion`
svnrevision=${svnrevision/M/}

if [ -n "svnrevision" ] ; then
    perl -p -i -e "s/\(\S+\)/\(${svnrevision}\)/;" debian/changelog
fi

