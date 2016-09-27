'use strict';

// --- Vendor ---

// eg. require('./vendor/some-non-bower-library.js');


// --- Styles ---

require('../styles/main');


// --- Globals ---

require('expose?Util!./util');
require('expose?Store!./store');


// --- Non-redux exposed components ---

// eg. require('expose?Tabs!./components/tabs');


// --- Redux components ---

require('./components/nav')();


Store.ready();
