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
<tr></tr>
...
</tbody>
```

### Media Queries
_KZ's research breakpoints_

**Sass**

Use as: `@include respond-to(small) { ... }` instead of `@media (min-width: 768px) { ... }`
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

