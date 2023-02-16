# Master TODO Checklist

## Installation Rough Edges

- [ ] set up UChicago help page
- [ ] set up Bugzilla category for DIBS
- [ ] figure out whether we want an anonymous feedback form
- [x] version control the entire `dibs` project
- [x] version control the entire `dibsiiif` project
- [x] abstract `dibsiiif` config over our logging vs. Slack logging
- [x] abstract `dibsiiif` config over "upload to S3" vs. host files locally
- [x] set up `cron` job to run `dibsiiif`
- [x] configure `cron` to run `dibsiiif` in the virtualenv
- [x] set up samba share for document delivery to access `unprocessed`
- [x] add Document Delivery team as admins on `dibs-test.lib.uchicago.edu`
- [x] create a production instance of `dibs`
- [x] have our web program director enter an actual book into the app
- [x] have our document delivery services librarian try to enter a book into the app
- [x] change splash page from Caltech stuff to UChicago stuff
- [x] set up UChicago email address contact
- [x] set up stateless production deploy insfrastructure
- [x] configure production server to use `ereserves@lib.uchicago.edu` email address

# Fixes

## `dibs` fixes

- [ ] troubleshoot 404 page not displaying
- [ ] fix internal server error when it can't connect to FOLIO
- [x] turn off email confirmation
- [x] fix barcode-typecast-to-integers bug
- [ ] fix `people-manager` to check whether user exists before creating it, and introduce a key constraint in the database
- [x] remove numeric restriction on barcodes to allow for ones that start with A (for analyze series)
- [x] hide the Process button if a directory with the right barcode doesn't exist in `dibs/unprocessed/scans` (maybe gray it out)
- [x] fix barcode sort
- [x] fix checkbox/process button sort
- [ ] if there is a field missing, have the error message say that rather than "Problem with XXX barcode in FOLIO"
- [ ] make author/title/year/publisher fields optional
- [x] :pray: don't refresh the page when you click a checkbox
- [ ] :pray: give user the ability to delete the *-problem file within DIBS
- [ ] :pray: replicate "add new item" and "manage item list" at the top of the item listing page
- [x] :hourglass: there should be a way to display the contents of the *-problem file (perhaps on hover over the red exclamation mark)
- [x] :hourglass: optimize add-then-process workflow, maybe with an alert that says the title of the item you just added, plus a Process button for it
- [ ] :hourglass: add "date added" field to DB and listing
- [ ] :hourglass: have DIBS auto-detect what files are in `dibs_dropoff` on the server
- [ ] :hourglass: determine what is going on with the stats
- [ ] :hourglass: investigate more efficient workflow for loading new items in
- [ ] :hourglass: enable OCR via IIIF
- [ ] :pray: :hourglass: get DIBS to figure out how to refresh the FOLIO token
- [ ] :pray: :hourglass: delete button, please, please, please
- [x] :pray: :hourglass: search items by any of the fields in the listing
- [ ] :pray: :hourglass: add volume information for multi-volume items to the listing 

### `pokapi` fixes

- [ ] make author/title/year/publisher optional
- [ ] grab volume information

### `dibsiiif` fixes

- [ ] make logging backend configurable
- [ ] make use of Amazon S3 configurable
- [ ] make IIIF image server configurable (extensions)
- [ ] bump commonpy to version 1.3.10 in `requirements.txt`
- [ ] require the *-initiated file to exist before checking that the *-processing file exists
- [ ] rename *-initiated to *-processing, rather than create a new *-processing file and erase the *-initiated file
- [x] hush the `RichTIFFIPTC` warnings from `vips`, since they don't seem to matter
- [ ] `dibsiiif` should delete the *-processing file when it creates the *-problem file
- [ ] capture stderr and write it to log output on all system calls (so as to capture the VIPS and any other OS-level errors)
- [ ] modify iiifify.sh to process one *-initiated file at a time (the oldest)

# PRs

## `dibs` PRs

- [ ] troubleshoot 404 page not displaying
- [ ] fix internal server error when it can't connect to FOLIO
- [ ] boolean toggle in configuration indicating whether you want an email confirmation
- [ ] fix confirmation email bug: it crashes when it sees a Unicode accent
- [ ] fix barcode-typecast-to-integers bug
- [ ] fix `people-manager` to check whether user exists before creating it, and introduce a key constraint in the database
- [ ] remove numeric restriction on barcodes to allow for ones that start with A (for analyze series)
- [ ] hide the Process button if a directory with the right barcode doesn't exist in `dibs/unprocessed/scans` (maybe gray it out)
- [ ] fix barcode sort
- [ ] fix checkbox/process button sort
- [ ] if there is a field missing, have the error message say that rather than "Problem with XXX barcode in FOLIO"
- [ ] make author/title/year/publisher fields optional
- [ ] :pray: don't refresh the page when you click a checkbox
- [ ] :pray: give user the ability to delete the *-problem file within DIBS
- [ ] :pray: replicate "add new item" and "manage item list" at the top of the item listing page
- [ ] :hourglass: there should be a way to display the contents of the *-problem file (perhaps on hover over the red exclamation mark)
- [ ] :hourglass: optimize add-then-process workflow, maybe with an alert that says the title of the item you just added, plus a Process button for it
- [ ] :hourglass: add "date added" field to DB and listing
- [ ] :hourglass: have DIBS auto-detect what files are in `dibs_dropoff` on the server
- [ ] :hourglass: determine what is going on with the stats
- [ ] :hourglass: investigate more efficient workflow for loading new items in
- [ ] :hourglass: enable OCR via IIIF
- [ ] :pray: :hourglass: get DIBS to figure out how to refresh the FOLIO token
- [ ] :pray: :hourglass: delete button, please, please, please
- [ ] :pray: :hourglass: search items by any of the fields in the listing
- [ ] :pray: :hourglass: add volume information for multi-volume items to the listing 

### `pokapi` PRs

- [ ] make author/title/year/publisher optional
- [ ] grab volume information

### `dibsiiif` PRs

- [ ] make logging backend configurable
- [ ] make use of Amazon S3 configurable
- [ ] make IIIF image server configurable (extensions)
- [ ] bump commonpy to version 1.3.10 in `requirements.txt`
- [ ] require the *-initiated file to exist before checking that the *-processing file exists
- [ ] rename *-initiated to *-processing, rather than create a new *-processing file and erase the *-initiated file
- [ ] hush the `RichTIFFIPTC` warnings from `vips`, since they don't seem to matter
- [ ] `dibsiiif` should delete the *-processing file when it creates the *-problem file
- [ ] capture stderr and write it to log output on all system calls (so as to capture the VIPS and any other OS-level errors)
- [ ] modify iiifify.sh to process one *-initiated file at a time (the oldest)

## Notes toward accomplishing the TODOs

### Checkbox issue:

- checking a checkbox jumps you back to the top of the page because
  triggers an ht.ml form action that does a post request back to
  `/list/ready`
- possible fixes:
  - easiest: put target links in each item in the listing, then do
	post request back to `/list/ready#target_link`
	- this will reload the page, but bop you back over to where the
	  item is
 - harder but probably better:
   - make them actual checkboxes in a single form, rather than making
	 each one a separate form with an action
	 - how much of a hassle this is will depend on the reason they
	   decided to make the checkboxes forms rather than actual
	   checkboxes

### Hiding the Process button

- see line 78 of `dibs/templates/list.tpl`, where there's conditional
  logic in Python governing the behavior of the icons in the listing
- the Python code embedded in the template can check the filesystem
  for stuff
- so we could probably add a conditional branch to this to have it
  check the filesystem

### Getting Volume Info

- this will likely involve a PR to the `pokapi` project
- in the source for `pokapi`, line 169 of `pokapi/folio.py`, lies the
  code where the author and title info is pulled out of the JSON
  response from FOLIO
- probably all we'd have to do here within `pokapi` is get it to put
  volume info in the response
- this can most likely be grabbed from the `enumeration` field in the
  response from the Okapi API
- then we need to modify `dibs` at the same time, so that it can grab
  that info out of the FOLIO response and put it in the table
  
### Making Author/Title/Year/Publisher Optional

- in all likelihood, this is a similar workflow to getting volume info
- one PR to `pokapi`
- then another to `dibs`
  
### Sorting Issues

- DIBS does sorting of the item list using bootstrap, which has jQuery
  code that looks for certain HTML attributes on certain DOM elements

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
- `dibsiiif`, a utility to format scanned images for display in a IIIF
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

The IIIF manifests contain all metadata for each book, as well as URLs
to the images to be served up.

### Restricting Access

DIBS uses the following trick to give the app itself full access to
all the books, but to restrict access to users.  The application knows
the paths to the manifests and the image files on disk, but the URL
routes it exposes are not the actual paths on disk to the manifests or
image files.  The manifests and image files are located on an NFS
mount that is shared between the `dibs`, `dibsiiif`, and the IIIF
image server, but which is neither open to the WAN nor to most of the
library's local network.

Universal Viewer won't make the information about which IIIF image
server URLs it is sending HTTP requests to available through the
browser.  Our system administrators can determine that information by
examining the Apache logs on that machine, but of course that
information is not open to the public.  So the data are pretty
protected.

## Installation

The first step is to set up all the software on [the list
above](#components-of-dibs) on your production servers.  Currently, we
are using three servers:

- one to run IIPImage
- one to run `dibs` and `dibsiiif`
- one for NFS shares

The first is `crimson`, the second is `marble`, and the third is
`voldemort`.  `crimson` and `marble` both have the same NFS fileshare
mounted at `/data/local`.  The fileshare contains:

- the TIFF scans that have yet to be processed (`unprocessed/scans`)
- the manifests for the books (`manifest`)
- copies of the TIFF scans that have already been processed (`processed/scans`)
- all processed TIFFs (`processed/iiif/1`)
- thumbnails for each book (`thumbnails`)
- status files that coordinate information between `dibsiiif` and
  `dibs`

Next, we'll walk through how to install each of the components of
DIBS:

### `dibsiiif`

`dibsiiif` can be installed by pulling the latest code down from
GitHub:

https://github.com/caltechlibrary/dibsiiif

In our case, we work with a fork of that repository, to be able to
hack on our customizations and submit the periodic pull request to the
main project at Caltech:

https://github.com/uchicago-library/dibsiiif

`dibsiiif` expects a Python virtual environment.  No specific Python
version requirement is stated on the `dibsiiif` GitHub page, but we
have been using Python 3.9 with no issues.

To create the virtual environment on your DIBS server:

```
$ python -m venv /path/to/virtual/environment
```

To install Python dependencies:

```
$ cd path/to/project/root
$ pip install -r requirements.txt
```
#### Configuration

Next, it will be necessary to create a config file.  The config file
for `dibsiiif` is called `settings.ini` and you can use the example
template to get started with it:

```
$ cp settings-example.ini settings.ini
```

### `dibs`

#### Setting up email

We have our constants in `settings.ini` configured like so:

```
MAIL_HOST   = hedwig.lib.uchicago.edu
MAIL_PORT   = 25
MAIL_SENDER = ereserves@lib.uchicago.edu
```
