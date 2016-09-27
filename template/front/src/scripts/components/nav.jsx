const navToggle = Util.id();

module.exports = {
  stateName: 'navToggled',

  initialise: (dispatch) => {
    Util.findId('nav-toggle').onclick = () => dispatch({ type: navToggle });
  },

  reducer: (state = false, action) => {
    switch(action.type) {
    case navToggle:
      return !state;
    default:
      return state;
    }
  },

  subscriber: (state) => {
    Util.toggleClass(document.body, 'nav-toggled', state.navToggled);
  },
};
