const components = [
  // 'nav',
];

// put redux components in the above array. they should export one of these:
// { stateName: s, initialise: fn(dispatch), reducer: fn(state, action), subscriber: fn(state) }


// now daddy's got a job to do, fuck off.

const Redux = require('redux');
const required = components.map((c) => require(`./components/${c}`));
const reducers = required.map((r) => r.reducer);
const reducersMap = {};
for(let i = 0; i < reducers.length; i++) {
  reducersMap[components[i].stateName] = reducers[i];
}
const subscribers = required.map((r) => r.subscriber);
const store = Redux.createStore(Redux.combineReducers(reducersMap));
store.subscribe(() => {
  const state = store.getState();
  subscribers.forEach((s) => s(state));
});
Util.ready(() => required.forEach((r) => r.initialise()));
