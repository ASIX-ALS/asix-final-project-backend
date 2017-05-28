if (!global.hasOwnProperty('db')) {

  var mongoose = require('mongoose');

  var dbName = 'petsDB'

  // the application is executed on the local machine ...
  // mongoose.connect('mongodb://localhost/' + dbName);
  mongoose.connect('mongodb://mongo/' + dbName);


  global.db = {

    mongoose: mongoose,

    //models
    User: require('./User')(mongoose),

    // agregar más modelos aquí
  };

}

module.exports = global.db;