# LibGuides Customization Files

Isolated files to work together with the LibApps platform. Using this repo as a central location for file tracking and back-ups.

## Styles
- nav.scss : parts of our navigation code that does not interfere with LibApps markup.
- lg-overrides.sccs : specific overrides to LibApps classes and IDs.

## Using
- lg-overrides.css is the main file: lg-overrides.sccs imports nav.scss, so only the compiled lg-overrides.css needs to be linked to from the LibApps custom CSS interface.
- html file are back-up: and in here for testing and editing purposes. The mark-up is pasted into the LibApps Look &amp; Feel interface of LibApps.