const DOMNodeCollection = require('./dom_node_collection');

const docReadyCallbacks = [];
let docReady = false;

window.$l = function (arg) {
  if (typeof arg === "string") {
    return new DOMNodeCollection(Array.from(document.querySelectorAll(arg)));
  }
  else if (typeof arg === "function") {
    if (docReady) {
      arg();
    }
    else {
      docReadyCallbacks.push(arg);
    }
  }
  else {
    return new DOMNodeCollection([arg]);
  }
};

document.addEventListener("DOMContentLoaded", () =>{
  docReady = true;
  docReadyCallbacks.forEach( (cb) => cb() );
});
