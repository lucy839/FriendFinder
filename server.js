// "dependencies" : set up dependencies
var express = require("express");
var path = require("path");

// "express configuration" : creates express server and sets up a port
var app = express();
var PORT = process.env.PORT || 3000;

// sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// static files for css
app.use(express.static(path.join(__dirname, './app/public')));

// "router" : add the application routes
require('./app/routing/apiRoutes.js')(app); 
require('./app/routing/htmlRoutes.js')(app);

// "listener" : effectively "starts" our server
app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
  });