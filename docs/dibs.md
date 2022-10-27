# What is DIBS?

DIBS is an open-source [controlled digital
lending](https://en.wikipedia.org/wiki/Controlled_digital_lending) web
application.  The project originates from
[Caltech](https://caltechlibrary.github.io/dibs/).

## Background

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
used by DIBS is also much closer to what we use at UChicago.

## Timeline

As of October 2022, we are hoping to deploy DIBS for testing by
December 2022 in time to begin using it for electronic course reserves
by the beginning of the Winter 2023 quarter.  Installation and setup
are fairly complex, so this document is an attempt to get the process
down in writing, so that we don't have to figure it all out again the
next time we install it.

# Components of DIBS

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
