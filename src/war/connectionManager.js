// onloadstart	loadstart
// onprogress	progress
// onabort	abort
// onerror	error
// onload	load
// ontimeout	timeout
// onloadend	loadend

var connection = require('./connection.js');

var connectionManager = function(){

  this.globalHeaders = {};
  this.methods = [ 'GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'HEAD' ];
  this.connections = {};

  for (var i = 0; i < this.methods.length; i++) {
    this[ this.methods[i] ] = (function( method ){
      return function( connID, data ){
        this.send( connID, method, data );
      };
    }.bind(this))( this.methods[i] );
  }

};

connectionManager.prototype.setGlobalHeaders = function( h ){

  if( !h )
    throw 'grow a pair... name, value needed to set a temporal header for this connection';

  for (var header in h) {
    if (h.hasOwnProperty(header)) {
      //we save just because
      this.globalHeaders[ header ] = h[ header ];
    }
  }

};

connectionManager.prototype.send = function( connID, method, data ){

  if( !data ) data = null;
  this.connections[ connID ].startAndSend( method, data, this.globalHeaders );

};

/**
 * This is the start of XMLHttpRequest, here we set up our
 * connection uid and a basic connection object that holds
 * basic data about this individual connection.
 * @param {URL} input the url you want to connect to
 * @returns {string} that is the ID of your connection.
 */
connectionManager.prototype.confConnection = function( url ){

  var id = this.generateConnectionID();
  this.connections[ id ] = new connection( url, id );
  return this.connections[ id ];

};

connectionManager.prototype.generateConnectionID = function(){

  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
    s4() + '-' + s4() + s4() + s4();

};

module.exports = connectionManager;
