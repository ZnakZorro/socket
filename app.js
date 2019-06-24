var app = require('http').createServer(handler)
var io = require('socket.io')(app);
var fs = require('fs');



function handler (req, res) {
  fs.readFile(__dirname + '/index.html',
  function (err, data) {
    if (err) {
      res.writeHead(500);
      return res.end('Error loading index.html');
    }

    res.writeHead(200);
    res.end(data);
  });
}

io.on('connection', function (socket) {
  socket.emit('news', { hello: 'info from server - world' });
  socket.on('informacje', function (data) {
    console.log(data);
  });
  
			setInterval(function(){
				var czas = (new Date()).toLocaleString();
				socket.emit('news', { my: 'data',serverTime:czas });
			},5000)  
  
});



app.listen(8282,function(x){console.log(8282,x)});
