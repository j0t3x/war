var connection = function( url, id ){

  this.UNSENT = 0;
  this.OPENED = 1;
  this.HEADERS_RECEIVED = 2;
  this.LOADING = 3;
  this.DONE = 4;
  this.url =  url;
  this.id = id;
  this.data;
  this.encoding;
  this.async =  true;
  this.tempHeaders =  {};
  this.xhr =  this.checkXHR();
  this.data = new FormData();
  this.lastTimeOfUse = 0;

  this.setListeners();

};

connection.prototype.startAndSend = function( method, data, headers ){

  this.formatAsFormData( data );
  this.xhr.open( method, this.url, true );//always async
  this._addTempHeader( headers );
  this._addTempHeader( this.tempHeaders );

  //timestamp of last use
  this.setNowLastTimeOfUse();

  this.xhr.send( this.data );

};

connection.prototype.formatAsFormData = function( data ){

  for ( var member in data ) {
    if (data.hasOwnProperty( member )) {

      this.data.append( member, data[ member ] );

    }
  }

};


connection.prototype.setNowLastTimeOfUse = function(){

  var date = Date.now();
  this.lastTimeOfUse = date;

};

connection.prototype.addTxtFileFromString = function( name, str ){

  if( typeof str !== 'string' )
    throw 'Use string for this method';

  var blob = new Blob([str], { type: "text/plain" });

  this.data.append( name, blob );

  return this;

};

connection.prototype.addImgFileFromArr = function( name, arr, type ){

  if( arr instanceof Array )
    throw 'Use an array for this method';

  if( typeof type !== 'string' )
    throw 'use a string for the MIME type, like image/jpeg';

  var blob = new Blob([arr], { type: ( type )? type: 'image/jpeg' });

  this.data.append( name, blob );

  return this;

};

connection.prototype.addTempHeader = function( h ){

  if( !h )
    throw 'grow a pair... name, value needed to set a temporal header for this onnection';

  for (var header in h) {
    if (h.hasOwnProperty(header)) {
      //we save just because
      this.tempHeaders[ header ] = h[ header ];
    }
  }

  //console.log( this.tempHeaders )
  return this;

};

connection.prototype._addTempHeader = function( h ){

  if( !h )
    throw 'grow a pair... name, value needed to set a temporal header for this onnection';

  for (var header in h) {
    if (h.hasOwnProperty(header)) {
      //we save just because
      this.xhr.setRequestHeader( header, h[ header ] );
    }
  }

  //console.log( this.tempHeaders )
  return this;

};

/**
 * This method is yet to be defined, we know that you can send
 * multipart encoded data using FormData API, so.... maybe encoding for this API
 * goes that way: set a variable encoding just to use FormData API
 * @param {string} input supported encoding type
 */
connection.prototype.setEncoding = function( enc ) {

  return this;
};


connection.prototype.checkXHR = function() {

  if (window.XMLHttpRequest) {
    // Chrome, Firefox, IE7+, Opera, Safari
    return new XMLHttpRequest();
  }
  // IE6
  try {
    // The latest stable version. It has the best security, performance,
    // reliability, and W3C conformance. Ships with Vista, and available
    // with other OS's via downloads and updates.
    return new ActiveXObject('MSXML2.XMLHTTP.6.0');
  } catch (e) {

    try {
      // The fallback.
      return new ActiveXObject('MSXML2.XMLHTTP.3.0');
    } catch (e) {
      //alert('This browser is not AJAX enabled.');
      return null;
    }

  }
};

connection.prototype.setListeners = function(){

  this.xhr.addEventListener( 'readystatechange', this.readystatechange.bind(this) );
  this.xhr.addEventListener( "progress", this._progress.bind(this) );
  this.xhr.addEventListener( "load", this._load.bind(this) );
  this.xhr.addEventListener( "error", this._error.bind(this) );
  this.xhr.addEventListener( "abort", this._abort.bind(this) );

};

connection.prototype.readystatechange = function( context ){

    if (this.xhr.readyState === this.DONE && this.xhr.status === 200) {
       // Action to be performed when the document is read;
       this._response( this.xhr.responseText );
    }else{
      //not yet rdy
      //console.log( this.xhr.readyState, this.xhr.status )
    }
};

connection.prototype._response = function( data ){
  this.response( data );
};
connection.prototype.response = function( data ){};

connection.prototype._progress = function( e ){
  var percentComplete;
  if (e.lengthComputable) {
    percentComplete = e.loaded / e.total;
  } else {
    // Unable to compute progress information since the total size is unknown
  }
  this.progress( percentComplete );
};
connection.prototype.progress = function( percentComplete ){};

connection.prototype._load = function( e ){

  this.load( e );
};
connection.prototype.load = function( e ){};

connection.prototype._error = function( e ){

  this.error( e );
};
connection.prototype.error = function( e ){};

connection.prototype._abort = function( e ){

  this.abort( e );
};
connection.prototype.abort = function( e ){};

module.exports = connection;
