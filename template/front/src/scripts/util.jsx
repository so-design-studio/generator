// --- SoUtils ---
// Lots of these from: youmightnotneedjquery.com

let counter = 0;

module.exports = {

  // jQuery(fn) replacement
  ready: (fn) => {
    if(document.readyState !== 'loading') {
      fn();
    }
    else {
      document.addEventListener('DOMContentLoaded', fn);
    }
  },

  // jQuery(s), jQuery.find(s) and jQuery.each(e) replacements
  find:    (selector, parent = document.body) => parent.querySelector(selector),
  findAll: (selector, parent = document.body) => parent.querySelectorAll(selector),
  eachEl: (elements, fn) => {
    for(var i = 0; i < elements.length; i++) {
      fn(elements[i]);
    }
  },

  deleteEl: (element) => element.parentNode.removeChild(element),

  // document.getElementById() is long
  findId: document.getElementById,

  // jQuery.toggleClass() replacement. toggled param is mandatory because redux
  toggleClass: (el, className, toggled) => {
    if(toggled) {
      if(el.classList) {
        el.classList.add(className);
      }
      else {
        el.className += ' ' + className;
      }
    }
    else {
      if(el.classList) {
        el.classList.remove(className);
      }
      else {
        el.className = el.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
      }
    }
  },

  id: () => counter++;

};
