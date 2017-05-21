var express = require('express');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
var logger = require('morgan');
var app = express();
var allowCrossDomain = function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
}

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(allowCrossDomain);

// APIs
var mongoose = require('mongoose');
mongoose.connect('mongodb://mongo/books');

var Books = require('./models/books.js');

var db = mongoose.connection;
db.on('error', console.error.bind(console, '# MongoDB - connection error: '));

//---------->>> SET UP SESSIONS <<<------------
app.use(session({
  secret: 'mySecretString',
  saveUninitialized: false,
  resave: false,
  store: new MongoStore({mongooseConnection: db, ttl: 2 * 24 * 60 * 60})
}))

// SAVE SESSION CART API
app.post('/api/post/cart', function(req, res){
  var cart = req.body;
  req.session.cart = cart;
  req.session.save(function(err){
    if(err){
      console.log('# API ERROR: '+err);
    }
    res.json(req.session.cart);
  })
})
//GET SESSION CART API
app.get('/api/get/cart', function(req, res){
  if(typeof req.session.cart !== 'undefined') {
    res.json(req.session.cart);
  }
})

////---------->>> END SESSIONS SET UP <<<------------

//---------->>> POST BOOKS <<<------------

app.post('/api/post/books', function(req, res){
  var book = req.body;

  Books.create(book, function(err, books){
    if(err){
      console.log('# API ERROR: '+err);
    }
    res.json(books);
  })
});

//---------->>> GET BOOKS <<<------------

  app.get('/api/get/books', function(req, res){
  Books.find(function(err, books){
    if(err){
      console.log('# API ERROR: '+err);
    }
    res.json(books);
  })
});

//---------->>> DELETE BOOKS <<<------------

  app.delete('/api/delete/books/:_id', function(req, res){
    var query = {_id: req.params._id}
  Books.remove(query, function(err, books){
    if(err){
      console.log('# API ERROR: '+err);
    }
    res.json(books);
  })
});

//---------->>> GET BOOKS IMAGES API <<<------------
app.get('/api/get/images', function(req, res){
  const imgFolder = __dirname + '/public/images/';
  const fs = require('fs');

  fs.readdir(imgFolder, function(err, files){
    if (err) {
      return console.log(err);
    }
    const filesArr = [];
    var i = 1;
    files.forEach(function(file){
      filesArr.push({name: file});
      i++
    });
    res.json(filesArr);
  })
})
// END Apis

app.listen(3000, function(err){
  if(err){
    return console.log(err);
  }
  console.log('API Server is listening on http://localhost:3000');
})
