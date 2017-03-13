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
```js
$l('ul') === DOMNodeCollection {nodes: Array[2]}
```
2.) HTML elements: returns array-like object of HTML nodes
```js
  node = let node = $l('ul').nodes[0]
  $l(node) === DOMNodeCollection {nodes: Array[1]}
```
3.) Functions: Adds callback to DOM Content Loaded event handler if document has not yet loaded. Otherwise, calls the function immediately.

##$l.extend(target [,object1] [,objectN])

Merges the contents of two or more objects into the first objects.

```js
  $l.extend({"a": 1, "b": 2}, {"b": 3}) === Object {a: 1, b: 3}
```

##$l.ajax(url [,settings])

Performs an asynchronous HTTP (Ajax) request. Accepts an object containing settings, including a mandatory string containing the url to which the request is sent.

Setting types:

* url: String containing request url
* method: String indicating HTTP request type. Defaults to "GET".
* success: Callback triggered on 200 OK HTTP response
* error: Callback triggered on all other HTTP responses
* data: Data to be sent to the server. It is converted to query string, and in the case of GET requests, appended to the url.
* contentType: specifies the type of data sent to the server. Defaults to the application/x-www-form-urlencoded; charset=UTF-8

Example:

```js
  $l.ajax({
    method: "POST",
    url: "someurl.php",
    success: (response) => console.log(response),
    error: (error) => console.log(error),
    data: { time: "0300", location: "New York"}
  })
```

##html([value])
If passed an argument sets the inner html of selected nodes to value. Otherwise, returns inner html value of the first selected node.

##empty()
Sets the inner HTML of all selected nodes to an empty string.

##append()
Inserts content to the end of each element in the set of matched elements. Takes HTML Element, a DOMNodeCollection element, or a plain string.

##attr(attribute, [value])
If value is provided, sets the value of given attribute for all selected nodes. Else, return the value of given attribute at first selected node.

##addClass(className)
Adds given className to class list of selected nodes.

##removeClass(className)
Removes given className from class list of selected nodes.

##toggleClass(className)
Reverses the presence of given class for selected nodes. I.e: if class is present, removes it. If absent, adds it.

##children()
Returns DOMNodeCollection of child nodes of all selected nodes. Does not return nested children.

##parent()
Returns DOMNodeCollection of parent nodes of all selected nodes.

##on(eventName, callback)
Adds given callback to given event listener for all selected nodes.

##off(eventName)
Removes all callbacks for given event listener for all selected nodes.

##find(selected)
Returns all nested child nodes that match given selector.

##remove()
Removes all selected nodes from the DOM.
