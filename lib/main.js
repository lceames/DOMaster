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

$l.extend = (...objects) => {
  let merged = {};
  objects.forEach( obj => {
    obj.keys.forEach( (key) => {
      merged[key] = obj[key];
    });
  });
}
//
$l.ajax = options => {
  const request = new XMLHttpRequest();
  const defaults = {
    method: "GET",
    url: "",
    success: () => {},
    error: () => {},
    data: {},
    contentType: 'application/x-www-form-urlencoded; charset=UTF-8'
  }

  options = $l.extend(defaults, options);
  options.method = options.method.toUpperCase();

  if (request.method === "GET") {
    options.url += "?" + toQueryString(options.data);
  }

  request.open(options.method, options.url, true);
  request.onload = e => {
    if (request.status === "200") {
      options.success(request.response);
    }
    else {
      options.error(request.response);
    }
  }

  xhr.send(JSON.stringify(options.data));
};

toQueryString = data => {
  let result = "";
  for (let prop in data) {
    if (data.hasOwnProperty(prop)) {
      result += prop + "=" + obj[prop] + "&"
    }
  }

  return result.substring(0, result.length - 1);
}

document.addEventListener("DOMContentLoaded", () =>{
  docReady = true;
  docReadyCallbacks.forEach( (cb) => cb() );
});
