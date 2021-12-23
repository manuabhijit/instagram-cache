const fs = require("fs");
const request = require("request");

var AWS = require("aws-sdk");

class LocalDownloader {
  constructor(s3Bucket) {
    this.__s3 = new AWS.S3();
    this.__s3Bucket = s3Bucket
  }

  download(uri, filename) {
    return new Promise((resolve, reject) => {
      request.head(uri, function (err, res, body) {
        console.log("content-type:", res.headers["content-type"]);
        console.log("content-length:", res.headers["content-length"]);

        request(uri).pipe(fs.createWriteStream(filename)).on("close", resolve);
      });
    });
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

module.exports = { LocalDownloader };
