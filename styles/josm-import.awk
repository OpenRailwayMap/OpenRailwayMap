{
	if ($0 ~ /@import/) {importfile=gensub(/@import url\("([^"]+)"\);/, "\\1", "g")
		while ((getline line < importfile) > 0)
			print line
		close(importfile)
	} else
		print
}
