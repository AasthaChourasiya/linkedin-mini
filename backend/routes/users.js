const express = require('express');
const User = require('../models/User');
const Post = require('../models/Post');

const router = express.Router();

router.get('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    if (!user) return res.status(404).json({ error: 'User not found' });

    const posts = await Post.find({ author: req.params.id }).sort({ createdAt: -1 });

    res.json({ user, posts });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch user profile' });
  }
});

module.exports = router;
