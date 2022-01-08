module.exports = function(server) {
  const io = require('socket.io')(server, {
    //Any configuration for socket would go here
  })

  require('./namespaces/instructor')(io);
  require('./namespaces/student')(io);
   
  return io;
}
