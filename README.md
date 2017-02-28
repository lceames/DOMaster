#DOMaster

##What is DOMaster?

DOMMaster is a lightweight Javascript library that allows for easy HTML document traversal, manipulation, event handling, and Ajax request.

##API

##$l(selector)
Accepts CSS selectors (string), native HTML elements, and functions.

Examples:

Given the following HTML snippet:

```    
  <div class="alphabet">
    <label>Letters</label>
      <ul class="letters">
        <li>A</li>
        <li>B</li>
        <li>C</li>
        <li>D</li>
        <li>E</li>
        <li>F</li>
        <li>G</li>
      </ul>
  </div>

```
1.) CSS Selectors: returns array-like object of HTML nodes  
```
$l('ul') ==== DOMNodeCollection {nodes: Array[2]}

```
2.) HTML elements: returns array-like object of HTML nodes
```
  node = let node = $l('ul').nodes[0]
  $l(node) === DOMNodeCollection {nodes: Array[1]}

```
3.) Functions: Adds callback to DOM Content Loaded event handler if document has not yet loaded. Immediately calls the function otherwise. 

##$l.extend()
##$l.

##html()
##empty()
##append()
##attr()
##addClass()
##removeClass()
##toggleClass()
##children()
##parent()
##on()
##off()
##find()
##remove()
