const fs = require("fs");
const request = require("request");

var AWS = require("aws-sdk");

class S3Downloader {
  constructor(s3Bucket) {
    this.__s3 = new AWS.S3();
    this.__s3Bucket = s3Bucket
  }

  saveToS3(url, filename) {
    request(
      {
        url: url,
        encoding: null,
      },
       (err, res, body) => {
        if (err) return callback(err, res);

        this.__s3.putObject(
          {
            Bucket: this.__s3Bucket,
            Key: filename,
            ContentType: res.headers["content-type"],
            ContentLength: res.headers["content-length"],
            ACL:'public-read',
            Body: body, // buffer
          },
          console.log
        );
      }
    );
  }
}

module.exports = { S3Downloader };
