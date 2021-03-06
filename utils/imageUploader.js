var Q = require('q');
var AWS = require('aws-sdk');

var ImageUploader = function(options){

  var deferred = Q.defer();
  var buf = new Buffer(options.data_uri.replace(/^data:image\/\w+;base64,/, ""),'base64');

  // Create an S3 client
  AWS.config.update({
    accessKeyId: "AKIAJDDT4NPGHM6X6C2A",
    secretAccessKey: "sosaSHNpW0iXwZQzgjwztPUDQokafxO20BIJknmC",
    region: "eu-west-2",
  });

  var s3 = new AWS.S3();

  // Create a bucket and upload something into it
  var bucketName = 'asixfinalbucket';
  var keyName = options.filename;


  // put to a path in our bucket, and make readable by the public
  var params = {Bucket: bucketName, Key: keyName, Body: buf, ContentType: 'image/jpeg', ACL: 'public-read'};
  s3.putObject(params, function(err, data) {
    if (err) {
      deferred.reject({error: 'error'});
    } else {
      deferred.resolve(`https://asixfinalbucket.s3.amazonaws.com/${keyName}`);
    }
  });

  return deferred.promise;
}

module.exports = ImageUploader;