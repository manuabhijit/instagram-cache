
# Instagram Caching

[![Build Status](https://travis-ci.org/joemccann/dillinger.svg?branch=master)](https://travis-ci.org/joemccann/dillinger)

  

## Problem Statement

- **Task:** Integrate Instagram Widget on website.

- **Blocker:** Images are blocked by Instagram CDN, for cross domain integrations


## Solution

Create an intermediate caching mechanism over cloud that store making of required images over shared storage.


### Architecture Diagram

![Architecture Diagram](https://github.com/manuabhijit/instagram-cache/blob/main/instagram-caching.svg)

The system is built using Amazon Web Services.
- [Lambda](https://aws.amazon.com/lambda/) - Run code without thinking about servers. Pay only for the compute time you consume.

- [S3](https://aws.amazon.com/s3/) - Object storage built to store and retrieve any amount of data from anywhere.

- [Cloud Front](https://aws.amazon.com/cloudfront) - Fast, highly secure and programmable content delivery network (CDN).


### Explanation
The system follows following series of steps:
1. Lambda request for list of posts from Instagram Server.
2. The it makes subsequent request to Instagram CDN to fetch image resources.
3. On receiving the response from Instagram CDN, data received is send over to S3 for storage and archival.
4.  Post this we can use these images for distribution.
5. [Add On] A CDN can be attach with signed URL generation for safe and fast distribution of Media Content

  

## Installation

This project requires [Node.js](https://nodejs.org/) v10+ to run.

Clone the repository
```sh
git clone https://github.com/manuabhijit/instagram-cache.git
```

Install the *dependencies* and *devDependencies*
```sh
npm run install
```

Add a credentials files `credentials.js`
```sh
module.exports = {
  credentials: {
    USERNAME: "*************",
    PASSWORD: "*************"
  }
 }
```

Start the applications
```sh
node index.js
```


## License

  

MIT

  

**Free Software, Hell Yeah!**

  

[//]: #  (These are reference links used in the body of this note and get stripped out when the markdown processor does its job. There is no need to format nicely because it shouldn't be seen. Thanks SO - http://stackoverflow.com/questions/4823468/store-comments-in-markdown-syntax)

  

[dill]: <https://github.com/joemccann/dillinger>