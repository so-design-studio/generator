// --- SoUtils ---
// Lots of these from: youmightnotneedjquery.com

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

  // Can't do a forEach() on querySelectorAll(), so this instead
  forEachElementIn: (parent, selector, fn) => {
    const elements = parent.querySelectorAll(selector);
    for(var i = 0; i < elements.length; i++) {
      fn(elements[i]);
    }
  },

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

};
