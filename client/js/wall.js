
Wall = function() {
};

Wall.prototype.visit = function(url) {
  // TODO: replace this with calls to client to get messages.
  return ['aaa', 'bbb'];
};

// Publically available singleton of Wall.
wall = new Wall();
