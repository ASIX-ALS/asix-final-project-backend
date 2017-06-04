var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var methodOverride = require("method-override");
var app = express();
var allowCrossDomain = function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
}

// Connection to DB
mongoose.connect('mongodb://mongo/petsDB', function(err, res) {
 if(err) throw err;
 console.log('Connected to Database');
});

// Middlewares
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(methodOverride());
app.use(allowCrossDomain);

// Import Models and Controllers
var UserModels = require('./models/User')(app, mongoose);
var PublicationModels = require('./models/Posts')(app, mongoose);
var UserCtrl = require('./controllers/user');
var PublicationCtrl = require('./controllers/posts');

var router = express.Router();

app.use(router);

// API routes
var api = express.Router();

api.route('/login/user')
  .post(UserCtrl.find);

api.route('/register/user')
  .post(UserCtrl.add);

api.route('/user/:id')
  .get(UserCtrl.findById)
  .put(UserCtrl.update)
  .delete(UserCtrl.delete);


api.route('/new-publication')
  .post(PublicationCtrl.add);

api.route('/publications')
  .get(PublicationCtrl.find);

api.route('/update-publication/:title')
  .post(PublicationCtrl.update);

api.route('/upload/image')
  .post(UserCtrl.image);

app.use('/api', api);


// Start server
app.listen(3000, function() {
 console.log("Node server running on http://localhost:3000");
});
