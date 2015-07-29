
var express = require('express')
  //, cors = require('cors')
  , app = express();

// app.use(cors());
app.use(express.static(__dirname + '/demo'));

// in NodeJS/Express (server)
app.all('/*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header("Access-Control-Allow-Credentials", true);
  res.header("Access-Control-Allow-Methods", "POST, GET, OPTIONS, DELETE");
  next();
});

app.get("/*", function(req, res) {
	res.sendfile('demo/index.html')
});

var port = process.env.PORT || 8001;

app.listen(port, function() {
	console.log("Server posloucha na portu: " + port);
});

