///////////////////////////////////////////////////////////////////////////////
// node.js requires
///////////////////////////////////////////////////////////////////////////////
require('./server');

// Starts the notification server.
var server = new NotificationServer(8080);
server.start();
