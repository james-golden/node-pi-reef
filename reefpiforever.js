  var forever = require('forever-monitor');

  var child = new (forever.Monitor)('nodereefpi.js', {
    max: 10,
    silent: true,
    args: []
  });

  child.on('exit', function () {
    console.log('nodereefpi.js has exited after 10 restarts');
  });

  child.start();
