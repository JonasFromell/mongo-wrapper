require('babel-register');
require('babel-polyfill');

var chai = require('chai');
var asPromised = require('chai-as-promised');

chai.use(asPromised);
