# Checklists & Documentation
## Developer: GitHub Tickets & Pull Requests
### Once the developer choses a ticket to resolve:
1. Name your code branch to match the ticket.
    * For example, an issue titled `Flux Capacitor Bug #180` would have a branch named `180-Flux-Capacitor-Bug`.
2. Create the pull request that corresponds with an issue.
    * Do not add an approver yet, but add any project tags needed.
    * If using command line: After making the branch you have to push it to origin <branch-name> before making the pull request.
3. Work on the code :sparkles:

**Remember to do the following, if your changes call for it**
- Make migrations: `./manage.py makemigrations` and `./manage.py migrate`
- Generate fixtures: `./manage.py dumpdata --natural-foreign --natural-primary --exclude wagtailcore.GroupCollectionPermission > base/fixtures/test.json`
   - **Warning:** Must be done from the Vagrant version of the site, should never be done from a site running a full production database dump
- Collect Static: `./manage.py collectstatic`
- Compress: `./manage.py compress`

### When Code is ready to review, the Developer:
1. Push changes to your branch
2. Creates pull request (if one hasn't been created already)
3. Add note to pull request that it closes X issue. For example: `Closes #180`
4. Add a reviewer to the pull request
    * This lets the team know we're dealing with merge-ready code.
    * Reviewer will be alerted to the required task via email.

### Once the pull request is reviewed, the Reviewer:
#### No Changes Needed
1. Selects the "Approve" option from the pull request dialog and clicks "submit review"
2. Adds the "ready to merge" tag to the pull request

#### Changes Needed
Reviewer can add comments and requests changes before approving pull request
1. **Reviewer** selects the "Request changes" option from the pull request dialog and clicks "submit review"
2. Reviewer adds comments either by line comments in the code diffs or as a general comment on the pull request
3. **Developer** makes changes and asks for re-review of code
4. Reviewer goes over changes. If code is OK, follows steps in "No Changes Needed"

### Once pull request is approved, the Developer:
1. Merges the code into master
2. Tells the lead to push the code into production
   - The lead could be the developer themself
   - See [Pushing to Production](https://github.com/uchicago-library/library_website/blob/master/README.md#pushing-to-production) documentation
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
