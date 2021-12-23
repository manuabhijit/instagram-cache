
const { Instagram } = require("./utility/instagram");
const { Environment } = require('./utility/environment');
const { LocalDownloader } = require('./utility/localDownloader');



var download = function(uri, filename, callback){
  request.head(uri, function(err, res, body){
    console.log('content-type:', res.headers['content-type']);
    console.log('content-length:', res.headers['content-length']);

    request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
  });
};

console.log('Test', process.env.STORAGE_FOLDER);

new Instagram("nasa").getImages().then(images => {
    const env = new Environment();
    const downloader = new LocalDownloader();

    for (const image of images) {
        const imageUrl = image.display_url;
        const downloadLocation = `${env.storagePath}/hd_${image.id}.jpg`
        downloader.download(image.display_url, downloadLocation, () => {});
    }
});
