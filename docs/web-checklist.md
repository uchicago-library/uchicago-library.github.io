# Web Checklists & Documentation
View [Code Resources](code-resrouces.md) for code examples and documentation

## [Front-end Checklist](#front)
- [ ] Colors used are ADA compliant for contrast
- [ ] Sizes well when in mobile
- [ ] Items reorganize well when in mobile
- [ ] Functionality remains when zoomed-in
- [ ] Keyboard navigation supported
- [ ] Skip navigation goes to main content
- [ ] Video(s) have captioning
- [ ] Headers used correctly
- [ ] All elements have a clear visual indication that they have focus


## [Back-end Checklist](#back)
### General
- [ ] Landmarks / page regions used (Eg: `<div id="content" role="main">`)
- [ ] Title has value
- [ ] Only one `<h1>`
- [ ] No duplicate ID values
- [ ] Skip navigation is included
- [ ] Info/states conveyed by methods other than color alone
- [ ] Text has contrast ratio of 4.5:1 or greater
- [ ] `visibility: hidden;` and/or `display:none;` not used (unless item is to be hidden from ALL users)
- [ ] Print styling has been included
- [ ] em is used for viewport and font sizing

### Links and Buttons
- [ ] All links and icons can be understood out of context
- [ ] Links distinguished by a method other than color
- [ ] Icons and buttons without text have aria labels (Eg: `<button class="btn imageBtn next" aria-label="Next Image">`)

### Images
- [ ] Image(s) have alt text (or ability for user to add)
- [ ] Decorative images have empty alt tag or are included via the CSS

### Forms
- [ ] `<fieldset>` and `class="form-group"` are used
- [ ] Required elements use `<abbr title="required">*</abbr>`
- [ ] Relationship between label and field (Eg: `<label for="ISSN">ISSN/ISBN</label> <input type="text" id="ISSN" name="ISSN">`)
- [ ] Submit button has color contrast in all states (hover, active, etc)
- [ ] "Cancel" button finger-width away from submit and styled differently
- [ ] Focus styling is obvious
- [ ] Form validation errors are clear and accurately identified in text

### Tables
- [ ] Header cells utilize `<th>`
- [ ] `<th>` contain text
- [ ] Data cells utilize `<td>`
- [ ] `scope="col"` or `scope="row"` are used as data related to headers
- [ ] structure with `<thead>`, `<tfoot>`, and `<tbody>`
- [ ] Full table is responsive when in mobile or zoomed-in

### Analytics
- [ ] Google Analytics or other web statistics code is inserted into page templates
- [ ] Google Search Console is enabled, if appropriate

### Search
- [ ] Test search interface with non-Roman characters, if appropriate to content
- [ ] Contents are indexed in appropriate tools (Wagtail, VuFind), if appropriate

### Citations
- [ ] Citations can be saved into Zotero, if site contains bibliographic data

## [Prior to Launch](#back)
### Documentation
- [ ] Documentation for site or application is published on Loop
- [ ] If replacing or significant revising an existing site, take screenshots of old design
