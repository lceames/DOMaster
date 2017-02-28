const DOMNodeCollection = require('./dom_node_collection');

window.$l = function (arg) {
  if (typeof arg === "string") {
    return new DOMNodeCollection(Array.from(document.querySelectorAll(arg)));
  }
  else {
    return new DOMNodeCollection([arg]);
  }
};
