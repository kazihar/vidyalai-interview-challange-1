const express = require('express');
const { fetchPosts } = require('./posts.service');
const { fetchUserById } = require('../users/users.service');
const { default: axios } = require('axios');

const router = express.Router();

router.get('/', async (req, res) => {
  const posts = await fetchPosts();

  const postsWithImages = await Promise.all(
    posts.map(async post => {
      // TODO use this route to fetch photos for each post
      const photos = await axios.get(
        `https://jsonplaceholder.typicode.com/albums/${post.id}/photos`,
      );

      const postImages = photos.data.map(image => {
        return { url: image.url };
      });

      return {
        ...post,
        images: postImages,
      };
    }, []),
  );

  res.json(postsWithImages);
});

module.exports = router;
