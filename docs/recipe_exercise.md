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
  whiteboard&mdash;like, literally as simple as making one page with one
  button that does one thing
* then, step by step, add one feature at a time to that minimal
  working sketch until the app has all the features you originally
  imagined it would have
* this way, you can troubleshoot each new feature individually

# A Web Application: `Recipe Tracker`

## Required Features

### Overview

At a high level, `Recipe Tracker` should let the user do the following:

* browse the full set of recipes that are in the app
* delete a recipe from the app
* enter a new recipe into the app
* edit a recipe that is in the app

The initial version of this spec will only describe the first two
features.  Once those are ready, we'll add a further section to the
spec explaining how the second two will work.

### Data Model

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

### User Interface

The user should be able to go to the root URL for the project (when
you're developing locally, that'll be `localhost:8000/`) and see:

* some sort of welcome message (e.g. 'Welcome to Recipe Tracker!')
* a two-column table displaying, for every recipe in the app:
  * a link that shows the name of the recipe
  * a link that says 'delete this recipe'

When the user clicks on the name of the recipe, that should take them
to a page displaying all the information about the recipe.  That page
should show the name of the recipe, a list of the ingredients, and a
list of directions, and end with a link saying "back to recipe list"
that takes the user back to the main list.

When the user clicks on 'delete this recipe', that should delete the
recipe from the app.  Then it should take the user to a page with a
message showing which recipe was deleted.  For example, if the recipe
the user just deleted is called 'Poached Eggs', it should say 'You
have deleted Poached Eggs' and contain a link beneath it saying 'back
to recipe list' taking the user back to the main listing.

For example, the table could look like this:

| recipe name            |                         |
| ____                   | __________              |
| [poached eggs](#)      | [delete this recipe](#) |
| [beef stroganoff](#)   | [delete this recipe](#) |
| [vegetable biryani](#) | [delete](#)             |
	

### Routes

We'll leave it to you to think about how to set up the routes, so take
this part mainly as a suggestion.  If you can think of a better way of
getting to the above user interface, by all means&mdash;pursue that
design!

One way you could set it up is like this:

* `/` is the main listing of all recipes
* `/recipes/4` is the listing displaying the recipe whose primary
  identifier is `4`
* `/recipes/4/delete` is a route you use to delete the recipe whose
  primary identifier is `4`
