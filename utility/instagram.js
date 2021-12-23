const InstagramWebApi = require("instagram-web-api");

class Instagram {
  constructor(username, password) {
    console.log(username, password)
    this.__client = new InstagramWebApi({ username, password });
  }

  async getPhotosByUsername(username) {
    await this.__client.login();
    const response = await this.__client.getPhotosByUsername({ username, first: 50 });
    const edges = response.user.edge_owner_to_timeline_media.edges;

    const instagramImages = edges.map((node) => {
      const post = node.node;
      let caption = null;
      try {
        caption = post.edge_media_to_caption.edges[0].node.text;
      } catch (err) {}

      return {
        id: post.id,
        display_url: post.display_url,
        thumbnail_src: post.thumbnail_src,
        dimensions: post.dimensions,
        location: post.location ? post.location.name : null,
        caption,
      };
    });
    return instagramImages;
  }
}

module.exports = { Instagram };
