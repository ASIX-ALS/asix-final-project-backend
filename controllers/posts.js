var mongoose = require('mongoose');
var path = require('path');
var Publication = mongoose.model('Publication');
var User = mongoose.model('User');
var ImageUploader = require('../utils/imageUploader');

var f=new Date();
hora=f.getHours()+":"+f.getMinutes()+":"+f.getSeconds();

var hoy = new Date();
var dd = hoy.getDate();
var mm = hoy.getMonth()+1; //hoy es 0!
var yyyy = hoy.getFullYear();

if(dd<10) {
    dd='0'+dd
}

if(mm<10) {
    mm='0'+mm
}

hoy = mm+'/'+dd+'/'+yyyy;


//GET - get all posts
exports.find = function(req, res) {
Publication.find().populate('user', ['username']).exec((err, publications)=> {
    if(err) return res.send(500, err.message);
    if(!publications) return res.send(404, 'no se han encontrado publicaciones');
    res.status(200).send({publications});
  });
};

//POST - Insert a new post
exports.add = function(req, res) {
    publication = new Publication({
    title: req.body.title,
    description: req.body.description,
    image: req.body.image || 'http://www.dermagroup.com.uy/components/com_virtuemart/assets/images/vmgeneral/no-image.jpg',
    user: req.body.user,
    creationDate: hoy,
    creationTime: hora,

  });

  publication.save(function(err, user) {
    if(err) return res.send(500, err.message);
      res.status(200).send('Publication creado!');
  });
};

//PUT - Update a post already exists
exports.update = function(req, res) {
var title = req.body.title;
var update = req.body;
Publication.findByIdAndUpdate(title, update, function(err, publicationUpdated) {
     if(err) return res.send(500, err.message);
     res.status(200).send({publication: publicationUpdated});
 });
};

//DELETE - Delete a post with specified title
exports.delete = function(req, res) {
 Publication.find(req.params.title, function(err, user) {
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
