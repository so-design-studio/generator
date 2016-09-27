/* --- Redux store combiner ---
 * Provides a quick way to define new reduxified components, and combines all
 * components' reducers on initialisation.
 *
 * Depends on Util global.
 */

import { createStore, combineReducers } from 'redux';

// Actions are identified by number
let actions = 0;

// Reducers are hashed for use with combineReducers()
let reducers = {};

// Subscribers are listed and called in order
let subscribers = [];

// Finally, we define a standard Redux store
let store;


module.exports = {

  // Post-increment action count when component asks for one
  action: () => actions++,

  // Reducers can be directly manipulated by components
  reducers,

  // Push a subscriber onto the list
  subscribe: (fn) => subscribers.push(fn),

  // Facade functions
  get: () => store.getState(),
  dispatch: (action) => store.dispatch(action),

  // On ready, create store and subscribe all
  ready: () => {
    Util.ready(() => {
      store = createStore(combineReducers(reducers));
      subscribers.forEach(s => store.subscribe(s));
    });
  }
};
