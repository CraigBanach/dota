var test = require('unit.js');

describe('Test tests', function() {
  
  it('exmaple variable', function() {
  
    var obj = {
      message : 'hello',
      name    : 'Nico'
    };
    var str = 'Hello world';
    // Structure of a request object.
    // By example, provided by Express framework and other modules.
    var req = {
      headers: {
        'content-type': 'application/json'
      }
    };
    test.object(obj).hasProperty('name');
    test.object(obj).hasProperty('message', 'hello');
    test.string(str).startsWith('Hello');
    test.string(str).contains('world');
    test.string(str).match(/[a-zA-Z]/);
    test.value(req).hasHeader('content-type');
    test.value(req).hasHeader('content-type', 'application/json');
    // or
    test.value(req).hasHeaderJson();
    
  });
});