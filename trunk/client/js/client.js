AleppoClient = function() {
  this.ws = new WebSocket('ws://' + localStorage['server']+ ':' + localStorage['port']);
}

AleppoClient.prototype.start = function() {
  this.ws.onopen = this.onConnectionOpen.bind(this);
  this.ws.onclose = this.onServerClose.bind(this);
  this.ws.onerror = this.onServerError.bind(this);
  this.ws.onmessage = this.onMessage.bind(this);
};

AleppoClient.prototype.onConnectionOpen = function() {
  console.log("Connected!");
};

AleppoClient.prototype.onServerClose = function() {
  console.log("Server Close");
};

AleppoClient.prototype.onServerError = function() {
  console.log("Server error");
};

AleppoClient.prototype.onMessage = function(response) {
  console.log("Message received");
  var response = JSON.parse(response);
  console.log(response.wall);

};



AleppoClient.prototype.send= function(json) {
  this.ws.send(JSON.stringify(json));
  console.log("Message received");
};
