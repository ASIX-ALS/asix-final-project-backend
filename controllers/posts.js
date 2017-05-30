var mongoose = require('mongoose');
var Publication = mongoose.model('Publication');

//GET - get all posts
exports.find = function(req, res) {
Publication.find(function(err, publications) {
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
    image: 'null',
    userid: req.body.userid
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
