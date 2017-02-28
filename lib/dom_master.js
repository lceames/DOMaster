/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	const DOMNodeCollection = __webpack_require__(1);

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

	  request.open(options.method, options.url);
	  request.onload = () => {
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


/***/ },
/* 1 */
/***/ function(module, exports) {

	class DOMNodeCollection {
	  constructor(nodes){
	    this.nodes = nodes;
	  }

	  each(callback) {
	    this.nodes.forEach((node) => callback(node));
	  }

	  html(value) {
	    if (value !== undefined) {
	      this.each( node => node.innerHTML = value )
	    }
	    else {
	      return this.nodes[0].innerHTML;
	    }
	  }

	  empty() {
	    this.html("");
	  }

	  append(child) {
	    if (this.nodes.length === 0) return;

	    if (child instanceof DOMNodeCollection) {
	      this.each( parent => {
	        child.each( children => {
	          parent.appendChild(children.cloneNode(true));
	        });
	      });
	    }
	    else if (child instanceof HTMLElement){
	      this.each( node => {
	        node.appendChild(child.cloneNode(true));
	      });
	    }
	    else {
	      this.each( node => {
	        node.innerHTML += child;
	      });
	    }
	  }

	  attr(attribute, value){
	    if (value) {
	      this.each((node) => node.setAttribute(attribute, value));
	    }
	    else {
	      if (typeof attribute === "object") {
	        for (let key in attribute) {
	          this.each((node) => {
	            node.setAttribute(key, attribute[key]);
	          });
	        }
	      }
	      else {
	        return this.nodes[0].getAttribute(attribute);
	      }
	    }
	  }

	  addClass(newClass) {
	     this.each(node => node.classList.add(newClass));
	   }

	   removeClass(oldClass) {
	     this.each(node => node.classList.remove(oldClass));
	   }

	   toggleClass(toggleClass) {
	     this.each(node => node.classList.toggle(toggleClass));
	   }

	  children(){
	    let children = [];
	    this.each((node) => {
	      children = children.concat(Array.from(node.children));
	    });
	    return new DOMNodeCollection(children);
	  }

	  parent() {
	    let parents = [];
	    this.each( node => {
	      if(!parents.includes(node.parentElement)){
	        parents.push(node.parentElement);
	      }
	    });
	    let nodes = new DOMNodeCollection(parents);
	    return nodes;
	  }

	  on(eventName, callback) {
	    this.each( node => {
	      node.addEventListener(eventName, callback);
	      const eventKey = `DOMaster-${eventName}`
	      if (typeof node[eventKey] === "undefined") {
	        node[eventKey] = [];
	      }
	      node[eventKey].push(callback);
	    });
	  }

	  off(eventName) {
	    this.each( node => {
	      const eventKey = `DOMaster-${eventName}`
	      if (node[eventKey]) {
	        node[eventKey].forEach(callback => {
	          node.removeEventListener(eventName, callback);
	        });
	      }
	      node[eventKey] = [];
	    });
	  }

	  find(selector){
	    let selectedNodes = [];
	    this.each( node => {
	      childNodes = node.querySelectorAll(selector)
	      selectedNodes = selectedNodes.concat(Array.from(singleNodeChildren));
	    });
	    return new DOMNodeCollection(selectedNodes);
	  }

	  remove() {
	    this.each( node => {
	      let parent = node.parentElement;
	      parent.removeChild(node);
	    });
	  }
	}

	module.exports = DOMNodeCollection;


/***/ }
/******/ ]);