var mongoose = require('mongoose');
var User = mongoose.model('User');
var ImageUploader = require('../utils/imageUploader');

//GET - Return all registers
exports.find = function(req, res) {
  var username = req.body.username;
  var password = req.body.password;

User.findOne({username: username, password: password}, function(err, user) {
    if(err) return res.send(500, err.message);

    if(!user) return res.send(404, 'credenciales incorrectas');

    console.log('POST /user')
    var id = user._id;
    var user = user.username;

    res.status(200).send({ id, username });
  });
};

//GET - Return a register with specified ID
exports.findById = function(req, res) {
 User.findById(req.params.id, function(err, user) {
   if(err) return res.send(500, err.message);
   console.log('GET /users/' + req.params.id);
   res.status(200).send(user.username);
 });
};

//POST - Insert a new register
exports.add = function(req, res) {

  var user = new User({
    username: req.body.username,
    password: req.body.password
  });

  user.save(function(err, user) {
    if(err) return res.send(500, err.message);
      res.status(200).send('registro correcto!');
  });
};

//PUT - Update a register already exists
exports.update = function(req, res) {
 User.findById(req.params.id, function(err, user) {
   user.username = req.body.username;
   user.password = req.body.password;

   user.save(function(err) {
     if(err) return res.send(500, err.message);
     res.status(200).send({user});
   });
 });
};

//DELETE - Delete a register with specified ID
exports.delete = function(req, res) {
 User.findById(req.params.id, function(err, user) {
   user.remove(function(err) {
     if(err) return res.send(500, err.message);
     res.json({ message: 'Successfully deleted' });
   });
 });
};

exports.image = function (req, res) {

  var image = ImageUploader({
    data_uri: req.body.data_uri,
    filename: req.body.filename,
    filetype: req.body.filetype
  }).then(onGoodImageProcess, onBadImageProcess);

  function onGoodImageProcess(resp) {
    res.send({
      status: 'success',
      uri: resp
    });
  }

  function onBadImageProcess(resp) {
    res.send({
     status: 'error',
     error: resp,
    });
  }

};
