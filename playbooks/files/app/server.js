var express = require('express');
var app = express();

app.get('/app', function(req, res) {
  res.send('<pre>' + JSON.stringify(req.headers) + '</pre>');
});

var server = app.listen(8080, function() {
    console.log('Listening on port %d', server.address().port);
});
