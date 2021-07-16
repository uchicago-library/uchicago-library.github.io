# Introduction

The purpose of this specification is to describe a small software
project that a DLDC staff member can try to build from scratch, in
order to acquaint themselves with the [Django web
framework](https://www.djangoproject.com/).  It's set up to get you
comfortable writing a web application in the model-template-view (MVT)
paradigm.

If you aren't sure how to get started, our suggestion is:

* map out how you think the app would work on the whiteboard, in
  English rather than in code
  * what are all the things it needs to do?
  * how is it going to need to organize simple data into more complex
    packages?
  * what will the user see / be able to do when they log in and look
    at it?
* make the most minimal possible version of what you described on the
  whiteboard---like, literally as simple as making one page with one
  button that does one thing
* then, step by step, add one feature at a time to that minimal
  working sketch until the app has all the features you originally
  imagined it would have
* this way, you can troubleshoot each new feature individually

# A Web Application: `Recipe Tracker`

## Features / User Stories

### Overview

At a high level, `Recipe Tracker` should let the user do the following:

* browse the full set of recipes that are in the app
* delete a recipe from the app'
* enter a new recipe into the app
* edit a recipe that is in the app

To get started, we recommend focusing on the first two of these
features.  The next two can be added once the first two fully work.

### Routes

A recipe should be a bundle of data containing the following
information:

* the name of the recipe, e.g. `"Poached Eggs"`
* a list of ingredients, e.g. "eggs, pepper and butter"
* a list of directions, e.g. "mix eggs into a bowl, then pour the
  mixture onto a skillet, then fry for 15 minutes"

We leave it to you, the developer, to find the best way to encode this
data in terms of what Python and Django make available.  If you aren't
100% sure how to get started, take a look at the [Django
tutorial](https://docs.djangoproject.com/en/3.2/intro/), especially
[Part 2](https://docs.djangoproject.com/en/3.2/intro/tutorial02/).  In
that tutorial, they rig up a poll question data structure, and a poll
question answer (called `Choice`), and use Django's `ForeignKey` class
to associate each question with a list of choices (i.e. answers).  You
can use that as a model for how to create something in the Django
database that looks like "entity, one of whose attributes is a list of
other entities".
