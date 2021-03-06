# Introduction

This document is intended to help walk DLDC staff through the process
of creating a new digital collections page.  Currently, the majority
of the Library's digital collections are on standalone websites
created in different ways using different frameworks by different
people.  The purpose of the framework outlined here is to provide a
way to fold all those digital collections websites into a single,
centralized web app---our Wagtail site, which is the main library
website you see when you go to www.lib.uchicago.edu.

The [Guide](#guide) section is intended as a quick walkthrough to get
you going bringing a new digital collection on board.  The
[Reference](#reference) section provides a more comprehensive
explanation of the various parts of our digital collections framework,
and is intended to be read on an as-needed basis rather than linearly,
i.e. if you are wondering how a specific feature works, you can look
up the section describing that feature.

# Prerequisites

These instructions assume that you are a UChicago DLDC developer
working on our `library_website` app, the source for which is located
[here](https://github.com/uchicago-library/library_website).

# Guide

 The purpose of this guide is to outline the steps necessary to onboard a new
 digital collection. Suppose that, as a DLDC staff member, you are in
 possession of a digital collection that you would like to create a collection
 page for. You will need to go through the following steps:

* load all the collection data onto our Mark Logic server
* load the relevant collection data onto our IIIF and Loris servers,
  where applicable
* populate the 'collection' panel in the Wagtail admin interface for
  that collection page
* give the models and templates for the collection page in Wagtail a
  once-over to see whether any features need to be added

## Mark Logic Preparation

The first thing to do is populate our Mark Logic database with the
collection objects, along with all the metadata we have for each
object.  Metadata for each object would include information such as:
who created it, when was it created, who is the publisher, what
geographic regions does it cover (if applicable), etc.

[Mark Logic](https://www.marklogic.com/) is a NoSQL database with
key-value lookup and RDF graph capabilities.  We are using our Mark
Logic database as a 'source of truth' for most of our digital
collections, with one or two exceptions where that is not feasible.
The Mark Logic record for any given object should contain all the
information that we have about it (and are planning to use).

If you would like to add a new digital collection to our Mark Logic
database, please contact [Charles
Blair](https://www.lib.uchicago.edu/about/directory/staff/charles-blair/)
and [John
Jung](https://www.lib.uchicago.edu/about/directory/staff/john-jung/) for
assistance.

## IIIF Preparation

The second step for onboarding a new collection is to set our IIIF server up.
The purpose of the IIIF server is to:

* provide the information the page uses to create its browse listings
* provide a URL the [Universal Viewer](https://universalviewer.io/)
  app can use to live-display a collection object in the collection
  page

The IIIF server provides this information in the form of JSON objects,
following the [IIIF Specification](https://iiif.io/api/).  The IIIF
browses provide groupings of collection objects under categories, and
provide a link to the IIIF manifest for each object.

If you are tasked with onboarding a new digital collection, please
contact [John
Jung](https://www.lib.uchicago.edu/about/directory/staff/john-jung/)
for assistance.  The remaining parts of this section will outline how
the IIIF server should behave, once you are done with that part of the
process.

### ARK Identifiers

Every object in our digital collections is assigned an [ARK
identifier](https://n2t.net/e/ark_ids.html).  This can be thought of
as a universal 'primary key' for looking the object up in any database
that lists it.  ARK identifiers are similar to
[DOI](https://www.doi.org/)-s, which you may have come across while
doing scholarly research.  However, one disadvantage to using a DOI as
the primary identifier for our objects is that DOI resolution is
proprietary, which means that every time you want to look an object up
by DOI, you need to use the CrossRef website.  We would prefer to be
able to look objects in our collection up without being beholden to a
third-party lookup service and whatever baggage comes along with it,
in terms of performance, service outage, and compatibility-breaking
upgrades.

Simplifying somewhat, our ARK identifiers have two parts.  The prefix
is always `ark:/61001/`.  `61001` is the Name Assigning Authority
Number for the University of Chicago.  The second part is called the
[NOID](https://n2t.net/e/noid.html), and it consists of an
alphanumeric hash that uniquely identifies the object.  (I know what
you're thinking, but please keep your early 80s arcade game puns to
yourself.)

For exmaple, the ARK identifier for our [Lawndale
community](https://www.lib.uchicago.edu/collex/collections/social-scientists-map-chicago/object/b2s05v615c5v/)
map is:

```
ark:/61001/b2s05v615c5v
```

To look an object up by ARK, you should use the University of Chicago
Library's ARK resolver API, located at:

```
https://www.lib.uchicago.edu/ark:/61001/
```

To look the [Lawndale
Community](https://www.lib.uchicago.edu/collex/collections/social-scientists-map-chicago/object/b2s05v615c5v/)
map up in our ARK resolver using its ARK, simply append the NOID to
the above URL:

```
https://www.lib.uchicago.edu/ark:/61001/b2s05v615c5v
```

This permanent URL will take you to the webpage for that collection
object, in perpetuity.  For more information on how our ARK resolver
works, please see [the official
documentation](https://dldc.lib.uchicago.edu/local/ldr/ark.html).

### IIIF: Routing Scheme

We use the hostname `iiif-collection.lib.uchicago.edu` in production
and the hostname `iiif-collection-dev.lib.uchicago.edu` for
development.  The workflow is to test upgrades/changes to the way the
IIIF data are formatted on the development server, then move them over
to the production server once we're convinced they work.  In the
examples that follow, we will presume the production hostname.

We use a 'slugified' version of the collection name as the root path
for a collection's browses in IIIF.  'Slugified' means that all
capital letters are lowercased and all space characters are changed to
hyphens.  For instance, if the name of your collection is 'Digital
Media Archive', then the slugified name should be
`digital-media-archive`.

### IIIF: Browse Type Route

The routing scheme for a cluster browse type in IIIF is as follows:

```
https://iiif-collection.lib.uchicago.edu/[NAME OF COLLECTION]/cluster-browse/[NAME OF BROWSE TYPE].json
```

An actual example of such a URL route would be:

```
https://iiif-collection.lib.uchicago.edu/social-scientists-map-chicago/cluster-browse/decade.json
```

All the browse type routes you set up in IIIF should look like that.

### IIIF: Browse Route

The routing scheme for a cluster browse type in IIIF is as follows:

```
https://iiif-collection.lib.uchicago.edu/[NAME OF COLLECTION]/cluster-browse/[NAME OF BROWSE TYPE]/[NAME OF BROWSE].json
```

An actual example of such a URL route would be:

```
https://iiif-collection.lib.uchicago.edu/social-scientists-map-chicago/cluster-browse/decade/1930s.json
```

All the browse routes you set up in IIIF should look like that.

### IIIF: Object Manifest Route

The main source of information on a digital collection object in IIIF is the
manifest.  Object manifests on our IIIF server are not split up by
collection; they are accessed only by their ARK identifier.

The hostname, as always, is `iiif-collection.lib.uchicago.edu`.  The route
for viewing an object manifest is:

```
https://iiif-collection.lib.uchicago.edu/object/[ARK IDENTIFIER].json
```

So, for instance, the URL for the IIIF manifest for our [Brighton
Park](https://www.lib.uchicago.edu/collex/collections/social-scientists-map-chicago/object/b2qd0bb4kk01/)
map is as follows:

```
https://iiif-collection.lib.uchicago.edu/object/ark:/61001/b2qd0bb4kk01.json
```

All the object manifest routes you set up in IIIF should look like
that.

### Create IIIF Manifests and Browses

When you're done, the IIIF server should be serving up browses and
manifests for your collection at those routes.  For more information
on setting that up, please get in touch with [John
Jung](https://www.lib.uchicago.edu/about/directory/staff/john-jung/).

## Create Wagtail Admin Panel

The third major step in setting your new digital collections page up
is to populate the relevant Wagtail admin panels for it.  Perhaps the
collection you're working on already has a page in Wagtail---if so,
its __Collection__ tab will be empty, so all you'll have to do is
populate it.  If the collection you're working on doesn't already have
a page in Wagtail, you'll need to create it and populate both the
__Content__ and __Collection__ tabs.

The purpose of the Wagtail admin panels is to provide a graphical web
interface that you can use to quickly enter all the information that's
specific to the collection you're adding.  This information will go
into the Wagtail database, and it will generate the entire collection
site from the information you provided.  That is, it will
automatically generate list and cluster browses (and, eventually, also
facets and searches), the landing page for the collection, and object
pages for all objects in the collection.  From Wagtail's point of
view, all of that is one single 'page'.

To get to the Wagtail admin interface, scroll to the bottom of any
webpage on the [main library website](https://www.lib.uchicago.edu)
and click on the link that says __Staff Login__.  This will take you
to a Shibboleth login page, which will accept your _cnetid_ and cnet
password.  Once you're logged into the admin interface, click on the
following series of `>` in the main menu, on the left of the screen:

```
  Pages > The University of Chicago Library > Collections & Exhibits > Collections
```

If the Wagtail page for your new collection doesn't yet exist, click
on `Collections`.  This will take you to a list of all our collection
pages.  To create a new page for your collection, click on `+ ADD
CHILD PAGE` under the title `Collections`, in between the `VIEW LIVE`
and `MORE` buttons.

If the Wagtail page for your collection already exists---this will
probably be the case for the majority of collections we decide to
onboard, at least in the initial stages---continue clicking through
the series of `>` in the menu until you get to the name of your
collection:

```
  Collections > [NAME OF YOUR COLLECTION]
```

Next, you can begin populating the __Collection__ tab.  The
__Content__ tab contains basic information about the collection, which
is mainly used to provide the content for the collection's landing
page and sidebar.  The __Collection__ tab contains the information
that will be used to automatically create all the list browses,
cluster browses, and object pages (and, eventually, also facets and
searches).

Next, we'll run through all the sections of the __Collection__ tab, as
of April 2021.

### Highlighted Records

This field in the panel should contain the URL to the browse that will
be used to display a preview of the first five items in the collection
on the landing page.  It's like an abbreviated browse that lets the
user jump right into browsing the collection.

Currently, we are just using the list browse for this feature; our
Wagtail model/view automatically truncates it to just show the first
five.  So for the time being, this should be a link to the IIIF list
browse for the collection you're working on.

### Citation Configuration

The digital collections object page has a menu called 'Cite This',
which appears below the viewer for the object.  Inside the viewer is a
live preview of what a citation for the relevant object would look
like, and the user can toggle between Chicago, APA, and MLA citation
styles.  The way we construct these citations is fairly complicated
and will be described in detail in the [Reference](#reference) section
of this document.

This should contain the configuration file for the citation service.
The configuration file is in `INI` format.  You shouldn't have too
much trouble getting started with it, because it is auto-populated by
default with a minimal reasonable standard configuration.  However,
you will have to edit it if you want to customize which Mark Logic
metadata fields appear in the citations for the objects in your new
collection.  The configuration file is in `INI` format; for full
information on how to edit it, please see the [Citation
Service](#citation-service) section under [Reference](#reference).

### Searches
    
When this feature is fleshed out, we'll use this section to enumerate
what types of searches the collection will offer.  For instance, maybe
we want to allow the user to search a collection by author, or by
date.

This feature is not implemented as of April 2021---so this section of
the admin panel is essentially a placeholder.

### List Browses

A list browse is a listing of every object in a collection, paginated
in increments of 25.  What makes different list browses different is
the order in which they sort the collection items.  So for example, a
date list browse might sort the items in ascending order by the date
they were released, and a title list browse might sort the items in
ascending alphabetical order of their titles.  But both browses will
contain all the items in the collection.

Once you have determined which list browses you would like to make
available in your new collection, press the `+ ADD LIST BROWSES`
button to make a list browse object, for each of the browses you are
planning to offer.

Currently, we are only using two of the fields in our list browse
objects: __Label__ and __Link text override__.  _Label_ should be a
capitalized version of the name of the list browse in IIIF.  For
instance, if the date list browse for a collection is called 'date' in
IIIF, then the list browse object you create in the Wagtail admin
interface should have `Date` for a label.

__Link text override__ tells Wagtail how to display the browse when it
links to it.  For example, the date list browse for the [Social
Scientists Map
Chicago](https://www.lib.uchicago.edu/collex/collections/social-scientists-map-chicago/)
collection is called 'date' in IIIF---Wagtail needs to know that to
pull the information about the list browse from IIIF---but the browse
displays to the reader as 'All Maps by Date'.  __Link text override__
is an optional field, so if you leave it blank, then the browse will
display under a capitalized version of its IIIF name.

### Cluster Browses

As of April 2021, cluster browses have a different structure from list
browses.  List browses go 'one level deep', because they only
correspond to different ways of sorting all items in an entire
collection.  However, cluster browses break the items in a collection
up into subcategories, and each collection potentially has different
ways we'll want to break it up into subcategories.

A cluster browse type is a way of breaking a collection up into
subcategories.  A cluster browse is the name we give each of those
subcategories.  So for instance, the [Social Scientists Map
Chicago](https://www.lib.uchicago.edu/collex/collections/social-scientists-map-chicago/)
collection has a 'subject' cluster browse type and a 'decade' cluster
browse type.  Under the 'subject' cluster browse fall a bunch of
subject-specific browses, such as 'commerce' and 'ethnic groups'.
Then there will be some number of maps that call under each of those
subject-specific browses.

The thing to remember about creating a 'cluster browse' object in the
Wagtail admin panel is that these should be /cluster browse types/, not the
browses themselves.  In other words, they should be things like 'subject' or
'decade' and not things like 'commerce' or 'ethnic groups.

Cluster browse types also have a link text override that works the
same way as the link text override in [list
browses](#list-browses). Also similarly to list browse objects,
cluster browse objects are only currently (i.e. as of April 2021)
using the __Label__ and __Link text override__ fields.

### Facets

When this feature is fleshed out, we'll use this section to enumerate
what types of facets the collection will let the user filter by.

This feature is not implemented as of April 2021---so this section of
the admin panel is a placeholder, just like [searches](#searches)
are---for now.

### Object Metadata

This is a section of the Wagtail __Collection__ panel that's worth
giving a little thought to, because it controls how metadata fields
are displayed in the object page for your new collection.  The object
page will display without it, but it will display the unexpurgated
list of every metadata field it pulls from the Mark Logic record for
that object.

The purpose of populating this part of the Wagtail admin panel is to
tell Wagtail which metadata fields, among all the metadata fields it
pulls from the Mark Logic record for the object, to actually display
in the object page.  The order of the fields matters---so if the order
of the fields in the Wagtail admin interface is 'Title, Description,
Creator', then the object page will display Title, Description, and
Creator metadata fields in that order.  Any fields you enter into the
Wagtail admin interface but which are not present in the Mark Logic
record for the collection object will simply not show up in the page.

Within each 'object metadata' object there are four fields: __Edm
field label__, __Hotlinked__, __Multiple values__, and __Link
target__.  __Hotlinked__, __Multiple values__, and __Link target__ are
currently under development (as of April 2021) and not being used in
production.

This means only the field you need to populate for the time being is
__Edm field label__.  The name of the field should:

* be the Europeana field name we have decided on in general
* have its first letter capitalized

If you have any questions about how what the name of a given metadata
field is, please get in touch with [David
Bietila](https://www.lib.uchicago.edu/about/directory/staff/david-bietila/)
and/or [Thomas
Dousa](https://www.lib.uchicago.edu/about/directory/staff/thomas-dousa/),
who are in charge of our scheme for determining how metadata fields
get named when a new collection is loaded into our Mark Logic
database.
    
### Link to External Service

This is where you decide whether the new collection you're onboarding
will feature links to other object pages on third-party websites on
its own object pages.  These links appear in the sidebar on the object
page.

The two external services we are currently linking to in our digital
collection pages are [LUNA](https://luna.lib.uchicago.edu) and [Big
Ten Academic Alliance](https://btaa.org).

Each external service link object in the Wagtail admin interface has
two fields: __Service__ and __Identifier__.  __Service__ should
contain the name of the service, as you would like it to appear in the
link text on the object page.  __Identifier__ should contain the base
URL for the collection within the service we're linking to.  For
instance, if the collection you are onboarding is [Social Scientists
Map
Chicago](https://www.lib.uchicago.edu/collex/collections/social-scientists-map-chicago/),
the __Identifier__ section of the BTAA external service link object in
that collection should be whatever BTAA has selected to be the URL for
the [Social Scientists Map
Chicago](https://www.lib.uchicago.edu/collex/collections/social-scientists-map-chicago/)
collection on their website.

That should cover everything you need to add to the __Collection__ tab
in the Wagtail admin panel for your new collection.

## The Once Over

One last thing worth doing before launch is: take a look at what the
site looks like and see whether you want to customize anything for
your new collection.  Any further customizations beyond what can be
controlled from the Wagtail admin panel should be thought of as new
features, to be implemented at the Django level in our source code.

Anyway, when you first take a look at your new collection page, you
should see the following:

* a landing page for the collection
  * this should contain a 'preview browse', showing the first 5-10 items in
	the collection at the bottom of the page
* cluster and/or list browses to get you to the objects in the collection
* an object page for each object in the collection
  * this should contain a preview of the object, in a player/viewer
  * followed by a list of metadata fields for the object below

Note any additional features you would like your collection page to
have that it doesn't, and now you're ready to start development!

# Reference

This section is intended to provide further background information on the
workings of our Digital Collections framework.

## Overview

Our digital collections framework is fairly complicated and involves a
number of systems:

* the Wagtail site
* our IIIF server
* our Loris server
* our primary and secondary ARK resolvers
* Universal Viewer, a simple standalone Javascript app
* the citation REST-ful service
* the Mark Logic server

## Components

As of April 2021, each digital collections page has three components:

* a landing page with collection highlights
* browse listings
* object pages

Let's look at how each of these components works.

### Landing Page

The landing page for a collection displays an image and blurb
describing the collection, with collection highlights underneath.  It
also features a sidebar containing:

* links to browses
* the location in the library where one can view the collection, where
  applicable
* the subject specialist for the collection
* links to related content
* links to other collections

Everything on this list except for the browses is pulled from the
Wagtail database for the collection page---specifically, the _Content_
panel in the Wagtail admin interface.  Every digital collection has
that information in it, regardless of whether it's been onboarded yet
onto our new framework.

Links to the browses are obtained in the following way.  First,
Wagtail checks whether it has any list or cluster browses for this
collection in its database.  If it does, then it automatically
generates links to those browses using the routing schema described in
the [Guide](#iiif-routing-scheme).

To display the collection highlights, it sends a `GET` request to the
URL in the _Highlighted records_ entry for the collection in the
Wagtail database.  Typically, this is a link to a list browse.  If it
gets information for displaying the highlights (images, links, basic
metadata, etc.), then it displays the first five entries it gets back.

### Browse Listings

## Wagtail: Routing Scheme

The routing scheme within Wagtail is meant to mirror the routing
scheme within IIIF.  This both makes it easier to keep track of the
routes in our minds and allows us to use the same code to generate the
links to browses/manifests and user-facing digital collections pages.

The root URL of a digital collection in Wagtail is as follows:

```
https://www.lib.uchicago.edu/collex/collections/[NAME OF COLLECTION]
```

The name of the collection should be its 'slugified' name---which is
to say, it should be the name with all letters made lowercase and all
spaces changed to hyphens.  For example, the root URL of the _Social
Scientists Map Chicago_ collection site is:

```
https://www.lib.uchicago.edu/collex/collections/social-scientists-map-chicago/
```

### Wagtail: Cluster Browse Type Route

The routing scheme for a cluster browse type in Wagtail is:

```
https://www.lib.uchicago.edu/collex/collections/[NAME OF COLLECTION]/cluster-browse/[NAME OF BROWSE TYPE]
```

For example, the route to the 'subject' cluster browse in the _Social
Scientists Map Chicago_ page is:

```
https://www.lib.uchicago.edu/collex/collections/social-scientists-map-chicago/
```
   
### Wagtail: Cluster Browse Route

The routing scheme for a cluster browse in Wagtail is:

```
https://www.lib.uchicago.edu/collex/collections/[NAME OF COLLECTION]/cluster-browse/[NAME OF BROWSE TYPE]/[NAME OF BROWSE]
```

For example, the route to the 'ethnic groups' cluster browse in the
_Social Scientists Map Chicago_ page is:

```
https://www.lib.uchicago.edu/collex/collections/social-scientists-map-chicago/cluster-browse/subject/ethnic-groups
```

### Wagtail: Object Page Route

The routing scheme for an object page in Wagtail is:

```
https://www.lib.uchicago.edu/collex/collections/social-scientists-map-chicago/object/[OBJECT NOID]
```

For example, the NOID of the 'Metropolitan Region of Chicago' map in
_Social Scientists Map Chicago_ is `b2k86bv2x025`.  Therefore, you can
view the object page for that map at the following URL:

```
https://www.lib.uchicago.edu/collex/collections/social-scientists-map-chicago/object/b2k86bv2x025
```
    
## Wagtail Admin Panel

Please see the [Guide](#guide) for more information on what the
different components of the Wagtail admin panel are for.

<!-- ** IIIF Manifests -->

<!-- ** IIIF Browses -->

<!-- *** List Browses -->

<!-- *** Cluster Browses -->

<!-- ** Landing Page -->

<!-- ** Intermediate Pages -->

<!-- *** Cluster Browses -->

<!-- *** List Browses -->

<!-- *** Searches & Facets -->

<!-- ** Object Page -->

<!-- *** Citation Service -->

<!-- **** Turtle Data -->

<!-- **** Social Media Links -->

<!-- **** LUNA/BTAA links -->

<!-- **** Physical Object -->

<!-- *** Metadata fields -->

<!-- **** Additional Fields: Permanent URL and Parent Collection -->

<!-- *** Universal Viewer -->

