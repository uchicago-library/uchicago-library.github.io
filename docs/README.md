# Checklists & Documentation
## Developer
### GitHub Tickets & Pull Requests
#### Once the developer choses a ticket to resolve:
1. Name your code branch to match the ticket.
    * For example, an issue titled `Flux Capacitor Bug #180` would have a branch named `180-Flux-Capacitor-Bug`.
2. Create the pull request that corresponds with an issue.
    * Do not add an approver yet, but add any project tags needed.
    * If using command line: After making the branch you have to push it to origin <branch-name> before making the pull request.
3. Work on the code :sparkles:

**Remember to do the following, if your changes call for it**
- Make migrations
   - `./manage.py makemigrations`
   - `./manage.py migrate`
- Generate fixtures
   - **Warning:** Must be done from the Vagrant version of the site, should never be done from a site running a full production database dump
   - `./manage.py dumpdata --natural-foreign --natural-primary --exclude wagtailcore.GroupCollectionPermission > base/fixtures/test.json`
- Collect Static
   - `./manage.py collectstatic`
- Compress
   - `./manage.py compress`

#### When Code is ready to review, the Developer:
1. Push changes to your branch
2. Add a reviewer to the pull request
    * This lets the team know we're dealing with merge-ready code.
    * Reviewer will be alerted to the required task via email.

#### Once the pull request is reviewed, the Reviewer:
1. Selects the "Approve" option from the pull request dialog
2. Adds the "ready to merge" tag to the pull request
    * Reviewer can also add comments and requests changes before approving pull request

#### Once pull request is approved, the Developer:
1. Merges the code into master
2. Tells the lead to push the code into production
---
## Designer
### ADA
* [General ADA Standards](ada.md)
* [ADA for websites: Resources](code-resources.md#documentation)

### [Print](print-checklist.md)
* [Door Signs](print-checklist.md#door-signs)
* [Stanchion Poster](print-checklist.md#stanchion-poster)
* [Tall Banner](print-checklist.md#tall-banner)

### [Web](web-checklist.md)
* [Front-end](web-checklist.md#front-end-checklist)
* [Back-end](web-checklist.md#back-end-checklist)
* [Frequently used code and resources](code-resources.md)
