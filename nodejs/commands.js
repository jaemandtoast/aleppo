NotificationCommand = {
  NICK: 'NICK',
  MSG: 'MSG',
  JOIN: 'JOIN',
  PART: 'PART',
  NICKLIST: 'NICKLIST'
};

NickCommand = {};
NickCommand.onMessage = function(server, conn, message) {
  var user = server.getUser(conn.id);
  if (message && message != '') {
    user.nick = message;
  }
  server.broadcast({nick: user.nick, id: conn.id}, NotificationCommand.JOIN);
};

MsgCommand = {};
MsgCommand.onMessage = function(server, conn, message) {
  var user = server.getUser(conn.id);
  server.broadcast({nick: user.nick, id: conn.id, message: message},
                   NotificationCommand.MSG);
};

NicklistCommand = {};
NicklistCommand.onMessage = function(server, conn, message) {
  var users = server.getUsers();
  server.send(conn, {id: conn.id, users: users}, NotificationCommand.NICKLIST);
};

JoinCommand= {};
JoinCommand.onMessage = function(server, conn, message) {
  var user = server.getUser(conn.id);
  if (message && message != '') {
    user.nick = message.nick;
    user.url = message.url;
  }

  server.broadcast({nick: user.nick, id: conn.id}, NotificationCommand.JOIN);
};

LeaveCommand = {};
LeaveCommand.onMessage = function(server, conn, message) {
  var user = server.getUser(conn.id);

  var users = server.getUsers();
  for (var i in users) {
    var u = users[i];
    if (u.url == user.url) {
      server.send(user.con, {nick: user.nick, url: user.url});
    }
  }

  // Wipe out old URL.
  user.url = null;
};

SayCommand = {};
SayCommand.onMessage = function(server, conn, message) {
  var user = server.getUser(conn.id);

  var users = server.getUsers();
  for (var i in users) {
    var u = users[i];
    if (u.url == user.url) {
      server.send(u.con, {
        command: 'SAY',
        url: u.url,
        wall: server.getWall(u.url),
      });
    }
  }
 
  // if (wall.message && wall.messages.length > 0) {
  //server.broadcast({nick: user.nick, id: conn.id, message: message},
 //                 NotificationCommand.MSG);
};

VisitCommand = {};
VisitCommand.onMessage = function(server, conn, message) {
  var user = server.getUser(conn.id);
  server.broadcast({nick: user.nick, id: conn.id, message: message},
                   NotificationCommand.MSG);
};

