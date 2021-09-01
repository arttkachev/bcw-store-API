// enable esm for packages
// use esm to load the main ES module and export it as CommonJS
require = require('esm')(module)
module.exports = require("./server/main.js") // makes main.js file available outside