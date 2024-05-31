const express = require('express');
const altRouter = express.Router();

const { requireUser } = require('./utils');

const { 
  getPostsByName,
} = require('../db');

altRouter.get('/',requireUser, async (req, res, next) => {
 console.log('hi')
    try {
    // const allPosts = await getPostsByName(req.user.id);
    res.send(
      req.user.posts
    );
  } catch ({ name, message }) {
    next({ name, message });
  }
});


module.exports = altRouter;