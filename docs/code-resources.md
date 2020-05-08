# Resources
## Documentation
* [Color Contrast Checker](https://webaim.org/resources/contrastchecker/)
* [Using ARIA landmarks to identify regions of a page](https://www.w3.org/WAI/GL/wiki/Using_ARIA_landmarks_to_identify_regions_of_a_page)
* [WebAIM: Invisible Content Just for Screen Reader Users](https://webaim.org/techniques/css/invisiblecontent/)
* [W3C Page Regions](https://www.w3.org/WAI/tutorials/page-structure/regions/)
* [MDN web docs Using the button role](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/ARIA_Techniques/Using_the_button_role)
* [Making Data Tables Responsive](http://blog.apps.npr.org/2014/05/09/responsive-data-tables.html)
* [Web Content Policies and Best Practices Handbook](https://loop.lib.uchicago.edu/documentation/communications/web-content-policies-and-best-practices-handbook/)

## Code
### Skip to Content
**Sass**
```
#skip  {
  background: #f5f5f5;
  color: #222;
  a { 
    position:absolute;
    padding: 1em 0 1em 3em;
    line-height: 2em;
    left:-10000px; 
    top:auto; 
    width:1px; 
    height:1px; 
    overflow:hidden;
    color: #222;
    &:focus { 
      position:static; 
      width:auto; 
      height:auto; 
    } 
  }
}
```

**HTML**
```
<div id="skip">
  <a href="#content">Skip to Main Content</a>
  <a href="#sidebar">Skip to Side Bar</a> <!-- Good for when there is both a primary and secondary navigation -->
</div>
```

### Hiding elements
_Hides from visual users, but "viewable" to screen readers_

**CSS / Sass**
```
.visually-hidden {
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip: rect(1px, 1px, 1px, 1px);
}
```

### Responsive / Mobile Friendly Table
**Sass**
```
table, tbody {
  @include respond-to(smallonly) {
    display: block;
    width: 100%;
    & thead, & tr, & th, & td {
      display: block;
      padding: 0;
      text-align: left;
      white-space: normal;
    }
  }
}
```

### Column Scope to Tables
_When there is no col header or col header is hidden in mobile_

**HTML**
```
<thead> ... </thead>
<tbody>
   <tr class="visually-hidden">
      <th scope="col">Collection Thumbnail</th>
      <th scope="col">Title</th>
      <th scope="col">Formats</th>
      <th scope="col">Subjects</th>
   </tr>
   <tr> ... </tr>
   <tr> ... </tr>
   <tr> ... </tr>
   <tr> ... </tr>
</tbody>
```

### Forms
**Layout**
- Break fields up into like sections. For example, a section for patron info and a section for book info.
- Put sections within `<section>` and give header labels, most likely will be `<h2>`
- Example:
```
<h1>ILL Request Form</h1>
<form action="illiad.dll" method="post" name="ArticleRequest" class="ill-request f-wrap-request">
   <section>
      <h2>Describe the item you want</h2>
      [ code for form fields in this section ]
   </section>
   
   <section>
      <h2>Additional Information</h2>
      [ code for form fields in this section ]
   </section>
   [...]
</form>
```

**Form Fields**
- Place field `label` and `input` into a `form-group`
- include `for=" "` in `label` that matches `name=" "` in `input`
- If using help text, include `aria-describedby=" "` in `input` that matches `id=" "` in the tag the help text is in (normally `<small>` or `<span>`
- Example:
```
<div class="form-group">
   <label for="JournalTitle">Title (Journal, Conference Proceedings, Anthology)</label>
   <input type="text" id="PhotoJournalTitle" name="PhotoJournalTitle" aria-describedby="JournalTitleHelp" class="form-control">
   <small id="JournalTitleHelp" class="form-text text-muted">Please do not abbreviate unless your citation is abbreviated.</small>
</div>
```

**Form Field Rows**
- Group optional and like things together in a row.
- Field rows are useful for ISBN, pages, and other similar small field items.
- If mixing required and non-required items in a row, place the required field toward the left where a user can easily see while scanning.
- Example:
```
<div class="form-group row">
   <div class="col-sm-4"> 
      <label for="InclusivePages">Inclusive Pages</span></label>
      <input type="text" id="InclusivePages" name="InclusivePages"class="form-control">
   </div>
   <div class="col-sm-4">
      <label for="JournalVolume">Volume</label>
      <input type="text" id="JournalVolume" name="JournalVolume" class="form-control">
   </div>
   <div class="col-sm-4">
      <label for="JournalIssue">Issue Number or Designation</label>
      <input type="text" id="JournalIssue" name="JournalIssue" class="form-control">
   </div>				
</div>
```

**Required Fields**
- Include at top of form, after header or intro paragraph: `<p class="required">Required fields are followed by <strong><abbr title="required">*</abbr></strong></p>`
- then in required fields include:`<abbr title="required">*</abbr>` within the label
- Example of full field code:
```
<div class="form-group">
   <label for="PhotoArticleTitle">Article, Chapter, or Paper Title<abbr title="required">*</abbr></label>
   <input type="text" id="PhotoArticleTitle" name="PhotoArticleTitle" class="form-control">
</div>
 ```
 
 **Submit Buttons**
 - Users are accostommed to seeing the submit button to the right hand side of the bottom of the form
 - If a "clear" button needs to be included, make it look like a text link rather than a button. Space it away from the submit button so that a phone user doesn't accidentally click it with their finger.
 - Check the color contrast on the submit button to assure all visual users can read the text

### Media Queries
_KZ's breakpoints based on web stats of common devices used by patrons_

**Sass**

Use as: `@include respond-to(small) { ... }` instead of `@media (min-width: 768px) { ... }`

_Note: Found em to be more reliable/consistent over px_
```
@mixin respond-to($breakpoint) {
  // Extra small devices (phones, 544px and up)
  @if $breakpoint == "xsmall" {
    @media (min-width: 34em) {
      @content;
    }
  }

  // Small devices (landscape phones, 768px and up)
  @else if $breakpoint == "small" {
    @media (min-width: 48em) {
      @content;
    }
  }
  // Medium devices (crappy laptops, tablets, 992px and up)
  @else if $breakpoint == "medium" {
    @media (min-width: 62em) {
      @content;
    }
  }
  // Large devices (desktops, 1200px and up)
  @else if $breakpoint == "large" {
    @media (min-width: 75em) {
      @content;
    }
  }

  //Extra large devices (large desktops, 1900px and up)
  @else if $breakpoint == "xlarge" {
    @media (min-width: 118em) {
      @content;
    }
  }
  
  // Short-cut to target extra small devices *only* (544px and below)
  @else if $breakpoint == "smallonly" {
    @media (max-width: 34em) {
      @content;
    }
  }

  // Short-cut to target extra small AND small devices *only* (768px and below)
  @else if $breakpoint == "mobileonly" {
    @media (max-width: 48em) {
      @content;
    }
  }
}
```

