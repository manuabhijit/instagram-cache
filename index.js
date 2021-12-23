const { Instagram } = require("./utility/instagram");
const { Environment } = require("./utility/environment");
const { S3Downloader } = require("./utility/S3Downloader");

const handler = (...args) => {
  const env = new Environment();
  const profile = "manuabhijit"
  new Instagram(env.username, env.password).getPhotosByUsername(profile).then((images) => {
    
    const downloader = new S3Downloader("instagram-cache");

    console.log("imageCount:", images.length)

    for (const image of images) {
      const hdLocation = `${env.storagePath}/${profile}/hdLocation/${image.id}.jpg`;
      const thumbnailLocation = `${env.storagePath}/${profile}/thumbnail/${image.id}.jpg`;

      downloader.saveToS3(image.display_url, hdLocation);
      downloader.saveToS3(image.thumbnail_src, thumbnailLocation);
    }
  });
};

handler();

module.exports = { handler };

