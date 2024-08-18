const express = require('express');
const router = express.Router();
const BlogPost = require('../models/BlogPost');

// Home route
router.get('/', async (req, res) => {
  try {
    const posts = await BlogPost.find();
    res.render('index', { posts });
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// About route
router.get('/about', (req, res) => {
  res.render('about');
});

// Individual post route
router.get('/post/:id', async (req, res) => {
  try {
    const post = await BlogPost.findById(req.params.id);
    if (!post) return res.status(404).send('Post not found');
    res.render('post', { post });
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// Form to create new post
router.get('/new-post', (req, res) => {
  res.render('new-post');
});

// Handle new post creation
router.post('/new-post', async (req, res) => {
  const { title, content } = req.body;
  try {
    await BlogPost.create({ title, content });
    res.redirect('/');
  } catch (err) {
    res.status(500).send(err.message);
  }
});

module.exports = router;
