var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PublicationSchema = new Schema({
 title: { type: String },
 description: { type: String },
 image: {type: String },
 userid: { type: Schema.ObjectId, ref: 'User' }
});

module.exports = mongoose.model('Publication', PublicationSchema);
