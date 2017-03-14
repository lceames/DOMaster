class DOMNodeCollection {
  constructor(nodes){
    this.nodes = nodes;
  }

  each(callback) {
    this.nodes.forEach((node) => callback(node));
  }

  html(value) {
    if (value !== undefined) {
      this.each( node => node.innerHTML = value );
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
          this.each( node => {
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
