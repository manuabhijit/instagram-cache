const { Instagram } = require("./utility/instagram");
const { Environment } = require("./utility/environment");
const { LocalDownloader } = require("./utility/localDownloader");

const handler = (...args) => {
  const env = new Environment();
  const profile = "nasa"
  new Instagram(env.username, env.password).getPhotosByUsername(profile).then((images) => {
    
    const downloader = new LocalDownloader("instagram-cache");

    for (const image of images) {
      const imageUrl = image.display_url;
      const hdLocation = `${env.storagePath}/${profile}/hdLocation/${image.id}.jpg`;
      const thumbnailLocation = `${env.storagePath}/${profile}/thumbnail/${image.id}.jpg`;

      console.log({imageUrl, hdLocation})
      downloader.saveToS3(image.display_url, hdLocation, () => {});
      downloader.saveToS3(image.thumbnail_src, thumbnailLocation, () => {});
    }
  });
};

handler()

module.exports = { handler };

