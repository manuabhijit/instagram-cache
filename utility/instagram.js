const axios = require("axios");

class Instagram {
  constructor(username) {
    this.__username = username;
  }

  getImages() {
    const url = `https://www.instagram.com/${this.__username}/channel/`;
    const params = { __a: 1 };
    return axios.get(url, { params }).then(
      (response) => {
        const nodes =
          response.data.graphql.user.edge_owner_to_timeline_media.edges;
        const instagramImages = nodes.map((node) => {
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
            likes: post.edge_liked_by.count,
            caption,
          };
        });

        return instagramImages;
      },
      (_) => []
    );
  }
}

module.exports = { Instagram };
