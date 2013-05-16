var request = require('request');
var dns = require('dns');
var EM = require('events').EventEmitter;
var util = require('util')

function nop() {}

var options = {
  uri: 'https://www.invoicexpress.net',
  method: 'get',
  timeout: 5000
};

function IX(callback) {
  if( typeof callback == 'function') { 
    self.on("error", callback)
    self.on("success", callback)
    this.poll();
  }
}

util.inherits(IX, EM);
IX.prototype.poll = function() {
  var _this = this;
  console.log("Poll started")
  
  dns.resolve('www.google.com', function(err) {
    if (err) { 
      _this.emit("error", err)
      setTimeout(_this.poll.bind(_this), 30000);
    } else { request(options, processRequest); }
  });

  function processRequest(error, response, body) {
    if (error) { _this.emit("error", error, null)  } 
    else { _this.emit("success", null) } 
    setTimeout(_this.poll.bind(_this) , 10000);
  }

}

module.exports = IX
