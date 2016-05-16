module.exports = () => {

// --- Actions ---

const toggleNav = Store.action();


// --- Reducers ---

Store.reducers.navShown = (state = false, action) => {
  if(action.type === toggleNav) {
    return !state;
  }
  return state;
};


// --- Subscriptions ---

Store.subscribe(() => {
  Util.toggleClass(document.body, 'nav-shown', Store.get().navShown);
});


// --- Init ---

Util.ready(() => {

  // --- Listeners ---

  document.getElementById('nav-toggle').onclick = () => {
    Store.dispatch(toggleNav);
  };

});


}
