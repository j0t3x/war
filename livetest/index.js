var war = require('../bin/war.js');

var headers = {
  'Accept': 'text/plain, text/html'
}
war.setGlobalHeaders( headers );
var c = war.confConnection('https://httpbin.org/image/png');
c.response = function( data ){
  console.log(data)
};
c.addTempHeader({ 'tex' : 'atex' });
c.addTempHeader({ 'X-User-Agent' : 'wawasilawa' });
war.GET( c.id, {a:1,b:2} );
console.log(c)
