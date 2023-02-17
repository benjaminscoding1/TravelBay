import { combineReducers, configureStore } from '@reduxjs/toolkit';

import blogPosts from './slices/blogPost';
import user from './slices/user';

const reducer = combineReducers({ blogPosts, user });

export default configureStore({
  reducer,
});
