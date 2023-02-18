import express from 'express';
import protectRoute from '../middleware/authMiddleware.js';
import BlogPost from '../models/BlogPost.js';
import asyncHandler from 'express-async-handler';

const blogPostRoutes = express.Router();

const getBlogPostByCategory = asyncHandler(async (req, res) => {
  const { category, pageNumber } = req.params;

  const posts = await BlogPost.find({});
  const increment = pageNumber + 4;

  let getStatus = () => (increment < posts.length ? 200 : 201); //201 response means last chunk of blog posts
  if (category === 'all') {
    res.status(getStatus()).json(posts.slice(pageNumber, increment));
  } else if (category === 'latest') {
    res
      .status(getStatus())
      .json(posts.sort((objA, objB) => Number(objB.createdAt) - Number(objA.createdAt)).slice(pageNumber, increment));
  } else {
    const blogPosts = await BlogPost.find({ category });
    res.status(getStatus()).json(blogPosts.slice(pageNumber, increment));
  }
});

const getBlogPost = asyncHandler(async (req, res) => {
  console.log(req.params.id);
  const blogPost = await BlogPost.findById(req.params.id);

  if (blogPost) {
    res.json(blogPost);
  } else {
    res.status(404).send('Blog post not found.');
  }
});

const createBlogPost = async (req, res) => {
  const { image, title, contentOne, contentTwo, category, author = 'Benjamin Fischer' } = req.body;

  const newBlogPost = await BlogPost.create({
    image,
    title,
    contentOne,
    contentTwo,
    category: String(category).toLowerCase(),
    author,
  });
  await newBlogPost.save();
  const blogPosts = await BlogPost.find({});
  if (newBlogPost) {
    res.json(blogPosts);
  } else {
    res.status(404).send('Blog post could not be stored.');
  }
};

const updateBlogPost = asyncHandler(async (req, res) => {
  const { _id, title, contentOne, contentTwo, category, image } = req.body;

  const blogPost = await BlogPost.findById(_id);

  if (blogPost) {
    blogPost.contentOne = contentOne;
    blogPost.contentTwo = contentTwo;
    blogPost.title = title;
    blogPost.category = category;
    blogPost.image = image;
    await blogPost.save();

    const blogPosts = await BlogPost.find({});
    res.json(blogPosts);
  } else {
    res.status(404).send('Blog post could not be updated');
  }
});

const deletePost = asyncHandler(async (req, res) => {
  const blogPost = await BlogPost.findByIdAndDelete(req.params.id);

  const allBlogPosts = await BlogPost.find({});

  if (allBlogPosts) {
    res.json(allBlogPosts);
  } else {
    res.status(404).send('Blog post could not be removed.');
  }
});

blogPostRoutes.route('/').post(protectRoute, createBlogPost);
blogPostRoutes.route('/post/:id').get(getBlogPost);
blogPostRoutes.route('/:id').delete(protectRoute, deletePost);
blogPostRoutes.route('/').put(protectRoute, updateBlogPost);
blogPostRoutes.route('/:category/:pageNumber').get(getBlogPostByCategory);

export default blogPostRoutes;
