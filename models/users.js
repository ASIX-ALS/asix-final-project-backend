"use strict"
var mongoose = require('mongoose');

var usersSchema = mongoose.Schema({
  username: String,
  password: String,
});

var Users = mongoose.model('Users', usersSchema);
module.exports = Users;