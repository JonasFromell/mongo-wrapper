require('babel/register')({
  optional: ['runtime']
});

var chai = require('chai');
var asPromised = require('chai-as-promised');

chai.use(asPromised);
