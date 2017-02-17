var war = require('../bin/war.js');
war = new war();

var headers = {
  'Accept': 'text/plain, text/html'
}
war.setGlobalHeaders( headers );




var c = war.confConnection('http://ip.jsontest.com/');
//c.addTempHeader({ 'Accept' : 'wawasilawa' });


war.GET( c.id, {a:1,b:2} );
