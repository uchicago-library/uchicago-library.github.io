# Checklist for getting to production

## TODOs

- [ ] version control `dibs-0.6.1/settings.ini`
- [ ] version control the entire `dibsiiif` project
- [ ] abstract `dibsiiif` config over our logging vs. Slack logging
- [ ] abstract `dibsiiif` config over "upload to S3" vs. host files locally
- [ ] create logging PR
- [ ] create "upload vs. don't" PR
- [ ] set up `cron` job to run `dibsiiif`
- [ ] set up samba share for document delivery to access `unprocessed`
- [ ] create a production instance of `dibs`
- [ ] have our web program directory enter an actual book into the app
- [ ] have our document delivery services librarian try to enter a book into the app
- [ ] set up stateless production deploy insfrastructure

# Potential Problems

- `iiifify.sh` says, in a comment, that it should be run once per minute.
  - What if it takes longer than a minute to finish converting a big
    book to pyramid TIFFs?
- Say `dibsiiif` runs in cron once per minute.
  - What if someone from document delivery is in the middle of copying
    a directory full of TIFFs over when it runs?

# General Reference

## What is DIBS?

DIBS is an open-source [controlled digital
lending](https://en.wikipedia.org/wiki/Controlled_digital_lending) web
application.  The project originates from
[Caltech](https://caltechlibrary.github.io/dibs/).

### Background

A number of open-source controlled digital lending applications sprung
up during the 2020 pandemic, due to a need for continuing to have
course reserve materials available when university libraries were in
general not open for use by patrons.

In the fall of 2020, we looked into several different possibilities
and ended up using
[G-CDL](https://github.com/Fordham-University-Libraries/G-CDL), a PHP
and Angular-based application that uses Google Drive to manage access
to copyrighted materials.  As of 2022, however, we are looking to
switch to DIBS, in large part due to the fact that the lead developer
of G-CDL is no longer actively developing the project.  The tech stack
used by DIBS is also much closer to what we use at the UChicago
library.

### Timeline

As of October 2022, we are hoping to deploy DIBS for testing by
December 2022 in time to begin using it for electronic course reserves
by the beginning of the Winter 2023 quarter.  Installation and setup
are fairly complex, so this document is an attempt to get the process
down in writing, so that we don't have to figure it all out again the
next time we install it.

## Components of DIBS

DIBS has a number of moving parts.  To start, it consists of two
separate applications:

- the DIBS web app
- `dibsiiif` a utility to format scanned images for display in a IIIF
  viewer
  
Jointly, these two applications also require the following
applications to be set up:

- `vips`, a command line image processing tool
- an [SSO service](https://en.wikipedia.org/wiki/Single_sign-on), to
  manage user accounts and permissions
- a [IIIF image server](https://iiif.io/get-started/image-servers/)
- Python 3
- an LSP, either FOLIO or TIND
- Apache, via WSGI

Finally, it requires there to be some scheme for running the
`dibsiiif` utility on the backend so that the processed IIIF images,
with the expected filenames and directory structure, end up where the
DIBS web app expects them, without the DIBS web app making any of
those paths available as URL routes.  If it were to make those paths
available as URL routes, the copyrighted material would effectively be
viewable by anyone for any amount of time.

## How DIBS works

### Displaying Each Book

DIBS uses IIIF to display the pages of each scanned book.  With IIIF,
it isn't as simple as a book consisting of a single-file PDF, or
anything like that.  Rather, a single book exists as:

- [pyramid TIFFs](https://www.loc.gov/preservation/digital/formats/fdd/fdd000237.shtml)
  in a directory named after the book's barcode, which are served up
  by the IIIF image server
- a IIIF manifest, which is a piece of JSON with a specific structure
  that contains:
  - basic metadata for the book
  - URLs to the images for each page of the book, served up by the
    image server
	
"Pyramid TIFF" is just a term for a TIFF that has been converted to
the exact format that the IIIF image server expects.

[Universal Viewer](https://universalviewer.io/) is a Javascript
application that will take the URL to a IIIF manifest as an input, and
create a feature-rich in-browser document viewer that displays the
book corresponding to the that manifest.  There are other IIIF
document viewers as well, such as
[Mirador](https://projectmirador.org/), but Universal Viewer is the
one that DIBS uses.

### Restricting Access

DIBS uses the following trick to give the app itself full access to
all the books, but to restrict access to users.
