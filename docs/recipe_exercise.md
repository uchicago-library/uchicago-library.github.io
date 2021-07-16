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

