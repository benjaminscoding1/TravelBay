import express from 'express';
import BlogPost from '../models/BlogPost.js';

const blogPostRoutes = express.Router();

const getBlogPostByCategory = async (req, res) => {
  const blogPosts = await BlogPost.find({});
  res.json(blogPosts);
};

blogPostRoutes.route('/').get(getBlogPostByCategory);

export default blogPostRoutes;
