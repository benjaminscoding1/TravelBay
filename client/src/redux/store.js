import { combineReducers, configureStore } from '@reduxjs/toolkit';

import blogPosts from './slices/blogPost';

const reducer = combineReducers({ blogPosts });

export default configureStore({
  reducer,
});
