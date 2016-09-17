var express = require('express');

var app = express();

app.use(require('./controllers/controllers'));
app.use(express.static(__dirname + '/views'));

var port = process.env.PORT || 8080;
app.listen(port, function() {
    console.log('Node.js listening on port ' + port + '...');
});
